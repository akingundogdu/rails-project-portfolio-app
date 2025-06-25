import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import type {
  Project,
  Skill,
  Experience,
  ContactMessage,
  ContactFormData,
  ProjectFilters,
  SkillFilters,
  ExperienceFilters,
  ApiResponse,
  ApiError,
} from '@/types/api';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as { 
        message?: string; 
        errors?: Record<string, string[]> 
      };
      return {
        status: 'error',
        message: responseData?.message || 'An error occurred',
        errors: responseData?.errors,
        code: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        status: 'error',
        message: 'Network error - please check your connection',
        code: 0,
      };
    } else {
      // Other error
      return {
        status: 'error',
        message: error.message || 'An unexpected error occurred',
      };
    }
  }

  // Projects API
  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.api.get<Project[]>(`/projects?${params.toString()}`);
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response = await this.api.get<Project>(`/projects/${id}`);
    return response.data;
  }

  // Skills API
  async getSkills(filters?: SkillFilters): Promise<Skill[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.api.get<Skill[]>(`/skills?${params.toString()}`);
    return response.data;
  }

  // Experiences API
  async getExperiences(filters?: ExperienceFilters): Promise<Experience[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.api.get<Experience[]>(`/experiences?${params.toString()}`);
    return response.data;
  }

  // Contact Messages API
  async createContactMessage(data: ContactFormData): Promise<ApiResponse<ContactMessage>> {
    const response = await this.api.post<ApiResponse<ContactMessage>>('/contact_messages', {
      contact_message: data,
    });
    return response.data;
  }

  // Health Check
  async healthCheck(): Promise<{ status: string }> {
    const response = await this.api.get<{ status: string }>('/health');
    return response.data;
  }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Export individual methods for easier importing
export const {
  getProjects,
  getProject,
  getSkills,
  getExperiences,
  createContactMessage,
  healthCheck,
} = apiService; 