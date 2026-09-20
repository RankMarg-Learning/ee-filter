import React from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { timeConvertor } from "@/utils/timeConvertor";
import { GAME_DETAILS } from "@/data/games";
import { slugToText } from "@/utils/textConvertor";

interface FeedArticleCardProps {
  article: Article;
  showGameName?: boolean;
}

export function FeedArticleCard({ article, showGameName = false }: FeedArticleCardProps) {
  return (
    <Link
      href={`/story/${article.slug}`}
      className="group flex flex-col sm:flex-row gap-4 py-4 border-b border-[var(--line)]"
    >
      <div className="w-full sm:w-[160px] aspect-[16/9] sm:aspect-auto sm:h-[100px] overflow-hidden flex-shrink-0">
        <img
          src={article.featuredImageUrl || article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-[16px] font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug mb-1.5">
          {article.title}
        </h3>
        {(article.excerpt || article.dek) && (
          <p className="text-[13px] text-[var(--ink-dim)] line-clamp-2 mb-2 leading-relaxed font-sans">
            {article.excerpt || article.dek}
          </p>
        )}
        <div className="text-[var(--ink-faint)] font-sans text-[11px] mt-auto">
          {showGameName && (article.gameName || article.game)
            ? `${article.gameName || GAME_DETAILS[article.game]?.name || slugToText(article.game)} • `
            : ""}
          <span suppressHydrationWarning>{timeConvertor(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
