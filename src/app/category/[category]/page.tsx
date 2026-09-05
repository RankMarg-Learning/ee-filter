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
  "breaking",
  "recap",
  "analysis",
  "roster",
  "rumor",
  "preview",
  "guide",
  "interview",
  "community",
  "news",
  "rankings",
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

      {/* Category Header Banner */}
      <div className="py-6 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CategoryPill type={catInfo.key} label={catInfo.label} className="text-sm px-3 py-1" />
            <h1 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[var(--ink)]">
              {catInfo.label} Articles
            </h1>
          </div>
          <span className="text-[12.5px] text-[var(--ink-faint)] font-mono uppercase tracking-wider">
            {articles.length} {articles.length === 1 ? "Story" : "Stories"}
          </span>
        </div>
      </div>

      {/* Lead Story */}
      <section className="py-6 border-b border-[var(--line)]">
        <div className="wrap">
          <Link href={`/${leadStory.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="overflow-hidden">
              <img
                src={leadStory.featuredImageUrl || leadStory.imageUrl}
                alt={leadStory.title}
                className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <CategoryPill
                type={leadStory.category}
                label={leadStory.categoryLabel}
                className="mb-2"
              />
              <h2 className="text-[24px] sm:text-[28px] font-heading font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-2 leading-tight">
                {leadStory.title}
              </h2>
              {(leadStory.excerpt || leadStory.dek) && (
                <p className="text-[14px] text-[var(--ink-dim)] mb-3 leading-relaxed">
                  {leadStory.excerpt || leadStory.dek}
                </p>
              )}
              <span className="text-[12px] text-[var(--ink-faint)] block font-sans">
                {leadStory.gameName || leadStory.game} · By {leadStory.author.name} · {leadStory.publishedAt}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Split Feed + Sidebar */}
      <section className="pt-6 pb-[50px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
          <div className="feed-col flex flex-col">
            <h2 className="text-[19px] font-heading flex items-center gap-2.5 text-[var(--ink)] mb-3">
              <span className="w-[5px] h-[19px] bg-[var(--brand)] inline-block" />
              All {catInfo.label} Stories
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
                      {item.gameName || item.game} · {item.author.name} · {item.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Sidebar trendingArticles={headlines} gameTitle={catInfo.label} />
        </div>
      </section>
    </div>
  );
}
