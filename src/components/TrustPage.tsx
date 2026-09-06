import { useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { organizationDetails } from '../content/organization';
import { trustContent, type TrustPageId } from '../content/trust';
import { appPathname, sitePath } from '../site';
import { SiteHeader, SiteFooter } from './SiteChrome';
import './LegalPage.css';
import './TrustPage.css';

export default function TrustPage({ pathname = appPathname() }: { pathname?: string }) {
  const { language } = useI18n();
  const id: TrustPageId = /^\/contact\/?$/.test(pathname) ? 'contact' : 'about';
  const content = trustContent[language][id];
  const c = language === 'pt'
    ? { home: 'Página inicial', language: 'Escolher idioma', skip: 'Saltar para o conteúdo', contents: 'Nesta página', navigation: 'Sobre e contactos', privacy: 'Privacidade', top: 'Voltar ao início', address: 'Morada', phone: 'Telefone', footer: 'Gestão de condomínios em Portugal.' }
    : { home: 'Home', language: 'Choose language', skip: 'Skip to content', contents: 'On this page', navigation: 'About and contact', privacy: 'Privacy', top: 'Back to top', address: 'Address', phone: 'Phone', footer: 'Condominium management in Portugal.' };
  const { address, email, telephone } = organizationDetails;

  useEffect(() => {
    document.body.classList.add('legal-site');
    document.title = `${content.title} | Habitae`;
    return () => document.body.classList.remove('legal-site');
  }, [content.title]);

  return (
    <div className="legal-page trust-page" id="trust-top">
      <a className="legal-skip" href="#trust-content">{c.skip}</a>
      <SiteHeader />
      <main className="legal-container" id="trust-content" tabIndex={-1}>
        <div className="legal-hero">
          <p className="legal-kicker">Habitae · Portugal</p>
          <h1>{content.title}</h1>
          <p className="legal-lead">{content.description}</p>
        </div>
        <nav className="legal-documents" aria-label={c.navigation}>
          {(['about', 'contact'] as const).map(page => <a key={page} href={sitePath(`/${page}/`, language)} aria-current={page === id ? 'page' : undefined}>{trustContent[language][page].title}</a>)}
          <a href={sitePath('/privacy/', language)}>{c.privacy}</a>
        </nav>
        <div className="legal-layout">
          <nav className="legal-contents" aria-label={c.contents}>
            <p>{c.contents}</p>
            <ol>{content.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
          </nav>
          <article className="legal-article" aria-label={content.title}>
            {content.sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.contacts && <ul>
                <li>Email: <a href={`mailto:${email}`}>{email}</a></li>
                <li>{c.phone}: <a href={`tel:${telephone}`}>{telephone}</a></li>
                <li>{c.address}: {address.streetAddress}, {address.postalCode} {address.addressLocality}, Portugal</li>
              </ul>}
              {section.links && <ul className="legal-reference-links">{section.links.map(link => <li key={link.href}><a href={sitePath(link.href, language)}>{link.label}</a></li>)}</ul>}
            </section>)}
            <a className="legal-back-top" href="#trust-top">{c.top}<ArrowUp size={16} aria-hidden="true" /></a>
          </article>
        </div>
      </main>
      <SiteFooter languagePaths={{ pt: sitePath(`/${id}/`, 'pt'), en: sitePath(`/${id}/`, 'en') }} />
    </div>
  );
}
