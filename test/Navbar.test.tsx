import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/lib/store/cart";

describe("Navbar Component & Mobile Drawer", () => {
  it("renders navbar and desktop links", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it("opens mobile navigation drawer outside the header and allows closing", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    // Initially, the mobile drawer dialog is not visible
    expect(screen.queryByRole("dialog", { name: /navigation menu/i })).not.toBeInTheDocument();

    // Click hamburger button to open
    const openMenuBtn = screen.getByLabelText(/open menu/i);
    await user.click(openMenuBtn);

    // Drawer is now open in the document
    const dialog = screen.getByRole("dialog", { name: /navigation menu/i });
    expect(dialog).toBeInTheDocument();

    // Ensure it contains all navigation categories
    expect(screen.getAllByRole("link", { name: /new arrivals/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /dresses/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /co-ord sets/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /blazers/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /pre-orders/i }).length).toBeGreaterThan(0);

    // Click close button
    const closeBtn = screen.getByLabelText(/close menu/i);
    await user.click(closeBtn);

    // Drawer is now closed
    expect(screen.queryByRole("dialog", { name: /navigation menu/i })).not.toBeInTheDocument();
  });
});
