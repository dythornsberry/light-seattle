import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import { cities } from '@/data/site';

const ServiceAreaCityPage = React.lazy(() => import('@/pages/ServiceAreaCityPage'));
const ThankYouPage = React.lazy(() => import('@/pages/ThankYouPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/PrivacyPolicyPage'));

function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
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
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
