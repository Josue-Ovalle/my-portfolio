'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    
    const monitorPerformance = () => {
      // Monitor CLS (Cumulative Layout Shift)
      let clsValue = 0;
      let clsEntries = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      
      // Report to console or your analytics service
      window.addEventListener('beforeunload', () => {
        if (clsValue > 0.1) {
          console.warn('CLS is higher than recommended:', clsValue);
        }
      });
    };
    
    monitorPerformance();
  }, []);

  return null;
}