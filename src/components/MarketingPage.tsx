import { useEffect, useState, type ComponentType } from 'react';
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ChevronRight,
  CreditCard,
  Database,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MessageSquareText,
  ReceiptText,
  ScrollText,
  Server,
  Settings,
  ShieldCheck,
  UsersRound,
  WalletCards,
  Wrench,
  Home,
  X,
} from 'lucide-react';
import './MarketingPage.css';
import { useI18n, type Language } from '../context/I18nContext';
import { siteAsset, sitePath } from '../site';

type Icon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

type ProductFeature = {
  icon: Icon;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  tags: string[];
};

type PricingPlan = {
  code: 'xs' | 's' | 'm' | 'l' | 'xl';
  status: string;
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
  available?: boolean;
};

const productFeatures: Record<Language, ProductFeature[]> = {
  pt: [
    { icon: WalletCards, eyebrow: 'Financeiro', title: 'Contas certas, sem folhas soltas.', description: 'Orçamentos, movimentos, contas bancárias, fundo de reserva e quotas ligados numa visão coerente.', className: 'mk-feature-card--wide', tags: ['Orçamentos', 'Quotas', 'Movimentos', 'Fundo de reserva'] },
    { icon: UsersRound, eyebrow: 'Edifício', title: 'Cada fração e cada pessoa no lugar certo.', description: 'Organize proprietários, arrendatários, permilagens e contactos sem perder o histórico.', tags: ['Frações', 'Pessoas', 'Permilagens'] },
    { icon: CalendarCheck2, eyebrow: 'Assembleias', title: 'Reuniões preparadas do convite à ata.', description: 'Centralize convocatórias, procurações, listas de assinaturas e documentação.', tags: ['Reuniões', 'Procurações', 'Atas'] },
    { icon: Wrench, eyebrow: 'Operação', title: 'Manutenção que não fica esquecida.', description: 'Acompanhe tarefas, prioridades, fornecedores, prazos e custos de cada intervenção.', tags: ['Tarefas', 'Fornecedores', 'Custos'] },
    { icon: MessageSquareText, eyebrow: 'Comunicação', title: 'Informação pronta a chegar a quem precisa.', description: 'Crie comunicações e documentos a partir de dados que já estão organizados.', className: 'mk-feature-card--wide', tags: ['Comunicações', 'Recibos', 'Documentos'] },
  ],
  en: [
    { icon: WalletCards, eyebrow: 'Finance', title: 'Accurate accounts without scattered spreadsheets.', description: 'Budgets, transactions, bank accounts, reserve funds and fees connected in one coherent view.', className: 'mk-feature-card--wide', tags: ['Budgets', 'Fees', 'Transactions', 'Reserve fund'] },
    { icon: UsersRound, eyebrow: 'Building', title: 'Every unit and every person in the right place.', description: 'Organise owners, tenants, ownership shares and contacts without losing their history.', tags: ['Units', 'People', 'Ownership shares'] },
    { icon: CalendarCheck2, eyebrow: 'Meetings', title: 'Meetings prepared from invitation to minutes.', description: 'Centralise notices, proxies, signature sheets and supporting documents.', tags: ['Meetings', 'Proxies', 'Minutes'] },
    { icon: Wrench, eyebrow: 'Operations', title: 'Maintenance that never gets forgotten.', description: 'Track tasks, priorities, suppliers, deadlines and costs for every intervention.', tags: ['Tasks', 'Suppliers', 'Costs'] },
    { icon: MessageSquareText, eyebrow: 'Communication', title: 'Information ready for the people who need it.', description: 'Create communications and documents from data that is already organised.', className: 'mk-feature-card--wide', tags: ['Communications', 'Receipts', 'Documents'] },
  ],
};

