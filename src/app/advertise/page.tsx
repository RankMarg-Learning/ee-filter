import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AdSlot } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Advertise — EsportFilter",
  description: "Media kit, audience demographics, ad format specifications, and partnership contact details for EsportFilter.",
};

export default function AdvertisePage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Advertise</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Page Header */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap">
          <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans">
            Media Kit & Partnerships
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-heading font-semibold text-[var(--ink)]">
            Advertise with EsportFilter
          </h1>
          <p className="text-[16px] text-[var(--ink-dim)] max-w-[65ch] mt-2 leading-relaxed font-sans">
            Reach a highly engaged audience of competitive gamers, esports fans, tech enthusiasts, and peripheral buyers.
          </p>
        </div>
      </div>

      {/* Main Content & Demographics Split */}
      <section className="py-8 pb-[60px]">
        <div className="wrap flex justify-center items-start">
          <div className="space-y-8 max-w-[70ch]">
            {/* Demographics Grid */}
            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[var(--ink)] mb-3 border-b border-[var(--line)] pb-2">
                Audience Demographics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 font-sans">
                <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                  <span className="font-heading font-bold text-[28px] text-[var(--brand)] block">
                    84%
                  </span>
                  <span className="text-[11.5px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                    Ages 18 - 34
                  </span>
                </div>
                <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                  <span className="font-heading font-bold text-[28px] text-[var(--brand)] block">
                    4.2m+
                  </span>
                  <span className="text-[11.5px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                    Monthly Impressions
                  </span>
                </div>
                <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 text-center">
                  <span className="font-heading font-bold text-[28px] text-[var(--brand)] block">
                    3.8m
                  </span>
                  <span className="text-[11.5px] text-[var(--ink-dim)] uppercase tracking-wider font-mono">
                    Avg Time On Site
                  </span>
                </div>
              </div>
            </div>

            {/* Available Ad Formats */}
            <div>
              <h2 className="text-[24px] font-heading font-semibold text-[var(--ink)] mb-3 border-b border-[var(--line)] pb-2">
                Ad Formats & Integrations
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-[15px] text-[var(--ink)] font-sans">
                <li><strong>970×90 Super Leaderboard</strong> — Prime top-of-page placement across all routes.</li>
                <li><strong>300×250 / 300×600 Skyscraper</strong> — High-impact sticky sidebar display units.</li>
                <li><strong>728×280 Article Inline Banner</strong> — Mid-content placement inside high-traffic recaps.</li>
                <li><strong>Native Sponsored Cards & Stories</strong> — Custom branded content integrated directly into main news feeds.</li>
                <li><strong>Sponsor Strip (160×50)</strong> — Footer brand presence across 100% of pages.</li>
              </ul>
            </div>

            {/* Contact / Inquiry Google Form Button */}
            <div className="border border-[var(--line)] bg-[var(--card-bg)] p-6 font-sans">
              <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] mb-2">
                Request Media Kit & Advertising Proposal
              </h2>
              <p className="text-[14.5px] text-[var(--ink-dim)] mb-6 leading-relaxed">
                Click below to submit an advertising or media kit request via our official Google Form, or contact our business partnerships team directly.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--brand)] text-white px-8 py-3.5 font-bold text-[14px] hover:bg-[var(--brand-dark)] transition-colors inline-flex items-center gap-2 font-sans"
                >
                  <span>Open Google Advertising Form</span>
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                  </svg>
                </a>

                <a
                  href="mailto:business@esportfilter.com"
                  className="border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] px-6 py-3.5 font-semibold text-[14px] hover:border-[var(--brand)] transition-colors font-sans"
                >
                  Email business@esportfilter.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
