import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceAreaMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section-padding bg-background border-y border-border">
      <div className="container-content">
        <motion.div
          className="text-center mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="h2 text-foreground mb-4">
            Our Service Area
          </h2>
          <p className="p-body text-muted-foreground max-w-2xl mx-auto">
            Proudly serving Kenmore and the greater North Seattle area.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-background"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {mapLoaded ? (
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=15rkY40rp-zfqZWUBMldquSqKXJ55HXo&ehbc=2E312F"
              className="w-full h-[480px] md:h-[600px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Service Area Map"
            ></iframe>
          ) : (
            <div
              className="w-full h-[480px] md:h-[600px] flex flex-col items-center justify-center cursor-pointer bg-background-alt hover:bg-background-alt/80 transition-colors"
              onClick={() => setMapLoaded(true)}
            >
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Service Area Map
              </Button>
              <p className="p-small text-muted-foreground mt-3">Serving King & Snohomish Counties</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
