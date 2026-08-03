import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  Search,
  Settings2,
  WalletCards,
  X,
} from 'lucide-react';
import './HelpCenter.css';
import { useI18n, type Language } from '../context/I18nContext';

type Icon = ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>;
type CategoryId = 'getting-started' | 'finance' | 'fees' | 'operations' | 'account';

type Article = {
  slug: string;
  category: CategoryId;
  title: string;
  excerpt: string;
  updated: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    steps?: string[];
    note?: string;
  }>;
};

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
  moreInCategory: string;
  openApp: string;
  footer: string;
  categories: Record<CategoryId, string>;
  articles: Article[];
};

const categoryIcons: Record<CategoryId, Icon> = {
  'getting-started': BookOpen,
  finance: WalletCards,
  fees: CreditCard,
  operations: CalendarCheck2,
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
    title: 'Respostas claras para gerir melhor.',
    lead: 'Guias curtos para começar, organizar o condomínio e usar o Habitae no dia a dia.',
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
    back: 'Todos os artigos',
    updated: 'Atualizado',
    onThisPage: 'Neste artigo',
    moreInCategory: 'Mais neste tema',
    openApp: 'Abrir Habitae',
    footer: 'Ajuda Habitae · Gestão de condomínios, sem ruído.',
    categories: {
      'getting-started': 'Primeiros passos',
      finance: 'Financeiro',
      fees: 'Quotas',
      operations: 'Operação e documentos',
      account: 'Conta e faturação',
    },
    articles: [
      {
        slug: 'criar-primeiro-condominio',
        category: 'getting-started',
        title: 'Criar o primeiro condomínio',
        excerpt: 'Prepare a área de trabalho com os dados essenciais do edifício.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Antes de começar', paragraphs: ['Tenha consigo o nome do condomínio, a identificação fiscal quando aplicável e os contactos da administração. Pode completar os restantes dados mais tarde.'] },
          { heading: 'Criar o condomínio', steps: ['Entre no Habitae e abra a sua área de trabalho.', 'Selecione “Novo condomínio”.', 'Preencha os dados essenciais e guarde.', 'Escolha o condomínio criado para começar a trabalhar.'] },
          { heading: 'O que configurar a seguir', paragraphs: ['Adicione as frações e as pessoas antes de gerar quotas. Depois pode criar um orçamento, registar contas bancárias e convidar a equipa.'] },
        ],
      },
      {
        slug: 'convidar-equipa',
        category: 'getting-started',
        title: 'Convidar a equipa de gestão',
        excerpt: 'Dê acesso às pessoas certas sem partilhar a sua palavra-passe.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Onde gerir acessos', paragraphs: ['Abra Configurações e entre em Utilizadores. Esta área está disponível para quem tem permissão de administração.'] },
          { heading: 'Enviar um convite', steps: ['Selecione “Convidar utilizador”.', 'Indique o nome, o email e a função da pessoa.', 'Escolha os condomínios a que poderá aceder.', 'Envie o convite. A pessoa cria a própria palavra-passe através do link recebido.'] },
          { heading: 'Rever acessos', note: 'Remova ou ajuste acessos quando uma pessoa deixa de trabalhar com a administração. Isto não elimina os registos que já criou.' },
        ],
      },
      {
        slug: 'registar-movimento',
        category: 'finance',
        title: 'Registar uma receita ou despesa',
        excerpt: 'Mantenha o saldo e a cronologia atualizados com cada movimento.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Abrir Movimentos', paragraphs: ['No menu Financeiro, abra Movimentos e selecione “Novo movimento”.'] },
          { heading: 'Preencher o registo', steps: ['Escolha se é uma receita ou uma despesa.', 'Indique a data, a descrição e o valor.', 'Associe o movimento ao orçamento quando fizer sentido.', 'Guarde o registo. A cronologia e os totais são atualizados automaticamente.'] },
          { heading: 'Boa prática', paragraphs: ['Use descrições específicas, como “Revisão do elevador — julho”, para que a informação seja fácil de explicar mais tarde.'] },
        ],
      },
      {
        slug: 'criar-plano-quotas',
        category: 'fees',
        title: 'Criar um plano de quotas',
        excerpt: 'Defina os valores e gere as quotas para cada fração.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'O que é necessário', paragraphs: ['Antes de gerar um plano, tenha as frações registadas e confirme que o orçamento aplicável está criado.'] },
          { heading: 'Gerar o plano', steps: ['Abra Cobranças → Plano de Quotas.', 'Escolha o orçamento e o período.', 'Confirme as frações incluídas e os valores.', 'Gere o plano. As quotas passam a aparecer na área Quotas.'] },
          { heading: 'Depois de gerar', note: 'Revise o plano antes de comunicar valores aos condóminos. Alterações posteriores devem ser registadas de forma clara para manter o histórico compreensível.' },
        ],
      },
      {
        slug: 'registar-pagamento-quota',
        category: 'fees',
        title: 'Registar o pagamento de uma quota',
        excerpt: 'Marque uma quota como paga e mantenha os valores por regularizar corretos.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Encontrar a quota', paragraphs: ['Abra Cobranças → Quotas e use os filtros para encontrar a fração ou o período pretendido.'] },
          { heading: 'Registar o pagamento', steps: ['Abra a quota.', 'Selecione a ação para registar pagamento.', 'Indique a data e o valor efetivamente recebido.', 'Confirme. O estado e os totais da cronologia são atualizados.'] },
          { heading: 'Pagamentos parciais', paragraphs: ['Registe o valor recebido. A quota mantém o valor em falta visível até ficar integralmente regularizada.'] },
        ],
      },
      {
        slug: 'preparar-reuniao',
        category: 'operations',
        title: 'Preparar uma reunião',
        excerpt: 'Organize a convocatória, a documentação e o seguimento da assembleia.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Criar a reunião', steps: ['Abra Gestão → Reuniões.', 'Crie a reunião com título, data, hora e local.', 'Adicione a ordem de trabalhos e os documentos de apoio.', 'Guarde antes de enviar qualquer comunicação.'] },
          { heading: 'Manter o contexto', paragraphs: ['Guarde a ata, as procurações e a lista de assinaturas no mesmo contexto documental. Assim, qualquer pessoa com acesso encontra o processo completo.'] },
        ],
      },
      {
        slug: 'subscricao-e-faturacao',
        category: 'account',
        title: 'Gerir subscrição e faturação',
        excerpt: 'Consulte o período gratuito, os pagamentos e as faturas da organização.',
        updated: '16 jul 2026',
        sections: [
          { heading: 'Abrir faturação', paragraphs: ['Na barra superior do Habitae, use o ícone de cartão para abrir Subscrição e faturação. Esta área é gerida ao nível da organização.'] },
          { heading: 'Durante o período gratuito', paragraphs: ['Pode continuar a configurar e usar a aplicação. Antes de terminar, escolha um plano para manter o acesso sem interrupções.'] },
          { heading: 'Atualizar pagamento ou obter faturas', paragraphs: ['Use “Gerir no portal de faturação”. O portal seguro permite atualizar o método de pagamento, consultar faturas e gerir a subscrição disponível.'] },
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Habitae Help Centre',
    brandAlt: 'Habitae, Condominium Management',
    home: 'Go to the home page',
    homeLink: 'Home',
    login: 'Log in',
    languageLabel: 'Choose language',
    kicker: 'Help centre',
    title: 'Clear answers for better management.',
    lead: 'Short guides to get started, organise your condominium and use Habitae every day.',
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
    back: 'All articles',
    updated: 'Updated',
    onThisPage: 'In this article',
    moreInCategory: 'More in this topic',
    openApp: 'Open Habitae',
    footer: 'Habitae Help · Condominium management without the noise.',
    categories: {
      'getting-started': 'Getting started',
      finance: 'Finance',
      fees: 'Fees',
      operations: 'Operations and documents',
      account: 'Account and billing',
    },
    articles: [
      {
        slug: 'create-first-condominium',
        category: 'getting-started',
        title: 'Create your first condominium',
        excerpt: 'Set up a workspace with the essential building details.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Before you start', paragraphs: ['Keep the condominium name, tax identification where applicable and management contacts at hand. You can complete the remaining details later.'] },
          { heading: 'Create the condominium', steps: ['Sign in to Habitae and open your workspace.', 'Select “New condominium”.', 'Enter the essential details and save.', 'Select the new condominium to start working.'] },
          { heading: 'What to set up next', paragraphs: ['Add units and people before creating fees. You can then add a budget, bank accounts and invite your team.'] },
        ],
      },
      {
        slug: 'invite-your-team',
        category: 'getting-started',
        title: 'Invite your management team',
        excerpt: 'Give the right people access without sharing your password.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Where to manage access', paragraphs: ['Open Settings and go to Users. This area is available to people with administration permission.'] },
          { heading: 'Send an invitation', steps: ['Select “Invite user”.', 'Enter the person’s name, email and role.', 'Choose the condominiums they can access.', 'Send the invitation. They create their own password through the link they receive.'] },
          { heading: 'Review access', note: 'Remove or adjust access when someone stops working with the administration. This does not remove records they already created.' },
        ],
      },
      {
        slug: 'record-a-transaction',
        category: 'finance',
        title: 'Record income or an expense',
        excerpt: 'Keep the balance and timeline up to date with each transaction.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Open Transactions', paragraphs: ['In the Finance menu, open Transactions and select “New transaction”.'] },
          { heading: 'Complete the record', steps: ['Choose whether it is income or an expense.', 'Enter the date, description and amount.', 'Associate it with a budget when relevant.', 'Save. The timeline and totals update automatically.'] },
          { heading: 'Good practice', paragraphs: ['Use specific descriptions, such as “Lift inspection — July”, so the information is easy to explain later.'] },
        ],
      },
      {
        slug: 'create-fee-schedule',
        category: 'fees',
        title: 'Create a fee schedule',
        excerpt: 'Set the amounts and generate fees for each unit.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'What you need', paragraphs: ['Before generating a schedule, record the units and confirm that the relevant budget has been created.'] },
          { heading: 'Generate the schedule', steps: ['Open Collections → Fee schedule.', 'Choose the budget and period.', 'Confirm the included units and amounts.', 'Generate the schedule. The fees will appear in the Fees area.'] },
          { heading: 'After generation', note: 'Review the schedule before communicating amounts to owners. Record later changes clearly to keep the history understandable.' },
        ],
      },
      {
        slug: 'record-fee-payment',
        category: 'fees',
        title: 'Record a fee payment',
        excerpt: 'Mark a fee as paid and keep outstanding amounts accurate.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Find the fee', paragraphs: ['Open Collections → Fees and use filters to find the relevant unit or period.'] },
          { heading: 'Record the payment', steps: ['Open the fee.', 'Select the action to record a payment.', 'Enter the actual received date and amount.', 'Confirm. The timeline status and totals update.'] },
          { heading: 'Partial payments', paragraphs: ['Record the amount received. The fee keeps its remaining balance visible until it is fully settled.'] },
        ],
      },
      {
        slug: 'prepare-meeting',
        category: 'operations',
        title: 'Prepare a meeting',
        excerpt: 'Organise the notice, documents and follow-up for an assembly.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Create the meeting', steps: ['Open Management → Meetings.', 'Create a meeting with its title, date, time and location.', 'Add the agenda and supporting documents.', 'Save before sending any communication.'] },
          { heading: 'Keep the context', paragraphs: ['Store the minutes, proxies and signature list in the same document context. Anyone with access can then find the complete process.'] },
        ],
      },
      {
        slug: 'subscription-and-billing',
        category: 'account',
        title: 'Manage subscription and billing',
        excerpt: 'Review the free period, payments and organisation invoices.',
        updated: '16 Jul 2026',
        sections: [
          { heading: 'Open billing', paragraphs: ['In the Habitae top bar, use the card icon to open Subscription and billing. This area is managed at organisation level.'] },
          { heading: 'During the free period', paragraphs: ['You can keep configuring and using the application. Before it ends, choose a plan to continue access without interruption.'] },
          { heading: 'Update payment or get invoices', paragraphs: ['Use “Manage in billing portal”. The secure portal lets you update your payment method, view invoices and manage the available subscription.'] },
        ],
      },
    ],
  },
};

