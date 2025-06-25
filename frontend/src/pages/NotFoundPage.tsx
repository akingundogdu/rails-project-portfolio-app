import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/types/navigation';

/**
 * 404 Not Found page component
 */
const NotFoundPage: React.FC = () => {
  return (
    <PageLayout maxWidth="md">
      <div className="text-center space-y-6 py-20">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg">
            <Link to={ROUTES.HOME}>Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to={ROUTES.PROJECTS}>View Projects</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage; 