class ProjectSerializer < ApplicationSerializer
  
  protected
  
  def serialize_item(project)
    base_attributes = {
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
      created_at: project.created_at.iso8601,
      updated_at: project.updated_at.iso8601,
      featured_image_url: project.featured_image_url
    }
    
    # Add detailed attributes if requested
    if option(:detailed, false)
      base_attributes.merge!(
        description: project.description,
        challenges: project.challenges,
        learnings: project.learnings,
        future_improvements: project.future_improvements,
        completed_at: project.completed_at&.iso8601,
        image_urls: project.image_urls
      )
    end
    
    base_attributes
  end
end 