import React, { useEffect } from 'react';

const MobileImageLightbox = () => {
  useEffect(() => {
    const isMobile = () => window.matchMedia('(max-width: 430px)').matches;

    if (document.querySelector('.clb-overlay')) {
      return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'clb-overlay';
    overlay.innerHTML = '<img alt="" /><div class="clb-caption" aria-live="polite"></div><button class="clb-close" aria-label="Close">×</button>';
    document.body.appendChild(overlay);

    const view = overlay.querySelector('img');
    const captionEl = overlay.querySelector('.clb-caption');

    const close = () => {
      overlay.classList.remove('open');
      document.body.classList.remove('clb-open');
      view.src = '';
      captionEl.textContent = '';
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('clb-close')) {
        close();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    let startY = null;
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (startY !== null && e.touches[0].clientY - startY > 50) {
        close();
      }
    };
    const handleTouchEnd = () => {
      startY = null;
    };

    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchmove', handleTouchMove, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });

    const handleClick = (e) => {
      if (!isMobile()) return;

      const card = e.target.closest('.card, .gallery-card');
      if (!card) return;
      
      e.preventDefault();

      const img = card.querySelector('img');
      if (!img) return;

      const src = img.currentSrc || img.src;
      view.src = src;
      view.alt = img.alt || '';
      
      captionEl.textContent = img.alt || '';

      overlay.classList.add('open');
      document.body.classList.add('clb-open');
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
      }
    };
  }, []);

  return null;
};

export default MobileImageLightbox;