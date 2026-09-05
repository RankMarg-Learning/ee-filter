import { CATEGORY_BAR_GAMES, GAME_DETAILS, GameInfo } from "@/data/games";

/**
 * Converts any arbitrary text string to a clean URL slug.
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Converts a URL slug into readable title case text.
 */
export function unslugify(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Known category alias mappings for seamless URL decoding.
 */
const CATEGORY_ALIASES: Record<string, { key: string; label: string }> = {
  breaking: { key: "breaking", label: "Breaking News" },
  "breaking-news": { key: "breaking", label: "Breaking News" },
  recap: { key: "recap", label: "Tournament Recap" },
  "tournament-recap": { key: "recap", label: "Tournament Recap" },
  analysis: { key: "analysis", label: "Analysis & Patch Notes" },
  "patch-notes": { key: "analysis", label: "Patch Notes" },
  "patch-analysis": { key: "analysis", label: "Patch Analysis" },
  roster: { key: "roster", label: "Roster Move" },
  "roster-move": { key: "roster", label: "Roster Move font-mono" },
  rumor: { key: "rumor", label: "Rumor" },
  preview: { key: "preview", label: "Tournament Preview" },
  guide: { key: "guide", label: "Guide" },
  interview: { key: "interview", label: "Interview" },
  community: { key: "community", label: "Community" },
  news: { key: "news", label: "News" },
  rankings: { key: "rankings", label: "Rankings" },
};

/**
 * Decodes any incoming game slug (e.g. "cs2", "counter-strike-2", "valorant", "v", "lol")
 * into normalized GameInfo with zero 404s.
 */
export function getGameFromSlug(slug: string): GameInfo {
  const normalized = (slug || "").toLowerCase().trim();

  // Check CATEGORY_BAR_GAMES
  const matchedBarItem = CATEGORY_BAR_GAMES.find(
    (g) => g.slug.toLowerCase() === normalized || g.key.toLowerCase() === normalized
  );

  if (matchedBarItem) {
    const detail = GAME_DETAILS[matchedBarItem.key];
    if (detail) return detail;
    return {
      key: matchedBarItem.key,
      name: matchedBarItem.name,
      slug: matchedBarItem.slug,
      dotColor: "#FF3131",
    };
  }

  // Check direct keys in GAME_DETAILS
  for (const [key, detail] of Object.entries(GAME_DETAILS)) {
    if (
      detail.slug.toLowerCase() === normalized ||
      key.toLowerCase() === normalized ||
      detail.name.toLowerCase() === normalized ||
      slugify(detail.name) === normalized
    ) {
      return detail;
    }
  }

  // Fallback: unslugify text dynamically so it NEVER 404s
  const fallbackName = unslugify(normalized);
  return {
    key: slugify(normalized).toUpperCase(),
    name: fallbackName,
    slug: slugify(normalized),
    dotColor: "#FF3131",
  };
}

/**
 * Decodes any incoming category slug into normalized Category metadata.
 */
export function getCategoryFromSlug(slug: string): { key: string; label: string; slug: string } {
  const normalized = (slug || "").toLowerCase().trim();

  if (CATEGORY_ALIASES[normalized]) {
    return {
      key: CATEGORY_ALIASES[normalized].key,
      label: CATEGORY_ALIASES[normalized].label,
      slug: normalized,
    };
  }

  const fallbackLabel = unslugify(normalized);
  return {
    key: normalized,
    label: fallbackLabel,
    slug: normalized,
  };
}
