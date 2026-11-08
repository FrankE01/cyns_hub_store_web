import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Logo from "../components/Logo";

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-[#475438]/20 selection:text-[#475438]">
      {/* Header Bar */}
      <header className="h-20 border-b border-[#EBE5DC] bg-[#FAF8F5]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo variant="default" />
        <Link
          href="/shop"
          className="text-xs uppercase font-semibold tracking-[0.16em] text-stone-800 hover:text-[#475438] transition-colors"
        >
          View Collection
        </Link>
      </header>

      {/* Main Not Found Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-200/60 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-700 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#475438]" strokeWidth={2} />
          <span>Page Not Found</span>
        </div>

        <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal text-stone-300 tracking-tight block select-none">
          404
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-900 tracking-tight mt-2 mb-4">
          This Silhouette Has Moved or Ended
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-8">
          The silhouette, collection, or link you are seeking may have concluded its release or been updated in our catalog.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mb-12">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 h-11 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop New Arrivals</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 h-11 border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold uppercase tracking-[0.16em] rounded-full flex items-center justify-center space-x-2 transition-all shadow-2xs"
          >
            <span>Return Home</span>
          </Link>
        </div>

        {/* Curated Category Shortcuts */}
        <div className="w-full max-w-2xl border-t border-[#EBE5DC] pt-10">
          <span className="text-[11px] uppercase font-semibold tracking-[0.2em] text-stone-400 block mb-6">
            Curated Departments
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              href="/shop/dresses"
              className="p-4 bg-white rounded-lg border border-[#EBE5DC] hover:border-stone-900 hover:shadow-2xs transition-all group"
            >
              <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#475438]">
                Dresses
              </p>
              <span className="text-[11px] text-stone-500 flex items-center space-x-1 mt-1">
                <span>View pieces</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/shop/sets"
              className="p-4 bg-white rounded-lg border border-[#EBE5DC] hover:border-stone-900 hover:shadow-2xs transition-all group"
            >
              <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#475438]">
                Co-Ord Sets
              </p>
              <span className="text-[11px] text-stone-500 flex items-center space-x-1 mt-1">
                <span>View pieces</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/shop/blazers"
              className="p-4 bg-white rounded-lg border border-[#EBE5DC] hover:border-stone-900 hover:shadow-2xs transition-all group"
            >
              <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#475438]">
                Blazers &amp; Tops
              </p>
              <span className="text-[11px] text-stone-500 flex items-center space-x-1 mt-1">
                <span>View pieces</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/shop/accessories"
              className="p-4 bg-white rounded-lg border border-[#EBE5DC] hover:border-stone-900 hover:shadow-2xs transition-all group"
            >
              <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#475438]">
                Accessories
              </p>
              <span className="text-[11px] text-stone-500 flex items-center space-x-1 mt-1">
                <span>View pieces</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer minimal notice */}
      <footer className="py-6 border-t border-[#EBE5DC] text-center text-xs text-stone-400">
        &copy;{" "}
        <Suspense fallback={<span>2026</span>}>
          <CurrentYear />
        </Suspense>{" "}
        Cyn&apos;s Hub Boutique. All rights reserved.
      </footer>
    </div>
  );
}
