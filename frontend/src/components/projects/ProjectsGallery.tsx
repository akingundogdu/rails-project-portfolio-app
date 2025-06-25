import React, { useEffect, useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { apiService } from '@/services/api';
import { type Project, type ProjectFilters as ProjectFiltersType } from '@/types/api';
import { cn } from '@/lib/utils';

interface ProjectsGalleryProps {
  className?: string;
  showFilters?: boolean;
  maxItems?: number;
  variant?: 'default' | 'featured' | 'compact';
}

/**
 * Loading skeleton component
 */
const ProjectsLoading: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-muted rounded-lg h-80"
      />
    ))}
  </div>
);

/**
 * Empty state component
 */
const EmptyState: React.FC<{ 
  hasFilters: boolean;
  onClearFilters: () => void;
}> = ({ hasFilters, onClearFilters }) => (
  <div className="text-center py-12">
    <div className="space-y-4">
      <div className="text-4xl">📂</div>
      <h3 className="text-lg font-medium">
        {hasFilters ? 'No projects match your filters' : 'No projects found'}
      </h3>
      <p className="text-muted-foreground">
        {hasFilters 
          ? 'Try adjusting your search criteria or clear all filters.'
          : 'Check back later for new projects.'}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  </div>
);

/**
 * Projects gallery component with filtering and API integration
 */
export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  className,
  showFilters = true,
  maxItems,
  variant = 'default',
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [filters, setFilters] = useState<ProjectFiltersType>({
    sort_by: 'created_at',
  });

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const projectsData = await apiService.getProjects(filters);
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [filters]);

  // Extract unique technologies for filter options
  const availableTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Apply client-side filtering and sorting
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply max items limit
    if (maxItems && maxItems > 0) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [projects, maxItems]);

  const handleFiltersChange = (newFilters: ProjectFiltersType) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({ sort_by: 'created_at' });
  };

  const hasActiveFilters = Boolean(
    filters.status || filters.featured || filters.search
  );

  // Error state
  if (hasError) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="space-y-4">
          <div className="text-4xl">⚠️</div>
          <h3 className="text-lg font-medium">Failed to load projects</h3>
          <p className="text-muted-foreground">
            Please try refreshing the page or check back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Filters */}
      {showFilters && !isLoading && (
        <ProjectFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          availableTechnologies={availableTechnologies}
        />
      )}

      {/* Results Summary */}
      {!isLoading && !hasError && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {hasActiveFilters && ' found'}
            {maxItems && projects.length > maxItems && (
              <span> (showing first {maxItems})</span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <ProjectsLoading count={maxItems || 6} />
      )}

      {/* Projects Grid */}
      {!isLoading && !hasError && filteredProjects.length > 0 && (
        <div className={cn(
          'grid gap-6',
          variant === 'compact' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant={variant}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !hasError && filteredProjects.length === 0 && (
        <EmptyState
          hasFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
        />
      )}

      {/* Load More Button (if applicable) */}
      {!isLoading && !hasError && maxItems && projects.length > maxItems && (
        <div className="text-center pt-8">
          <button
            onClick={() => {
              // This would typically navigate to the full projects page
              window.location.href = '/projects';
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Projects ({projects.length})
          </button>
        </div>
      )}

      {/* Featured Projects Indicator */}
      {!showFilters && variant === 'featured' && (
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            Showing featured projects only
          </p>
        </div>
      )}
    </div>
  );
}; 