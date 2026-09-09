"use client";

import React from "react";
import Link from "next/link";
import { Headline } from "@/types/article";
import { AdSlot } from "@/components/ui/AdSlot";
import { CATEGORY_BAR_GAMES } from "@/data/games";

interface SidebarProps {
  trendingArticles?: Headline[];
  gameTitle?: string;
}

export function Sidebar({ trendingArticles, gameTitle = "Esports" }: SidebarProps) {
  // Quick game chips for sidebar
  const quickGames = CATEGORY_BAR_GAMES.filter((g) => g.slug !== "all").slice(0, 6);

  return (
    <aside className="flex flex-col gap-6 w-full font-sans">
      {/* Top Ad Slot */}
      <AdSlot type="300x250" />


      {/* Deep Dives & Analysis - Curated High Value Content */}
      <div className=" bg-[var(--card-bg)] ">
        <div className=" px-4 py-3">
          <h3 className="font-heading text-[13px] uppercase tracking-wider font-bold flex items-center gap-2 text-[var(--ink)]">
            <svg className="w-3.5 h-3.5 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Deep Dives
          </h3>
        </div>
        <div className="flex flex-col">
          {[
            { title: "Why the current meta is fundamentally changing competitive integrity", tag: "Analysis", game: "Valorant" },
            { title: "The untold story of Faker's first World Championship run", tag: "Retrospective", game: "LoL" },
            { title: "Breaking down the economic collapse of Tier 2 organizations", tag: "Opinion", game: "Industry" }
          ].map((article, i) => (
            <Link key={i} href="#" className="group flex flex-col px-4 py-3.5 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg-alt)] transition-colors">
              <span className="text-[10px] font-mono font-bold text-[var(--brand)] uppercase tracking-widest block mb-1.5 group-hover:translate-x-0.5 transition-transform">
                {article.tag}
              </span>
              <h4 className="text-[13px] font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2 mb-2">
                {article.title}
              </h4>
              <span className="text-[10px] text-[var(--ink-faint)] font-mono">{article.game}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Game Hubs Quick Access */}
      <div className="border border-[var(--line)] bg-[var(--card-bg)] p-4">
        <div className="text-[12px] font-heading uppercase tracking-wider text-[var(--ink-dim)] font-bold mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] inline-block" />
          Explore Game Hubs
        </div>
        <div className="flex flex-wrap gap-2">
          {quickGames.map((game) => (
            <Link
              key={game.slug}
              href={`/game/${game.slug}`}
              className="text-[12px] font-semibold px-3 py-1.5 border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Editor's Featured Pick */}
      <div className="border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden group">
        <div className="bg-[var(--sidebar-head-bg)] text-[var(--sidebar-head-ink)] px-4 py-2.5 font-heading text-[12px] uppercase tracking-wider font-bold">
          Must Read Story
        </div>
        <Link href="/nova-esports-vertex-cup-2026" className="block">
          <div className="overflow-hidden">
            <img
              src="https://picsum.photos/seed/vertexfinalfull/600/350"
              alt="Vertex Cup 2026 Grand Final"
              className="w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-3.5">
            <span className="text-[10px] font-bold text-[var(--brand)] uppercase tracking-wider font-mono block mb-1">
              Tournament Recap
            </span>
            <h4 className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug mb-1">
              Nova Esports storms back from 0-2 to win Vertex Cup 2026
            </h4>
            <span className="text-[11px] text-[var(--ink-faint)] block font-mono">
              Valorant · 6 min read
            </span>
          </div>
        </Link>
      </div>

      {/* Social & Community Channels */}
      <div className="border border-[var(--line)] bg-[var(--card-bg)] p-4">
        <div className="text-[12px] font-heading uppercase tracking-wider text-[var(--ink-dim)] font-bold mb-3">
          Join EsportFilter Community
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-[var(--line)] p-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <span>Follow on X</span>
            <span className="text-[10px] font-mono text-[var(--ink-faint)]">140K</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-[var(--line)] p-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <span>Discord</span>
            <span className="text-[10px] font-mono text-[var(--ink-faint)]">85K</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-[var(--line)] p-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <span>YouTube</span>
            <span className="text-[10px] font-mono text-[var(--ink-faint)]">210K</span>
          </a>
          <a
            href="https://reddit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-[var(--line)] p-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
          >
            <span>Reddit</span>
            <span className="text-[10px] font-mono text-[var(--ink-faint)]">45K</span>
          </a>
        </div>
      </div>

      {/* Bottom Large Skyscraper Ad */}
      <AdSlot type="300x600" />
    </aside>
  );
}
