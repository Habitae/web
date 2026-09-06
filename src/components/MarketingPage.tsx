import { useEffect, useState } from 'react';
import { SiteHeader, SiteFooter } from './SiteChrome';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  History,
  UsersRound,
} from 'lucide-react';
import './MarketingPage.css';
import ProductExamples from './ProductExamples';
import TimelinePreview from './TimelinePreview';
import { useI18n, type Language } from '../context/I18nContext';
import { sitePath } from '../site';

type PricingPlan = {
  code: 'xs' | 's' | 'm' | 'l' | 'xl';
  name: string;
  description: string;
  price: string;
  interval: string;
  annualPrice: string;
  annualInterval: string;
  annualSaving?: string;
  features: string[];
  action: string;
  featured?: boolean;
};

const pricingPlans: Record<Language, PricingPlan[]> = {
  pt: [
    { code: 's', name: 'Habitae S', description: 'A experiência Habitae completa para um condomínio autogerido.', price: '19,99 €', interval: '/ mês', annualPrice: '227,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 11,98 € por ano', features: ['Gestão completa de um condomínio', 'Emails enviados pelo Habitae', 'Convites e equipa de gestão'], action: 'Entrar na lista de espera', featured: true },
    { code: 'm', name: 'Habitae M', description: 'Para administrações profissionais em crescimento.', price: '69,99 €', interval: '/ mês', annualPrice: '797,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 41,98 € por ano', features: ['Gestão de múltiplos condomínios', 'Ferramentas para equipas', 'Apoio ao crescimento'], action: 'Entrar na lista de espera' },
    { code: 'l', name: 'Habitae L', description: 'Para operações de condomínio de maior escala.', price: '169,99 €', interval: '/ mês', annualPrice: '1 937,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 101,98 € por ano', features: ['Tudo no Habitae M', 'Operação de maior escala', 'Acompanhamento prioritário'], action: 'Entrar na lista de espera' },
  ],
  en: [
    { code: 's', name: 'Habitae S', description: 'The complete Habitae experience for a self-managed condominium.', price: '€19.99', interval: '/ month', annualPrice: '€227.90', annualInterval: '/ year', annualSaving: 'Save €11.98 per year', features: ['Complete management for one condominium', 'Emails sent through Habitae', 'Team invitations and management'], action: 'Join the waitlist', featured: true },
    { code: 'm', name: 'Habitae M', description: 'For growing professional administrators.', price: '€69.99', interval: '/ month', annualPrice: '€797.90', annualInterval: '/ year', annualSaving: 'Save €41.98 per year', features: ['Multiple condominium management', 'Tools for teams', 'Support for growth'], action: 'Join the waitlist' },
    { code: 'l', name: 'Habitae L', description: 'For condominium operations at greater scale.', price: '€169.99', interval: '/ month', annualPrice: '€1,937.90', annualInterval: '/ year', annualSaving: 'Save €101.98 per year', features: ['Everything in Habitae M', 'Greater-scale operations', 'Priority support'], action: 'Join the waitlist' },
  ],
};

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; path: string };
};

const faqItems: Record<Language, FaqItem[]> = {
  pt: [
    { question: 'O que é o Habitae?', answer: 'É uma aplicação de gestão de condomínios que reúne finanças, quotas, frações, pessoas, documentos e manutenção.' },
    { question: 'Quanto custa?', answer: `O Habitae S custa ${pricingPlans.pt[0].price} por mês ou ${pricingPlans.pt[0].annualPrice} por ano, acrescidos de IVA. Inclui 15 dias gratuitos na modalidade mensal ou 30 dias na anual.`, link: { label: 'Ver planos', path: '/#planos' } },
    { question: 'Como começo a usar?', answer: 'Crie o condomínio com os dados do edifício e da administração. Depois, adicione frações e pessoas, configure o orçamento e convide a equipa.', link: { label: 'Guia dos primeiros passos', path: '/ajuda/criar-primeiro-condominio' } },
    { question: 'Posso gerir vários condomínios?', answer: 'Sim. Os planos Habitae M e L permitem gerir vários condomínios com a sua equipa. Para um único condomínio autogerido, escolha o Habitae S.' },
    { question: 'Onde encontro ajuda?', answer: 'O centro de ajuda tem guias para configurar o condomínio, registar pagamentos, preparar reuniões e gerir a equipa.', link: { label: 'Abrir centro de ajuda', path: '/ajuda' } },
  ],
  en: [
    { question: 'What is Habitae?', answer: 'A condominium management application that brings together finances, fees, units, people, documents and maintenance.' },
    { question: 'How much does it cost?', answer: `Habitae S costs ${pricingPlans.en[0].price} per month or ${pricingPlans.en[0].annualPrice} per year, excluding VAT. Monthly billing includes a 15-day free trial; annual billing includes 30 days.`, link: { label: 'View plans', path: '/#planos' } },
    { question: 'How do I get started?', answer: 'Create your condominium with the building and administration details. Then add units and people, set up the budget and invite your team.', link: { label: 'Getting started guide', path: '/help/create-first-condominium' } },
    { question: 'Can I manage multiple condominiums?', answer: 'Yes. Habitae M and L let you manage multiple condominiums with your team. For a single self-managed condominium, choose Habitae S.' },
    { question: 'Where can I find help?', answer: 'The help centre has guides for setting up your condominium, recording payments, preparing meetings and managing your team.', link: { label: 'Open help centre', path: '/help' } },
  ],
};

