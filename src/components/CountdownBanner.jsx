import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownBanner = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const calculateMessage = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const currentYear = today.getFullYear();
      let christmasDate = new Date(currentYear, 11, 25);

      if (today > christmasDate) {
        christmasDate = new Date(currentYear + 1, 11, 25);
      }

      const diffTime = christmasDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setMessage(`🎄 Only ${diffDays} day${diffDays > 1 ? 's' : ''} until Christmas! Book your installation today!`);
      } else if (diffDays === 0) {
        setMessage('🎄 Merry Christmas! Thank you for a great season!');
      } else {
        setMessage('Thank you for a great season! See you next year!');
      }
    };

    calculateMessage();
    const interval = setInterval(calculateMessage, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[44px] bg-background-alt border-b border-border">
      {message && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center py-3 px-6 shadow-md"
        >
          <p className="font-medium text-primary text-sm md:text-base whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis px-2">
            {message}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CountdownBanner;
