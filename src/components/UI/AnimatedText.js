'use client';

import { motion } from 'framer-motion';
import { useRevealAnimation } from '@/hooks/useAdvancedScrollAnimation';

const AnimatedText = ({ 
  text, 
  className = '',
  variant = 'words', // 'words', 'letters', 'lines'
  delay = 0.1,
  duration = 0.6,
  ...props 
}) => {
  const { ref, isInView } = useRevealAnimation();

  const getAnimationVariants = () => {
    const baseVariants = {
      initial: { 
        opacity: 0,
        y: 30,
        filter: 'blur(4px)'
      },
      animate: { 
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    };

    if (variant === 'letters') {
      return {
        container: {
          animate: {
            transition: {
              staggerChildren: delay / 3,
              delayChildren: 0.1
            }
          }
        },
        child: baseVariants
      };
    }

    return {
      container: {
        animate: {
          transition: {
            staggerChildren: delay,
            delayChildren: 0.2
          }
        }
      },
      child: baseVariants
    };
  };

  const variants = getAnimationVariants();

  const renderText = () => {
    if (variant === 'letters') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={variants.child}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="inline-block"
          style={{ 
            display: char === ' ' ? 'inline' : 'inline-block',
            minWidth: char === ' ' ? '0.25em' : 'auto'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }

    if (variant === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={variants.child}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ));
    }

    // Default: single element
    return (
      <motion.span
        variants={variants.child}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {text}
      </motion.span>
    );
  };

  return (
    <motion.div
      ref={ref}
      variants={variants.container}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className={className}
      {...props}
    >
      {renderText()}
    </motion.div>
  );
};

export default AnimatedText;