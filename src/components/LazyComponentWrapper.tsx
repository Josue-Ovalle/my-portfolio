'use client';

import { Suspense, ComponentType, lazy } from 'react';
import { AlertTriangle } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  name?: string;
}

const DefaultLoadingFallback = ({ name }: { name?: string }) => (
  <div 
    className="min-h-[50vh] flex items-center justify-center" 
    role="status" 
    aria-label={`Loading ${name || 'content'}`}
  >
    <div className="text-center">
      <div 
        className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
        aria-hidden="true"
      />
      <p className="text-neutral-600 dark:text-neutral-400">
        Loading {name || 'section'}...
      </p>
    </div>
  </div>
);

const DefaultErrorFallback = ({ name }: { name?: string }) => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Failed to load {name || 'section'}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        This section couldn&apos;t be loaded. Please refresh the page or try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="btn-secondary"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export const LazyComponentWrapper = ({ 
  children, 
  fallback, 
  errorFallback, 
  name 
}: LazyWrapperProps) => (
  <ErrorBoundary fallback={errorFallback || <DefaultErrorFallback name={name ?? ''} />}>
    <Suspense fallback={fallback || <DefaultLoadingFallback name={name ?? ''} />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Helper function to create lazy components with error handling
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  name?: string
) => {
  const LazyComponent = lazy(() => 
    importFn().catch(() => ({
      default: (() => <DefaultErrorFallback name={name ?? ''} />) as ComponentType<any>
    }))
  );
  
  return LazyComponent;
};