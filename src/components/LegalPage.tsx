import { useEffect } from 'react';
import { ArrowUp, Printer } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { legalContent, legalDetails, legalDraft, legalVersion, type LegalDocumentId } from '../content/legal';
import { appPathname, sitePath } from '../site';
import './LegalPage.css';
import { SiteHeader, SiteFooter } from './SiteChrome';

function LegalText({ children }: { children: string }) {
  return <>{children.split(/(\[\[.*?\]\])/g).map((part, index) => part.startsWith('[[')
    ? <mark className="legal-placeholder" key={index}>{part}</mark> : part)}</>;
}

export default function LegalPage({ pathname = appPathname() }: { pathname?: string }) {
  const { language } = useI18n();
  const documentId: LegalDocumentId = /^\/(privacy|privacidade)\/?$/.test(pathname) ? 'privacy' : 'terms';
  const content = legalContent[language][documentId];
  const c = language === 'pt' ? {
    home: 'Página inicial', help: 'Ajuda', language: 'Escolher idioma', skip: 'Saltar para o conteúdo',
    kicker: 'Informação legal', contents: 'Nesta página', print: 'Imprimir', top: 'Voltar ao início',
    version: 'Versão', effective: 'Entrada em vigor', draft: 'Minuta — por completar',
    draftCopy: 'Esta versão contém campos por preencher, assinalados entre [[…]]. A identificação do prestador e as condições operacionais devem ser completadas e revistas antes da publicação como documento definitivo ou da apresentação para aceitação.',
    footer: 'Gestão de condomínios.', documents: 'Documentos legais',
  } : {
    home: 'Home', help: 'Help', language: 'Choose language', skip: 'Skip to content',
    kicker: 'Legal information', contents: 'On this page', print: 'Print', top: 'Back to top',
    version: 'Version', effective: 'Effective date', draft: 'Draft — details to complete',
    draftCopy: 'This version contains fields to complete, marked with [[…]]. Provider details and operational conditions must be completed and reviewed before publication as a final document or presentation for acceptance.',
    footer: 'Condominium management.', documents: 'Legal documents',
  };

  useEffect(() => {
    document.body.classList.add('legal-site');
    return () => document.body.classList.remove('legal-site');
  }, []);

  useEffect(() => {
    document.title = `${content.title} | Habitae`;
    const url = `https://habitae.pt${sitePath(`/${documentId}`, language)}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    for (const [selector, value] of [
      ['meta[name="description"]', content.description],
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', content.description],
      ['meta[property="og:url"]', url],
      ['meta[property="og:locale"]', language === 'pt' ? 'pt_PT' : 'en_GB'],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', content.description],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (legalDraft && !robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    if (robots) robots.content = legalDraft ? 'noindex, follow' : 'index, follow';
  }, [content, documentId, language]);

  useEffect(() => {
    // The lazy chunk renders after the browser's initial anchor lookup.
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="legal-page" id="legal-top">
      <a className="legal-skip" href="#legal-content">{c.skip}</a>
      <SiteHeader />
      <main className="legal-container" id="legal-content" tabIndex={-1}>
        <div className="legal-hero">
          <p className="legal-kicker">{c.kicker}</p>
          <h1>{content.title}</h1>
          <p className="legal-lead">{content.description}</p>
          <div className="legal-meta">
            <span>{c.version} {legalVersion}</span>
            <span>{c.effective}: <LegalText>{legalDetails.effectiveDate}</LegalText></span>
            <button className="legal-print" type="button" onClick={() => window.print()}><Printer size={16} aria-hidden="true" />{c.print}</button>
          </div>
        </div>
        <nav className="legal-documents" aria-label={c.documents}>
          {(['terms', 'privacy'] as const).map((id) => <a key={id} href={sitePath(`/${id}`, language)} aria-current={id === documentId ? 'page' : undefined}>{legalContent[language][id].title}</a>)}
        </nav>
        {legalDraft && <aside className="legal-draft" aria-labelledby="legal-draft-title">
          <strong id="legal-draft-title">{c.draft}</strong><p>{c.draftCopy}</p>
        </aside>}
        <div className="legal-layout">
          <nav className="legal-contents" aria-label={c.contents}>
            <p>{c.contents}</p>
            <ol>{content.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
          </nav>
          <article className="legal-article" aria-label={content.title}>
            {content.sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</h2>
              {section.paragraphs?.map((paragraph, i) => <p key={i}><LegalText>{paragraph}</LegalText></p>)}
              {section.table && <div className="legal-table-wrap" role="region" aria-label={section.title} tabIndex={0}>
                <table>
                  <thead><tr>{section.table.headings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0
                    ? <th scope="row" key={j}><LegalText>{cell}</LegalText></th>
                    : <td key={j}><LegalText>{cell}</LegalText></td>)}</tr>)}</tbody>
                </table>
              </div>}
              {section.items && <ul>{section.items.map((item, i) => <li key={i}><LegalText>{item}</LegalText></li>)}</ul>}
              {section.links && <ul className="legal-reference-links">{section.links.map((link) => <li key={link.href}><a href={link.href.startsWith('/') ? sitePath(link.href, language) : link.href}>{link.label}</a></li>)}</ul>}
            </section>)}
            <a className="legal-back-top" href="#legal-top">{c.top}<ArrowUp size={16} aria-hidden="true" /></a>
          </article>
        </div>
      </main>
      <SiteFooter languagePaths={{ pt: sitePath(`/${documentId}/`, 'pt'), en: sitePath(`/${documentId}/`, 'en') }} />
    </div>
  );
}
