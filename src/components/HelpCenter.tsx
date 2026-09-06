import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  CreditCard,
  Clock3,
  FileText,
  Search,
  Settings2,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import './HelpCenter.css';
import { SiteHeader, SiteFooter } from './SiteChrome';
import { useI18n, type Language } from '../context/I18nContext';
import { appPathname, sitePath } from '../site';
import { helpArticles, type Article, type CategoryId } from '../content/helpArticles';

type Icon = ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>;
type HelpContent = {
  metaTitle: string;
  brandAlt: string;
  home: string;
  homeLink: string;
  login: string;
  languageLabel: string;
  kicker: string;
  title: string;
  lead: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  browse: string;
  allArticles: string;
  articleCount: string;
  results: string;
  noResults: string;
  noResultsCopy: string;
  resetSearch: string;
  back: string;
  updated: string;
  onThisPage: string;
  openApp: string;
  footer: string;
  categories: Record<CategoryId, string>;
  articles: Article[];
  startTitle: string;
  startLead: string;
  readGuide: string;
  nextSteps: string;
  previousGuide: string;
  nextGuide: string;
  guideNavigation: string;
  guideProgress: (current: number, total: number) => string;
  readingOrderHint: string;
  lastGuide: string;
  readingTime: string;
  missingTitle: string;
  missingCopy: string;
  availability: string;
};

const categoryIcons: Record<CategoryId, Icon> = {
  'getting-started': BookOpen,
  people: Users,
  finance: WalletCards,
  fees: CreditCard,
  operations: CalendarCheck2,
  assemblies: CalendarCheck2,
  documents: FileText,
  account: Settings2,
};

const helpContent: Record<Language, HelpContent> = {
  pt: {
    metaTitle: 'Ajuda Habitae',
    brandAlt: 'Habitae, Gestão de Condomínios',
    home: 'Ir para a página inicial',
    homeLink: 'Página inicial',
    login: 'Entrar',
    languageLabel: 'Escolher idioma',
    kicker: 'Centro de ajuda',
    title: 'O seu condomínio, passo a passo.',
    lead: 'Aprenda onde clicar, o que preencher e como confirmar que ficou tudo certo. Mesmo que esteja a começar do zero.',
    searchLabel: 'Pesquisar no centro de ajuda',
    searchPlaceholder: 'Pesquisar quotas, movimentos, reuniões…',
    clearSearch: 'Limpar pesquisa',
    browse: 'Explorar por tema',
    allArticles: 'Todos os artigos',
    articleCount: 'artigos',
    results: 'Resultados',
    noResults: 'Não encontrámos nenhum artigo.',
    noResultsCopy: 'Tente outro termo ou explore um dos temas ao lado.',
    resetSearch: 'Limpar pesquisa',
    back: 'Voltar aos guias',
    updated: 'Atualizado',
    onThisPage: 'Neste artigo',
    openApp: 'Abrir Habitae',
    footer: 'Ajuda Habitae · Gestão de condomínios, sem ruído.',
    categories: {
      'getting-started': 'Primeiros passos',
      people: 'Pessoas e frações',
      finance: 'Financeiro',
      fees: 'Quotas',
      operations: 'Operação e fornecedores',
      assemblies: 'Assembleias',
      documents: 'Documentos e recibos',
      account: 'Conta e faturação',
    },
    startTitle: 'Ainda não sabe por onde começar?',
    startLead: 'Siga o guia inicial: crie o condomínio, adicione as frações e as pessoas e prepare as primeiras quotas.',
    readGuide: 'Ler o guia',
    nextSteps: 'Guias relacionados',
    previousGuide: 'Anterior',
    nextGuide: 'Seguinte',
    guideNavigation: 'Navegar pelos guias',
    guideProgress: (current, total) => `Guia ${current} de ${total}`,
    readingOrderHint: 'Siga a ordem sugerida ou escolha o tema de que precisa.',
    lastGuide: 'Chegou ao último guia.',
    readingTime: 'min de leitura',
    missingTitle: 'Este guia não foi encontrado.',
    missingCopy: 'O endereço pode estar incompleto. Explore os guias ou pesquise o que precisa.',
    availability: 'Estes guias explicam a aplicação Habitae. Neste site, “Abrir Habitae” leva à página de lançamento.',
    articles: helpArticles.pt,
  },
  en: {
    metaTitle: 'Habitae Help Centre',
    brandAlt: 'Habitae, Condominium Management',
    home: 'Go to the home page',
    homeLink: 'Home',
    login: 'Log in',
    languageLabel: 'Choose language',
    kicker: 'Help centre',
    title: 'Your condominium, step by step.',
    lead: 'Learn where to click, what to enter and how to check the result. Even if you are starting from scratch.',
    searchLabel: 'Search the help centre',
    searchPlaceholder: 'Search fees, transactions, meetings…',
    clearSearch: 'Clear search',
    browse: 'Browse by topic',
    allArticles: 'All articles',
    articleCount: 'articles',
    results: 'Results',
    noResults: 'We could not find an article.',
    noResultsCopy: 'Try another term or browse one of the topics alongside.',
    resetSearch: 'Clear search',
    back: 'Back to guides',
    updated: 'Updated',
    onThisPage: 'In this article',
    openApp: 'Open Habitae',
    footer: 'Habitae Help · Condominium management without the noise.',
    categories: {
      'getting-started': 'Getting started',
      people: 'People and units',
      finance: 'Finance',
      fees: 'Fees',
      operations: 'Operations and suppliers',
      assemblies: 'Assemblies',
      documents: 'Documents and receipts',
      account: 'Account and billing',
    },
    startTitle: 'Not sure where to begin?',
    startLead: 'Follow the setup guide: create the condominium, add units and people, then prepare your first fees.',
    readGuide: 'Read the guide',
    nextSteps: 'Related guides',
    previousGuide: 'Previous',
    nextGuide: 'Next',
    guideNavigation: 'Navigate the guides',
    guideProgress: (current, total) => `Guide ${current} of ${total}`,
    readingOrderHint: 'Follow the suggested order or choose the topic you need.',
    lastGuide: 'You have reached the last guide.',
    readingTime: 'min read',
    missingTitle: 'We could not find this guide.',
    missingCopy: 'The address may be incomplete. Browse the guides or search for what you need.',
    availability: 'These guides explain the Habitae application. On this site, “Open Habitae” takes you to the launch page.',
    articles: helpArticles.en,
  },
};

