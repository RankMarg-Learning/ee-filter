"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

interface MainFeedSectionProps {
  feedStories: Article[];
}

export function MainFeedSection({ feedStories }: MainFeedSectionProps) {
  const [displayCount, setDisplayCount] = useState(5);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  return (
    <section className="pt-[28px] pb-[50px]">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
        {/* Left Stories Feed Column */}
        <div className="feed-col flex flex-col">
          <div className="flex justify-between items-center mb-1.5">
            <h2 className="text-[19px] font-heading flex items-center gap-2.5 text-[var(--ink)]">
              <span className="w-[5px] h-[19px] bg-[var(--brand)] inline-block" />
              More Stories
            </h2>
          </div>

          <div className="flex flex-col">
            {feedStories.slice(0, displayCount).map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <Link
                  href={`/${item.slug}`}
                  className="group flex flex-col sm:flex-row gap-4 py-4 border-b border-[var(--line)]"
                >
                  <img
                    src={item.featuredImageUrl || item.imageUrl}
                    alt={item.title}
                    className="w-full sm:w-[170px] h-[180px] sm:h-[112px] object-cover flex-shrink-0"
                  />
                  <div className="fi-body min-w-0 flex-1">
                    <CategoryPill
                      type={item.category}
                      label={item.categoryLabel}
                      className="text-[10px] px-1.5 py-0.5"
                    />
                    <h3 className="text-[16.5px] font-semibold font-sans my-1.5 leading-snug text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                      {item.title}
                    </h3>
                    {(item.excerpt || item.dek) && (
                      <p className="text-[13px] text-[var(--ink-dim)] mb-2 max-w-[62ch] leading-relaxed">
                        {item.excerpt || item.dek}
                      </p>
                    )}
                    <span className="text-[11.5px] text-[var(--ink-faint)] block font-sans">
                      {item.gameName || item.game} · {item.author.name} · {item.publishedAt}
                    </span>
                  </div>
                </Link>

                {/* Inline Native Ads inserted after 1st and 3rd feed items */}
                {idx === 0 && (
                  <AdSlot
                    type="native"
                    title="Gear built for the grind — pro-series peripherals, 20% off this week"
                    sponsorName="RailGrip"
                    imageUrl="https://picsum.photos/seed/nativeadv2/240/160"
                  />
                )}
                {idx === 2 && (
                  <AdSlot
                    type="native"
                    title="Level up your setup — monitors built for 240Hz competitive play"
                    sponsorName="ClearFrame"
                    imageUrl="https://picsum.photos/seed/nativeadv3/240/160"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {displayCount < feedStories.length && (
            <div className="text-center pt-5">
              <button
                onClick={handleLoadMore}
                className="border border-[var(--ink)] bg-transparent text-[var(--ink)] px-8 py-2.5 font-bold text-[13px] cursor-pointer font-sans hover:bg-[var(--ink)] hover:text-white transition-colors"
              >
                Load more stories
              </button>
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar */}
        <Sidebar gameTitle="Valorant" />
      </div>
    </section>
  );
}
