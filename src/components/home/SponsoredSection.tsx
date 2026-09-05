import React from "react";
import { SponsorCard } from "@/types/article";

interface SponsoredSectionProps {
  sponsors: SponsorCard[];
}

export function SponsoredSection({ sponsors }: SponsoredSectionProps) {
  return (
    <section className="py-6 border-b border-[var(--line)]">
      <div className="wrap">
        <div className="flex items-baseline gap-2.5 mb-3.5">
          <h2 className="text-[13px] font-heading uppercase tracking-wider text-[var(--ink-dim)]">
            Sponsored
          </h2>
          <span className="text-[11px] text-[var(--ink-faint)] font-sans">
            Content from our partners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((card) => (
            <a
              key={card.id}
              href={card.linkUrl}
              className="border border-[var(--line)] bg-[var(--bg-alt)] group block transition-colors hover:border-[var(--brand)]"
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-[150px] object-cover"
              />
              <div className="p-3">
                <span className="text-[9.5px] text-[var(--ink-faint)] tracking-widest uppercase mb-1.5 block font-mono">
                  {card.tagline}
                </span>
                <h3 className="text-[15px] font-semibold font-sans mb-1 text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-[12.5px] text-[var(--ink-dim)] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


