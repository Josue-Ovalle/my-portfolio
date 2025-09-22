'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const mobileMenuRef = useRef(null);
  const skipLinkRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  
  useClickOutside(mobileMenuRef, () => setIsMenuOpen(false));

  const navigationItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to section - FIXED VERSION
  const handleNavClick = (href, event) => {
    event.preventDefault();
    
    // Remove the hash to get the element ID
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      // Get actual header height dynamically
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      
      // Calculate position with proper offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, href) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(href, event);
      // Announce navigation to screen readers
      const announcement = document.getElementById('navigation-announcement');
      if (announcement) {
        const sectionName = href.replace('#', '');
        announcement.textContent = `Navigating to ${sectionName} section`;
      }
    }
  };

  // Handle escape key and focus management for mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleFocusTrap = (event) => {
      if (!isMenuOpen) return;

      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleFocusTrap);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const firstFocusable = mobileMenuRef.current?.querySelector('a, button');
      firstFocusable?.focus();
    }
  }, [isMenuOpen]);

  // Enhanced header variants for desktop animation
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  // Desktop navigation item animation
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Logo animation
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Actions animation
  const actionsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
        onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      >
        Skip to main content
      </a>

      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50' 
            : 'bg-transparent'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50
        }}
        role="banner"
      >
        <nav 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          role="navigation" 
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              className="flex-shrink-0"
            >
              <a 
                href="#hero"
                onClick={(e) => handleNavClick('#hero', e)}
                onKeyDown={(e) => handleKeyDown(e, '#hero')}
                className="text-2xl font-bold text-gradient-brand focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 rounded-sm px-1"
                aria-label="Josué Ovalle - Go to home section"
              >
                JO
              </a>
            </motion.div>

            {/* Desktop Navigation - Now with animations */}
            <div className="hidden md:block">
              <motion.ul 
                className="ml-10 flex items-baseline space-x-8" 
                role="list"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={navItemVariants}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      className={`nav-link focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 px-2 py-1 rounded ${
                        activeSection === item.href.substring(1) 
                          ? 'text-brand-600 dark:text-brand-400 font-semibold' 
                          : ''
                      }`}
                      aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Actions */}
            <motion.div 
              className="flex items-center space-x-4"
              variants={actionsVariants}
            >
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                aria-pressed={darkMode}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </motion.button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Enhanced Overlay with proper viewport coverage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100vw',
                  height: '100vh',
                  minHeight: '100vh'
                }}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />
              
              {/* Menu Panel with higher z-index */}
              <motion.div
                id="mobile-menu"
                ref={mobileMenuRef}
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-neutral-950 shadow-2xl z-[9999] md:hidden"
                style={{
                  maxWidth: '320px',
                  minHeight: '100vh',
                  height: '100vh'
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
              >
                <div className="p-6 h-full flex flex-col overflow-y-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <h2 
                      id="mobile-menu-title" 
                      className="text-xl font-bold text-neutral-900 dark:text-neutral-100"
                    >
                      Navigation
                    </h2>
                    <button
                      ref={firstFocusableRef}
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* Navigation items */}
                  <nav className="flex-1 space-y-2" role="list">
                    {navigationItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(item.href, e)}
                        onKeyDown={(e) => handleKeyDown(e, item.href)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index, ease: [0.4, 0, 0.2, 1] }}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                          activeSection === item.href.substring(1) 
                            ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20' 
                            : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                        aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                        ref={index === navigationItems.length - 1 ? lastFocusableRef : null}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </nav>
                  
                  {/* Footer info */}
                  <div className="pt-8 mt-auto border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                      <span>Available for projects</span>
                      <div 
                        className="w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                        aria-label="Available status indicator"
                        role="img"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;