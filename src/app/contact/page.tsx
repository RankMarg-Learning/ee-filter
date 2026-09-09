import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AdSlot } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Contact Us — EsportFilter",
  description: "Contact EsportFilter newsroom, submit news tips, or fill out our Google contact form.",
};

export default function ContactPage() {
  return (
    <div className="w-full font-sans">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-xs text-[var(--ink-faint)]">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Contact Us</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Main Contact Us Container (max-w-[600px] form layout per Section 25) */}
      <section className="py-8 pb-[60px]">
        <div className="wrap flex justify-center items-start">
          <div className="max-w-[600px] w-full">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[var(--ink)] mb-2 font-sans">
              CONTACT US
            </h1>
            <p className="text-base leading-relaxed text-[var(--ink-dim)] mb-8 font-sans">
              Have a question, correction, news tip, or partnership request? Send us a message.
            </p>

            {/* Google Form Direct Link CTA Box */}
            <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-5 rounded-[8px] mb-8 font-sans">
              <h2 className="text-base font-bold text-[var(--ink)] mb-1">
                Prefer Google Forms?
              </h2>
              <p className="text-sm text-[var(--ink-dim)] mb-4 leading-relaxed">
                You can also submit news tips, press releases, or correction requests directly using our official Google Form.
              </p>
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[40px] px-4 bg-[var(--brand)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--brand-dark)] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Open Google Contact Form</span>
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            </div>

            {/* Direct Email Contacts */}
            <div className="border border-[var(--line)] bg-[var(--card-bg)] p-5 rounded-[8px] font-sans">
              <h3 className="text-base font-bold text-[var(--ink)] mb-3">
                Direct Email Contacts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-3 rounded-[6px]">
                  <h4 className="font-semibold text-[var(--ink)] text-xs uppercase tracking-wide mb-1">
                    Newsroom Tips
                  </h4>
                  <p className="text-[var(--brand)] font-mono text-xs font-semibold">
                    tips@esportfilter.com
                  </p>
                </div>
                <div className="border border-[var(--line)] bg-[var(--bg-alt)] p-3 rounded-[6px]">
                  <h4 className="font-semibold text-[var(--ink)] text-xs uppercase tracking-wide mb-1">
                    Press & Business
                  </h4>
                  <p className="text-[var(--brand)] font-mono text-xs font-semibold">
                    business@esportfilter.com
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

