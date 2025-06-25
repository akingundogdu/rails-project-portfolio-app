export type Theme = 'light' | 'dark' | 'system';

/**
 * Get system theme preference
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Get theme from localStorage
 */
export const getStoredTheme = (storageKey: string): Theme | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(storageKey);
    return stored as Theme | null;
  } catch {
    return null;
  }
};

/**
 * Store theme in localStorage
 */
export const storeTheme = (theme: Theme, storageKey: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Ignore localStorage errors
  }
};

/**
 * Apply theme to document
 */
export const applyTheme = (theme: 'light' | 'dark'): void => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}; 