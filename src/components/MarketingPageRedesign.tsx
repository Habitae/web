import { withFrench, locales } from '../../shared/i18n.mjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  Check,
  ChevronDown,
  FileText,
  History,
  Lock,
  Home,
  ReceiptText,
  Send,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { SiteHeader, SiteFooter } from './SiteChrome';
import { useI18n, type Language } from '../context/I18nContext';
import { sitePath, siteAsset, helpRoot } from '../site';
import { faqItems, pageCopy, pricingPlans } from '../content/homepage';
import { productCopy } from '../content/productExamples';
import './MarketingPage.css';
import './MarketingPageRedesign.css';

// Redesign test: same product copy as the homepage, new layout. Only the
// strings below are new (French falls back to Portuguese until translated).
const extraCopy = withFrench({
  pt: {
    featuresTitle: 'Tudo o que o condomínio precisa.',
    stepsTitle: 'Pronto em três passos.',
    steps: [
      { title: 'Crie o condomínio', copy: 'Adicione os dados do edifício e da administração.' },
      { title: 'Adicione frações e pessoas', copy: 'Registe proprietários, arrendatários e permilagens.' },
      { title: 'Configure o orçamento', copy: 'Defina as quotas e convide a sua equipa.' },
    ],
    stepLabel: 'Passo',
    stepPreview: {
      condo: 'Condomínio Aurora', address: 'Rua das Flores, 12 · Lisboa', admin: 'Administração', adminName: 'Maria Silva',
      units: [['1.º Esq.', 'Ana Martins', '85 ‰'], ['1.º Dir.', 'João Costa', '85 ‰'], ['2.º Esq.', 'Inês Silva', '90 ‰']],
      budget: 'Orçamento 2026', budgetPerUnit: 'Quota mensal 1.º Esq.', invite: 'Convite enviado', inviteTo: 'Rui Teixeira',
    },
    ctaTitle: 'Organize o seu condomínio com o Habitae.',
    ctaCopy: 'Entre na lista de espera e seja dos primeiros a experimentar.',
    popular: 'Recomendado',
    legalTitle: 'Feito para a gestão de condomínios em Portugal.',
    legalIntro: 'Os documentos e as verificações que a administração de um condomínio precisa, gerados a partir dos dados que já registou.',
    legalHosting: 'Dados alojados na União Europeia, com a informação pessoal cifrada.',
    legal: [
      { title: 'Declaração de dívida ou de não dívida', copy: 'Emitida a partir da conta corrente de cada titular, por exemplo quando uma fração é vendida.' },
      { title: 'Fundo comum de reserva', copy: 'O Habitae verifica se cada orçamento destina pelo menos 10% das restantes despesas ao fundo.' },
      { title: 'Assembleias por permilagem', copy: 'Convocatórias, procurações e atas preparadas com as frações e permilagens do edifício.' },
      { title: 'Avisos de débito e IRS', copy: 'Avisos de débito para quotas em atraso e declaração de pagamentos para efeitos de IRS.' },
    ],
  },
  en: {
    featuresTitle: 'Everything your condominium needs.',
    stepsTitle: 'Up and running in three steps.',
    steps: [
      { title: 'Create your condominium', copy: 'Add the building and administration details.' },
      { title: 'Add units and people', copy: 'Record owners, tenants and ownership shares.' },
      { title: 'Set up the budget', copy: 'Define fees and invite your team.' },
    ],
    stepLabel: 'Step',
    stepPreview: {
      condo: 'Aurora Condominium', address: 'Rua das Flores, 12 · Lisbon', admin: 'Administration', adminName: 'Maria Silva',
      units: [['1st left', 'Ana Martins', '85 ‰'], ['1st right', 'João Costa', '85 ‰'], ['2nd left', 'Inês Silva', '90 ‰']],
      budget: '2026 budget', budgetPerUnit: 'Monthly fee, 1st left', invite: 'Invitation sent', inviteTo: 'Rui Teixeira',
    },
    ctaTitle: 'Organise your condominium with Habitae.',
    ctaCopy: 'Join the waitlist and be among the first to try it.',
    popular: 'Recommended',
    legalTitle: 'Built for condominium management in Portugal.',
    legalIntro: 'The documents and checks a condominium administration needs, generated from the data you have already recorded.',
    legalHosting: 'Data hosted in the European Union, with personal information encrypted.',
    legal: [
      { title: 'Debt or no-debt declaration', copy: 'Issued from each owner’s account, for example when a unit is sold.' },
      { title: 'Common reserve fund', copy: 'Habitae checks that each budget sets aside at least 10% of the other expenses for the fund.' },
      { title: 'Meetings by ownership share', copy: 'Notices, proxies and minutes prepared with the building’s units and permillage.' },
      { title: 'Debit notices and IRS', copy: 'Debit notices for overdue fees and a payment statement for IRS purposes.' },
    ],
  },
} as const);

