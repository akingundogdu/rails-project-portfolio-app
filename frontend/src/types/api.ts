// Base interface for common fields
export interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

// Project interfaces
export interface Project extends BaseModel {
  title: string;
  description: string;
  long_description?: string;
  technologies: string[];
  challenges?: string;
  learnings?: string;
  github_url?: string;
  live_url?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'on_hold';
  priority: number;
  published: boolean;
  featured: boolean;
  view_count: number;
  start_date?: string;
  end_date?: string;
  team_size?: number;
  my_role?: string;
  client?: string;
  budget_range?: string;
  project_duration?: string;
  industry?: string;
}

// Skill interfaces
export interface Skill extends BaseModel {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'mobile' | 'testing' | 'tools' | 'soft_skills';
  proficiency_level: number; // 1-10
  description?: string;
  years_of_experience?: number;
  featured: boolean;
  sort_order: number;
  icon?: string;
  color?: string;
}

// Experience interfaces
export interface Experience extends BaseModel {
  company_name: string;
  position: string;
  description: string;
  achievements?: string[];
  technologies_used?: string[];
  start_date: string;
  end_date?: string;
  current: boolean;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship';
  location?: string;
  company_website?: string;
  industry?: string;
  team_size?: number;
  featured: boolean;
  sort_order: number;
}

// Contact Message interfaces
export interface ContactMessage extends BaseModel {
  name: string;
  email: string;
  subject?: string;
  message: string;
  message_type: 'general' | 'project_inquiry' | 'job_opportunity' | 'collaboration' | 'feedback';
  read: boolean;
  replied: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
  status: 'success' | 'error';
  message?: string;
}

// API Error interface
export interface ApiError {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
  code?: number;
}

// Form interfaces
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  message_type: ContactMessage['message_type'];
}

// Filter interfaces
export interface ProjectFilters {
  status?: Project['status'];
  featured?: boolean;
  search?: string;
  sort_by?: 'title' | 'created_at' | 'priority' | 'view_count';
  page?: number;
  per_page?: number;
}

export interface SkillFilters {
  category?: Skill['category'];
  featured?: boolean;
  grouped?: boolean;
  min_proficiency?: number;
}

export interface ExperienceFilters {
  employment_type?: Experience['employment_type'];
  current?: boolean;
  featured?: boolean;
  technology?: string;
} 