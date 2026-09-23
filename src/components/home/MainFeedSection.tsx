"use client";

import React, { useState, useCallback, useRef, useMemo } from "react";
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const displayedStories = useMemo(
    () => feedStories.slice(0, displayCount),
    [feedStories, displayCount]
  );

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + 5);
  }, []);

  const loadMoreCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setDisplayCount((prev) => prev + 5);
          }
        },
        { threshold: 0.1, rootMargin: "150px" }
      );
      observerRef.current.observe(node);
    }
  }, []);

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
            {displayedStories.map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <FeedArticleCard article={item} showGameName={true} />
              </React.Fragment>
            ))}
          </div>

          {displayCount < feedStories.length && (
            <div ref={loadMoreCallbackRef} className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] px-8 py-2.5 font-bold text-[13px] cursor-pointer font-sans hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
              >
                Loading more stories...
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
