import React from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { timeConvertor } from "@/utils/timeConvertor";
import { GAME_DETAILS } from "@/data/games";
import { slugToText } from "@/utils/textConvertor";


interface CategorySectionProps {
  title: string;
  articles: Article[];
  bgAlt?: boolean;
  viewAllHref?: string;
  maxItems?: number;
}

export function CategorySection({
  title,
  articles,
  bgAlt = false,
  viewAllHref = "#",
  maxItems = 8,
}: CategorySectionProps) {
  const displayArticles = articles.slice(0, maxItems);

  return (
    <section className={`py-3 border-b border-[var(--line)] font-sans ${bgAlt ? "bg-[var(--bg-alt)]" : ""}`}>
      <div className="wrap">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2.5 text-[var(--ink)]">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="text-xs md:text-sm font-medium text-[var(--ink-dim)] hover:text-[var(--brand)] transition-colors flex items-center gap-1"
          >
            VIEW ALL <span className="text-[var(--brand)] font-bold">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayArticles.map((story) => (
            <Link key={story.id} href={`/story/${story.slug}`} className="group block">
              {/* 16:9 Aspect Ratio Image per Section 12 */}
              <div className="overflow-hidden rounded-[8px] mb-2.5 aspect-[16/9] bg-[var(--bg-alt)] border border-[var(--line)]">
                <img
                  src={story.featuredImageUrl || story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div>

                {/* 16px Card Title per Section 11 */}
                <h3 className="text-base font-semibold leading-snug mb-1.5 text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                  {story.title}
                </h3>
                {/* 12px Metadata per Section 11 */}
                <span className="text-xs text-[var(--ink-faint)] font-normal block">
                  {story.gameName || GAME_DETAILS[story.game]?.name || slugToText(story.game)} · <span suppressHydrationWarning>{timeConvertor(story.publishedAt)}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}



