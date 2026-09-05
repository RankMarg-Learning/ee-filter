"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tweet } from "react-tweet";
import { useTheme } from "@/context/ThemeContext";
import { AlertTriangle } from "lucide-react";
import { ChartBlock } from "./blocks/ChartBlock";
import {
  CarouselBlock,
  TimelineBlock,
  InteractiveTable,
  MatchCardBlock,
  MapInfoBlock,
  CalloutBlock,
  QuoteBlock,
  FAQBlock,
  StatsBoxBlock,
  WinProbabilityBlock,
  HeadToHeadBlock,
} from "./blocks/UIBlocks";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { theme } = useTheme();
  const currentTheme = theme || "light";

  if (!content) return null;

  return (
    <div className={`markdown-renderer font-sans text-sm leading-[1.65] font-normal text-[var(--ink)] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }: any) {
            return <>{children}</>;
          },
          table({ node, ...props }: any) {
            return (
              <div className="w-full overflow-x-auto my-6 border border-[var(--line)] rounded-[8px]">
                <table className="w-full text-left border-collapse text-xs" {...props} />
              </div>
            );
          },
          thead({ node, ...props }: any) {
            return <thead className="bg-[var(--bg-alt)] border-b border-[var(--line)]" {...props} />;
          },
          tbody({ node, ...props }: any) {
            return <tbody className="bg-[var(--card-bg)]" {...props} />;
          },
          tr({ node, ...props }: any) {
            return <tr className="border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg-alt)] transition-colors" {...props} />;
          },
          th({ node, ...props }: any) {
            return <th className="px-3 py-2 font-mono text-[11px] font-semibold text-[var(--ink-dim)] tracking-wider uppercase text-left" {...props} />;
          },
          td({ node, ...props }: any) {
            return <td className="px-3 py-2 text-xs font-normal text-[var(--ink)] align-top" {...props} />;
          },
          code(props: any) {
            const { children, className, node, ...rest } = props;
            const match = /language-([\w-]+)/.exec(className || "");
            const lang = match ? match[1] : "";

            if (!match) {
              return (
                <code className="bg-[var(--bg-alt)] border border-[var(--line)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--brand)] rounded-[4px]" {...rest}>
                  {children}
                </code>
              );
            }

            const rawCode = String(children).replace(/\n$/, "");

            let parsedData: any = {};
            const supportedComponents = [
              "timeline",
              "match-card",
              "map-info",
              "table",
              "chart",
              "tweet",
              "callout",
              "quote",
              "faq",
              "stats-box",
              "video",
              "carousel",
              "win-prob",
              "h2h",
            ];

            if (supportedComponents.includes(lang)) {
              try {
                parsedData = JSON.parse(rawCode);
              } catch (e) {
                return (
                  <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-[var(--brand)] p-4 my-4 font-sans text-xs rounded-[6px]">
                    <p className="font-bold mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Error parsing {lang} JSON data:
                    </p>
                    <pre className="overflow-auto bg-black/10 p-2 font-mono">{rawCode}</pre>
                  </div>
                );
              }
            }

            switch (lang) {
              case "timeline":
                return <TimelineBlock data={parsedData} />;
              case "table":
                return <InteractiveTable data={parsedData} />;
              case "chart":
                return <ChartBlock data={parsedData} />;
              case "match-card":
                return <MatchCardBlock data={parsedData} />;
              case "map-info":
                return <MapInfoBlock data={parsedData} />;
              case "callout":
                return <CalloutBlock data={parsedData} />;
              case "quote":
                return <QuoteBlock data={parsedData} />;
              case "faq":
                return <FAQBlock data={parsedData} />;
              case "stats-box":
                return <StatsBoxBlock data={parsedData} />;
              case "carousel":
                return <CarouselBlock data={parsedData} />;
              case "win-prob":
                return <WinProbabilityBlock data={parsedData} />;
              case "h2h":
                return <HeadToHeadBlock data={parsedData} />;
              case "tweet":
                return (
                  <div className="not-prose my-6 flex justify-center w-full overflow-hidden">
                    <div className="w-full max-w-[550px]" data-theme={currentTheme}>
                      <Tweet id={parsedData.id || parsedData.url?.split("/").pop()} />
                    </div>
                  </div>
                );
              case "video":
                let videoUrl = parsedData.src || parsedData.url;
                if (videoUrl) {
                  try {
                    const urlObj = new URL(videoUrl);
                    if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
                      let videoId = "";
                      if (urlObj.hostname.includes("youtube.com")) {
                        videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop() || "";
                      } else {
                        videoId = urlObj.pathname.slice(1);
                      }
                      videoUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                  } catch (e) {}
                }
                return (
                  <div className="not-prose my-6 aspect-video border border-[var(--line)] bg-black rounded-[8px] overflow-hidden">
                    <iframe src={videoUrl} className="w-full h-full" allowFullScreen />
                  </div>
                );

              default:
                return (
                  <pre className="bg-[var(--bg-alt)] border border-[var(--line)] p-4 overflow-x-auto my-4 text-xs font-mono rounded-[6px]">
                    <code {...rest}>{children}</code>
                  </pre>
                );
            }
          },
          img({ node, ...props }: any) {
            return (
              <img
                {...props}
                className="border border-[var(--line)] my-6 rounded-[8px] object-cover w-full max-h-[500px]"
                alt={props.alt || "Article image"}
              />
            );
          },
          a({ node, ...props }: any) {
            return (
              <a
                {...props}
                className="text-[var(--brand)] font-medium no-underline hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              />
            );
          },
          h1({ node, ...props }: any) {
            return <h1 {...props} className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight mt-8 mb-3 text-[var(--ink)]" />;
          },
          h2({ node, ...props }: any) {
            return <h2 {...props} className="font-heading text-xl font-bold leading-snug mt-8 mb-3 text-[var(--ink)]" />;
          },
          h3({ node, ...props }: any) {
            return <h3 {...props} className="font-heading text-base font-bold mt-6 mb-2 text-[var(--ink)]" />;
          },
          h4({ node, ...props }: any) {
            return <h4 {...props} className="font-heading text-sm font-semibold mt-4 mb-2 text-[var(--ink)]" />;
          },
          ul({ node, ...props }: any) {
            return <ul {...props} className="my-4 ml-5 list-disc space-y-1 text-sm leading-relaxed" />;
          },
          ol({ node, ...props }: any) {
            return <ol {...props} className="my-4 ml-5 list-decimal space-y-1 text-sm leading-relaxed" />;
          },
          li({ node, ...props }: any) {
            return <li {...props} className="pl-1 leading-relaxed" />;
          },
          p({ node, ...props }: any) {
            return <p {...props} className="mb-4 leading-relaxed" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

