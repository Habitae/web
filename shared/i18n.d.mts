export type Language = 'pt' | 'en' | 'fr';
export type TranslationValues = Record<string, unknown>;
export const languages: Language[];
export const locales: Record<Language, string>;
export const catalogs: Partial<Record<Language, Record<string, string>>>;
export function normaliseLanguage(value: unknown): Language;
export function interpolate(source: string, values?: TranslationValues): string;
export function translateText(value: string, language?: Language, values?: TranslationValues): string;
export function translateCopy<T>(value: T, language: Language): T;
export function withFrench<T extends { pt: unknown; en: unknown }>(copy: T, transform?: (copy: T['pt']) => T['pt']): T & { fr: T['pt'] };

export function loadLanguage(language: Language): Promise<void>;
