# 🚀 Portfolio Application

A modern, full-stack portfolio application built with **Ruby on Rails** (API) and **React** (Frontend) with **TailwindCSS** and **Shadcn/UI**.

## 📋 **Project Overview**

This is a professional portfolio application showcasing projects, skills, work experience, and providing a contact form for potential clients and employers. The application is built with modern web technologies and follows best practices for scalability, security, and performance.

### **Tech Stack**
- **Backend**: Ruby on Rails 7.1+ (API mode)
- **Frontend**: React 18+ + Vite + TypeScript (Coming in Phase 2)
- **Styling**: TailwindCSS + Shadcn/UI (Coming in Phase 2)
- **Database**: PostgreSQL
- **Authentication**: JWT + Devise (Future implementation)
- **File Storage**: Active Storage + AWS S3 (Production)
- **Email**: ActionMailer with professional templates
- **Testing**: RSpec with comprehensive test suite
- **Deployment**: Railway/Heroku (Backend) + Vercel (Frontend)

## 🎯 **Current Status: Phase 1 Complete ✅**

### **✅ Completed Features (Phase 1: Backend Foundation)**

#### **🛠️ Rails API Setup**
- ✅ Rails 7.1+ API with PostgreSQL
- ✅ Essential gems (rack-cors, devise, jwt, image_processing)
- ✅ Development and test environment configuration
- ✅ RSpec testing framework setup
- ✅ Database connection and configuration

#### **🗄️ Database Models**
- ✅ **Project Model**: Portfolio projects with validations, scopes, Active Storage
- ✅ **Skill Model**: Technical skills with proficiency levels and categories
- ✅ **Experience Model**: Work history with duration calculations and validations
- ✅ **ContactMessage Model**: Contact form inquiries with priority system
- ✅ **Active Storage**: File upload capabilities for project images
- ✅ **Database Indexes**: Performance optimized with proper indexing

#### **🛡️ API Endpoints**
- ✅ **Projects API**: 
  - `GET /api/v1/projects` - List with filtering, search, pagination
  - `GET /api/v1/projects/:id` - Detailed project view
- ✅ **Skills API**: 
  - `GET /api/v1/skills` - List with category grouping and filtering
- ✅ **Experiences API**: 
  - `GET /api/v1/experiences` - Work history with filtering and sorting
- ✅ **Contact Messages API**: 
  - `POST /api/v1/contact_messages` - Submit contact form
- ✅ **Health Check**: `GET /up` - Application health monitoring

#### **📮 Email & Notifications**
- ✅ **ActionMailer Configuration**: Professional email templates
- ✅ **Contact Form Mailer**: Admin notifications + auto-reply confirmations
- ✅ **Beautiful Email Templates**: HTML and text versions
- ✅ **Background Job Processing**: Async email delivery with ActiveJob
- ✅ **SMTP Configuration**: Development and production ready

#### **🔧 Backend Configuration**
- ✅ **CORS Configuration**: Frontend integration ready
- ✅ **Error Handling**: Comprehensive error responses with proper HTTP status codes
- ✅ **Validation**: Input validation on all models with detailed error messages
- ✅ **Security**: Parameter filtering, CORS headers, secure configurations
- ✅ **Environment Variables**: Secure configuration management

## 🗂️ **Project Structure**

```
project-portfolio/
├── backend/                 # Rails API (Phase 1 ✅)
│   ├── app/
│   │   ├── controllers/     # API controllers with error handling
│   │   ├── models/          # Data models with validations
│   │   ├── mailers/         # Email notification system
│   │   ├── serializers/     # JSON response formatting
│   │   └── views/           # Email templates
│   ├── config/              # Rails configuration
│   ├── db/                  # Database migrations and seeds
│   └── spec/                # RSpec test suite
├── frontend/                # React SPA (Phase 2 - Coming Soon)
└── PORTFOLIO_ROADMAP.md     # Development roadmap
```

## 🚀 **API Documentation**

### **Base URL**
- Development: `http://localhost:3000/api/v1`
- Production: `https://your-api-domain.com/api/v1`

### **Available Endpoints**

