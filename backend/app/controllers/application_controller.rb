class ApplicationController < ActionController::API
  # CORS headers
  before_action :set_cors_headers
  
  # Error handling
  rescue_from StandardError, with: :handle_standard_error
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record
  
  private
  
  def set_cors_headers
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    response.set_header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, Token')
    response.set_header('Access-Control-Max-Age', '1728000')
  end
  
  def handle_standard_error(exception)
    Rails.logger.error "StandardError: #{exception.message}"
    Rails.logger.error exception.backtrace.join("\n")
    
    render json: {
      error: 'Internal server error',
      message: Rails.env.development? ? exception.message : 'Something went wrong'
    }, status: :internal_server_error
  end
  
  def handle_not_found(exception)
    render json: {
      error: 'Not found',
      message: exception.message
    }, status: :not_found
  end
  
  def handle_invalid_record(exception)
    render json: {
      error: 'Validation failed',
      message: exception.message,
      details: exception.record.errors.full_messages
    }, status: :unprocessable_entity
  end
end 