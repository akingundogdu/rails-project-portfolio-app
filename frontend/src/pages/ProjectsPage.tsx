import React from 'react';
import { PageLayout } from '@/components/layout';

/**
 * Projects page component
 */
const ProjectsPage: React.FC = () => {
  return (
    <PageLayout
      title="My Projects"
      description="Explore my portfolio of web applications and development projects"
    >
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Projects page content coming soon...
        </p>
      </div>
    </PageLayout>
  );
};

export default ProjectsPage; 