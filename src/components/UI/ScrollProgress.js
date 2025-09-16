'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 transform origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Floating Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-8 w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { delay: 1, duration: 0.5 }
        }}
      >
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-neutral-200 dark:text-neutral-600"
          />
          <motion.circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand-500"
            style={{
              pathLength: scrollYProgress
            }}
            strokeLinecap="round"
            strokeDasharray="0 1"
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.span 
            className="text-xs font-medium text-brand-600 dark:text-brand-400"
            style={{
              opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
            }}
          >
            {/* Percentage display can be added here if needed */}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;