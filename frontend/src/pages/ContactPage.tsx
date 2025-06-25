import React from 'react';
import { PageLayout } from '@/components/layout';
import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Contact page component with form and contact information
 */
const ContactPage: React.FC = () => {
  return (
    <PageLayout
      title="Get In Touch"
      description="Let's discuss your project ideas, collaboration opportunities, or any questions you might have"
      maxWidth="xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form - Takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg">📧</span>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:hello@akingundogdu.com"
                    className="text-sm text-primary hover:underline"
                  >
                    hello@akingundogdu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-lg">🌍</span>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Istanbul, Turkey (UTC+3)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-lg">⏰</span>
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">
                    Usually within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-lg">💼</span>
                <div>
                  <p className="font-medium">Availability</p>
                  <p className="text-sm text-muted-foreground">
                    Open for freelance projects
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="https://github.com/akingundogdu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-lg">⚡</span>
                <div>
                  <p className="font-medium text-sm">GitHub</p>
                  <p className="text-xs text-muted-foreground">View my code</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/akingundogdu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-lg">💼</span>
                <div>
                  <p className="font-medium text-sm">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">Professional network</p>
                </div>
              </a>

              <a
                href="https://twitter.com/akingundogdu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-lg">🐦</span>
                <div>
                  <p className="font-medium text-sm">Twitter</p>
                  <p className="text-xs text-muted-foreground">Tech thoughts & updates</p>
                </div>
              </a>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Asked</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm mb-1">Project Timeline?</p>
                <p className="text-xs text-muted-foreground">
                  Typically 2-8 weeks depending on scope and complexity.
                </p>
              </div>

              <div>
                <p className="font-medium text-sm mb-1">Remote Work?</p>
                <p className="text-xs text-muted-foreground">
                  Yes, I work remotely with clients worldwide.
                </p>
              </div>

              <div>
                <p className="font-medium text-sm mb-1">Tech Stack?</p>
                <p className="text-xs text-muted-foreground">
                  React, TypeScript, Node.js, Ruby on Rails, and more.
                </p>
              </div>

              <div>
                <p className="font-medium text-sm mb-1">Budget Range?</p>
                <p className="text-xs text-muted-foreground">
                  Flexible pricing based on project scope and requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Let's Build Something Amazing Together</h2>
          <p className="text-muted-foreground">
            Whether you have a specific project in mind or just want to explore possibilities, 
            I'm here to help turn your ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">🚀</span>
                <span>Project Development</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Full-stack web applications, e-commerce platforms, SaaS products, 
                and custom software solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">🎯</span>
                <span>Consulting & Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Technical architecture planning, technology stack selection, 
                and development process optimization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">🔧</span>
                <span>Code Review & Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Performance optimization, code quality improvement, 
                and technical debt reduction for existing projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage; 