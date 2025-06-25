class Api::V1::ContactMessagesController < Api::V1::BaseController
  
  def create
    @contact_message = ContactMessage.new(contact_message_params)
    
    # Set additional metadata
    @contact_message.ip_address = request.remote_ip
    @contact_message.user_agent = request.user_agent
    
    if @contact_message.save
      # Email notifications are sent automatically via model callback
      
      render_success(
        serialize_contact_message(@contact_message),
        message: 'Your message has been sent successfully! Thank you for reaching out.',
        status: :created
      )
    else
      render_error(
        'Failed to send message. Please check your input and try again.',
        status: :unprocessable_entity,
        errors: @contact_message.errors.full_messages
      )
    end
  rescue StandardError => e
    Rails.logger.error "Error creating contact message: #{e.message}"
    render_error(
      'An error occurred while sending your message. Please try again later.',
      status: :internal_server_error
    )
  end
  
  private
  
  def contact_message_params
    params.require(:contact_message).permit(
      :name,
      :email,
      :subject,
      :message,
      :message_type
    )
  end
  
  def serialize_contact_message(contact_message)
    {
      id: contact_message.id,
      name: contact_message.name,
      email: contact_message.email,
      subject: contact_message.subject,
      message_type: contact_message.message_type,
      message_type_label: contact_message.message_type_label,
      priority: contact_message.priority,
      created_at: contact_message.created_at
    }
  end
end 