const pageCopy = {
  pt: {
    faqTitle: 'Perguntas frequentes',
    meta: { title: 'Software de gestão de condomínios em Portugal | Habitae', description: 'O Habitae reúne finanças, quotas, documentos, pessoas e tarefas numa plataforma clara para a gestão de condomínios.', socialDescription: 'Finanças, quotas, documentos, pessoas e tarefas do condomínio, num só lugar.', locale: 'pt_PT' },
    skip: 'Saltar para o conteúdo',
    hero: { eyebrow: 'Gestão de condomínios', line1: 'O condomínio', line2: 'inteiro.', accent: 'Num só lugar.', lead: 'Gira quotas, contas, pessoas e manutenção do condomínio numa só aplicação.', primary: 'Entrar na lista de espera', secondary: 'Conhecer a plataforma' },
    pricing: { kicker: 'Planos', title: 'Comece com o seu condomínio.', intro: 'Habitae S para um condomínio autogerido. Habitae M e L para administrações profissionais.', monthly: 'Mensal', annual: 'Anual', monthlyTrial: '15 dias gratuitos nos planos mensais.', annualTrial: '30 dias gratuitos nos planos anuais.', vat: 'Aos valores apresentados acresce IVA à taxa legal em vigor.' },
    trust: { title: 'A sua equipa, com os acessos certos.', intro: 'A aplicação é alojada e mantida pelo Habitae.', permissions: 'Permissões por função', permissionsCopy: 'Defina quem pode consultar e gerir o condomínio.', activity: 'Histórico de alterações', activityCopy: 'Veja o que mudou e quem fez cada alteração.' },
  },
  en: {
    faqTitle: 'Frequently asked questions',
    meta: { title: 'Condominium management software in Portugal | Habitae', description: 'Habitae brings finances, fees, documents, people and tasks together in one clear condominium management platform.', socialDescription: 'Your condominium finances, fees, documents, people and tasks in one place.', locale: 'en_GB' },
    skip: 'Skip to content',
    hero: { eyebrow: 'Condominium management', line1: 'Your whole', line2: 'condominium.', accent: 'In one place.', lead: 'Manage condominium fees, accounts, people and maintenance in one application.', primary: 'Join the waitlist', secondary: 'Explore the platform' },
    pricing: { kicker: 'Plans', title: 'Start with your condominium.', intro: 'Habitae S for a self-managed condominium. Habitae M and L for professional administrators.', monthly: 'Monthly', annual: 'Yearly', monthlyTrial: '15 free days on monthly plans.', annualTrial: '30 free days on yearly plans.', vat: 'Prices shown exclude VAT at the applicable legal rate.' },
    trust: { title: 'Your team, with the right access.', intro: 'Habitae hosts and maintains the application.', permissions: 'Permissions by role', permissionsCopy: 'Decide who can view and manage the condominium.', activity: 'Change history', activityCopy: 'See what changed and who made each change.' },
  },
} as const;

