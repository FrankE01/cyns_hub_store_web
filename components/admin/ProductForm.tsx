"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Trash2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Product, Size, Category } from "../../lib/types";
import { cmsStore } from "../../lib/store/cmsStore";

interface ProductFormProps {
  initialProduct?: Product;
  categories: Category[];
  isEdit?: boolean;
}

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductForm({
  initialProduct,
  categories,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();

  // Basic Information
  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [category, setCategory] = useState<Product["category"]>(
    initialProduct?.category || "dresses"
  );
  const [price, setPrice] = useState(initialProduct?.price?.toString() || "");
  const [originalPrice, setOriginalPrice] = useState(
    initialProduct?.originalPrice?.toString() || ""
  );
  const [description, setDescription] = useState(initialProduct?.description || "");

  // Pre-Order Configuration
  const [isPreOrder, setIsPreOrder] = useState(initialProduct?.isPreOrder || false);
  const [preOrderCutoffDate, setPreOrderCutoffDate] = useState(
    initialProduct?.preOrderCutoffDate || "Nov 15, 2026"
  );
  const [preOrderDispatchDate, setPreOrderDispatchDate] = useState(
    initialProduct?.preOrderDispatchDate || "Nov 25, 2026"
  );

  // Sizing
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(
    initialProduct?.availableSizes || ["S", "M", "L"]
  );

  // Colors
  const [colors, setColors] = useState<{ name: string; hex: string }[]>(
    initialProduct?.availableColors || [
      { name: "Olive", hex: "#475438" },
      { name: "Cream", hex: "#F5F2EB" },
    ]
  );
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#475438");

  // Images
  const [images, setImages] = useState<string[]>(
    initialProduct?.images || [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  // Product Details
  const [fit, setFit] = useState(initialProduct?.details?.fit || "Relaxed, true to size");
  const [fabric, setFabric] = useState(
    initialProduct?.details?.fabric || "100% Breathable Washed Linen"
  );
  const [care, setCare] = useState(
    initialProduct?.details?.care || "Dry clean or gentle cold hand wash"
  );

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const toggleSize = (size: Size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const addColor = () => {
    if (newColorName.trim()) {
      setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName("");
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !slug.trim()) {
      setErrorMessage("Silhouette name and URL slug are required.");
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setErrorMessage("Please enter a valid price in Ghanaian Cedis (GH₵).");
      return;
    }

    if (images.length === 0) {
      setErrorMessage("Please add at least one garment image URL.");
      return;
    }

    if (selectedSizes.length === 0) {
      setErrorMessage("Please select at least one available size.");
      return;
    }

    setSaving(true);

    const productPayload: Product = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      name: name.trim(),
      slug: slug.trim(),
      category,
      price: numPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      description: description.trim() || "Handcrafted modern silhouette for Cyn's Hub.",
      images,
      availableSizes: selectedSizes,
      availableColors: colors,
      isPreOrder,
      preOrderCutoffDate: isPreOrder ? preOrderCutoffDate : undefined,
      preOrderDispatchDate: isPreOrder ? preOrderDispatchDate : undefined,
      rating: initialProduct?.rating || 4.9,
      reviewCount: initialProduct?.reviewCount || 1,
      tags: isPreOrder ? ["Pre-Order", "New Arrival"] : ["New Arrival"],
      variants: selectedSizes.flatMap((size) =>
        colors.map((c, i) => ({
          id: `var-${size}-${i}-${Date.now()}`,
          size,
          color: c.name,
          colorHex: c.hex,
          inStock: !isPreOrder,
          stockCount: isPreOrder ? 0 : 10,
        }))
      ),
      details: {
        fit,
        fabric,
        care,
      },
    };

    if (isEdit && initialProduct) {
      cmsStore.updateProduct(initialProduct.id, productPayload);
    } else {
      cmsStore.addProduct(productPayload);
    }

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
              {isEdit ? "Edit Silhouette" : "New Collection Style"}
            </span>
            <h1 className="font-serif text-2xl font-medium text-stone-900">
              {isEdit ? name || "Edit Product" : "Create New Silhouette"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="h-10 px-4 rounded-lg border border-stone-300 text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 hover:bg-stone-50 flex items-center"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="h-10 px-5 rounded-lg bg-[#475438] hover:bg-[#3A452E] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center space-x-2 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : isEdit ? "Update Silhouette" : "Publish Silhouette"}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-xs text-red-700">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" strokeWidth={2} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Core Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-4">
            <h2 className="font-serif text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Garment Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Silhouette Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Solene Tailored Blazer"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. solene-tailored-blazer"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Editorial Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe fit, feel, occasions, and silhouette aesthetic..."
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Department Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product["category"])}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Price (GH₵)
                </label>
                <input
                  type="number"
                  required
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="680"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 font-serif font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Compare Price (GH₵)
                </label>
                <input
                  type="number"
                  step="any"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Optional original price"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* 2. Sizing & Colors */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-5">
            <h2 className="font-serif text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Size &amp; Color Variants
            </h2>

            {/* Sizing Toggles */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        isSelected
                          ? "bg-stone-900 text-white shadow-2xs"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Palette Picker */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Available Colorways
              </label>

              <div className="flex flex-wrap gap-2">
                {colors.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#FAF8F5] border border-stone-200 rounded-full text-xs text-stone-800"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(i)}
                      className="text-stone-400 hover:text-stone-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New Color */}
              <div className="flex items-center space-x-2 pt-1 max-w-sm">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-9 h-9 p-0 border border-stone-300 rounded cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="Color Name (e.g. Sage Green)"
                  className="flex-1 px-3 py-1.5 border border-stone-300 rounded-md text-xs text-stone-900 bg-stone-50/50"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-3 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-md hover:bg-black"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* 3. Garment Details & Care */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-4">
            <h2 className="font-serif text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Fit &amp; Care Details (PDP Accordions)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Fit &amp; Cut
                </label>
                <input
                  type="text"
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  placeholder="Relaxed, true to size"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Fabric Composition
                </label>
                <input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="100% Breathable Linen"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                  placeholder="Dry clean or cold hand wash"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Pre-Order & Image Gallery */}
        <div className="space-y-6">
          {/* Pre-Order Controls */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#964F27]" />
                <h3 className="font-serif text-sm font-semibold text-stone-900">
                  Pre-Order Model
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPreOrder}
                  onChange={(e) => setIsPreOrder(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#964F27]"></div>
              </label>
            </div>

            {isPreOrder ? (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-[11px] text-[#964F27] bg-[#F7EFE9] p-2.5 rounded-lg leading-relaxed">
                  When enabled, customers can pre-pay for this piece before manufacturing/sourcing is complete.
                </p>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Pre-Order Cutoff Date
                  </label>
                  <input
                    type="text"
                    value={preOrderCutoffDate}
                    onChange={(e) => setPreOrderCutoffDate(e.target.value)}
                    placeholder="e.g. Nov 15, 2026"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Scheduled Dispatch Date
                  </label>
                  <input
                    type="text"
                    value={preOrderDispatchDate}
                    onChange={(e) => setPreOrderDispatchDate(e.target.value)}
                    placeholder="e.g. Nov 25, 2026"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Piece is marked as <strong>Ready to Ship</strong> from Accra inventory immediately upon order placement.
              </p>
            )}
          </div>

          {/* High-Resolution Media Gallery */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-4">
            <h3 className="font-serif text-sm font-semibold text-stone-900 pb-2 border-b border-stone-100">
              Imagery &amp; Visuals ({images.length})
            </h3>

            <div className="space-y-2">
              {images.map((url, i) => (
                <div key={i} className="flex items-center space-x-2 p-2 bg-[#FAF8F5] rounded-lg border border-stone-200">
                  <div className="relative w-12 h-14 bg-stone-100 rounded overflow-hidden shrink-0">
                    <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="48px" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    readOnly
                    className="flex-1 text-[11px] text-stone-500 truncate bg-transparent outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1 text-stone-400 hover:text-red-600"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash..."
                className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-3 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-black uppercase tracking-wider shrink-0"
              >
                Add Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
