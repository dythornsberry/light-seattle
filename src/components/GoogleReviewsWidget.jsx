import React, { useEffect, useRef, useState } from 'react';

const GoogleReviewsWidget = () => {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loaded) {
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);
        setLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (loaded) {
        const elfsightScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
        if (elfsightScript) {
          document.body.removeChild(elfsightScript);
        }
      }
    };
  }, [loaded]);

  return (
    <section ref={sectionRef} className="section-padding bg-background border-y border-border">
        <div className="container-content text-center">
             <h2 className="h2 text-foreground mb-4">
                What Our Clients Say
             </h2>
             <p className="p-body text-muted-foreground max-w-3xl mx-auto mb-12">
                Our 5-star rating on Google reflects our commitment to creating unforgettable holiday moments for every family.
             </p>
            <div className="elfsight-app-fef5899d-65ce-44f4-aadd-e992fac7f7c2" data-elfsight-app-lazy></div>
        </div>
    </section>
  );
};

export default GoogleReviewsWidget;
