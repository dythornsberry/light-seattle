import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ServiceAreaCityPage from '@/pages/ServiceAreaCityPage';
import ThankYouPage from '@/pages/ThankYouPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import { cities } from '@/data/site';

// Pages are imported eagerly (they're tiny): a lazy route would suspend while
// hydrating the prerendered HTML and force React to throw it away.
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {cities.map((c) => (
            <Route key={c.path} path={`service-areas/${c.path}`} element={<ServiceAreaCityPage city={c.name} />} />
          ))}
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
