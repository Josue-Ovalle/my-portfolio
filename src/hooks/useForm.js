import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (!value || value.trim() === '')) {
      return rules.required;
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
      return rules.custom(value);
    }

    return '';
  }, [validationRules]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(validationRules).forEach(field => {
      allTouched[field] = true;
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
        // You might want to set a general error here
        setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }));
      }
    }
    
    setIsSubmitting(false);
  }, [values, validationRules, validateAll, initialValues]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

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
    isValid: Object.keys(errors).length === 0,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues)
  };
};

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
};

// Form field component helper
export const FormField = ({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  error, 
  touched, 
  onChange, 
  onBlur,
  required = false,
  className = '',
  ...props 
}) => {
  const hasError = error && touched;
  
  const baseClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    ${hasError 
      ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
      : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
    }
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={baseClasses}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={baseClasses}
          {...props}
        />
      )}
      
      {hasError && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};