function routeArticleSlug() {
  const parts = appPathname().split('/').filter(Boolean);
  return parts.length > 1 ? parts.slice(1).join('/') : null;
}

function anchorId(heading: string) {
  return normalizeSearch(heading).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function readingMinutes(article: Article) {
  const words = article.sections.flatMap(sectionText).join(' ').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}

function sectionText(section: Article['sections'][number]) {
  return [section.heading, ...(section.paragraphs ?? []), ...(section.steps ?? []), section.note ?? '', ...(section.table?.columns ?? []), ...(section.table?.rows.flat() ?? [])];
}

export default function HelpCenter({ pathname = appPathname() }: { pathname?: string }) {
  const { language, setLanguage } = useI18n();
  const c = helpContent[language];
  const helpRootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const focusOnNavigation = useRef(false);
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => pathname.split('/').filter(Boolean).slice(1).join('/') || null);
  const selectedArticle = c.articles.find((article) => article.slug === selectedSlug) ?? null;
  const selectedIndex = c.articles.findIndex((article) => article.id === selectedArticle?.id);
  const previousGuide = selectedIndex > 0 ? c.articles[selectedIndex - 1] : null;
  const nextGuide = selectedIndex >= 0 ? c.articles[selectedIndex + 1] : null;
  const articleRouteBase = language === 'pt' ? '/ajuda' : '/help';
  const articlePathBase = sitePath(articleRouteBase, language).replace(/\/$/, '');
  const relatedArticles = selectedArticle
    ? selectedArticle.next.flatMap((id) => c.articles.filter((article) => article.id === id))
    : [];

  useEffect(() => {
    setReady(true);
    document.body.classList.add('help-center-site');
    document.documentElement.setAttribute('data-help-center', 'true');
    return () => {
      document.body.classList.remove('help-center-site');
      document.documentElement.removeAttribute('data-help-center');
    };
  }, []);

  useEffect(() => {
    const languageFromPath = appPathname().startsWith('/help')
      ? 'en'
      : appPathname().startsWith('/ajuda')
        ? 'pt'
        : null;
    if (languageFromPath && languageFromPath !== language) setLanguage(languageFromPath);
    // The public URL establishes the initial language. Subsequent language
    // changes use changeLanguage so they update the URL at the same time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
    document.title = selectedArticle ? `${selectedArticle.title} · ${c.metaTitle}` : c.metaTitle;
  }, [c.metaTitle, language, selectedArticle]);

  useEffect(() => {
    const onPopState = () => {
      const slug = routeArticleSlug();
      focusOnNavigation.current = slug !== selectedSlug;
      setLanguage(appPathname().startsWith('/help') ? 'en' : 'pt');
      setSelectedSlug(slug);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [selectedSlug, setLanguage]);

  useEffect(() => {
    if (focusOnNavigation.current) {
      contentRef.current?.focus({ preventScroll: true });
      helpRootRef.current?.scrollTo({ top: 0 });
      focusOnNavigation.current = false;
    }
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, [selectedSlug, language]);

  const visibleArticles = useMemo(() => {
    const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
    return c.articles.filter((article) => {
      const categoryMatches = activeCategory === 'all' || article.category === activeCategory;
      if (!categoryMatches) return false;
      const articleText = normalizeSearch([c.categories[article.category], article.title, article.excerpt, ...article.sections.flatMap(sectionText)].join(' '));
      return terms.every((term) => articleText.includes(term));
    });
  }, [activeCategory, c, query]);

  const browseCategory = (category: CategoryId | 'all') => {
    setActiveCategory(category);
    setQuery('');
    setSelectedSlug(null);
    if (selectedSlug) window.history.pushState(null, '', `${articlePathBase}/`);
  };
  const showIndex = () => { window.location.assign(`${articlePathBase}/`); };
  const articleLink = (article: Article) => ({ href: `${articlePathBase}/${article.slug}/` });
  const languageLink = (nextLanguage: Language) => {
    const translated = helpArticles[nextLanguage].find((article) => article.id === selectedArticle?.id);
    return sitePath(`/${nextLanguage === 'pt' ? 'ajuda' : 'help'}${translated ? `/${translated.slug}` : ''}`);
  };

  const guideNavigation = () => (
    <nav className="hc-guide-navigation" aria-label={c.guideNavigation}>
      <p className="hc-guide-progress">{c.guideProgress(selectedIndex + 1, c.articles.length)}</p>
      <div className="hc-guide-navigation-links">
        {previousGuide && (
          <a className="hc-guide-link" rel="prev" {...articleLink(previousGuide)}>
            <span><ArrowLeft size={16} aria-hidden="true" />{c.previousGuide}</span>
            <strong>{previousGuide.title}</strong>
          </a>
        )}
        {nextGuide ? (
          <a className="hc-guide-link hc-guide-next" rel="next" {...articleLink(nextGuide)}>
            <span>{c.nextGuide}<ArrowRight size={16} aria-hidden="true" /></span>
            <strong>{nextGuide.title}</strong>
          </a>
        ) : (
          <div className="hc-guide-end">
            <p>{c.lastGuide}</p>
            <button type="button" disabled={!ready} className="hc-back" onClick={showIndex}>{c.back}</button>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <div ref={helpRootRef} className="help-center">
      <a className="hc-skip-link" href="#help-content">{language === 'pt' ? 'Saltar para o conteúdo' : 'Skip to content'}</a>
      <SiteHeader active="help" />

      <main id="help-content" tabIndex={-1}>
        <section className={`hc-hero${selectedSlug ? ' hc-hero-compact' : ''}`}>
          <div className="hc-container">
            {!selectedSlug && <div className="hc-hero-intro"><h1>{c.title}</h1><p>{c.lead}</p></div>}
            <div className="hc-search" role="search">
              <Search size={19} aria-hidden="true" />
              <input
                disabled={!ready}
                aria-label={c.searchLabel}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveCategory('all');
                  if (selectedSlug) {
                    setSelectedSlug(null);
                    window.history.replaceState(null, '', `${articlePathBase}/`);
                  }
                }}
                placeholder={c.searchPlaceholder}
                type="search"
              />
              {query && (
                <button type="button" disabled={!ready} onClick={() => setQuery('')} aria-label={c.clearSearch}>
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="hc-container hc-layout">
          <aside className="hc-sidebar" aria-label={c.browse}>
            <span>{c.browse}</span>
            <div className="hc-category-list">
              <button type="button" disabled={!ready} aria-pressed={!selectedArticle && activeCategory === 'all'} className={!selectedArticle && activeCategory === 'all' ? 'active' : ''} onClick={() => browseCategory('all')}>
                <BookOpen size={16} aria-hidden="true" />{c.allArticles}<small>{c.articles.length}</small>
              </button>
              {(Object.keys(c.categories) as CategoryId[]).map((category) => {
                const Icon = categoryIcons[category];
                const count = c.articles.filter((article) => article.category === category).length;
                return (
                  <button key={category} type="button" disabled={!ready} aria-pressed={(selectedArticle?.category ?? activeCategory) === category} className={(selectedArticle?.category ?? activeCategory) === category ? 'active' : ''} onClick={() => browseCategory(category)}>
                    <Icon size={16} aria-hidden="true" />{c.categories[category]}<small>{count}</small>
                  </button>
                );
              })}
            </div>
          </aside>

          <section ref={contentRef} className="hc-content" tabIndex={-1} aria-label={selectedArticle?.title ?? c.allArticles}>
            {selectedArticle ? (
              <article className="hc-article">
                <button type="button" disabled={!ready} className="hc-back" onClick={showIndex}><ArrowLeft size={16} aria-hidden="true" />{c.back}</button>
                <div className="hc-article-heading">
                  <span>{c.categories[selectedArticle.category]}</span>
                  <h1>{selectedArticle.title}</h1>
                  <p>{selectedArticle.excerpt}</p>
                  <small>{readingMinutes(selectedArticle)} {c.readingTime} · {c.updated} {selectedArticle.updated}</small>
                </div>
                <div className="hc-article-layout">
                  <div className="hc-article-body">
                    {selectedArticle.sections.map((section) => (
                      <section key={section.heading} id={anchorId(section.heading)}>
                        <h2>{section.heading}</h2>
                        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {section.steps && (
                          <ol>
                            {section.steps.map((step) => <li key={step}>{step}</li>)}
                          </ol>
                        )}
                        {section.table && (
                          <div className="hc-table-wrap" role="region" aria-label={section.heading} tabIndex={0}>
                            <table>
                              <caption className="sr-only">{section.heading}</caption>
                              <thead><tr>{section.table.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
                              <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
                            </table>
                          </div>
                        )}
                        {section.note && <aside className="hc-note">
                          <strong>{language === 'pt' ? 'A ter em conta' : 'Keep in mind'}</strong>
                          <p>{section.note}</p>
                        </aside>}
                      </section>
                      ))}
                  </div>
                  <aside className="hc-article-toc" aria-label={c.onThisPage}>
                    <span>{c.onThisPage}</span>
                    {selectedArticle.sections.map((section) => <a key={section.heading} href={`#${anchorId(section.heading)}`}>{section.heading}</a>)}
                  </aside>
                </div>
                {guideNavigation()}
                {relatedArticles.length > 0 && (
                  <section className="hc-related" aria-labelledby="related-title">
                    <div className="hc-related-heading">
                      <h2 id="related-title">{c.nextSteps}</h2>
                    </div>
                    <div className="hc-related-grid">
                      {relatedArticles.map((article) => (
                        <a key={article.slug} className="hc-related-card" {...articleLink(article)}>
                          <strong>{article.title}</strong>
                          <span>{article.excerpt}</span>
                          <ArrowRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            ) : selectedSlug ? (
              <div className="hc-empty">
                <BookOpen size={24} aria-hidden="true" />
                <h1>{c.missingTitle}</h1>
                <p>{c.missingCopy}</p>
                <button type="button" disabled={!ready} onClick={() => browseCategory('all')}>{c.allArticles}</button>
              </div>
            ) : (
              <div className="hc-index">
                {!query.trim() && activeCategory === 'all' && (
                  <section className="hc-start" aria-labelledby="start-title">
                    <div className="hc-start-visual" aria-hidden="true"><div className="hc-start-paper"><BookOpen size={52} strokeWidth={1.2} /><span>H.</span><i /><i /><i /></div></div>
                    <div className="hc-start-copy"><h2 id="start-title">{c.startTitle}</h2>
                    <p>{c.startLead}</p>
                    <a className="hc-start-button" {...articleLink(c.articles.find((article) => article.id === 'start')!)}>{c.readGuide}<ArrowRight size={17} aria-hidden="true" /></a>
                    <div className="hc-shortcuts">
                      {c.articles.filter((article) => ['glossary', 'troubleshooting'].includes(article.id)).map((article) => (
                        <a key={article.id} {...articleLink(article)}>{article.title}<ArrowRight size={15} aria-hidden="true" /></a>
                      ))}
                    </div></div>
                  </section>
                )}
                <div className="hc-index-heading">
                  <div>
                    <h2>{query ? c.results : activeCategory === 'all' ? c.allArticles : c.categories[activeCategory]}</h2>
                    <p role="status">{visibleArticles.length} {visibleArticles.length === 1 ? c.articleCount.slice(0, -1) : c.articleCount}</p>
                  </div>
                </div>
                {visibleArticles.length ? (
                  <div className="hc-article-grid">
                    {visibleArticles.map((article) => {
                      const Icon = categoryIcons[article.category];
                      return (
                        <a key={article.slug} className="hc-article-card" {...articleLink(article)}>
                          <span className="hc-card-top"><span className="hc-article-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><span className="hc-article-category">{c.categories[article.category]}</span></span>
                          <strong>{article.title}</strong>
                          <span>{article.excerpt}</span>
                          <small><span><Clock3 size={14} aria-hidden="true" />{readingMinutes(article)} {c.readingTime}</span><ArrowRight size={15} aria-hidden="true" /></small>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="hc-empty">
                    <Search size={22} aria-hidden="true" />
                    <strong>{c.noResults}</strong>
                    <p>{c.noResultsCopy}</p>
                    <button type="button" disabled={!ready} onClick={() => browseCategory('all')}>{c.resetSearch}</button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter languagePaths={{ pt: languageLink('pt'), en: languageLink('en') }} />
    </div>
  );
}
