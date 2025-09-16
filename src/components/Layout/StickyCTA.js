'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.25 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const dismissed = sessionStorage.getItem('ctaDismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const offsetTop = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('ctaDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 300 
          }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="relative">
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-2 -right-2 p-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200 z-10"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </motion.button>
            
            <motion.button
              onClick={handleClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  rotate: isHovered ? 180 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              
              <span>Start a Project</span>
              
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
              
              {/* Subtle background shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;