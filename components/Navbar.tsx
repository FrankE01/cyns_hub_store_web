"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { useCart } from "../lib/store/cart";
import { useCMSStore } from "../lib/store/useCMSStore";
import Logo from "./Logo";

export default function Navbar() {
  const { totalCount, openDrawer } = useCart();
  const { categories } = useCMSStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "NEW ARRIVALS", href: "/shop" },
    ...categories
      .filter((c) => c.slug !== "new-arrivals")
      .map((c) => ({
        label: c.name.toUpperCase(),
        href: `/shop/${c.slug}`,
      })),
    { label: "PRE-ORDERS", href: "/shop?filter=preorder" },
    { label: "ABOUT", href: "/about" },
  ];

  // Prevent background scrolling on mobile when sidebar menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const mobileDrawerContent =
    mobileMenuOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Dimmed backdrop overlay covering full viewport */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out drawer panel */}
            <aside className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl flex flex-col p-6 z-50 border-r border-[#EBE5DC] overflow-y-auto">
              <div className="flex items-center justify-between pb-6 border-b border-[#EBE5DC]">
                <Logo variant="default" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-stone-500 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-sm cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-4 text-xs font-medium tracking-[0.16em]">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-stone-800 hover:text-[#475438] border-b border-[#EBE5DC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-xs"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-[#EBE5DC] text-xs text-stone-500 space-y-2">
                <p>Ghana Delivery & Pre-Order Service</p>
                <p className="font-medium text-stone-800">
                  Customer Support Available
                </p>
              </div>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-stone-700 hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-sm cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Logo variant="nav" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.18em] text-stone-700">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-stone-950 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#475438] hover:after:w-full after:transition-all after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2 rounded-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action Icons: Search, Wishlist, Cart */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-stone-700">
              <Link
                href="/shop"
                className="p-2 hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-full"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </Link>

              <Link
                href="/admin"
                className="hidden sm:flex p-2 hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-full"
                aria-label="Account / Support"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>

              <button
                type="button"
                onClick={openDrawer}
                className="p-2 relative hover:text-stone-950 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] rounded-full"
                aria-label={`Shopping Cart with ${totalCount} items`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalCount > 0 && (
                  <span className="absolute 0.5 top-0.5 right-0.5 bg-[#475438] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Render mobile drawer outside header directly to document.body to avoid header's backdrop-filter containing block trap */}
      {mobileDrawerContent}
    </>
  );
}
