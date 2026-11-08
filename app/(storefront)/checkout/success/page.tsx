"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageSquare, ArrowRight, Package } from "lucide-react";
import { formatPrice } from "../../../../lib/utils";
import { useCMSStore } from "../../../../lib/store/useCMSStore";

interface OrderData {
  orderId: string;
  formData: {
    fullName: string;
    phone: string;
    city: string;
    region: string;
  };
  grandTotal: number;
  date: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("order") || "CYN-GH-78421";
  const { sections } = useCMSStore();
  const whatsappNumber = (sections.policies.whatsappNumber || "233240000000").replace(/[^0-9]/g, "");

  const [order] = useState<OrderData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = sessionStorage.getItem("lastOrder");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const orderId = order?.orderId || orderIdParam;
  const customerName = order?.formData?.fullName || "Valued Customer";
  const total = order?.grandTotal ? formatPrice(order.grandTotal) : "GH₵ 750.00";

  const whatsappMessage = encodeURIComponent(
    `Hello Cyn's Hub! I just placed order #${orderId} for ${customerName}. Could you please confirm my delivery timeline?`
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 text-center">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#475438]">
        Order Confirmed
      </span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-serif text-stone-900 font-medium">
        Thank You, {customerName}!
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
        We have received your order and our styling concierge is preparing your items. A confirmation
        message has been sent to your WhatsApp/Phone.
      </p>

      {/* Order Info Card */}
      <div className="mt-8 p-6 rounded-2xl bg-white border border-stone-200 text-left shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[11px] text-stone-400 block uppercase tracking-wider font-semibold">
              Order Reference
            </span>
            <span className="text-sm font-mono font-bold text-stone-900">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-stone-400 block uppercase tracking-wider font-semibold">
              Total Amount
            </span>
            <span className="text-sm font-bold text-stone-900">{total}</span>
          </div>
        </div>

        <div className="flex items-start space-x-3 text-xs text-stone-600">
          <Package className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 block font-medium">Fulfillment & Delivery:</strong>
            <span>
              Orders within Greater Accra arrive within 24–48 hours. Regional orders dispatch via
              our priority bus/courier network. Pre-order pieces follow batch schedules.
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Handoff CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat With Us on WhatsApp</span>
        </a>

        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-stone-500">
          Loading order details...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
