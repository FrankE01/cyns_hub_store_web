import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StorefrontNotFound from "@/app/(storefront)/not-found";
import RootNotFound from "@/app/not-found";

describe("Not Found (404) Pages", () => {
  it("renders Storefront 404 page matching the web app theme", () => {
    render(<StorefrontNotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: /this silhouette has moved or ended/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop new arrivals/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home/i })).toBeInTheDocument();

    // Curated department links
    expect(screen.getByRole("link", { name: /dresses/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /co-ord sets/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blazers & tops/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /accessories/i })).toBeInTheDocument();
  });

  it("renders Root 404 page with brand header and return links", () => {
    render(<RootNotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: /this silhouette has moved or ended/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop new arrivals/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home/i })).toBeInTheDocument();
    expect(screen.getByText(/Cyn's Hub Boutique. All rights reserved./i)).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });
});
