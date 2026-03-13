import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';

function CallToAction({ handleQuoteClick, handlePhoneClick }) {
  const fadeInUp = useFadeInUpAnimation();

  return (
    <section className="christmas-gradient hero-pattern" data-cta-section>
      <div className="container-custom section-padding">
        <motion.div 
          className="text-center text-white"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-shadow">
            Ready to light up your home?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join hundreds of satisfied customers across the Seattle area. Starting at just $800.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleQuoteClick} className="btn-primary text-white font-bold text-lg px-12 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              Book your free estimate today
            </Button>
            <Button onClick={handlePhoneClick} className="bg-white text-green-800 hover:bg-gray-100 font-bold text-lg px-12 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>(425) 406-3445</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;