import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NAVIGATION_ITEMS, type NavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

interface NavigationLinkProps {
  item: NavigationItem;
  isActive: boolean;
  onClick?: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Navigation link component for both desktop and mobile
 */
const NavigationLink: React.FC<NavigationLinkProps> = ({ item, isActive, onClick }) => {
  const linkClasses = cn(
    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
    'hover:text-primary hover:bg-accent',
    isActive 
      ? 'text-primary bg-accent' 
      : 'text-muted-foreground'
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        onClick={onClick}
        aria-label={item.description}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className={linkClasses}
      onClick={onClick}
      aria-label={item.description}
    >
      {item.label}
    </Link>
  );
};

/**
 * Mobile menu overlay component
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div className="fixed top-[72px] right-0 w-64 h-[calc(100vh-72px)] bg-background border-l shadow-lg z-50 md:hidden">
        <nav className="flex flex-col p-4 space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationLink
              key={item.id}
              item={item}
              isActive={location.pathname === item.href}
              onClick={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

/**
 * Header component with responsive navigation
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
                aria-label="Go to homepage"
              >
                Akın Gündoğdu
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationLink
                  key={item.id}
                  item={item}
                  isActive={location.pathname === item.href}
                />
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
                className="h-9 w-9 p-0"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={cn(
                      'absolute block w-5 h-0.5 bg-current transform transition-all duration-300',
                      isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block w-5 h-0.5 bg-current transform transition-all duration-300 top-2',
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block w-5 h-0.5 bg-current transform transition-all duration-300',
                      isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}; 