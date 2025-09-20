'use client';

import { motion, MotionProps } from 'framer-motion';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    loadingText = 'Loading...',
    children, 
    className,
    disabled,
    motionProps,
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const baseClasses = "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";
    
    const variantClasses = {
      primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl",
      secondary: "border-2 border-brand-600 dark:border-brand-400 bg-transparent hover:bg-brand-50 dark:hover:bg-brand-900/20 text-brand-700 dark:text-brand-300",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400"
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base", 
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl"
    };

    const isDisabled = disabled || loading;
    const buttonText = loading ? loadingText : children;
    
    // Enhanced aria-label for screen readers
    const enhancedAriaLabel = loading 
      ? `${ariaLabel || buttonText}, loading` 
      : ariaLabel;

    const MotionButton = motion.button;

    return (
      <MotionButton
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={isDisabled}
        aria-label={enhancedAriaLabel}
        aria-busy={loading}
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...motionProps}
        {...props}
      >
        {/* Loading indicator and text for accessibility */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center" aria-live="polite">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">{loadingText}</span>
          </span>
        )}
        {/* Button content */}
        <span className={loading ? 'opacity-0' : 'opacity-100'} aria-hidden={loading}>
          {children}
        </span>
      </MotionButton>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;