"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useAdminAuth } from "../../../lib/store/auth";
import Logo from "../../../components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAdminAuth();

  const [email, setEmail] = useState("admin@cynshub.com");
  const [password, setPassword] = useState("admin123456");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect to admin overview
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.replace("/admin");
      } else {
        setErrorMessage(
          result.error ||
            "Authentication failed. Please check your credentials.",
        );
      }
    } catch {
      setErrorMessage(
        "An unexpected error occurred during sign-in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-stone-900 selection:bg-[#475438]/20 selection:text-[#475438]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-block mb-6">
          <Logo variant="default" />
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-stone-200/60 rounded-full text-[11px] font-medium text-stone-700 tracking-wider uppercase mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#475438]" strokeWidth={2} />
          <span>Commerce Control Center</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900">
          Sign In to Cyn&apos;s Hub Admin
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-500">
          Manage your boutique catalog, orders, and business analytics.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-stone-200/50 border border-[#EBE5DC] rounded-xl">
          {errorMessage && (
            <div
              className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2.5 text-xs text-red-700"
              role="alert"
            >
              <AlertCircle
                className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 mb-1.5"
              >
                Owner Email Address
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cynshub.com"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#475438] focus:border-transparent transition-all bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#475438] focus:border-transparent transition-all bg-stone-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-lg flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-stone-200/80 text-center">
            <p className="text-[11px] text-stone-500 mb-1">
              Store Owner Demo Credentials:
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-mono bg-[#FAF8F5] px-2.5 py-1 rounded border border-stone-200 text-stone-700">
              <span>admin@cynshub.com</span>
              <span className="text-stone-300">/</span>
              <span>admin123456</span>
            </div>
          </div>
        </div>

        {/* Back to Storefront Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors"
          >
            ← Return to Cyn&apos;s Hub Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
