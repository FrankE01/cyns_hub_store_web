import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { CartProvider, useCart } from "@/lib/store/cart";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCTS } from "@/lib/data/products";

function TestCartTrigger() {
  const { addItem, openDrawer } = useCart();
  const sample = PRODUCTS[0];

  return (
    <div>
      <button onClick={openDrawer}>Open Bag</button>
      <button
        onClick={() =>
          addItem({
            productId: sample.id,
            productName: sample.name,
            slug: sample.slug,
            price: sample.price,
            image: sample.images[0],
            size: "S",
            color: "Cream",
            colorHex: "#fff",
            quantity: 1,
            isPreOrder: false,
          })
        }
      >
        Add Item
      </button>
    </div>
  );
}

describe("Cart Drawer Component", () => {
  it("opens drawer and displays added items", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestCartTrigger />
        <CartDrawer />
      </CartProvider>
    );

    // Add item to bag
    const addBtn = screen.getByText("Add Item");
    await user.click(addBtn);

    // Cart drawer should now be rendered with item
    expect(screen.getByRole("complementary", { name: /shopping bag/i })).toBeInTheDocument();
    expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /proceed to checkout/i })).toBeInTheDocument();
  });
});
