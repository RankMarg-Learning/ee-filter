import React from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { formatLocalTime } from "@/utils/timeConvertor";
import { GAME_DETAILS } from "@/data/games";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const gameKey = article.gameKey || article.game;
  const gameName = article.gameName || article.game;
  const gameDetail = GAME_DETAILS[gameKey] || { dotColor: "#FF3131" };
  const displayDek = article.excerpt || article.dek;
  const authorSlug = article.author.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="article-header  pb-6 border-b border-[var(--line)] mb-6">
      <div className="flex items-center gap-3 mb-3">

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ink-dim)] font-sans">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: gameDetail.dotColor || "#FF3131" }}
          />
          {gameName}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[var(--ink)] mb-3 font-sans">
        {article.title}
      </h1>

      {displayDek && (
        <p className="text-base leading-relaxed text-[var(--ink-dim)] font-normal mb-4 font-sans">
          {displayDek}
        </p>
      )}

      {/* Metadata Row (12px / 1.4) */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[var(--ink-faint)] font-normal font-sans">
        <div className="flex items-center gap-3">
          <Link href={`/author/${authorSlug}`}>
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 hover:opacity-90 transition-opacity"
            />
          </Link>
          <div>
            <span className="font-medium text-[var(--ink)] block">
              <Link href={`/author/${authorSlug}`} className="hover:text-[var(--brand)] transition-colors">
                {article.author.name}
              </Link>
            </span>
            {article.publishedAt && (
              <span>
                Published <span suppressHydrationWarning>{formatLocalTime(article.publishedAt)}</span>
              </span>
            )}
          </div>
        </div>


        {/* Social Share Buttons */}
        <div className="flex gap-2">
          <button
            aria-label="Share on X"
            className="icon-btn border border-[var(--line)] w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>
          <button
            aria-label="Copy link"
            className="icon-btn border border-[var(--line)] w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" />
              <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
            </svg>
          </button>
          <button
            aria-label="Bookmark"
            className="icon-btn border border-[var(--line)] w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M6 4h12v16l-6-4-6 4V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
