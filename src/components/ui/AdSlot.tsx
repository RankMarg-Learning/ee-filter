import React from "react";
import { ADS_CONFIG, AdSlotType } from "@/config/adsConfig";

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
  sponsorName?: string;
  title?: string;
  imageUrl?: string;
}

export function AdSlot({
  type,
  className = "",
  sponsorName,
  title,
  imageUrl,
}: AdSlotProps) {
  // If ads are paused globally in Central Ads Manager, do not render ad slot
  if (!ADS_CONFIG.ADS_ENABLED) {
    return null;
  }

  if (type === "native") {
    if (!ADS_CONFIG.SLOTS.nativeFeed) return null;
    return (
      <div className={`border border-[var(--line)] p-3.5 flex gap-3.5 items-center bg-[var(--card-bg)] my-4 ${className}`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Advertisement"
            className="w-24 h-[70px] object-cover flex-shrink-0"
          />
        )}
        <div>
          <span className="text-[9px] text-[var(--ink-faint)] tracking-widest uppercase block mb-1 font-mono">
            Advertisement
          </span>
          {title && <h4 className="text-sm font-semibold mb-1 font-sans">{title}</h4>}
          {sponsorName && (
            <span className="text-[11.5px] text-[var(--ink-faint)]">
              Sponsored by {sponsorName}
            </span>
          )}
        </div>
      </div>
    );
  }

  const heightClasses: Record<string, string> = {
    "970x90": "w-full h-[90px]",
    "728x90": "w-full h-[90px]",
    "300x250": "w-full h-[250px]",
    "300x600": "w-full h-[480px]",
    "728x280": "w-full h-[280px]",
    "160x50": "w-[160px] h-[50px]",
  };

  const labelSize: Record<string, string> = {
    "970x90": "970 × 90",
    "728x90": "728 × 90",
    "300x250": "300 × 250",
    "300x600": "300 × 600",
    "728x280": "728 × 280",
    "160x50": "160 × 50",
  };


  return (
    <div
      className={`bg-[var(--bg-alt)] border border-[var(--line)] rounded-[8px] flex flex-col items-center justify-center gap-1 my-4 ${
        heightClasses[type] || "w-full h-[250px]"
      } ${className}`}
    >
      <span className="text-[10px] tracking-widest uppercase text-[var(--ink-faint)] font-mono font-semibold">
        ADVERTISEMENT
      </span>
      <span className="text-xs text-[var(--ink-faint)] font-mono">
        {labelSize[type]}
      </span>
    </div>
  );
}

