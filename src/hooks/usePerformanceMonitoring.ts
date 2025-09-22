import { useEffect, useCallback, useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface PerformanceMetrics {
  cls: number;
  fid: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}

// Only one export for the hook below

export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cls: 0,
    fid: 0,
    fcp: 0,
    lcp: 0,
    ttfb: 0
  });

  const reportMetric = useCallback((metric: any) => {
    // Only in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric);
    }
    
    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', 'web_vital', {
        name: metric.name,
        value: Math.round(metric.value),
        event_label: metric.id,
      });
    }
  }, []);

  const observePerformance = useCallback(() => {
    // Observe CLS (Cumulative Layout Shift)
    if ('PerformanceObserver' in window) {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            setMetrics(prev => ({
              ...prev,
              cls: prev.cls + (entry as any).value
            }));
          }
        }
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // Layout-shift observer not supported
      }

      // Observe FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          reportMetric({
            name: 'FID',
            value: (entry as any).processingStart - (entry as any).startTime,
            id: entry.entryType,
          });
        }
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // First-input observer not supported
      }

      // Observe LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          reportMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            id: lastEntry.entryType,
          });
        }
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP observer not supported
      }

      // Observe FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            reportMetric({
              name: 'FCP',
              value: entry.startTime,
              id: entry.entryType,
            });
          }
        }
      });

      try {
        fcpObserver.observe({ type: 'paint', buffered: true });
      } catch (e) {
        // Paint observer not supported
      }
    }

    // TTFB (Time To First Byte)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      reportMetric({
        name: 'TTFB',
        value: ttfb,
        id: 'navigation',
      });
    }
  }, [reportMetric]);

  useEffect(() => {
    observePerformance();
    
    // Clean up observers on unmount
    return () => {
      // Observers will be automatically disconnected when the page unloads
    };
  }, [observePerformance]);

  return metrics;
};