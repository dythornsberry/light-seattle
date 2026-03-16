import React, { useEffect } from 'react';

const useStickyCta = () => {
  useEffect(() => {
    const ctaSections = Array.from(document.querySelectorAll('[data-cta-section]'));

    if (ctaSections.length === 0) {
      return undefined;
    }

    const syncStickyCtaVisibility = () => {
      const shouldHideStickyCta = ctaSections.some((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight - 100 && rect.bottom > 0;
      });

      document.body.classList.toggle('sticky-cta-hidden', shouldHideStickyCta);
    };

    const observer = new IntersectionObserver(
      () => syncStickyCtaVisibility(),
      {
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.1,
      }
    );

    ctaSections.forEach((element) => observer.observe(element));
    syncStickyCtaVisibility();

    return () => {
      observer.disconnect();
      document.body.classList.remove('sticky-cta-hidden');
    };
  }, []);

  return null;
};

export default useStickyCta;
