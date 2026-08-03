import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import { I18nProvider } from './context/I18nContext';
import { appPathname } from './site';

const pathname = appPathname();
const isMarketingHomepage = pathname === '/';
const isComingSoonPage = /^\/app\/?$/.test(pathname);
const isHelpCenter = /^\/(?:ajuda|help)(?:\/|$)/.test(pathname);
const isNotFound = !isMarketingHomepage && !isComingSoonPage && !isHelpCenter;

const loadSurface = isMarketingHomepage
  ? () => import('./components/MarketingPage')
  : isComingSoonPage
    ? () => import('./components/ComingSoonPage')
    : isHelpCenter
      ? () => import('./components/HelpCenter')
      : isNotFound
        ? () => import('./components/NotFoundPage')
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
