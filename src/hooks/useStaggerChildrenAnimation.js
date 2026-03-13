import { useMemo } from 'react';

function useStaggerChildrenAnimation() {
  return useMemo(() => ({
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);
}

export default useStaggerChildrenAnimation;