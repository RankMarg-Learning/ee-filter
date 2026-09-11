import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getArticlesByCategory, getHomeData } from "@/services/articleService";
import { getCategoryFromSlug } from "@/utils/slug";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

export const revalidate = 60; // ISR

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const KNOWN_CATEGORIES = [
  "match-recap",
  "roster-move",
  "analysis",
  "interview",
  "feature",
  "breaking-news",
  "opinion",
  "tournament-preview",
  "patch-analysis",
  "guide",
  "rumor",
  "community",
  "meta-report",
  "industry",
  "match-preview",
  "tournament-recap",
  "player-profile",
  "team-profile",
  "game-update",
  "lore",
  "cosplay",
  "fan-art",
  "other",
];

export async function generateStaticParams() {
  return KNOWN_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category || "";
  const catInfo = getCategoryFromSlug(categorySlug);

  return {
    title: `${catInfo.label} Esport News & Articles — EsportFilter`,
    description: `Latest ${catInfo.label} esports news and articles on EsportFilter.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category || "";
  const catInfo = getCategoryFromSlug(categorySlug);

  const articles = await getArticlesByCategory(categorySlug);
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
          Categories
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">{catInfo.label}</span>
      </div>

      {/* Top Banner Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Category Landing Banner (Light ESPN Style) */}
      <div className="py-8 border-b border-[var(--line)] mt-4">
        <div className="wrap flex items-end justify-between">
          <div>
            <h1 className="text-[36px] sm:text-[48px] font-heading font-extrabold text-[var(--ink)] leading-none mb-2 uppercase tracking-tight">
              {catInfo.label}
            </h1>
            <p className="text-[15px] text-[var(--ink-dim)] font-sans max-w-xl">
              Explore the latest {catInfo.label.toLowerCase()} stories, deep dives, and expert analysis from the EsportFilter team.
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
      <section className="pt-8 pb-[80px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
          
          {/* Main Feed Column */}
          <div className="feed-col flex flex-col">
            <div className="mb-6 border-b-2 border-[var(--ink)] pb-2">
              <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
                Top Story
              </h2>
            </div>

            {/* Featured Lead Story */}
            <Link href={`/story/${leadStory.slug}`} className="group flex flex-col mb-10">
              <div className="w-full relative overflow-hidden mb-4">
                <img
                  src={leadStory.featuredImageUrl || leadStory.imageUrl}
                  alt={leadStory.title}
                  className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div>
                <CategoryPill
                  type={leadStory.category}
                  label={leadStory.categoryLabel}
                  className="text-[10px] px-2 py-0.5 mb-3"
                />
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

            <div className="mb-6 border-b-2 border-[var(--ink)] pb-2 mt-4">
              <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
                More {catInfo.label} Stories
              </h2>
            </div>

            {/* List Feed */}
            <div className="flex flex-col">
              {feedStories.map((item, idx) => (
                <Link
                  key={item.id || idx}
                  href={`/story/${item.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 py-5 border-b border-[var(--line)]"
                >
                  <div className="w-full sm:w-[220px] aspect-[16/9] sm:aspect-auto sm:h-[130px] overflow-hidden flex-shrink-0">
                    <img
                      src={item.featuredImageUrl || item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <CategoryPill
                      type={item.category}
                      label={item.categoryLabel}
                      className="text-[10px] px-1.5 py-0.5 mb-2 self-start"
                    />
                    <h3 className="text-[18px] font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>
                    <div className="text-[var(--ink-faint)] font-sans text-[12px] mt-auto">
                      {item.publishedAt}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <Sidebar trendingArticles={headlines} />

        </div>
      </section>
    </div>
  );
}
