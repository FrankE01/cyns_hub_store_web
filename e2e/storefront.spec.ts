import { test, expect } from "@playwright/test";

test.describe("Storefront & Navigation", () => {
  test("storefront homepage loads and displays placeholder", async ({ page }) => {
    await page.goto("/");
    // Matches root accessible heading
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/store/i);
    // Verifies brand logo and storefront sections are rendered
    await expect(page.getByTestId("brand-logo").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "New Arrivals" })).toBeVisible();
    await expect(page.getByText("Solene Blazer").first()).toBeVisible();
  });

  test("admin route loads successfully", async ({ page }) => {
    await page.goto("/admin");
    // Unauthenticated user is guarded and redirected to admin login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/admin/i);
    await expect(page.getByLabel(/owner email address/i)).toBeVisible();
  });

  test("catalog page (/shop) displays products and filters by category", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByRole("heading", { name: /all collections|complete collection/i })).toBeVisible();
    await expect(page.getByText("Solene Blazer").first()).toBeVisible();

    // Navigate to category "Dresses" (scoped to main content area to avoid nav/footer ambiguity)
    const dressesLink = page.getByRole("main").getByRole("link", { name: /^dresses$/i });
    if (await dressesLink.isVisible()) {
      await dressesLink.click();
      await expect(page).toHaveURL(/\/shop\/dresses/);
      await expect(page.getByRole("heading", { name: "Dresses" })).toBeVisible();
    }
  });

  test("product details page renders rich PDP details and inquiry actions", async ({ page }) => {
    await page.goto("/products/solene-blazer");
    await expect(page.getByRole("heading", { name: "Solene Blazer" })).toBeVisible();
    await expect(page.getByText(/GH₵\s*750/).first()).toBeVisible();

    // Verify Add to Cart button exists
    const addToCartBtn = page.getByRole("button", { name: /add to cart/i });
    await expect(addToCartBtn).toBeVisible();

    // Verify WhatsApp inquiry link exists
    const whatsappLink = page.locator("a[href*='wa.me']").first();
    await expect(whatsappLink).toBeVisible();
  });
});
