class Api::V1::ExperiencesController < Api::V1::BaseController
  
  def index
    experiences = Experience.all
    
    # Apply filters
    experiences = apply_filters(experiences)
    experiences = apply_sorting(experiences)
    
    render_success(
      serialize_experiences(experiences),
      message: 'Work experiences retrieved successfully'
    )
  end
  
  private
  
  def apply_filters(experiences)
    # Filter by employment type
    if params[:employment_type].present? && Experience.employment_types.include?(params[:employment_type])
      experiences = experiences.by_employment_type(params[:employment_type])
    end
    
    # Filter current positions only
    if params[:current] == 'true'
      experiences = experiences.current
    elsif params[:current] == 'false'
      experiences = experiences.past
    end
    
    # Filter featured experiences
    if params[:featured] == 'true'
      experiences = experiences.featured
    end
    
    # Filter by technology
    if params[:technology].present?
      tech_query = "%#{params[:technology].strip}%"
      experiences = experiences.where('technologies ILIKE ?', tech_query)
    end
    
    experiences
  end
  
  def apply_sorting(experiences)
    case params[:sort_by]
    when 'company_name'
      experiences.reorder(:company_name)
    when 'position'
      experiences.reorder(:position)
    when 'start_date'
      experiences.reorder(start_date: :desc)
    when 'end_date'
      experiences.reorder(end_date: :desc)
    else
      # Default: current positions first, then by start date (most recent first)
      experiences.reorder(current: :desc, start_date: :desc)
    end
  end
  
  def serialize_experiences(experiences)
    experiences.map { |experience| serialize_experience(experience) }
  end
  
  def serialize_experience(experience)
    {
      id: experience.id,
      company_name: experience.company_name,
      position: experience.position,
      description: experience.description,
      start_date: experience.start_date,
      end_date: experience.end_date,
      current: experience.current,
      employment_type: experience.employment_type,
      employment_type_label: experience.employment_type_label,
      location: experience.location,
      company_url: experience.company_url,
      company_logo_url: experience.company_logo_url,
      technologies_list: experience.technologies_list,
      achievements_list: experience.achievements_list,
      featured: experience.featured,
      duration_in_months: experience.duration_in_months,
      duration_text: experience.duration_text,
      sort_order: experience.sort_order,
      created_at: experience.created_at,
      updated_at: experience.updated_at
    }
  end
end 