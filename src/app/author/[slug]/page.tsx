import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllArticles, getHomeData } from "@/services/articleService";
import { FeedArticleCard } from "@/components/article/FeedArticleCard";

import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";



interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "marcus-adeyemi" },
    { slug: "alex-chen" },
    { slug: "david-kim" },
    { slug: "rohan-sharma" },
    { slug: "viktor-petrov" },
  ];
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${name} — Author Profile & Articles — EsportFilter`,
    description: `Read all articles, esports tournament recaps and balance updates written by ${name} on EsportFilter.`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  if (!slug) {
    notFound();
  }

  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const allArticles = await getAllArticles();
  const authorArticles = allArticles.filter(
    (a) => a.author && a.author.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  const displayArticles = authorArticles.length > 0 ? authorArticles : allArticles.slice(0, 4);
  const authorInfo = authorArticles[0]?.author || {
    name: name,
    avatarUrl: `/profile-dp.png`,
    bio: `${name} is a senior esports writer covering competitive tournaments, player rosters, and balance updates across major esports circuits.`,
    role: "Senior Esports Writer",
  };

  const { headlines } = await getHomeData();

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="wrap pt-4 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">Authors</span>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">{authorInfo.name}</span>
      </div>

      {/* Top Ad */}
      <div className="wrap pt-4">
        <AdSlot type="970x90" />
      </div>

      {/* Author Header Profile Card */}
      <div className="py-8 border-b border-[var(--line)] bg-[var(--bg-alt)] mt-4">
        <div className="wrap flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={authorInfo.avatarUrl || "/profile-dp.png"}
            alt={authorInfo.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[var(--brand)]"
          />
          <div className="flex-1">
            <span className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider block mb-1 font-sans">
              {authorInfo.role || "Esports Staff Writer"}
            </span>
            <h1 className="text-[28px] sm:text-[36px] font-heading font-semibold text-[var(--ink)] mb-2">
              {authorInfo.name}
            </h1>
            <p className="text-[14.5px] text-[var(--ink-dim)] max-w-[65ch] leading-relaxed mb-3">
              {authorInfo.bio}
            </p>
            <span className="text-[12px] text-[var(--ink-faint)] font-mono uppercase">
              {displayArticles.length} Published {displayArticles.length === 1 ? "Article" : "Articles"}
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
                Articles by {authorInfo.name}
              </h2>
            </div>

            {/* List Feed */}
            <div className="flex flex-col">
              {displayArticles.map((item, idx) => (
                <FeedArticleCard key={item.id || idx} article={item} showGameName={true} />
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
