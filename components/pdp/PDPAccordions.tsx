"use client";

import React, { useState } from "react";
import { ChevronDown, Tag, Sparkles, Truck, RotateCcw, CreditCard } from "lucide-react";
import { ProductDetails } from "../../lib/types";

interface PDPAccordionsProps {
  description: string;
  details: ProductDetails;
  offers?: string[];
}

export default function PDPAccordions({
  description,
  details,
  offers = [
    "Order within the countdown timer to get next-day delivery in Accra.",
    "Get 10% off your first order with code WELCOME10.",
    "Free standard delivery nationwide on orders above GH₵ 500.",
  ],
}: PDPAccordionsProps) {
  // Image 3 shows "Product Details" and "Delivery & Return Details" open or closed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    delivery: true,
    offers: false,
  });

  const toggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="divide-y divide-stone-200 border-t border-b border-stone-200 mt-6">
      {/* 1. Offers Available */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggle("offers")}
          className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-stone-900"
          aria-expanded={openSections.offers}
        >
          <div className="flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-[#475438]" />
            <span>Offers Available</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
              openSections.offers ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.offers && (
          <div className="mt-3 space-y-2 text-xs text-stone-600 pl-6">
            {offers.map((offer, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <Sparkles className="w-3 h-3 text-[#D49028] mt-0.5 shrink-0" />
                <span>{offer}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Product Details */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggle("details")}
          className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-stone-900"
          aria-expanded={openSections.details}
        >
          <span>Product Details</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
              openSections.details ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.details && (
          <div className="mt-3 space-y-3 text-xs text-stone-600 leading-relaxed">
            <p>{description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100 text-stone-700">
              <div>
                <span className="font-semibold text-stone-900 block">Fit:</span>
                <span>{details.fit}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block">Fabric:</span>
                <span>{details.fabric}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-stone-900 block">Care:</span>
                <span>{details.care}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Delivery & Return Details */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggle("delivery")}
          className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-stone-900"
          aria-expanded={openSections.delivery}
        >
          <span>Delivery & Return Details</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
              openSections.delivery ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.delivery && (
          <div className="mt-3 space-y-2.5 text-xs text-stone-600">
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 text-stone-500 shrink-0" />
              <span>
                <strong className="text-stone-900 font-medium">Deliver to:</strong> Home or Office in Accra, Tema, Kumasi & nationwide.
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <RotateCcw className="w-4 h-4 text-stone-500 shrink-0" />
              <span>
                <strong className="text-stone-900 font-medium">Return:</strong> 7-Day Return and Exchange on unworn items.
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CreditCard className="w-4 h-4 text-stone-500 shrink-0" />
              <span>
                <strong className="text-stone-900 font-medium">Payment:</strong> Mobile Money (MTN / Telecel), Card, or Cash on Delivery available.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
