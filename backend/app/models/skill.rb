class Skill < ApplicationRecord
  # Validations
  validates :name, presence: true, length: { minimum: 2, maximum: 50 }, uniqueness: { case_sensitive: false }
  validates :category, presence: true, inclusion: { 
    in: %w[frontend backend database devops design tools languages frameworks libraries] 
  }
  validates :proficiency_level, presence: true, inclusion: { in: 1..10 }
  validates :years_of_experience, presence: true, numericality: { greater_than: 0 }
  
  # Scopes
  scope :by_category, ->(category) { where(category: category) }
  scope :by_proficiency, ->(level) { where(proficiency_level: level) }
  scope :featured, -> { where(featured: true) }
  scope :ordered_by_proficiency, -> { order(proficiency_level: :desc) }
  scope :ordered_by_name, -> { order(:name) }
  scope :ordered_by_experience, -> { order(years_of_experience: :desc) }
  
  # Default scope
  default_scope { ordered_by_proficiency }
  
  # Class methods
  def self.categories
    %w[frontend backend database devops design tools languages frameworks libraries]
  end
  
  def self.grouped_by_category
    includes(:skills).group_by(&:category)
  end
  
  # Instance methods
  def proficiency_percentage
    (proficiency_level * 10).clamp(0, 100)
  end
  
  def proficiency_label
    case proficiency_level
    when 1..3
      'Beginner'
    when 4..6
      'Intermediate'
    when 7..8
      'Advanced'
    when 9..10
      'Expert'
    end
  end
  
  def icon_name
    # This can be used to map skill names to icon names
    name.downcase.gsub(/[^a-z0-9]/, '_')
  end
end 