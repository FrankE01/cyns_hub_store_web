"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  FolderTree,
  Sparkles,
  BarChart3,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { AdminAuthProvider, AdminRouteGuard, useAdminAuth } from "../../lib/store/auth";
import { useCMSStore } from "../../lib/store/useCMSStore";
import Logo from "../../components/Logo";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders & Dispatch", href: "/admin/orders", icon: ShoppingBag, badge: "orders" },
  { label: "Products & Stock", href: "/admin/products", icon: Layers },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Storefront CMS", href: "/admin/cms", icon: Sparkles },
  { label: "Growth Analytics", href: "/admin/analytics", icon: BarChart3 },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const { orders } = useCMSStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on login page, render full-bleed without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Count orders pending action (awaiting payment, processing, or awaiting stock)
  const pendingOrdersCount = orders.filter(
    (o) =>
      o.fulfillmentStatus === "awaiting_payment" ||
      o.fulfillmentStatus === "processing" ||
      o.fulfillmentStatus === "awaiting_stock" ||
      o.fulfillmentStatus === "ready_for_dispatch"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-stone-900 flex flex-col lg:flex-row selection:bg-[#475438]/20 selection:text-[#475438]">
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#EBE5DC] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#EBE5DC]">
          <div className="flex flex-col">
            <Logo variant="nav" />
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#475438] mt-0.5">
              Control Center
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4 border-b border-[#EBE5DC]">
          <Link
            href="/admin/products/new"
            onClick={() => setMobileSidebarOpen(false)}
            className="w-full h-10 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.14em] rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Silhouette</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-[#FAF8F5] text-stone-950 font-semibold border border-[#EBE5DC] shadow-2xs"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#475438]" : "text-stone-400"}`}
                    strokeWidth={1.75}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge === "orders" && pendingOrdersCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#475438] text-white">
                    {pendingOrdersCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Storefront Link & User Profile */}
        <div className="p-4 border-t border-[#EBE5DC] space-y-3 bg-[#FAF8F5]/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-stone-600 hover:text-stone-900 py-1 transition-colors group"
          >
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Storefront</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
          </Link>

          <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#475438] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                C
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-stone-900 truncate">
                  {user?.name || "Cynthia E."}
                </p>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                  {user?.role || "Store Owner"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="lg:hidden h-16 bg-white border-b border-[#EBE5DC] px-4 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-stone-700 hover:text-stone-950 -ml-2"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <Logo variant="nav" />
          <Link
            href="/"
            target="_blank"
            className="p-2 text-stone-600 hover:text-stone-950"
            title="View Store"
          >
            <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminLoadingShell() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
      <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-stone-600">
        Loading Cyn&apos;s Hub Admin...
      </p>
    </div>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<AdminLoadingShell />}>
        <AdminRouteGuard>
          <AdminShell>{children}</AdminShell>
        </AdminRouteGuard>
      </Suspense>
    </AdminAuthProvider>
  );
}
