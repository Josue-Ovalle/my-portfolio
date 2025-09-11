'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return { ref, isInView };
};

export const ScrollAnimationWrapper = ({ children, className = '' }) => {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};