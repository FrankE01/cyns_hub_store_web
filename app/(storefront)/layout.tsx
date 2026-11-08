import React from "react";
import { CartProvider } from "../../lib/store/cart";
import AnnouncementBar from "../../components/AnnouncementBar";
import Navbar from "../../components/Navbar";
import CartDrawer from "../../components/CartDrawer";
import Footer from "../../components/Footer";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#475438]/20 selection:text-[#475438]">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
}
