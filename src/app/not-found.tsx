import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found — EsportFilter",
  description: "The requested esports article or page could not be found.",
};

export default function NotFoundPage() {
  return (
    <div className="wrap py-20  flex flex-col items-center justify-center text-center font-sans">
      <span className="font-mono text-[64px] sm:text-[96px] font-bold text-[var(--brand)] leading-none mb-2">
        404
      </span>
      <h1 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[var(--ink)] mb-3">
        Page Not Found
      </h1>
      <p className="text-[15px] text-[var(--ink-dim)] max-w-[50ch] mb-8 leading-relaxed">
        The story or page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>

      {/* Quick Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Link
          href="/"
          className="bg-[var(--brand)] text-white px-5 py-2.5 font-bold text-[13px] hover:bg-[var(--brand-dark)] transition-colors"
        >
          Return to Homepage
        </Link>
        <Link
          href="/game/valorant"
          className="border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] px-5 py-2.5 font-semibold text-[13px] hover:border-[var(--brand)] transition-colors"
        >
          Valorant News
        </Link>
        <Link
          href="/game/cs2"
          className="border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] px-5 py-2.5 font-semibold text-[13px] hover:border-[var(--brand)] transition-colors"
        >
          CS2 News
        </Link>
        <Link
          href="/category/breaking"
          className="border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] px-5 py-2.5 font-semibold text-[13px] hover:border-[var(--brand)] transition-colors"
        >
          Breaking News
        </Link>
      </div>
    </div>
  );
}
