import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';

function ServiceArea() {
  const fadeInUp = useFadeInUpAnimation();

  const cities = [
    "Seattle", "Kenmore", "Kirkland", "Bellevue", 
    "Woodinville", "Bothell", "Lake Forest Park", "Redmond"
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-green-800 mb-4">
            Serving Greater Seattle
          </h2>
          <p className="text-xl text-gray-600">
            Professional Christmas light installation across the Seattle metro area
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-800">{city}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-lg">
              Based in Kenmore, WA, we proudly serve the entire Seattle metropolitan area with professional holiday lighting services.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img  
              className="rounded-2xl shadow-lg w-full h-80 object-cover" 
              alt="Seattle area map showing service locations"
             src="https://images.unsplash.com/photo-1649656946028-f34826284134" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ServiceArea;