# Deployment Options

This project can be deployed in several ways depending on your needs.

## Option 1: Deploy to Netlify (Frontend Only)

### Prerequisites
1. [Netlify account](https://www.netlify.com/)
2. Deployed backend server (see options below)

### Steps
1. Fork this repository or push to your Git provider
2. Connect Netlify to your repository
3. Configure build settings:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL
5. Deploy!

### Configuration Files
- `netlify.toml` - Netlify build configuration
- `frontend/.env.production` - Production environment variables

## Option 2: Deploy Backend to Cloud Platform

Your backend needs to be deployed separately. Here are some options:

### Render (Recommended for Free Tier)
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Configure:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment variables**: 
     - `MONGODB_URI` = Your MongoDB connection string
     - `JWT_SECRET` = Your JWT secret
     - `JWT_EXPIRE` = Token expiration time
     - `PORT` = 10000 (Render's default)

### Railway
1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Set environment variables
5. Deploy!

### Heroku
1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Deploy using CLI or GitHub integration
4. Set environment variables in dashboard

## Option 3: Full Local Development

For development and testing:
1. Keep backend running locally: `npm run backend`
2. Run frontend in development mode: `npm run frontend`
3. Use ngrok to expose local backend:
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Expose port 5000
   ngrok http 5000
   
   # Update frontend/.env.local with ngrok URL
   ```

## Environment Variables Required

### Backend (.env file)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
```

### Frontend (.env files)
```env
# Development (.env.local)
REACT_APP_API_URL=http://localhost:5000/api

# Production (.env.production)
REACT_APP_API_URL=https://your-deployed-backend.com/api
```

## Deployment Architecture

```
┌─────────────────┐    ┌────────────────────┐
│    Internet     │────│  End User          │
└─────────────────┘    └────────────────────┘
         │
         ▼
┌─────────────────┐    ┌────────────────────┐
│   Netlify CDN   │────│  Browser           │
│  (Frontend)     │    │  (React App)       │
└─────────────────┘    └────────────────────┘
         │
         ▼
┌─────────────────┐
│  API Requests   │
│  (fetch/axios)  │
└─────────────────┘
         │
         ▼
┌─────────────────┐    ┌────────────────────┐
│  Your Backend   │────│  MongoDB Atlas     │
│  (Cloud Host)   │    │  (Database)        │
└─────────────────┘    └────────────────────┘
```

## Helpful Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Test Production Build Locally
```bash
cd frontend
npm run preview
```

### Check Build Output
```bash
cd frontend
ls -la dist/
```

## Need Help?

Check the detailed [Netlify Deployment Guide](NETLIFY_DEPLOYMENT_GUIDE.md) for step-by-step instructions.

For backend deployment, refer to your chosen platform's documentation.