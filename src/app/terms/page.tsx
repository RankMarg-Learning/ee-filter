import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AdSlot } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Terms of Service — EsportFilter",
  description: "Formal Terms of Service agreement governing the use of EsportFilter.",
};

export default function TermsPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Terms of Service</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Page Header */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap">
          <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans font-mono">
            Legally Binding Agreement
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-heading font-semibold text-[var(--ink)]">
            Terms of Service
          </h1>
          <p className="text-[15px] text-[var(--ink-dim)] max-w-[65ch] mt-2 leading-relaxed font-sans">
            Effective Date: September 5, 2026. This Terms of Service agreement ("Agreement") constitutes a legally binding contract between you and EsportFilter.
          </p>
        </div>
      </div>

      {/* Main Content Split */}
      <section className="py-8 pb-[60px]">
        <div className="wrap flex justify-center items-start">
          <div className="space-y-6 text-[15px] text-[var(--ink)] leading-relaxed font-sans max-w-[70ch]">
            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2">
              1. Acceptance & Scope of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing any portion of the <strong>EsportFilter</strong> publication, RSS feeds, or API endpoints, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our <Link href="/privacy-policy" className="text-[var(--brand)] underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              2. Intellectual Property & Copyright Notice
            </h2>
            <p>
              All original editorial content, reporting, graphics, UI layouts, source code, and design assets published on EsportFilter are protected under international copyright, trademark, and intellectual property laws.
            </p>
            <p className="text-xs text-[var(--ink-dim)] font-mono border-l-2 border-[var(--brand)] pl-3 py-1">
              Third-party game titles, character assets, logos, and publisher trademarks (including Valorant, Riot Games, Counter-Strike 2, Valve Corporation, Dota 2, League of Legends) remain the exclusive property of their respective owners.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              3. User Conduct & Acceptable Use
            </h2>
            <p>
              Users are strictly prohibited from utilizing automated web scrapers, bots, or data mining software to extract article text or proprietary media without explicit written authorization from EsportFilter management.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              4. Disclaimer of Warranties & Limitation of Liability
            </h2>
            <p>
              EsportFilter content is provided on an "as is" and "as available" basis without warranties of any kind. Under no circumstances shall EsportFilter be liable for direct, indirect, incidental, or consequential damages arising from reliance upon published esports statistics or news reports.
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              5. Governing Law & Dispute Resolution
            </h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without giving effect to any principles of conflicts of law.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
