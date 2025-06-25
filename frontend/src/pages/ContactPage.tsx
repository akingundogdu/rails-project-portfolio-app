import React from 'react';
import { PageLayout } from '@/components/layout';

/**
 * Contact page component
 */
const ContactPage: React.FC = () => {
  return (
    <PageLayout
      title="Get In Touch"
      description="Let's discuss your project or collaboration opportunities"
    >
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Contact page content coming soon...
        </p>
      </div>
    </PageLayout>
  );
};

export default ContactPage; 