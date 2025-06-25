class Project < ApplicationRecord
  # Active Storage attachments for project images
  has_many_attached :images
  has_one_attached :featured_image
  
  # Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10, maximum: 1000 }
  validates :short_description, presence: true, length: { minimum: 10, maximum: 200 }
  validates :github_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }
  validates :live_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }, allow_blank: true
  validates :status, inclusion: { in: %w[completed in_progress planned] }
  validates :priority, inclusion: { in: %w[high medium low] }
  
  # Scopes
  scope :published, -> { where(published: true) }
  scope :featured, -> { where(featured: true) }
  scope :by_status, ->(status) { where(status: status) }
  scope :by_priority, ->(priority) { where(priority: priority) }
  scope :ordered_by_created, -> { order(created_at: :desc) }
  scope :ordered_by_priority, -> { order(Arel.sql("CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END")) }
  
  # Default scope
  default_scope { published.ordered_by_created }
  
  # Instance methods
  def technologies_list
    technologies.present? ? technologies.split(',').map(&:strip) : []
  end
  
  def technologies_list=(tech_array)
    self.technologies = tech_array.join(', ') if tech_array.is_a?(Array)
  end
  
  def featured_image_url
    featured_image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(featured_image, only_path: true) : nil
  end
  
  def image_urls
    images.attached? ? images.map { |img| Rails.application.routes.url_helpers.rails_blob_url(img, only_path: true) } : []
  end
end 