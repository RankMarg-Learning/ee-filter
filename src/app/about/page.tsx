import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";
import { getHomeData } from "@/services/articleService";

export const metadata: Metadata = {
  title: "About Us — EsportFilter",
  description: "Learn about EsportFilter's mission, newsroom standards, coverage metrics and esports editorial team.",
};

export default async function AboutPage() {
  const { headlines } = await getHomeData();

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">About Us</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Page Header */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap">
          <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans">
            Company & Editorial
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-heading font-semibold text-[var(--ink)]">
            About EsportFilter
          </h1>
          <p className="text-[16px] text-[var(--ink-dim)] max-w-[65ch] mt-2 leading-relaxed">
            Independent, fast, and comprehensive esports journalism — covering every major title from VCT to Worlds and Major LANs.
          </p>
        </div>
      </div>

      {/* Main Content Split */}
      <section className="py-8 pb-[60px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[40px] items-start">
          <div className="space-y-6 text-[16px] text-[var(--ink)] leading-relaxed font-sans max-w-[70ch]">
            <h2 className="text-[24px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2">
              Our Mission
            </h2>
            <p>
              Founded in 2026, <strong>EsportFilter</strong> was built with a clear purpose: to deliver accurate, non-sensationalized esports coverage, patch breakdowns, and roster insights directly to competitive gaming fans.
            </p>
            <p>
              We cover 15+ top esports titles including Valorant, Counter-Strike 2, Dota 2, League of Legends, Overwatch 2, Apex Legends, BGMI, and fighting games like Tekken 8 and Street Fighter.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                <span className="font-heading font-bold text-[32px] text-[var(--brand)] block">
                  15+
                </span>
                <span className="text-[12px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                  Esport Titles
                </span>
              </div>
              <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                <span className="font-heading font-bold text-[32px] text-[var(--brand)] block">
                  24/7
                </span>
                <span className="text-[12px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                  News Desk
                </span>
              </div>
              <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                <span className="font-heading font-bold text-[32px] text-[var(--brand)] block">
                  100%
                </span>
                <span className="text-[12px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                  Fact-Checked
                </span>
              </div>
            </div>

            <h2 className="text-[24px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-4">
              Editorial Integrity
            </h2>
            <p>
              Our newsroom operates independently from tournament organizers and publisher sponsors. All rumors are clearly flagged, roster moves are verified against multiple primary sources, and balance analysis is written by experienced high-rank players and broadcast analysts.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="bg-[var(--brand)] text-white px-6 py-3 font-bold text-[13px] hover:bg-[var(--brand-dark)] transition-colors inline-block"
              >
                Contact Newsroom →
              </Link>
            </div>
          </div>

          <Sidebar trendingArticles={headlines} gameTitle="General" />
        </div>
      </section>
    </div>
  );
}
