Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by uptime monitors like UptimeRobot or load balancer health checks.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "articles#index"
  
  # API routes
  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :show]
      resources :skills, only: [:index]
      resources :experiences, only: [:index]
      resources :contact_messages, only: [:create]
    end
  end
end 