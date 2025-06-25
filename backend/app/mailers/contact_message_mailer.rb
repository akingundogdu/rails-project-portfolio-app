class ContactMessageMailer < ApplicationMailer
  
  # Send notification to admin when new contact message is received
  def new_message_notification(contact_message)
    @contact_message = contact_message
    @admin_email = ENV.fetch('ADMIN_EMAIL', 'admin@portfolio.com')
    
    mail(
      to: @admin_email,
      subject: "New #{@contact_message.message_type_label}: #{@contact_message.subject}",
      reply_to: @contact_message.email
    )
  end
  
  # Send auto-reply confirmation to the person who submitted the form
  def auto_reply_confirmation(contact_message)
    @contact_message = contact_message
    
    mail(
      to: @contact_message.email,
      subject: "Thank you for your message - I'll get back to you soon!"
    )
  end
  
  # Send custom reply from admin
  def custom_reply(contact_message, reply_message, admin_email = nil)
    @contact_message = contact_message
    @reply_message = reply_message
    @admin_email = admin_email || ENV.fetch('ADMIN_EMAIL', 'admin@portfolio.com')
    
    mail(
      to: @contact_message.email,
      from: @admin_email,
      subject: "Re: #{@contact_message.subject}"
    )
  end
end 