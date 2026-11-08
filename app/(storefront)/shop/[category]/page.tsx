import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cmsStore } from "../../../../lib/store/cmsStore";
import { getProductsByCategory, CATEGORIES } from "../../../../lib/data/products";
import ShopClient from "../../../../components/shop/ShopClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = cmsStore.getSnapshot()?.categories || CATEGORIES;
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryMeta =
    cmsStore.getCategoryBySlug(category) ||
    CATEGORIES.find((c) => c.slug.toLowerCase() === (category || "").toLowerCase());

  const title = categoryMeta
    ? `${categoryMeta.name} | Cyn's Hub`
    : `${(category || "").replace("-", " ")} | Cyn's Hub`;

  return {
    title,
    description:
      categoryMeta?.description || "Curated female fashion silhouettes for effortless luxury.",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const storeProducts = cmsStore.getProductsByCategory(category);
  const products = storeProducts.length > 0 ? storeProducts : getProductsByCategory(category);
  const categoryMeta =
    cmsStore.getCategoryBySlug(category) ||
    CATEGORIES.find((c) => c.slug.toLowerCase() === (category || "").toLowerCase());

  if (products.length === 0 && !categoryMeta) {
    notFound();
  }

  const title = categoryMeta ? categoryMeta.name : (category || "").replace("-", " ");
  const description =
    categoryMeta?.description ||
    "Curated female fashion silhouettes designed for effortless luxury.";

  return (
    <ShopClient
      products={products}
      initialCategory={category}
      categoryTitle={title}
      categoryDescription={description}
    />
  );
}
