"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/types/article";

interface FloatingNextStoryProps {
  article: Article;
}

export function FloatingNextStory({ article }: FloatingNextStoryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !dismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 400) {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!isVisible || dismissed || !article) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[320px] bg-[var(--card-bg)] border-2 border-[var(--brand)] shadow-2xl p-3 font-sans transition-all animate-bounce-short">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--brand)]">
          Recommended Next Story
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="text-xs text-[var(--ink-faint)] hover:text-[var(--ink)] cursor-pointer border-none bg-transparent"
          aria-label="Close recommendation"
        >
          ✕
        </button>
      </div>
      <Link href={`/${article.slug}`} className="group block">
        <h4 className="text-[13.5px] font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug line-clamp-2 mb-1">
          {article.title}
        </h4>
        <span className="text-[11px] text-[var(--ink-faint)] font-mono">
          {article.gameName || article.game} · Read Story →
        </span>
      </Link>
    </div>
  );
}
