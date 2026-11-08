"use client";

import React from "react";
import ProductForm from "../../../../components/admin/ProductForm";
import { useCMSStore } from "../../../../lib/store/useCMSStore";

export default function NewProductPage() {
  const { categories } = useCMSStore();

  return <ProductForm categories={categories} isEdit={false} />;
}
