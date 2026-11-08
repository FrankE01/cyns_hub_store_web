"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Mail,
  Heart,
  MessageCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import { useCMSStore } from "../lib/store/useCMSStore";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line
        x1="17.5"
        y1="6.5"
        x2="17.51"
        y2="6.5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TikTokIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function Footer() {
  const { categories, sections } = useCMSStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EBE5DC] text-stone-800">
      {/* 4 Feature Value Pillars */}
      <div className="border-b border-[#EBE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* 1 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#EBE5DC]/60 flex items-center justify-center text-[#475438] shrink-0">
                <Gift className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Cyn&apos;s VIP Circle
                </h4>
                <p className="text-[11px] text-stone-600 mb-2 leading-relaxed">
                  Early access to limited pre-order batches and exclusive drops.
                </p>
                <Link
                  href="/about"
                  className="group inline-flex items-center space-x-1 text-[10px] font-bold tracking-widest uppercase text-[#475438] underline underline-offset-4 hover:text-[#3A452E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2 rounded-xs"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#EBE5DC]/60 flex items-center justify-center text-[#475438] shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Get 10% Off
                </h4>
                <p className="text-[11px] text-stone-600 mb-2 leading-relaxed">
                  Sign up for our style journal and save on your first order.
                </p>
                <a
                  href="#newsletter"
                  className="group inline-flex items-center space-x-1 text-[10px] font-bold tracking-widest uppercase text-[#475438] underline underline-offset-4 hover:text-[#3A452E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2 rounded-xs"
                >
                  <span>Sign Up Below</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#EBE5DC]/60 flex items-center justify-center text-[#475438] shrink-0">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
                  Love Cyn&apos;s Hub?
                </h4>
                <p className="text-[11px] text-stone-600 mb-2 leading-relaxed">
                  Refer a friend and you both get GH₵&nbsp;50 off your next purchase.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center space-x-1 text-[10px] font-bold tracking-widest uppercase text-[#475438] underline underline-offset-4 hover:text-[#3A452E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2 rounded-xs"
                >
                  <span>Get Code</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* 4 Photo preview */}
            <div
              className="hidden md:block relative h-24 rounded-lg overflow-hidden border border-[#EBE5DC]"
              style={{ position: "relative" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"
                alt="Curated Collection"
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-stone-900/20 flex items-center justify-center pointer-events-none">
                <span className="text-white text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 bg-black/40 backdrop-blur-xs rounded-sm">
                  Made for You
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">
              Shop
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  New Arrivals
                </Link>
              </li>
              {categories
                .filter((c) => c.slug !== "new-arrivals")
                .map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/shop/${cat.slug}`}
                      className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/shop?filter=preorder"
                  className="text-[#964F27] font-semibold hover:text-[#7A3F1E] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#964F27] rounded-xs"
                >
                  Pre-Order Batches
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Size Guide & Fit
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  FAQs & Pre-Order Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">
              About Cyn&apos;s
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Why Pre-Order?
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Quality Commitment
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
                >
                  Studio Location (Accra)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">
              Follow Us
            </h5>
            <div className="flex items-center space-x-3 text-stone-700 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D9D3C8] flex items-center justify-center hover:bg-stone-900 hover:border-stone-900 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D9D3C8] flex items-center justify-center hover:bg-stone-900 hover:border-stone-900 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/${(sections.policies.whatsappNumber || "233240000000").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#D9D3C8] flex items-center justify-center hover:bg-[#475438] hover:border-[#475438] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
            <p className="font-serif italic text-lg text-stone-700">
              Let&apos;s be friends!
            </p>
          </div>

          {/* Col 5: Newsletter */}
          <div className="col-span-2 md:col-span-1" id="newsletter">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">
              Stay in the Know
            </h5>
            <p className="text-xs text-stone-600 mb-3 leading-relaxed">
              Sign up for drop dates, styling edits, and member-only promotions.
            </p>

            {subscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="p-3.5 bg-[#475438]/10 border border-[#475438]/20 text-[#475438] text-xs rounded-md flex items-center space-x-2.5"
              >
                <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
                <span className="font-medium">
                  You&apos;re subscribed! Check your inbox for your 10% code.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D9D3C8] focus:border-[#475438] focus:ring-1 focus:ring-[#475438] focus:outline-none placeholder-stone-500 text-stone-900 rounded-sm transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#475438] text-white text-[11px] font-bold tracking-[0.18em] uppercase py-2.5 hover:bg-[#3A452E] active:scale-[0.99] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#475438] focus-visible:ring-offset-2 rounded-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Rights & Policy */}
        <div className="mt-14 pt-8 border-t border-[#EBE5DC] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 space-y-3 sm:space-y-0">
          <p>© 2026 Cyn&apos;s Hub Boutique. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link
              href="/privacy"
              className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-stone-400">•</span>
            <Link
              href="/terms"
              className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
            >
              Terms & Conditions
            </Link>
            <span aria-hidden="true" className="text-stone-400">•</span>
            <Link
              href="/shipping"
              className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#475438] rounded-xs"
            >
              Delivery Rates
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
