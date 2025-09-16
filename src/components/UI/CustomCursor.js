'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
        setCursorVariant('pointer');
        
        // Check for custom cursor text
        const cursorTextAttr = target.getAttribute('data-cursor-text');
        if (cursorTextAttr) {
          setCursorText(cursorTextAttr);
          setCursorVariant('text');
        }
      }
      
      // Check for project cards
      if (target.closest('.project-card, .card-interactive')) {
        setCursorVariant('project');
        setCursorText('View');
      }
      
      // Check for magnetic elements
      if (target.matches('.magnetic')) {
        setCursorVariant('magnetic');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
      setCursorVariant('default');
    };

    // Add global mouse listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(14, 165, 233, 0.8)',
      border: '2px solid rgba(14, 165, 233, 0.4)',
      scale: 1,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      border: '2px solid rgba(14, 165, 233, 0.8)',
      scale: 1,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(14, 165, 233, 0.9)',
      border: 'none',
      scale: 1,
    },
    project: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(139, 92, 246, 0.9)',
      border: '2px solid rgba(139, 92, 246, 0.4)',
      scale: 1,
    },
    magnetic: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      border: '2px solid rgba(16, 185, 129, 0.4)',
      scale: 1.2,
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-white text-sm font-semibold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8,
          height: 8,
          backgroundColor: 'rgba(14, 165, 233, 0.3)',
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          delay: 0.05
        }}
      />
    </>
  );
};

export default CustomCursor;