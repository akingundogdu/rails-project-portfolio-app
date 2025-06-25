import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/api';
import { type Skill } from '@/types/api';
import { cn } from '@/lib/utils';

interface SkillsSectionProps {
  className?: string;
}

interface SkillsByCategory {
  [category: string]: Skill[];
}

/**
 * Individual skill component with proficiency indicator
 */
interface SkillItemProps {
  skill: Skill;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const getProficiencyColor = (level: number) => {
    if (level >= 9) return 'bg-green-500';
    if (level >= 7) return 'bg-blue-500';
    if (level >= 5) return 'bg-yellow-500';
    if (level >= 3) return 'bg-orange-500';
    return 'bg-gray-500';
  };



  const getProficiencyLabel = (level: number) => {
    if (level >= 9) return 'Expert';
    if (level >= 7) return 'Advanced';
    if (level >= 5) return 'Intermediate';
    if (level >= 3) return 'Beginner';
    return 'Learning';
  };

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-xs text-muted-foreground">
          {getProficiencyLabel(skill.proficiency_level)}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300 group-hover:opacity-80',
            getProficiencyColor(skill.proficiency_level)
          )}
          style={{ width: `${(skill.proficiency_level / 10) * 100}%` }}
        />
      </div>
      {skill.description && (
        <p className="text-xs text-muted-foreground">{skill.description}</p>
      )}
    </div>
  );
};

/**
 * Skills category component
 */
interface SkillsCategoryProps {
  category: string;
  skills: Skill[];
}

const SkillsCategory: React.FC<SkillsCategoryProps> = ({ category, skills }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return '🎨';
      case 'backend':
        return '⚙️';
      case 'database':
        return '🗄️';
      case 'devops':
        return '🚀';
      case 'mobile':
        return '📱';
      case 'design':
        return '🎯';
      case 'testing':
        return '🧪';
      case 'tools':
        return '🔧';
      default:
        return '💡';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-xl">{getCategoryIcon(category)}</span>
          <span className="capitalize">{category}</span>
        </CardTitle>
        <CardDescription>
          {skills.length} skill{skills.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Loading state component
 */
const SkillsLoading: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i}>
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-2 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

/**
 * Skills section component with API integration
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const skillsData = await apiService.getSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const skillsByCategory: SkillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as SkillsByCategory);

  // Sort categories by skill count (descending)
  const sortedCategories = Object.keys(skillsByCategory).sort(
    (a, b) => skillsByCategory[b].length - skillsByCategory[a].length
  );

  if (isLoading) {
    return (
      <div className={className}>
        <SkillsLoading />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-muted-foreground">
          Failed to load skills. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Technical Skills</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here are the technologies and tools I work with, organized by category 
          and proficiency level.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCategories.map((category) => (
          <SkillsCategory
            key={category}
            category={category}
            skills={skillsByCategory[category]}
          />
        ))}
      </div>

      {/* Skills Summary */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground">
          Total: {skills.length} skills across {sortedCategories.length} categories
        </p>
      </div>
    </div>
  );
}; 