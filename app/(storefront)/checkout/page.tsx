"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useCart } from "../../../lib/store/cart";
import { formatPrice } from "../../../lib/utils";
import { useCMSStore, cmsStore } from "../../../lib/store/useCMSStore";
import { Order } from "../../../lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { sections } = useCMSStore();
  const { policies } = sections;

  // Track checkout initiation funnel event
  useEffect(() => {
    cmsStore.recordFunnelEvent("checkout");
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    region: "greater-accra",
    city: "",
    landmark: "",
    notes: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<"accra-express" | "regional">(
    "accra-express"
  );
  const [paymentMethod, setPaymentMethod] = useState<"momo-mtn" | "momo-telecel" | "card" | "cod">(
    "momo-mtn"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Delivery costs & free delivery threshold
  const isFreeDelivery = subtotal >= policies.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery
    ? 0
    : deliveryMethod === "accra-express"
    ? policies.accraDeliveryFee
    : policies.outsideAccraDeliveryFee;
  const grandTotal = subtotal + deliveryFee;
  const hasPreOrder = items.some((i) => i.isPreOrder);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate mock order reference
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `CYN-GH-${randomNum}`;

    // Construct full Order for Admin CMS Orders management
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      reference: orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email || undefined,
      deliveryRegion:
        formData.region === "greater-accra"
          ? "Greater Accra"
          : formData.region === "ashanti"
          ? "Ashanti Region (Kumasi)"
          : formData.region === "western"
          ? "Western Region (Takoradi)"
          : formData.region === "central"
          ? "Central Region (Cape Coast)"
          : formData.region === "eastern"
          ? "Eastern Region (Koforidua)"
          : "Other Regions",
      deliveryAddress: `${formData.city}${formData.landmark ? `, ${formData.landmark}` : ""}`,
      digitalAddress: formData.landmark.match(/^[A-Z]{2}-\d{3,4}-\d{3,4}$/i)
        ? formData.landmark
        : undefined,
      deliveryNotes: formData.notes || undefined,
      deliveryFee,
      items: items.map((item, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        productId: item.productId,
        productName: item.productName,
        slug: item.slug,
        image: item.image,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        isPreOrder: item.isPreOrder,
      })),
      subtotal,
      total: grandTotal,
      paymentMethod:
        paymentMethod === "cod"
          ? "cash_on_delivery"
          : paymentMethod === "card"
          ? "bank_transfer"
          : "momo_paystack",
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      fulfillmentStatus: hasPreOrder
        ? "awaiting_stock"
        : paymentMethod === "cod"
        ? "awaiting_payment"
        : "ready_for_dispatch",
      isPreOrder: hasPreOrder,
      sourceChannel: "direct",
    };

    // Persist order to CMS store for Admin Orders tracking
    cmsStore.addOrder(newOrder);

    // Record completed order funnel event
    cmsStore.recordFunnelEvent("order", "direct", grandTotal);

    // Store temporary order payload in sessionStorage for success page
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId,
          formData,
          items,
          subtotal,
          deliveryFee,
          grandTotal,
          paymentMethod,
          date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        })
      );
    }

    setTimeout(() => {
      clearCart();
      router.push(`/checkout/success?order=${orderId}`);
    }, 800);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-medium text-stone-900">Your bag is empty</h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-500">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <Link href="/cart" className="hover:text-stone-900 transition-colors">
          Bag
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-medium">Checkout</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Notice for Pre-orders */}
          {hasPreOrder && (
            <div className="p-4 rounded-xl bg-[#FAF3EE] border border-[#E8D4C5] flex items-start space-x-3 text-xs text-[#964F27]">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Pre-Order Fulfillment:</strong>
                <span>
                  One or more items in this order are pre-orders. Your order will dispatch based on the
                  stated batch date. We will keep you updated via WhatsApp!
                </span>
              </div>
            </div>
          )}

          {/* Section 1: Contact & Delivery */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                Delivery & Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="e.g. Afia Mensah"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="024 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Delivery riders will call or message this number.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="afia@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Region *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                >
                  <option value="greater-accra">Greater Accra</option>
                  <option value="ashanti">Ashanti Region (Kumasi)</option>
                  <option value="western">Western Region (Takoradi)</option>
                  <option value="central">Central Region (Cape Coast)</option>
                  <option value="eastern">Eastern Region (Koforidua)</option>
                  <option value="other">Other Regions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  City / Suburb / Town *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="e.g. East Legon / Osu / Ahodwo"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Digital Address / Prominent Landmark *
                </label>
                <input
                  required
                  type="text"
                  name="landmark"
                  placeholder="e.g. GA-183-9201, Near Shell Filling Station"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Method */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                Delivery Option
              </h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  deliveryMethod === "accra-express"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === "accra-express"}
                    onChange={() => setDeliveryMethod("accra-express")}
                    className="accent-stone-900"
                  />
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      Greater Accra Express Dispatch
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Same-day / Next-day dispatch with live rider coordination
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {subtotal >= policies.freeDeliveryThreshold
                    ? "FREE"
                    : formatPrice(policies.accraDeliveryFee)}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  deliveryMethod === "regional"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === "regional"}
                    onChange={() => setDeliveryMethod("regional")}
                    className="accent-stone-900"
                  />
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      Nationwide Regional Courier (Kumasi, Takoradi, etc.)
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Delivered via trusted regional bus/courier partners (48–72 hours)
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {subtotal >= policies.freeDeliveryThreshold
                    ? "FREE"
                    : formatPrice(policies.outsideAccraDeliveryFee)}
                </span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "momo-mtn"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "momo-mtn"}
                    onChange={() => setPaymentMethod("momo-mtn")}
                    className="accent-stone-900"
                  />
                  <Smartphone className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      MTN Mobile Money
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Instant MoMo prompt sent directly to your phone
                    </span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "momo-telecel"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "momo-telecel"}
                    onChange={() => setPaymentMethod("momo-telecel")}
                    className="accent-stone-900"
                  />
                  <Smartphone className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Telecel Cash
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Fast Telecel mobile wallet verification
                    </span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "card"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-stone-900"
                  />
                  <CreditCard className="w-4 h-4 text-stone-600" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Debit / Credit Card
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Visa & Mastercard processed securely via Paystack
                    </span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === "cod"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-stone-900"
                  />
                  <Truck className="w-4 h-4 text-stone-600" />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Cash on Delivery (Greater Accra Only)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Pay cash or MoMo directly to the dispatch rider upon inspection
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Confirm & Place Order ({formatPrice(grandTotal)})</span>
              </>
            )}
          </button>
        </form>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 bg-stone-50 p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
            Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>

          {/* Mini Items List */}
          <div className="divide-y divide-stone-200 max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center space-x-3 text-xs">
                <div
                  className="relative aspect-[3/4] w-12 overflow-hidden rounded bg-stone-100 shrink-0"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-stone-900 truncate">{item.productName}</div>
                  <div className="text-stone-500 text-[11px]">
                    Qty: {item.quantity} • {item.size} • {item.color}
                  </div>
                </div>
                <div className="font-semibold text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Cost Totals */}
          <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 pt-4 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-medium text-stone-900">
                {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Total Payable</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center space-x-2 text-[#475438] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Buyer Protection & Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-500">
              Every piece from Cyn&apos;s Hub undergoes quality assurance before dispatch. 7-day hassle-free
              exchanges on unworn pieces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
