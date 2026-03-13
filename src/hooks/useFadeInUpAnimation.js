import { useMemo } from 'react';

function useFadeInUpAnimation() {
  return useMemo(() => ({
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.3 }
  }), []);
}

export default useFadeInUpAnimation;