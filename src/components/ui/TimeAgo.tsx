"use client";

import React, { useEffect, useState } from "react";
import { timeConvertor } from "@/utils/timeConvertor";

export function TimeAgo({ date }: { date?: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (!date) return;
    
    // Set initial accurate client-side time
    setTime(timeConvertor(date));
    
    // Update every minute
    const interval = setInterval(() => {
      setTime(timeConvertor(date));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [date]);

  if (!date) return null;

  // Render server-side time initially with hydration warning to prevent mismatch,
  // then swap to purely client-side state once hydrated
  if (!time) {
    return <span suppressHydrationWarning>{timeConvertor(date)}</span>;
  }

  return <span>{time}</span>;
}
