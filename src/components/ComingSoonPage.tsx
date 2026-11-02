import { withTranslations } from '../../shared/i18n.mjs';
import { ArrowLeft, ArrowRight, Building2, KeyRound } from 'lucide-react';
import { useI18n, type Language } from '../context/I18nContext';
import { managerAppUrl, residentAppUrl, sitePath } from '../site';
import './ComingSoonPage.css';
import { SiteHeader, SiteFooter } from './SiteChrome';

// habitae.pt/app/ is the way into the application at app.habitae.pt: managers
// sign in or create their organisation, residents sign in with the invitation
// their administration sent.
const copy: Record<Language, {
  title: string;
  body: string;
  managerTitle: string;
  managerBody: string;
  managerSignIn: string;
  managerCreate: string;
  residentTitle: string;
  residentBody: string;
  residentSignIn: string;
  residentNote: string;
  back: string;
}> = withTranslations({
  pt: {
    title: 'Entrar no Habitae',
    body: 'Escolha como usa o Habitae.',
    managerTitle: 'Administração e gestão',
    managerBody: 'Para administrações profissionais, membros da gestão e condomínios em autogestão.',
    managerSignIn: 'Entrar',
    managerCreate: 'Criar conta',
    residentTitle: 'Condóminos e moradores',
    residentBody: 'Consulte quotas, avisos e documentos e fale com a administração do seu condomínio.',
    residentSignIn: 'Entrar como condómino',
    residentNote: 'Primeiro acesso? Peça um convite à administração do condomínio.',
    back: 'Voltar à página inicial',
  },
  en: {
    title: 'Sign in to Habitae',
    body: 'Choose how you use Habitae.',
    managerTitle: 'Administrators and management',
    managerBody: 'For professional administrators, management members and self-managed condominiums.',
    managerSignIn: 'Log in',
    managerCreate: 'Create account',
    residentTitle: 'Owners and residents',
    residentBody: 'See your fees, notices and documents, and message your condominium’s administration.',
    residentSignIn: 'Log in as a resident',
    residentNote: 'First time? Ask your condominium’s administration for an invitation.',
    back: 'Back to the home page',
  },
});

export default function ComingSoonPage() {
  const { language } = useI18n();
  const c = copy[language];

  return (
    <div className="coming-soon-page">
      <SiteHeader />
      <main className="coming-soon-shell" id="page-content">
        <section className="coming-soon-card access-card" aria-labelledby="coming-soon-title">
          <h1 id="coming-soon-title">{c.title}</h1>
          <p>{c.body}</p>
          <div className="access-choices">
            <article className="access-choice" aria-labelledby="access-manager-title">
              <Building2 className="access-choice-icon" size={22} aria-hidden="true" />
              <h2 id="access-manager-title">{c.managerTitle}</h2>
              <p>{c.managerBody}</p>
              <div className="access-choice-actions">
                <a className="mk-button mk-button--primary" href={managerAppUrl}>{c.managerSignIn}<ArrowRight size={16} aria-hidden="true" /></a>
                <a className="mk-button mk-button--ghost access-choice-secondary" href={managerAppUrl}>{c.managerCreate}</a>
              </div>
            </article>
            <article className="access-choice" aria-labelledby="access-resident-title">
              <KeyRound className="access-choice-icon" size={22} aria-hidden="true" />
              <h2 id="access-resident-title">{c.residentTitle}</h2>
              <p>{c.residentBody}</p>
              <div className="access-choice-actions">
                <a className="mk-button mk-button--primary" href={residentAppUrl}>{c.residentSignIn}<ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <p className="access-choice-note">{c.residentNote}</p>
            </article>
          </div>
          <a className="coming-soon-back" href={sitePath('/', language)}>
            <ArrowLeft size={16} aria-hidden="true" />
            {c.back}
          </a>
        </section>
      </main>
      <SiteFooter languagePaths={{ pt: sitePath('/app/', 'pt'), en: sitePath('/app/', 'en'), fr: sitePath('/app/', 'fr'), es: sitePath('/app/', 'es') }} />
    </div>
  );
}
