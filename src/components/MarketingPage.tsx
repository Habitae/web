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
import { useI18n } from '../context/I18nContext';
import { faqItems, pageCopy, pricingPlans } from '../content/homepage';
import { sitePath } from '../site';

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
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : language;
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
                    <a className={`mk-button ${plan.featured ? 'mk-button--primary' : 'mk-button--ghost'} mk-pricing-action`} href={sitePath('/app', language)}>
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
