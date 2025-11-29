# Educational Resource Library - Quick Start Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

## Quick Setup (5 minutes)

### Step 1: Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### Step 2: Backend Setup
```bash
# In terminal 1
cd backend
npm install
npm run seed    # Seeds database with sample data
npm run dev     # Starts backend on http://localhost:5000
```

### Step 3: Frontend Setup
```bash
# In terminal 2
cd frontend
npm install
npm run dev     # Starts frontend on http://localhost:3000
```

### Step 4: Access the Application
- Open browser: http://localhost:3000
- Login as Admin: admin@edu.com / admin123
- Login as User: john@edu.com / user123

## Default Credentials

### Admin Account
- Email: admin@edu.com
- Password: admin123
- Access: Full admin dashboard with CRUD operations

### User Accounts
- Email: john@edu.com or jane@edu.com
- Password: user123
- Access: Browse, search, download, and review resources

## Features to Try

### As User:
1. Browse resources on the dashboard
2. Use search and filters
3. Click "View Details" on any resource
4. Download resources (tracked automatically)
5. Leave ratings and feedback
6. View all feedback from other users

### As Admin:
1. View dashboard statistics
2. Click "Add New Resource" to create resources
3. Edit existing resources
4. Delete resources
5. View all users in the system

## Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB service
mongod
# Or on Windows (if installed as service)
net start MongoDB
```

### Port Already in Use
```bash
# Backend (default 5000)
# Change PORT in backend/.env

# Frontend (default 3000)
# Change port in frontend/vite.config.js
```

### Clear Database and Re-seed
```bash
cd backend
npm run seed
```

## Project Structure
```
hackathon/
├── backend/        # Node.js/Express API
├── frontend/       # React application
└── README.md       # Full documentation
```

## Tech Stack
- Frontend: React + React Router + Axios
- Backend: Node.js + Express + MongoDB
- Auth: JWT tokens
- Styling: Custom CSS with gradients

## Next Steps
- Read the full README.md for detailed documentation
- Explore the codebase
- Customize features as needed

---
Happy Coding! 🚀