function routeArticleSlug() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts.length > 1 ? parts[1] : null;
}

function anchorId(heading: string) {
  return heading.toLowerCase().replace(/\s+/g, '-');
}

export default function HelpCenter() {
  const { language, setLanguage } = useI18n();
  const c = helpContent[language];
  const helpRootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => routeArticleSlug());
  const selectedArticle = c.articles.find((article) => article.slug === selectedSlug) ?? null;
  const articlePathBase = language === 'pt' ? '/ajuda' : '/help';
  const relatedArticles = selectedArticle
    ? c.articles.filter((article) => article.category === selectedArticle.category && article.slug !== selectedArticle.slug)
    : [];

  useEffect(() => {
    document.body.classList.add('help-center-site');
    document.documentElement.setAttribute('data-help-center', 'true');
    return () => {
      document.body.classList.remove('help-center-site');
      document.documentElement.removeAttribute('data-help-center');
    };
  }, []);

  useEffect(() => {
    const languageFromPath = window.location.pathname.startsWith('/help')
      ? 'en'
      : window.location.pathname.startsWith('/ajuda')
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
    const onPopState = () => setSelectedSlug(routeArticleSlug());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const visibleArticles = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(language === 'pt' ? 'pt-PT' : 'en-GB');
    return c.articles.filter((article) => {
      const categoryMatches = activeCategory === 'all' || article.category === activeCategory;
      if (!categoryMatches) return false;
      if (!term) return true;
      const articleText = [article.title, article.excerpt, ...article.sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.steps ?? []), section.note ?? ''])]
        .join(' ')
        .toLocaleLowerCase(language === 'pt' ? 'pt-PT' : 'en-GB');
      return articleText.includes(term);
    });
  }, [activeCategory, c.articles, language, query]);

  const openArticle = (article: Article) => {
    setSelectedSlug(article.slug);
    window.history.pushState(null, '', `${articlePathBase}/${article.slug}`);
    helpRootRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showIndex = () => {
    setSelectedSlug(null);
    window.history.pushState(null, '', articlePathBase);
    helpRootRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
    setSelectedSlug(null);
    window.history.replaceState(null, '', nextLanguage === 'pt' ? '/ajuda' : '/help');
  };

  return (
    <div ref={helpRootRef} className="help-center">
      <a className="hc-skip-link" href="#help-content">{language === 'pt' ? 'Saltar para o conteúdo' : 'Skip to content'}</a>
      <header className="hc-header">
        <div className="hc-container hc-header-inner">
          <a href="/" className="hc-brand" aria-label={c.home}>
            <img src="/default-condominium-logo-light.png" alt={c.brandAlt} />
          </a>
          <div className="hc-header-actions">
            <a className="hc-home-link" href="/"><ArrowLeft size={15} aria-hidden="true" />{c.homeLink}</a>
            <a className="hc-login" href="/app">{c.login}</a>
            <div className="hc-language" role="group" aria-label={c.languageLabel}>
              <button type="button" className={language === 'pt' ? 'is-active' : ''} aria-pressed={language === 'pt'} onClick={() => changeLanguage('pt')}>PT</button>
              <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN</button>
            </div>
          </div>
        </div>
      </header>

      <main id="help-content">
        <section className="hc-hero">
          <div className="hc-container">
            <span className="hc-kicker"><BookOpen size={15} aria-hidden="true" /> {c.kicker}</span>
            <h1>{c.title}</h1>
            <p>{c.lead}</p>
            <div className="hc-search" role="search">
              <Search size={19} aria-hidden="true" />
              <input
                aria-label={c.searchLabel}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (selectedSlug) {
                    setSelectedSlug(null);
                    window.history.replaceState(null, '', articlePathBase);
                  }
                }}
                placeholder={c.searchPlaceholder}
                type="search"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label={c.clearSearch}>
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
              <button type="button" className={activeCategory === 'all' ? 'active' : ''} onClick={() => { setActiveCategory('all'); showIndex(); }}>
                <BookOpen size={16} aria-hidden="true" />{c.allArticles}<small>{c.articles.length}</small>
              </button>
              {(Object.keys(c.categories) as CategoryId[]).map((category) => {
                const Icon = categoryIcons[category];
                const count = c.articles.filter((article) => article.category === category).length;
                return (
                  <button key={category} type="button" className={activeCategory === category ? 'active' : ''} onClick={() => { setActiveCategory(category); showIndex(); }}>
                    <Icon size={16} aria-hidden="true" />{c.categories[category]}<small>{count}</small>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="hc-content" aria-live="polite">
            {selectedArticle ? (
              <article className="hc-article">
                <button type="button" className="hc-back" onClick={showIndex}><ArrowLeft size={16} aria-hidden="true" />{c.back}</button>
                <div className="hc-article-heading">
                  <span>{c.categories[selectedArticle.category]}</span>
                  <h2>{selectedArticle.title}</h2>
                  <p>{selectedArticle.excerpt}</p>
                  <small>{c.updated} {selectedArticle.updated}</small>
                </div>
                <div className="hc-article-layout">
                  <div className="hc-article-body">
                    {selectedArticle.sections.map((section) => (
                      <section key={section.heading} id={anchorId(section.heading)}>
                        <h3>{section.heading}</h3>
                        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {section.steps && (
                          <ol>
                            {section.steps.map((step) => <li key={step}>{step}</li>)}
                          </ol>
                        )}
                        {section.note && <p className="hc-note"><CheckCircle2 size={17} aria-hidden="true" />{section.note}</p>}
                      </section>
                      ))}
                  </div>
                  <aside className="hc-article-toc" aria-label={c.onThisPage}>
                    <span>{c.onThisPage}</span>
                    {selectedArticle.sections.map((section) => <a key={section.heading} href={`#${anchorId(section.heading)}`}>{section.heading}</a>)}
                  </aside>
                </div>
                {relatedArticles.length > 0 && (
                  <section className="hc-related" aria-labelledby="related-title">
                    <div className="hc-related-heading">
                      <span>{c.moreInCategory}</span>
                      <h3 id="related-title">{c.categories[selectedArticle.category]}</h3>
                    </div>
                    <div className="hc-related-grid">
                      {relatedArticles.map((article) => (
                        <button key={article.slug} type="button" className="hc-related-card" onClick={() => openArticle(article)}>
                          <strong>{article.title}</strong>
                          <span>{article.excerpt}</span>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            ) : (
              <div className="hc-index">
                <div className="hc-index-heading">
                  <div>
                    <span>{query ? c.results : activeCategory === 'all' ? c.allArticles : c.categories[activeCategory]}</span>
                    <h2>{visibleArticles.length} {visibleArticles.length === 1 ? c.articleCount.slice(0, -1) : c.articleCount}</h2>
                  </div>
                </div>
                {visibleArticles.length ? (
                  <div className="hc-article-grid">
                    {visibleArticles.map((article) => {
                      const Icon = categoryIcons[article.category];
                      return (
                        <button key={article.slug} type="button" className="hc-article-card" onClick={() => openArticle(article)}>
                          <span className="hc-article-icon"><Icon size={18} aria-hidden="true" /></span>
                          <span className="hc-article-category">{c.categories[article.category]}</span>
                          <strong>{article.title}</strong>
                          <span>{article.excerpt}</span>
                          <small>{c.updated} {article.updated}<ArrowRight size={15} aria-hidden="true" /></small>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="hc-empty">
                    <Search size={22} aria-hidden="true" />
                    <strong>{c.noResults}</strong>
                    <p>{c.noResultsCopy}</p>
                    <button type="button" onClick={() => { setQuery(''); setActiveCategory('all'); showIndex(); }}>{c.resetSearch}</button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="hc-footer">
        <div className="hc-container">
          <span>{c.footer}</span>
          <a href="/app">{c.openApp}<ArrowRight size={15} aria-hidden="true" /></a>
        </div>
      </footer>
    </div>
  );
}
