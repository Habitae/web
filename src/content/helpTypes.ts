import type { Language } from '../context/I18nContext';

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
  }>;
};
type Translation = Pick<Article, 'slug' | 'title' | 'excerpt' | 'sections'>;
export type Guide = { id: string; category: CategoryId; next: string[] } & Record<Language, Translation>;
