import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';

const container = document.getElementById('root');
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Production HTML is prerendered per route (scripts/prerender.js), so hydrate
// to reuse it. 404.html is served for any unknown URL and renders the same
// NotFound page. Anything else (dev, or a route the snapshot missed) renders
// from scratch.
const prerendered = container.dataset.prerendered;
if (container.hasChildNodes() && (prerendered === window.location.pathname || prerendered === '/404')) {
  hydrateRoot(container, app);
} else {
  container.textContent = '';
  createRoot(container).render(app);
}
