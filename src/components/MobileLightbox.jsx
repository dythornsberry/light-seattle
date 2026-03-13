import React, { useEffect } from 'react';

const MobileLightbox = () => {
  useEffect(() => {
    // Check if the overlay has already been added to prevent duplicates on HMR
    if (document.querySelector('.clb-overlay')) {
      return;
    }

    // Only enable on mobile widths
    const isMobile = () => window.matchMedia('(max-width: 430px)').matches;

    // Build overlay once
    const overlay = document.createElement('div');
    overlay.className = 'clb-overlay';
    overlay.innerHTML = '<img alt=""><div class="clb-caption" aria-live="polite"></div><button class="clb-close" aria-label="Close">×</button>';
    document.body.appendChild(overlay);
    const view = overlay.querySelector('img');
    const captionEl = overlay.querySelector('.clb-caption');

    const close = () => { 
      overlay.classList.remove('open'); 
      document.body.classList.remove('clb-open'); 
      view.src = ''; 
      captionEl.textContent=''; 
    };

    overlay.addEventListener('click', (e)=>{ if(e.target === overlay || e.target.classList.contains('clb-close')) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

    // Simple swipe-down to close
    let startY=null;
    overlay.addEventListener('touchstart', e=> startY = e.touches[0].clientY, {passive:true});
    overlay.addEventListener('touchmove', e=>{
      if(startY!==null && e.touches[0].clientY - startY > 50) close();
    }, {passive:true});
    overlay.addEventListener('touchend', ()=> startY=null, {passive:true});
    
    const initLightboxForContainers = () => {
      // Containers to target on HOME and GALLERY
      const containers = document.querySelectorAll([
        'body.home section#gallery-strip',
        'body.gallery .gallery-section'
      ].join(','));
      
      if (!containers.length) return;

      // Delegate clicks from any image inside those containers
      containers.forEach(c=>{
        c.addEventListener('click', function(e){
          const card = e.target.closest('.card, .gallery-card');
          if (!card || !isMobile()) return;
          
          e.preventDefault();

          const img = card.querySelector('img');
          if (!img) return;
          
          // load the largest available source
          const src = img.currentSrc || img.src;
          view.src = src;
          
          // The full caption is stored in the alt attribute
          const fullCaption = img.alt || '';
          view.alt = fullCaption;
          captionEl.textContent = fullCaption;

          overlay.classList.add('open');
          document.body.classList.add('clb-open');
        });
      });
    };

    // The DOM might not be fully ready for querySelectorAll, let's wait a tick
    const observer = new MutationObserver((mutations, obs) => {
      const homeGallery = document.querySelector('body.home section#gallery-strip');
      const galleryPage = document.querySelector('body.gallery .gallery-section');
      if (homeGallery || galleryPage) {
        initLightboxForContainers();
        obs.disconnect(); // Stop observing once we've found our targets
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Fallback in case observer is slow
    setTimeout(initLightboxForContainers, 500);

    return () => {
      // Cleanup if component unmounts
      const overlayEl = document.querySelector('.clb-overlay');
      if (overlayEl) {
        document.body.removeChild(overlayEl);
      }
      observer.disconnect();
    }
  }, []);

  return null;
};

export default MobileLightbox;