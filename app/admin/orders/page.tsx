"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  MapPin,
  X,
  Phone,
} from "lucide-react";
import { useCMSStore, cmsStore } from "../../../lib/store/useCMSStore";
import { Order, FulfillmentStatus, PaymentStatus } from "../../../lib/types";
import { formatPrice } from "../../../lib/utils";

const STATUS_TABS = [
  { id: "all", label: "All Orders" },
  { id: "awaiting_payment", label: "Awaiting Payment" },
  { id: "processing", label: "Paid / Processing" },
  { id: "preorder", label: "Pre-Orders" },
  { id: "ready_for_dispatch", label: "Ready to Dispatch" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "completed", label: "Completed" },
];

export default function AdminOrdersPage() {
  const { orders } = useCMSStore();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    // Filter by tab
    if (activeTab === "preorder" && !order.isPreOrder) return false;
    if (activeTab !== "all" && activeTab !== "preorder" && order.fulfillmentStatus !== activeTab) {
      return false;
    }

    // Filter by search
    const query = search.toLowerCase();
    return (
      order.reference.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      (order.digitalAddress && order.digitalAddress.toLowerCase().includes(query))
    );
  });

  const handleUpdateFulfillment = (orderId: string, status: FulfillmentStatus) => {
    cmsStore.updateOrderStatus(orderId, status);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, fulfillmentStatus: status });
    }
  };

  const handleUpdatePayment = (orderId: string, status: PaymentStatus) => {
    cmsStore.updateOrderPayment(orderId, status);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: status });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Customer Fulfillment
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Order Management &amp; Dispatch
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track Ghanaian delivery logistics, verify MoMo payments, and coordinate courier dispatch.
          </p>
        </div>

        <span className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded-lg text-stone-700 self-start sm:self-auto">
          Total: {orders.length} orders
        </span>
      </div>

      {/* Tabs & Search */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count =
              tab.id === "all"
                ? orders.length
                : tab.id === "preorder"
                ? orders.filter((o) => o.isPreOrder).length
                : orders.filter((o) => o.fulfillmentStatus === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-stone-900 text-white shadow-2xs font-semibold"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-stone-700 text-white" : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#EBE5DC] shadow-xs flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by CYN-reference, customer name, phone, or Ghana GPS..."
              className="w-full pl-9 pr-3.5 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">
            Showing {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#EBE5DC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-500 uppercase text-[10px] tracking-wider border-b border-[#EBE5DC]">
              <tr>
                <th className="py-3.5 px-6 font-medium">Ref &amp; Date</th>
                <th className="py-3.5 px-6 font-medium">Customer &amp; Phone</th>
                <th className="py-3.5 px-6 font-medium">Location</th>
                <th className="py-3.5 px-6 font-medium">Items &amp; Type</th>
                <th className="py-3.5 px-6 font-medium">Amount</th>
                <th className="py-3.5 px-6 font-medium">Payment</th>
                <th className="py-3.5 px-6 font-medium">Fulfillment Status</th>
                <th className="py-3.5 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DC]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-stone-400">
                    No orders matching the selected tab and search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-stone-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-stone-900 block">
                        {order.reference}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
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
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 hover:border-stone-900 text-stone-800 text-[11px] font-semibold transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <aside className="w-screen max-w-lg bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#EBE5DC] overflow-y-auto">
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#EBE5DC] flex items-center justify-between bg-white">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-base font-bold text-stone-900">
                      {selectedOrder.reference}
                    </span>
                    {selectedOrder.isPreOrder && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7EFE9] text-[#964F27]">
                        Pre-Order
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Placed on{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 flex-1">
                {/* 1. Customer & WhatsApp Direct Contact */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Customer Dossier
                    </span>
                    <a
                      href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello ${selectedOrder.customerName}! This is Cyn's Hub regarding your order ${selectedOrder.reference}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded-full text-xs font-semibold shadow-2xs hover:bg-emerald-600 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>

                  <div className="text-xs space-y-1 text-stone-800">
                    <p className="font-bold text-sm text-stone-900">
                      {selectedOrder.customerName}
                    </p>
                    <p className="flex items-center space-x-1.5 text-stone-600">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{selectedOrder.customerPhone}</span>
                    </p>
                    {selectedOrder.customerEmail && (
                      <p className="text-stone-500">{selectedOrder.customerEmail}</p>
                    )}
                  </div>

                  {/* Ghana Delivery Logistics */}
                  <div className="pt-3 border-t border-stone-100 space-y-1 text-xs">
                    <p className="font-semibold text-stone-900 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#475438]" />
                      <span>Delivery Destination</span>
                    </p>
                    <p className="text-stone-700 pl-5">{selectedOrder.deliveryAddress}</p>
                    <p className="text-stone-500 pl-5">{selectedOrder.deliveryRegion}</p>
                    {selectedOrder.digitalAddress && (
                      <p className="pl-5 font-mono text-[11px] text-[#475438] font-bold">
                        GPS: {selectedOrder.digitalAddress}
                      </p>
                    )}
                    {selectedOrder.deliveryNotes && (
                      <p className="pl-5 pt-1 text-[11px] text-stone-500 italic">
                        &quot;{selectedOrder.deliveryNotes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Payment Verification */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Payment Status
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {selectedOrder.paymentMethod.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleUpdatePayment(selectedOrder.id, "paid")}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedOrder.paymentStatus === "paid"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      Mark Paid
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdatePayment(selectedOrder.id, "pending")}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedOrder.paymentStatus === "pending"
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdatePayment(selectedOrder.id, "refunded")}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedOrder.paymentStatus === "refunded"
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      Refunded
                    </button>
                  </div>
                </div>

                {/* 3. Fulfillment Pipeline Stepper */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Fulfillment Progress
                  </span>

                  <select
                    value={selectedOrder.fulfillmentStatus}
                    onChange={(e) =>
                      handleUpdateFulfillment(
                        selectedOrder.id,
                        e.target.value as FulfillmentStatus
                      )
                    }
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-900 bg-stone-50"
                  >
                    <option value="awaiting_payment">Awaiting Payment</option>
                    <option value="processing">Paid &amp; Processing</option>
                    <option value="awaiting_stock">Awaiting Stock / Pre-Order</option>
                    <option value="ready_for_dispatch">Ready for Dispatch</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="completed">Completed / Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* 4. Purchased Items Breakdown */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">
                    Line Items ({selectedOrder.items.length})
                  </span>

                  <div className="divide-y divide-stone-100">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="py-3 flex space-x-3 text-xs">
                        <div className="relative w-12 h-16 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200">
                          <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-semibold text-stone-900">{item.productName}</p>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              Size: <span className="font-bold">{item.size}</span> • Color: {item.color} • Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-serif font-semibold text-stone-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financials summary */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee ({selectedOrder.deliveryRegion})</span>
                      <span className="font-mono">
                        {selectedOrder.deliveryFee === 0
                          ? "FREE"
                          : formatPrice(selectedOrder.deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Amount</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
