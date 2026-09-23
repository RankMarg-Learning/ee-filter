"use client";

import React, { useState } from "react";
import {
  Info,
  AlertTriangle,
  Check,
  ChevronDown,
  Quote as QuoteIcon,
  Calendar,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const CalloutBlock = ({ data }: { data: any }) => {
  const { type = "info", title, content } = data;

  const icon = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    success: <Check className="w-5 h-5 text-emerald-500" />,
    error: <AlertTriangle className="w-5 h-5 text-[var(--brand)]" />,
  };

  const titleColor = {
    info: "text-blue-600 dark:text-blue-400",
    warning: "text-amber-600 dark:text-amber-400",
    success: "text-emerald-600 dark:text-emerald-400",
    error: "text-[var(--brand)]",
  };

  return (
    <div className="not-prose my-8 flex gap-4 p-4 border border-[var(--line)] bg-[var(--bg-alt)] font-sans">
      <div className="shrink-0 mt-0.5">{icon[type as keyof typeof icon]}</div>
      <div>
        {title && (
          <h4 className={`font-bold text-[15px] mb-1 ${titleColor[type as keyof typeof titleColor]}`}>
            {title}
          </h4>
        )}
        <p className="text-[14px] leading-relaxed text-[var(--ink-dim)]">{content}</p>
      </div>
    </div>
  );
};

export const FAQBlock = ({ data }: { data: any }) => {
  const { questions = [] } = data;
  return (
    <div className="not-prose my-8 space-y-3 font-sans">
      {questions.map((q: any, i: number) => (
        <details
          key={i}
          className="group bg-[var(--card-bg)] border border-[var(--line)] [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-[15px] text-[var(--ink)]">
            {q.question}
            <span className="transition group-open:rotate-180">
              <ChevronDown className="w-4 h-4 text-[var(--ink-faint)]" />
            </span>
          </summary>
          <div className="px-4 pb-4 pt-2 text-[14px] text-[var(--ink-dim)] leading-relaxed border-t border-[var(--line)]">
            {q.answer}
          </div>
        </details>
      ))}
    </div>
  );
};

