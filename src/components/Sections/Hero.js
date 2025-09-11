'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { heroAnimations } from '@/utils/animations';

const Hero = () => {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const offsetTop = aboutSection.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = () => {
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

  return (
    <section id="hero" className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white/50 to-purple-50/50 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950/50" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Very Subtle Floating Elements */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary-200/20 dark:bg-primary-800/20 rounded-full opacity-10 blur-lg"
      />
      
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/20 rounded-full opacity-10 blur-lg"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 border border-primary-200/50 dark:border-primary-700/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Enhanced Development</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            {...heroAnimations.title}
            className="heading-lg text-neutral-900 dark:text-neutral-100 mb-6"
          >
            Building{' '}
            <span className="text-gradient">fast, modern websites</span>
            {' '}with AI assistance
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...heroAnimations.subtitle}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            I combine traditional coding skills with cutting-edge AI tools to deliver 
            exceptional web experiences faster and more efficiently than ever before.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...heroAnimations.cta}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary group flex items-center gap-2 text-lg px-8 py-4"
            >
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              onClick={handleScrollToAbout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary group flex items-center gap-2 text-lg px-8 py-4"
            >
              Learn More
              <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </motion.button>
          </motion.div>

          {/* Stats - Moved up for better prominence */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-light dark:text-accent-dark mb-2">50%</div>
              <div className="text-neutral-600 dark:text-neutral-400">Faster Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-light dark:text-accent-dark mb-2">100+</div>
              <div className="text-neutral-600 dark:text-neutral-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-light dark:text-accent-dark mb-2">24/7</div>
              <div className="text-neutral-600 dark:text-neutral-400">AI-Powered Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToAbout}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 backdrop-blur-sm"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
      </motion.button>
    </section>
  );
};

export default Hero;