import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AdSlot } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Editorial Standards & Code of Ethics — EsportFilter",
  description: "Formal Journalistic Standards, Verification Guidelines, and Code of Ethics for EsportFilter.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Editorial Standards</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Page Header */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap">
          <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans font-mono">
            Journalistic Integrity & Ethics
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-heading font-semibold text-[var(--ink)]">
            Editorial Standards & Code of Ethics
          </h1>
          <p className="text-[15px] text-[var(--ink-dim)] max-w-[65ch] mt-2 leading-relaxed font-sans">
            Our newsroom operates under strict protocols of independent reporting, rigorous primary source verification, and transparent disclosure.
          </p>
        </div>
      </div>

      {/* Main Content Split */}
      <section className="py-8 pb-[60px]">
        <div className="wrap flex justify-center items-start">
          <div className="space-y-6 text-[15px] text-[var(--ink)] leading-relaxed font-sans max-w-[70ch]">
            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2">
              1. Journalistic Independence & Sourcing Verification
            </h2>
            <p>
              <strong>EsportFilter</strong> maintains total editorial independence from game publishers, tournament organizers, esports organizations, and commercial sponsors. Articles reporting roster transfers or unconfirmed moves require independent verification from at least two primary sources prior to publication.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              2. Categorization of Rumors & Anonymous Sources
            </h2>
            <p>
              To maintain clarity, articles containing unconfirmed reports must carry the <strong>RUMOR</strong> badge. Anonymous sourcing is restricted to instances where information is verified and public attribution presents a severe risk to the source.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              3. Corrections & Transparency Protocol
            </h2>
            <p>
              When a factual inaccuracy is identified, our editorial staff issues a prompt correction. Substantive updates carry a clear editor's note specifying the nature and timestamp of the correction.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              4. Commercial & Sponsorship Disclosures
            </h2>
            <p>
              Branded content and commercial partnerships are demarcated with explicit "Sponsored" or "Presented by" labels. Advertisers possess zero authority over newsroom editorial decisions.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
