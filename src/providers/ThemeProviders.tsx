'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import type { ThemeContextType, ThemeMode } from '@/types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  enableSystem?: boolean;
  attribute?: string;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  enableSystem = true,
  attribute = 'class',
  storageKey = 'theme',
  ...props 
}: ThemeProviderProps) {
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Only run this once on mount
    if (hasInitialized.current) return;
    
    const root = window.document.documentElement;
    
    try {
      const savedTheme = localStorage.getItem(storageKey);
      const systemPrefersDark = enableSystem 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches 
        : false;

      let initialTheme: boolean;
      
      if (savedTheme) {
        initialTheme = savedTheme === 'dark';
      } else if (defaultTheme === 'system') {
        initialTheme = systemPrefersDark;
      } else {
        initialTheme = defaultTheme === 'dark';
      }
      
      setDarkModeState(initialTheme);
      setIsLoaded(true);
      
      // Apply theme to DOM
      if (attribute === 'class') {
        if (initialTheme) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      } else {
        root.setAttribute(attribute, initialTheme ? 'dark' : 'light');
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      // Fallback to system preference or default
      const systemPrefersDark = enableSystem 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches 
        : false;
      const fallbackTheme = defaultTheme === 'system' ? systemPrefersDark : defaultTheme === 'dark';
      
      setDarkModeState(fallbackTheme);
      setIsLoaded(true);
      
      if (attribute === 'class') {
        if (fallbackTheme) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      } else {
        root.setAttribute(attribute, fallbackTheme ? 'dark' : 'light');
      }
    }
    
    hasInitialized.current = true;
  }, [defaultTheme, enableSystem, attribute, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || !isLoaded) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if no manual theme is set
      try {
        const savedTheme = localStorage.getItem(storageKey);
        if (!savedTheme || savedTheme === 'system') {
          setDarkModeState(e.matches);
          
          const root = window.document.documentElement;
          if (attribute === 'class') {
            if (e.matches) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          } else {
            root.setAttribute(attribute, e.matches ? 'dark' : 'light');
          }
        }
      } catch (error) {
        console.warn('Error handling system theme change:', error);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [enableSystem, isLoaded, attribute, storageKey]);

  const setDarkMode = (newDarkMode: boolean) => {
    setDarkModeState(newDarkMode);
    
    const root = window.document.documentElement;
    
    if (attribute === 'class') {
      if (newDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else {
      root.setAttribute(attribute, newDarkMode ? 'dark' : 'light');
    }
    
    try {
      localStorage.setItem(storageKey, newDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
    
    // Announce theme change to screen readers
    const announcement = document.getElementById('theme-announcement');
    if (announcement) {
      announcement.textContent = `Switched to ${newDarkMode ? 'dark' : 'light'} mode`;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
    
    // Dispatch custom event for other components to listen to
    const themeEvent = new CustomEvent('theme-change', {
      detail: { darkMode: newDarkMode }
    });
    window.dispatchEvent(themeEvent);
  };

  const value: ThemeContextType = {
    darkMode,
    setDarkMode,
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};