class Api::V1::ProjectsController < Api::V1::BaseController
  before_action :find_project, only: [:show]
  
  def index
    projects = Project.published
    
    # Apply filters
    projects = apply_filters(projects)
    projects = apply_sorting(projects)
    
    # Paginate results
    per_page = [params[:per_page].to_i, 50].min
    per_page = 12 if per_page <= 0
    
    paginated_data = paginate_collection(projects, per_page: per_page)
    
    render_success(
      serialize_projects(paginated_data[:collection]),
      message: 'Projects retrieved successfully',
      meta: paginated_data[:meta]
    )
  end
  
  def show
    # Increment view counter
    @project.increment!(:view_count)
    
    render_success(
      serialize_project(@project, detailed: true),
      message: 'Project retrieved successfully'
    )
  end
  
  private
  
  def find_project
    @project = Project.published.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_not_found('Project')
  end
  
  def apply_filters(projects)
    if params[:status].present?
      projects = projects.by_status(params[:status])
    end
    
    if params[:featured] == 'true'
      projects = projects.featured
    end
    
    if params[:search].present?
      search_query = "%#{params[:search].strip}%"
      projects = projects.where('title ILIKE ? OR description ILIKE ?', search_query, search_query)
    end
    
    projects
  end
  
  def apply_sorting(projects)
    case params[:sort_by]
    when 'title'
      projects.reorder(:title)
    when 'created_at'
      projects.reorder(created_at: :desc)
    else
      projects.reorder(featured: :desc, created_at: :desc)
    end
  end
  
  def serialize_projects(projects)
    projects.map { |project| serialize_project(project) }
  end
  
  def serialize_project(project, detailed: false)
    base_attrs = {
      id: project.id,
      title: project.title,
      short_description: project.short_description,
      github_url: project.github_url,
      live_url: project.live_url,
      technologies_list: project.technologies_list,
      status: project.status,
      priority: project.priority,
      featured: project.featured,
      view_count: project.view_count,
      created_at: project.created_at,
      updated_at: project.updated_at,
      featured_image_url: project.featured_image_url
    }
    
    if detailed
      base_attrs.merge!(
        description: project.description,
        challenges: project.challenges,
        learnings: project.learnings,
        future_improvements: project.future_improvements,
        completed_at: project.completed_at,
        image_urls: project.image_urls
      )
    end
    
    base_attrs
  end
end 