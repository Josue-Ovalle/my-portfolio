interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private initialized = false;

  initialize() {
    if (this.initialized) return;
    
    // Initialize Google Analytics 4
    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== 'undefined') {
      window.gtag = window.gtag || function() {
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
      
      this.initialized = true;
    }
  }

  trackEvent({ action, category, label, value }: AnalyticsEvent) {
    if (!this.initialized || typeof window === 'undefined') return;
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  trackPageView(url: string, title?: string) {
    if (!this.initialized || typeof window === 'undefined') return;
    
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
      page_title: title || document.title,
    });
  }

  trackPerformance(metric: { name: string; value: number; id?: string }) {
    if (!this.initialized || typeof window === 'undefined') return;
    
    window.gtag('event', 'web_vital', {
      name: metric.name,
      value: Math.round(metric.value),
      event_label: metric.id,
    });
  }

  trackError(error: Error, context?: string) {
    if (!this.initialized || typeof window === 'undefined') return;
    
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_map: {
        context: context || 'unknown',
        stack: error.stack?.substring(0, 500) // Truncate stack trace
      }
    });
  }

  trackFormSubmission(formName: string, success: boolean, errorType?: string) {
    this.trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'engagement',
      label: `${formName}${errorType ? `_${errorType}` : ''}`,
      value: success ? 1 : 0
    });
  }

  trackUserEngagement(action: string, element: string) {
    this.trackEvent({
      action: action,
      category: 'user_engagement',
      label: element
    });
  }
}

export const analytics = new Analytics();