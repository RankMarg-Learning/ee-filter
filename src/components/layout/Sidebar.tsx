"use client";

import React from "react";
import Link from "next/link";
import { Headline } from "@/types/article";
import { AdSlot } from "@/components/ui/AdSlot";
import { CATEGORY_BAR_GAMES } from "@/data/games";
import { TimeAgo } from "@/components/ui/TimeAgo";

interface SidebarProps {
  trendingArticles?: Headline[];
  gameTitle?: string;
}

export function Sidebar({ trendingArticles = [], gameTitle = "Esports" }: SidebarProps) {
  // Quick game chips for sidebar
  const quickGames = CATEGORY_BAR_GAMES.filter((g) => g.slug !== "all").slice(0, 6);

  // Filter articles based on the gameTitle if it's not the generic "Esports"
  const filteredArticles = gameTitle && gameTitle !== "Esports"
    ? trendingArticles.filter(a => a.gameName.toLowerCase() === gameTitle.toLowerCase())
    : trendingArticles;

  // Fallback to generic trending articles if none match the specific game
  const displayArticles = (filteredArticles.length > 0 ? filteredArticles : trendingArticles).slice(0, 5);

  return (
    <aside className="flex flex-col gap-6 w-full font-sans">
      {/* Top Ad Slot */}
      <AdSlot type="300x250" />


      {/* Trending / Top Stories - Curated High Value Content */}
      <div className=" bg-[var(--card-bg)] ">
        <div className=" px-4 py-3">
          <h3 className="font-heading text-[13px] uppercase tracking-wider font-bold flex items-center gap-2 text-[var(--ink)]">
            <svg className="w-3.5 h-3.5 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            Top Stories
          </h3>
        </div>
        <div className="flex flex-col">
          {displayArticles.map((article) => (
            <Link key={article.id} href={`/story/${article.slug}`} className="group flex flex-col px-4 py-1.5 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg-alt)] transition-colors">
              <h4 className="text-[13px] font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2 mb-1.5">
                {article.title}
              </h4>
              <span className="text-[10px] text-[var(--ink-faint)] font-mono">
                {article.publishedAt ? <TimeAgo date={article.publishedAt} /> : article.timeAgo}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Game Hubs Quick Access */}
      <div className="border border-[var(--line)] bg-[var(--card-bg)] p-4">
        <div className="text-[12px] font-heading uppercase tracking-wider text-[var(--ink-dim)] font-bold mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] inline-block" />
          Explore Game
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



      {/* Social & Community Channels */}
      <div className="border border-[var(--line)] bg-[var(--card-bg)] p-4 hidden">
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
