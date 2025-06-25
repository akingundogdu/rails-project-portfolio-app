import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ProjectFilters as ProjectFiltersType } from '@/types/api';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  onFiltersChange: (filters: ProjectFiltersType) => void;
  availableTechnologies?: string[];
  className?: string;
}

interface FilterTagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
      'border border-input hover:bg-accent hover:text-accent-foreground',
      isActive 
        ? 'bg-primary text-primary-foreground border-primary' 
        : 'bg-background text-muted-foreground'
    )}
  >
    {label}
  </button>
);

/**
 * Project filters component
 */
export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTechnologies = [],
  className,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Status filter options
  const statusOptions = [
    { value: undefined, label: 'All Status' },
    { value: 'completed' as const, label: 'Completed' },
    { value: 'in_progress' as const, label: 'In Progress' },
    { value: 'planned' as const, label: 'Planned' },
    { value: 'on_hold' as const, label: 'On Hold' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'created_at' as const, label: 'Latest' },
    { value: 'title' as const, label: 'Name' },
    { value: 'priority' as const, label: 'Priority' },
    { value: 'view_count' as const, label: 'Popular' },
  ];

  // Handle search with debounce effect
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    
    // Simple debounce - you might want to use a proper debounce hook in production
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        search: value || undefined,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFiltersChange]);

  const handleStatusFilter = (status: ProjectFiltersType['status']) => {
    onFiltersChange({
      ...filters,
      status,
    });
  };

  const handleFeaturedFilter = () => {
    onFiltersChange({
      ...filters,
      featured: filters.featured ? undefined : true,
    });
  };

  const handleSortChange = (sortBy: ProjectFiltersType['sort_by']) => {
    onFiltersChange({
      ...filters,
      sort_by: sortBy,
    });
  };

  const handleTechnologyFilter = (tech: string) => {
    // This would need to be implemented based on your API structure
    // For now, we'll use the search field to filter by technology
    const currentSearch = filters.search || '';
    const hasSearch = currentSearch.includes(tech);
    
    if (hasSearch) {
      const newSearch = currentSearch.replace(tech, '').trim();
      onFiltersChange({
        ...filters,
        search: newSearch || undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        search: currentSearch ? `${currentSearch} ${tech}` : tech,
      });
    }
  };

  const clearAllFilters = () => {
    setSearchInput('');
    onFiltersChange({});
  };

  const hasActiveFilters = filters.status || filters.featured || filters.search;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-muted-foreground">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <FilterTag
          label="Featured"
          isActive={!!filters.featured}
          onClick={handleFeaturedFilter}
        />
        {statusOptions.slice(1).map((option) => (
          <FilterTag
            key={option.value}
            label={option.label}
            isActive={filters.status === option.value}
            onClick={() => handleStatusFilter(option.value)}
          />
        ))}
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <FilterTag
                  key={option.value}
                  label={option.label}
                  isActive={filters.sort_by === option.value}
                  onClick={() => handleSortChange(option.value)}
                />
              ))}
            </div>
          </div>

          {/* Technologies */}
          {availableTechnologies.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">Technologies</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableTechnologies.slice(0, 20).map((tech) => (
                  <FilterTag
                    key={tech}
                    label={tech}
                    isActive={filters.search?.includes(tech) || false}
                    onClick={() => handleTechnologyFilter(tech)}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="text-sm text-muted-foreground">
          <span>Active filters: </span>
          {filters.status && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-md mr-2">
              Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
            </span>
          )}
          {filters.featured && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-md mr-2">
              Featured only
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-md mr-2">
              Search: "{filters.search}"
            </span>
          )}
        </div>
      )}
    </div>
  );
}; 