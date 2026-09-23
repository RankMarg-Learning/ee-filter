import { Article, Headline } from "@/types/article";
import { GAME_DETAILS } from "@/data/games";
import { slugToText } from "@/utils/textConvertor";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// Helper to filter out V (Valorant) games as they belong to Valoinfo
const filterVGames = (arr: any[]) => arr?.filter(item => item.game !== 'V') || [];

export async function getHomeData(): Promise<{
  leadStory: Article;
  headlines: Headline[];
  sponsors: any[];
  breakingNews: Article[];
  analysisNews: Article[];
  feedStories: Article[];
  featuredArticles: Article[];
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/ef/home`, { next: { tags: ['articles', 'home'] } });
    if (!res.ok) throw new Error("Failed to fetch home data");
    const json = await res.json();

    const data = json.data;

    data.headlines = filterVGames(data.headlines).map((h: any, i: number) => ({
      ...h,
      number: i + 1,
      gameName: h.gameName || GAME_DETAILS[h.game]?.name || slugToText(h.game) || 'Esports',
      timeAgo: 'Recently',
      publishedAt: h.publishedAt || h.createdAt
    }));
    data.breakingNews = filterVGames(data.breakingNews);
    data.analysisNews = filterVGames(data.analysisNews);
    data.feedStories = filterVGames(data.feedStories);
    data.featuredArticles = filterVGames(data.featuredArticles);

    return data;
  } catch (error) {
    console.error(error);
    return {
      leadStory: {} as Article,
      headlines: [],
      sponsors: [],
      breakingNews: [],
      analysisNews: [],
      feedStories: [],
      featuredArticles: [],
    };
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles?limit=50&isPublished=true&excludeGame=V`, { next: { tags: ['articles', 'articles-list'] } });
    if (!res.ok) throw new Error("Failed to fetch all articles");
    const json = await res.json();
    return json.data.records;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/slug/${slug}`, { next: { tags: ['articles', `article-${slug}`] } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map((a) => a.slug);
}

export async function getArticlesByGame(gameSlugOrKey: string): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/ef/game/${gameSlugOrKey}`, { next: { tags: ['articles', `game-${gameSlugOrKey}`] } });
    if (!res.ok) throw new Error("Failed to fetch game data");
    const json = await res.json();
    return filterVGames(json.data.articles || []);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/ef/category/${categorySlug}`, { next: { tags: ['articles', `category-${categorySlug}`] } });
    if (!res.ok) throw new Error("Failed to fetch category data");
    const json = await res.json();
    return filterVGames(json.data.articles || []);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticlesByAuthor(authorId: string | undefined, excludeSlug?: string): Promise<Article[]> {
  if (!authorId) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/articles?limit=10&isPublished=true&authorId=${authorId}`, { next: { tags: ['articles', `author-${authorId}`] } });
    if (!res.ok) throw new Error("Failed to fetch author articles");
    const json = await res.json();
    let articles: Article[] = filterVGames(json.data?.records || []);
    if (excludeSlug) articles = articles.filter(a => a.slug !== excludeSlug);
    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getRelatedArticles(gameKey: string, category: string, excludeSlug?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/ef/game/${gameKey}`, { next: { tags: ['articles', `game-${gameKey}`] } });
    if (!res.ok) throw new Error("Failed to fetch related data");
    const json = await res.json();
    let gameRelated: Article[] = filterVGames(json.data?.articles || []);
    if (excludeSlug) gameRelated = gameRelated.filter(a => a.slug !== excludeSlug);
    return {
      gameRelated,
      sameCategory: [],
    };
  } catch (error) {
    console.error(error);
    return {
      gameRelated: [],
      sameCategory: [],
    };
  }
}

