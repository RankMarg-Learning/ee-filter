import React from "react";
import Link from "next/link";
import { Article, Headline } from "@/types/article";
import { CategoryPill } from "@/components/ui/CategoryPill";

interface HeroSectionProps {
  leadStory: Article;
  headlines: Headline[];
  subStories?: Article[];
}

export function HeroSection({
  leadStory,
  headlines,
  subStories = [],
}: HeroSectionProps) {
  const displayImage = leadStory.featuredImageUrl || leadStory.imageUrl;
  const displayDek = leadStory.excerpt || leadStory.dek;
  const displayGame = leadStory.gameName || leadStory.game;

  const secondaryCards = subStories.slice(0, 2);

  return (
    <section className="py-8 border-b border-[var(--line)] font-sans">
      <div className="wrap flex flex-col gap-8">
        {/* Top Tier: Main Story (60-65% width) + Secondary Stories (35-40% width) per Section 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Story (7 Cols / 60%) */}
          <div className="lg:col-span-7 flex flex-col">
            <Link href={`/story/${leadStory.slug}`} className="group block">
              {/* 16:9 Image per Section 8 & 12 */}
              <div className="overflow-hidden rounded-[8px] mb-3 aspect-[16/9] bg-[var(--bg-alt)] border border-[var(--line)]">
                <img
                  src={displayImage}
                  alt={leadStory.imageAlt || leadStory.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div>
                <CategoryPill
                  type={leadStory.category}
                  label={leadStory.categoryLabel}
                  className="mb-2"
                />

                {/* Main Story Title (28-32px / 1.15 per Section 9) */}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-2">
                  {leadStory.title}
                </h1>

                {/* Main Story Description / Dek (16px / 1.5 per Section 5) */}
                {displayDek && (
                  <p className="text-base leading-relaxed text-[var(--ink-dim)] font-normal mb-3 line-clamp-2">
                    {displayDek}
                  </p>
                )}

                {/* Metadata (12px per Section 9) */}
                <span className="text-xs text-[var(--ink-faint)] font-normal block">
                  <span className="text-[var(--brand)] font-semibold">{displayGame}</span> · By{" "}
                  {leadStory.author?.name || "VALOINFO Staff"} · {leadStory.updatedAt || leadStory.publishedAt}
                </span>
              </div>
            </Link>
          </div>

          {/* Secondary Stories Stack (5 Cols / 40%) per Section 7 */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-[var(--ink)]">
                Top Stories
              </h2>
            </div>

            {secondaryCards.map((story) => (
              <Link
                key={story.id}
                href={`/story/${story.slug}`}
                className="group flex flex-col sm:flex-row gap-3.5 pb-4 border-b border-[var(--line)] last:border-b-0 last:pb-0"
              >
                {/* 16:9 Image per Section 12 */}
                <div className="overflow-hidden rounded-[8px] w-full sm:w-[150px] aspect-[16/9] flex-shrink-0 bg-[var(--bg-alt)] border border-[var(--line)]">
                  <img
                    src={story.featuredImageUrl || story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <CategoryPill
                    type={story.category}
                    label={story.categoryLabel}
                    className="mb-1.5"
                  />
                  {/* Secondary Story Title (16-18px per Section 9) */}
                  <h3 className="text-base font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2 mb-1">
                    {story.title}
                  </h3>
                  <span className="text-xs text-[var(--ink-faint)] font-normal block">
                    {story.gameName || story.game} · {story.publishedAt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Headlines Strip Rail (Horizontal Section per Section 4) */}
        <div className="pt-5 border-t border-[var(--line)]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-[var(--ink)]">
              Latest Headlines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {headlines.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/story/${item.slug}`}
                className="group flex gap-2.5 p-3 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[8px] hover:border-[var(--brand)] transition-colors"
              >
                <span className="font-mono text-xs text-[var(--brand)] font-bold w-4 flex-shrink-0 pt-0.5">
                  {item.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold leading-snug mb-1 text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-[var(--ink-faint)] font-normal block truncate">
                    {item.gameName} · {item.timeAgo}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}







