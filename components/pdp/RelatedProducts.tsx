"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "../../lib/types";
import { formatPrice } from "../../lib/utils";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "You might also like",
}: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-stone-200">
      <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            {/* Image Container */}
            <div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200/80"
              style={{ position: "relative" }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative block w-full h-full"
                style={{ position: "relative" }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Wishlist Button */}
              <button
                type="button"
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs transition-colors"
                aria-label={`Save ${product.name} to wishlist`}
              >
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Product Meta */}
            <div className="mt-3 flex flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs sm:text-sm font-medium text-stone-900 hover:text-stone-600 line-clamp-1"
                >
                  {product.name}
                </Link>

                <div className="flex items-center space-x-1 text-xs text-stone-600 ml-2 shrink-0">
                  <Star className="w-3 h-3 fill-[#D49028] text-[#D49028]" />
                  <span className="font-medium text-stone-700">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-1 text-xs sm:text-sm font-semibold text-stone-900">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
