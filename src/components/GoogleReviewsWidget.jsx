import React, { useEffect } from 'react';

const GoogleReviewsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js'; // Updated to elfsightcdn.com as per user request
    script.defer = true;
    script.async = true; // Added async attribute
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts to avoid memory leaks
      const elfsightScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
      if (elfsightScript) {
        document.body.removeChild(elfsightScript);
      }
      // Elfsight widgets often create a container div; this attempts a more robust cleanup.
      const elfsightAppDiv = document.querySelector('.elfsight-app-fef5899d-65ce-44f4-aadd-e992fac7f7c2');
      if (elfsightAppDiv && elfsightAppDiv.parentNode) {
        // Find the top-level elfsight container if it exists
        let container = elfsightAppDiv.closest('[id^="elfsight-app-"]'); // Generic selector for elfsight containers
        if (!container) {
          container = elfsightAppDiv.parentNode;
        }
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    };
  }, []);

  return (
    <section className="section-padding bg-background border-y border-border">
        <div className="container-content text-center">
             <h2 className="h2 text-foreground mb-4">
                What Our Clients Say
             </h2>
             <p className="p-body text-muted-foreground max-w-3xl mx-auto mb-12">
                Our 5-star rating on Google reflects our commitment to creating unforgettable holiday moments for every family.
             </p>
            {/* The actual Elfsight widget will inject itself into this div */}
            <div className="elfsight-app-fef5899d-65ce-44f4-aadd-e992fac7f7c2" data-elfsight-app-lazy></div>
        </div>
    </section>
  );
};

export default GoogleReviewsWidget;