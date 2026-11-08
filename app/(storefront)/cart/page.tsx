"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ArrowRight, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { useCart } from "../../../lib/store/cart";
import { formatPrice } from "../../../lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCount, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const hasPreOrderItems = items.some((item) => item.isPreOrder);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "WELCOME10" || promoCode.trim().toUpperCase() === "CYN10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid discount code. Try 'WELCOME10' for 10% off.");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-medium">Shopping Bag</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
          Shopping Bag ({totalCount} {totalCount === 1 ? "item" : "items"})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
            <Clock className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-serif text-stone-900 font-medium">Your bag is empty</h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            Explore our curated collections of effortlessly chic silhouettes.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Pre-Order Banner Notice */}
            {hasPreOrderItems && (
              <div className="p-4 rounded-xl bg-[#FAF3EE] border border-[#E8D4C5] flex items-start space-x-3 text-xs text-[#964F27]">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Pre-Order Items in Your Bag:</strong>
                  <span>
                    Your order contains custom pre-order pieces. Items will dispatch according to the
                    respective batch dispatch schedule. You will receive updates via WhatsApp and SMS.
                  </span>
                </div>
              </div>
            )}

            {/* Item List */}
            <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {items.map((item) => (
                <div key={item.id} className="py-5 flex space-x-4 sm:space-x-6">
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-[3/4] w-20 sm:w-24 overflow-hidden rounded-lg bg-stone-100 border border-stone-200 shrink-0"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm sm:text-base font-medium text-stone-900 hover:text-stone-600 transition-colors line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <span className="text-sm font-semibold text-stone-900 ml-4">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center space-x-3 text-xs text-stone-500">
                        <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <span>Colour:</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <strong className="text-stone-800">{item.color}</strong>
                        </div>
                      </div>

                      {item.isPreOrder && item.preOrderDispatchDate && (
                        <span className="mt-1.5 inline-flex items-center text-[10px] font-semibold uppercase tracking-wider text-[#964F27]">
                          <Clock className="w-2.5 h-2.5 mr-1" />
                          Batch Dispatches: {item.preOrderDispatchDate}
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-stone-200 rounded-full bg-stone-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 bg-stone-50 p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label htmlFor="promo" className="text-xs text-stone-600 block">
                Promo Code / Gift Voucher
              </label>
              <div className="flex space-x-2">
                <input
                  id="promo"
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-medium">10% discount applied!</p>
              )}
              {promoError && <p className="text-xs text-red-500">{promoError}</p>}
            </form>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 pt-4 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-stone-500 text-xs">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#475438]" />
              <span>Secure Checkout with Mobile Money & Card</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
