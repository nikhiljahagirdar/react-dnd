import React, { useState, useEffect } from 'react';
import { PageRenderer } from '../componets/pageRendrer';
import defaultPageLayout from '../layout/layout.json';

export default function RendererPage() {
  const [pageLayout, setPageLayout] = useState(defaultPageLayout);

  useEffect(() => {
    const stored = localStorage.getItem('page-1-builder');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if it's a valid schema with blocks
        if (parsed && parsed.blocks) {
          setPageLayout(parsed);
        }
      } catch (e) {
        console.warn('Could not parse stored layout for renderer.', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-200">
      <div className="container mx-auto p-4 md:p-12">
        <h3 className="text-2xl font-bold mb-4 text-slate-700">Live Preview</h3>
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
          <PageRenderer page={pageLayout} />
        </div>
      </div>
    </div>
  );
}