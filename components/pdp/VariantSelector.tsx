"use client";

import React from "react";
import { Size, ProductVariant } from "../../lib/types";

interface VariantSelectorProps {
  availableSizes: Size[];
  availableColors: { name: string; hex: string }[];
  variants: ProductVariant[];
  selectedSize: Size;
  selectedColor: string;
  onSizeChange: (size: Size) => void;
  onColorChange: (color: string) => void;
}

export default function VariantSelector({
  availableSizes,
  availableColors,
  variants,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: VariantSelectorProps) {
  // Check if a size is in stock for the currently selected color
  const isSizeInStock = (size: Size) => {
    const variant = variants.find(
      (v) => v.size === size && v.color.toLowerCase() === selectedColor.toLowerCase()
    );
    // If no variant entry exists, treat as in stock if availableSizes includes it, or variant stock
    return variant ? variant.inStock : true;
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
            Select Size and Colour
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Size: <strong className="text-stone-900 font-semibold">{selectedSize}</strong>
          </span>
        </div>

        {/* Size Pills */}
        <div className="flex flex-wrap gap-2.5">
          {availableSizes.map((size) => {
            const inStock = isSizeInStock(size);
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                disabled={!inStock}
                onClick={() => onSizeChange(size)}
                className={`min-w-11 h-10 px-3.5 text-xs font-medium rounded-full transition-all flex items-center justify-center ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-xs"
                    : inStock
                    ? "bg-stone-50 border border-stone-200 text-stone-800 hover:border-stone-400"
                    : "bg-stone-100 text-stone-300 border border-stone-200 line-through cursor-not-allowed"
                }`}
                aria-label={`Size ${size}${!inStock ? " (Out of stock)" : ""}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colour Swatches with labels underneath */}
      {availableColors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500 font-medium">
              Colour: <strong className="text-stone-900 font-semibold">{selectedColor}</strong>
            </span>
          </div>

          <div className="flex items-start space-x-4">
            {availableColors.map((color) => {
              const isSelected = selectedColor.toLowerCase() === color.name.toLowerCase();

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onColorChange(color.name)}
                  className="group flex flex-col items-center focus:outline-hidden"
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className={`w-9 h-9 rounded-full border transition-all ${
                      isSelected
                        ? "ring-2 ring-stone-900 ring-offset-2 scale-105"
                        : "border-stone-300 opacity-85 group-hover:opacity-100 group-hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`mt-1.5 text-[11px] transition-colors ${
                      isSelected ? "font-semibold text-stone-900" : "text-stone-500"
                    }`}
                  >
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
