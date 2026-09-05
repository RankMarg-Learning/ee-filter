"use client";

import React, { useState } from "react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="my-6 py-8 bg-[#12151B] text-white border-y-2 border-[var(--brand)] font-sans">
      <div className="wrap flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-[65ch] text-center lg:text-left">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--brand)] block mb-1">
            Never Miss a Match or Roster Move
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-heading font-semibold text-white leading-tight mb-2">
            Get the Daily Esports Brief
          </h2>
          <p className="text-[14.5px] text-gray-300 leading-relaxed">
            Join over 120,000 competitive gaming fans. Recaps, patch analyses, and roster leaks delivered straight to your inbox every morning.
          </p>
        </div>

        <div className="w-full lg:w-[420px] flex-shrink-0">
          {subscribed ? (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-sm font-semibold text-center">
              🎉 Welcome to Daily Brief! Check your inbox for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[var(--bg)] border border-gray-700 text-[var(--ink)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] font-sans"
              />
              <button
                type="submit"
                className="bg-[var(--brand)] text-white px-6 py-3 font-bold text-[13px] hover:bg-[var(--brand-dark)] transition-colors cursor-pointer whitespace-nowrap font-sans"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


