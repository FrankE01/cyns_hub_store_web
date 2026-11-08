"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { Product } from "../../lib/types";
import { useCMSStore } from "../../lib/store/useCMSStore";
import ProductCard from "../ProductCard";

interface ShopClientProps {
  products?: Product[];
  initialCategory?: string;
  categoryTitle?: string;
  categoryDescription?: string;
}

export default function ShopClient({
  products: initialProducts,
  initialCategory = "all",
  categoryTitle,
  categoryDescription,
}: ShopClientProps) {
  const { products: storeProducts, categories } = useCMSStore();
  const [availability, setAvailability] = useState<"all" | "in-stock" | "pre-order">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  // Dynamic category tabs from reactive CMS categories
  const categoryTabs = useMemo(() => {
    const tabs = [{ id: "all", label: "All Items", href: "/shop" }];
    categories.forEach((c) => {
      tabs.push({
        id: c.slug,
        label: c.name,
        href: `/shop/${c.slug}`,
      });
    });
    return tabs;
  }, [categories]);

  // Dynamic products from store, filtered by category
  const activeCategoryMeta = categories.find((c) => c.slug === initialCategory);
  const displayTitle = categoryTitle || (activeCategoryMeta ? activeCategoryMeta.name : "The Complete Collection");
  const displayDescription =
    categoryDescription ||
    activeCategoryMeta?.description ||
    "Effortless, elevated silhouettes designed for sunlit days, relaxed evenings, and modern versatility.";

  const dynamicProducts = useMemo(() => {
    let list = storeProducts.length > 0 ? storeProducts : initialProducts || [];
    if (initialCategory !== "all") {
      if (initialCategory === "new-arrivals") {
        list = list.filter((p) => p.tags.includes("New Arrival") || p.category === "new-arrivals");
      } else {
        list = list.filter((p) => p.category === initialCategory);
      }
    }
    return list;
  }, [storeProducts, initialProducts, initialCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...dynamicProducts];

    // Filter by availability
    if (availability === "in-stock") {
      result = result.filter((p) => !p.isPreOrder);
    } else if (availability === "pre-order") {
      result = result.filter((p) => p.isPreOrder);
    }

    // Sort products
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [dynamicProducts, availability, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <Link href="/shop" className="hover:text-stone-900 transition-colors">
          Shop
        </Link>
        {initialCategory !== "all" && (
          <>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-medium capitalize">
              {initialCategory.replace("-", " ")}
            </span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-medium tracking-tight">
          {displayTitle}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
          {displayDescription}
        </p>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categoryTabs.map((tab) => {
          const isActive = initialCategory === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
        {/* Availability Filter Chips */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Availability:
          </span>
          <button
            type="button"
            onClick={() => setAvailability("all")}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              availability === "all"
                ? "bg-stone-800 text-white font-medium"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setAvailability("in-stock")}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              availability === "in-stock"
                ? "bg-[#475438] text-white font-medium"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Ready to Ship
          </button>
          <button
            type="button"
            onClick={() => setAvailability("pre-order")}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              availability === "pre-order"
                ? "bg-[#964F27] text-white font-medium"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Pre-Order
          </button>
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between sm:justify-end space-x-4">
          <span className="text-xs text-stone-500">
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs bg-transparent border border-stone-200 rounded-md py-1.5 px-2.5 text-stone-800 font-medium focus:outline-hidden focus:border-stone-900 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-stone-500 text-sm">
            No products match your selected availability filters.
          </p>
          <button
            type="button"
            onClick={() => setAvailability("all")}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-full"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
