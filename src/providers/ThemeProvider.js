'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children, ...props }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run this once on mount
    if (hasInitialized.current) return;
    
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    setDarkMode(initialTheme);
    setIsLoaded(true);
    
    if (initialTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    hasInitialized.current = true;
  }, []); // Empty dependency array ensures this runs only once

  const value = {
    darkMode,
    setDarkMode: (newDarkMode) => {
      setDarkMode(newDarkMode);
      const root = window.document.documentElement;
      if (newDarkMode) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};