import React from 'react';
import { PageLayout } from '@/components/layout';
import { ProjectsGallery } from '@/components/projects/ProjectsGallery';

/**
 * Projects page component with complete portfolio showcase
 */
const ProjectsPage: React.FC = () => {
  return (
    <PageLayout
      title="My Projects"
      description="Explore my portfolio of web applications, tools, and development projects"
      maxWidth="xl"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Here's a collection of projects I've worked on, ranging from full-stack web applications 
            to open-source tools and experimental prototypes. Each project represents a unique 
            challenge and learning opportunity.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>On Hold</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
              <span>Planned</span>
            </div>
          </div>
        </div>

        {/* Projects Gallery */}
        <ProjectsGallery />

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto text-center space-y-4 pt-12">
          <h2 className="text-2xl font-bold">Interested in Collaborating?</h2>
          <p className="text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Start a Project
            </a>
            <a
              href="https://github.com/akingundogdu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectsPage; 