"use client";

import React, { useState } from "react";

export function ArticleShareButtons({ title, url }: { title: string, url?: string }) {
  const [copied, setCopied] = useState(false);

  // Use window.location.href if url is not provided
  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';

  const handleShareX = () => {
    const text = encodeURIComponent(title);
    const u = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${u}`, '_blank');
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShareX}
        aria-label="Share on X"
        className="icon-btn border border-[var(--line)] w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors"
      >
        <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </button>
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="icon-btn border border-[var(--line)] w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors relative"
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 stroke-current fill-none text-green-500" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" />
            <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}
