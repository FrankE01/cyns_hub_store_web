import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "../../../../lib/data/products";
import { cmsStore } from "../../../../lib/store/cmsStore";
import ProductDetailsClient from "../../../../components/pdp/ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = cmsStore.getAllProducts().length > 0 ? cmsStore.getAllProducts() : getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = cmsStore.getProductBySlug(slug) || getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Cyn's Hub",
    };
  }

  return {
    title: `${product.name} | Cyn's Hub Ghana`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Cyn's Hub`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          alt: product.name,
        },
      ],
    },
  };
}

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-pulse">
      <div className="flex items-center space-x-2 mb-6 sm:mb-8">
        <div className="h-3 w-10 bg-stone-200 rounded" />
        <div className="h-3 w-3 bg-stone-200 rounded" />
        <div className="h-3 w-10 bg-stone-200 rounded" />
        <div className="h-3 w-3 bg-stone-200 rounded" />
        <div className="h-3 w-16 bg-stone-200 rounded" />
        <div className="h-3 w-3 bg-stone-200 rounded" />
        <div className="h-3 w-28 bg-stone-200 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[3/4] w-full rounded-2xl bg-stone-200" />
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <div className="aspect-[3/4] rounded-lg bg-stone-200" />
            <div className="aspect-[3/4] rounded-lg bg-stone-200" />
            <div className="aspect-[3/4] rounded-lg bg-stone-200" />
            <div className="aspect-[3/4] rounded-lg bg-stone-200" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-stone-200 rounded" />
            <div className="h-6 w-1/3 bg-stone-200 rounded" />
          </div>

          <div className="h-10 w-full bg-stone-100 rounded-md" />

          <div className="space-y-3">
            <div className="h-3 w-36 bg-stone-200 rounded" />
            <div className="flex gap-2">
              <div className="h-10 w-11 rounded-full bg-stone-200" />
              <div className="h-10 w-11 rounded-full bg-stone-200" />
              <div className="h-10 w-11 rounded-full bg-stone-200" />
              <div className="h-10 w-11 rounded-full bg-stone-200" />
              <div className="h-10 w-11 rounded-full bg-stone-200" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-3 w-28 bg-stone-200 rounded" />
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-stone-200" />
              <div className="w-9 h-9 rounded-full bg-stone-200" />
              <div className="w-9 h-9 rounded-full bg-stone-200" />
              <div className="w-9 h-9 rounded-full bg-stone-200" />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <div className="flex-1 h-12 rounded-full bg-stone-900/10" />
            <div className="w-12 h-12 rounded-full bg-stone-200" />
          </div>

          <div className="divide-y divide-stone-200 border-t border-b border-stone-200 mt-6 py-2 space-y-3">
            <div className="h-8 bg-stone-100 rounded" />
            <div className="h-8 bg-stone-100 rounded" />
            <div className="h-8 bg-stone-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = cmsStore.getProductBySlug(slug) || getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = cmsStore.getRelatedProducts(product.id, 4);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
