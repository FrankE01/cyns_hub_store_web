import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StorefrontPage from "@/app/(storefront)/page";

describe("Storefront Page Component", () => {
  it("renders storefront headline", () => {
    render(<StorefrontPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("store");
  });
});
