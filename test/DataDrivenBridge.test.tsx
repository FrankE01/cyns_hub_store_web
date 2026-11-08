import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { cmsStore } from "../lib/store/cmsStore";
import { CartProvider, cartStore } from "../lib/store/cart";
import CheckoutPage from "../app/(storefront)/checkout/page";
import ProductDetailsClient from "../components/pdp/ProductDetailsClient";
import Footer from "../components/Footer";
import { getProductBySlug, getRelatedProducts } from "../lib/data/products";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/checkout",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Data-Driven Storefront & Admin Bridge", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    cartStore.set([]);
    cmsStore.resetToDefaults();
  });

  it("dynamically reads and updates delivery fees from CMS policies at Checkout", async () => {
    // Populate cart with a GH₵ 450 item
    cartStore.set([
      {
        id: "item-1",
        productId: "prod-test",
        productName: "Test Silk Dress",
        slug: "test-silk-dress",
        price: 450,
        image: "https://example.com/test.jpg",
        size: "M",
        color: "Olive",
        colorHex: "#475438",
        quantity: 1,
        isPreOrder: false,
      },
    ]);

    // Default policy: freeDeliveryThreshold is 600, accraDeliveryFee is 35
    render(
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    );

    // Verify delivery fee is GH₵ 35.00 because subtotal (450) < threshold (600)
    expect(screen.getAllByText(/GH₵\s*35/).length).toBeGreaterThan(0);

    // Now update policy via CMS store: make threshold 400 (so 450 is now free)
    act(() => {
      cmsStore.updatePolicies({ freeDeliveryThreshold: 400 });
    });

    // Subtotal 450 >= 400, so delivery should now display FREE
    expect(screen.getAllByText("FREE").length).toBeGreaterThan(0);
  });

  it("submits checkout order, stores it in cmsStore.orders, and increments funnel analytics", async () => {
    const user = userEvent.setup();

    cartStore.set([
      {
        id: "item-1",
        productId: "prod-test",
        productName: "Test Silk Dress",
        slug: "test-silk-dress",
        price: 450,
        image: "https://example.com/test.jpg",
        size: "M",
        color: "Olive",
        colorHex: "#475438",
        quantity: 1,
        isPreOrder: false,
      },
    ]);

    render(
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    );

    // Fill customer info
    await user.type(screen.getByPlaceholderText(/e\.g\. Afia Mensah/i), "Serwaa Bonsu");
    await user.type(screen.getByPlaceholderText("024 123 4567"), "0245001122");
    await user.type(screen.getByPlaceholderText(/e\.g\. East Legon/i), "East Legon");
    await user.type(screen.getByPlaceholderText(/e\.g\. GA-183-9201/i), "GA-492-1002");

    const initialOrderCount = cmsStore.getSnapshot().orders.length;
    const initialCompleted = cmsStore.getSnapshot().analytics.completedOrders;

    // Submit order
    const submitBtn = screen.getByRole("button", { name: /Confirm & Place Order/i });
    await user.click(submitBtn);

    // Check that order is added to CMS store
    const updatedOrders = cmsStore.getSnapshot().orders;
    expect(updatedOrders.length).toBe(initialOrderCount + 1);

    const newestOrder = updatedOrders[0];
    expect(newestOrder.customerName).toBe("Serwaa Bonsu");
    expect(newestOrder.customerPhone).toBe("0245001122");
    expect(newestOrder.digitalAddress).toBe("GA-492-1002");
    expect(newestOrder.items[0].productName).toBe("Test Silk Dress");

    // Funnel analytics updated
    expect(cmsStore.getSnapshot().analytics.completedOrders).toBe(initialCompleted + 1);
  });

  it("dynamically reads WhatsApp number from CMS policies in ProductDetailsClient", () => {
    const product = getProductBySlug("solene-blazer")!;
    const related = getRelatedProducts(product.id, 4);

    // Set custom WhatsApp number in CMS
    cmsStore.updatePolicies({ whatsappNumber: "233501234567" });

    render(
      <CartProvider>
        <ProductDetailsClient product={product} relatedProducts={related} />
      </CartProvider>
    );

    const whatsappLink = screen.getByRole("link", { name: /Inquire on WhatsApp/i });
    expect(whatsappLink.getAttribute("href")).toContain("wa.me/233501234567");
  });

  it("dynamically renders categories in Footer from CMS store", () => {
    // Add custom category to CMS store
    act(() => {
      cmsStore.addCategory({
        id: "kimonos",
        name: "Silk Kimonos",
        slug: "silk-kimonos",
        description: "Hand-finished silk kimonos",
        image: "https://example.com/kimono.jpg",
        itemCount: 5,
      });
    });

    render(<Footer />);

    expect(screen.getByRole("link", { name: "Silk Kimonos" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Silk Kimonos" }).getAttribute("href")).toBe(
      "/shop/silk-kimonos"
    );
  });
});
