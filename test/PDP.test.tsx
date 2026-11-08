import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { CartProvider } from "../lib/store/cart";
import ProductDetailsClient from "../components/pdp/ProductDetailsClient";
import ProductPage from "../app/(storefront)/products/[slug]/page";
import { getProductBySlug, getRelatedProducts } from "../lib/data/products";

describe("Product Details Page (PDP)", () => {
  const soleneBlazer = getProductBySlug("solene-blazer")!;
  const related = getRelatedProducts(soleneBlazer.id, 4);

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders ProductPage with Suspense boundary and ProductSkeleton fallback", () => {
    const pageElement = ProductPage({
      params: Promise.resolve({ slug: "solene-blazer" }),
    });

    const { container } = render(<CartProvider>{pageElement}</CartProvider>);
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
  });

  it("renders Solene Blazer with correct title, price, countdown, and accordions", () => {
    render(
      <CartProvider>
        <ProductDetailsClient product={soleneBlazer} relatedProducts={related} />
      </CartProvider>
    );

    // Title and Price
    expect(screen.getByRole("heading", { name: "Solene Blazer" })).toBeDefined();
    expect(screen.getAllByText(/GH₵\s*750/).length).toBeGreaterThan(0);

    // Delivery countdown / next day notice
    expect(screen.getByText(/next day delivery in Accra/i)).toBeDefined();

    // Size Pills
    expect(screen.getByRole("button", { name: "Size S" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Size M" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Size L" })).toBeDefined();

    // Accordions
    expect(screen.getByText("Product Details")).toBeDefined();
    expect(screen.getByText("Delivery & Return Details")).toBeDefined();
    expect(screen.getByText(/55% Linen, 45% Organic Cotton/i)).toBeDefined();

    // Ratings & Reviews section
    expect(screen.getByText("Ratings And Reviews")).toBeDefined();
    expect(screen.getAllByText("4.5").length).toBeGreaterThan(0);
    expect(screen.getByText("Light Weight")).toBeDefined();
    expect(screen.getByText("Value For Money")).toBeDefined();
    expect(screen.getByText("Sandra Rox")).toBeDefined();

    // You might also like recommendations
    expect(screen.getByText("You might also like")).toBeDefined();
  });

  it("allows selecting sizes and adding the product to cart", () => {
    render(
      <CartProvider>
        <ProductDetailsClient product={soleneBlazer} relatedProducts={related} />
      </CartProvider>
    );

    // Click Size M
    const sizeMBtn = screen.getByRole("button", { name: "Size M" });
    fireEvent.click(sizeMBtn);

    // Click Add to Cart
    const addBtn = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    // Button updates feedback
    expect(screen.getByText(/Added to Bag/i)).toBeDefined();
  });

  it("renders Share button and Inquire on WhatsApp button", () => {
    render(
      <CartProvider>
        <ProductDetailsClient product={soleneBlazer} relatedProducts={related} />
      </CartProvider>
    );

    // Share button
    const shareBtn = screen.getByRole("button", { name: /Share product/i });
    expect(shareBtn).toBeDefined();

    // Inquire on WhatsApp link
    const whatsappLink = screen.getByRole("link", { name: /Inquire on WhatsApp/i });
    expect(whatsappLink).toBeDefined();
    expect(whatsappLink.getAttribute("href")).toContain("wa.me");
  });
});
