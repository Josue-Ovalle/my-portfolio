'use client';

import { useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Advanced scroll animation hook with multiple trigger points
export const useAdvancedScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const {
    threshold = 0.1,
    triggerOnce = true,
    margin = "0px 0px -100px 0px",
    staggerDelay = 0.1
  } = options;

  const isInView = useInView(ref, { 
    once: triggerOnce, 
    threshold,
    margin
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return { 
    ref, 
    isInView, 
    hasAnimated,
    controls: isInView ? "visible" : "hidden"
  };
};

// Parallax scroll effect hook
export const useParallax = (speed = 0.5, offset = 0) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return { ref, y, opacity, scrollYProgress };
};

// Advanced reveal animation hook
export const useRevealAnimation = (direction = 'up', distance = 50) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance }
  };
  
  const initial = {
    opacity: 0,
    ...directions[direction]
  };
  
  const animate = isInView ? {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  } : initial;
  
  return { ref, initial, animate, isInView };
};

// Stagger children animation hook
export const useStaggerChildren = (delay = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  return { 
    ref, 
    container, 
    item, 
    isInView,
    controls: isInView ? "visible" : "hidden"
  };
};

// Mouse follow effect hook
export const useMouseFollow = (strength = 0.1) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      setElementPosition({ x: deltaX, y: deltaY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);
  
  return { ref, mousePosition, elementPosition };
};

// 3D tilt effect hook
export const use3DTilt = (maxTilt = 15, perspective = 1000) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
      
      setTilt({ x: -rotateX, y: rotateY });
    };
    
    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);
  
  return { 
    ref, 
    tilt,
    transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
  };
};