// The hero shows a static snapshot of the real timeline screen, captured from
// the app by scripts/capture-app-preview.mjs (1280×800, scaled to fit).
const SNAPSHOT_WIDTH = 1280;
const SNAPSHOT_HEIGHT = 800;
const SIDEBAR_WIDTH = 252;

const previewLabel = withFrench({
  pt: { label: 'Linha cronológica do Habitae com dados de exemplo' },
  en: { label: 'The Habitae timeline with example data' },
} as const);

function AppPreview({ language }: { language: Language }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scale: 0.85, offset: 0, height: SNAPSHOT_HEIGHT });

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => {
      const width = frame.clientWidth;
      // Narrow screens: skip the sidebar and keep the text legible.
      const compact = width < 700;
      const scale = compact ? Math.max(width / (SNAPSHOT_WIDTH - SIDEBAR_WIDTH), 0.42) : width / SNAPSHOT_WIDTH;
      setView({ scale, offset: compact ? SIDEBAR_WIDTH : 0, height: compact ? 560 : SNAPSHOT_HEIGHT });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="rd-app-frame" style={{ height: view.height * view.scale }} role="img" aria-label={previewLabel[language].label}>
      <iframe
        src={siteAsset(`app-preview/timeline-${language === 'en' ? 'en' : 'pt'}.html`)}
        title={previewLabel[language].label}
        width={SNAPSHOT_WIDTH}
        height={SNAPSHOT_HEIGHT}
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        style={{ transform: `translateX(${-view.offset * view.scale}px) scale(${view.scale})` }}
      />
    </div>
  );
}

