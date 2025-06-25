import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

/**
 * Theme toggle button component
 * Provides a simple toggle between light and dark themes
 */
export const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, toggleTheme } = useTheme();

  // Get the appropriate icon based on current theme
  const getThemeIcon = () => {
    if (theme === 'system') {
      return '🖥️';
    }
    return actualTheme === 'light' ? '🌙' : '☀️';
  };

  // Get the appropriate label
  const getThemeLabel = () => {
    if (theme === 'system') {
      return `System (${actualTheme})`;
    }
    return actualTheme === 'light' ? 'Dark mode' : 'Light mode';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0"
      aria-label={`Switch to ${getThemeLabel()}`}
      title={`Current: ${theme} theme. Click to toggle.`}
    >
      <span className="text-lg" role="img" aria-hidden="true">
        {getThemeIcon()}
      </span>
    </Button>
  );
}; 