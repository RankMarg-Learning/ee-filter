"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ef_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ef_cookie_consent", "all");
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem("ef_cookie_consent", "essential_only");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#12151B] text-white border-t-2 border-[var(--brand)] p-4 sm:p-5 shadow-2xl transition-all font-sans"
    >
      <div className="wrap flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-[80ch] text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p className="font-bold text-white mb-1">EU Cookie & Privacy Compliance Notice</p>
          We use cookies and similar technologies to enhance navigation, analyze site traffic, and deliver personalized content in accordance with the European Union General Data Protection Regulation (GDPR) and the ePrivacy Directive. Read our{" "}
          <Link href="/privacy-policy" className="text-[var(--brand)] underline hover:text-white transition-colors">
            Privacy & Cookie Policy
          </Link>{" "}
          for more details.
        </div>

        <div className="flex items-center gap-3 flex-wrap flex-shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleRejectNonEssential}
            className="border border-gray-600 bg-transparent text-gray-300 px-4 py-2 text-xs font-semibold hover:border-white hover:text-white transition-colors cursor-pointer"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-[var(--brand)] text-white px-5 py-2 text-xs font-bold hover:bg-[var(--brand-dark)] transition-colors cursor-pointer"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
