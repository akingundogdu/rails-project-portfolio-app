# Database seeds for Portfolio Backend
# Run with: rails db:seed

puts "🌱 Starting database seeding..."

# Clear existing data in development
if Rails.env.development?
  puts "🧹 Cleaning existing data..."
  ContactMessage.destroy_all
  Experience.destroy_all
  Skill.destroy_all
  Project.destroy_all
end

# Create Skills
puts "💻 Creating skills..."
skills_data = [
  # Frontend
  { name: 'React', category: 'frontend', proficiency_level: 9, years_of_experience: 4.5, featured: true, color_code: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', proficiency_level: 8, years_of_experience: 3.0, featured: true, color_code: '#3178C6' },
  { name: 'JavaScript', category: 'frontend', proficiency_level: 9, years_of_experience: 5.0, featured: true, color_code: '#F7DF1E' },
  { name: 'HTML5', category: 'frontend', proficiency_level: 9, years_of_experience: 6.0, featured: false, color_code: '#E34F26' },
  { name: 'CSS3', category: 'frontend', proficiency_level: 8, years_of_experience: 6.0, featured: false, color_code: '#1572B6' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency_level: 9, years_of_experience: 2.0, featured: true, color_code: '#06B6D4' },
  { name: 'Next.js', category: 'frontend', proficiency_level: 8, years_of_experience: 2.5, featured: true, color_code: '#000000' },
  
  # Backend
  { name: 'Ruby on Rails', category: 'backend', proficiency_level: 9, years_of_experience: 4.0, featured: true, color_code: '#CC0000' },
  { name: 'Node.js', category: 'backend', proficiency_level: 7, years_of_experience: 3.0, featured: true, color_code: '#339933' },
  { name: 'Python', category: 'backend', proficiency_level: 6, years_of_experience: 2.0, featured: false, color_code: '#3776AB' },
  { name: 'Ruby', category: 'languages', proficiency_level: 9, years_of_experience: 4.0, featured: true, color_code: '#CC342D' },
  
  # Database
  { name: 'PostgreSQL', category: 'database', proficiency_level: 8, years_of_experience: 3.5, featured: true, color_code: '#336791' },
  { name: 'MongoDB', category: 'database', proficiency_level: 6, years_of_experience: 2.0, featured: false, color_code: '#47A248' },
  { name: 'Redis', category: 'database', proficiency_level: 7, years_of_experience: 2.5, featured: false, color_code: '#DC382D' },
  
  # Tools & DevOps
  { name: 'Git', category: 'tools', proficiency_level: 9, years_of_experience: 5.0, featured: true, color_code: '#F05032' },
  { name: 'Docker', category: 'devops', proficiency_level: 7, years_of_experience: 2.0, featured: true, color_code: '#2496ED' },
  { name: 'AWS', category: 'devops', proficiency_level: 6, years_of_experience: 1.5, featured: false, color_code: '#232F3E' },
  { name: 'Heroku', category: 'devops', proficiency_level: 8, years_of_experience: 3.0, featured: false, color_code: '#430098' },
  
  # Design
  { name: 'Figma', category: 'design', proficiency_level: 7, years_of_experience: 2.0, featured: false, color_code: '#F24E1E' },
  { name: 'Adobe XD', category: 'design', proficiency_level: 6, years_of_experience: 1.5, featured: false, color_code: '#FF61F6' }
]

skills_data.each_with_index do |skill_attrs, index|
  skill = Skill.create!(skill_attrs.merge(sort_order: index))
  puts "  ✅ Created skill: #{skill.name}"
end

# Create Experiences
puts "💼 Creating work experiences..."
experiences_data = [
  {
    company_name: 'TechCorp Solutions',
    position: 'Senior Full Stack Developer',
    description: 'Led development of multiple web applications using React and Rails. Collaborated with product team to deliver user-centric features. Mentored junior developers and established coding standards.',
    start_date: Date.new(2022, 3, 1),
    end_date: nil,
    current: true,
    employment_type: 'full_time',
    location: 'San Francisco, CA (Remote)',
    company_url: 'https://techcorp.example.com',
    technologies: 'React, TypeScript, Ruby on Rails, PostgreSQL, AWS, Docker',
    achievements: "Increased application performance by 40%\nLed a team of 4 developers\nImplemented CI/CD pipeline reducing deployment time by 60%",
    featured: true
  },
  {
    company_name: 'StartupXYZ',
    position: 'Full Stack Developer',
    description: 'Developed and maintained multiple client projects using modern web technologies. Worked directly with clients for requirements gathering and project delivery.',
    start_date: Date.new(2020, 6, 1),
    end_date: Date.new(2022, 2, 28),
    current: false,
    employment_type: 'full_time',
    location: 'Austin, TX',
    company_url: 'https://startupxyz.example.com',
    technologies: 'React, Node.js, MongoDB, Express.js, GraphQL',
    achievements: "Delivered 15+ client projects on time\nReduced bug reports by 30% through improved testing\nBuilt reusable component library",
    featured: true
  },
  {
    company_name: 'Freelance',
    position: 'Web Developer',
    description: 'Provided web development services to small businesses and startups. Specialized in creating responsive, modern websites and web applications.',
    start_date: Date.new(2019, 1, 1),
    end_date: Date.new(2020, 5, 31),
    current: false,
    employment_type: 'freelance',
    location: 'Remote',
    technologies: 'HTML, CSS, JavaScript, WordPress, PHP, MySQL',
    achievements: "Completed 25+ freelance projects\nMaintained 98% client satisfaction rate\nGenerated $50k+ in revenue",
    featured: false
  }
]

experiences_data.each_with_index do |exp_attrs, index|
  experience = Experience.create!(exp_attrs.merge(sort_order: index))
  puts "  ✅ Created experience: #{experience.position} at #{experience.company_name}"
end

# Create Projects
puts "🚀 Creating projects..."
projects_data = [
  {
    title: 'E-Commerce Platform',
    short_description: 'Full-featured e-commerce platform with payment integration and admin dashboard.',
    description: 'A comprehensive e-commerce solution built with React and Rails API. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and an admin dashboard for inventory management.',
    github_url: 'https://github.com/username/ecommerce-platform',
    live_url: 'https://ecommerce-demo.example.com',
    technologies: 'React, TypeScript, Ruby on Rails, PostgreSQL, Stripe API, Tailwind CSS',
    status: 'completed',
    priority: 'high',
    published: true,
    featured: true,
    completed_at: Date.new(2023, 8, 15),
    challenges: 'Implementing secure payment processing and handling complex state management for the shopping cart.',
    learnings: 'Gained deep understanding of payment processing security and advanced React patterns.',
    future_improvements: 'Add wishlist functionality, advanced search filters, and mobile app version.'
  },
  {
    title: 'Task Management App',
    short_description: 'Collaborative task management application with real-time updates and team features.',
    description: 'A modern task management application that allows teams to collaborate effectively. Built with Next.js and Rails API, featuring real-time updates, drag-and-drop task organization, team management, and detailed analytics.',
    github_url: 'https://github.com/username/task-manager',
    live_url: 'https://taskmanager-demo.example.com',
    technologies: 'Next.js, React, Ruby on Rails, WebSockets, PostgreSQL, Tailwind CSS',
    status: 'completed',
    priority: 'high',
    published: true,
    featured: true,
    completed_at: Date.new(2023, 6, 30),
    challenges: 'Implementing real-time synchronization across multiple users and handling offline functionality.',
    learnings: 'Learned advanced WebSocket implementation and state synchronization techniques.',
    future_improvements: 'Add mobile app, advanced reporting, and integration with popular calendar applications.'
  },
  {
    title: 'Weather Dashboard',
    short_description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
    description: 'An elegant weather application that provides detailed weather information with beautiful visualizations. Features location-based weather, 7-day forecasts, interactive weather maps, and personalized weather alerts.',
    github_url: 'https://github.com/username/weather-dashboard',
    live_url: 'https://weather-dash.example.com',
    technologies: 'React, OpenWeather API, Mapbox, Chart.js, Tailwind CSS',
    status: 'completed',
    priority: 'medium',
    published: true,
    featured: false,
    completed_at: Date.new(2023, 4, 20),
    challenges: 'Handling API rate limits and creating smooth animations for weather data transitions.',
    learnings: 'Improved skills in data visualization and API optimization.',
    future_improvements: 'Add weather history analysis and social sharing features.'
  },
  {
    title: 'Social Media Analytics Tool',
    short_description: 'Analytics dashboard for social media performance tracking and insights.',
    description: 'A comprehensive analytics tool for social media managers to track performance across multiple platforms. Features automated data collection, customizable dashboards, performance insights, and automated reporting.',
    github_url: 'https://github.com/username/social-analytics',
    live_url: 'https://social-analytics.example.com',
    technologies: 'React, Node.js, MongoDB, Social Media APIs, D3.js, Material-UI',
    status: 'in_progress',
    priority: 'high',
    published: true,
    featured: true,
    challenges: 'Integrating multiple social media APIs and handling large datasets efficiently.',
    learnings: 'Advanced data processing techniques and complex dashboard design patterns.',
    future_improvements: 'Add AI-powered insights and competitor analysis features.'
  },
  {
    title: 'Personal Finance Tracker',
    short_description: 'Secure personal finance management app with budgeting and expense tracking.',
    description: 'A secure and user-friendly personal finance application that helps users manage their money effectively. Features include expense tracking, budget planning, financial goal setting, and detailed financial reports.',
    github_url: 'https://github.com/username/finance-tracker',
    technologies: 'Vue.js, Ruby on Rails, PostgreSQL, Chart.js, Plaid API',
    status: 'planned',
    priority: 'medium',
    published: false,
    featured: false,
    challenges: 'Ensuring data security and privacy while providing comprehensive financial insights.',
    learnings: 'Planning to learn advanced security practices and financial data handling.',
    future_improvements: 'Integration with investment tracking and tax preparation features.'
  }
]

projects_data.each do |project_attrs|
  project = Project.create!(project_attrs)
  puts "  ✅ Created project: #{project.title}"
end

# Create some sample contact messages
puts "📧 Creating sample contact messages..."
contact_messages_data = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Interested in collaborating on a project',
    message: 'Hi! I came across your portfolio and I\'m really impressed with your work. I have a project idea that I think would be perfect for your skills. Would you be interested in discussing a potential collaboration?',
    message_type: 'collaboration',
    read: false,
    priority: true
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Job Opportunity - Senior Developer Position',
    message: 'Hello, we have a senior developer position open at our company and your background looks like a great fit. The role involves working with React and Rails, which I see you have extensive experience with. Would you be open to a conversation about this opportunity?',
    message_type: 'job_opportunity',
    read: true,
    replied: false,
    priority: true,
    read_at: 2.days.ago
  },
  {
    name: 'Mike Wilson',
    email: 'mike.wilson@startup.com',
    subject: 'Question about your E-Commerce project',
    message: 'I saw your e-commerce platform project and I\'m curious about how you implemented the payment processing. Could you share some insights about the challenges you faced and how you overcame them?',
    message_type: 'project_inquiry',
    read: false,
    priority: false
  }
]

contact_messages_data.each do |message_attrs|
  message = ContactMessage.create!(message_attrs)
  puts "  ✅ Created contact message from: #{message.name}"
end

puts "✨ Database seeding completed successfully!"
puts "📊 Summary:"
puts "  - Skills: #{Skill.count}"
puts "  - Experiences: #{Experience.count}"
puts "  - Projects: #{Project.count}"
puts "  - Contact Messages: #{ContactMessage.count}"
puts "🎉 Ready to start developing!" 