const pricingPlans: Record<Language, PricingPlan[]> = {
  pt: [
    { code: 's', status: 'Disponível agora', name: 'Habitae S', description: 'A experiência Habitae completa para um condomínio autogerido.', price: '19,99 €', interval: '/ mês', annualPrice: '227,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 11,98 € por ano', features: ['Gestão completa de um condomínio', 'Emails enviados pelo Habitae', 'Convites e equipa de gestão'], action: 'Começar grátis', featured: true, available: true },
    { code: 'm', status: 'Para administrações', name: 'Habitae M', description: 'Para administrações profissionais em crescimento.', price: '69,99 €', interval: '/ mês', annualPrice: '797,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 41,98 € por ano', features: ['Gestão de múltiplos condomínios', 'Ferramentas para equipas', 'Apoio ao crescimento'], action: 'Em breve' },
    { code: 'l', status: 'Para carteiras maiores', name: 'Habitae L', description: 'Para operações de condomínio de maior escala.', price: '169,99 €', interval: '/ mês', annualPrice: '1 937,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 101,98 € por ano', features: ['Tudo no Habitae M', 'Operação de maior escala', 'Acompanhamento prioritário'], action: 'Em breve' },
  ],
  en: [
    { code: 's', status: 'Available now', name: 'Habitae S', description: 'The complete Habitae experience for a self-managed condominium.', price: '€19.99', interval: '/ month', annualPrice: '€227.90', annualInterval: '/ year', annualSaving: 'Save €11.98 per year', features: ['Complete management for one condominium', 'Emails sent through Habitae', 'Team invitations and management'], action: 'Start free', featured: true, available: true },
    { code: 'm', status: 'For administrators', name: 'Habitae M', description: 'For growing professional administrators.', price: '€69.99', interval: '/ month', annualPrice: '€797.90', annualInterval: '/ year', annualSaving: 'Save €41.98 per year', features: ['Multiple condominium management', 'Tools for teams', 'Support for growth'], action: 'Coming soon' },
    { code: 'l', status: 'For larger portfolios', name: 'Habitae L', description: 'For condominium operations at greater scale.', price: '€169.99', interval: '/ month', annualPrice: '€1,937.90', annualInterval: '/ year', annualSaving: 'Save €101.98 per year', features: ['Everything in Habitae M', 'Greater-scale operations', 'Priority support'], action: 'Coming soon' },
  ],
};

const trustItems: Record<Language, Array<{ icon: Icon; title: string; description: string }>> = {
  pt: [
    { icon: Database, title: 'Dados sob controlo', description: 'Os seus dados ficam no Habitae, com acesso controlado e continuidade operacional.' },
    { icon: LockKeyhole, title: 'Acessos por responsabilidade', description: 'Perfis distintos para proprietários da aplicação, administradores, gestores e consulta.' },
    { icon: ScrollText, title: 'Atividade rastreável', description: 'Registos de auditoria ajudam a perceber o que mudou e quem realizou cada ação.' },
    { icon: Server, title: 'Acesso gerido, sem infraestrutura', description: 'Use o Habitae como serviço: a aplicação é alojada e mantida pela nossa equipa.' },
  ],
  en: [
    { icon: Database, title: 'Your data, under control', description: 'Your data stays in Habitae, with controlled access and service continuity.' },
    { icon: LockKeyhole, title: 'Access based on responsibility', description: 'Separate roles for application owners, administrators, managers and read-only access.' },
    { icon: ScrollText, title: 'Traceable activity', description: 'Audit logs help you understand what changed and who made each change.' },
    { icon: Server, title: 'Managed access, no infrastructure to run', description: 'Use Habitae as a service: our team hosts and maintains the application for you.' },
  ],
};

