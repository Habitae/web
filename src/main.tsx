import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import { I18nProvider } from './context/I18nContext';

const isMarketingHomepage = window.location.pathname === '/';
const isComingSoonPage = /^\/app\/?$/.test(window.location.pathname);
const isHelpCenter = /^\/(?:ajuda|help)(?:\/|$)/.test(window.location.pathname);

const loadSurface = isMarketingHomepage
  ? () => import('./components/MarketingPage')
  : isComingSoonPage
    ? () => import('./components/ComingSoonPage')
    : isHelpCenter
      ? () => import('./components/HelpCenter')
      : () => import('./components/MarketingPage');

const Surface = React.lazy(loadSurface);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <React.Suspense fallback={<div aria-label="A carregar Habitae" style={{ minHeight: '100dvh', background: '#f7f5ee' }} />}>
        <Surface />
      </React.Suspense>
    </I18nProvider>
  </React.StrictMode>,
);
