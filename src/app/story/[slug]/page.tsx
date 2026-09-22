import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { enumToText, slugToText } from "@/utils/textConvertor";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getHomeData,
  getArticlesByAuthor,
} from "@/services/articleService";
import { ArticleHeader } from "@/components/story/ArticleHeader";
import { ArticleBody } from "@/components/story/ArticleBody";
import { AuthorBox } from "@/components/story/AuthorBox";
import { RelatedArticles } from "@/components/story/RelatedArticles";
import { FloatingNextStory } from "@/components/story/FloatingNextStory";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdSlot } from "@/components/ui/AdSlot";



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

  if (!article || article.game === 'V') {
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

  if (!article || article.game === 'V') {
    notFound();
  }

  const { headlines } = await getHomeData();

  const displayGameName = slugToText(article.game);
  const gameHref = `/game/${article.game.toLowerCase().replace(/_/g, '-')}`;

  const rawCat = article.category || "News";
  const displayCategoryName = article.categoryLabel || enumToText(rawCat);
  const categoryHref = `/category/${rawCat.toLowerCase().replace(/_/g, '-')}`;

  const { gameRelated, sameCategory } = await getRelatedArticles(
    article.game,
    rawCat,
    article.slug
  );

  const authorRelated = await getArticlesByAuthor(article.author?.id, article.slug);

  const nextStory = gameRelated[0] || sameCategory[0] || authorRelated[0] || headlines[0];

  return (
    <div className="w-full relative">
      {/* Breadcrumb */}
      <div className="wrap pt-2 text-[12.5px] text-[var(--ink-faint)] font-sans">
        <Link href="/" className="hover:text-[var(--brand)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={gameHref} className="hover:text-[var(--brand)] transition-colors">
          {displayGameName}
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={categoryHref} className="hover:text-[var(--brand)] transition-colors">
          {displayCategoryName}
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
            <RelatedArticles
              gameRelated={gameRelated}
              sameCategory={sameCategory}
              gameName={displayGameName}
              authorRelated={authorRelated}
              authorName={article.author?.name}
              authorSlug={article.author?.name?.toLowerCase().replace(/\s+/g, "-")}
            />
          </article>

          {/* Right Static Sidebar */}
          <Sidebar trendingArticles={headlines} gameTitle={displayGameName} />
        </div>
      </div>

      {/* Floating Next Story CTA Bar */}
      {nextStory && <FloatingNextStory article={nextStory} />}
    </div>
  );
}

