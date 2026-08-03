import { ArrowLeft } from 'lucide-react';
import { useI18n, type Language } from '../context/I18nContext';
import { siteAsset, sitePath } from '../site';
import './ComingSoonPage.css';

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
  const { language, setLanguage } = useI18n();
  const c = copy[language];

  return (
    <main className="coming-soon-page">
      <div className="coming-soon-shell">
        <header className="coming-soon-header">
          <a className="coming-soon-brand" href={sitePath('/')} aria-label="Habitae">
            <img src={siteAsset('default-condominium-logo-light.png')} alt="Habitae" />
          </a>
          <div className="coming-soon-language" role="group" aria-label={c.language}>
            <button type="button" className={language === 'pt' ? 'is-active' : ''} aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
            <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </header>

        <section className="coming-soon-card" aria-labelledby="coming-soon-title">
          <h1 id="coming-soon-title">{c.title}</h1>
          <p>{c.body}</p>
          <a className="coming-soon-back" href={sitePath('/')}>
            <ArrowLeft size={16} aria-hidden="true" />
            {c.back}
          </a>
        </section>
      </div>
    </main>
  );
}
