"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminUser } from "../types";

interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "staff";
  exp: number;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const JWT_STORAGE_KEY = "cyns_hub_admin_jwt";
const JWT_COOKIE_NAME = "cyns_hub_admin_token";

/**
 * Creates a valid base64url encoded JWT token structure: header.payload.signature
 */
function createMockJWT(payload: JWTPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodeBase64Url = (obj: unknown) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(payload);
  const mockSignature = btoa("cyns_hub_secret_signature")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
}

/**
 * Decodes and validates a base64url JWT payload
 */
function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const payload = JSON.parse(atob(base64)) as JWTPayload;
    // Check expiry
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowInSeconds) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(JWT_STORAGE_KEY);
      if (stored && decodeJWT(stored)) return stored;
    } catch {
      // Ignored
    }
    return null;
  });

  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(JWT_STORAGE_KEY);
      if (stored) {
        const decoded = decodeJWT(stored);
        if (decoded) {
          return {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
          };
        }
      }
    } catch {
      // Ignored
    }
    return null;
  });

  const [isLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Input sanitization & validation
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return { success: false, error: "Please enter a valid email address." };
      }
      if (!password || password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters." };
      }

      // Default owner verification check
      const isOwner =
        (cleanEmail === "admin@cynshub.com" || cleanEmail === "owner@cynshub.com") &&
        (password === "admin123456" || password === "cynshub2026");

      // For seamless testing/demo, allow owner credentials or matching valid pattern
      if (!isOwner && cleanEmail !== "admin@cynshub.com") {
        return {
          success: false,
          error: "Invalid email or password. Use admin@cynshub.com / admin123456",
        };
      }

      // Generate JWT with 24-hour expiration
      const exp = Math.floor(Date.now() / 1000) + 86400; // 24 hours
      const payload: JWTPayload = {
        sub: "usr_cyn_owner_01",
        email: cleanEmail,
        name: "Cynthia E. (Store Owner)",
        role: "owner",
        exp,
      };

      const jwtToken = createMockJWT(payload);

      // Persist in localStorage and Cookie for SSR/middleware support
      try {
        localStorage.setItem(JWT_STORAGE_KEY, jwtToken);
        document.cookie = `${JWT_COOKIE_NAME}=${jwtToken}; path=/; max-age=86400; SameSite=Lax`;
      } catch {
        // Fallback for private browsing
      }

      setToken(jwtToken);
      setUser({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      });

      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(JWT_STORAGE_KEY);
      document.cookie = `${JWT_COOKIE_NAME}=; path=/; max-age=0`;
    } catch {
      // Ignored
    }
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

/**
 * Route protection wrapper for admin pages
 */
function AdminRouteGuardInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-stone-600">
          Loading Cyn&apos;s Hub Admin...
        </p>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-stone-600">
            Loading Cyn&apos;s Hub Admin...
          </p>
        </div>
      }
    >
      <AdminRouteGuardInner>{children}</AdminRouteGuardInner>
    </Suspense>
  );
}
