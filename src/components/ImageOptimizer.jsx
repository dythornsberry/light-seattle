import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ImageOptimizer = ({ 
  src, 
  alt, 
  className, 
  lqipSrc,
  loading = 'lazy', 
  fetchpriority = 'auto', 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!lqipSrc) {
      // If no placeholder, assume it's loaded to show the main image directly
      setIsLoaded(true);
      return;
    }
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src, lqipSrc]);

  if (!src) return null;

  const isUnsplash = src.includes('images.unsplash.com');
  const isCdn = src.includes('horizons-cdn.hostinger.com');

  if (lqipSrc) {
    return (
      <div className={`relative ${className}`}>
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={lqipSrc}
                alt={alt}
                className="w-full h-full object-cover"
                style={{ filter: 'blur(20px)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loading}
          fetchPriority={fetchpriority}
          {...props}
        />
      </div>
    );
  }

  if (isUnsplash) {
    const url = new URL(src);
    const baseSrc = `${url.protocol}//${url.host}${url.pathname}`;
    
    const srcset = `
      ${baseSrc}?w=400&q=75&fm=webp 400w,
      ${baseSrc}?w=800&q=75&fm=webp 800w,
      ${baseSrc}?w=1600&q=75&fm=webp 1600w,
      ${baseSrc}?w=1920&q=75&fm=webp 1920w
    `;
    
    const fallbackSrcset = `
      ${baseSrc}?w=400&q=75&fm=jpg 400w,
      ${baseSrc}?w=800&q=75&fm=jpg 800w,
      ${baseSrc}?w=1600&q=75&fm=jpg 1600w,
      ${baseSrc}?w=1920&q=75&fm=jpg 1920w
    `;

    return (
      <picture>
        <source type="image/webp" srcSet={srcset} />
        <source type="image/jpeg" srcSet={fallbackSrcset} />
        <img
          src={`${baseSrc}?w=800&q=75&fm=jpg`}
          alt={alt}
          className={className}
          loading={loading}
          fetchPriority={fetchpriority}
          {...props}
        />
      </picture>
    );
  }
  
  return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchpriority}
        {...props}
      />
  );
};

export default ImageOptimizer;