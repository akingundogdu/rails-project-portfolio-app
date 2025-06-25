# CORS Configuration for Portfolio API
# This allows the frontend application to make requests to our API

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # In development, allow all origins
    if Rails.env.development?
      origins '*'
    else
      # In production, only allow specific origins
      origins ENV.fetch('FRONTEND_URL', 'https://yourportfolio.com').split(',')
    end

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization', 'Content-Type'],
      credentials: false
  end
end 