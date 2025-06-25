class Experience < ApplicationRecord
  # Validations
  validates :company_name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :position, presence: true, length: { minimum: 2, maximum: 100 }
  validates :description, presence: true, length: { minimum: 20, maximum: 2000 }
  validates :start_date, presence: true
  validates :employment_type, presence: true, inclusion: { 
    in: %w[full_time part_time contract freelance internship] 
  }
  validates :location, presence: true, length: { minimum: 2, maximum: 100 }
  
  # Custom validations
  validate :end_date_after_start_date
  validate :start_date_not_in_future
  
  # Scopes
  scope :current, -> { where(current: true) }
  scope :past, -> { where(current: false) }
  scope :by_employment_type, ->(type) { where(employment_type: type) }
  scope :ordered_by_start_date, -> { order(start_date: :desc) }
  scope :ordered_by_end_date, -> { order(end_date: :desc) }
  scope :featured, -> { where(featured: true) }
  
  # Default scope
  default_scope { ordered_by_start_date }
  
  # Class methods
  def self.employment_types
    %w[full_time part_time contract freelance internship]
  end
  
  def self.employment_type_labels
    {
      'full_time' => 'Full Time',
      'part_time' => 'Part Time',
      'contract' => 'Contract',
      'freelance' => 'Freelance',
      'internship' => 'Internship'
    }
  end
  
  # Instance methods
  def duration_in_months
    end_date_for_calculation = current? ? Date.current : end_date
    return 0 unless start_date && end_date_for_calculation
    
    ((end_date_for_calculation.year - start_date.year) * 12) + 
    (end_date_for_calculation.month - start_date.month) + 1
  end
  
  def duration_text
    months = duration_in_months
    return 'Less than a month' if months < 1
    
    years = months / 12
    remaining_months = months % 12
    
    duration_parts = []
    duration_parts << "#{years} #{'year'.pluralize(years)}" if years > 0
    duration_parts << "#{remaining_months} #{'month'.pluralize(remaining_months)}" if remaining_months > 0
    
    duration_parts.join(' ')
  end
  
  def employment_type_label
    self.class.employment_type_labels[employment_type] || employment_type.humanize
  end
  
  def technologies_list
    technologies.present? ? technologies.split(',').map(&:strip) : []
  end
  
  def technologies_list=(tech_array)
    self.technologies = tech_array.join(', ') if tech_array.is_a?(Array)
  end
  
  def achievements_list
    achievements.present? ? achievements.split("\n").map(&:strip).reject(&:blank?) : []
  end
  
  def current?
    current == true
  end
  
  private
  
  def end_date_after_start_date
    return unless start_date && end_date
    
    errors.add(:end_date, 'must be after start date') if end_date < start_date
  end
  
  def start_date_not_in_future
    return unless start_date
    
    errors.add(:start_date, 'cannot be in the future') if start_date > Date.current
  end
end 