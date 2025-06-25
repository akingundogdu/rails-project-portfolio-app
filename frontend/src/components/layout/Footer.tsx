import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
  description: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

// Social media links
const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/akingundogdu',
    icon: '⚡',
    description: 'View my code repositories',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/akingundogdu',
    icon: '💼',
    description: 'Connect with me professionally',
  },
  {
    name: 'Email',
    href: 'mailto:hello@akingundogdu.com',
    icon: '✉️',
    description: 'Send me an email',
  },
];

// Footer navigation sections
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Navigation',
    links: NAVIGATION_ITEMS.map(item => ({
      label: item.label,
      href: item.href,
      external: item.external,
    })),
  },
  {
    title: 'Connect',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/akingundogdu',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/akingundogdu',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:hello@akingundogdu.com',
        external: true,
      },
    ],
  },
];

/**
 * Social link component
 */
const SocialLink: React.FC<{ link: SocialLink }> = ({ link }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
    aria-label={link.description}
    title={link.description}
  >
    <span className="text-lg" role="img" aria-label={link.name}>
      {link.icon}
    </span>
  </a>
);

/**
 * Footer navigation section component
 */
const FooterSection: React.FC<{ section: FooterSection }> = ({ section }) => (
  <div className="space-y-3">
    <h3 className="font-semibold text-foreground">{section.title}</h3>
    <ul className="space-y-2">
      {section.links.map((link, index) => (
        <li key={index}>
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              to={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Footer component with navigation, social links, and copyright
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Akın Gündoğdu
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Full-stack developer passionate about creating beautiful, 
              functional web applications and meaningful user experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {SOCIAL_LINKS.map((link) => (
                <SocialLink key={link.name} link={link} />
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterSection key={section.title} section={section} />
          ))}

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <a
                  href="mailto:hello@akingundogdu.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@akingundogdu.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Available for freelance projects and collaboration
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Akın Gündoğdu. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 