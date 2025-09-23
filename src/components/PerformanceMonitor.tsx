'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const monitorPerformance = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = {
            name: entry.name,
            value: entry.startTime,
            id: entry.entryType,
          };

          analytics.trackPerformance(metric);

          if (entry.name === 'largest-contentful-paint' && entry.startTime > 2500) {
            console.warn('LCP is slower than recommended:', entry.startTime);
          }

          if (
            entry.name === 'first-input-delay' &&
            (entry as any).processingStart - (entry as any).startTime > 100
          ) {
            console.warn(
              'FID is slower than recommended:',
              (entry as any).processingStart - (entry as any).startTime
            );
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }

      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;

          if (resource.duration > 1000) {
            analytics.trackEvent({
              action: 'slow_resource',
              category: 'performance',
              label: resource.name,
              value: Math.round(resource.duration),
            });
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Resource monitoring not supported:', error);
      }
    };

    analytics.initialize();
    monitorPerformance();

    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
          console.warn(
            'High memory usage detected:',
            memory.usedJSHeapSize / 1024 / 1024,
            'MB'
          );
        }
      };

      const memoryInterval = setInterval(checkMemory, 30000);
      return () => clearInterval(memoryInterval);
    }

    // Explicitly return undefined if memory is not supported
    return undefined;
  }, []);

  return null;
}
