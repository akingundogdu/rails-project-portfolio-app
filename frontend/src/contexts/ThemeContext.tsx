import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { type Theme, getSystemTheme, getStoredTheme, storeTheme, applyTheme } from '@/lib/theme';

export interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Create theme context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}) => {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme(storageKey) ?? defaultTheme;
  });

  // Calculate actual theme (resolve 'system' to 'light' or 'dark')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  });

  // Update theme and store in localStorage
  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
    storeTheme(newTheme, storageKey);
  };

  // Toggle between light and dark (skip system)
  const toggleTheme = (): void => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light');
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (): void => {
      if (theme === 'system') {
        const systemTheme = getSystemTheme();
        setActualTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update actual theme when theme changes
  useEffect(() => {
    const newActualTheme = theme === 'system' ? getSystemTheme() : theme;
    setActualTheme(newActualTheme);
    applyTheme(newActualTheme);
  }, [theme]);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(actualTheme);
  }, [actualTheme]);

  const contextValue: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 