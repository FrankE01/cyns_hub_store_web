import { describe, it, expect } from "vitest";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isPreOrder: boolean;
}

export function calculateOrderSummary(items: CartItem[], deliveryFee: number = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const hasPreOrder = items.some((item) => item.isPreOrder);

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    itemCount,
    hasPreOrder,
  };
}

describe("Cart and Order Summary Calculation", () => {
  it("computes subtotal, total, and counts accurately", () => {
    const items: CartItem[] = [
      { id: "1", name: "Floral Summer Dress", price: 250, quantity: 2, isPreOrder: false },
      { id: "2", name: "Gold Hoop Earrings", price: 80, quantity: 1, isPreOrder: false },
    ];

    const result = calculateOrderSummary(items, 30);
    expect(result.subtotal).toBe(580);
    expect(result.itemCount).toBe(3);
    expect(result.total).toBe(610);
    expect(result.hasPreOrder).toBe(false);
  });

  it("identifies orders containing pre-order items", () => {
    const items: CartItem[] = [
      { id: "3", name: "Limited Edition Handbag", price: 400, quantity: 1, isPreOrder: true },
    ];

    const result = calculateOrderSummary(items, 0);
    expect(result.subtotal).toBe(400);
    expect(result.total).toBe(400);
    expect(result.hasPreOrder).toBe(true);
  });

  it("handles an empty cart correctly", () => {
    const result = calculateOrderSummary([]);
    expect(result.subtotal).toBe(0);
    expect(result.total).toBe(0);
    expect(result.itemCount).toBe(0);
    expect(result.hasPreOrder).toBe(false);
  });
});
