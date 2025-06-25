class ContactMessage < ApplicationRecord
  # Validations
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { maximum: 255 }
  validates :subject, presence: true, length: { minimum: 5, maximum: 200 }
  validates :message, presence: true, length: { minimum: 10, maximum: 2000 }
  validates :message_type, inclusion: { in: %w[general project_inquiry job_opportunity collaboration other] }
  
  # Scopes
  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }
  scope :replied, -> { where(replied: true) }
  scope :not_replied, -> { where(replied: false) }
  scope :by_type, ->(type) { where(message_type: type) }
  scope :recent, -> { order(created_at: :desc) }
  scope :priority, -> { where(priority: true) }
  
  # Default scope
  default_scope { recent }
  
  # Callbacks
  before_validation :set_default_message_type
  before_create :set_priority_based_on_type
  after_create :send_notification_email
  
  # Class methods
  def self.message_types
    %w[general project_inquiry job_opportunity collaboration other]
  end
  
  def self.message_type_labels
    {
      'general' => 'General Inquiry',
      'project_inquiry' => 'Project Inquiry',
      'job_opportunity' => 'Job Opportunity',
      'collaboration' => 'Collaboration',
      'other' => 'Other'
    }
  end
  
  def self.unread_count
    unread.count
  end
  
  def self.priority_count
    priority.unread.count
  end
  
  # Instance methods
  def message_type_label
    self.class.message_type_labels[message_type] || message_type.humanize
  end
  
  def mark_as_read!
    update!(read: true, read_at: Time.current)
  end
  
  def mark_as_replied!
    update!(replied: true, replied_at: Time.current)
  end
  
  def mark_as_unread!
    update!(read: false, read_at: nil)
  end
  
  def read?
    read == true
  end
  
  def replied?
    replied == true
  end
  
  def priority?
    priority == true
  end
  
  def snippet(length = 100)
    message.length > length ? "#{message[0...length]}..." : message
  end
  
  def from_name_and_email
    "#{name} <#{email}>"
  end
  
  private
  
  def set_default_message_type
    self.message_type ||= 'general'
  end
  
  def set_priority_based_on_type
    self.priority = %w[job_opportunity collaboration project_inquiry].include?(message_type)
  end
  
  def send_notification_email
    # Send notification to admin
    ContactMessageMailer.new_message_notification(self).deliver_later
    
    # Send auto-reply confirmation to sender
    ContactMessageMailer.auto_reply_confirmation(self).deliver_later
  end
end 