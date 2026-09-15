import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getHomeData,
  getAllArticles,
} from "@/services/articleService";
import { ArticleHeader } from "@/components/story/ArticleHeader";
import { ArticleBody } from "@/components/story/ArticleBody";
import { AuthorBox } from "@/components/story/AuthorBox";
import { RelatedArticles } from "@/components/story/RelatedArticles";
import { FloatingNextStory } from "@/components/story/FloatingNextStory";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";

export const revalidate = 60; // ISR revalidation interval in seconds

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found — EsportFilter",
    };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt || article.dek || article.title;
  const image = article.featuredImageUrl || article.imageUrl;

  return {
    title: `${title} — EsportFilter`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function StorySlugPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { headlines } = await getHomeData();
  const allArticles = await getAllArticles();
  const gameKey = article.gameKey || article.game;
  const gameName = article.gameName || article.game;

  const { gameRelated, sameCategory } = await getRelatedArticles(
    gameKey,
    article.category
  );

  const authorRelated = allArticles.filter(
    (a) => a.author?.name === article.author?.name && a.slug !== article.slug
  );

  const nextStory = gameRelated[0] || sameCategory[0] || allArticles[0];

  return (
    <div className="w-full relative">
      {/* Breadcrumb */}
      <div className="wrap pt-2 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/game/${gameName.toLowerCase()}`} className="hover:text-[var(--brand)] transition-colors">
          {gameName}
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-[var(--brand)] transition-colors">
          {article.categoryLabel || article.category}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)] truncate max-w-[200px] sm:max-w-none inline-block align-bottom">{article.title}</span>
      </div>



      {/* Main Article Shell */}
      <div className="wrap py-4 pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[30px] items-start">
          {/* Main Article Content */}
          <article className="min-w-0">
            <ArticleHeader article={article} />
            <ArticleBody article={article} />
            <AuthorBox author={article.author} />
            <RelatedArticles
              gameRelated={gameRelated}
              sameCategory={sameCategory}
              gameName={gameName}
              authorRelated={authorRelated}
              authorName={article.author?.name}
              authorSlug={article.author?.name?.toLowerCase().replace(/\s+/g, "-")}
            />
          </article>

          {/* Right Static Sidebar */}
          <Sidebar trendingArticles={headlines} gameTitle={gameName} />
        </div>
      </div>

      {/* Floating Next Story CTA Bar */}
      {nextStory && <FloatingNextStory article={nextStory} />}
    </div>
  );
}

