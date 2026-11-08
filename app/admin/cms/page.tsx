"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Save,
  Check,
  Eye,
  DollarSign,
} from "lucide-react";
import { useCMSStore, cmsStore } from "../../../lib/store/useCMSStore";

export default function StorefrontCMSPage() {
  const { sections } = useCMSStore();

  const [announcement, setAnnouncement] = useState(sections.announcement);
  const [hero, setHero] = useState(sections.hero);
  const [curated, setCurated] = useState(sections.curatedCollections);
  const [policies, setPolicies] = useState(sections.policies);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.updateAnnouncement(announcement);
    cmsStore.updateHero(hero);
    cmsStore.updateCuratedCollections(curated);
    cmsStore.updatePolicies(policies);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCuratedChange = (
    index: number,
    field: "tag" | "title" | "linkText" | "linkHref" | "image",
    value: string
  ) => {
    const updated = [...curated];
    updated[index] = { ...updated[index], [field]: value };
    setCurated(updated);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#EBE5DC]">
        <div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#475438]">
            Content Management System
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
            Storefront Merchandising &amp; Visuals
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Directly customize the public homepage hero banner, top announcement ticker, and curated drops.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            target="_blank"
            className="h-10 px-4 rounded-lg border border-stone-300 hover:border-stone-900 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-stone-800 flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Eye className="w-4 h-4 text-stone-500" />
            <span>Preview Store</span>
          </Link>

          <button
            type="submit"
            className="h-10 px-5 rounded-lg bg-[#475438] hover:bg-[#3A452E] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center space-x-2 transition-all shadow-sm active:scale-[0.99]"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" strokeWidth={2.5} />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-xs text-emerald-800 animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" strokeWidth={2.5} />
          <div>
            <p className="font-semibold text-emerald-900">Storefront Updated Successfully!</p>
            <p className="text-emerald-700">
              Your edits are now live on the customer storefront.
            </p>
          </div>
        </div>
      )}

      {/* 1. ANNOUNCEMENT BAR SECTION */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-[#D8C7B0]" strokeWidth={2} />
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Top Announcement Ticker
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-medium text-stone-700">
              {announcement.enabled ? "Active on Storefront" : "Disabled"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={announcement.enabled}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, enabled: e.target.checked })
                }
                className="sr-only peer"
                aria-label="Toggle announcement bar visibility"
              />
              <div className="w-10 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#475438]"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Announcement Message
            </label>
            <input
              type="text"
              value={announcement.text}
              onChange={(e) =>
                setAnnouncement({ ...announcement, text: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
              placeholder="e.g. Pre-orders open for the Festive Drop — Free delivery in Greater Accra..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Call-to-Action Link Text
            </label>
            <input
              type="text"
              value={announcement.linkText}
              onChange={(e) =>
                setAnnouncement({ ...announcement, linkText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
              placeholder="e.g. Shop Now"
            />
          </div>
        </div>

        {/* Live Preview Bar */}
        <div className="pt-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1.5">
            Announcement Bar Preview
          </span>
          <div className="bg-[#1C1917] text-[#FAF8F5] text-xs font-medium py-2.5 px-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#D8C7B0] shrink-0" strokeWidth={1.75} />
              <span className="truncate">{announcement.text || "Your announcement message..."}</span>
              <span className="underline underline-offset-4 text-[#D8C7B0] shrink-0 font-semibold cursor-pointer">
                {announcement.linkText || "Shop Now"}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest ml-2">Preview</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div className="pb-4 border-b border-stone-100">
          <h2 className="font-serif text-lg font-medium text-stone-900">
            Homepage Hero Section
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            The primary visual and campaign messaging greeting customers on arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Primary Hero Headline
              </label>
              <textarea
                rows={2}
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
                placeholder="Editorial headline..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Subheadline / Campaign Description
              </label>
              <textarea
                rows={2}
                value={hero.subheadline}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
                placeholder="Campaign subtext..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={hero.ctaText}
                  onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
                  placeholder="e.g. Explore Collection"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  CTA Destination URL
                </label>
                <input
                  type="text"
                  value={hero.ctaLink}
                  onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
                  placeholder="e.g. /shop"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Hero Background Photography URL
              </label>
              <input
                type="url"
                value={hero.backgroundImage}
                onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-[#475438] focus:border-transparent outline-none bg-stone-50/50"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Hero Visual Preview */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Hero Visual Preview
            </span>
            <div className="relative aspect-[16/10] w-full bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
              {hero.backgroundImage ? (
                <Image
                  src={hero.backgroundImage}
                  alt="Hero Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                  No Image URL
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#D8C7B0] block">
                  Cyn&apos;s Hub Boutique
                </span>
                <p className="font-serif text-sm font-medium mt-1 line-clamp-2">
                  {hero.headline || "Headline preview..."}
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-white text-stone-900 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  {hero.ctaText || "Explore"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CURATED EDITORIAL SPLIT CARDS */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div className="pb-4 border-b border-stone-100">
          <h2 className="font-serif text-lg font-medium text-stone-900">
            Curated Split Editorial Collections
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            The twin spotlight cards on the homepage showcasing seasonal themes (e.g. Summer Essentials &amp; Accessorize).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curated.map((card, idx) => (
            <div
              key={card.id || idx}
              className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-xs font-serif font-bold text-stone-800">
                  Spotlight Card #{idx + 1}
                </span>
                <span className="text-[10px] uppercase font-mono text-stone-400">
                  {card.title}
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                    Category Tagline
                  </label>
                  <input
                    type="text"
                    value={card.tag}
                    onChange={(e) => handleCuratedChange(idx, "tag", e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                    Collection Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCuratedChange(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={card.linkText}
                      onChange={(e) => handleCuratedChange(idx, "linkText", e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                      Link Target URL
                    </label>
                    <input
                      type="text"
                      value={card.linkHref}
                      onChange={(e) => handleCuratedChange(idx, "linkHref", e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={card.image}
                    onChange={(e) => handleCuratedChange(idx, "image", e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 bg-white"
                  />
                </div>
              </div>

              {/* Card Mini Preview */}
              <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden border border-stone-300">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-[8px] uppercase tracking-widest text-[#D8C7B0] block">
                    {card.tag}
                  </span>
                  <span className="font-serif text-xs font-medium block">
                    {card.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. GHANA LOGISTICS & PAYMENT POLICIES */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE5DC] shadow-xs space-y-6">
        <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Delivery Logistics &amp; Mobile Money Details
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Configure checkout delivery fees and customer support contacts.
            </p>
          </div>
          <DollarSign className="w-5 h-5 text-[#475438]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Free Delivery Order Threshold (GH₵)
            </label>
            <input
              type="number"
              value={policies.freeDeliveryThreshold}
              onChange={(e) =>
                setPolicies({
                  ...policies,
                  freeDeliveryThreshold: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Greater Accra Delivery Fee (GH₵)
            </label>
            <input
              type="number"
              value={policies.accraDeliveryFee}
              onChange={(e) =>
                setPolicies({ ...policies, accraDeliveryFee: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Outside Accra Courier Fee (GH₵)
            </label>
            <input
              type="number"
              value={policies.outsideAccraDeliveryFee}
              onChange={(e) =>
                setPolicies({
                  ...policies,
                  outsideAccraDeliveryFee: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Merchant WhatsApp Contact
            </label>
            <input
              type="text"
              value={policies.whatsappNumber}
              onChange={(e) =>
                setPolicies({ ...policies, whatsappNumber: e.target.value })
              }
              placeholder="233240000000"
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              MoMo Payment Number
            </label>
            <input
              type="text"
              value={policies.momoNumber}
              onChange={(e) =>
                setPolicies({ ...policies, momoNumber: e.target.value })
              }
              placeholder="024 123 4567"
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              MoMo Account Name
            </label>
            <input
              type="text"
              value={policies.momoAccountName}
              onChange={(e) =>
                setPolicies({ ...policies, momoAccountName: e.target.value })
              }
              placeholder="CYNTHIA E. / CYN'S HUB"
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Actions */}
      <div className="sticky bottom-6 z-20 bg-stone-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-stone-800">
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Editing Live Storefront CMS Settings</span>
        </div>

        <button
          type="submit"
          className="h-9 px-5 bg-[#475438] hover:bg-[#3A452E] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </form>
  );
}
