import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/layout';
import { ROUTES } from '@/types/navigation';

// Import pages (to be created)
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ProjectsPage = React.lazy(() => import('@/pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

/**
 * Loading component for lazy-loaded pages
 */
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="text-muted-foreground">Loading...</span>
    </div>
  </div>
);

/**
 * Main application component with routing and theme support
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
              <Route path={ROUTES.CONTACT} element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