export default function MarketingPageRedesign() {
  const [billing, setBilling] = useState<'month' | 'year'>('month');
  const { language } = useI18n();
  const c = pageCopy[language];
  const p = productCopy[language];
  const x = extraCopy[language];
  const currency = new Intl.NumberFormat(locales[language], { style: 'currency', currency: 'EUR' });
  const appPath = sitePath('/app', language);
  const helpPath = (slug: string) => sitePath(`${helpRoot(language)}/${slug}`, language);

  useEffect(() => {
    document.body.classList.add('marketing-site');
    document.documentElement.setAttribute('data-marketing-page', 'true');
    document.title = c.meta.title;
    return () => {
      document.body.classList.remove('marketing-site');
      document.documentElement.removeAttribute('data-marketing-page');
    };
  }, [c.meta.title]);

  return (
    <div className="marketing-page rd-page">
      <a className="mk-skip-link" href="#conteudo">{c.skip}</a>
      <SiteHeader home />

      <main id="conteudo">
        <section className="rd-hero" aria-labelledby="rd-hero-title">
          <div className="mk-container rd-hero-copy">
            <h1 id="rd-hero-title">
              {c.hero.line1} {c.hero.line2} <em>{c.hero.accent}</em>
            </h1>
            <p>{c.hero.lead}</p>
            <div className="rd-actions">
              <a className="rd-button rd-button--primary" href={appPath}>{c.hero.primary}<ArrowRight size={18} aria-hidden="true" /></a>
              <a className="rd-button rd-button--quiet" href="#funcionalidades">{c.hero.secondary}</a>
            </div>
          </div>
          <div className="rd-stage">
            <div className="mk-container">
              <div className="rd-window">
                <AppPreview language={language} />
              </div>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="rd-section" aria-labelledby="rd-features-title">
          <div className="mk-container">
            <h2 id="rd-features-title" className="rd-title">{x.featuresTitle}</h2>
            <div className="rd-bento">
              <article className="rd-card rd-card--wide">
                <div className="rd-card-copy">
                  <h3>{p.finance.title}</h3>
                  <p>{p.finance.description}</p>
                  <a href={helpPath(p.finance.slug)}>{p.finance.link}<ArrowRight size={15} aria-hidden="true" /></a>
                </div>
                <div className="rd-mini" aria-hidden="true">
                  <div className="rd-mini-title"><ReceiptText size={16} />{p.fees}</div>
                  <div className="rd-mini-stats">
                    <div><span>{p.received}</span><strong>{currency.format(173)}</strong></div>
                    <div><span>{p.outstanding}</span><strong className="is-due">{currency.format(86.5)}</strong></div>
                  </div>
                  {p.units.map((unit, index) => (
                    <div key={unit} className="rd-mini-row">
                      <span>{unit}</span><span>{currency.format(86.5)}</span>
                      <span className={`rd-chip${index === 2 ? ' rd-chip--due' : ''}`}>{index === 2 ? p.pending : p.paid}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rd-card">
                <span className="rd-icon"><Home size={20} aria-hidden="true" /></span>
                <h3>{p.people.title}</h3>
                <p>{p.people.description}</p>
                <a href={helpPath(p.people.slug)}>{p.people.link}<ArrowRight size={15} aria-hidden="true" /></a>
              </article>

              <article className="rd-card">
                <span className="rd-icon"><CalendarCheck2 size={20} aria-hidden="true" /></span>
                <h3>{p.operations.title}</h3>
                <p>{p.operations.description}</p>
                <ul className="rd-docs" aria-hidden="true">
                  <li><FileText size={14} />{p.notice}</li>
                  <li><FileText size={14} />{p.agendaDoc}</li>
                </ul>
              </article>

              <article className="rd-card">
                <span className="rd-icon"><UsersRound size={20} aria-hidden="true" /></span>
                <h3>{c.trust.permissions}</h3>
                <p>{c.trust.permissionsCopy}</p>
              </article>

              <article className="rd-card">
                <span className="rd-icon"><History size={20} aria-hidden="true" /></span>
                <h3>{c.trust.activity}</h3>
                <p>{c.trust.activityCopy}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="rd-section" aria-labelledby="rd-legal-title">
          <div className="mk-container">
            <div className="rd-legal">
              <div className="rd-legal-intro">
                <h2 id="rd-legal-title" className="rd-title">{x.legalTitle}</h2>
                <p>{x.legalIntro}</p>
                <p className="rd-legal-hosting"><Lock size={15} aria-hidden="true" />{x.legalHosting}</p>
              </div>
              <ul className="rd-legal-list">
                {x.legal.map((item) => (
                  <li key={item.title}>
                    <span className="rd-legal-icon"><ShieldCheck size={18} aria-hidden="true" /></span>
                    <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rd-section rd-steps" aria-labelledby="rd-steps-title">
          <div className="mk-container">
            <h2 id="rd-steps-title" className="rd-title">{x.stepsTitle}</h2>
            <ol className="rd-steps-list">
              {x.steps.map((step, index) => (
                <li key={step.title} className="rd-step">
                  <span className="rd-step-label" aria-hidden="true"><b>{index + 1}</b>{x.stepLabel} {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <div className="rd-step-preview" aria-hidden="true">
                    {index === 0 && <>
                      <div className="rd-step-field"><Building2 size={15} /><span><b>{x.stepPreview.condo}</b><small>{x.stepPreview.address}</small></span></div>
                      <div className="rd-step-field"><UsersRound size={15} /><span><small>{x.stepPreview.admin}</small><b>{x.stepPreview.adminName}</b></span></div>
                    </>}
                    {index === 1 && x.stepPreview.units.map(([unit, name, share]) => (
                      <div key={unit} className="rd-step-unit"><span>{unit}</span><span>{name}</span><span className="rd-chip">{share}</span></div>
                    ))}
                    {index === 2 && <>
                      <div className="rd-step-budget"><small>{x.stepPreview.budget}</small><b>{currency.format(18400)}</b><span>{x.stepPreview.budgetPerUnit} · {currency.format(130.33)}</span></div>
                      <div className="rd-step-invite"><Send size={14} /><span>{x.stepPreview.invite} · {x.stepPreview.inviteTo}</span><Check size={14} /></div>
                    </>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="planos" className="rd-section" aria-labelledby="rd-pricing-title">
          <div className="mk-container">
            <div className="rd-pricing-head">
              <div>
                <h2 id="rd-pricing-title" className="rd-title">{c.pricing.title}</h2>
                <p>{c.pricing.intro}</p>
              </div>
              <div className="rd-toggle" role="group" aria-label={c.pricing.kicker}>
                <button type="button" aria-pressed={billing === 'month'} onClick={() => setBilling('month')}>{c.pricing.monthly}</button>
                <button type="button" aria-pressed={billing === 'year'} onClick={() => setBilling('year')}>{c.pricing.annual}</button>
              </div>
            </div>
            <div className="rd-plans">
              {pricingPlans[language].map((plan) => (
                <article key={plan.code} className={`rd-plan${plan.featured ? ' rd-plan--featured' : ''}`}>
                  <div className="rd-plan-head">
                    <h3>{plan.name}</h3>
                    {plan.featured && <span className="rd-badge">{x.popular}</span>}
                  </div>
                  <p>{plan.description}</p>
                  <div className="rd-price">
                    <strong>{billing === 'year' ? plan.annualPrice : plan.price}</strong>
                    <span>{billing === 'year' ? plan.annualInterval : plan.interval}</span>
                  </div>
                  <span className="rd-saving">{billing === 'year' ? plan.annualSaving : ' '}</span>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <a className={`rd-button ${plan.featured ? 'rd-button--light' : 'rd-button--outline'}`} href={appPath}>{plan.action}<ArrowRight size={15} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <p className="rd-footnote">{billing === 'year' ? c.pricing.annualTrial : c.pricing.monthlyTrial} {c.pricing.vat}</p>
          </div>
        </section>

        <section id="perguntas-frequentes" className="rd-section" aria-labelledby="rd-faq-title">
          <div className="mk-container rd-faq">
            <h2 id="rd-faq-title" className="rd-title">{c.faqTitle}</h2>
            <div>
              {faqItems[language].map(({ question, answer, link }, index) => (
                <details key={index} name="rd-faq" className="rd-faq-item">
                  <summary>{question}<ChevronDown size={18} strokeWidth={1.7} aria-hidden="true" /></summary>
                  <div className="rd-faq-answer">
                    <p>{answer}</p>
                    {link && <a href={sitePath(link.path, language)}>{link.label}<ArrowRight size={15} aria-hidden="true" /></a>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-cta-wrap" aria-labelledby="rd-cta-title">
          <div className="mk-container">
            <div className="rd-cta">
              <h2 id="rd-cta-title">{x.ctaTitle}</h2>
              <p>{x.ctaCopy}</p>
              <a className="rd-button rd-button--light" href={appPath}>{c.hero.primary}<ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
