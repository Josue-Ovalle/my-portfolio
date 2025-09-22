'use client';

import { Component, ReactNode } from 'react';
import type { ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorId: null 
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString()
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Report to Sentry, LogRocket, or similar service
      console.error('Production Error:', error, errorInfo);
      
      // Example Sentry integration:
      // import * as Sentry from '@sentry/react';
      // Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({ hasError: false, error: null, errorId: null });
    } else {
      // Reload the page as last resort
      window.location.reload();
    }
  };

  override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Something went wrong
            </h2>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              We encountered an unexpected error. This has been logged and we&apos;re looking into it.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                disabled={this.retryCount >= this.maxRetries}
                className="btn-primary flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-4 h-4" />
                {this.retryCount >= this.maxRetries ? 'Max retries reached' : 'Try Again'}
              </button>
              
              {this.retryCount >= this.maxRetries && (
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary mx-auto block"
                >
                  Reload Page
                </button>
              )}
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left">
                <summary className="font-medium text-sm cursor-pointer">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;