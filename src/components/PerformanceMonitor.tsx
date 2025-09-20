'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    const monitorPerformance = () => {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = {
            name: entry.name,
            value: entry.startTime,
            id: entry.entryType
          };
          
          analytics.trackPerformance(metric);
          
          // Log warnings for poor performance
          if (entry.name === 'largest-contentful-paint' && entry.startTime > 2500) {
            console.warn('LCP is slower than recommended:', entry.startTime);
          }
          
          if (entry.name === 'first-input-delay' && (entry as any).processingStart - (entry as any).startTime > 100) {
            console.warn('FID is slower than recommended:', (entry as any).processingStart - (entry as any).startTime);
          }
        }
      });
      
      // Observe different performance metrics
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
      
      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // Track slow resources
          if (resource.duration > 1000) {
            analytics.trackEvent({
              action: 'slow_resource',
              category: 'performance',
              label: resource.name,
              value: Math.round(resource.duration)
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
    
    // Initialize analytics and monitoring
    analytics.initialize();
    monitorPerformance();
    
    // Monitor memory usage (if supported)
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
          console.warn('High memory usage detected:', memory.usedJSHeapSize / 1024 / 1024, 'MB');
        }
      };
      
      const memoryInterval = setInterval(checkMemory, 30000); // Check every 30 seconds
      return () => clearInterval(memoryInterval);
    }
  }, []);

  return null;
}