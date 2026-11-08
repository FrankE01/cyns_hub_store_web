"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ChevronRight, Check, Share2, MessageCircle } from "lucide-react";
import { Product, Size } from "../../lib/types";
import { formatPrice } from "../../lib/utils";
import { useCart } from "../../lib/store/cart";
import { useCMSStore, cmsStore } from "../../lib/store/useCMSStore";
import PDPGallery from "./PDPGallery";
import DeliveryCountdown from "./DeliveryCountdown";
import VariantSelector from "./VariantSelector";
import PDPAccordions from "./PDPAccordions";
import RatingsAndReviews from "./RatingsAndReviews";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { addItem, openDrawer } = useCart();
  const { sections } = useCMSStore();

  const [selectedSize, setSelectedSize] = useState<Size>(
    product.availableSizes[0] || "S"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors[0]?.name || "Standard"
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Track product view funnel analytics
  useEffect(() => {
    cmsStore.recordFunnelEvent("view");
  }, [product.id]);

  // Active color hex
  const activeColorObj = product.availableColors.find(
    (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
  ) || product.availableColors[0] || { name: "Standard", hex: "#1C1917" };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: activeColorObj.name,
      colorHex: activeColorObj.hex,
      quantity: 1,
      isPreOrder: product.isPreOrder,
      preOrderDispatchDate: product.preOrderDispatchDate,
    });

    cmsStore.recordFunnelEvent("add_to_cart");

    setAddedToast(true);
    openDrawer();
    setTimeout(() => {
      setAddedToast(false);
    }, 1500);
  };

  const handleShare = async () => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `${product.name} | Cyn's Hub`,
      text: `Check out ${product.name} on Cyn's Hub Ghana:`,
      url: pageUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed share dialog or browser fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(pageUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        // clipboard access failure fallback
      }
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappInquiryMessage = encodeURIComponent(
    `Hello Cyn's Hub! I'm interested in the ${product.name} (Size: ${selectedSize}, Colour: ${selectedColor}). Could you share more details or confirm delivery timeline? Link: ${currentUrl}`
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6 sm:mb-8">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <Link href="/shop" className="hover:text-stone-900 transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <Link
          href={`/shop/${product.category}`}
          className="capitalize hover:text-stone-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Left: Gallery, Right: Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-7">
          <PDPGallery
            images={product.images}
            productName={product.name}
            isPreOrder={product.isPreOrder}
          />
        </div>

        {/* Product Details Column */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Header & Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-2.5 flex items-baseline space-x-3">
              <span className="text-xl sm:text-2xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Delivery or Pre-Order Countdown Box */}
          <DeliveryCountdown
            isPreOrder={product.isPreOrder}
            preOrderDispatchDate={product.preOrderDispatchDate}
            preOrderCutoffDate={product.preOrderCutoffDate}
          />

          {/* Size & Colour Selector */}
          <VariantSelector
            availableSizes={product.availableSizes}
            availableColors={product.availableColors}
            variants={product.variants}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />

          {/* Actions: Add to Cart + Wishlist + Share */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-[0.99]"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Cart</span>
                )}
              </button>

              {/* Heart Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white hover:bg-stone-50 text-stone-700"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  strokeWidth={1.75}
                />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="w-12 h-12 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-colors relative"
                aria-label="Share product"
                title="Share this product"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                ) : (
                  <Share2 className="w-4 h-4" strokeWidth={1.75} />
                )}
                {copiedLink && (
                  <span className="absolute -top-8 px-2 py-0.5 bg-stone-900 text-white text-[10px] font-medium rounded-md whitespace-nowrap shadow-xs">
                    Link copied!
                  </span>
                )}
              </button>
            </div>

            {/* Inquire on WhatsApp Button */}
            <a
              href={`https://wa.me/${(sections.policies.whatsappNumber || "233240000000").replace(/[^0-9]/g, "")}?text=${whatsappInquiryMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold uppercase tracking-[0.14em] rounded-full flex items-center justify-center space-x-2 transition-all shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" strokeWidth={2} />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

          {/* Collapsible Accordions (Offers, Details, Delivery) */}
          <PDPAccordions
            description={product.description}
            details={product.details}
            offers={product.offers}
          />
        </div>
      </div>

      {/* Ratings & Reviews Section (Image 2) */}
      <RatingsAndReviews
        rating={product.rating}
        reviewCount={product.reviewCount}
        ratingBreakdown={product.ratingBreakdown}
        sentiments={product.customerSentiments}
        reviews={product.reviews}
      />

      {/* "You might also like" (Image 2) */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
