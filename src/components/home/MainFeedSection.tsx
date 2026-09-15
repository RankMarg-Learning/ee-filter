"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article, Headline } from "@/types/article";
import { FeedArticleCard } from "@/components/article/FeedArticleCard";

import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

interface MainFeedSectionProps {
  feedStories: Article[];
  headlines?: Headline[];
}

export function MainFeedSection({ feedStories, headlines = [] }: MainFeedSectionProps) {
  const [displayCount, setDisplayCount] = useState(5);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  return (
    <section className="pt-10 pb-[80px]">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
        
        {/* Main Feed Column */}
        <div className="feed-col flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[var(--ink)] pb-2">
            <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
              More Stories
            </h2>
          </div>

          <div className="flex flex-col">
            {feedStories.slice(0, displayCount).map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <FeedArticleCard article={item} showGameName={true} />

                {/* Inline Native Ads inserted after 1st and 3rd feed items */}
                {idx === 0 && (
                  <div className="py-5 border-b border-[var(--line)]">
                    <AdSlot
                      type="native"
                      title="Gear built for the grind — pro-series peripherals, 20% off this week"
                      sponsorName="RailGrip"
                      imageUrl="https://picsum.photos/seed/nativeadv2/240/160"
                    />
                  </div>
                )}
                {idx === 2 && (
                  <div className="py-5 border-b border-[var(--line)]">
                    <AdSlot
                      type="native"
                      title="Level up your setup — monitors built for 240Hz competitive play"
                      sponsorName="ClearFrame"
                      imageUrl="https://picsum.photos/seed/nativeadv3/240/160"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {displayCount < feedStories.length && (
            <div className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] px-8 py-2.5 font-bold text-[13px] cursor-pointer font-sans hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
              >
                Load more stories
              </button>
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar */}
        <Sidebar trendingArticles={headlines} />
      </div>
    </section>
  );
}
