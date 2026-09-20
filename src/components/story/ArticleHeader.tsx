import React from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { formatLocalTime } from "@/utils/timeConvertor";
import { GAME_DETAILS } from "@/data/games";
import { ArticleShareButtons } from "./ArticleShareButtons";

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
              src={article.author.avatarUrl || "/profile-dp.png"}
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
        <ArticleShareButtons title={article.title} />
      </div>
    </div>
  );
}
