'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const AccessibleFormField = forwardRef<HTMLInputElement, AccessibleFormFieldProps>(
  ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    onBlur,
    error, 
    required, 
    placeholder,
    description,
    className,
    disabled,
    ...props 
  }, ref) => {
    const fieldId = useId();
    const errorId = useId();
    const descriptionId = useId();

    return (
      <div className={cn("space-y-2", className)}>
        <label 
          htmlFor={fieldId}
          className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {required && (
            <span 
              className="text-red-500 ml-1" 
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
        
        {description && (
          <p 
            id={descriptionId}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {description}
          </p>
        )}
        
        <input
          ref={ref}
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur?.(name)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={[
            description ? descriptionId : null,
            error ? errorId : null
          ].filter(Boolean).join(' ') || undefined}
          className={cn(
            "w-full px-4 py-4 rounded-xl border-2 transition-all duration-300",
            "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
            "placeholder-neutral-500 dark:placeholder-neutral-400",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            error 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
              : "border-neutral-200 dark:border-neutral-700 focus:border-brand-500"
          )}
          {...props}
        />
        
        {error && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
          >
            <svg 
              className="w-4 h-4 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleFormField.displayName = 'AccessibleFormField';

export default AccessibleFormField;