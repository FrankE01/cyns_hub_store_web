import { describe, it, expect, beforeEach } from "vitest";
import { cmsStore } from "../lib/store/cmsStore";

describe("cmsStore validations & safe lookups", () => {
  beforeEach(() => {
    localStorage.clear();
    cmsStore.resetToDefaults();
  });

  describe("getProductsByCategory", () => {
    it("returns empty array for invalid or non-existent categories", () => {
      expect(cmsStore.getProductsByCategory("hv")).toEqual([]);
      expect(cmsStore.getProductsByCategory("")).toEqual([]);
      expect(cmsStore.getProductsByCategory(undefined as unknown as string)).toEqual([]);
      expect(cmsStore.getProductsByCategory(null as unknown as string)).toEqual([]);
    });

    it("handles whitespace and case-insensitivity cleanly", () => {
      const dressesLower = cmsStore.getProductsByCategory("dresses");
      const dressesUpper = cmsStore.getProductsByCategory("  DRESSES  ");
      expect(dressesLower.length).toBeGreaterThan(0);
      expect(dressesUpper).toEqual(dressesLower);
    });

    it("handles 'all' and 'all-products' cleanly", () => {
      const all = cmsStore.getProductsByCategory("all");
      const allProducts = cmsStore.getProductsByCategory("all-products");
      expect(all.length).toBe(cmsStore.getAllProducts().length);
      expect(allProducts).toEqual(all);
    });

    it("filters new-arrivals accurately", () => {
      const newArrivals = cmsStore.getProductsByCategory("new-arrivals");
      expect(newArrivals.length).toBeGreaterThan(0);
      for (const p of newArrivals) {
        const matchesTag = p.tags?.some(
          (t) => t.toLowerCase().includes("new arrival") || t.toLowerCase().includes("new drop")
        );
        const matchesCategory = p.category?.toLowerCase() === "new-arrivals";
        expect(matchesTag || matchesCategory).toBe(true);
      }
    });
  });

  describe("getProductBySlug", () => {
    it("returns undefined for invalid or non-existent slugs", () => {
      expect(cmsStore.getProductBySlug("non-existent-slug")).toBeUndefined();
      expect(cmsStore.getProductBySlug("")).toBeUndefined();
      expect(cmsStore.getProductBySlug(undefined as unknown as string)).toBeUndefined();
      expect(cmsStore.getProductBySlug(null as unknown as string)).toBeUndefined();
    });

    it("matches valid slugs case-insensitively with trimming", () => {
      const product = cmsStore.getProductBySlug("  SOLENE-BLAZER  ");
      expect(product).toBeDefined();
      expect(product?.slug).toBe("solene-blazer");
    });

    it("resolves alias solene-tailored-blazer to solene-blazer", () => {
      const product = cmsStore.getProductBySlug("solene-tailored-blazer");
      expect(product).toBeDefined();
      expect(product?.slug).toBe("solene-blazer");
    });
  });

  describe("getCategoryBySlug", () => {
    it("returns undefined for invalid, empty, or non-existent category slugs", () => {
      expect(cmsStore.getCategoryBySlug("hv")).toBeUndefined();
      expect(cmsStore.getCategoryBySlug("")).toBeUndefined();
      expect(cmsStore.getCategoryBySlug(undefined as unknown as string)).toBeUndefined();
      expect(cmsStore.getCategoryBySlug(null as unknown as string)).toBeUndefined();
    });

    it("finds categories case-insensitively with trimming", () => {
      const category = cmsStore.getCategoryBySlug("  DRESSES ");
      expect(category).toBeDefined();
      expect(category?.slug).toBe("dresses");
      expect(category?.name).toBe("Dresses");
    });
  });

  describe("getRelatedProducts", () => {
    it("returns safe defaults when passed undefined or invalid product id", () => {
      const related = cmsStore.getRelatedProducts(undefined);
      expect(related.length).toBe(4);

      const emptyRelated = cmsStore.getRelatedProducts("non-existent-id", 2);
      expect(emptyRelated.length).toBe(2);
    });

    it("excludes the current product and respects custom limit", () => {
      const all = cmsStore.getAllProducts();
      const first = all[0];
      const related = cmsStore.getRelatedProducts(first.id, 3);
      expect(related.length).toBe(3);
      expect(related.some((p) => p.id === first.id)).toBe(false);
    });
  });

  describe("mutations and validations", () => {
    it("auto-generates slug and id when adding a product without them", () => {
      cmsStore.addProduct({
        name: "Luxe Linen Robe",
        price: 320,
      } as unknown as Parameters<typeof cmsStore.addProduct>[0]);

      const added = cmsStore.getAllProducts().find((p) => p.name === "Luxe Linen Robe");
      expect(added).toBeDefined();
      expect(added?.slug).toBe("luxe-linen-robe");
      expect(added?.id).toBeDefined();
      expect(added?.images.length).toBeGreaterThan(0);
    });

    it("auto-generates slug and id when adding a category without them", () => {
      cmsStore.addCategory({
        name: "Evening Gowns",
      } as unknown as Parameters<typeof cmsStore.addCategory>[0]);

      const added = cmsStore.getCategoryBySlug("evening-gowns");
      expect(added).toBeDefined();
      expect(added?.name).toBe("Evening Gowns");
    });
  });
});
