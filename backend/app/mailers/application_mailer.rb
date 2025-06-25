class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('MAILER_FROM_EMAIL', 'noreply@portfolio.com')
  layout 'mailer'
  
  protected
  
  def default_url_options
    {
      host: ENV.fetch('FRONTEND_URL', 'localhost:3000'),
      protocol: Rails.env.production? ? 'https' : 'http'
    }
  end
end 