import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getArticlesByGame, getHomeData } from "@/services/articleService";
import { CATEGORY_BAR_GAMES } from "@/data/games";
import { getGameFromSlug } from "@/utils/slug";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

export const revalidate = 60; // ISR

interface GamePageProps {
  params: Promise<{ game: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_BAR_GAMES.filter((g) => g.slug !== "all").map((g) => ({
    game: g.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const gameSlug = resolvedParams?.game || "";
  const gameDetail = getGameFromSlug(gameSlug);

  return {
    title: `${gameDetail.name} Esports News, Coverage & Articles — EsportFilter`,
    description: `Latest ${gameDetail.name} news, tournament coverage, patch updates and roster moves on EsportFilter.`,
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const resolvedParams = await params;
  const gameSlug = resolvedParams?.game || "";
  const gameDetail = getGameFromSlug(gameSlug);

  const articles = await getArticlesByGame(gameSlug);
  const { headlines } = await getHomeData();

  const leadStory = articles[0] || (await getHomeData()).leadStory;
  const feedStories = articles.length > 1 ? articles.slice(1) : (await getHomeData()).feedStories;

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="#" className="hover:text-[var(--brand)] transition-colors">
          Games
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">{gameDetail.name}</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Game Header Banner */}
      <div className="py-[26px] border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-[5px] h-[24px] bg-[var(--brand)] inline-block" />
            <h1 className="text-[28px] sm:text-[32px] font-heading font-semibold text-[var(--ink)] flex items-center gap-2.5">
              {gameDetail.name}
            </h1>
          </div>
          <span className="text-[11.5px] text-[var(--ink-faint)] font-mono uppercase tracking-wider bg-[var(--card-bg)] px-2.5 py-1 border border-[var(--line)]">
            {articles.length} {articles.length === 1 ? "Article" : "Articles"}
          </span>
        </div>
      </div>

      {/* Featured Lead Story for this Game */}
      <section className="py-[26px] border-b border-[var(--line)]">
        <div className="wrap">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[19px] font-heading font-semibold flex items-center gap-2.5 text-[var(--ink)]">
              <span className="w-[5px] h-[19px] bg-[var(--brand)] inline-block" />
              Featured {gameDetail.name} Story
            </h2>
          </div>

          <Link href={`/${leadStory.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="overflow-hidden">
              <img
                src={leadStory.featuredImageUrl || leadStory.imageUrl}
                alt={leadStory.title}
                className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <CategoryPill
                type={leadStory.category}
                label={leadStory.categoryLabel}
                className="text-[10px] px-1.5 py-0.5 mb-2"
              />
              <h2 className="text-[24px] sm:text-[28px] font-heading font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors my-2 leading-tight">
                {leadStory.title}
              </h2>
              {(leadStory.excerpt || leadStory.dek) && (
                <p className="text-[14px] text-[var(--ink-dim)] mb-2.5 font-sans leading-relaxed">
                  {leadStory.excerpt || leadStory.dek}
                </p>
              )}
              <span className="text-[11.5px] text-[var(--ink-faint)] block font-sans">
                By {leadStory.author?.name || "EsportFilter Staff"} · {leadStory.publishedAt}
              </span>
            </div>
          </Link>
        </div>
      </section>


      {/* Main Grid: Game Stories Feed + Sticky Sidebar */}
      <section className="pt-6 pb-[50px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
          <div className="feed-col flex flex-col">
            <h2 className="text-[19px] font-heading flex items-center gap-2.5 text-[var(--ink)] mb-3">
              <span className="w-[5px] h-[19px] bg-[var(--brand)] inline-block" />
              Latest {gameDetail.name} Stories
            </h2>

            <div className="flex flex-col">
              {feedStories.map((item, idx) => (
                <Link
                  key={item.id || idx}
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
                      {item.author.name} · {item.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Sidebar trendingArticles={headlines} gameTitle={gameDetail.name} />
        </div>
      </section>
    </div>
  );
}
