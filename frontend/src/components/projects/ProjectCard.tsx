import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Project } from '@/types/api';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

/**
 * Get status badge styling
 */
const getStatusBadge = (status: Project['status']) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400`;
    case 'in_progress':
      return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400`;
    case 'planned':
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400`;
    case 'on_hold':
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400`;
  }
};

/**
 * Get status label
 */
const getStatusLabel = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'planned':
      return 'Planned';
    case 'on_hold':
      return 'On Hold';
    default:
      return status;
  }
};

/**
 * Project card component
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  className,
  variant = 'default' 
}) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured' || project.featured;

  return (
    <Card className={cn(
      'group transition-all duration-300 hover:shadow-lg',
      isFeatured && 'ring-2 ring-primary/20 bg-gradient-to-br from-background to-muted/20',
      className
    )}>
      {/* Featured badge */}
      {project.featured && variant !== 'compact' && (
        <div className="absolute -top-2 -right-2 z-10">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <CardHeader className={cn(isCompact ? 'pb-3' : 'pb-4')}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className={cn(
                'line-clamp-1 group-hover:text-primary transition-colors',
                isCompact ? 'text-lg' : 'text-xl'
              )}>
                {project.title}
              </CardTitle>
              {project.featured && (
                <span className="text-primary" title="Featured Project">⭐</span>
              )}
            </div>
            
            <CardDescription className={cn(
              isCompact ? 'line-clamp-2' : 'line-clamp-3'
            )}>
              {project.description}
            </CardDescription>
          </div>

          {/* Status Badge */}
          <span className={getStatusBadge(project.status)}>
            {getStatusLabel(project.status)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies */}
        <div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, isCompact ? 4 : 6).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isCompact ? 4 : 6) && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - (isCompact ? 4 : 6)} more
              </span>
            )}
          </div>
        </div>

        {/* Project Meta */}
        {!isCompact && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {project.my_role && (
              <div className="flex items-center gap-1">
                <span>👤</span>
                <span>{project.my_role}</span>
              </div>
            )}
            {project.project_duration && (
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{project.project_duration}</span>
              </div>
            )}
            {project.view_count > 0 && (
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{project.view_count} views</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {project.live_url && (
            <Button
              size="sm"
              variant="default"
              asChild 
              className="flex-1"
            >
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live
              </a>
            </Button>
          )}
          
          {project.github_url && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className={project.live_url ? '' : 'flex-1'}
            >
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          )}

          {!isCompact && (
            <Button
              size="sm"
              variant="ghost"
              asChild
            >
              <Link to={`/projects/${project.id}`}>
                Details →
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 