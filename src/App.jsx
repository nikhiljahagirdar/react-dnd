import React, { useState, lazy, Suspense } from 'react';

// Lazy load the page components
const BuilderPage = lazy(() => import('./pages/BuilderPage.jsx'));
const RendererPage = lazy(() => import('./pages/RendererPage.jsx'));

const pages = {
  builder: BuilderPage,
  renderer: RendererPage,
};

export default function App() {
  const [page, setPage] = useState('builder');
  const PageComponent = pages[page];

  const navButtonClass = (targetPage) =>
    `px-6 py-3 font-semibold text-sm transition-colors focus:outline-none rounded-t-lg ${
      page === targetPage
        ? 'bg-slate-200 text-slate-800'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
    }`;

  return (
    <>
      <nav className="bg-white shadow-sm px-4 sticky top-0 z-20 flex justify-center pt-2 space-x-1">
        <button onClick={() => setPage('builder')} className={navButtonClass('builder')}>
          Builder
        </button>
        <button onClick={() => setPage('renderer')} className={navButtonClass('renderer')}>
          Renderer
        </button>
      </nav>
      <main>
        <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-500">Loading Page...</div>}>
          <PageComponent />
        </Suspense>
      </main>
    </>
  );
}
