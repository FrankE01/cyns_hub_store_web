"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useCMSStore } from "../lib/store/useCMSStore";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { sections } = useCMSStore();
  const announcement = sections.announcement;

  if (!isVisible || !announcement.enabled) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#1C1917] text-[#FAF8F5] text-xs font-medium py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center space-x-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#D8C7B0] shrink-0" strokeWidth={1.75} />
          <span className="truncate">
            {announcement.text}
          </span>
          <Link href={announcement.linkHref || "/shop"} className="underline underline-offset-4 font-semibold text-[#D8C7B0] hover:text-white transition-colors shrink-0">
            {announcement.linkText || "Shop Now"}
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white p-1 ml-2 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}
