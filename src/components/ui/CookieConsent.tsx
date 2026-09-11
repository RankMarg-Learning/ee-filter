"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_NAME = "_ef_vid";

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkConsentAndLocation = async () => {
      const consent = getCookie(COOKIE_NAME);
      if (consent) return;

      try {
        const res = await fetch("https://get.geojs.io/v1/ip/country.json");
        const data = await res.json();

        // List of European countries (EU + EEA + UK + CH)
        const euCountries = [
          "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
          "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
          "SI", "ES", "SE", "GB", "CH", "NO", "IS", "LI"
        ];

        if (data.country && euCountries.includes(data.country)) {
          setShowBanner(true);
        } else {
          // For non-EU users, we can silently mark consent as not required
          setCookie(COOKIE_NAME, "3", 365);
        }
      } catch (error) {
        // If the API fails, fallback to showing the banner to ensure GDPR compliance
        setShowBanner(true);
      }
    };

    checkConsentAndLocation();
  }, []);

  const handleAcceptAll = () => {
    setCookie(COOKIE_NAME, "1", 365);
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    setCookie(COOKIE_NAME, "2", 365);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg)] text-[var(--ink)] border-t-2 border-[var(--brand)] p-4 sm:p-5 shadow-2xl transition-all font-sans"
    >
      <div className="wrap flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-[80ch] text-xs sm:text-sm text-[var(--ink-dim)] leading-relaxed">
          <p className="font-bold text-[var(--ink)] mb-1">EU Cookie & Privacy Compliance Notice</p>
          We use cookies and similar technologies to enhance navigation, analyze site traffic, and deliver personalized content in accordance with the European Union General Data Protection Regulation (GDPR) and the ePrivacy Directive. Read our{" "}
          <Link href="/privacy-policy" className="text-[var(--brand)] underline hover:text-[var(--ink)] transition-colors">
            Privacy & Cookie Policy
          </Link>{" "}
          for more details.
        </div>

        <div className="flex items-center gap-3 flex-wrap flex-shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleRejectNonEssential}
            className="border border-[var(--line)] bg-transparent text-[var(--ink-dim)] px-4 py-2 text-xs font-semibold hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors cursor-pointer"
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
