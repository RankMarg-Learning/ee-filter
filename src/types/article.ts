export type CategoryPillType =
  | "breaking"
  | "recap"
  | "analysis"
  | "roster"
  | "rumor"
  | "preview"
  | "guide"
  | "interview"
  | "match-recap"
  | "player-profile"
  | "industry"
  | "community";

export interface Author {
  id?: string;
  name: string;
  avatarUrl: string;
  bio?: string;
  role?: string;
}

export interface Tag {
  id?: string;
  name: string;
  slug: string;
}

// Aligned strictly with valoinfo Article Prisma model (valoinfo/packages/db/prisma/schema.prisma)
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string; // Prisma 'excerpt'
  dek?: string; // UI alias for excerpt
  body: string; // HTML / Rich content
  category: CategoryPillType | string;
  categoryLabel?: string;
  game: string; // Prisma 'game' (e.g. "valorant" / "V")
  gameKey?: string; // UI alias
  gameName?: string; // UI alias
  country?: string;
  authorId?: string;
  author: Author;
  featuredImageUrl?: string; // Prisma 'featuredImageUrl'
  imageUrl?: string; // UI alias
  imageAlt?: string;
  caption?: string;
  isPublished: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  tags?: Tag[];

  // Optional formatting lists
  paragraphs?: string[];
  quote?: {
    text: string;
    cite: string;
  };
  bulletPoints?: string[];
}

export interface Headline {
  id: string;
  number: number;
  title: string;
  slug: string;
  gameName: string;
  timeAgo: string;
  publishedAt?: string;
}

export interface SponsorCard {
  id: string;
  tagline: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}
