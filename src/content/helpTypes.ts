import type { Language } from '../context/I18nContext';

// A screenshot of the app; `src` is relative to the site root.
export type Figure = { src: string; alt: string; width: number; height: number };
export type CategoryId = 'getting-started' | 'people' | 'finance' | 'fees' | 'operations' | 'assemblies' | 'documents' | 'account';
export type Article = {
  id: string;
  slug: string;
  category: CategoryId;
  title: string;
  excerpt: string;
  updated: string;
  next: string[];
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    steps?: string[];
    note?: string;
    table?: { columns: string[]; rows: string[][] };
    figures?: Figure[];
  }>;
};
type Translation = Pick<Article, 'slug' | 'title' | 'excerpt' | 'sections'>;
export type Guide = { id: string; category: CategoryId; next: string[] } & Record<Language, Translation>;
