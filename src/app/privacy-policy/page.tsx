import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AdSlot } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy — EsportFilter",
  description: "Formal Privacy Policy and EU GDPR Cookie Compliance document for EsportFilter.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Privacy Policy</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Page Header */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap">
          <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans font-mono">
            GDPR & Legal Compliance
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-heading font-semibold text-[var(--ink)]">
            Privacy & Cookie Policy
          </h1>
          <p className="text-[15px] text-[var(--ink-dim)] max-w-[65ch] mt-2 leading-relaxed font-sans">
            Effective Date: September 5, 2026. This document sets forth the Privacy Policy and Cookie Processing practices governing EsportFilter under the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive.
          </p>
        </div>
      </div>

      {/* Main Content Split */}
      <section className="py-8 pb-[60px]">
        <div className="wrap flex justify-center items-start">
          <div className="space-y-6 text-[15px] text-[var(--ink)] leading-relaxed font-sans max-w-[70ch]">
            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2">
              1. Data Controller & Scope
            </h2>
            <p>
              This Privacy Policy governs data processing by <strong>EsportFilter</strong> ("Data Controller") across all website subdomains and related digital publications. We process personal data strictly in compliance with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR).
            </p>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              2. Information Collected & Legal Basis
            </h2>
            <p>
              We collect personal data under legal bases specified under Article 6 of the GDPR:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Newsletter Subscriptions:</strong> Processed based on explicit data subject consent (Article 6(1)(a) GDPR).</li>
              <li><strong>Technical Data & Log Files:</strong> IP addresses, browser types, and timestamp logs collected under legitimate interest (Article 6(1)(f) GDPR) to maintain system security.</li>
              <li><strong>Analytical & Performance Data:</strong> Anonymized metrics collected subject to user consent.</li>
            </ul>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              3. EU Cookie Classification & Consent Management
            </h2>
            <p>
              In accordance with the ePrivacy Directive (Directive 2002/58/EC as amended), cookies deployed on this domain are classified into three distinct tiers:
            </p>
            <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-4 space-y-3 font-sans text-xs sm:text-sm">
              <div>
                <span className="font-bold text-[var(--ink)]">A. Strictly Necessary Cookies (Essential):</span>
                <p className="text-[var(--ink-dim)]">Required for basic site functionality, session state, and security authentication. Cannot be disabled.</p>
              </div>
              <div>
                <span className="font-bold text-[var(--ink)]">B. Analytics & Performance Cookies:</span>
                <p className="text-[var(--ink-dim)]">Collect aggregated, anonymized usage statistics to measure audience traffic. Subject to user consent.</p>
              </div>
              <div>
                <span className="font-bold text-[var(--ink)]">C. Advertising & Targeting Cookies:</span>
                <p className="text-[var(--ink-dim)]">Deployed by partner networks to deliver contextual advertisements. Subject to user consent.</p>
              </div>
            </div>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              4. Data Subject Rights Under GDPR
            </h2>
            <p>
              European Economic Area (EEA) residents possess the following statutory rights regarding their personal data:
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Right of Access (Article 15 GDPR):</strong> Right to obtain confirmation of data processing and access copies of stored records.</li>
              <li><strong>Right to Rectification (Article 16 GDPR):</strong> Right to request correction of inaccurate personal data.</li>
              <li><strong>Right to Erasure / Right to be Forgotten (Article 17 GDPR):</strong> Right to request deletion of personal records.</li>
              <li><strong>Right to Data Portability (Article 20 GDPR):</strong> Right to receive personal data in a structured, machine-readable format.</li>
            </ul>

            <h2 className="text-[22px] font-heading font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-2 pt-2">
              5. Data Protection Officer (DPO) Contact
            </h2>
            <p>
              For inquiries or statutory data subject requests regarding personal data processing, contact our Data Protection Officer at <span className="font-mono font-semibold text-[var(--brand)]">privacy@esportfilter.com</span>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
