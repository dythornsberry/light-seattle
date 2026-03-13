import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownBanner = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const calculateMessage = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today to start of day

      const currentYear = today.getFullYear();
      let christmasDate = new Date(currentYear, 11, 25); // December 25th

      // If Christmas has already passed this year, set it for next year
      if (today > christmasDate) {
        christmasDate = new Date(currentYear + 1, 11, 25);
      }

      const diffTime = christmasDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setMessage(`🎄 Only ${diffDays} day${diffDays > 1 ? 's' : ''} until Christmas! Book your installation today!`);
      } else if (diffDays === 0) {
        setMessage('🎄 Merry Christmas! Thank you for a great season!');
      } else { // After Christmas Day
        setMessage('Thank you for a great season! See you next year!');
      }
    };

    // Calculate message initially
    calculateMessage();

    // Set up an interval to update the message daily (if needed for long-running sessions)
    const interval = setInterval(calculateMessage, 1000 * 60 * 60 * 24); // Check once a day

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  if (!message) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-background-alt text-center py-3 px-6 border-b border-border shadow-md"
    >
      <p className="font-medium text-primary text-sm md:text-base whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis px-2">
        {message}
      </p>
    </motion.div>
  );
};

export default CountdownBanner;