import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Building2, Calculator, ChartNoAxesCombined, Clock3, Copy, FileText, Search, Wrench } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { appPathname, sitePath } from '../site';
import { blogIndex, blogPosts, blogPath, translatedBlogPost, type BlogPost } from '../content/blog';
import { SiteHeader, SiteFooter } from './SiteChrome';
import NotFoundPage from './NotFoundPage';
import './LegalPage.css';
import './BlogPage.css';

function readingMinutes(post: BlogPost) {
  const text = [post.description, ...post.sections.flatMap(section => [section.heading, ...section.paragraphs, ...(section.items ?? [])])].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

function TopicIllustration({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  const Icon = ({ arrears: FileText, repairs: Wrench, handover: Building2, fees: Calculator, budget: ChartNoAxesCombined, spreadsheets: BookOpen })[post.id] ?? FileText;
  return <div className={`blog-illustration blog-illustration-${post.id}${compact ? ' blog-illustration-compact' : ''}`} aria-hidden="true">
    <div className="blog-paper blog-paper-back" />
    <div className="blog-paper"><div className="blog-paper-heading"><Icon size={30} strokeWidth={1.4} /><span>H.</span></div><div className="blog-paper-rule" /><div className="blog-paper-lines"><i /><i /><i /></div><div className="blog-paper-chart"><i /><i /><i /><i /><i /></div></div>
    <span className="blog-illustration-caption">{post.category}</span>
  </div>;
}

export default function BlogPage({ pathname = appPathname() }: { pathname?: string }) {
  const { language } = useI18n();
  const en = language === 'en';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const slug = pathname.replace(/^\/blog\/?/, '').replace(/\/$/, '');
  const posts = blogPosts[language];
  const post = posts.find(item => item.slug === slug);
  const title = post?.title ?? blogIndex[language].title;
  useEffect(() => {
    document.body.classList.add('legal-site');
    setReady(true);
    if (!slug || post) document.title = `${title} | Habitae`;
    return () => document.body.classList.remove('legal-site');
  }, [title, slug, post]);
  if (slug && !post) return <NotFoundPage />;
  const date = (value: string) => new Intl.DateTimeFormat(en ? 'en-GB' : 'pt-PT', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
  const readingTime = (item: BlogPost) => `${readingMinutes(item)} ${en ? 'min read' : 'min de leitura'}`;
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(language);
  const filtered = posts.filter(item => (!category || item.category === category) && normalize(`${item.title} ${item.description} ${item.category}`).includes(normalize(query.trim())));
  const featured = posts[0];
  const related = post ? [...posts.filter(item => item.id !== post.id)].sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3) : [];
  const helpPath = sitePath(en ? '/help/' : '/ajuda/');
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${sitePath(blogPath(language, post))}`);
      setCopyStatus(en ? 'Link copied' : 'Ligação copiada');
    } catch {
      setCopyStatus(en ? 'Copy the address from your browser to share this article.' : 'Copie o endereço do navegador para partilhar este artigo.');
    }
  };
  const cards = (items: BlogPost[]) => <div className="blog-grid">{items.map(item => <article className="blog-card" key={item.id}>
    <TopicIllustration post={item} compact />
    <div className="blog-card-body"><div className="blog-card-meta"><span>{item.category}</span><span>{readingTime(item)}</span></div>
      <h3><a href={sitePath(blogPath(language, item))}>{item.title}</a></h3><p>{item.description}</p>
      <div className="blog-card-footer"><time dateTime={item.published}>{date(item.published)}</time><ArrowRight size={19} aria-hidden="true" /></div>
    </div>
  </article>)}</div>;

  return <div className="legal-page blog-page">
    <a className="legal-skip" href="#blog-content">{en ? 'Skip to content' : 'Saltar para o conteúdo'}</a>
    <SiteHeader active="blog" />
    <main className="legal-container" id="blog-content" tabIndex={-1}>
      {post ? <>
        <nav className="blog-breadcrumb" aria-label={en ? 'Breadcrumb' : 'Localização'}><a href={sitePath(blogPath(language))}><ArrowLeft size={15} aria-hidden="true" />{en ? 'All articles' : 'Todos os artigos'}</a><span aria-hidden="true">/</span><span>{post.category}</span></nav>
        <div className="blog-article-hero">
          <div><h1>{title}</h1><p className="legal-lead">{post.description}</p>
            <div className="blog-byline"><span className="blog-avatar" aria-hidden="true">H.</span><div><a href={sitePath('/about/', language)}>{en ? 'Habitae team' : 'Equipa Habitae'}</a><div className="blog-byline-meta"><time dateTime={post.published}>{date(post.published)}</time><span>·</span><span>{readingTime(post)}</span></div>{post.updated !== post.published && <p className="blog-updated">{en ? 'Updated on ' : 'Atualizado em '}<time dateTime={post.updated}>{date(post.updated)}</time></p>}</div></div>
          </div><TopicIllustration post={post} />
        </div>
        <div className="blog-article-bar"><span><BookOpen size={17} aria-hidden="true" />{en ? 'A practical guide for condominium managers' : 'Um guia prático para quem administra condomínios'}</span>{ready && <button type="button" onClick={copyLink}><Copy size={16} aria-hidden="true" />{en ? 'Copy link' : 'Copiar ligação'}</button>}<span className="blog-copy-status" role="status">{copyStatus}</span></div>
        <div className="legal-layout">
          <aside className="blog-sidebar"><nav className="legal-contents" aria-label={en ? 'On this page' : 'Nesta página'}><p>{en ? 'In this article' : 'Neste artigo'}</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav>
            <div className="blog-sidebar-note"><BookOpen size={22} aria-hidden="true" /><h2>{en ? 'From reading to doing' : 'Da leitura à prática'}</h2><p>{en ? 'Step-by-step instructions for organising your condominium in Habitae.' : 'Instruções passo a passo para organizar o seu condomínio no Habitae.'}</p><a href={sitePath(post.guide.href)}>{en ? 'Open the help guide' : 'Consultar o guia de ajuda'}<ArrowRight size={16} aria-hidden="true" /></a></div>
          </aside>
          <article className="legal-article" aria-label={post.title}>
            {post.sections.map(section => <section key={section.id} id={section.id}>{section.aliases?.map(alias => <span key={alias} id={alias} aria-hidden="true" />)}<h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}{section.links && <ul className="legal-reference-links">{section.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>}</section>)}
            {post.legalReviewed && <div className="blog-review-panel"><p className="blog-review">{en ? 'Portuguese legislation checked on ' : 'Legislação portuguesa consultada em '}<time dateTime={post.legalReviewed}>{date(post.legalReviewed)}</time>. {en ? 'Practical checklists are organisational recommendations.' : 'As listas práticas são recomendações de organização.'}</p></div>}
            <div className="blog-author"><span className="blog-avatar" aria-hidden="true">H.</span><div><h2>{en ? 'Written by the Habitae team' : 'Escrito pela equipa Habitae'}</h2><p>{en ? 'Practical guides to the accounts, maintenance and paperwork involved in managing a condominium in Portugal.' : 'Guias práticos sobre as contas, a manutenção e os documentos de quem gere um condomínio em Portugal.'}</p><a href={sitePath('/about/', language)}>{en ? 'About Habitae' : 'Conhecer o Habitae'}<ArrowRight size={15} aria-hidden="true" /></a></div></div>
            <section className="blog-next"><h2>{en ? 'Put the process into practice' : 'Passar à prática'}</h2><p><a href={sitePath(post.guide.href)}>{post.guide.label}<ArrowRight size={17} aria-hidden="true" /></a></p><p>{en ? 'Habitae is coming soon. Join the waitlist to hear when it launches.' : 'O Habitae está em preparação. Entre na lista de espera para saber quando ficar disponível.'}</p><a className="blog-button" href={sitePath('/app/', language)}>{en ? 'Join the waitlist' : 'Entrar na lista de espera'}<ArrowRight size={17} aria-hidden="true" /></a></section>
          </article>
        </div>
        <section className="blog-related" aria-labelledby="related-title"><div className="blog-section-heading"><div><h2 id="related-title">{en ? 'Read next' : 'Continuar a ler'}</h2></div><a href={sitePath(blogPath(language))}>{en ? 'All articles' : 'Todos os artigos'}<ArrowRight size={17} aria-hidden="true" /></a></div>{cards(related)}</section>
      </> : <>
        <div className="blog-index-hero"><div><h1>{title}</h1></div><p className="legal-lead">{blogIndex[language].description}</p></div>
        <section className="blog-feature-layout" aria-label={en ? 'Featured reading' : 'Leitura em destaque'}>
          <article className="blog-feature"><TopicIllustration post={featured} /><div className="blog-feature-body"><h2><a href={sitePath(blogPath(language, featured))}>{featured.title}</a></h2><p>{featured.description}</p><div className="blog-feature-meta"><span>{featured.category}</span><span><Clock3 size={15} aria-hidden="true" />{readingTime(featured)}</span></div><a className="blog-text-link" href={sitePath(blogPath(language, featured))}>{en ? 'Read the guide' : 'Ler o guia'}<ArrowRight size={18} aria-hidden="true" /></a></div></article>
          <aside className="blog-start"><h2>{en ? 'A little more order. A clearer next step.' : 'Mais organização. Um próximo passo claro.'}</h2><p>{en ? 'New to condominium management? These guides help you get the essentials in place.' : 'A começar na gestão de condomínios? Estes guias ajudam a preparar o essencial.'}</p><ol>{posts.filter(item => ['handover', 'budget', 'fees'].includes(item.id)).map((item, index) => <li key={item.id}><span aria-hidden="true">0{index + 1}</span><a href={sitePath(blogPath(language, item))}>{item.category}<ArrowRight size={16} aria-hidden="true" /></a></li>)}</ol><a className="blog-text-link" href={helpPath}>{en ? 'Visit the help centre' : 'Visitar o centro de ajuda'}<ArrowRight size={17} aria-hidden="true" /></a></aside>
        </section>
        <section className="blog-library" aria-labelledby="library-title"><div className="blog-section-heading"><div><h2 id="library-title">{en ? 'Explore the articles' : 'Explorar os artigos'}</h2></div>{ready && <label className="blog-search"><Search size={18} aria-hidden="true" /><span className="blog-sr-only">{en ? 'Search articles' : 'Pesquisar artigos'}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={en ? 'Search articles…' : 'Pesquisar artigos…'} /></label>}</div>
          {ready && <div className="blog-filters" role="group" aria-label={en ? 'Filter by topic' : 'Filtrar por tema'}>{['', ...new Set(posts.map(item => item.category))].map(topic => <button key={topic} type="button" aria-pressed={category === topic} onClick={() => setCategory(topic)}>{topic || (en ? 'All topics' : 'Todos os temas')}</button>)}</div>}
          <p className="blog-result-count" role="status">{filtered.length} {en ? (filtered.length === 1 ? 'article' : 'articles') : (filtered.length === 1 ? 'artigo' : 'artigos')}{category ? ` · ${category}` : ''}</p>
          {filtered.length ? cards(filtered) : <div className="blog-empty"><h3>{en ? 'No articles found' : 'Nenhum artigo encontrado'}</h3><p>{en ? 'Try a different term or browse all topics.' : 'Experimente outro termo ou consulte todos os temas.'}</p><button type="button" className="blog-button" onClick={() => { setQuery(''); setCategory(''); }}>{en ? 'Show all articles' : 'Ver todos os artigos'}</button></div>}
        </section>
        <section className="blog-bottom-cta"><div><h2>{en ? 'Give your condominium a place to get organised.' : 'Dê ao seu condomínio um lugar para se organizar.'}</h2><p>{en ? 'Habitae is coming soon. Join the waitlist to hear when it is ready.' : 'O Habitae está em preparação. Entre na lista de espera para saber quando estiver disponível.'}</p></div><a className="blog-button" href={sitePath('/app/', language)}>{en ? 'Join the waitlist' : 'Entrar na lista de espera'}<ArrowRight size={18} aria-hidden="true" /></a></section>
      </>}
    </main>
    <SiteFooter languagePaths={{
      pt: sitePath(blogPath('pt', post ? translatedBlogPost('pt', post.slug) : undefined)),
      en: sitePath(blogPath('en', post ? translatedBlogPost('en', post.slug) : undefined)),
    }} />
  </div>;
}
