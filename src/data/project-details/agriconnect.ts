export interface ProjectDetail {
  slug: string;
  title: string;
  content: string;
}

export const agriconnectDetails: ProjectDetail = {
  slug: 'agriconnect',
  title: 'AgriConnect - Smart Farming Social Platform',
  content: `# 🌾 AgriConnect - Smart Farming Social Platform

A comprehensive full-stack web application designed to empower farmers with modern technology, providing agricultural information, community support, AI assistance, and farm management tools all in one platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Features in Detail](#features-in-detail)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

AgriConnect is a social networking platform specifically designed for the agricultural community. It combines social media features with agricultural information systems, AI-powered assistance, weather forecasting, and task management to create a comprehensive digital ecosystem for farmers.

## ✨ Key Features

### 1. **User Authentication & Authorization**

- Secure user registration and login system
- JWT-based token authentication
- Role-based access control (farmers, experts)
- Password hashing with bcrypt
- "Remember me" functionality with extended token validity
- Forgot password functionality

### 2. **Social Media Timeline**

- Create, view, and delete posts with text and images
- Like and dislike functionality on posts
- Real-time post feed with timestamps
- User profile integration
- Comment system on posts
- Personal profile page showing user's posts
- Community engagement features

### 3. **Expert Chat System**

- Real-time chat functionality with agricultural experts
- Multiple conversation management
- Message history persistence
- Search functionality for experts
- Conversation threading
- Expert directory with specializations

### 4. **AI-Powered Agricultural Assistant (Gemini Integration)**

- Google Gemini AI integration for agricultural queries
- Intelligent crop advice and recommendations
- Pest control suggestions
- Farming best practices
- Context-aware responses
- Pre-set quick questions for common farming issues

### 5. **Comprehensive Crop Information Database**

- Detailed crop cultivation guides
- Information on varieties, soil requirements, and seed rates
- Planting and harvesting guidelines
- Fertilizer and irrigation recommendations
- Disease and pest control methods
- Post-harvest and storage information
- Crop-specific image gallery
- Pagination for easy browsing

### 6. **Weather Forecasting**

- Real-time weather information
- Location-based weather search
- 7-day weather forecast
- Temperature, humidity, and wind speed data
- Heat index calculations
- Visual weather representations
- City-based weather tracking

### 7. **Task & Calendar Management**

- Personal farming task scheduler
- Calendar view of tasks
- Task creation with due dates
- Task status tracking (Pending/Completed)
- Todo list view
- Visual calendar interface with react-big-calendar
- Task reminders and notifications

### 8. **Expert Management System**

- Expert profiles with specializations
- Qualification and achievement tracking
- Expert directory
- CRUD operations for expert information
- Expert search and filtering

### 9. **Comment System**

- Thread-based commenting on posts
- Comment creation and deletion
- User attribution for comments
- Timestamp tracking
- Comment moderation

### 10. **Engagement Analytics**

- Like and dislike counting
- Post engagement metrics
- User activity tracking
- Interaction history

## 🛠️ Technology Stack

### Frontend

- **Framework:** React 18.2.0
- **Build Tool:** Vite & Webpack
- **Routing:** React Router DOM v6
- **UI Libraries:**
  - Material-UI (MUI) v5
  - Chakra UI
  - Bootstrap & React Bootstrap
  - DaisyUI with Tailwind CSS
- **Calendar:** React Big Calendar, @aldabil/react-scheduler
- **Styling:**
  - Tailwind CSS
  - Styled Components
  - CSS Modules
  - PostCSS & Autoprefixer
- **Icons:**
  - React Icons
  - FontAwesome
  - Material Icons
- **AI Integration:** @google/generative-ai (Gemini)
- **HTTP Client:** Axios
- **Date Handling:**
  - Moment.js
  - date-fns
  - React DatePicker
- **Notifications:** React Toastify
- **Animations:** Framer Motion
- **State Management:** React Context API

### Backend

- **Framework:** FastAPI (Python)
- **Database:** SQLite (Development), MySQL/PostgreSQL compatible
- **ORM:** SQLAlchemy
- **Authentication:**
  - JWT (JSON Web Tokens)
  - OAuth2 with Password Bearer
  - Python-JOSE
- **Security:**
  - Passlib for password hashing
  - Bcrypt algorithm
- **Validation:** Pydantic schemas
- **CORS:** FastAPI CORS Middleware

### Database Models

- Users
- Posts
- Comments
- Likes
- Experts
- Chat History
- Tasks
- Crop Information

## 🏗️ System Architecture

\`\`\`
┌─────────────────────────────────────────┐
│           Frontend (React)              │
│  ┌───────────────────────────────────┐  │
│  │  Pages Layer                      │  │
│  │  - Home, Timeline, Profile, etc.  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Components Layer                 │  │
│  │  - Reusable UI Components         │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Context API (State Management)   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    ↕ HTTP/REST
┌─────────────────────────────────────────┐
│         Backend (FastAPI)               │
│  ┌───────────────────────────────────┐  │
│  │  API Routes Layer                 │  │
│  │  - REST Endpoints                 │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Authentication Middleware        │  │
│  │  - JWT Validation                 │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Business Logic Layer             │  │
│  │  - Routers & Controllers          │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  ORM Layer (SQLAlchemy)           │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│         Database (SQLite)               │
│  - Users, Posts, Comments, etc.         │
└─────────────────────────────────────────┘

        External Services
┌──────────────┐  ┌──────────────┐
│ Google Gemini│  │  Weather API │
│      AI      │  │              │
└──────────────┘  └──────────────┘
\`\`\`

## 📱 Features in Detail

### Social Timeline System

The timeline acts as the central hub where farmers can:

- Share farming experiences, tips, and success stories
- Post images of their crops, equipment, or farmland
- Engage with other farmers' content through likes/dislikes
- Comment on posts to build community discussions
- View posts in reverse chronological order
- Track post engagement metrics

### AI Agricultural Assistant

Powered by Google's Gemini AI, providing:

- Intelligent responses to farming queries
- Crop-specific advice and recommendations
- Pest identification and control methods
- Soil management suggestions
- Irrigation scheduling advice
- Disease diagnosis support
- Quick-answer cards for common questions

### Crop Information System

Comprehensive database covering:

- Multiple crop varieties
- Land and soil requirements
- Seed rates and treatment methods
- Seedbed preparation techniques
- Transplanting guidelines
- Fertilizer application schedules
- Irrigation management
- Weed control strategies
- Pest and disease management
- Optimal harvesting times
- Post-harvest handling and storage

### Task Management

Farmers can:

- Create farming tasks with descriptions
- Set due dates and deadlines
- Mark tasks as pending or completed
- View tasks in calendar format
- Track all farming activities
- Plan seasonal farming operations

### Weather Integration

Real-time weather data provides:

- Current temperature and conditions
- Humidity levels
- Wind speed measurements
- Heat index calculations
- 7-day forecast
- Location-based forecasts
- Visual weather indicators

### Expert Consultation

Connect with agricultural experts who have:

- Verified qualifications
- Specific specializations (crops, livestock, soil science, etc.)
- Achievement records
- Real-time chat availability
- Response history

## 🚀 Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

\`\`\`bash
# Navigate to backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install dependencies
pip install fastapi sqlalchemy pydantic python-jose passlib bcrypt python-multipart uvicorn

# Run the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

The API will be available at \`http://localhost:8000\`
API documentation (Swagger UI): \`http://localhost:8000/docs\`

### Frontend Setup

\`\`\`bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The application will be available at \`http://localhost:5173\` (Vite default)

### Database Initialization

The database is automatically created on first run using SQLAlchemy's \`create_all()\` method. The SQLite database file will be created at \`Backend/test.db\`.

### Environment Variables

Create a \`.env\` file in the Backend directory:

\`\`\`
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./test.db
\`\`\`

For production, update the database URL to use PostgreSQL or MySQL.

## 📡 API Endpoints

### Authentication

- \`POST /login\` - User login (returns JWT token)
- \`POST /addusers\` - User registration

### Users

- \`GET /users/me\` - Get current user info
- \`GET /users/{user_id}\` - Get user by ID
- \`GET /usersrole/{role}\` - Get users by role

### Posts

- \`POST /posts\` - Create new post (authenticated)
- \`GET /posts\` - Get all posts
- \`GET /posts/{author_id}\` - Get posts by author
- \`DELETE /posts/{post_id}\` - Delete post (authenticated)

### Comments

- \`POST /comments\` - Create comment (authenticated)
- \`GET /comments/{post_id}\` - Get comments for a post
- \`DELETE /comments/{comment_id}\` - Delete comment (authenticated)

### Likes

- \`POST /likes\` - Like/dislike a post (authenticated)
- \`GET /posts/{post_id}/likes-dislikes/count\` - Get like counts

### Tasks

- \`POST /tasks\` - Create task (authenticated)
- \`GET /tasks\` - Get user's tasks (authenticated)
- \`PUT /tasks/{task_id}\` - Update task status
- \`DELETE /tasks/{task_id}\` - Delete task (authenticated)

### Experts

- \`GET /experts\` - Get all experts
- \`POST /experts\` - Create expert profile
- \`PUT /experts/{expert_id}\` - Update expert
- \`DELETE /experts/{expert_id}\` - Delete expert

### Chat

- \`GET /chat/{chat_id}\` - Get chat history
- \`POST /chat\` - Send message

### Crop Information

- \`GET /crop-info\` - Get all crop information
- \`GET /crop-info/{crop_info_id}\` - Get specific crop info
- \`POST /crop-info\` - Add crop information
- \`DELETE /crop-info/{crop_info_id}\` - Delete crop info

## 📁 Project Structure

\`\`\`
swe/
├── Backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── oauth2.py            # JWT authentication logic
│   ├── utils.py             # Utility functions (hashing, etc.)
│   └── routers/
│       ├── auth.py          # Authentication routes
│       ├── user.py          # User management routes
│       ├── post.py          # Post management routes
│       ├── comment.py       # Comment routes
│       ├── likes.py         # Like/dislike routes
│       ├── task.py          # Task management routes
│       ├── expert.py        # Expert management routes
│       ├── chat.py          # Chat routes
│       └── cropinfo.py      # Crop information routes
│
└── Frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── App.jsx          # Main application component
    │   ├── main.jsx         # Application entry point
    │   ├── pages/           # Page components
    │   │   ├── HomePage.jsx
    │   │   ├── TimeLine.jsx
    │   │   ├── WeatherPage.jsx
    │   │   ├── GeminiPage.jsx
    │   │   ├── CropInfoPage.jsx
    │   │   ├── Chatting.jsx
    │   │   ├── TaskCalendarPage.jsx
    │   │   ├── Profile.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── SignUpPage.jsx
    │   ├── components/      # Reusable components
    │   │   ├── Navbar/
    │   │   ├── Header/
    │   │   ├── Hero/
    │   │   ├── Chat/
    │   │   ├── ChatHome/
    │   │   ├── WeatherCard/
    │   │   ├── Calendar/
    │   │   ├── CropCard/
    │   │   └── ...
    │   ├── Context/         # React Context for state management
    │   │   ├── context.jsx
    │   │   ├── Context.jsx
    │   │   └── ConversationContext.jsx
    │   ├── config/          # Configuration files
    │   │   └── Gemini.js    # Google Gemini AI config
    │   ├── assets/          # Images, icons, styles
    │   └── Hooks/           # Custom React hooks
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
\`\`\`

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Token expiration and refresh
- CORS protection
- SQL injection prevention via ORM
- Input validation using Pydantic
- Protected routes with authentication middleware
- Role-based access control

## 🎨 UI/UX Highlights

- Responsive design for mobile and desktop
- Material Design principles
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation
- Dark/Light theme support
- Accessible components

## 📊 Database Schema

### Users Table

- id (Primary Key)
- Username
- email (Unique)
- password (Hashed)
- role (farmer/expert)

### Posts Table

- id (Primary Key)
- content
- image_url
- likes_count
- dislikes_count
- timestamp
- author_id (Foreign Key → Users)

### Comments Table

- id (Primary Key)
- post_id (Foreign Key → Posts)
- content
- timestamp
- author_id (Foreign Key → Users)

### Likes Table

- id (Primary Key)
- post_id (Foreign Key → Posts)
- author_id (Foreign Key → Users)
- Type (like/dislike)

### Tasks Table

- id (Primary Key)
- contain (task description)
- created_at
- Due_at
- status (Pending/Completed)
- author_id (Foreign Key → Users)

### Experts Table

- id (Primary Key)
- name
- specialty
- image_url
- qualifications
- achievements (JSON)

### Chat History Table

- id (Primary Key)
- chat_id
- sender (Boolean)
- message
- timestamp

### Crop Info Table

- id (Primary Key)
- name
- variety
- land_and_soil
- seed_rate
- seed_treatment
- fertilizer_amount
- irrigation
- pest_control
- harvesting_time
- storage_info
- image_url
- info_source

## 🔮 Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] Mobile app development (React Native)
- [ ] Integration with IoT sensors for farm monitoring
- [ ] Marketplace for buying/selling agricultural products
- [ ] Video call support for expert consultations
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Community forums and groups
- [ ] Crop price tracking
- [ ] Government schemes and subsidy information
- [ ] Machine learning for crop disease detection
- [ ] Drone integration for field mapping
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Social sharing to other platforms

## 🤝 Contributing

This project was developed as a personal portfolio project. Feedback and suggestions are welcome!

## 📝 License

This project is for educational and portfolio purposes.

## 👨‍💻 Developer

Developed as a comprehensive full-stack project demonstrating modern web development practices, including:

- RESTful API design
- JWT authentication
- Real-time chat systems
- AI integration
- Responsive UI/UX
- Database design and ORM
- State management
- Third-party API integration

## 📞 Support

For questions or support, please refer to the project documentation or create an issue in the repository.

---

**Note:** This project showcases proficiency in full-stack development, including frontend frameworks (React), backend frameworks (FastAPI), database management (SQLAlchemy), authentication systems, AI integration, and modern web development practices.
`,
};

export default agriconnectDetails;
