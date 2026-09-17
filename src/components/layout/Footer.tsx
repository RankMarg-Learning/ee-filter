import React from "react";
import Link from "next/link";
import { AdSlot } from "@/components/ui/AdSlot";

export function Footer() {
  return (
    <>
      {/* Sponsor Strip */}
      <div className="bg-[var(--bg-alt)] py-4 border-t border-[var(--line)]">
        <div className="wrap flex items-center justify-center gap-[36px] flex-wrap">

          <AdSlot type="160x50" />
          <AdSlot type="160x50" />
          <AdSlot type="160x50" />
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[var(--bg)] text-[var(--ink-dim)] pt-[44px] pb-[24px] border-t border-[var(--line)]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 pb-[30px] border-b border-[var(--line)] mb-5">
            {/* Brand column */}
            <div className="footer-brand">
              <Link href="/" className="font-heading font-bold text-[23px] text-[var(--ink)] block mb-3">
                Esport<span className="text-[var(--brand)]">Filter</span>
              </Link>
              <p className="text-[12.5px] text-[var(--ink-dim)] max-w-[32ch] leading-relaxed">
                Scores, news and rankings across every major esport — updated all day, every day.
              </p>
            </div>

            {/* Shooters column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-[var(--ink)] font-bold mb-3 uppercase tracking-wider font-heading">
                Shooters
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/game/valorant" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Valorant</Link></li>
                <li><Link href="/game/cs2" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Counter-Strike 2</Link></li>
                <li><Link href="/game/pubg" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">PUBG</Link></li>
                <li><Link href="/game/free-fire" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Free Fire</Link></li>
              </ul>
            </div>

            {/* MOBAs & Strategy column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-[var(--ink)] font-bold mb-3 uppercase tracking-wider font-heading">
                MOBAs & Strategy
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/game/league-of-legends" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">League of Legends</Link></li>
                <li><Link href="/game/dota2" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Dota 2</Link></li>
                <li><Link href="/game/mlbb" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">MLBB</Link></li>
              </ul>
            </div>

            {/* Company & Legal column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-[var(--ink)] font-bold mb-3 uppercase tracking-wider font-heading">
                Company & Legal
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/about" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">About Us</Link></li>
                <li><Link href="/advertise" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Advertise</Link></li>
                <li><Link href="/editorial-policy" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Editorial Standards</Link></li>
                <li><Link href="/contact" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Privacy & Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between flex-wrap gap-3 text-[11.5px] text-[var(--ink-dim)] opacity-70">
            <p>© 2026 EsportFilter. All rights reserved.</p>
            <p>News and rankings updated daily.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
