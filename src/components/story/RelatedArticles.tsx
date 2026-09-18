import Link from "next/link";
import { Article } from "@/types/article";
import { timeConvertor } from "@/utils/timeConvertor";
import { GAME_DETAILS } from "@/data/games";


interface RelatedArticlesProps {
  gameRelated: Article[];
  sameCategory: Article[];
  gameName: string;
  authorRelated?: Article[];
  authorName?: string;
  authorSlug?: string;
}

export function RelatedArticles({
  gameRelated,
  gameName,
  authorRelated = [],
  authorName,
  authorSlug,
}: RelatedArticlesProps) {
  const displayRelated = gameRelated.slice(0, 6);

  return (
    <div className="pt-10 mt-3 border-t-2 border-[var(--ink)] mb-6">
      {/* Game Related Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-heading font-bold uppercase tracking-wide text-[var(--ink)]">
          More on {gameName}
        </h2>
        <span className="text-[11.5px] text-[var(--ink-faint)] font-sans">
          Matched by game & shared tags
        </span>
      </div>

      {/* Grid of Related Articles (up to 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 mb-10">
        {displayRelated.map((item) => (
          <Link key={item.id} href={`/story/${item.slug}`} className="group block">
            <div className="overflow-hidden mb-2.5">
              <img
                src={item.featuredImageUrl || item.imageUrl}
                alt={item.title}
                className="w-full h-[140px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <h3 className="text-[14.5px] font-semibold font-sans leading-snug mb-1.5 text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                {item.title}
              </h3>
              <span className="text-[11.5px] text-[var(--ink-faint)] block font-sans">
                {GAME_DETAILS[item.game || ""]?.name || item.gameName || item.game} · <span suppressHydrationWarning>{timeConvertor(item.publishedAt)}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Author Related Section if provided */}
      {authorRelated.length > 0 && authorName && (
        <div className="pt-6 border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-heading font-bold uppercase tracking-wide text-[var(--ink)]">
              More from {authorName}
            </h2>
            {authorSlug && (
              <Link
                href={`/author/${authorSlug}`}
                className="text-[12px] font-semibold text-[var(--brand)] hover:underline"
              >
                View profile →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {authorRelated.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/story/${item.slug}`} className="group block">
                <div className="overflow-hidden mb-2">
                  <img
                    src={item.featuredImageUrl || item.imageUrl}
                    alt={item.title}
                    className="w-full h-[110px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <h4 className="text-[13.5px] font-semibold font-sans leading-snug text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-[11.5px] text-[var(--ink-faint)] block font-sans" suppressHydrationWarning>
                  {timeConvertor(item.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

