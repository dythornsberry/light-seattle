import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import GalleryPage from '@/pages/GalleryPage';
import AboutPage from '@/pages/AboutPage';
import PricingPage from '@/pages/PricingPage';
import ServiceAreasPage from '@/pages/ServiceAreasPage';
import ServiceAreaCityPage from '@/pages/ServiceAreaCityPage';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import ThankYouPage from '@/pages/ThankYouPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ImageLightbox from '@/components/ImageLightbox';
import { AnimatePresence } from 'framer-motion';

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

function App() {
  const location = useLocation();
  return (
    <>
      <ImageLightbox />
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;