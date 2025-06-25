export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

// Route paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  CONTACT: '/contact',
  SKILLS: '/skills',
  EXPERIENCE: '/experience',
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: ROUTES.HOME,
    description: 'Welcome page with overview',
  },
  {
    id: 'about',
    label: 'About',
    href: ROUTES.ABOUT,
    description: 'Learn more about me',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: ROUTES.PROJECTS,
    description: 'View my portfolio projects',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: ROUTES.CONTACT,
    description: 'Get in touch with me',
  },
];

// Mobile navigation sections
export const MOBILE_NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    id: 'main',
    title: 'Main Navigation',
    items: NAVIGATION_ITEMS,
  },
  {
    id: 'quick-links',
    title: 'Quick Links',
    items: [
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/akingundogdu',
        external: true,
        description: 'View my code repositories',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/akingundogdu',
        external: true,
        description: 'Connect with me professionally',
      },
    ],
  },
]; 