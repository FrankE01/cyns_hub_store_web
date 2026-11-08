import { Metadata } from "next";
import { getAllProducts } from "../../../lib/data/products";
import ShopClient from "../../../components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Collections | Cyn's Hub",
  description:
    "Explore our complete curation of effortless linen shirts, tailored blazers, flowing dresses, and artisanal accessories. Ready to ship and pre-order available across Ghana.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <ShopClient
      products={products}
      initialCategory="all"
      categoryTitle="All Collections"
      categoryDescription="Timeless, breathable pieces designed for warm sunlit days and effortless everyday styling."
    />
  );
}
