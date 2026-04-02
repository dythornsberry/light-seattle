import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ImageLightbox from '@/components/ImageLightbox';
import { AnimatePresence } from 'framer-motion';

const GalleryPage = React.lazy(() => import('@/pages/GalleryPage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage'));
const ServiceAreasPage = React.lazy(() => import('@/pages/ServiceAreasPage'));
const ServiceAreaCityPage = React.lazy(() => import('@/pages/ServiceAreaCityPage'));
const FaqPage = React.lazy(() => import('@/pages/FaqPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const ThankYouPage = React.lazy(() => import('@/pages/ThankYouPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/PrivacyPolicyPage'));

const serviceAreas = [
  { name: 'Seattle', path: 'seattle' },
  { name: 'Bellevue', path: 'bellevue' },
  { name: 'Kirkland', path: 'kirkland' },
  { name: 'Bothell', path: 'bothell' },
  { name: 'Kenmore', path: 'kenmore' },
  { name: 'Woodinville', path: 'woodinville' },
  { name: 'Lake Forest Park', path: 'lake-forest-park' },
  { name: 'Everett', path: 'everett' },
  { name: 'Lynnwood', path: 'lynnwood' },
  { name: 'Shoreline', path: 'shoreline' },
  { name: 'Mercer Island', path: 'mercer-island' },
  { name: 'Medina', path: 'medina' },
  { name: 'Clyde Hill', path: 'clyde-hill' },
  { name: 'Hunts Point', path: 'hunts-point' },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Seattle Christmas Lights",
  "url": "https://lightseattle.com",
  "description": "Professional Christmas light installation, maintenance, and storage for Greater Seattle homes.",
  "publisher": {
    "@id": "https://lightseattle.com/#business"
  }
};

function App() {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      <ImageLightbox />
      <Suspense fallback={<div className="min-h-screen" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout serviceAreas={serviceAreas} />}>
              <Route index element={<HomePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="service-areas" element={<ServiceAreasPage serviceAreas={serviceAreas} />} />
              {serviceAreas.map(area => (
                <Route
                  key={area.path}
                  path={`service-areas/${area.path}`}
                  element={<ServiceAreaCityPage city={area.name} />}
                />
              ))}
              <Route path="faq" element={<FaqPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="thank-you" element={<ThankYouPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
