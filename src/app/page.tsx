import React from "react";
import { getHomeData } from "@/services/articleService";
import { HeroSection } from "@/components/home/HeroSection";
import { SponsoredSection } from "@/components/home/SponsoredSection";
import { CategorySection } from "@/components/home/CategorySection";
import { MainFeedSection } from "@/components/home/MainFeedSection";
import { AdSlot } from "@/components/ui/AdSlot";

export const revalidate = 60; // ISR revalidation interval in seconds

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="w-full">
      {/* Top Banner Ad (Reserved height, Section 23 & 30) */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Hero Section (Main Story 60%, Secondary Stories 40%, Section 7-9) */}
      <HeroSection
        leadStory={data.leadStory}
        headlines={data.headlines}
        subStories={data.breakingNews.slice(0, 2)}
      />

      {/* Dedicated Advertisement Block (Section 24) */}
      <div className="wrap py-4">
        <AdSlot type="728x90" />
      </div>

      {/* Latest News Section (Chronological, Section 17) */}
      <CategorySection
        title="Latest News"
        viewAllHref="/category/news"
        articles={data.breakingNews}
        maxItems={8}
      />

      {/* VALORANT Esports Focus Section (Section 52 Blueprint) */}
      <CategorySection
        title="VALORANT Esports"
        viewAllHref="/game/valorant"
        articles={data.breakingNews.filter((a) => a.game === "V" || a.gameName === "Valorant")}
        maxItems={4}
      />

      {/* Dedicated Advertisement Block (Section 24 & 52) */}
      <div className="wrap py-4">
        <AdSlot type="728x90" />
      </div>

      {/* Sponsored Content Grid (Section 52) */}
      <SponsoredSection sponsors={data.sponsors} />

      {/* Analysis & Patch Notes Section (Section 52 Blueprint) */}
      <CategorySection
        title="Analysis & Patch Notes"
        viewAllHref="/category/analysis"
        articles={data.analysisNews}
        bgAlt={true}
        maxItems={4}
      />

      {/* Main Feed Section with Trending Sidebar (Section 42 & 43) */}
      <MainFeedSection feedStories={data.feedStories} headlines={data.headlines} />
    </div>
  );
}


