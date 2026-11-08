"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Clock, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../lib/store/cart";
import { formatPrice } from "../lib/utils";

export default function CartDrawer() {
  const {
    isOpen,
    closeDrawer,
    items,
    totalCount,
    subtotal,
    hasPreOrder,
    updateQuantity,
    removeItem,
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Bag"
          className="w-screen max-w-md bg-[#FAF8F5] bg-stone-50 shadow-2xl flex flex-col border-l border-[#EBE5DC]"
          style={{ backgroundColor: "#FAF8F5" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBE5DC]">
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-lg font-medium text-stone-900 tracking-wide">
                Shopping Bag
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                ({totalCount} {totalCount === 1 ? "item" : "items"})
              </span>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              className="p-1.5 -mr-2 text-stone-400 hover:text-stone-800 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Pre-Order Advisory Notice */}
          {hasPreOrder && items.length > 0 && (
            <div className="bg-[#F7EFE9] border-b border-[#E7D6CA] px-6 py-3 text-xs text-[#964F27] flex items-start space-x-2.5">
              <Clock className="w-4 h-4 text-[#964F27] shrink-0 mt-0.5" strokeWidth={2} />
              <p className="leading-relaxed">
                <span className="font-semibold">Contains Pre-Orders:</span> Some items in your bag will be custom sourced and dispatched on their scheduled dates.
              </p>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EBE5DC]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EBE5DC]/60 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-lg text-stone-800 font-medium mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our curated seasonal drops and find pieces tailored to you.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="inline-block bg-[#475438] text-white text-xs font-medium tracking-[0.14em] uppercase px-6 py-3 rounded-none hover:bg-[#3A452E] transition-colors"
                >
                  Shop New Arrivals
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <div
                    className="relative w-20 h-26 bg-stone-100 flex-shrink-0 overflow-hidden rounded-sm border border-stone-200"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeDrawer}
                          className="text-xs font-semibold text-stone-900 hover:text-[#475438] line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-stone-500 mt-0.5">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-stone-300"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span>{item.color}</span>
                        </span>
                      </div>

                      {item.isPreOrder && (
                        <span className="inline-flex items-center space-x-1 mt-1 text-[10px] uppercase font-bold tracking-wider text-[#964F27] bg-[#F7EFE9] px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3" strokeWidth={2} />
                          <span>Pre-Order • Ships {item.preOrderDispatchDate || "soon"}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9D3C8] rounded-sm bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-950"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" strokeWidth={2} />
                        </button>
                        <span className="px-2 text-xs font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-950"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" strokeWidth={2} />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#EBE5DC] bg-white p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-semibold text-stone-900 text-base">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Shipping rates (Accra delivery & regional parcels) calculated at checkout.
              </p>
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center bg-[#1C1917] text-white text-xs font-semibold tracking-[0.16em] uppercase py-3.5 px-4 hover:bg-[#332E2A] transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center text-xs font-medium text-stone-600 hover:text-stone-950 py-2 transition-colors"
                >
                  View Full Bag Details
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
