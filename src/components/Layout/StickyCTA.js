'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the CTA after scrolling past 25% of the viewport height
      if (window.scrollY > window.innerHeight * 0.25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check if user has dismissed the CTA in this session
    const dismissed = sessionStorage.getItem('ctaDismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // Remember dismissal for this browsing session
    sessionStorage.setItem('ctaDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="relative">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 p-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;