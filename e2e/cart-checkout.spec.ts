import { test, expect } from "@playwright/test";

test.describe("Cart & Checkout Funnel", () => {
  test("adds product to bag and opens cart drawer with subtotal", async ({ page }) => {
    await page.goto("/products/solene-blazer");
    await expect(page.getByRole("heading", { name: "Solene Blazer" })).toBeVisible();

    // Click Add to Cart
    const addToCartBtn = page.getByRole("button", { name: /add to cart/i });
    await addToCartBtn.click();

    // Verify cart drawer opens
    const drawer = page.getByLabel("Shopping Bag");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText("Solene Blazer").first()).toBeVisible();
    await expect(drawer.getByText(/GH₵\s*750/).first()).toBeVisible();

    // Verify Proceed to Checkout button is present
    const checkoutLink = drawer.getByRole("link", { name: /proceed to checkout/i });
    await expect(checkoutLink).toBeVisible();
  });

  test("completes checkout funnel and displays confirmation", async ({ page }) => {
    // Add item to cart first
    await page.goto("/products/solene-blazer");
    const addToCartBtn = page.getByRole("button", { name: /add to cart/i });
    await addToCartBtn.click();

    // Navigate to checkout
    const drawer = page.getByLabel("Shopping Bag");
    await expect(drawer).toBeVisible();
    const checkoutLink = drawer.getByRole("link", { name: /proceed to checkout/i });
    await checkoutLink.click();

    await expect(page).toHaveURL(/\/checkout/);
    await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();

    // Fill delivery form
    await page.locator("input[name='fullName']").fill("Akosua Boateng");
    await page.locator("input[name='phone']").fill("0245551234");
    await page.locator("input[name='city']").fill("Airport Residential Area");
    await page.locator("input[name='landmark']").fill("Near Marina Mall, GA-183-9201");

    // Submit order
    const submitBtn = page.getByRole("button", { name: /confirm & place order/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Verify redirected to success screen
    await expect(page).toHaveURL(/\/checkout\/success\?order=/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: /thank you/i })).toBeVisible();
    await expect(page.getByText(/order reference/i).first()).toBeVisible();
  });
});
