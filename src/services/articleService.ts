import {
  MOCK_LEAD_STORY,
  MOCK_HEADLINES,
  MOCK_SPONSOR_CARDS,
  MOCK_BREAKING_NEWS,
  MOCK_ANALYSIS_NEWS,
  MOCK_FEED_STORIES,
  MOCK_RELATED_VALORANT,
  MOCK_SAME_CATEGORY_STRIP,
} from "@/data/mockData";
import { Article } from "@/types/article";
import { GAME_DETAILS } from "@/data/games";

export async function getHomeData() {
  return {
    leadStory: MOCK_LEAD_STORY,
    headlines: MOCK_HEADLINES,
    sponsors: MOCK_SPONSOR_CARDS,
    breakingNews: MOCK_BREAKING_NEWS,
    analysisNews: MOCK_ANALYSIS_NEWS,
    feedStories: MOCK_FEED_STORIES,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  return [
    MOCK_LEAD_STORY,
    ...MOCK_BREAKING_NEWS,
    ...MOCK_ANALYSIS_NEWS,
    ...MOCK_FEED_STORIES,
    ...MOCK_RELATED_VALORANT,
    ...MOCK_SAME_CATEGORY_STRIP,
  ];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getAllArticles();
  const found = all.find((item) => item.slug === slug);
  if (found) return found;

  return {
    ...MOCK_LEAD_STORY,
    slug: slug,
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const all = await getAllArticles();
  return Array.from(new Set(all.map((a) => a.slug)));
}

export async function getArticlesByGame(gameSlugOrKey: string): Promise<Article[]> {
  const all = await getAllArticles();
  const normalized = gameSlugOrKey.toLowerCase();

  return all.filter((a) => {
    const gameDetail = GAME_DETAILS[a.game];
    return (
      a.game.toLowerCase() === normalized ||
      (gameDetail && gameDetail.slug.toLowerCase() === normalized) ||
      (normalized === "valorant" && a.game === "V")
    );
  });
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const all = await getAllArticles();
  const normalized = categorySlug.toLowerCase();

  return all.filter((a) => {
    return (
      a.category.toLowerCase() === normalized ||
      (a.categoryLabel && a.categoryLabel.toLowerCase() === normalized)
    );
  });
}

export async function getRelatedArticles(gameKey: string, category: string) {
  return {
    gameRelated: MOCK_RELATED_VALORANT,
    sameCategory: MOCK_SAME_CATEGORY_STRIP,
  };
}
