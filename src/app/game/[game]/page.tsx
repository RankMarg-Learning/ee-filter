import Link from "next/link";
import { Metadata } from "next";
import { getArticlesByGame, getHomeData } from "@/services/articleService";
import { CATEGORY_BAR_GAMES } from "@/data/games";
import { getGameFromSlug } from "@/utils/slug";
import { formatLocalTime } from "@/utils/timeConvertor";
import { FeedArticleCard } from "@/components/article/FeedArticleCard";

import { Sidebar } from "@/components/layout/Sidebar";



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
          Games
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--ink-dim)]">{gameDetail.name}</span>
      </div>

      {/* Game Landing Banner (Light ESPN Style) */}
      <div className="py-4 border-b border-[var(--line)] ">
        <div className="wrap flex items-end justify-between">
          <div>
            <h1 className="text-[36px] sm:text-[48px] font-heading font-extrabold text-[var(--ink)] leading-none mb-2 uppercase tracking-tight">
              {gameDetail.name}
            </h1>
            <p className="text-[15px] text-[var(--ink-dim)] font-sans max-w-xl">
              Get the latest updates, competitive deep dives, tournament coverage, and expert analysis on everything related to {gameDetail.name}.
            </p>
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
                    <strong className="text-[var(--ink-dim)]">{leadStory.author?.name || "EsportFilter Staff"}</strong> • <span suppressHydrationWarning>{leadStory.publishedAt ? formatLocalTime(leadStory.publishedAt) : "Recently"}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="mb-10 text-[var(--ink-dim)] italic">
                No top story available for {gameDetail.name} yet.
              </div>
            )}

            {feedStories.length > 0 && (
              <>
                <div className="mb-6 border-b-2 border-[var(--ink)] pb-2 mt-4">
                  <h2 className="text-[18px] font-heading font-bold text-[var(--ink)] uppercase tracking-wide">
                    More Headlines
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
          <Sidebar trendingArticles={headlines} gameTitle={gameDetail.name} />

        </div>
      </section>
    </div>
  );
}
