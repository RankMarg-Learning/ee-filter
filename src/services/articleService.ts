import { Article, Headline } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

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
    const res = await fetch(`${API_BASE_URL}/articles/ef/home`, { next: { tags: ['articles'] } });
    if (!res.ok) throw new Error("Failed to fetch home data");
    const json = await res.json();
    
    const data = json.data;
    data.headlines = data.headlines?.map((h: any, i: number) => ({
      ...h,
      number: i + 1,
      gameName: h.game || 'Esports',
      timeAgo: 'Recently'
    })) || [];

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
    const res = await fetch(`${API_BASE_URL}/articles?limit=50&isPublished=true&excludeGame=V`, { next: { tags: ['articles'] } });
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
    const res = await fetch(`${API_BASE_URL}/articles/slug/${slug}`, { next: { tags: ['articles'] } });
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
    const res = await fetch(`${API_BASE_URL}/articles/ef/game/${gameSlugOrKey}`, { next: { tags: ['articles'] } });
    if (!res.ok) throw new Error("Failed to fetch game data");
    const json = await res.json();
    return json.data.articles || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/ef/category/${categorySlug}`, { next: { tags: ['articles'] } });
    if (!res.ok) throw new Error("Failed to fetch category data");
    const json = await res.json();
    return json.data.articles || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getRelatedArticles(gameKey: string, category: string) {
  try {
    // Basic implementation for now, using the same category data
    const res = await fetch(`${API_BASE_URL}/articles/ef/category/${category}`, { next: { tags: ['articles'] } });
    if (!res.ok) throw new Error("Failed to fetch related data");
    const json = await res.json();
    return {
      gameRelated: json.data.articles || [],
      sameCategory: json.data.articles || [],
    };
  } catch (error) {
    console.error(error);
    return {
      gameRelated: [],
      sameCategory: [],
    };
  }
}

