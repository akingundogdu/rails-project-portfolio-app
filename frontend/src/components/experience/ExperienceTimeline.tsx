import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/api';
import { type Experience } from '@/types/api';
import { cn } from '@/lib/utils';

interface ExperienceTimelineProps {
  className?: string;
}

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

/**
 * Calculate duration between dates
 */
const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  let result = `${years} year${years !== 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    result += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  
  return result;
};

/**
 * Individual experience item component
 */
interface ExperienceItemProps {
  experience: Experience;
  isLast: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isLast }) => {
  const duration = calculateDuration(experience.start_date, experience.end_date);
  
  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'Full-time';
      case 'part_time':
        return 'Part-time';
      case 'contract':
        return 'Contract';
      case 'freelance':
        return 'Freelance';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  return (
    <div className="flex group">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center mr-6">
        <div className={cn(
          'w-4 h-4 rounded-full border-2 transition-colors',
          experience.current 
            ? 'bg-primary border-primary' 
            : 'bg-background border-muted-foreground group-hover:border-primary'
        )} />
        {!isLast && (
          <div className="w-0.5 h-8 bg-muted-foreground/30 mt-2" />
        )}
      </div>

      {/* Experience content */}
      <div className="flex-1 pb-8">
        <Card className="transition-shadow group-hover:shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-lg">{experience.position}</CardTitle>
                <CardDescription className="text-base font-medium">
                  {experience.company_name}
                  {experience.location && ` • ${experience.location}`}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>
                  {formatDate(experience.start_date)} - {' '}
                  {experience.current ? 'Present' : formatDate(experience.end_date!)}
                </div>
                <div>{duration} • {getEmploymentTypeLabel(experience.employment_type)}</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Description */}
            <p className="text-muted-foreground">{experience.description}</p>
            
            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Technologies */}
            {experience.technologies_used && experience.technologies_used.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies_used.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Company website link */}
            {experience.company_website && (
              <div>
                <a
                  href={experience.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Visit Company Website →
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/**
 * Loading state component
 */
const ExperienceLoading: React.FC = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex">
        <div className="flex flex-col items-center mr-6">
          <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
          {i < 3 && <div className="w-0.5 h-8 bg-muted mt-2" />}
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="animate-pulse space-y-2">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Experience timeline component
 */
export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ className }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const experienceData = await apiService.getExperiences();
        
        // Sort by current first, then by start date descending
        const sortedExperiences = experienceData.sort((a, b) => {
          if (a.current && !b.current) return -1;
          if (!a.current && b.current) return 1;
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
        });
        
        setExperiences(sortedExperiences);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <div className={className}>
        <ExperienceLoading />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-muted-foreground">
          Failed to load experience data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Work Experience</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My professional journey and the roles that have shaped my expertise 
          in software development.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto pt-8">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground">
          {experiences.length} position{experiences.length !== 1 ? 's' : ''} •{' '}
          {experiences.filter(exp => exp.current).length} current role{experiences.filter(exp => exp.current).length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}; 