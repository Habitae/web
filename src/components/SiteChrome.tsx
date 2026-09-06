import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { rememberLanguage } from '../consent';
import { useI18n, type Language } from '../context/I18nContext';
import { siteAsset, sitePath } from '../site';
import CookieSettingsButton from './CookieSettingsButton';
import './SiteChrome.css';

const chromeCopy = {
  pt: {
    brandAlt: 'Habitae, Gestão de Condomínios', homeLabel: 'Habitae, página inicial', menuOpen: 'Abrir menu', menuClose: 'Fechar menu', navigationLabel: 'Navegação principal',
    nav: { features: 'Funcionalidades', pricing: 'Planos', help: 'Ajuda', login: 'Entrar', open: 'Acesso antecipado' },
    footer: { tagline: 'Finanças, pessoas e tarefas do condomínio, num só lugar.', navigation: 'Ligações do rodapé', copyright: 'Habitae, Gestão de Condomínios', languageLabel: 'Escolher idioma', legal: 'Informação legal', terms: 'Termos e condições', privacy: 'Privacidade' },
  },
  en: {
    brandAlt: 'Habitae, Condominium Management', homeLabel: 'Habitae, home page', menuOpen: 'Open menu', menuClose: 'Close menu', navigationLabel: 'Main navigation',
    nav: { features: 'Features', pricing: 'Plans', help: 'Help', login: 'Log in', open: 'Early access' },
    footer: { tagline: 'Condominium finances, people and tasks, in one place.', navigation: 'Footer links', copyright: 'Habitae, Condominium Management', languageLabel: 'Choose language', legal: 'Legal information', terms: 'Terms and conditions', privacy: 'Privacy' },
  },
};

const footerGroups: Record<Language, Array<{ title: string; links: Array<{ label: string; path: string }> }>> = {
  pt: [
    { title: 'Produto', links: [
      { label: 'Finanças e quotas', path: '/#financas' },
      { label: 'Frações e pessoas', path: '/#pessoas' },
      { label: 'Assembleias e manutenção', path: '/#assembleias' },
      { label: 'Acessos e atividade', path: '/#confianca' },
      { label: 'Planos e preços', path: '/#planos' },
    ] },
    { title: 'Guias', links: [
      { label: 'Blog do condomínio', path: '/blog/' },
      { label: 'Primeiros passos', path: '/ajuda/criar-primeiro-condominio' },
      { label: 'Criar quotas', path: '/ajuda/criar-plano-quotas' },
      { label: 'Registar pagamentos', path: '/ajuda/registar-pagamento-quota' },
      { label: 'Preparar reuniões', path: '/ajuda/preparar-reuniao' },
      { label: 'Convidar a equipa', path: '/ajuda/convidar-equipa' },
    ] },
    { title: 'Apoio', links: [
      { label: 'Sobre o Habitae', path: '/about/' },
      { label: 'Contactos', path: '/contact/' },
      { label: 'Centro de ajuda', path: '/ajuda' },
      { label: 'Perguntas frequentes', path: '/#perguntas-frequentes' },
      { label: 'Abrir aplicação', path: '/app' },
    ] },
  ],
  en: [
    { title: 'Product', links: [
      { label: 'Finances and fees', path: '/#financas' },
      { label: 'Units and people', path: '/#pessoas' },
      { label: 'Meetings and maintenance', path: '/#assembleias' },
      { label: 'Access and activity', path: '/#confianca' },
      { label: 'Plans and pricing', path: '/#planos' },
    ] },
    { title: 'Guides', links: [
      { label: 'Condominium blog', path: '/blog/' },
      { label: 'Getting started', path: '/help/create-first-condominium' },
      { label: 'Create fee schedules', path: '/help/create-fee-schedule' },
      { label: 'Record payments', path: '/help/record-fee-payment' },
      { label: 'Prepare meetings', path: '/help/prepare-meeting' },
      { label: 'Invite your team', path: '/help/invite-your-team' },
    ] },
    { title: 'Support', links: [
      { label: 'About Habitae', path: '/about/' },
      { label: 'Contact', path: '/contact/' },
      { label: 'Help centre', path: '/help' },
      { label: 'Frequently asked questions', path: '/#perguntas-frequentes' },
      { label: 'Open application', path: '/app' },
    ] },
  ],
};

