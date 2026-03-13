import React, { useState, useEffect } from 'react';

const useExitIntent = (showAfter = 10000, active = true) => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    if (!active) return;

    let timeoutId;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };
    
    const handleTouchMove = (e) => {
      if (window.scrollY < 100) { 
        setShowExitIntent(true);
      }
    };

    const setupListeners = () => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('touchmove', handleTouchMove);
    };

    timeoutId = setTimeout(setupListeners, showAfter);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showAfter, active]);

  return [showExitIntent, setShowExitIntent];
};

export default useExitIntent;