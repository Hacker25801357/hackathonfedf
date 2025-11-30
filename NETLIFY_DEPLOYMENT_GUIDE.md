# Deploying Educational Resource Library to Netlify

This guide will help you deploy your Educational Resource Library application to Netlify.

## Prerequisites

1. A [Netlify account](https://www.netlify.com/)
2. Your GitHub/GitLab/Bitbucket account connected to Netlify
3. A deployed backend server (can be hosted on Heroku, Render, Railway, or similar services)

## Deployment Steps

### Step 1: Prepare Your Backend

Before deploying the frontend, you need to have your backend deployed and accessible online.

#### Option A: Deploy Backend to a Cloud Platform
1. Deploy your backend to a platform like:
   - [Render](https://render.com/) (Free tier available)
   - [Railway](https://railway.app/) (Free tier available)
   - [Heroku](https://heroku.com/) (Free tier available)
   - Your own VPS or cloud server

2. Once deployed, note down your backend URL (e.g., `https://your-app.onrender.com`)

#### Option B: Keep Using Local Backend (Development Only)
For development/testing purposes, you can use tools like [ngrok](https://ngrok.com/) to expose your local backend:
```bash
# In your backend directory
npm run dev

# In another terminal
ngrok http 5000
```

### Step 2: Update Configuration Files

1. Update the `netlify.toml` file in your project root:
   ```toml
   # Replace this line:
   to = "https://your-backend-server.com/api/:splat"
   
   # With your actual backend URL:
   to = "https://your-deployed-backend-url.com/api/:splat"
   ```

2. Update the `frontend/.env.production` file:
   ```env
   # Replace this line:
   REACT_APP_API_URL=https://your-backend-server.com/api
   
   # With your actual backend URL:
   REACT_APP_API_URL=https://your-deployed-backend-url.com/api
   ```

### Step 3: Deploy to Netlify

#### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. Connect Netlify to your repository:
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Select your Git provider and repository
   - Configure the deployment settings:
     - **Build command**: `cd frontend && npm install && npm run build`
     - **Publish directory**: `frontend/dist`
   - Click "Deploy site"

#### Option 2: Deploy via Manual Upload

1. Build your frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Upload the `frontend/dist` folder to Netlify:
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Sites" then "Drag and drop your site folder here"
   - Select the `frontend/dist` folder

### Step 4: Configure Environment Variables

1. In Netlify Dashboard:
   - Go to your site settings
   - Navigate to "Environment variables"
   - Add the following variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-deployed-backend-url.com/api`

2. Rebuild your site:
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

### Step 5: Update MongoDB Atlas Network Access (If Needed)

If you're using MongoDB Atlas:

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to "Network Access" in your cluster
3. Add your Netlify IP address or allow access from anywhere (0.0.0.0/0) for testing

## Troubleshooting

### Common Issues

1. **API Calls Not Working**:
   - Check that your backend URL is correct in Netlify environment variables
   - Ensure your backend is running and accessible
   - Verify CORS settings in your backend

2. **Site Not Loading**:
   - Check the build logs in Netlify
   - Ensure all dependencies are correctly installed
   - Verify the publish directory is correct

3. **Environment Variables Not Working**:
   - Make sure variables start with `REACT_APP_`
   - Trigger a new deploy after adding variables

### Checking Deployment Status

1. Visit your Netlify site URL
2. Check the browser console for any errors
3. Monitor Netlify build logs
4. Test API connectivity

## Example Deployment Architecture

```
┌─────────────────┐    ┌────────────────────┐
│   Netlify CDN   │────│  User's Browser    │
└─────────────────┘    └────────────────────┘
         │
         ▼
┌─────────────────┐    ┌────────────────────┐
│  Frontend App   │    │  Static Assets     │
│  (React/Vite)   │    │  (HTML/CSS/JS)     │
└─────────────────┘    └────────────────────┘
         │
         ▼
┌─────────────────┐
│  API Requests   │
│  (Redirected)   │
└─────────────────┘
         │
         ▼
┌─────────────────┐    ┌────────────────────┐
│   Your Backend  │────│  MongoDB Atlas     │
│   (Hosted)      │    │  (Database)        │
└─────────────────┘    └────────────────────┘
```

## Next Steps

1. Set up a custom domain in Netlify
2. Enable SSL (automatic with Netlify)
3. Configure form handling if needed
4. Set up continuous deployment
5. Monitor site performance and analytics

## Need Help?

If you encounter any issues during deployment:

1. Check the Netlify build logs
2. Verify all configuration files
3. Ensure your backend is accessible
4. Contact Netlify support or check their documentation

Happy coding! 🚀