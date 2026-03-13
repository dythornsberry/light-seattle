import React, { useEffect, useRef } from 'react';

const useStickyCta = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('sticky-cta-hidden');
          } else {
            document.body.classList.remove('sticky-cta-hidden');
          }
        });
      },
      {
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    const ctaElements = document.querySelectorAll('[data-cta-section]');
    ctaElements.forEach((el) => observer.observe(el));

    return () => {
      ctaElements.forEach((el) => observer.unobserve(el));
      document.body.classList.remove('sticky-cta-hidden');
    };
  }, []);

  return null;
};

export default useStickyCta;