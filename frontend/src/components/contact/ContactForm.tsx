import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/api';
import { type ContactFormData, type ContactMessage } from '@/types/api';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: FormErrors;
}

/**
 * Message type options
 */
const MESSAGE_TYPES: Array<{
  value: ContactMessage['message_type'];
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'general',
    label: 'General Inquiry',
    description: 'General questions or information',
    icon: '💬',
  },
  {
    value: 'project_inquiry',
    label: 'Project Inquiry',
    description: 'Interested in working together',
    icon: '🚀',
  },
  {
    value: 'job_opportunity',
    label: 'Job Opportunity',
    description: 'Hiring or recruitment related',
    icon: '💼',
  },
  {
    value: 'collaboration',
    label: 'Collaboration',
    description: 'Partnership or collaboration ideas',
    icon: '🤝',
  },
  {
    value: 'feedback',
    label: 'Feedback',
    description: 'Comments about my work or website',
    icon: '💭',
  },
];

/**
 * Validate email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate form data
 */
const validateForm = (formData: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

/**
 * Contact form component
 */
export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    message_type: 'general',
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    errors: {},
  });

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string | ContactMessage['message_type']
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (formState.errors[field as keyof FormErrors]) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset state
    setFormState(prev => ({
      ...prev,
      errors: {},
      isSubmitting: true,
    }));

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({
        ...prev,
        errors,
        isSubmitting: false,
      }));
      return;
    }

    try {
      await apiService.createContactMessage(formData);
      
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        errors: {},
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        message_type: 'general',
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: {
          general: 'Failed to send message. Please try again or email me directly.',
        },
      }));
    }
  };

  if (formState.isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="space-y-4">
            <div className="text-4xl">✅</div>
            <h3 className="text-xl font-semibold">Message Sent!</h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. I'll get back to you as soon as possible, 
              typically within 24 hours.
            </p>
            <Button
              onClick={() => setFormState(prev => ({ ...prev, isSuccess: false }))}
              variant="outline"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Send me a message</CardTitle>
        <CardDescription>
          I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {formState.errors.general && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{formState.errors.general}</p>
            </div>
          )}

          {/* Message Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium">What can I help you with?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MESSAGE_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('message_type', type.value)}
                  className={cn(
                    'p-3 text-left border rounded-lg transition-colors',
                    formData.message_type === type.value
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:bg-accent'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{type.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={cn(
                  'w-full px-3 py-2 border rounded-md bg-background',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  formState.errors.name && 'border-destructive'
                )}
                placeholder="Your full name"
              />
              {formState.errors.name && (
                <p className="text-sm text-destructive">{formState.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(
                  'w-full px-3 py-2 border rounded-md bg-background',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  formState.errors.email && 'border-destructive'
                )}
                placeholder="your.email@example.com"
              />
              {formState.errors.email && (
                <p className="text-sm text-destructive">{formState.errors.email}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              placeholder="Brief subject line (optional)"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={6}
              className={cn(
                'w-full px-3 py-2 border rounded-md bg-background resize-vertical',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                formState.errors.message && 'border-destructive'
              )}
              placeholder="Tell me about your project, question, or how I can help..."
            />
            {formState.errors.message && (
              <p className="text-sm text-destructive">{formState.errors.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/1000 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full"
            size="lg"
          >
            {formState.isSubmitting ? (
              <>
                <span className="mr-2">Sending...</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 