'use client';

import { motion } from 'framer-motion';
import { use3DTilt } from '@/hooks/useAdvancedScrollAnimation';

const Card3D = ({ 
  children, 
  className = '',
  maxTilt = 12,
  perspective = 1000,
  glareEffect = true,
  ...props 
}) => {
  const { ref, tilt, transform } = use3DTilt(maxTilt, perspective);

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d'
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Glare Effect */}
      {glareEffect && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `linear-gradient(
              ${135 + tilt.y}deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            )`,
            opacity: Math.abs(tilt.x) + Math.abs(tilt.y) > 5 ? 0.6 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Shadow Enhancement */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none -z-10"
        style={{
          transform: `translateZ(-50px) scale(1.05)`,
          filter: 'blur(20px)',
          background: 'rgba(0, 0, 0, 0.2)',
          opacity: (Math.abs(tilt.x) + Math.abs(tilt.y)) / 30
        }}
      />
    </motion.div>
  );
};

export default Card3D;