import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileActions from '@/components/StickyMobileActions';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';

import ScrollToTop from '@/components/ScrollToTop';
import CountdownBanner from '@/components/CountdownBanner';
import FloatingCallButton from '@/components/FloatingCallButton';

const Layout = ({ serviceAreas }) => {
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add('form-visible');
        } else {
          document.body.classList.remove('form-visible');
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    const quoteFormSection = document.getElementById('quote-form-section');
    if (quoteFormSection) {
      observer.observe(quoteFormSection);
    }
    
    return () => {
      if (quoteFormSection) {
        observer.unobserve(quoteFormSection);
      }
       document.body.classList.remove('form-visible');
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LocalBusinessSchema />
      <ScrollToTop />
      <Header />
      <CountdownBanner />
      <main ref={mainRef} className="flex-grow pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer serviceAreas={serviceAreas} />
      <FloatingCallButton />
      <StickyMobileActions />
    </div>
  );
};

export default Layout;