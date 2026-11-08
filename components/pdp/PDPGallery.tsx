"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

interface PDPGalleryProps {
  images: string[];
  productName: string;
  isPreOrder?: boolean;
}

export default function PDPGallery({
  images,
  productName,
  isPreOrder = false,
}: PDPGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Guarantee at least 1 image
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];
  const currentImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Large Image Container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/80 shadow-xs"
        style={{ position: "relative" }}
      >
        <Image
          src={currentImage}
          alt={`${productName} - View ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Badge in top left */}
        {isPreOrder && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center space-x-1.5 bg-[#964F27] text-white text-xs uppercase font-bold tracking-[0.14em] px-3 py-1 rounded-sm shadow-sm">
              <Clock className="w-3 h-3" strokeWidth={2.5} />
              <span>Pre-Order</span>
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row below main image */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {displayImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              style={{ position: "relative" }}
              className={`relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 transition-all ${
                selectedIndex === idx
                  ? "ring-2 ring-stone-900 ring-offset-2 opacity-100"
                  : "opacity-70 hover:opacity-100 border border-stone-200"
              }`}
              aria-label={`View photo ${idx + 1} of ${productName}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
