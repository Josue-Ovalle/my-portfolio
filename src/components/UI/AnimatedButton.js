'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  magnetic = true,
  ripple = true,
  className = '',
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!magnetic) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) * 0.1,
      y: (e.clientY - centerY) * 0.1
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        x,
        y,
        size,
        id: Date.now()
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    if (onClick) onClick(e);
  };

  const variants = {
    primary: {
      rest: {
        background: 'linear-gradient(135deg, rgb(14, 165, 233) 0%, rgb(59, 130, 246) 100%)',
        color: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.3)',
        scale: 1,
      },
      hover: {
        background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(139, 92, 246) 100%)',
        boxShadow: '0 15px 35px -5px rgba(14, 165, 233, 0.4)',
        scale: 1.02,
        y: -2,
      },
      tap: { scale: 0.98, y: 0 }
    },
    secondary: {
      rest: {
        background: 'transparent',
        color: 'rgb(14, 165, 233)',
        borderColor: 'rgb(14, 165, 233)',
        scale: 1,
      },
      hover: {
        background: 'rgba(14, 165, 233, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        scale: 1.02,
        y: -1,
      },
      tap: { scale: 0.98, y: 0 }
    },
    ghost: {
      rest: {
        background: 'transparent',
        color: 'rgb(107, 114, 128)',
        scale: 1,
      },
      hover: {
        background: 'rgba(14, 165, 233, 0.1)',
        color: 'rgb(14, 165, 233)',
        scale: 1.02,
      },
      tap: { scale: 0.98 }
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-semibold 
        transition-all duration-300 focus:outline-none focus:ring-2 
        focus:ring-brand-500 focus:ring-offset-2 cursor-pointer
        ${variant === 'secondary' ? 'border-2' : ''}
        ${sizes[size]} 
        ${className}
      `}
      variants={variants[variant]}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      data-cursor-text={props['data-cursor-text']}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Button content */}
      <motion.span 
        className="relative z-10 flex items-center justify-center gap-2"
        layout
      >
        {children}
      </motion.span>

      {/* Magnetic glow effect */}
      {magnetic && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-r from-brand-400/20 to-purple-400/20"
          animate={{
            opacity: mousePosition.x !== 0 || mousePosition.y !== 0 ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton;