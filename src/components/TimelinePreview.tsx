import type { Language } from '../context/I18nContext';
import { siteAsset } from '../site';
import './TimelinePreview.css';

const copy = {
  pt: {
    alt: 'Resumo da linha cronológica do Habitae: saldo disponível, movimentos financeiros e início da atividade recente, com dados de exemplo.',
    caption: 'Pré-visualização com dados de exemplo',
  },
  en: {
    alt: 'Habitae timeline summary: available balance, financial movements and the start of recent activity, with example data.',
    caption: 'Preview with example data',
  },
} as const;

export default function TimelinePreview({ language }: { language: Language }) {
  const c = copy[language];

  return (
    <figure className="mk-product-preview">
      <img
        className="tp-screenshot"
        src={siteAsset(`timeline-preview-${language}-1536.webp`)}
        srcSet={`${siteAsset(`timeline-preview-${language}-768.webp`)} 768w, ${siteAsset(`timeline-preview-${language}-1536.webp`)} 1536w`}
        sizes="(max-width: 920px) calc(100vw - 48px), (max-width: 1280px) 52vw, 650px"
        alt={c.alt}
        width={1536}
        height={827}
        fetchPriority="high"
      />
      <figcaption className="tp-caption">{c.caption}</figcaption>
    </figure>
  );
}