const pageCopy = {
  pt: {
    meta: { title: 'Habitae: Gestão de condomínios, sem ruído', description: 'O Habitae reúne finanças, quotas, documentos, pessoas e tarefas numa plataforma clara para a gestão de condomínios.', socialDescription: 'Finanças, quotas, documentos, pessoas e tarefas do condomínio, num só lugar.', locale: 'pt_PT' },
    brandAlt: 'Habitae, Gestão de Condomínios', skip: 'Saltar para o conteúdo', homeLabel: 'Habitae, página inicial', menuOpen: 'Abrir menu', menuClose: 'Fechar menu', navigationLabel: 'Navegação principal',
    nav: { platform: 'Plataforma', features: 'Funcionalidades', pricing: 'Planos', process: 'Como funciona', trust: 'Confiança', help: 'Ajuda', login: 'Entrar', open: 'Abrir Habitae' },
    hero: { eyebrow: 'Gestão de condomínios, sem ruído', line1: 'O condomínio', line2: 'inteiro.', accent: 'Num só lugar.', lead: 'O Habitae reúne finanças, quotas, documentos, pessoas e tarefas numa área de trabalho clara, para gerir melhor e explicar tudo com confiança.', primary: 'Começar com 15 dias gratuitos', secondary: 'Conhecer a plataforma', pointsLabel: 'Vantagens principais', points: ['Pensado para Portugal', 'Vários condomínios', 'Dados no seu controlo'] },
    context: { label: 'Uma única fonte de verdade para', items: ['Finanças', 'Condóminos', 'Operação', 'Documentos'] },
    outcomes: { kicker: 'A plataforma', title1: 'Menos dispersão.', title2: 'Mais controlo.', intro: 'Troque ficheiros isolados, notas soltas e processos difíceis de seguir por uma visão partilhada e sempre pronta a consultar.', items: [{ title: 'Veja primeiro o que importa', description: 'Saldos, quotas, orçamento e alertas resumidos para decidir onde agir.' }, { title: 'Gira tudo no mesmo contexto', description: 'Cada condomínio mantém os seus dados, pessoas e operação bem organizados.' }, { title: 'Partilhe com confiança', description: 'Informação coerente, documentos consistentes e acessos adequados a cada função.' }] },
    features: { kicker: 'Tudo ligado', title: 'Da conta bancária à porta do prédio.', intro: 'As ferramentas essenciais da administração de condomínios, organizadas para funcionarem em conjunto.', includes: 'Inclui' },
    pricing: { kicker: 'Planos', title: 'Comece com o seu condomínio.', intro: 'O Habitae S está pronto para um condomínio autogerido. Os planos profissionais são preparados de acordo com a dimensão e forma de trabalho da sua carteira.', monthly: 'Mensal', annual: 'Anual', monthlyTrial: '15 dias gratuitos nos planos mensais.', annualTrial: '30 dias gratuitos nos planos anuais.', vat: 'Aos valores apresentados acresce IVA à taxa legal em vigor.' },
    process: { kicker: 'Simples desde o início', title: 'Comece pelo edifício. O resto ganha forma.', intro: 'O Habitae acompanha a ordem natural da gestão: configurar, registar e acompanhar.', button: 'Entrar na aplicação', items: [{ title: 'Crie o condomínio', description: 'Registe a identidade do edifício e os dados essenciais da administração.' }, { title: 'Organize a realidade', description: 'Adicione frações, pessoas, orçamento, contas e fornecedores.' }, { title: 'Acompanhe o dia a dia', description: 'Registe movimentos, controle quotas e mantenha tarefas e documentos atualizados.' }] },
    trust: { kicker: 'Confiança por desenho', title1: 'Os seus dados.', title2: 'As suas regras.', intro: 'O Habitae foi pensado para dar à administração controlo sobre a informação, os acessos e a forma como a equipa trabalha.' },
    cta: { kicker: 'Habitae', title: 'Uma gestão mais clara começa aqui.', intro: 'Entre na aplicação e reúna o seu condomínio num espaço simples, organizado e seu.', button: 'Abrir Habitae' },
    footer: { tagline: 'Gestão de condomínios clara, organizada e no seu controlo.', product: 'Produto', access: 'Acesso', platform: 'Plataforma', features: 'Funcionalidades', pricing: 'Planos', trust: 'Confiança', help: 'Ajuda', login: 'Entrar', open: 'Abrir aplicação', copyright: 'Habitae, Gestão de Condomínios', closing: 'Feito para uma administração mais tranquila.', languageLabel: 'Escolher idioma' },
  },
  en: {
    meta: { title: 'Habitae: Clear condominium management', description: 'Habitae brings finances, fees, documents, people and tasks together in one clear condominium management platform.', socialDescription: 'Your condominium finances, fees, documents, people and tasks in one place.', locale: 'en_GB' },
    brandAlt: 'Habitae, Condominium Management', skip: 'Skip to content', homeLabel: 'Habitae, home page', menuOpen: 'Open menu', menuClose: 'Close menu', navigationLabel: 'Main navigation',
    nav: { platform: 'Platform', features: 'Features', pricing: 'Plans', process: 'How it works', trust: 'Trust', help: 'Help', login: 'Log in', open: 'Open Habitae' },
    hero: { eyebrow: 'Condominium management without the noise', line1: 'Your whole', line2: 'condominium.', accent: 'In one place.', lead: 'Habitae brings finances, fees, documents, people and tasks together in a clear workspace, so you can manage better and explain everything with confidence.', primary: 'Start with 15 free days', secondary: 'Explore the platform', pointsLabel: 'Key benefits', points: ['Built for Portugal', 'Multiple condominiums', 'Your data, your control'] },
    context: { label: 'One reliable source for', items: ['Finances', 'Residents', 'Operations', 'Documents'] },
    outcomes: { kicker: 'The platform', title1: 'Less clutter.', title2: 'More control.', intro: 'Replace isolated files, scattered notes and hard-to-follow processes with a shared view that is always ready to consult.', items: [{ title: 'See what matters first', description: 'Balances, fees, budgets and alerts summarised so you know where to act.' }, { title: 'Manage everything in context', description: 'Each condominium keeps its data, people and operations neatly organised.' }, { title: 'Share with confidence', description: 'Consistent information and documents, with the right access for every role.' }] },
    features: { kicker: 'Everything connected', title: 'From the bank account to the front door.', intro: 'The essential condominium management tools, organised to work together.', includes: 'Includes' },
    pricing: { kicker: 'Plans', title: 'Start with your condominium.', intro: 'Habitae S is ready for a self-managed condominium. Professional plans are prepared around the size and working style of your portfolio.', monthly: 'Monthly', annual: 'Yearly', monthlyTrial: '15 free days on monthly plans.', annualTrial: '30 free days on yearly plans.', vat: 'Prices shown exclude VAT at the applicable legal rate.' },
    process: { kicker: 'Simple from the start', title: 'Start with the building. Everything else falls into place.', intro: 'Habitae follows the natural flow of management: set up, record and follow through.', button: 'Open the application', items: [{ title: 'Create the condominium', description: 'Add the building identity and the administration details that matter.' }, { title: 'Organise the essentials', description: 'Add units, people, budgets, accounts and suppliers.' }, { title: 'Stay on top of daily work', description: 'Record transactions, track fees and keep tasks and documents up to date.' }] },
    trust: { kicker: 'Trust by design', title1: 'Your data.', title2: 'Your rules.', intro: 'Habitae gives the administration control over its information, access permissions and the way its team works.' },
    cta: { kicker: 'Habitae', title: 'Clearer management starts here.', intro: 'Open the application and bring your condominium together in a simple, organised space that is yours.', button: 'Open Habitae' },
    footer: { tagline: 'Clear, organised condominium management under your control.', product: 'Product', access: 'Access', platform: 'Platform', features: 'Features', pricing: 'Plans', trust: 'Trust', help: 'Help', login: 'Log in', open: 'Open application', copyright: 'Habitae, Condominium Management', closing: 'Made for calmer administration.', languageLabel: 'Choose language' },
  },
} as const;

