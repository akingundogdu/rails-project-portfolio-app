import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsGallery } from '@/components/projects/ProjectsGallery';
import { ROUTES } from '@/types/navigation';

/**
 * Homepage component with hero section and overview
 */
const HomePage: React.FC = () => {
  return (
    <PageLayout maxWidth="xl">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 lg:py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I'm{' '}
            <span className="text-primary">Akın Gündoğdu</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Full-stack developer passionate about creating beautiful, functional web applications 
            and meaningful user experiences using modern technologies.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg">
            <Link to={ROUTES.PROJECTS}>View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to={ROUTES.CONTACT}>Get In Touch</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">What I Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I specialize in full-stack development with a focus on modern web technologies 
            and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎨</span>
                <span>Frontend Development</span>
              </CardTitle>
              <CardDescription>
                Modern React applications with TypeScript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Building responsive, accessible user interfaces with React, TypeScript, 
                and modern CSS frameworks like TailwindCSS.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>⚙️</span>
                <span>Backend Development</span>
              </CardTitle>
              <CardDescription>
                Robust APIs and server-side solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Developing scalable backend services using Ruby on Rails, Node.js, 
                and various databases including PostgreSQL and MongoDB.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Full-Stack Solutions</span>
              </CardTitle>
              <CardDescription>
                End-to-end application development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete web application development from concept to deployment, 
                including architecture design and performance optimization.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

              {/* Featured Projects Section */}
        <section className="py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my most notable projects that showcase my skills and experience.
            </p>
          </div>
          
          <ProjectsGallery
            showFilters={false}
            maxItems={3}
            variant="featured"
          />
          
          <div className="text-center pt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to={ROUTES.PROJECTS}>View All Projects</Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <div className="py-16 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities and interesting projects.
          </p>
          <Button size="lg" asChild>
            <Link to={ROUTES.CONTACT}>Start a Conversation</Link>
          </Button>
        </div>
    </PageLayout>
  );
};

export default HomePage; 