export const QuoteBlock = ({ data }: { data: any }) => {
  return (
    <div className="not-prose my-10 flex gap-4 md:gap-6 items-start font-sans">
      <QuoteIcon className="w-10 h-10 md:w-12 md:h-12 text-[var(--brand)] shrink-0 fill-current rotate-180" />
      <div className="flex flex-col">
        <p className="text-[19px] md:text-[22px] font-heading font-medium leading-relaxed text-[var(--ink)] mb-4">
          "{data.text}"
        </p>
        {(data.author || data.role) && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-[2px] bg-[var(--brand)]" />
            <div className="flex flex-col">
              {data.author && (
                <span className="font-heading uppercase tracking-wider font-bold text-[15px] text-[var(--ink)]">
                  {data.author}
                </span>
              )}
              {data.role && (
                <span className="font-mono text-[13px] text-[var(--brand)] uppercase tracking-widest mt-0.5">
                  {data.role}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const StatsBoxBlock = ({ data }: { data: any }) => {
  const { stats = [] } = data;
  return (
    <div className="not-prose my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
      {stats.map((stat: any, i: number) => (
        <div key={i} className="flex flex-col p-4 bg-[var(--bg-alt)] border border-[var(--line)]">
          <div className="text-[13px] font-medium text-[var(--ink-dim)] mb-1">{stat.label}</div>
          <div className="text-[32px] font-heading font-bold text-[var(--ink)] leading-none mb-1.5">
            {stat.value}
          </div>
          {stat.subtext && (
            <div className={`text-[13px] font-semibold text-[var(--brand)]`}>
              {stat.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const TimelineBlock = ({ data }: { data: any }) => {
  const { title, events = [] } = data;
  return (
    <div className="not-prose my-8 p-6 border border-[var(--line)] bg-[var(--card-bg)] font-sans">
      {title && (
        <h3 className="font-heading text-[18px] uppercase tracking-wide font-bold mb-6 flex items-center gap-2 text-[var(--ink)]">
          <Calendar className="w-5 h-5 text-[var(--brand)]" />
          {title}
        </h3>
      )}
      <div className="relative border-l-2 border-[var(--line)] ml-3 space-y-8">
        {events.map((event: any, i: number) => (
          <div key={i} className="relative pl-6">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[var(--bg)] rounded-full border-2 border-[var(--brand)]" />
            <div className="text-[12px] font-bold text-[var(--brand)] mb-1 font-mono">{event.time || event.date}</div>
            <div className="text-[15px] font-bold text-[var(--ink)] mb-1">{event.title}</div>
            <div className="text-[14px] text-[var(--ink-dim)] leading-relaxed">{event.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InteractiveTable = ({ data }: { data: any }) => {
  const { headers = [], rows = [] } = data;
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDesc, setSortDesc] = useState(false);

  const sortedRows = [...rows].sort((a, b) => {
    if (sortCol === null) return 0;
    const aVal = a[sortCol];
    const bVal = b[sortCol];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDesc ? bVal - aVal : aVal - bVal;
    }
    return sortDesc
      ? String(bVal).localeCompare(String(aVal))
      : String(aVal).localeCompare(String(bVal));
  });

  const handleSort = (colIndex: number) => {
    if (sortCol === colIndex) {
      if (sortDesc) {
        setSortCol(null);
        setSortDesc(false);
      } else {
        setSortDesc(true);
      }
    } else {
      setSortCol(colIndex);
      setSortDesc(false);
    }
  };

  return (
    <div className="not-prose my-8 overflow-x-auto w-full border border-[var(--line)] font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--bg-alt)]">
          <tr>
            {headers.map((h: string, i: number) => (
              <th
                key={i}
                onClick={() => handleSort(i)}
                className="px-4 py-2 text-[12px] font-heading font-bold tracking-wider text-[var(--ink-dim)] uppercase border-b border-[var(--line)] cursor-pointer hover:text-[var(--ink)] transition-colors whitespace-nowrap select-none group"
              >
                <div className="flex items-center gap-1.5">
                  {h}
                  <span className="text-[var(--ink-faint)] group-hover:text-[var(--ink-dim)] transition-colors">
                    {sortCol === i ? (
                      sortDesc ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowUp className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-3.5 inline-block opacity-0 group-hover:opacity-100" />
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)] bg-[var(--card-bg)]">
          {sortedRows.length > 0 ? (
            sortedRows.map((row, i) => (
              <tr key={i} className="hover:bg-[var(--bg-alt)] transition-colors text-[14px] text-[var(--ink)]">
                {row.map((cell: any, j: number) => (
                  <td key={j} className="px-4 py-1.5 whitespace-nowrap font-medium">{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-4 text-center text-[var(--ink-faint)] italic">
                No matching results
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const MapInfoBlock = ({ data }: { data: any }) => {
  const { title, pick, score, description, footer } = data;

  return (
    <div className="not-prose my-8 bg-[var(--bg-alt)] border border-[var(--line)] p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold font-heading text-[17px] flex items-center gap-1.5 text-[var(--ink)]">
          {title} {pick && <span className="text-[var(--ink-faint)] font-normal text-[14px]">{pick}</span>}
        </div>
        <div className="font-heading uppercase text-[var(--brand)] font-bold text-[16px]">
          {score}
        </div>
      </div>
      {description && (
        <p className="text-[15px] text-[var(--ink-dim)] leading-relaxed mb-5">
          {description}
        </p>
      )}
      {footer && (
        <div className="text-[13px] text-[var(--ink-faint)] font-mono">
          {footer.startsWith("MVP:") ? (
            <>
              <span>MVP:</span> <span className="font-bold text-[var(--ink)]">{footer.substring(4)}</span>
            </>
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );
};

export const MatchCardBlock = ({ data }: { data: any }) => {
  const { team1, team2, event, maps = [], link } = data;

  if (team1 && team2 && event) {
    const CardContent = (
      <div
        className={`bg-[var(--bg-alt)] border border-[var(--line)] p-6 flex items-center justify-between font-sans ${
          link ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            {team1.logo && <img src={team1.logo} alt={team1.name} className="w-5 h-5 object-contain" />}
            <span className="font-heading text-base uppercase text-[var(--ink-dim)]">{team1.name}</span>
          </div>
          <span className="text-[42px] font-heading font-bold leading-none text-[var(--brand)]">
            {team1.score}
          </span>
        </div>
        <div className="flex flex-col items-center text-center px-4">
          <span className="font-heading text-xl uppercase font-bold text-[var(--ink)] mb-1">
            {event.title}
          </span>
          <span className="text-[12px] text-[var(--ink-dim)] mb-0.5">{event.subtitle}</span>
          <span className="text-[12px] text-[var(--ink-faint)] font-mono">{event.date}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading text-base uppercase text-[var(--ink-dim)]">{team2.name}</span>
            {team2.logo && <img src={team2.logo} alt={team2.name} className="w-5 h-5 object-contain" />}
          </div>
          <span className="text-[42px] font-heading font-bold leading-none text-[var(--ink)]">
            {team2.score}
          </span>
        </div>
      </div>
    );

    return (
      <div className="not-prose my-8">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="block no-underline">
            {CardContent}
          </a>
        ) : (
          CardContent
        )}

        {maps.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {maps.map((map: any, i: number) => (
              <div
                key={i}
                className="px-3 py-1 text-xs flex items-center gap-1 border border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-sans"
              >
                {map.name} — {map.result}
                <Check className="w-3.5 h-3.5 stroke-[3] text-[var(--brand)]" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export const CarouselBlock = ({ data }: { data: any }) => {
  const { images = [] } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="not-prose my-8 relative w-full overflow-hidden border border-[var(--line)] bg-black group font-sans">
      <div className="relative w-full aspect-video flex items-center justify-center">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].caption || `Slide ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="bg-[var(--card-bg)] border-t border-[var(--line)] px-4 py-3 flex items-center justify-between">
          <div className="text-[13px] text-[var(--ink-dim)] font-medium">
            {images[currentIndex].caption || `Image ${currentIndex + 1} of ${images.length}`}
          </div>
          <div className="flex gap-1.5">
            {images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all border-none p-0 cursor-pointer ${
                  idx === currentIndex ? "bg-[var(--brand)]" : "bg-[var(--line)]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const WinProbabilityBlock = ({ data }: { data: any }) => {
  const { team1, team2, probability } = data;
  const p1 = probability || 50;
  const p2 = 100 - p1;
  return (
    <div className="not-prose my-8 p-5 bg-[var(--card-bg)] border border-[var(--line)] font-sans">
      <div className="flex justify-between font-bold mb-3 items-center">
        <div className="flex items-center gap-2">
          {team1?.logo && <img src={team1.logo} className="w-5 h-5 object-contain" alt="Team 1" />}
          <span className="text-[var(--brand)] font-heading uppercase tracking-wide">
            {team1?.name} ({p1}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--ink-dim)] font-heading uppercase tracking-wide">
            ({p2}%) {team2?.name}
          </span>
          {team2?.logo && <img src={team2.logo} className="w-5 h-5 object-contain" alt="Team 2" />}
        </div>
      </div>
      <div className="w-full h-4 bg-[var(--line)] overflow-hidden flex relative">
        <div className="h-full bg-[var(--brand)] transition-all duration-1000 ease-out" style={{ width: `${p1}%` }} />
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40 -translate-x-1/2 z-10" />
      </div>
    </div>
  );
};

export const HeadToHeadBlock = ({ data }: { data: any }) => {
  const item1 = data.item1 || data.team1 || data.player1;
  const item2 = data.item2 || data.team2 || data.player2;
  const img1 = item1?.image || item1?.logo || item1?.photo;
  const img2 = item2?.image || item2?.logo || item2?.photo;
  const stats = data.stats || [];
  const isPlayer = data.isPlayer || !!data.player1;

  return (
    <div className="not-prose my-8 bg-[var(--card-bg)] border border-[var(--line)] p-6 font-sans">
      <div className="flex justify-between items-center mb-6 border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-3">
          {img1 && (
            <img
              src={img1}
              className={`w-8 h-8 object-contain ${isPlayer ? "rounded-full object-cover" : ""}`}
              alt={item1?.name}
            />
          )}
          <span className="font-bold text-[18px] font-heading uppercase tracking-wide text-[var(--ink)]">
            {item1?.name}
          </span>
        </div>
        <span className="font-bold text-[14px] text-[var(--ink-faint)] italic bg-[var(--bg-alt)] px-2 py-1 font-mono">
          VS
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-[18px] font-heading uppercase tracking-wide text-[var(--ink)]">
            {item2?.name}
          </span>
          {img2 && (
            <img
              src={img2}
              className={`w-8 h-8 object-contain ${isPlayer ? "rounded-full object-cover" : ""}`}
              alt={item2?.name}
            />
          )}
        </div>
      </div>
      <div className="space-y-4">
        {stats.map((stat: any, i: number) => {
          const val1 = stat.value1 ?? stat.team1Value ?? stat.player1Value;
          const val2 = stat.value2 ?? stat.team2Value ?? stat.player2Value;
          const sub1 = stat.subtext1 ?? stat.team1Subtext ?? stat.player1Subtext;
          const sub2 = stat.subtext2 ?? stat.team2Subtext ?? stat.player2Subtext;
          const num1 = parseFloat(val1);
          const num2 = parseFloat(val2);
          let t1Win = false;
          let t2Win = false;
          if (!isNaN(num1) && !isNaN(num2)) {
            t1Win = num1 > num2;
            t2Win = num2 > num1;
          } else {
            t1Win = val1 > val2;
            t2Win = val2 > val1;
          }

          return (
            <div key={i} className="flex justify-between items-center text-[14px]">
              <span className={`font-bold w-1/3 text-left ${t1Win ? "text-[var(--brand)]" : "text-[var(--ink-dim)]"}`}>
                {val1} {sub1 && <span className="text-[10px] text-[var(--ink-faint)] ml-1">{sub1}</span>}
              </span>
              <span className="text-[var(--ink-faint)] text-[12px] font-mono font-semibold uppercase tracking-wider w-1/3 text-center bg-[var(--bg-alt)] py-1">
                {stat.label}
              </span>
              <span className={`font-bold w-1/3 text-right ${t2Win ? "text-[var(--brand)]" : "text-[var(--ink-dim)]"}`}>
                {sub2 && <span className="text-[10px] text-[var(--ink-faint)] mr-1">{sub2}</span>} {val2}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
