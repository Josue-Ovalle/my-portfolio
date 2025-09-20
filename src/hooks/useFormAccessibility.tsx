import React, { useCallback, useRef } from 'react';

interface FormAccessibilityOptions {
  announceErrors?: boolean;
  announceSuccess?: boolean;
}

export const useFormAccessibility = (options: FormAccessibilityOptions = {}) => {
  const announceRef = useRef<HTMLDivElement>(null);
  const { announceErrors = true, announceSuccess: announceSuccessOpt = true } = options;

  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      // Clear previous message
      announceRef.current.textContent = '';

      // Set aria-live priority
      announceRef.current.setAttribute('aria-live', priority);

      // Add new message with slight delay to ensure screen readers catch it
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = message;
        }
      }, 100);

      // Clear message after it's been announced
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 3000);
    }
  }, []);

  const announceError = useCallback((fieldName: string, errorMessage: string) => {
    if (announceErrors) {
      announceToScreenReader(`Error in ${fieldName}: ${errorMessage}`, 'assertive');
    }
  }, [announceErrors, announceToScreenReader]);

  const announceSuccess = useCallback((message: string) => {
    if (announceSuccessOpt) {
      announceToScreenReader(message, 'polite');
    }
  }, [announceSuccessOpt, announceToScreenReader]);

  const AriaLiveRegion: React.FC = () => (
    <div
      ref={announceRef}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    ></div>
  );

  return {
    announceError,
    announceSuccess,
    AriaLiveRegion,
    announceToScreenReader
  };
};