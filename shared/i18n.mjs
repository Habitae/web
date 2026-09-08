export const languages = ['pt', 'en', 'fr'];
export const locales = { pt: 'pt-PT', en: 'en-GB', fr: 'fr-FR' };
export const catalogs = {};
const loaders = {
  pt: () => import('./locales/pt.json', { with: { type: 'json' } }),
  en: () => import('./locales/en.json', { with: { type: 'json' } }),
  fr: () => import('./locales/fr.json', { with: { type: 'json' } }),
};
const pending = new Map();
const indexes = new Map();
export function loadLanguage(language) {
  const lang = normaliseLanguage(language);
  if (!pending.has(lang)) pending.set(lang, loaders[lang]().then(({ default: catalog }) => {
    catalogs[lang] = catalog;
    indexes.set(lang, indexCatalog(catalog));
  }).catch(error => { pending.delete(lang); throw error; }));
  return pending.get(lang);
}
export function normaliseLanguage(value) {
  const code = String(value || '').toLowerCase().split(/[-_;,]/)[0];
  return languages.includes(code) ? code : 'pt';
}
export function interpolate(source, values) {
  return String(source).replace(/\{\{\s*([^{}]+?)\s*\}\}/gu, (placeholder, key) => (
    values && Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : placeholder
  ));
}
const normalise = (value) => value.replace(/\s+/gu, ' ').trim();
function indexCatalog(catalog) {
  const canonical = new Map(Object.keys(catalog).map(key => [normalise(key).toLocaleLowerCase('pt-PT'), key]));
  const aliases = new Map();
  for (const [source, text] of Object.entries(catalog)) {
    if (!aliases.has(normalise(text))) aliases.set(normalise(text), source);
  }
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const templates = Object.keys(catalog).filter(key => key.includes('{{'))
    .sort((a, b) => b.replace(/\{\{[^}]+\}\}/g, '').length - a.replace(/\{\{[^}]+\}\}/g, '').length)
    .map(source => {
      const keys = [];
      const pattern = normalise(source).split(/(\{\{[^{}]+\}\})/u).map(part => {
        if (part.startsWith('{{')) { keys.push(part.slice(2, -2).trim()); return '(.*?)'; }
        return escape(part).replace(/\s+/g, '\\s+');
      }).join('');
      return { source, keys, pattern: new RegExp(`^${pattern}$`, 'u') };
    });
  return { canonical, aliases, templates };
}

export function translateText(value, language = 'pt', values) {
  if (typeof value !== 'string' || !value) return value;
  const lang = normaliseLanguage(language);
  const catalog = catalogs[lang];
  // Other-language copy may be inspected for stable routes before it is loaded.
  // The active language is always loaded before rendering or changing locale.
  if (!catalog) return interpolate(value, values);
  const { canonical, aliases, templates } = indexes.get(lang);
  const phrase = normalise(value);
  const source = Object.hasOwn(catalog, phrase) ? phrase : aliases.get(phrase);
  let translated = source ? catalogs[lang][source] : undefined;
  if (translated === undefined) {
    const key = canonical.get(phrase.toLocaleLowerCase('pt-PT'));
    if (key) {
      translated = catalogs[lang][key] ?? key;
      if (phrase === phrase.toUpperCase()) translated = translated.toUpperCase();
      else if (phrase[0] === phrase[0]?.toUpperCase()) translated = translated[0]?.toUpperCase() + translated.slice(1);
    }
  }
  if (translated === undefined) {
    for (const entry of templates) {
      const match = phrase.match(entry.pattern);
      if (!match) continue;
      const captures = Object.fromEntries(entry.keys.map((key, index) => [key, match[index + 1]]));
      translated = interpolate(catalogs[lang][entry.source] ?? entry.source, captures);
      break;
    }
  }
  // JSX frequently splits punctuation from labels. Match the complete label,
  // never individual words inside descriptions or names.
  if (translated === undefined) {
    const match = phrase.match(/^(.*?)(\s*[:*…]+|\.\.\.)$/u);
    if (match && match[1]) {
      const base = translateText(match[1], lang);
      if (base !== match[1]) translated = base + match[2];
    }
  }
  if (translated === undefined) return interpolate(value, values);
  return (value.match(/^\s*/u)?.[0] || '') + interpolate(translated.trim(), values) + (value.match(/\s*$/u)?.[0] || '');
}

// Only use on application-owned copy objects, never API records or user data.
export function translateCopy(value, language) {
  if (typeof value === 'string') return translateText(value, language);
  if (typeof value === 'function') return (...args) => translateCopy(value(...args), language);
  if (Array.isArray(value)) return value.map((item) => translateCopy(item, language));
  if (!value || typeof value !== 'object') return value;
  const identifiers = new Set(['id', 'slug', 'path', 'href', 'src', 'code', 'category', 'updated', 'locale']);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, identifiers.has(key) ? item : translateCopy(item, language)]));
}
export function withFrench(copy, transform = value => value) {
  let cached;
  let catalog;
  return {
    ...copy,
    get fr() {
      if (copy.fr != null) return copy.fr;
      if (!cached || catalog !== catalogs.fr) {
        cached = transform(translateCopy(copy.pt, 'fr'));
        catalog = catalogs.fr;
      }
      return cached;
    },
  };
}
