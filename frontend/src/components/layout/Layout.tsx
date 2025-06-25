import React, { type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
  showHeader?: boolean;
}

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Main content wrapper with proper spacing and accessibility
 */
const MainContent: React.FC<MainContentProps> = ({ children, className }) => (
  <main
    className={cn(
      'flex-1 w-full',
      'min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))]', // Account for header height
      className
    )}
    role="main"
    id="main-content"
  >
    {children}
  </main>
);

/**
 * Layout component that provides the main structure for pages
 * Features:
 * - Responsive header with navigation
 * - Main content area with proper spacing
 * - Footer with links and contact info
 * - Skip to content link for accessibility
 * - Flexible layout options
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showFooter = true,
  showHeader = true,
}) => {
  return (
    <div className={cn('min-h-screen flex flex-col bg-background', className)}>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Header */}
      {showHeader && <Header />}

      {/* Main Content */}
      <MainContent className={showHeader ? 'pt-0' : 'pt-4'}>
        {children}
      </MainContent>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * Page wrapper component for consistent page structure
 */
export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  containerClassName,
  title,
  description,
  maxWidth = 'lg',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Page Header */}
      {(title || description) && (
        <div className="bg-muted/50 border-b">
          <div className={cn(
            'container mx-auto px-4 sm:px-6 lg:px-8 py-8',
            maxWidthClasses[maxWidth],
            containerClassName
          )}>
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className={cn(
        'container mx-auto px-4 sm:px-6 lg:px-8 py-8',
        maxWidthClasses[maxWidth],
        containerClassName
      )}>
        {children}
      </div>
    </div>
  );
}; 