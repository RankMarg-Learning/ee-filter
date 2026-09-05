import React from "react";
import { CategoryPillType } from "@/types/article";

interface CategoryPillProps {
  type: CategoryPillType | string;
  label?: string;
  className?: string;
}

const PILL_COLORS: Record<string, string> = {
  breaking: "bg-[var(--live)] text-white",
  recap: "bg-[var(--brand)] text-white",
  analysis: "bg-[#3E7A3E] text-white",
  roster: "bg-[#7A5A0C] text-white",
  rumor: "bg-[#6E4E9E] text-white",
  preview: "bg-[#4A5568] text-white",
  guide: "bg-[#2B6CB0] text-white",
  interview: "bg-[#4A5568] text-white",
  "match-recap": "bg-[var(--brand)] text-white",
  "player-profile": "bg-[#4A5568] text-white",
  industry: "bg-[#4A5568] text-white",
  community: "bg-[#3E7A3E] text-white",
};

export function CategoryPill({ type, label, className = "" }: CategoryPillProps) {
  const colorClass = PILL_COLORS[type.toLowerCase()] || "bg-[#4A5568] text-white";
  const displayLabel = label || type;

  return (
    <span
      className={`inline-block text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-[4px] uppercase font-sans ${colorClass} ${className}`}
    >
      {displayLabel}
    </span>
  );
}

