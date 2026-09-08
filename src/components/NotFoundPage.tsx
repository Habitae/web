import { withFrench } from '../../shared/i18n.mjs';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n, type Language } from '../context/I18nContext';
import { sitePath, helpRoot } from '../site';
import './NotFoundPage.css';
import { SiteHeader, SiteFooter } from './SiteChrome';

const copy: Record<Language, {
  title: string;
  body: string;
  home: string;
  help: string;
  language: string;
  brandAlt: string;
}> = withFrench({
  pt: {
    title: 'Esta página não existe.',
    body: 'O endereço pode estar errado ou a página já não está disponível. Volte ao início ou procure uma resposta no centro de ajuda.',
    home: 'Voltar à página inicial',
    help: 'Abrir centro de ajuda',
    language: 'Escolher idioma',
    brandAlt: 'Habitae, Gestão de Condomínios',
  },
  en: {
    title: 'This page does not exist.',
    body: 'The address may be wrong or the page may no longer be available. Go back home or look for an answer in the help centre.',
    home: 'Back to the home page',
    help: 'Open help centre',
    language: 'Choose language',
    brandAlt: 'Habitae, Condominium Management',
  },
});

export default function NotFoundPage() {
  const { language } = useI18n();
  const c = copy[language];

  return (
    <div className="not-found-page">
      <SiteHeader />
      <main className="not-found-shell" id="page-content">


        <section className="not-found-card" aria-labelledby="not-found-title">
          <h1 id="not-found-title">{c.title}</h1>
          <p>{c.body}</p>
          <div className="not-found-actions">
            <a className="not-found-button not-found-button--primary" href={sitePath('/', language)}>
              <ArrowLeft size={16} aria-hidden="true" />
              {c.home}
            </a>
            <a className="not-found-button not-found-button--secondary" href={sitePath(helpRoot(language), language)}>
              {c.help}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
