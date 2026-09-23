import { MetadataRoute } from 'next';
import { getAllArticleSlugs } from '@/services/articleService';
import { GAME_DETAILS } from '@/data/games';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.esportfilter.com';

  // Static core routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/advertise',
    '/editorial-policy',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Only include games that are currently being covered on the site
  const activeGameSlugs = ['league-of-legends', 'cs2', 'dota2', 'pubg', 'mlbb'];

  // Game Hub routes
  const gameRoutes = activeGameSlugs.map((slug) => ({
    url: `${baseUrl}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Category Routes
  const activeCategories = [
    'feature',
    'match-recap',
    'roster-move',
    'breaking-news',
    'tournament-preview',
    'patch-analysis',
    'guide',
    'rumor'
  ];

  const categoryRoutes = activeCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Article routes
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllArticleSlugs();
    articleRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/story/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch article slugs for sitemap", error);
  }

  return [...staticRoutes, ...gameRoutes, ...categoryRoutes, ...articleRoutes];
}
