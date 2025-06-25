class ApplicationSerializer
  include ActiveModel::Serialization
  
  def initialize(object, options = {})
    @object = object
    @options = options
  end
  
  def as_json(options = {})
    if @object.respond_to?(:each)
      @object.map { |item| serialize_item(item) }
    else
      serialize_item(@object)
    end
  end
  
  protected
  
  def serialize_item(item)
    raise NotImplementedError, 'Subclasses must implement serialize_item method'
  end
  
  def option(key, default = nil)
    @options.fetch(key, default)
  end
end 