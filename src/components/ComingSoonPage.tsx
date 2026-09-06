import WaitlistForm from './WaitlistForm';
import { ArrowLeft } from 'lucide-react';
import { useI18n, type Language } from '../context/I18nContext';
import { sitePath } from '../site';
import './ComingSoonPage.css';
import { SiteHeader, SiteFooter } from './SiteChrome';

const copy: Record<Language, {
  title: string;
  body: string;
  back: string;
  language: string;
}> = {
  pt: {
    title: 'A sua área de gestão está quase a chegar.',
    body: 'A gestão do seu condomínio está prestes a mudar. O Habitae reúne finanças, quotas, documentos e tarefas num só lugar.',
    back: 'Voltar à página inicial',
    language: 'Escolher idioma',
  },
  en: {
    title: 'Your management workspace is coming soon.',
    body: 'Condominium management is about to get a lot easier. Habitae brings finances, fees, documents and daily tasks together in one place.',
    back: 'Back to the home page',
    language: 'Choose language',
  },
};

export default function ComingSoonPage() {
  const { language } = useI18n();
  const c = copy[language];

  return (
    <div className="coming-soon-page">
      <SiteHeader />
      <main className="coming-soon-shell" id="page-content">


        <section className="coming-soon-card" aria-labelledby="coming-soon-title">
          <h1 id="coming-soon-title">{c.title}</h1>
          <p>{c.body}</p>
          <WaitlistForm />
          <a className="coming-soon-back" href={sitePath('/', language)}>
            <ArrowLeft size={16} aria-hidden="true" />
            {c.back}
          </a>
        </section>
      </main>
      <SiteFooter languagePaths={{ pt: sitePath('/app/', 'pt'), en: sitePath('/app/', 'en') }} />
    </div>
  );
}
