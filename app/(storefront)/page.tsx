"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Check,
  Clock,
} from "lucide-react";
import { useCMSStore, cmsStore } from "../../lib/store/useCMSStore";
import { CUSTOMER_SENTIMENTS, FEATURED_REVIEWS } from "../../lib/data/products";
import ProductCard from "../../components/ProductCard";
import Logo from "../../components/Logo";

export default function StorefrontHomePage() {
  const { products, sections } = useCMSStore();
  const { hero, curatedCollections } = sections;

  useEffect(() => {
    cmsStore.recordFunnelEvent("visit");
  }, []);

  const newArrivals = products.slice(0, 4);
  const preOrderPicks = products.filter((p) => p.isPreOrder);

  return (
    <div className="flex flex-col">
      <h1 className="sr-only">store</h1>
      {/* 1. HERO SECTION */}
      <section
        className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[760px] flex items-end bg-[#EDE7DE] overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Full-bleed background photography */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={hero.backgroundImage || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1920"}
            alt="Cyn's Hub Boutique Collection"
            fill
            priority
            className="object-cover object-center lg:object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Logo sitting bottom center left of the hero section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 w-full">
          <div className="max-w-md">
            <Logo variant="hero" />
          </div>
        </div>
      </section>

      {/* 2. NEW ARRIVALS GRID */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-[#EBE5DC]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium tracking-wide">
              New Arrivals
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Fresh seasonal pieces added this week.
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-xs font-semibold tracking-[0.16em] uppercase text-stone-800 hover:text-[#475438] flex items-center space-x-1 group"
          >
            <span>Shop All New</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. CURATED EDITORIAL COLLECTION SPLIT */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {curatedCollections.map((collection) => (
            <div
              key={collection.id}
              className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm group"
              style={{ position: "relative" }}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D8C7B0] mb-1 block">
                  {collection.tag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3">
                  {collection.title}
                </h3>
                <Link
                  href={collection.linkHref}
                  className="inline-flex items-center space-x-1 text-xs font-semibold tracking-[0.18em] uppercase underline underline-offset-4 hover:text-[#D8C7B0] transition-colors"
                >
                  <span>{collection.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRE-ORDER SPOTLIGHT SECTION */}
      <section className="py-16 sm:py-24 bg-[#F5EFE8] mt-12 border-y border-[#E8DEC2]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-[#964F27] bg-[#F7EFE9] px-2.5 py-1 rounded mb-3 border border-[#E7D6CA]">
              <Clock className="w-3 h-3" strokeWidth={2} />
              <span>Direct Sourcing Model</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              The Pre-Order Collection
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              Order before the batch closing date. We source directly and deliver to your doorstep on the scheduled dispatch date, ensuring exclusivity and no excess waste.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {preOrderPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF & CUSTOMER REVIEWS (IMAGE 2 INSPIRATION) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white border border-[#EBE5DC] rounded-xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Overall Rating & Bar Breakdown */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-stone-200 pb-8 lg:pb-0 lg:pr-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                Ratings And Reviews
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-serif font-bold text-stone-900">4.8</span>
                <span className="text-stone-400 text-xl font-light">/ 5</span>
              </div>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                Based on 3,265 ratings and 189 verified buyer reviews
              </p>

              {/* Progress Bars */}
              <div className="space-y-2.5 text-xs text-stone-600 mb-8">
                {[
                  { star: 5, pct: "85%" },
                  { star: 4, pct: "11%" },
                  { star: 3, pct: "3%" },
                  { star: 2, pct: "1%" },
                  { star: 1, pct: "0%" },
                ].map((row) => (
                  <div key={row.star} className="flex items-center space-x-3">
                    <span className="w-8 flex items-center space-x-1 font-medium text-stone-700">
                      <Star className="w-3 h-3 fill-[#D49028] text-[#D49028]" />
                      <span>{row.star}</span>
                    </span>
                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-stone-900 rounded-full"
                        style={{ width: row.pct }}
                      />
                    </div>
                    <span className="w-8 text-right text-[11px] text-stone-400">
                      {row.pct}
                    </span>
                  </div>
                ))}
              </div>

              {/* What Customers Felt Tags */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-3">
                  What Our Customers Felt
                </span>
                <div className="flex flex-wrap gap-2">
                  {CUSTOMER_SENTIMENTS.map((item) => (
                    <span
                      key={item.tag}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FAF8F5] border border-stone-200 text-stone-700 shadow-2xs"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Featured Testimonials Carousel */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="space-y-6">
                {FEATURED_REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 bg-[#FAF8F5] rounded-lg border border-[#EBE5DC]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">
                          {review.author}
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          {review.location} • {review.date}
                        </span>
                      </div>
                      <div className="flex items-center space-x-0.5 text-xs">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-[#D49028] text-[#D49028]"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed italic mb-3">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 text-[10px] text-[#475438] bg-[#475438]/10 px-2 py-0.5 rounded font-medium">
                        <Check className="w-3 h-3" strokeWidth={2.5} />
                        <span>Verified Purchase</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
