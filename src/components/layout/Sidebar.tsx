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

      {/* Trending Stories Widget */}
      {trendingArticles && trendingArticles.length > 0 && (
        <div className="border border-[var(--line)] bg-[var(--card-bg)]">
          <div className="bg-[var(--sidebar-head-bg)] text-[var(--sidebar-head-ink)] px-4 py-3 flex items-center justify-between">
            <h3 className="font-heading text-[13px] uppercase tracking-wider font-semibold flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[var(--brand)] inline-block" />
              Trending in {gameTitle}
            </h3>
            <span className="text-[10px] font-mono text-[var(--brand)] uppercase tracking-widest font-bold">
              HOT
            </span>
          </div>

          <ul className="list-none m-0 p-0">
            {trendingArticles.map((item, idx) => (
              <li
                key={item.id || idx}
                className="flex gap-3.5 items-start px-4 py-3.5 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg-alt)] transition-colors group"
              >
                <span className="font-mono text-[16px] font-bold text-[var(--ink-faint)] w-5 flex-shrink-0 pt-0.5 group-hover:text-[var(--brand)] transition-colors">
                  0{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${item.slug}`}
                    className="text-[13.5px] font-semibold leading-snug block mb-1 text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--ink-faint)] font-mono">
                    <span>{item.gameName}</span>
                    <span>·</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

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
