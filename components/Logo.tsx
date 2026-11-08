import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "hero" | "nav" | "footer";
  className?: string;
  href?: string;
}

/**
 * Brand Logo Component
 * 
 * To update with an official SVG or image asset later:
 * 1. Place your logo file in `/public/logo.svg` or `/public/logo.png`
 * 2. Replace the text mark inside this component with:
 *    `<Image src="/logo.svg" alt="Cyn's Hub Boutique" width={...} height={...} priority />`
 */
export default function Logo({
  variant = "default",
  className = "",
  href = "/",
}: LogoProps) {
  const isHero = variant === "hero";
  const isNav = variant === "nav";

  const content = (
    <div
      className={`group inline-flex flex-col select-none transition-all ${className}`}
      data-testid="brand-logo"
    >
      {isHero ? (
        <div className="flex flex-col items-start bg-black/35 backdrop-blur-md px-6 py-5 sm:px-8 sm:py-6 rounded-sm border border-white/20 shadow-xl max-w-fit">
          <span className="text-[10px] sm:text-xs tracking-[0.35em] text-stone-200 uppercase font-medium mb-1">
            Fashion &amp; Atelier
          </span>
          <span className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.18em] font-medium text-white uppercase leading-none drop-shadow-sm">
            Cyn&apos;s Hub
          </span>
          <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-white/20">
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-stone-300 uppercase">
              Boutique
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#D8C7B0] uppercase font-semibold">
              Accra
            </span>
          </div>
        </div>
      ) : isNav ? (
        <div className="flex flex-col items-center">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-medium text-stone-900 group-hover:opacity-85 transition-opacity uppercase">
            Cyn&apos;s Hub
          </span>
          <span className="text-[9px] tracking-[0.35em] text-stone-500 uppercase -mt-0.5">
            Boutique
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <span className="font-serif text-2xl tracking-[0.2em] font-medium text-stone-900 uppercase">
            Cyn&apos;s Hub
          </span>
          <span className="text-[9px] tracking-[0.3em] text-stone-500 uppercase">
            Boutique
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Cyn's Hub Boutique Home">
        {content}
      </Link>
    );
  }

  return content;
}
