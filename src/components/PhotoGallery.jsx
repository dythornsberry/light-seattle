import React from 'react';
import { motion } from 'framer-motion';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';
import useStaggerChildrenAnimation from '@/hooks/useStaggerChildrenAnimation';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Copyright } from 'lucide-react';
import { useLightbox } from '@/context/LightboxContext.jsx';

function PhotoGallery() {
  const fadeInUp = useFadeInUpAnimation();
  const staggerChildren = useStaggerChildrenAnimation();
  const { openLightbox } = useLightbox();

  const images = [
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/ca59239f63793414b4f93946aa154414.webp",
      alt: "Stunning modern home with snow-covered roof and warm white Christmas lights"
    },
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/bc42009db4c2f40ba9ca749ecf441a40.webp",
      alt: "Magical driveway lined with trees wrapped in golden Christmas lights"
    },
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/2aa45986ebf4eaa1d02e563e38a54209.webp",
      alt: "Vibrant home with multi-colored lights on roofline and wrapped around trees"
    },
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/e9801b7b43855577a4c0076ead638a1b.webp",
      alt: "Classic home with festive red and white Christmas lights along the roof and porch"
    },
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/d8c6cab5281de0583599e22ee0ea1bbd.webp",
      alt: "Cozy home with warm white lights on the roofline and a brightly lit tree"
    },
    {
      src: "https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/eaadf45f3551924b0fcec3671b34b607.webp",
      alt: "Large estate with elegant red and white Christmas lights and a wreath"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-green-800 mb-4">
            See Our Work
          </h2>
          <p className="text-xl text-gray-600">
            Beautiful holiday lighting installations across the Seattle area
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {images.map((image, index) => (
             <motion.div 
              key={index}
              className="card-hover group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              onClick={() => openLightbox(image.src, image.alt)}
            >
              <ImageOptimizer  
                className="w-full h-64 object-cover" 
                alt={image.alt}
                src={image.src} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
                  <div className="flex items-center text-white font-bold text-lg bg-black/40 p-2 rounded-lg">
                      <Copyright className="w-5 h-5 mr-2" />
                      <span>Seattle Christmas Lights</span>
                  </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PhotoGallery;