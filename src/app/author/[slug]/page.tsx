import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllArticles, getHomeData } from "@/services/articleService";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

export const revalidate = 60; // ISR

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
    avatarUrl: `https://picsum.photos/seed/${slug}/160/160`,
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
            src={authorInfo.avatarUrl}
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

      {/* Author Articles Feed Grid */}
      <section className="py-8 pb-[50px]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
          <div className="feed-col flex flex-col">
            <h2 className="text-[19px] font-heading flex items-center gap-2.5 text-[var(--ink)] mb-4">
              <span className="w-[5px] h-[19px] bg-[var(--brand)] inline-block" />
              Articles by {authorInfo.name}
            </h2>

            <div className="flex flex-col">
              {displayArticles.map((item, idx) => (
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
                      {item.gameName || item.game} · {item.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Sidebar trendingArticles={headlines} gameTitle="Esports" />
        </div>
      </section>
    </div>
  );
}