export default function MarketingPage() {
  const [pricingInterval, setPricingInterval] = useState<'month' | 'year'>('month');
  const { language } = useI18n();
  const c = pageCopy[language];

  useEffect(() => {
    document.body.classList.add('marketing-site');
    document.documentElement.setAttribute('data-marketing-page', 'true');
    return () => {
      document.body.classList.remove('marketing-site');
      document.documentElement.removeAttribute('data-marketing-page');
    };
  }, []);



  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
    document.title = c.meta.title;

    const updateMeta = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    };
    updateMeta('meta[name="description"]', c.meta.description);
    updateMeta('meta[property="og:title"]', c.meta.title);
    updateMeta('meta[property="og:description"]', c.meta.socialDescription);
    updateMeta('meta[property="og:locale"]', c.meta.locale);
  }, [c.meta.description, c.meta.locale, c.meta.socialDescription, c.meta.title, language]);


  return (
    <div className="marketing-page">
      <a className="mk-skip-link" href="#conteudo">{c.skip}</a>

      <SiteHeader home />

      <main id="conteudo">
        <section className="mk-hero" aria-labelledby="hero-title">
          <div className="mk-container mk-hero-grid">
            <div className="mk-hero-copy">
              <h1 id="hero-title">
                <span>{c.hero.line1}</span>
                <span>{c.hero.line2}</span>
                <em>{c.hero.accent}</em>
              </h1>
              <p className="mk-hero-lead">
                {c.hero.lead}
              </p>
              <div className="mk-hero-actions">
                <a className="mk-button mk-button--primary mk-button--large" href={sitePath('/app', language)}>
                  {c.hero.primary} <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="mk-button mk-button--text" href="#funcionalidades">
                  {c.hero.secondary} <ChevronRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>

            <TimelinePreview language={language} />
          </div>
        </section>

        <ProductExamples language={language} />

        <section id="planos" className="mk-section mk-pricing" aria-labelledby="pricing-title">
          <div className="mk-container">
            <div className="mk-section-heading mk-section-heading--centered">
              <h2 id="pricing-title">{c.pricing.title}</h2>
              <p>{c.pricing.intro}</p>
              <div className="mk-pricing-interval" role="group" aria-label={c.pricing.kicker}>
                <button
                  type="button"
                  className={pricingInterval === 'month' ? 'is-selected' : ''}
                  aria-pressed={pricingInterval === 'month'}
                  onClick={() => setPricingInterval('month')}
                >
                  {c.pricing.monthly}
                </button>
                <button
                  type="button"
                  className={pricingInterval === 'year' ? 'is-selected' : ''}
                  aria-pressed={pricingInterval === 'year'}
                  onClick={() => setPricingInterval('year')}
                >
                  {c.pricing.annual}
                </button>
              </div>
            </div>

            <div className="mk-pricing-grid">
              {pricingPlans[language].map((plan) => {
                const price = pricingInterval === 'year' ? plan.annualPrice : plan.price;
                const interval = pricingInterval === 'year' ? plan.annualInterval : plan.interval;
                return (
                  <article
                    key={plan.code}
                    className={`mk-pricing-card${plan.featured ? ' mk-pricing-card--featured' : ''}`}
                  >
                    <h3>{plan.name}</h3>
                    <p className="mk-pricing-description">{plan.description}</p>
                    <div className="mk-pricing-price">
                      <strong>{price}</strong>
                      <span>{interval}</span>
                    </div>
                    {pricingInterval === 'year' && plan.annualSaving && (
                      <span className="mk-pricing-saving">{plan.annualSaving}</span>
                    )}
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>
                      ))}
                    </ul>
                    <a className="mk-button mk-button--primary mk-pricing-action" href={sitePath('/app', language)}>
                      {plan.action} <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>

            <div className="mk-pricing-footnotes">
              <span>{pricingInterval === 'year' ? c.pricing.annualTrial : c.pricing.monthlyTrial}</span>
              <span>{c.pricing.vat}</span>
            </div>
          </div>
        </section>

        <section id="confianca" className="mk-trust-note" aria-labelledby="trust-title">
          <div className="mk-container">
            <div className="mk-trust-panel">
              <div className="mk-trust-intro">
                <h2 id="trust-title">{c.trust.title}</h2>
                <p>{c.trust.intro}</p>
              </div>
              <ul className="mk-trust-details">
                <li>
                  <span className="mk-trust-icon"><UsersRound size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                  <div><h3>{c.trust.permissions}</h3><p>{c.trust.permissionsCopy}</p></div>
                </li>
                <li>
                  <span className="mk-trust-icon"><History size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                  <div><h3>{c.trust.activity}</h3><p>{c.trust.activityCopy}</p></div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="perguntas-frequentes" className="mk-faq" aria-labelledby="faq-title">
          <div className="mk-container">
            <div className="mk-faq-inner">
              <h2 id="faq-title">{c.faqTitle}</h2>
              <div className="mk-faq-list">
                {faqItems[language].map(({ question, answer, link }, index) => (
                  <details key={index} name="homepage-faq" className="mk-faq-item">
                    <summary>{question}<ChevronDown size={18} strokeWidth={1.7} aria-hidden="true" /></summary>
                    <div className="mk-faq-answer">
                      <p>{answer}</p>
                      {link && <a href={sitePath(link.path, language)}>{link.label}<ArrowRight size={15} aria-hidden="true" /></a>}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
