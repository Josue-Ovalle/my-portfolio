// Enhanced animation configurations for Framer Motion

export const easing = {
  spring: "circOut",
  smooth: "easeOut",
  bounce: [0.68, -0.55, 0.265, 1.55],
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

export const duration = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Hero section animations
export const heroAnimations = {
  badge: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: easing.bounce, delay: 0.2 }
  },
  title: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easing.easeOut, delay: 0.4 }
  },
  subtitle: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easing.easeOut, delay: 0.6 }
  },
  cta: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easing.easeOut, delay: 0.8 }
  },
  stats: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easing.easeOut, delay: 1.0 }
  }
};

// Stagger animations for lists
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easing.easeOut }
  },
};

// Card animations
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.4, ease: easing.easeOut }
  },
  hover: { 
    scale: 1.03, 
    y: -8,
    boxShadow: "0 25px 50px -10px rgba(14, 165, 233, 0.25)",
    transition: { duration: 0.4, ease: easing.easeOut }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Button animations
export const buttonVariants = {
  primary: {
    rest: { 
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.3)",
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 15px 35px -5px rgba(14, 165, 233, 0.4)",
      transition: { duration: 0.3, ease: easing.easeOut }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },
  secondary: {
    rest: { 
      scale: 1,
      borderColor: "rgba(14, 165, 233, 0.5)",
    },
    hover: { 
      scale: 1.02,
      borderColor: "rgba(14, 165, 233, 1)",
      backgroundColor: "rgba(14, 165, 233, 0.05)",
      transition: { duration: 0.3, ease: easing.easeOut }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: easing.easeOut }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: easing.easeIn }
  }
};

// Scroll-triggered animations
export const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easing.easeOut }
  }
};

// Navigation animations
export const navAnimation = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: easing.easeOut }
  }
};

export const mobileMenuAnimation = {
  hidden: { 
    opacity: 0, 
    x: '100%',
    transition: { duration: 0.3, ease: easing.easeIn }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: easing.easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Loading animations
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut
    }
  }
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easing.easeInOut
    }
  }
};

// Text reveal animation
export const textReveal = {
  hidden: { 
    opacity: 0, 
    y: 30,
    skewY: 3
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: easing.easeOut
    }
  })
};

// Magnetic button effect
export const magneticEffect = {
  rest: { x: 0, y: 0 },
  hover: (offset = { x: 0, y: 0 }) => ({
    x: offset.x * 0.3,
    y: offset.y * 0.3,
    transition: { duration: 0.3, ease: easing.easeOut }
  })
};

// Parallax scroll animation
export const parallaxAnimation = (speed = 0.5) => ({
  animate: {
    y: `${speed * -100}%`,
    transition: {
      duration: 0,
      ease: "linear"
    }
  }
});

// Modal animations
export const modalAnimation = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  },
  modal: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: easing.spring 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: { 
        duration: 0.3, 
        ease: easing.easeIn 
      }
    }
  }
};

// Notification animations
export const notificationAnimation = {
  initial: { opacity: 0, x: 300, scale: 0.8 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: easing.spring }
  },
  exit: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    transition: { duration: 0.3, ease: easing.easeIn }
  }
};

// Progressive loading animation
export const progressiveLoad = (delay = 0) => ({
  initial: { 
    opacity: 0, 
    y: 30,
    filter: "blur(4px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: easing.easeOut,
      delay: delay * 0.1
    }
  }
});

// Custom spring animations
export const springPresets = {
  gentle: {
    type: "spring",
    damping: 20,
    stiffness: 100
  },
  wobbly: {
    type: "spring",
    damping: 8,
    stiffness: 100
  },
  stiff: {
    type: "spring",
    damping: 20,
    stiffness: 300
  },
  slow: {
    type: "spring",
    damping: 40,
    stiffness: 40
  }
};

const animations = {
  easing,
  duration,
  heroAnimations,
  staggerContainer,
  staggerItem,
  cardHover,
  buttonVariants,
  pageTransition,
  scrollAnimation,
  navAnimation,
  mobileMenuAnimation,
  loadingSpinner,
  pulseAnimation,
  floatingAnimation,
  textReveal,
  magneticEffect,
  parallaxAnimation,
  modalAnimation,
  notificationAnimation,
  progressiveLoad,
  springPresets
};

export default animations;