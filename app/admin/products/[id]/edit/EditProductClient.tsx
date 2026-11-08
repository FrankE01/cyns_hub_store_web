"use client";

import React from "react";
import Link from "next/link";
import ProductForm from "../../../../../components/admin/ProductForm";
import { useCMSStore } from "../../../../../lib/store/useCMSStore";

export default function EditProductClient({ id }: { id: string }) {
  const { products, categories } = useCMSStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="bg-white p-12 rounded-xl border border-[#EBE5DC] text-center max-w-md mx-auto space-y-3">
        <h2 className="font-serif text-lg font-medium text-stone-900">
          Silhouette Not Found
        </h2>
        <p className="text-xs text-stone-500">
          The requested product ID &quot;{id}&quot; does not exist in the active catalog.
        </p>
        <Link
          href="/admin/products"
          className="inline-block mt-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <ProductForm initialProduct={product} categories={categories} isEdit={true} />
  );
}
