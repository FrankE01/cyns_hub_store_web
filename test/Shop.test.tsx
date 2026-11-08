import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { CartProvider } from "../lib/store/cart";
import ShopClient from "../components/shop/ShopClient";
import CategoryPage, { generateMetadata } from "../app/(storefront)/shop/[category]/page";
import { PRODUCTS } from "../lib/data/products";

describe("Shop Catalog Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders CategoryPage for valid category (dresses)", async () => {
    const page = await CategoryPage({
      params: Promise.resolve({ category: "dresses" }),
    });

    render(<CartProvider>{page}</CartProvider>);

    expect(screen.getByRole("heading", { name: "Dresses" })).toBeDefined();
  });

  it("triggers notFound on CategoryPage for non-existent category (hv)", async () => {
    await expect(
      CategoryPage({
        params: Promise.resolve({ category: "hv" }),
      })
    ).rejects.toThrow();
  });

  it("generates fallback metadata for invalid category and rich metadata for valid category", async () => {
    const validMeta = await generateMetadata({
      params: Promise.resolve({ category: "dresses" }),
    });
    expect(validMeta.title).toBe("Dresses | Cyn's Hub");

    const invalidMeta = await generateMetadata({
      params: Promise.resolve({ category: "hv" }),
    });
    expect(invalidMeta.title).toBe("hv | Cyn's Hub");
  });

  it("renders catalog banner, category pills, and product cards", () => {
    render(
      <CartProvider>
        <ShopClient products={PRODUCTS} />
      </CartProvider>
    );

    // Title
    expect(screen.getByRole("heading", { name: "The Complete Collection" })).toBeDefined();

    // Category navigation tabs
    expect(screen.getByRole("link", { name: "All Items" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Dresses" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Blazers & Tops" })).toBeDefined();

    // Products present
    expect(screen.getByText("Solene Blazer")).toBeDefined();
  });

  it("filters by availability (Pre-Order vs Ready to Ship)", () => {
    render(
      <CartProvider>
        <ShopClient products={PRODUCTS} />
      </CartProvider>
    );

    // Click 'Pre-Order'
    const preOrderBtn = screen.getByRole("button", { name: "Pre-Order" });
    fireEvent.click(preOrderBtn);

    // Sage Tiered Midi Dress is a pre-order item
    expect(screen.getByText("Sage Tiered Midi Dress")).toBeDefined();

    // Click 'Ready to Ship'
    const readyBtn = screen.getByRole("button", { name: "Ready to Ship" });
    fireEvent.click(readyBtn);

    // Solene Blazer is in stock / ready to ship
    expect(screen.getByText("Solene Blazer")).toBeDefined();
  });
});
