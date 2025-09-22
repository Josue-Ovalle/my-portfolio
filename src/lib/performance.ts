interface PerformanceMetrics {
  name: string;
  value: number;
  id: string;
  url: string;
  timestamp: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new PerformanceMonitor();
    }
    return this.instance;
  }

  reportMetric(metric: PerformanceMetrics) {
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vital', {
        name: metric.name,
        value: Math.round(metric.value),
        event_label: metric.id,
      });
    }

    // Log performance issues
    if (metric.name === 'LCP' && metric.value > 2500) {
      console.warn(`Poor LCP: ${metric.value}ms`);
    }
  }
}