import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCallButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
      className="fixed bottom-5 right-5 z-[100] group"
    >
      <a
        href="tel:4254063445"
        aria-label="Call us: (425) 406-3445"
        className="relative flex items-center justify-center w-14 h-14 bg-[#0B0B0B] rounded-full shadow-lg transition-colors duration-300 hover:bg-primary/90"
      >
        <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
        {/* Desktop Tooltip */}
        <div className="hidden lg:block absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-[#0B0B0B] text-foreground text-sm font-medium rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Call us: (425) 406-3445
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0B0B0B]"></div>
        </div>
      </a>
    </motion.div>
  );
};

export default FloatingCallButton;