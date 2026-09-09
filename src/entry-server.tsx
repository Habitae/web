import { helpRoot } from './site';
import { translateText } from '../shared/i18n.mjs';
import { organizationSchema } from './content/organization';
import { renderToString } from 'react-dom/server';
import { I18nProvider, type Language } from './context/I18nContext';
import { ConsentProvider } from './context/ConsentContext';
import MarketingPage from './components/MarketingPage';
import HelpCenter from './components/HelpCenter';
import LegalPage from './components/LegalPage';
import ComingSoonPage from './components/ComingSoonPage';
import NotFoundPage from './components/NotFoundPage';
import TrustPage from './components/TrustPage';
import BlogPage from './components/BlogPage';
import { blogPosts, blogIndex, blogPath, translatedBlogPost } from './content/blog';
import { trustContent } from './content/trust';
import { helpArticles } from './content/helpArticles';
import { legalContent, legalDraft } from './content/legal';

// Date of the published content snapshot; update when its content changes.
export const contentUpdatedAt = '2026-09-06';

export function pages() {
  return (['pt', 'en', 'fr'] as const).flatMap(language => {
    const prefix = language === 'pt' ? '' : `/${language}`;
    const root = helpRoot(language);
    return [
      { path: `${prefix}/`, language, kind: 'home' },
      { path: `${prefix}/app/`, language, kind: 'app' },
      { path: blogPath(language), language, kind: 'blog' },
      ...blogPosts[language].map(post => ({ path: blogPath(language, post), language, kind: 'blog', post })),
      ...(['terms', 'privacy'] as const).map(id => ({ path: `${prefix}/${id}/`, language, kind: id })),
      ...(['about', 'contact'] as const).map(id => ({ path: `${prefix}/${id}/`, language, kind: id })),
      { path: `${root}/`, language, kind: 'help' },
      ...helpArticles[language].map(article => ({ path: `${root}/${article.slug}/`, language, kind: 'help', article })),
    ];
  });
}

type Page = ReturnType<typeof pages>[number];
export function render(page: Page) {
  const { language, kind } = page;
  const article = 'article' in page ? page.article : undefined;
  const post = 'post' in page ? page.post : undefined;
  const en = language === 'en';
  const homeTitle = en ? 'Condominium management software in Portugal | Habitae' : translateText('Software de gestão de condomínios em Portugal | Habitae', language);
  const homeDescription = en ? 'Habitae brings finances, fees, documents, people and tasks together in one clear condominium management platform.' : translateText('O Habitae reúne finanças, quotas, documentos, pessoas e tarefas numa plataforma clara para a gestão de condomínios.', language);
  const appDescription = en ? 'Join the Habitae waitlist to hear when our condominium management software launches in Portugal. Sign up as an administrator or resident.' : translateText('Entre na lista de espera do Habitae para saber quando o software de gestão de condomínios fica disponível em Portugal. Para administradores e moradores.', language);
  const legal = kind === 'terms' || kind === 'privacy' ? legalContent[language][kind] : null;
  const trust = kind === 'about' || kind === 'contact' ? trustContent[language][kind] : null;
  const title = kind === 'blog' ? `${post?.title ?? blogIndex[language].title} | Habitae` : trust ? `${trust.title} | Habitae` : legal ? `${legal.title} | Habitae` : article ? `${article.title} · ${en ? 'Habitae Help Centre' : translateText('Ajuda Habitae', language)}` : kind === 'help' ? (en ? 'Habitae Help Centre' : translateText('Ajuda Habitae', language)) : kind === 'app' ? (en ? 'Join the Habitae waitlist' : translateText('Lista de espera Habitae', language)) : homeTitle;
  const description = post?.description ?? (kind === 'blog' ? blogIndex[language].description : undefined) ?? trust?.description ?? legal?.description ?? article?.excerpt ?? (kind === 'app' ? appDescription : kind === 'help' ? (en ? 'Step-by-step guides to get started and manage your condominium in Habitae.' : translateText('Guias passo a passo para começar e gerir o seu condomínio no Habitae.', language)) : homeDescription);
  const pathname = page.path.replace(/^\/(?:en|fr)\//, '/');
  const surface = kind === 'blog' ? <BlogPage pathname={pathname} /> : kind === 'home' ? <MarketingPage /> : kind === 'help' ? <HelpCenter pathname={pathname} /> : trust ? <TrustPage pathname={pathname} /> : legal ? <LegalPage pathname={pathname} /> : kind === 'app' ? <ComingSoonPage /> : <NotFoundPage />;
  const html = renderToString(<ConsentProvider><I18nProvider initialLanguage={language}>{surface}</I18nProvider></ConsentProvider>);
  const alternate = (lang: Language) => {
    if (kind === 'blog') return blogPath(lang, post ? translatedBlogPost(lang, post.slug) : undefined);
    if (kind === 'help') {
      const translated = article && helpArticles[lang].find(item => item.id === article.id);
      return `${helpRoot(lang)}/${translated ? `${translated.slug}/` : ''}`;
    }
    return `${lang === 'pt' ? '' : `/${lang}`}${pathname}`;
  };
  const url = `https://habitae.pt${page.path}`;
  const breadcrumb = { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Habitae', item: `https://habitae.pt${language === 'pt' ? '/' : `/${language}/`}` },
    ...(kind === 'home' ? [] : [{ '@type': 'ListItem', position: 2, name: kind === 'blog' ? 'Blog' : kind === 'help' ? (en ? 'Help' : translateText('Ajuda', language)) : title, item: kind === 'blog' ? `https://habitae.pt${blogPath(language)}` : kind === 'help' ? `https://habitae.pt${helpRoot(language)}/` : url }]),
    ...((post || article) ? [{ '@type': 'ListItem', position: 3, name: (post || article)!.title, item: url }] : []),
  ] };
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { ...organizationSchema, description: translateText(organizationSchema.description, language) },
    { '@type': 'WebSite', '@id': 'https://habitae.pt/#website', name: 'Habitae', alternateName: 'habitae.pt', url: 'https://habitae.pt/', inLanguage: ['pt-PT', 'en', 'fr'], publisher: { '@id': 'https://habitae.pt/#organization' } },
    { '@type': post ? 'BlogPosting' : kind === 'blog' ? 'CollectionPage' : kind === 'about' ? 'AboutPage' : kind === 'contact' ? 'ContactPage' : article ? 'TechArticle' : 'WebPage', '@id': `${url}#page`, name: title, headline: post?.title ?? title, description, url, dateModified: post?.updated ?? contentUpdatedAt,
      ...(post ? { datePublished: post.published, author: { '@type': 'Organization', '@id': organizationSchema['@id'], name: 'Habitae', url: 'https://habitae.pt/about/' }, publisher: { '@id': organizationSchema['@id'] }, image: ['https://habitae.pt/social-preview-v2.png'], mainEntityOfPage: url, articleSection: post.category } : {}), inLanguage: language === 'pt' ? 'pt-PT' : language, ...(trust ? { about: { '@id': organizationSchema['@id'] } } : {}), isPartOf: { '@id': 'https://habitae.pt/#website' }, breadcrumb },
  ] };
  return { html, title, description, alternate, structuredData, noindex: Boolean(legal && legalDraft), bodyClass: kind === 'home' ? 'marketing-site' : kind === 'help' ? 'help-center-site' : legal || trust || kind === 'blog' ? 'legal-site' : '' };
}
