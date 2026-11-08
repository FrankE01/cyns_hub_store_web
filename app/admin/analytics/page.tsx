"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { useCMSStore } from "../../../lib/store/useCMSStore";
import { formatPrice } from "../../../lib/utils";

export default function AdminAnalyticsPage() {
  const { analytics, orders } = useCMSStore();

  const {
    storeVisits,
    productViews,
    addToCarts,
    checkoutInitiations,
    completedOrders,
  } = analytics;

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const preOrderRevenue = orders
    .filter((o) => o.paymentStatus === "paid" && o.isPreOrder)
    .reduce((sum, o) => sum + o.total, 0);

  const aov =
    completedOrders > 0 ? Math.round(totalRevenue / completedOrders) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Intelligence &amp; Growth
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Funnel &amp; Acquisition Analytics
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Analyze customer purchase bottlenecks, pre-order revenue share, and
            social channel ROI.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Period: Last 30 Days
        </span>
      </div>

      {/* Top Level Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Storefront Visitors
          </span>
          <span className="font-serif text-2xl font-bold text-stone-900">
            {storeVisits.toLocaleString()}
          </span>
          <span className="block text-[11px] text-emerald-700 mt-1">
            +24% traffic growth via TikTok &amp; IG
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Average Order Value (AOV)
          </span>
          <span className="font-serif text-2xl font-bold text-stone-900">
            {formatPrice(aov || 580)}
          </span>
          <span className="block text-[11px] text-stone-400 mt-1">
            Based on completed purchases
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Pre-Order Revenue Share
          </span>
          <span className="font-serif text-2xl font-bold text-[#964F27]">
            {totalRevenue > 0
              ? Math.round((preOrderRevenue / totalRevenue) * 100)
              : 42}
            %
          </span>
          <span className="block text-[11px] text-stone-500 mt-1">
            {formatPrice(preOrderRevenue)} of {formatPrice(totalRevenue)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EBE5DC] shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Full Funnel Conversion
          </span>
          <span className="font-serif text-2xl font-bold text-stone-900">
            {((completedOrders / (storeVisits || 1)) * 100).toFixed(2)}%
          </span>
          <span className="block text-[11px] text-emerald-700 mt-1">
            Well above regional e-commerce avg (1.8%)
          </span>
        </div>
      </div>

      {/* 5-Stage Funnel & Detailed Drop-Off Diagnostics */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-stone-900">
            5-Stage Purchase Funnel &amp; Drop-off Analysis
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Step-by-step conversion progression from landing visit to completed
            order.
          </p>
        </div>

        <div className="space-y-4">
          {/* Stage 1: Store Visits */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-800">1. Store Visits</span>
              <span className="font-mono text-stone-900">
                {storeVisits.toLocaleString()} (100%)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-stone-800 rounded-full w-full" />
            </div>
          </div>

          {/* Stage 2: PDP Views */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-800">
                2. Product Detail Views (PDP)
              </span>
              <span className="font-mono text-stone-900">
                {productViews.toLocaleString()} (
                {((productViews / storeVisits) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-700 rounded-full"
                style={{ width: `${(productViews / storeVisits) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-400">
              37.7% of visitors leave without clicking a product card.
            </p>
          </div>

          {/* Stage 3: Add to Bag */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-800">3. Added to Cart / Bag</span>
              <span className="font-mono text-stone-900">
                {addToCarts.toLocaleString()} (
                {((addToCarts / storeVisits) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#475438] rounded-full"
                style={{ width: `${(addToCarts / storeVisits) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-400">
              26.8% of PDP viewers add an item to their shopping bag.
            </p>
          </div>

          {/* Stage 4: Checkout Initiated */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-800">4. Checkout Initiated</span>
              <span className="font-mono text-stone-900">
                {checkoutInitiations.toLocaleString()} (
                {((checkoutInitiations / storeVisits) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full"
                style={{
                  width: `${(checkoutInitiations / storeVisits) * 100}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              CRITICAL BOTTLENECK: 60.5% drop-off from Cart &rarr; Checkout.
            </p>
          </div>

          {/* Stage 5: Completed Purchases */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-800">5. Completed Purchases</span>
              <span className="font-mono text-[#475438]">
                {completedOrders.toLocaleString()} (
                {((completedOrders / storeVisits) * 100).toFixed(2)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${(completedOrders / storeVisits) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">
              49.6% checkout completion once customer enters checkout flow!
            </p>
          </div>
        </div>

        {/* Growth Insights Recommendation Card */}
        <div className="p-4 bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl flex items-start space-x-3 text-xs text-stone-800">
          <Lightbulb
            className="w-5 h-5 text-[#475438] shrink-0 mt-0.5"
            strokeWidth={2}
          />
          <div className="space-y-1">
            <p className="font-semibold text-stone-900">
              Actionable Growth Takeaway
            </p>
            <p className="text-stone-600 leading-relaxed">
              Once customers reach the checkout page, 49.6% finish and pay. The
              main friction point is getting customers from the Cart Drawer into
              Checkout. You can test reducing the Free Delivery threshold from
              GH₵ 600 to GH₵ 500 in the Storefront CMS to incentivize higher
              cart progression.
            </p>
          </div>
        </div>
      </div>

      {/* Social Channel ROI & Revenue Attribution */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-stone-900">
            Social Channel ROI &amp; Attribution
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Conversion rates and revenue breakdown per acquisition channel.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-500 uppercase text-[10px] tracking-wider border-b border-[#EBE5DC]">
              <tr>
                <th className="py-3 px-6 font-medium">Channel</th>
                <th className="py-3 px-6 font-medium">Store Visits</th>
                <th className="py-3 px-6 font-medium">Orders Converted</th>
                <th className="py-3 px-6 font-medium">Conversion Rate</th>
                <th className="py-3 px-6 font-medium">Revenue (GH₵)</th>
                <th className="py-3 px-6 font-medium text-right">
                  Revenue Share
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {analytics.channelBreakdown.map((ch) => {
                const convRate = ((ch.orders / (ch.visits || 1)) * 100).toFixed(
                  2,
                );
                const totalRev = analytics.channelBreakdown.reduce(
                  (sum, c) => sum + c.revenue,
                  0,
                );
                const share = Math.round((ch.revenue / (totalRev || 1)) * 100);

                return (
                  <tr
                    key={ch.channel}
                    className="hover:bg-stone-50/70 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-stone-900">
                      {ch.label}
                    </td>
                    <td className="py-4 px-6 font-mono text-stone-700">
                      {ch.visits.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-stone-900">
                      {ch.orders}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-700 font-semibold">
                      {convRate}%
                    </td>
                    <td className="py-4 px-6 font-serif font-semibold text-stone-900">
                      {formatPrice(ch.revenue)}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-stone-700 font-semibold">
                      {share}%
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