#### **Projects**
```http
GET /api/v1/projects
```
**Query Parameters:**
- `page` - Page number for pagination
- `per_page` - Items per page (max 50)
- `status` - Filter by status (completed, in_progress, planned)
- `featured` - Filter featured projects (true/false)
- `search` - Search in title and description
- `sort_by` - Sort by (title, created_at, priority, view_count)

```http
GET /api/v1/projects/:id
```
Returns detailed project information including challenges, learnings, and image galleries.

#### **Skills**
```http
GET /api/v1/skills
```
**Query Parameters:**
- `category` - Filter by category (frontend, backend, database, etc.)
- `featured` - Filter featured skills (true/false)
- `grouped` - Group by category (true/false)
- `min_proficiency` - Filter by minimum proficiency level (1-10)

#### **Experiences**
```http
GET /api/v1/experiences
```
**Query Parameters:**
- `employment_type` - Filter by type (full_time, part_time, contract, etc.)
- `current` - Filter current positions (true/false)
- `featured` - Filter featured experiences (true/false)
- `technology` - Filter by technology used

#### **Contact Messages**
```http
POST /api/v1/contact_messages
```
**Request Body:**
```json
{
  "contact_message": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'm interested in collaborating...",
    "message_type": "collaboration"
  }
}
```

## 🔧 **Installation & Setup**

### **Prerequisites**
- Ruby 3.1+
- Rails 7.1+
- PostgreSQL 12+
- Node.js 18+ (for frontend - Phase 2)

### **Backend Setup**
1. **Clone the repository**
   ```bash
   git clone https://github.com/akingundogdu/rails-project-portfolio-app.git
   cd rails-project-portfolio-app
   ```

2. **Install dependencies**
   ```bash
   cd backend
   bundle install
   ```

3. **Database setup**
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

4. **Start the server**
   ```bash
   rails server
   ```

5. **API will be available at** `http://localhost:3000`

### **Environment Variables**

Create a `.env` file in the backend directory with:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

# Email Configuration
ADMIN_EMAIL=your-email@example.com
MAILER_FROM_EMAIL=noreply@yourportfolio.com
SMTP_ADDRESS=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:3000
```

## 🧪 **Testing**

Run the comprehensive test suite:

```bash
cd backend
bundle exec rspec
```

## 📊 **Sample Data**

The application comes with rich sample data including:
- **20+ Skills** across 9 categories (Frontend, Backend, Database, DevOps, Design, etc.)
- **3 Work Experiences** with detailed job descriptions and achievements
- **5 Portfolio Projects** with different statuses and comprehensive details
- **3 Sample Contact Messages** with different priorities and types

## 🚧 **Development Roadmap**

### **✅ Phase 1: Backend Foundation (COMPLETED)**
- Rails API setup and configuration
- Database models and migrations
- API endpoints with filtering and pagination
- Email notification system
- Comprehensive testing setup

### **🔄 Phase 2: Frontend Foundation (In Progress)**
- React + TypeScript + Vite setup
- TailwindCSS + Shadcn/UI integration
- API integration and state management
- Responsive component architecture

### **🔜 Phase 3: Core Components (Coming Soon)**
- Layout components and navigation
- Theme system (dark/light mode)
- Reusable UI components

### **🔜 Phase 4: Page Development**
- Home page with hero section
- Projects gallery with filtering
- About page with skills and experience
- Contact page with form validation

### **🔜 Phase 5: Advanced Features**
- Animations and interactions
- Search and filtering
- Progressive Web App features

## 🛡️ **Security Features**
- **CORS Configuration**: Secure cross-origin resource sharing
- **Input Validation**: Comprehensive model and API validation
- **Parameter Filtering**: Strong parameter filtering in controllers
- **Error Handling**: Secure error responses without sensitive data leakage
- **Environment Variables**: Secure configuration management

## 📈 **Performance Features**
- **Database Indexing**: Optimized database queries
- **Pagination**: Efficient data loading with pagination
- **Background Jobs**: Async email processing
- **Image Optimization**: Active Storage with variant processing
- **Caching**: Rails caching configuration

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

**Akin Gundogdu**
- Email: akin-gundogdu@hotmail.com
- GitHub: [@akingundogdu](https://github.com/akingundogdu)
- Portfolio: [Coming Soon!]

---

⭐ **Star this repository if you find it helpful!**

Built with ❤️ using Ruby on Rails and React 