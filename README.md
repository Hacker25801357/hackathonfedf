# Educational Resource Library

A full-stack web application for managing and accessing educational resources including textbooks, research papers, study guides, and more.

## 🚀 Features

### User Features
- **Browse Resources**: Search and filter educational materials by type, subject, and tags
- **View Details**: Access comprehensive information about each resource
- **Download**: Download resources with automatic tracking
- **Feedback System**: Rate and review resources
- **Responsive Design**: Fully responsive UI for all devices

### Admin Features
- **Resource Management**: Complete CRUD operations for resources
- **User Management**: View and manage all users
- **Dashboard**: Overview of statistics (resources, users, downloads, ratings)
- **Upload Resources**: Add new educational materials with detailed information

### Technical Features
- **Authentication**: Secure JWT-based authentication
- **Role-Based Access**: Separate user and admin roles
- **Real-time Updates**: Instant UI updates after operations
- **Form Validation**: Comprehensive client and server-side validation
- **Error Handling**: Clear error messages and success notifications
- **Data Persistence**: MongoDB for reliable data storage
- **Session Management**: localStorage for client-side session handling

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Custom responsive styling with modern gradients and animations
- **Vite**: Fast development server and build tool

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd hackathon
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already exists with default values)
# Edit .env if you need custom MongoDB URI or JWT secret

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:5000**

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on **http://localhost:3000**

## 🗄️ Database Seeding

The application includes seed data with:

**Users:**
- Admin: `admin@edu.com` / `admin123`
- User 1: `john@edu.com` / `user123`
- User 2: `jane@edu.com` / `user123`

**Resources:**
- 6 sample educational resources
- Various types (Textbooks, Research Papers, Study Guides, etc.)
- Sample feedback and ratings

To seed the database:
```bash
cd backend
npm run seed
```

## 📁 Project Structure

```
hackathon/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── resourceController.js # Resource CRUD operations
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification & authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Resource.js           # Resource schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── resourceRoutes.js     # Resource endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── utils/
│   │   └── tokenUtils.js         # JWT utilities
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express app entry point
│   ├── seedData.js               # Database seeder
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── ResourceCard.jsx  # Resource display card
    │   │   ├── ResourceForm.jsx  # Resource create/edit form
    │   │   └── SearchFilters.jsx # Search and filter component
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Dashboard.jsx     # User dashboard
    │   │   ├── ResourceDetail.jsx# Resource details page
    │   │   └── AdminDashboard.jsx# Admin dashboard
    │   ├── utils/
    │   │   └── api.js            # API service layer
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Resources
- `GET /api/resources` - Get all resources (Public)
- `GET /api/resources/:id` - Get resource by ID (Public)
- `POST /api/resources` - Create resource (Admin only)
- `PUT /api/resources/:id` - Update resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)
- `POST /api/resources/:id/feedback` - Add feedback (Protected)
- `PUT /api/resources/:id/download` - Increment download count (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🎨 Features Showcase

### User Flow
1. **Landing Page**: Welcome page with feature highlights
2. **Register/Login**: Secure authentication with validation
3. **Dashboard**: Browse all resources with search and filters
4. **Resource Details**: View full details, download, and leave feedback
5. **Logout**: Secure session termination

### Admin Flow
1. **Admin Login**: Login with admin credentials
2. **Admin Dashboard**: View statistics and analytics
3. **Manage Resources**: Create, edit, and delete resources
4. **User Management**: View all registered users
5. **Real-time Updates**: See changes immediately

## 🎯 Key Highlights

✅ **Complete Authentication**: JWT-based secure auth with role management  
✅ **Full CRUD Operations**: Complete resource lifecycle management  
✅ **Advanced Search**: Filter by type, subject, search text, and sort options  
✅ **User Feedback**: Rating and review system with average calculations  
✅ **Responsive Design**: Mobile-first approach with beautiful gradients  
✅ **Form Validation**: Both client and server-side validation  
✅ **Error Handling**: Comprehensive error messages  
✅ **Data Persistence**: MongoDB with Mongoose ODM  
✅ **Session Management**: localStorage for persistent sessions  
✅ **Clean Code**: Modular architecture with separation of concerns  

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes (frontend and backend)
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Secure HTTP headers

## 🎨 UI/UX Features

- Modern gradient backgrounds
- Smooth transitions and animations
- Hover effects on interactive elements
- Loading states for async operations
- Success/error notifications
- Responsive grid layouts
- Consistent color scheme
- Intuitive navigation

## 🚀 Deployment

### Backend Deployment (Multiple Options)

#### Option 1: Render (Recommended for Free Tier)
```bash
# Create account at render.com
# Create new Web Service
# Connect your repository
# Configure:
# - Build command: npm install
# - Start command: npm start
# - Environment variables:
#   - MONGODB_URI = your_mongodb_uri
#   - JWT_SECRET = your_jwt_secret
#   - JWT_EXPIRE = 7d
#   - PORT = 10000 (Render's default)
```

#### Option 2: Railway
```bash
# Create account at railway.app
# Create new project
# Deploy from GitHub
# Set environment variables in dashboard
```

#### Option 3: Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set JWT_EXPIRE=7d

# Deploy
git push heroku main
```

### Frontend Deployment

#### Option 1: Netlify (Recommended)
```bash
# Fork this repository or push to your Git provider
# Connect Netlify to your repository
# Configure build settings:
# - Build command: cd frontend && npm install && npm run build
# - Publish directory: frontend/dist
# Add environment variable in Netlify dashboard:
# - REACT_APP_API_URL = https://your-deployed-backend.com/api
# Deploy!
```

#### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Update API URL in src/utils/api.js to your backend URL
```

#### Option 3: Manual Deployment
```bash
# Build the frontend
cd frontend
npm run build

# The built files will be in the dist/ folder
# Upload these files to any static hosting provider
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/educational-library
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## 🧪 Testing

### Manual Testing Checklist
- ✅ User registration with validation
- ✅ User login with correct/incorrect credentials
- ✅ Protected routes redirect to login
- ✅ Admin can create/edit/delete resources
- ✅ Users can search and filter resources
- ✅ Users can view resource details
- ✅ Users can download resources
- ✅ Users can provide feedback
- ✅ Logout functionality
- ✅ Responsive design on mobile/tablet/desktop

## 🤝 Contributing

This is a hackathon project. Feel free to fork and modify as needed.

## 📄 License

ISC License

## 👨‍💻 Developer Notes

### Common Issues & Solutions

**Issue: MongoDB connection failed**
- Solution: Ensure MongoDB is running (`mongod` command)
- Check MONGODB_URI in .env file

**Issue: Port already in use**
- Solution: Change PORT in backend .env or kill process using the port

**Issue: CORS errors**
- Solution: Verify CORS configuration in server.js
- Check API_URL in frontend src/utils/api.js

**Issue: JWT token expired**
- Solution: Login again to get new token
- Adjust JWT_EXPIRE in .env for longer sessions

## 📞 Support

For issues or questions, please check the code comments or review the documentation.

## 🎉 Acknowledgments

Built with modern web technologies for educational purposes.

---

**Made with ❤️ for the Hackathon**