function Brand({ inverse = false, alt }: { inverse?: boolean; alt: string }) {
  return (
    <img
      className="mk-brand-logo"
      src={siteAsset(inverse ? 'default-condominium-logo-dark.png' : 'default-condominium-logo-light.png')}
      alt={alt}
      width={466}
      height={152}
    />
  );
}

export function SiteHeader({ home = false, active }: { home?: boolean; active?: 'blog' | 'help' }) {
  const { language } = useI18n();
  const c = chromeCopy[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>('.mk-menu-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return (
      <header className="mk-header site-chrome">
        <div className="mk-container mk-header-inner">
          <a className="mk-brand" href={sitePath('/', language)} aria-label={c.homeLabel}>
            <Brand alt={c.brandAlt} />
          </a>

          <div className="mk-mobile-header-actions">
            <button
              type="button"
              className="mk-menu-toggle"
              disabled={!ready}
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
              <a href={home ? "#funcionalidades" : sitePath("/#funcionalidades", language)} onClick={closeMenu}>{c.nav.features}</a>
              <a href={home ? "#planos" : sitePath("/#planos", language)} onClick={closeMenu}>{c.nav.pricing}</a>
              <a href={sitePath("/blog/", language)} onClick={closeMenu} aria-current={active === 'blog' ? 'page' : undefined}>Blog</a>
              <a href={sitePath(language === 'pt' ? '/ajuda' : '/help', language)} onClick={closeMenu} aria-current={active === 'help' ? 'page' : undefined}>{c.nav.help}</a>
            </div>
            <div className="mk-nav-actions">
              <a className="mk-button mk-button--ghost" href={sitePath('/app', language)}>{c.nav.login}</a>
              <a className="mk-button mk-button--primary mk-button--compact" href={sitePath('/app', language)}>
                {c.nav.open} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      </header>
  );
}

export function SiteFooter({ languagePaths }: { languagePaths?: Record<Language, string> }) {
  const { language } = useI18n();
  const c = chromeCopy[language];
  const currentYear = new Date().getFullYear();
  return (
      <footer className="mk-footer site-chrome">
        <div className="mk-container">
          <div className="mk-footer-main">
            <div className="mk-footer-brand">
              <a href={sitePath('/', language)} aria-label={c.homeLabel}><Brand alt={c.brandAlt} /></a>
              <p>{c.footer.tagline}</p>
            </div>
            <nav className="mk-footer-links" aria-label={c.footer.navigation}>
              {footerGroups[language].map(({ title, links }) => (
                <div key={title}>
                  <h2>{title}</h2>
                  <ul>
                    {links.map(({ label, path }) => <li key={path}><a href={sitePath(path, language)}>{label}</a></li>)}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="mk-footer-bottom">
            <small className="mk-footer-copyright">© {currentYear} {c.footer.copyright}</small>
            <nav className="mk-footer-legal" aria-label={c.footer.legal}>
              <a href={sitePath('/terms', language)}>{c.footer.terms}</a>
              <a href={sitePath('/privacy', language)}>{c.footer.privacy}</a>
              <a href={sitePath('/glossary.md')}>{language === 'pt' ? 'Glossário' : 'Glossary'}</a>
              <CookieSettingsButton />
            </nav>
            <div className="mk-language-toggle" role="group" aria-label={c.footer.languageLabel}>
              <a href={languagePaths?.pt ?? sitePath('/', 'pt')} onClick={() => rememberLanguage('pt')} lang="pt" className={language === 'pt' ? 'is-active' : ''} aria-current={language === 'pt' ? 'page' : undefined}>Português</a>
              <a href={languagePaths?.en ?? sitePath('/', 'en')} onClick={() => rememberLanguage('en')} lang="en" className={language === 'en' ? 'is-active' : ''} aria-current={language === 'en' ? 'page' : undefined}>English</a>
            </div>
          </div>
        </div>
      </footer>
  );
}
