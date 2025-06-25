import React from 'react';
import { PageLayout } from '@/components/layout';

/**
 * About page component
 */
const AboutPage: React.FC = () => {
  return (
    <PageLayout
      title="About Me"
      description="Learn more about my background, skills, and experience"
    >
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          About page content coming soon...
        </p>
      </div>
    </PageLayout>
  );
};

export default AboutPage; 