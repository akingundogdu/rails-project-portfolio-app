class Api::V1::BaseController < ApplicationController
  # Common API functionality for all V1 endpoints
  
  private
  
  def render_success(data, message: 'Success', status: :ok, meta: {})
    render json: {
      success: true,
      message: message,
      data: data,
      meta: meta
    }, status: status
  end
  
  def render_error(message, status: :bad_request, errors: [])
    render json: {
      success: false,
      message: message,
      errors: errors
    }, status: status
  end
  
  def render_not_found(resource = 'Resource')
    render json: {
      success: false,
      message: "#{resource} not found",
      errors: ["The requested #{resource.downcase} could not be found"]
    }, status: :not_found
  end
  
  def paginate_collection(collection, per_page: 10)
    page = params[:page].to_i
    page = 1 if page < 1
    
    offset = (page - 1) * per_page
    paginated_collection = collection.limit(per_page).offset(offset)
    total_count = collection.count
    total_pages = (total_count.to_f / per_page).ceil
    
    {
      collection: paginated_collection,
      meta: {
        current_page: page,
        per_page: per_page,
        total_count: total_count,
        total_pages: total_pages,
        has_next_page: page < total_pages,
        has_prev_page: page > 1
      }
    }
  end
end 