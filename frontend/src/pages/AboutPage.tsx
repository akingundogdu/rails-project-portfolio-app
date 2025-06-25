import React from 'react';
import { PageLayout } from '@/components/layout';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * About page component with comprehensive personal and professional information
 */
const AboutPage: React.FC = () => {
  return (
    <PageLayout
      title="About Me"
      description="Full-stack developer passionate about creating meaningful digital experiences"
      maxWidth="xl"
    >
      <div className="space-y-16">
        {/* Personal Introduction */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Bio */}
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Hello, I'm Akın Gündoğdu</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with expertise in modern web technologies 
                  and a keen eye for creating exceptional user experiences. With a strong background 
                  in both frontend and backend development, I enjoy building scalable applications 
                  that solve real-world problems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My journey in software development began with a curiosity about how things work 
                  under the hood. This curiosity has driven me to continuously learn and adapt to 
                  new technologies, always striving to write clean, maintainable code that makes 
                  a difference.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community. I believe 
                  in the power of collaboration and continuous learning to create better software.
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🌍</span>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Istanbul, Turkey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">💼</span>
                    <div>
                      <p className="font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">5+ years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <div>
                      <p className="font-medium">Focus</p>
                      <p className="text-sm text-muted-foreground">Full-stack Development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🌟</span>
                    <div>
                      <p className="font-medium">Passion</p>
                      <p className="text-sm text-muted-foreground">Clean Code & UX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Web Development',
                      'Open Source',
                      'UI/UX Design',
                      'Cloud Computing',
                      'DevOps',
                      'Mobile Development',
                      'AI/ML',
                      'Blockchain'
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-muted text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values & Philosophy */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">My Development Philosophy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide my approach to software development and problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🎯</span>
                  <span>User-Centric</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every line of code should serve a purpose and enhance the user experience. 
                  I prioritize understanding user needs before jumping to technical solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🧩</span>
                  <span>Clean & Simple</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simple solutions are often the best solutions. I strive to write clean, 
                  readable code that is easy to maintain and extend.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🔄</span>
                  <span>Continuous Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technology evolves rapidly. I embrace continuous learning and stay updated 
                  with the latest trends and best practices in development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🤝</span>
                  <span>Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Great software is built by great teams. I value open communication, 
                  knowledge sharing, and collective problem-solving.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">⚡</span>
                  <span>Performance First</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Performance matters. I consider speed, efficiency, and scalability 
                  from the beginning of every project.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🛡️</span>
                  <span>Quality Assurance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Testing and quality assurance are not afterthoughts. I build 
                  robustness and reliability into every component.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <SkillsSection />
        </section>

        {/* Experience Timeline */}
        <section>
          <ExperienceTimeline />
        </section>

        {/* Education & Certifications */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Education & Learning</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My educational background and continuous learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">🎓</span>
                  <span>Formal Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Computer Science Degree</h4>
                  <p className="text-sm text-muted-foreground">
                    Strong foundation in algorithms, data structures, and software engineering principles.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Self-Directed Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Continuously updating skills through online courses, tutorials, and hands-on projects.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">📜</span>
                  <span>Certifications & Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Areas of Study:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Advanced React & TypeScript</li>
                    <li>• Ruby on Rails Development</li>
                    <li>• Cloud Architecture (AWS/GCP)</li>
                    <li>• DevOps & CI/CD Practices</li>
                    <li>• UI/UX Design Principles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage; 