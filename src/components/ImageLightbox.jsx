import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copyright } from 'lucide-react';
import { useLightbox } from '@/context/LightboxContext.jsx';
import ImageOptimizer from '@/components/ImageOptimizer';

export default function ImageLightbox() {
  const { isOpen, src, alt, closeLightbox } = useLightbox();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageOptimizer 
              src={src} 
              alt={alt} 
              className="w-full h-full object-contain rounded-lg"
              loading="eager"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center text-white font-bold text-lg bg-black/40 p-2 rounded-lg">
                    <Copyright className="w-5 h-5 mr-2" />
                    <span>Seattle Christmas Lights</span>
                </div>
            </div>
            <p className="text-center text-white/80 mt-2 text-sm">{alt}</p>
          </motion.div>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
            aria-label="Close image lightbox"
          >
            <X size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}