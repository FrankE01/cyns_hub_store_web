"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Check, Clock } from "lucide-react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import { useCart } from "../lib/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const currentColor = product.availableColors[selectedColorIndex] || {
    name: "Standard",
    hex: "#1C1917",
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Default to size S or first available size
    const size = product.availableSizes[0] || "S";
    addItem({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      price: product.price,
      image: primaryImage,
      size,
      color: currentColor.name,
      colorHex: currentColor.hex,
      quantity: 1,
      isPreOrder: product.isPreOrder,
      preOrderDispatchDate: product.preOrderDispatchDate,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 Aspect Ratio */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-sm border border-stone-200/70"
        style={{ position: "relative" }}
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative block w-full h-full"
          style={{ position: "relative" }}
        >
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isPreOrder ? (
            <span className="inline-flex items-center space-x-1 bg-[#964F27] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.14em] px-2 py-0.5 rounded-xs shadow-sm">
              <Clock className="w-2.5 h-2.5" strokeWidth={2.5} />
              <span>Pre-Order</span>
            </span>
          ) : product.tags.includes("Bestseller") ? (
            <span className="bg-[#475438] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.14em] px-2 py-0.5 rounded-xs shadow-sm">
              Bestseller
            </span>
          ) : null}

          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-stone-900 text-white text-[9px] sm:text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-xs">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-stone-800 flex items-center justify-center shadow-sm transition-transform active:scale-90 z-10"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-stone-700"
            }`}
            strokeWidth={1.75}
          />
        </button>

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center space-x-1 bg-[#1C1917]/90 hover:bg-[#1C1917] backdrop-blur-sm text-white text-[11px] font-medium tracking-[0.16em] uppercase py-2.5 shadow-md transition-colors"
          >
            {addedToast ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Quick Add</span>
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <div className="flex items-start justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs sm:text-sm font-medium text-stone-900 hover:text-[#475438] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Rating */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-semibold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 text-[11px] text-stone-500">
            <Star className="w-3 h-3 fill-[#D49028] text-[#D49028]" />
            <span className="font-medium text-stone-700">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Pre-order shipping notice */}
        {product.isPreOrder && product.preOrderDispatchDate && (
          <p className="text-[10px] text-[#964F27] font-medium mt-0.5">
            Ships {product.preOrderDispatchDate}
          </p>
        )}

        {/* Color Swatch Dots */}
        {product.availableColors.length > 0 && (
          <div className="mt-2 flex items-center space-x-1.5">
            {product.availableColors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColorIndex === idx
                    ? "ring-1 ring-offset-1 ring-stone-800 scale-110"
                    : "border-stone-300 opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
