"use client";

import React, { useState } from "react";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Review } from "../../lib/types";

interface RatingsAndReviewsProps {
  rating: number;
  reviewCount: number;
  ratingBreakdown?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  sentiments?: string[];
  reviews?: Review[];
}

export default function RatingsAndReviews({
  rating = 4.5,
  reviewCount = 189,
  ratingBreakdown = {
    5: 78,
    4: 15,
    3: 4,
    2: 2,
    1: 1,
  },
  sentiments = ["Light Weight", "Value For Money", "Comfort", "Quality", "Appeal"],
  reviews = [
    {
      id: "rev-1",
      author: "Sandra Rox",
      location: "Accra, Ghana",
      rating: 5,
      date: "3 days ago",
      comment:
        "I wasn't sure at first, but this blazer exceeded expectations. The fit is perfect relaxed but structured and the fabric feels premium. I've worn it to work, dinner, and even on casual weekends. It's become a go-to staple in my wardrobe.",
      verifiedPurchase: true,
    },
    {
      id: "rev-2",
      author: "Abena Darko",
      location: "Kumasi, Ghana",
      rating: 5,
      date: "1 week ago",
      comment:
        "Absolutely stunning piece! The linen drape is breathable and doesn't crease horribly like cheaper linen. Delivered to Kumasi within 48 hours without hassle.",
      verifiedPurchase: true,
    },
    {
      id: "rev-3",
      author: "Nana Yaa",
      location: "Tema, Ghana",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "True to size and beautiful neutral color palette. Pairs effortlessly with wide leg denim or tailored trousers. Highly recommended!",
      verifiedPurchase: true,
    },
  ],
}: RatingsAndReviewsProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [activeSentiment, setActiveSentiment] = useState<string | null>(null);

  const displayReviews = reviews.length > 0 ? reviews : [];
  const currentReview = displayReviews[currentReviewIndex];

  const handleNext = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const handlePrev = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  return (
    <section className="mt-16 pt-12 border-t border-stone-200">
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          Ratings And Reviews
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Score Breakdown & Customer Sentiments */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-start space-x-8">
            {/* Big Score */}
            <div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
                {rating.toFixed(1)}
                <span className="text-xl sm:text-2xl font-normal text-stone-400">/5</span>
              </div>
              <p className="mt-1 text-xs text-stone-500 font-medium">
                3265 Ratings and {reviewCount} Reviews
              </p>
            </div>

            {/* Star Distribution Bars */}
            <div className="flex-1 space-y-1.5 max-w-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage =
                  ratingBreakdown[stars as keyof typeof ratingBreakdown] || 0;
                return (
                  <div key={stars} className="flex items-center space-x-2 text-xs">
                    <span className="flex items-center space-x-0.5 text-stone-600 w-6 justify-end text-[11px]">
                      <span>{stars}</span>
                      <Star className="w-2.5 h-2.5 fill-[#D49028] text-[#D49028]" />
                    </span>
                    <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-stone-900 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What Our Customers Felt */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2.5">
              What Our Customers Felt
            </h3>
            <div className="flex flex-wrap gap-2">
              {sentiments.map((tag) => {
                const isActive = activeSentiment === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveSentiment(isActive ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-stone-50 border border-stone-200 text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Featured Customer Review Card */}
        {currentReview && (
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-xs">
              {/* Reviewer Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    {currentReview.author}
                  </h4>
                  <p className="text-xs text-stone-500">{currentReview.location}</p>
                </div>

                {/* Prev and Next buttons matching Image 2 carousel */}
                {displayReviews.length > 1 && (
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-7 h-7 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-7 h-7 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Star Rating */}
              <div className="mt-2.5 flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < currentReview.rating
                        ? "fill-[#D49028] text-[#D49028]"
                        : "text-stone-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Comment Quote */}
              <p className="mt-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                &ldquo;{currentReview.comment}&rdquo;
              </p>

              {/* Indicators row */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
                {/* Dots */}
                {displayReviews.length > 1 && (
                  <div className="flex items-center space-x-1.5">
                    {displayReviews.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentReviewIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentReviewIndex === idx
                            ? "w-5 bg-stone-900"
                            : "w-1.5 bg-stone-300 hover:bg-stone-400"
                        }`}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="text-xs font-semibold text-stone-800 hover:text-stone-950 underline underline-offset-4 ml-auto"
                >
                  View all reviews
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
