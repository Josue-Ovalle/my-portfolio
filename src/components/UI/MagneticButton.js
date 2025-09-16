'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.4,
  distance = 50,
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const button = ref.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distanceFromCenter < distance) {
      setPosition({
        x: deltaX * strength,
        y: deltaY * strength
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;