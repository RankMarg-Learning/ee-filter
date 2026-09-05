import React from "react";
import Link from "next/link";
import { AdSlot } from "@/components/ui/AdSlot";

export function Footer() {
  return (
    <>
      {/* Sponsor Strip */}
      <div className="bg-[#12151b] dark:bg-[#07090d] py-4 border-t border-[var(--line)]">
        <div className="wrap flex items-center justify-center gap-[36px] flex-wrap">
          <span className="text-[#8A93A1] text-[11px] tracking-wider uppercase font-mono">
            This section brought to you by
          </span>
          <AdSlot type="160x50" />
          <AdSlot type="160x50" />
          <AdSlot type="160x50" />
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#0E1116] text-[#B7BEC9] pt-[44px] pb-[24px] border-t border-[#262B33]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 pb-[30px] border-b border-[#262B33] mb-5">
            {/* Brand column */}
            <div className="footer-brand">
              <Link href="/" className="font-heading font-bold text-[23px] text-white block mb-3">
                Esport<span className="text-[var(--brand)]">Filter</span>
              </Link>
              <p className="text-[12.5px] text-[#767F8C] max-w-[32ch] leading-relaxed">
                Scores, news and rankings across every major esport — updated all day, every day.
              </p>
            </div>

            {/* Shooters column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-white font-bold mb-3 uppercase tracking-wider font-heading">
                Shooters
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/game/valorant" className="text-[#8991A0] hover:text-white transition-colors">Valorant</Link></li>
                <li><Link href="/game/cs2" className="text-[#8991A0] hover:text-white transition-colors">Counter-Strike 2</Link></li>
                <li><Link href="/game/rainbow-six" className="text-[#8991A0] hover:text-white transition-colors">Rainbow Six Siege</Link></li>
                <li><Link href="/game/call-of-duty" className="text-[#8991A0] hover:text-white transition-colors">Call of Duty</Link></li>
                <li><Link href="/game/pubg" className="text-[#8991A0] hover:text-white transition-colors">PUBG</Link></li>
              </ul>
            </div>

            {/* MOBAs & Strategy column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-white font-bold mb-3 uppercase tracking-wider font-heading">
                MOBAs & Strategy
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/game/league-of-legends" className="text-[#8991A0] hover:text-white transition-colors">League of Legends</Link></li>
                <li><Link href="/game/dota2" className="text-[#8991A0] hover:text-white transition-colors">Dota 2</Link></li>
                <li><Link href="/game/mlbb" className="text-[#8991A0] hover:text-white transition-colors">MLBB</Link></li>
              </ul>
            </div>

            {/* Fighting & Sports column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-white font-bold mb-3 uppercase tracking-wider font-heading">
                Fighting & Sports
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/game/tekken-8" className="text-[#8991A0] hover:text-white transition-colors">Tekken 8</Link></li>
                <li><Link href="/game/street-fighter" className="text-[#8991A0] hover:text-white transition-colors">Street Fighter</Link></li>
                <li><Link href="/game/ea-fc" className="text-[#8991A0] hover:text-white transition-colors">EA FC</Link></li>
                <li><Link href="/game/rocket-league" className="text-[#8991A0] hover:text-white transition-colors">Rocket League</Link></li>
              </ul>
            </div>

            {/* Company & Legal column */}
            <div className="footer-col">
              <h4 className="text-[12px] text-white font-bold mb-3 uppercase tracking-wider font-heading">
                Company & Legal
              </h4>
              <ul className="list-none p-0 flex flex-col gap-2.5 text-[12.5px]">
                <li><Link href="/about" className="text-[#8991A0] hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/advertise" className="text-[#8991A0] hover:text-white transition-colors">Advertise</Link></li>
                <li><Link href="/editorial-policy" className="text-[#8991A0] hover:text-white transition-colors">Editorial Standards</Link></li>
                <li><Link href="/contact" className="text-[#8991A0] hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-[#8991A0] hover:text-white transition-colors">Privacy & Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-[#8991A0] hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between flex-wrap gap-3 text-[11.5px] text-[#5C6472]">
            <p>© 2026 EsportFilter. All rights reserved.</p>
            <p>News and rankings updated daily.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
