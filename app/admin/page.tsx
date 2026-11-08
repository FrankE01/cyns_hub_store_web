"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Users,
  ArrowRight,
  MessageCircle,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore } from "../../lib/store/useCMSStore";
import { formatPrice } from "../../lib/utils";

export default function AdminDashboardPage() {
  const { orders, analytics } = useCMSStore();

  // Financial & Order calculations
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingDispatches = orders.filter(
    (o) =>
      o.fulfillmentStatus === "processing" ||
      o.fulfillmentStatus === "awaiting_stock" ||
      o.fulfillmentStatus === "ready_for_dispatch"
  );

  const activePreOrders = orders.filter((o) => o.isPreOrder);

  // Conversion funnel metrics
  const { storeVisits, productViews, addToCarts, checkoutInitiations, completedOrders } =
    analytics;

  const pdpViewRate = ((productViews / (storeVisits || 1)) * 100).toFixed(1);
  const cartRate = ((addToCarts / (productViews || 1)) * 100).toFixed(1);
  const checkoutRate = ((checkoutInitiations / (addToCarts || 1)) * 100).toFixed(1);
  const completionRate = ((completedOrders / (checkoutInitiations || 1)) * 100).toFixed(1);
  const overallConversion = ((completedOrders / (storeVisits || 1)) * 100).toFixed(2);

  // Pre-order sourcing demands calculation: count units per product & size
  const preOrderDemand: Record<string, { name: string; sizes: Record<string, number>; total: number }> = {};
  activePreOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (item.isPreOrder) {
        if (!preOrderDemand[item.productName]) {
          preOrderDemand[item.productName] = { name: item.productName, sizes: {}, total: 0 };
        }
        preOrderDemand[item.productName].sizes[item.size] =
          (preOrderDemand[item.productName].sizes[item.size] || 0) + item.quantity;
        preOrderDemand[item.productName].total += item.quantity;
      }
    });
  });

  return (
    <div className="space-y-8">
      {/* 1. Dashboard Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Commerce Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Store Performance &amp; Operations
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time storefront metrics, dispatch queues, and funnel analytics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/cms"
            className="h-10 px-4 rounded-lg border border-stone-300 hover:border-stone-900 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-stone-800 flex items-center space-x-2 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#475438]" />
            <span>Storefront CMS</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="h-10 px-4 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Silhouette</span>
          </Link>
        </div>
      </div>

      {/* 2. Top-Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Revenue Collected</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="font-serif text-2xl font-semibold text-stone-900">
            {formatPrice(totalRevenue)}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 mt-2 font-medium">
            <span>+18.4%</span>
            <span className="text-stone-400 font-normal">from previous 30-day drop</span>
          </div>
        </div>

        {/* Pending Dispatches */}
        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Pending Fulfillment</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="font-serif text-2xl font-semibold text-stone-900">
            {pendingDispatches.length} Orders
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            Awaiting packing or courier dispatch in Accra
          </p>
        </div>

        {/* Pre-Orders Volume */}
        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Active Pre-Orders</span>
            <div className="p-2 bg-[#F7EFE9] text-[#964F27] rounded-lg">
              <Clock className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="font-serif text-2xl font-semibold text-stone-900">
            {activePreOrders.length} Drops
          </div>
          <p className="text-[11px] text-[#964F27] mt-2 font-medium">
            Scheduled for mid-month dispatch batch
          </p>
        </div>

        {/* Overall Conversion */}
        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Store Conversion</span>
            <div className="p-2 bg-stone-100 text-stone-700 rounded-lg">
              <Users className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="font-serif text-2xl font-semibold text-stone-900">
            {overallConversion}%
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            {completedOrders} completed purchases from {storeVisits.toLocaleString()} visits
          </p>
        </div>
      </div>

      {/* 3. Conversion Funnel & Bottleneck Diagnostics */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Customer Purchase Funnel &amp; Bottleneck Diagnostics
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Identifies where potential buyers drop off during discovery and checkout.
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-400 bg-stone-50 px-2.5 py-1 rounded border border-stone-200 self-start sm:self-auto">
            Sample Period: Last 30 Days
          </span>
        </div>

        {/* Funnel Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Step 1: Visits */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
              1. Store Visits
            </span>
            <span className="font-serif text-xl font-semibold text-stone-900">
              {storeVisits.toLocaleString()}
            </span>
            <span className="text-[11px] text-stone-400 block mt-1">100% Top of Funnel</span>
          </div>

          {/* Step 2: Product Views */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
              2. PDP Views
            </span>
            <span className="font-serif text-xl font-semibold text-stone-900">
              {productViews.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              {pdpViewRate}% View-Through
            </span>
          </div>

          {/* Step 3: Add to Bag */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
              3. Added to Bag
            </span>
            <span className="font-serif text-xl font-semibold text-stone-900">
              {addToCarts.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              {cartRate}% of Views
            </span>
          </div>

          {/* Step 4: Checkout Initiated */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
              4. Checkout Initiated
            </span>
            <span className="font-serif text-xl font-semibold text-stone-900">
              {checkoutInitiations.toLocaleString()}
            </span>
            <span className="text-[11px] text-amber-700 font-medium block mt-1">
              {checkoutRate}% of Bag Adds
            </span>
          </div>

          {/* Step 5: Completed Orders */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#475438]/30 bg-[#475438]/5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#475438] block mb-1">
              5. Completed
            </span>
            <span className="font-serif text-xl font-semibold text-stone-900">
              {completedOrders.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#475438] font-bold block mt-1">
              {completionRate}% of Checkouts
            </span>
          </div>
        </div>

        {/* Bottleneck Recommendation Banner */}
        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-lg flex items-start space-x-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.75} />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">
              Key Bottleneck: Bag-to-Checkout Drop-off ({100 - Number(checkoutRate)}% abandonment)
            </p>
            <p className="text-amber-800 leading-relaxed">
              Customers are adding pieces to their bag, but 60.5% pause before checkout. Ensure the free Greater Accra delivery threshold (orders over GH₵ 600) and delivery dispatch guarantees are prominently highlighted in the Cart Drawer and Announcement Bar.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Pre-Order Sourcing Demand Tally & Channel Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Order Demand Matrix */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-base font-medium text-stone-900">
                  Pre-Order Sourcing Demand
                </h3>
                <p className="text-xs text-stone-500">
                  Exact unit breakdown required for supplier production batches.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7EFE9] text-[#964F27]">
                Live Sourcing Tally
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {Object.keys(preOrderDemand).length === 0 ? (
                <p className="text-xs text-stone-400 py-6 text-center">
                  No active pre-orders currently in pipeline.
                </p>
              ) : (
                Object.values(preOrderDemand).map((demand) => (
                  <div key={demand.name} className="py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-stone-900">{demand.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {Object.entries(demand.sizes).map(([size, count]) => (
                          <span
                            key={size}
                            className="inline-flex items-center text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-700"
                          >
                            <span className="font-bold mr-1">{size}:</span> {count}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-sm font-semibold text-stone-900">
                        {demand.total} units
                      </span>
                      <span className="block text-[10px] text-stone-400">total demand</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs text-stone-500">
            <span>Next batch production cutoff: Nov 15</span>
            <Link
              href="/admin/orders?filter=preorder"
              className="text-[#475438] font-semibold hover:underline"
            >
              View Pre-Order Queue →
            </Link>
          </div>
        </div>

        {/* Social Channel Attribution */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-base font-medium text-stone-900">
                Acquisition &amp; Channel Attribution
              </h3>
              <p className="text-xs text-stone-500">
                Traffic sources generating storefront visitors and revenue.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {analytics.channelBreakdown.map((ch) => {
              const share = Math.round(
                (ch.revenue /
                  (analytics.channelBreakdown.reduce((sum, c) => sum + c.revenue, 0) || 1)) *
                  100
              );
              return (
                <div key={ch.channel} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">{ch.label}</span>
                    <span className="font-mono text-stone-900 font-medium">
                      {formatPrice(ch.revenue)} ({share}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#475438] rounded-full transition-all duration-500"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>{ch.visits.toLocaleString()} visits</span>
                    <span>{ch.orders} orders converted</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Recent Orders Dispatch Queue */}
      <div className="bg-white rounded-xl border border-[#EBE5DC] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#EBE5DC] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base font-medium text-stone-900">
              Recent Customer Orders &amp; Dispatch Queue
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Review new checkouts, verify MoMo payments, and message clients on WhatsApp.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-800 hover:text-[#475438] flex items-center space-x-1"
          >
            <span>All Orders ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-500 uppercase text-[10px] tracking-wider border-b border-[#EBE5DC]">
              <tr>
                <th className="py-3.5 px-6 font-medium">Order Ref</th>
                <th className="py-3.5 px-6 font-medium">Customer</th>
                <th className="py-3.5 px-6 font-medium">Ghana Location</th>
                <th className="py-3.5 px-6 font-medium">Items</th>
                <th className="py-3.5 px-6 font-medium">Total</th>
                <th className="py-3.5 px-6 font-medium">Payment</th>
                <th className="py-3.5 px-6 font-medium">Fulfillment</th>
                <th className="py-3.5 px-6 font-medium text-right">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {orders.slice(0, 5).map((order) => {
                const whatsappMsg = encodeURIComponent(
                  `Hello ${order.customerName}! This is Cyn's Hub regarding your order ${order.reference}. Your items are being prepared for dispatch.`
                );
                return (
                  <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-stone-900">
                      {order.reference}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-stone-900">{order.customerName}</p>
                      <p className="text-[11px] text-stone-500">{order.customerPhone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-stone-800 line-clamp-1">{order.deliveryRegion}</p>
                      {order.digitalAddress && (
                        <span className="font-mono text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {order.digitalAddress}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-stone-800">
                        {order.items.length} {order.items.length === 1 ? "piece" : "pieces"}
                      </span>
                      {order.isPreOrder && (
                        <span className="ml-1 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#F7EFE9] text-[#964F27]">
                          Pre-Order
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-serif font-semibold text-stone-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-6">
                      {order.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize text-stone-700 font-medium">
                        {order.fulfillmentStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#25D366] hover:text-emerald-700 font-medium text-xs p-1.5 rounded hover:bg-emerald-50 transition-colors"
                        title="Message customer on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Message</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
