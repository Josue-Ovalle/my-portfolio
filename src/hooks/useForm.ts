import { useState, useCallback } from 'react';
import type { FormValidationRules, UseFormReturn } from '@/types';

const sanitizeInput = (value: string): string => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;');
};

export function useForm<T extends Record<string, string>>(
  initialValues: T, 
  validationRules: FormValidationRules = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateField = useCallback((name: keyof T, value: string): string => {
    const rules = validationRules[name as string];
    if (!rules) return '';

    if (rules.required && (!value || value.trim() === '')) {
      return typeof rules.required === 'string' 
        ? rules.required 
        : `${String(name)} is required`;
    }

    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return rules.email;
      }
    }

    if (rules.minLength && value && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    if (rules.maxLength && value && value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }

    if (rules.pattern && value && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    if (rules.custom && value) {
      return rules.custom(value) || '';
    }

    return '';
  }, [validationRules]);

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field as keyof T, values[field as keyof T] || '');
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((name: keyof T, value: string): void => {
    const sanitizedValue = sanitizeInput(value);
    setValues(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((name: keyof T): void => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name] || '');
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void>
  ): Promise<void> => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(validationRules).forEach(field => {
      allTouched[field as keyof T] = true;
    });
    setTouched(allTouched);

    const isValid = validateAll();
    
    if (isValid) {
      try {
        await onSubmit(values);
        // Reset form on successful submission
        setValues(initialValues);
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error('Form submission error:', error);
        // Set general error
        setErrors(prev => ({ 
          ...prev, 
          submit: 'An error occurred. Please try again.' 
        } as Partial<Record<keyof T, string>>));
      }
    }
    
    setIsSubmitting(false);
  }, [values, validationRules, validateAll, initialValues]);

  const reset = useCallback((): void => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setValue = useCallback((name: keyof T, value: string): void => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string): void => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setFieldError,
    isValid,
    isDirty
  };
}

// Predefined validation rules for common use cases
export const validationRules = {
  contact: {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters'
      },
      maxLength: {
        value: 50,
        message: 'Name must not exceed 50 characters'
      }
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    subject: {
      required: 'Subject is required',
      minLength: {
        value: 5,
        message: 'Subject must be at least 5 characters'
      },
      maxLength: {
        value: 100,
        message: 'Subject must not exceed 100 characters'
      }
    },
    message: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters'
      },
      maxLength: {
        value: 1000,
        message: 'Message must not exceed 1000 characters'
      }
    }
  }
} as const satisfies Record<string, FormValidationRules>;