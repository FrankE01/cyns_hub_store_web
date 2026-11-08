import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StorefrontPage from "@/app/(storefront)/page";
import { CartProvider } from "@/lib/store/cart";

describe("Storefront Page Component", () => {
  it("renders hero logo and product sections", () => {
    render(
      <CartProvider>
        <StorefrontPage />
      </CartProvider>
    );

    // Hero Logo
    expect(screen.getByTestId("brand-logo")).toBeInTheDocument();
    expect(screen.getByText(/cyn's hub/i)).toBeInTheDocument();

    // Section headings
    expect(
      screen.getByRole("heading", { level: 2, name: /new arrivals/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: /the pre-order collection/i })
    ).toBeInTheDocument();
  });

  it("renders customer social proof ratings", () => {
    render(
      <CartProvider>
        <StorefrontPage />
      </CartProvider>
    );

    expect(screen.getByText(/ratings and reviews/i)).toBeInTheDocument();
    expect(screen.getAllByText("4.8").length).toBeGreaterThan(0);
    expect(screen.getByText(/3,265 ratings/i)).toBeInTheDocument();
  });
});
