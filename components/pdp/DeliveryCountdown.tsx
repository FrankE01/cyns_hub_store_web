"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

interface DeliveryCountdownProps {
  isPreOrder: boolean;
  preOrderDispatchDate?: string;
  preOrderCutoffDate?: string;
}

export default function DeliveryCountdown({
  isPreOrder,
  preOrderDispatchDate,
}: DeliveryCountdownProps) {
  // Simulated countdown targeting end of day (e.g. 6 hours 20 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 20,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num: number) => String(num).padStart(2, "0");

  if (isPreOrder) {
    return (
      <div className="flex items-center space-x-2 py-2 px-3 bg-[#FAF3EE] border border-[#E8D4C5] rounded-md text-xs text-[#964F27]">
        <Calendar className="w-4 h-4 shrink-0" strokeWidth={2} />
        <div>
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Pre-Order Batch Open:{" "}
          </span>
          <span className="text-stone-700">
            Dispatches on <strong className="text-stone-900">{preOrderDispatchDate || "Soon"}</strong>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-xs sm:text-sm text-stone-700">
      <Clock className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={2} />
      <span>
        Order within{" "}
        <span className="font-mono font-bold text-stone-900">
          {formatUnit(timeLeft.hours)}:{formatUnit(timeLeft.minutes)}:
          {formatUnit(timeLeft.seconds)}
        </span>{" "}
        to get next day delivery in Accra
      </span>
    </div>
  );
}
