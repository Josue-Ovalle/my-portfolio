'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';
import { heroAnimations, floatingAnimation, springPresets } from '@/utils/animations';
import { useAdvancedScrollAnimation, useParallax, use3DTilt } from '@/hooks/useAdvancedScrollAnimation';
import AnimatedButton from '@/components/UI/AnimatedButton';
import { useRef, useState, memo } from 'react';

const Hero = memo(() => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], shouldReduceMotion ? [1, 1] : [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { ref: tiltRef, transform } = use3DTilt(5, 1200);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20
    });
  };

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const offsetTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 pt-24 md:pt-28 pb-12 md:pb-16"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient overlay with parallax */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-purple-500/5 to-green-500/5"
        />
        
        {/* Enhanced floating orbs with 3D effect */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`
          }}
        />
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-brand-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.3}px, 0)`
          }}
        />
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-green-400/20 rounded-full blur-3xl"
          style={{
            transform: `translate3d(${mousePosition.x * 0.8}px, ${mousePosition.y * -0.4}px, 0)`
          }}
        />
        
        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 bg-grid opacity-30"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/5 right-1/5 w-6 h-6 border-2 border-brand-400/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-purple-400/30 rounded-full"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div ref={tiltRef} className="relative z-10 container mx-auto container-padding text-center">
        <div className="max-w-5xl mx-auto" style={{ transform }}>
          
          {/* Enhanced Badge with micro-interaction */}
          <motion.div
            {...heroAnimations.badge}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border mb-8 group cursor-pointer magnetic"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)"
            }}
            transition={springPresets.gentle}
            data-cursor-text="Available"
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              />
              <motion.div
                animate={{ rotate: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </motion.div>
            </div>
            <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">
              Available for Premium Projects
            </span>
          </motion.div>

          {/* Enhanced Main Heading with stagger animation */}
          <motion.div
            {...heroAnimations.title}
            className="mb-8"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          >
            <h1 className="heading-hero text-gray-900 dark:text-white mb-4">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Crafting{' '}
              </motion.span>
              <span className="relative">
                <motion.span 
                  className="text-gradient-brand"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  exceptional
                </motion.span>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-brand-600/20 to-purple-600/20 blur-lg -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                web experiences
              </motion.span>
            </h1>
            
            <motion.div 
              className="flex items-center justify-center gap-4 text-lg text-brand-600 dark:text-brand-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Code2 className="w-5 h-5" />
              </motion.div>
              <span>Frontend Developer</span>
              <div className="w-1 h-1 bg-brand-500 rounded-full" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <span>Performance Focused</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            {...heroAnimations.subtitle}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            I create <strong className="font-semibold text-gray-900 dark:text-white">modern, performant websites</strong> that deliver measurable business results. 
            Specializing in React, Next.js, and premium user experiences that convert visitors into customers.
          </motion.p>

          {/* Enhanced CTA Buttons with new AnimatedButton component */}
          <motion.div
            {...heroAnimations.cta}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <AnimatedButton
              onClick={() => handleScrollToSection('contact')}
              variant="primary"
              size="lg"
              magnetic={true}
              data-cursor-text="Let's Talk"
              className="flex items-center gap-3"
            >
              <span className="font-semibold">Start Your Project</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </AnimatedButton>

            <AnimatedButton
              onClick={() => handleScrollToSection('portfolio')}
              variant="secondary"
              size="lg"
              magnetic={true}
              data-cursor-text="Explore"
              className="flex items-center gap-3"
            >
              <span className="font-semibold">View My Work</span>
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </AnimatedButton>
          </motion.div>

          {/* Enhanced Stats with micro-interactions */}
          <motion.div
            {...heroAnimations.stats}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "50+", label: "Projects Delivered", desc: "Successful launches" },
              { value: "98%", label: "Client Satisfaction", desc: "Happy clients" },
              { value: "24/7", label: "Fast Turnaround", desc: "Quick delivery" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer card-interactive"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(14, 165, 233, 0.15)"
                }}
                data-cursor-text="Stat"
              >
                <motion.div 
                  className="text-4xl font-bold text-gradient-brand mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.button
        onClick={() => handleScrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 rounded-full glass hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 magnetic"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ 
          scale: 1.1, 
          y: -2,
          boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)"
        }}
        aria-label="Scroll to about section"
        data-cursor-text="Scroll"
      >
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ChevronDown className="w-6 h-6 text-brand-600 dark:text-brand-400" />
        </motion.div>
      </motion.button>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;