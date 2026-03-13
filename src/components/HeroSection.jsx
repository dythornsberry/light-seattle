import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';
import ImageOptimizer from '@/components/ImageOptimizer';

function HeroSection({ handleQuoteClick, handlePhoneClick }) {
  const fadeInUp = useFadeInUpAnimation();

  return (
    <section className="relative overflow-hidden flex items-center justify-center text-center text-white section-padding min-h-[80vh] md:min-h-[70vh]">
        <div className="absolute inset-0">
            <img
                alt="Festive holiday lighting placeholder"
                className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1606933303114-b937ad01d4f9" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        <div className="container-max relative z-10">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{textShadow: '0px 3px 6px rgba(0,0,0,0.7)'}}>
              Seattle’s Hassle-Free Christmas Light Experts 🎄
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200" style={{textShadow: '0px 1px 3px rgba(0,0,0,0.6)'}}>
              We install, maintain, and store your lights — so you can just enjoy the holidays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleQuoteClick} className="btn-primary text-lg px-10 py-5">
                Get my free quote
              </Button>
              <Button onClick={handlePhoneClick} className="bg-white text-primary hover:bg-gray-100 font-semibold px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>(425) 448-4998</span>
              </Button>
            </div>
          </motion.div>
        </div>
    </section>
  );
}

export default HeroSection;