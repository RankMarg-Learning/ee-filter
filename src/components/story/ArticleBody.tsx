import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import { AdSlot } from "@/components/ui/AdSlot";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

interface ArticleBodyProps {
  article: Article;
}

export function ArticleBody({ article }: ArticleBodyProps) {

  const displayImage = article.featuredImageUrl || article.imageUrl;
  const displayDek = article.excerpt || article.dek;

  return (
    <div className="article-body-wrapper ">
      {/* Featured Media (mt-6 / 24px, mb-8 / 32px, radius 8px) */}
      {displayImage && (
        <div className="mt-6 mb-8 relative w-full aspect-[16/9] rounded-[8px] border border-[var(--line)] overflow-hidden">
          <Image
            src={displayImage}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}

      {/* Main Paragraphs & Media Content (text-sm leading-[1.65] font-normal mb-4) */}
      <div className="text-sm leading-[1.65] font-normal text-[var(--ink)] font-sans">
        {article.body ? (
          <MarkdownRenderer content={article.body} />
        ) : article.paragraphs && article.paragraphs.length > 0 ? (
          <>
            <p className="mb-4">{article.paragraphs[0]}</p>
            {article.paragraphs[1] && <p className="mb-4">{article.paragraphs[1]}</p>}

            {/* Blockquote */}
            {article.quote && (
              <blockquote className="border-l-4 border-[var(--ink)] pl-5 my-8 font-sans font-medium text-lg text-[var(--ink)] italic bg-[var(--bg-alt)] py-3 pr-4 rounded-r-md">
                "{article.quote.text}"
                <cite className="block font-sans font-semibold text-xs text-[var(--ink-faint)] mt-2 not-italic">
                  — {article.quote.cite}
                </cite>
              </blockquote>
            )}

            <h2 className="text-xl font-bold leading-snug mt-8 mb-3 text-[var(--ink)]">
              How the reverse sweep unfolded
            </h2>
            {article.paragraphs[2] && <p className="mb-4">{article.paragraphs[2]}</p>}

            {/* Bullet List */}
            {article.bulletPoints && article.bulletPoints.length > 0 && (
              <ul className="list-disc ml-5 mb-4 space-y-1 text-sm">
                {article.bulletPoints.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {article.paragraphs[3] && <p className="mb-4">{article.paragraphs[3]}</p>}

            {/* Inline Banner Ad */}
            <AdSlot type="728x280" className="my-8" />

            <h2 className="text-xl font-bold leading-snug mt-8 mb-3 text-[var(--ink)]">
              What's next
            </h2>
            {article.paragraphs[4] && <p className="mb-4">{article.paragraphs[4]}</p>}
          </>
        ) : (
          <p className="mb-4">{displayDek || article.title}</p>
        )}
      </div>

      {/* Google News Source Link */}
      <div className="mt-6 mb-2 flex justify-center">
        <a
          href="https://www.google.com/preferences/source?q=esportfilter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] hover:underline font-sans"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
          </svg>
          Add Esport Filter as a preferred source on Google
        </a>
      </div>

      {/* Tags Block */}
      {article.tags && article.tags.length > 0 && (
        <div className="py-5 border-t border-[var(--line)] mt-8 flex items-center gap-2.5 flex-wrap">
          <span className="text-xs text-[var(--ink-faint)] font-semibold uppercase tracking-wide font-sans">
            Tagged
          </span>
          {article.tags.map((tag: any, idx) => {
            const tagName = typeof tag === "string" ? tag : (tag?.tag?.name || tag?.name);
            const tagKey = typeof tag === "string" ? tag : (tag?.tag?.slug || tag?.slug || tag?.tag?.id || tag?.id || idx);
            return (
              <p
                className="text-xs text-[var(--ink-dim)] border border-[var(--line)] px-2.5 py-1 rounded-[4px] font-sans"
              >
                {tagName}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

