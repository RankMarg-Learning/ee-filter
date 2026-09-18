import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getArticlesByCategory, getHomeData } from "@/services/articleService";
import { slugToText } from "@/utils/textConvertor";
import { ArticleCategoryEnum } from "@/types/enums";
import { FeedArticleCard } from "@/components/article/FeedArticleCard";

import { Sidebar } from "@/components/layout/Sidebar";



interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.values(ArticleCategoryEnum).map((enumValue) => ({
    category: enumValue.toLowerCase().replace(/_/g, "-")
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category || "";
  const categoryLabel = slugToText(categorySlug);

  return {
    title: `${categoryLabel} Esport News & Articles — EsportFilter`,
    description: `Latest ${categoryLabel} esports news and articles on EsportFilter.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category || "";
  const categoryLabel = slugToText(categorySlug);

  const articles = await getArticlesByCategory(categorySlug);
  const { headlines } = await getHomeData();

  const leadStory = articles[0] || null;
  const feedStories = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-2 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="#" className="hover:text-[var(--brand)] transition-colors">
          Categories
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">{categoryLabel}</span>
      </div>

      {/* Category Landing Banner (Light ESPN Style) */}
      <div className="py-4 border-b border-[var(--line)] mt-2">
        <div className="wrap flex items-end justify-between">
          <div>
            <h1 className="text-[36px] sm:text-[48px] font-heading font-extrabold text-[var(--ink)] leading-none mb-2 uppercase tracking-tight">
              {categoryLabel}
            </h1>
            <p className="text-[15px] text-[var(--ink-dim)] font-sans max-w-xl">
              Explore the latest {categoryLabel.toLowerCase()} stories, deep dives, and expert analysis from the EsportFilter team.
            </p>
          </div>
          <div className="hidden sm:block">
            <span className="text-[12px] font-mono text-[var(--ink-dim)] border border-[var(--line)] px-3 py-1.5 uppercase tracking-widest font-bold">
              {articles.length} {articles.length === 1 ? "Story" : "Stories"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area (Split Layout) */}
      <section className="pt-4 pb-[80px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">

          {/* Main Feed Column */}
          <div className="feed-col flex flex-col">
            <div className="mb-6 border-b-2 border-[var(--ink)] pb-2">
              <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
                Top Story
              </h2>
            </div>

            {/* Featured Lead Story */}
            {leadStory ? (
              <Link href={`/story/${leadStory.slug}`} className="group flex flex-col mb-10">
                <div className="w-full relative overflow-hidden mb-4">
                  <img
                    src={leadStory.featuredImageUrl || leadStory.imageUrl}
                    alt={leadStory.title}
                    className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div>

                  <h2 className="text-[28px] sm:text-[36px] font-heading font-bold text-[var(--ink)] group-hover:text-[var(--brand)] mb-3 leading-tight">
                    {leadStory.title}
                  </h2>
                  {(leadStory.excerpt || leadStory.dek) && (
                    <p className="text-[16px] text-[var(--ink-dim)] mb-4 font-sans leading-relaxed">
                      {leadStory.excerpt || leadStory.dek}
                    </p>
                  )}
                  <div className="text-[var(--ink-faint)] font-sans text-[12.5px]">
                    <strong className="text-[var(--ink-dim)]">{leadStory.gameName || leadStory.game} • By {leadStory.author.name}</strong> • {leadStory.publishedAt}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="mb-10 text-[var(--ink-dim)] italic">
                No top story available in {categoryLabel} yet.
              </div>
            )}

            {feedStories.length > 0 && (
              <>
                <div className="mb-6 border-b-2 border-[var(--ink)] pb-2 mt-4">
                  <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
                    More {categoryLabel} Stories
                  </h2>
                </div>

                {/* List Feed */}
                <div className="flex flex-col">
                  {feedStories.map((item, idx) => (
                    <FeedArticleCard key={item.id || idx} article={item} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <Sidebar trendingArticles={headlines} />

        </div>
      </section>
    </div>
  );
}