function Brand({ inverse = false, alt }: { inverse?: boolean; alt: string }) {
  return (
    <img
      className="mk-brand-logo"
      src={siteAsset(inverse ? 'default-condominium-logo-dark.png' : 'default-condominium-logo-light.png')}
      alt={alt}
    />
  );
}

function ProductPreview({ language }: { language: Language }) {
  const c = language === 'pt' ? {
    aria: 'Pré-visualização ilustrativa da cronologia do Habitae',
    condominium: 'Condomínio Aurora',
    currentArea: 'Área atual',
    timeline: 'Linha cronológica',
    finance: 'Financeiro',
    collections: 'Cobranças',
    condominiumArea: 'Condomínio',
    management: 'Gestão',
    documents: 'Documentação',
    activity: 'Atividade do condomínio',
    activityCopy: 'Movimentos, quotas e compromissos recentes num único feed.',
    scope: 'Todo o período',
    balance: 'Saldo atual',
    balanceAmount: '24 850,40 €',
    balanceCopy: 'Receitas menos despesas registadas',
    income: 'Entradas',
    incomeAmount: '6 842,00 €',
    incomeCopy: 'em receitas e quotas',
    expenses: 'Saídas',
    expenseAmount: '1 240,00 €',
    expenseCopy: 'em despesas registadas',
    bank: 'Banco disponível',
    bankAmount: '22 180,40 €',
    bankCopy: 'saldo bancário disponível',
    recent: 'Recentes',
    today: 'Hoje',
    payment: 'Quota paga',
    paymentLabel: 'Fração 3.º D',
    paymentAmount: '+ 86,50 €',
    expense: 'Despesa registada',
    expenseLabel: 'Revisão do elevador',
    eventAmount: '− 124,00 €',
    next: 'A seguir',
    meetingDate: '22 Jul',
    meetingTitle: 'Assembleia geral',
    fees: 'Quotas a acompanhar',
    outstanding: 'Por regularizar',
    outstandingAmount: '1 240,00 €',
  } : {
    aria: 'Illustrative preview of the Habitae timeline',
    condominium: 'Aurora Condominium',
    currentArea: 'Current area',
    timeline: 'Timeline',
    finance: 'Finance',
    collections: 'Collections',
    condominiumArea: 'Condominium',
    management: 'Management',
    documents: 'Documentation',
    activity: 'Condominium activity',
    activityCopy: 'Transactions, fees and recent commitments in one feed.',
    scope: 'All time',
    balance: 'Current balance',
    balanceAmount: '€24,850.40',
    balanceCopy: 'Income less recorded expenses',
    income: 'Income',
    incomeAmount: '€6,842.00',
    incomeCopy: 'from income and fees',
    expenses: 'Expenses',
    expenseAmount: '€1,240.00',
    expenseCopy: 'in recorded expenses',
    bank: 'Available bank',
    bankAmount: '€22,180.40',
    bankCopy: 'available bank balance',
    recent: 'Recent',
    today: 'Today',
    payment: 'Fee paid',
    paymentLabel: 'Unit 3D',
    paymentAmount: '+ €86.50',
    expense: 'Expense recorded',
    expenseLabel: 'Lift inspection',
    eventAmount: '− €124.00',
    next: 'Up next',
    meetingDate: '22 Jul',
    meetingTitle: 'General meeting',
    fees: 'Fees to follow up',
    outstanding: 'Outstanding',
    outstandingAmount: '€1,240.00',
  };

  return (
    <div
      className="mk-product-preview"
      role="img"
      aria-label={c.aria}
    >
      <div className="mk-preview-window" aria-hidden="true">
        <div className="mk-preview-command-bar">
          <div className="mk-preview-command-context">
            <span className="mk-preview-menu"><Menu size={14} /></span>
            <div className="mk-preview-condominium">
              <span className="mk-preview-mark"><Home size={14} /></span>
              <span>
                <small>{c.condominiumArea}</small>
                <strong>{c.condominium}</strong>
              </span>
              <ChevronRight size={13} />
            </div>
          </div>
          <div className="mk-preview-command-page">
            <span>{c.currentArea}</span>
            <strong>{c.timeline}</strong>
          </div>
          <div className="mk-preview-command-actions">
            <span className="mk-preview-command-action"><CreditCard size={14} /></span>
            <span className="mk-preview-command-action"><Settings size={14} /></span>
            <span className="mk-preview-avatar">MS</span>
          </div>
        </div>

        <div className="mk-preview-app-shell">
          <div className="mk-preview-content">
            <div className="mk-preview-intro">
              <div>
                <h2>{c.activity}</h2>
                <p>{c.activityCopy}</p>
              </div>
              <span className="mk-preview-scope">{c.scope}</span>
            </div>

            <section className="mk-preview-snapshot">
              <article className="mk-preview-balance-card">
                <div><span>{c.balance}</span><WalletCards size={14} /></div>
                <strong>{c.balanceAmount}</strong>
                <small>{c.balanceCopy}</small>
              </article>
              <article className="mk-preview-stat-card">
                <span>{c.income}</span>
                <strong className="positive">{c.incomeAmount}</strong>
                <small>{c.incomeCopy}</small>
              </article>
              <article className="mk-preview-stat-card">
                <span>{c.expenses}</span>
                <strong className="negative">{c.expenseAmount}</strong>
                <small>{c.expenseCopy}</small>
              </article>
              <article className="mk-preview-stat-card">
                <span>{c.bank}</span>
                <strong className="positive">{c.bankAmount}</strong>
                <small>{c.bankCopy}</small>
              </article>
            </section>

            <div className="mk-preview-timeline-layout">
              <section className="mk-preview-feed">
                <h3>{c.recent}</h3>
                <div className="mk-preview-day-marker"><span>{c.today}</span></div>
                <article className="mk-preview-event positive">
                  <span className="mk-preview-event-icon"><Check size={14} /></span>
                  <div><span>{c.payment}</span><strong>{c.paymentLabel}</strong></div>
                  <time>10:32</time>
                  <strong className="mk-preview-event-amount">{c.paymentAmount}</strong>
                </article>
                <article className="mk-preview-event negative">
                  <span className="mk-preview-event-icon"><Wrench size={14} /></span>
                  <div><span>{c.expense}</span><strong>{c.expenseLabel}</strong></div>
                  <time>09:14</time>
                  <strong className="mk-preview-event-amount">{c.eventAmount}</strong>
                </article>
              </section>

              <aside className="mk-preview-rail">
                <section className="mk-preview-panel">
                  <div className="mk-preview-panel-heading"><span>{c.next}</span><CalendarCheck2 size={14} /></div>
                  <strong className="mk-preview-next-date">{c.meetingDate}</strong>
                  <span>{c.meetingTitle}</span>
                </section>
                <section className="mk-preview-panel">
                  <div className="mk-preview-panel-heading"><span>{c.fees}</span><ReceiptText size={14} /></div>
                  <small>{c.outstanding}</small>
                  <strong className="negative">{c.outstandingAmount}</strong>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pricingInterval, setPricingInterval] = useState<'month' | 'year'>('month');
  const { language, setLanguage } = useI18n();
  const currentYear = new Date().getFullYear();
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
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeMenu);
    return () => document.removeEventListener('keydown', closeMenu);
  }, [menuOpen]);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="marketing-page">
      <a className="mk-skip-link" href="#conteudo">{c.skip}</a>

      <header className="mk-header">
        <div className="mk-container mk-header-inner">
          <a className="mk-brand" href={sitePath('/')} aria-label={c.homeLabel}>
            <Brand alt={c.brandAlt} />
          </a>

          <div className="mk-mobile-header-actions">
            <div className="mk-mobile-language" role="group" aria-label={c.footer.languageLabel}>
              <button type="button" className={language === 'pt' ? 'is-active' : ''} aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
              <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            </div>
            <button
              type="button"
              className="mk-menu-toggle"
              aria-label={menuOpen ? c.menuClose : c.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="marketing-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>

          <nav
            id="marketing-navigation"
            className={`mk-navigation${menuOpen ? ' is-open' : ''}`}
            aria-label={c.navigationLabel}
          >
            <div className="mk-nav-links">
              <a href="#plataforma" onClick={closeMenu}>{c.nav.platform}</a>
              <a href="#funcionalidades" onClick={closeMenu}>{c.nav.features}</a>
              <a href="#planos" onClick={closeMenu}>{c.nav.pricing}</a>
              <a href="#como-funciona" onClick={closeMenu}>{c.nav.process}</a>
              <a href="#confianca" onClick={closeMenu}>{c.nav.trust}</a>
              <a href={sitePath(language === 'pt' ? '/ajuda' : '/help')} onClick={closeMenu}>{c.nav.help}</a>
            </div>
            <div className="mk-nav-actions">
              <a className="mk-button mk-button--ghost" href={sitePath('/app')}>{c.nav.login}</a>
              <a className="mk-button mk-button--primary mk-button--compact" href={sitePath('/app')}>
                {c.nav.open} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="mk-hero" aria-labelledby="hero-title">
          <div className="mk-hero-orb mk-hero-orb--one" aria-hidden="true" />
          <div className="mk-hero-orb mk-hero-orb--two" aria-hidden="true" />
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
                <a className="mk-button mk-button--primary mk-button--large" href={sitePath('/app')}>
                  {c.hero.primary} <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="mk-button mk-button--text" href="#plataforma">
                  {c.hero.secondary} <ChevronRight size={17} aria-hidden="true" />
                </a>
              </div>
              <ul className="mk-hero-points" aria-label={c.hero.pointsLabel}>
                {c.hero.points.map((point) => <li key={point}><Check size={15} aria-hidden="true" /> {point}</li>)}
              </ul>
            </div>

            <ProductPreview language={language} />
          </div>
        </section>

        <section className="mk-context-strip" aria-label={c.context.label}>
          <div className="mk-container mk-context-strip-inner">
            <span className="mk-context-label">{c.context.label}</span>
            <div className="mk-context-items">
              <span><WalletCards size={17} aria-hidden="true" /> {c.context.items[0]}</span>
              <span><UsersRound size={17} aria-hidden="true" /> {c.context.items[1]}</span>
              <span><Wrench size={17} aria-hidden="true" /> {c.context.items[2]}</span>
              <span><FileText size={17} aria-hidden="true" /> {c.context.items[3]}</span>
            </div>
          </div>
        </section>

        <section id="plataforma" className="mk-section mk-outcomes" aria-labelledby="outcomes-title">
          <div className="mk-container">
            <div className="mk-section-heading mk-section-heading--split">
              <div>
                <h2 id="outcomes-title">{c.outcomes.title1}<br />{c.outcomes.title2}</h2>
              </div>
              <p>{c.outcomes.intro}</p>
            </div>

            <div className="mk-outcome-grid">
              <article className="mk-outcome-card">
                <span className="mk-outcome-number">01</span>
                <span className="mk-outcome-icon"><LayoutDashboard size={21} aria-hidden="true" /></span>
                <h3>{c.outcomes.items[0].title}</h3>
                <p>{c.outcomes.items[0].description}</p>
                <span className="mk-outcome-line" />
              </article>
              <article className="mk-outcome-card">
                <span className="mk-outcome-number">02</span>
                <span className="mk-outcome-icon"><Home size={21} aria-hidden="true" /></span>
                <h3>{c.outcomes.items[1].title}</h3>
                <p>{c.outcomes.items[1].description}</p>
                <span className="mk-outcome-line" />
              </article>
              <article className="mk-outcome-card">
                <span className="mk-outcome-number">03</span>
                <span className="mk-outcome-icon"><ShieldCheck size={21} aria-hidden="true" /></span>
                <h3>{c.outcomes.items[2].title}</h3>
                <p>{c.outcomes.items[2].description}</p>
                <span className="mk-outcome-line" />
              </article>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="mk-section mk-features" aria-labelledby="features-title">
          <div className="mk-container">
            <div className="mk-section-heading mk-section-heading--centered">
              <h2 id="features-title">{c.features.title}</h2>
              <p>{c.features.intro}</p>
            </div>

            <div className="mk-feature-grid">
              {productFeatures[language].map(({ icon: FeatureIcon, eyebrow, title, description, className = '', tags }) => (
                <article key={title} className={`mk-feature-card ${className}`}>
                  <div className="mk-feature-card-top">
                    <span className="mk-feature-icon"><FeatureIcon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className="mk-feature-eyebrow">{eyebrow}</span>
                  </div>
                  <div className="mk-feature-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className="mk-feature-tags" aria-label={`${c.features.includes}: ${tags.join(', ')}`}>
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
                    <span className="mk-pricing-status">{plan.status}</span>
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
                    {plan.available ? (
                      <a className="mk-button mk-button--primary mk-pricing-action" href={sitePath('/app')}>
                        {plan.action} <ArrowRight size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="mk-pricing-note">{plan.action}</span>
                    )}
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

        <section id="como-funciona" className="mk-section mk-process" aria-labelledby="process-title">
          <div className="mk-container mk-process-layout">
            <div className="mk-process-intro">
              <h2 id="process-title">{c.process.title}</h2>
              <p>{c.process.intro}</p>
              <a className="mk-button mk-button--light" href={sitePath('/app')}>
                {c.process.button} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <ol className="mk-process-list">
              <li>
                <span className="mk-process-step">01</span>
                <div><h3>{c.process.items[0].title}</h3><p>{c.process.items[0].description}</p></div>
              </li>
              <li>
                <span className="mk-process-step">02</span>
                <div><h3>{c.process.items[1].title}</h3><p>{c.process.items[1].description}</p></div>
              </li>
              <li>
                <span className="mk-process-step">03</span>
                <div><h3>{c.process.items[2].title}</h3><p>{c.process.items[2].description}</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section id="confianca" className="mk-section mk-trust" aria-labelledby="trust-title">
          <div className="mk-container">
            <div className="mk-trust-heading">
              <div className="mk-trust-seal" aria-hidden="true"><ShieldCheck size={31} strokeWidth={1.6} /></div>
              <div>
                <h2 id="trust-title">{c.trust.title1}<br />{c.trust.title2}</h2>
              </div>
              <p>{c.trust.intro}</p>
            </div>

            <div className="mk-trust-grid">
              {trustItems[language].map(({ icon: TrustIcon, title, description }) => (
                <article key={title} className="mk-trust-item">
                  <TrustIcon size={21} strokeWidth={1.7} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-final-cta" aria-labelledby="cta-title">
          <div className="mk-final-pattern" aria-hidden="true" />
          <div className="mk-container mk-final-cta-inner">
            <div>
              <h2 id="cta-title">{c.cta.title}</h2>
              <p>{c.cta.intro}</p>
            </div>
            <a className="mk-button mk-button--primary mk-button--large" href={sitePath('/app')}>
              {c.cta.button} <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="mk-footer">
        <div className="mk-container">
          <div className="mk-footer-main">
            <div className="mk-footer-brand">
              <Brand inverse alt={c.brandAlt} />
              <p>{c.footer.tagline}</p>
            </div>
            <div className="mk-footer-links">
              <div>
                <strong>{c.footer.product}</strong>
                <a href="#plataforma">{c.footer.platform}</a>
                <a href="#funcionalidades">{c.footer.features}</a>
                <a href="#planos">{c.footer.pricing}</a>
                <a href="#confianca">{c.footer.trust}</a>
              </div>
              <div>
                <strong>{c.footer.access}</strong>
                <a href={sitePath(language === 'pt' ? '/ajuda' : '/help')}>{c.footer.help}</a>
                <a href={sitePath('/app')}>{c.footer.login}</a>
                <a href={sitePath('/app')}>{c.footer.open}</a>
              </div>
            </div>
          </div>
          <div className="mk-footer-bottom">
            <span>© {currentYear} {c.footer.copyright}</span>
            <div className="mk-footer-utility">
              <span>{c.footer.closing}</span>
              <div className="mk-language-toggle" role="group" aria-label={c.footer.languageLabel}>
                <button type="button" className={language === 'pt' ? 'is-active' : ''} aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
                <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
