"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore, cmsStore } from "../../../lib/store/useCMSStore";
import { formatPrice } from "../../../lib/utils";

export default function AdminProductsPage() {
  const { products, categories } = useCMSStore();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterType, setFilterType] = useState<"all" | "in-stock" | "pre-order">("all");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesType =
      filterType === "all" ||
      (filterType === "pre-order" ? p.isPreOrder : !p.isPreOrder);

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      cmsStore.deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Inventory &amp; Silhouettes
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Product Catalog &amp; Variants
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your boutique styles, sizing availability, pre-order cutoff dates, and pricing.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="h-10 px-4 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center space-x-1.5 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Silhouette</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EBE5DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search garments..."
              className="w-full pl-9 pr-3.5 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-700 bg-stone-50/50 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === "all" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType("in-stock")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === "in-stock" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              In Stock
            </button>
            <button
              type="button"
              onClick={() => setFilterType("pre-order")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === "pre-order" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Pre-Orders
            </button>
          </div>
        </div>

        <span className="text-xs text-stone-500 whitespace-nowrap">
          Showing {filtered.length} of {products.length} garments
        </span>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-xl border border-[#EBE5DC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-500 uppercase text-[10px] tracking-wider border-b border-[#EBE5DC]">
              <tr>
                <th className="py-3.5 px-6 font-medium">Garment</th>
                <th className="py-3.5 px-6 font-medium">Category</th>
                <th className="py-3.5 px-6 font-medium">Price</th>
                <th className="py-3.5 px-6 font-medium">Available Sizes</th>
                <th className="py-3.5 px-6 font-medium">Availability State</th>
                <th className="py-3.5 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3.5">
                      <div className="relative w-12 h-16 bg-stone-100 rounded-md overflow-hidden border border-stone-200 shrink-0">
                        <Image
                          src={product.images[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-mono text-stone-400">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="capitalize text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-serif font-semibold text-stone-900">
                    <div>
                      <span>{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="ml-1.5 text-stone-400 line-through text-[11px] font-normal">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {product.availableSizes.map((size) => (
                        <span
                          key={size}
                          className="px-1.5 py-0.5 text-[10px] font-mono bg-stone-50 border border-stone-200 rounded text-stone-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {product.isPreOrder ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-[#964F27] bg-[#F7EFE9] px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>Pre-Order</span>
                        </span>
                        {product.preOrderDispatchDate && (
                          <p className="text-[10px] text-stone-400">
                            Ships {product.preOrderDispatchDate}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Ready to Ship</span>
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-100 transition-colors"
                        title="View on Storefront"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors"
                        title="Edit Silhouette"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="Delete Silhouette"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
