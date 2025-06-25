class Api::V1::SkillsController < Api::V1::BaseController
  
  def index
    skills = Skill.all
    
    # Apply filters
    skills = apply_filters(skills)
    
    # Group by category if requested
    if params[:grouped] == 'true'
      grouped_skills = group_skills_by_category(skills)
      render_success(
        grouped_skills,
        message: 'Skills retrieved and grouped successfully'
      )
    else
      render_success(
        serialize_skills(skills),
        message: 'Skills retrieved successfully'
      )
    end
  end
  
  private
  
  def apply_filters(skills)
    # Filter by category
    if params[:category].present? && Skill.categories.include?(params[:category])
      skills = skills.by_category(params[:category])
    end
    
    # Filter featured skills only
    if params[:featured] == 'true'
      skills = skills.featured
    end
    
    # Filter by minimum proficiency level
    if params[:min_proficiency].present?
      min_level = params[:min_proficiency].to_i
      skills = skills.where('proficiency_level >= ?', min_level) if min_level.between?(1, 10)
    end
    
    skills
  end
  
  def group_skills_by_category(skills)
    grouped = skills.group_by(&:category)
    
    result = {}
    grouped.each do |category, category_skills|
      result[category] = {
        category_name: category.humanize,
        skills: serialize_skills(category_skills),
        count: category_skills.count
      }
    end
    
    result
  end
  
  def serialize_skills(skills)
    skills.map { |skill| serialize_skill(skill) }
  end
  
  def serialize_skill(skill)
    {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency_level: skill.proficiency_level,
      proficiency_percentage: skill.proficiency_percentage,
      proficiency_label: skill.proficiency_label,
      years_of_experience: skill.years_of_experience,
      description: skill.description,
      featured: skill.featured,
      icon_url: skill.icon_url,
      color_code: skill.color_code,
      icon_name: skill.icon_name,
      sort_order: skill.sort_order,
      created_at: skill.created_at,
      updated_at: skill.updated_at
    }
  end
end 