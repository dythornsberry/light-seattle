import React, { createContext, useState, useContext } from 'react';

const LightboxContext = createContext();

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider = ({ children }) => {
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    src: '',
    alt: '',
  });

  const openLightbox = (src, alt) => {
    setLightboxState({ isOpen: true, src, alt });
  };

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, src: '', alt: '' });
  };

  const value = {
    ...lightboxState,
    openLightbox,
    closeLightbox,
  };

  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  );
};