# MongoDB Atlas Setup Guide (5 minutes)

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for FREE (no credit card required)
3. Choose "Shared" cluster (FREE tier - M0)

## Step 2: Create a Cluster
1. After signup, click "Build a Database"
2. Choose **FREE** M0 cluster
3. Select your preferred cloud provider (AWS recommended)
4. Choose a region close to you
5. Cluster Name: Keep default or name it "Cluster0"
6. Click **"Create Cluster"** (takes 1-3 minutes)

## Step 3: Create Database User
1. On the Security Quickstart screen:
   - **Username:** Choose a username (e.g., `eduuser`)
   - **Password:** Choose a strong password (e.g., `EduLib2025!`)
   - Click "Create User"
   
   **IMPORTANT:** Save these credentials!

## Step 4: Add Your IP Address
1. Under "Where would you like to connect from?"
2. Click "Add My Current IP Address"
3. Or click "Allow Access from Anywhere" (for development)
   - Enter: `0.0.0.0/0`
   - Description: "Allow all IPs"
4. Click "Finish and Close"

## Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://eduuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File
1. Open: `C:\Users\rajes\hackathon\backend\.env`
2. Replace the MONGODB_URI line with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://eduuser:EduLib2025!@cluster0.xxxxx.mongodb.net/educational-library?retryWrites=true&w=majority
   ```
   
   **Replace:**
   - `eduuser` with your username
   - `EduLib2025!` with your password (URL encode if it has special characters)
   - `cluster0.xxxxx.mongodb.net` with your actual cluster address
   - Keep `/educational-library` as the database name

## Step 7: Test Connection
```bash
cd C:\Users\rajes\hackathon\backend
npm run dev
```

You should see: **"MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net"**

## Step 8: Seed Database
```bash
npm run seed
```

## Troubleshooting

### Error: "bad auth"
- Check username and password are correct
- URL encode special characters in password:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`
  - `$` → `%24`

### Error: "IP not whitelisted"
- Go to Network Access in Atlas
- Click "Add IP Address"
- Select "Allow Access from Anywhere"

### Error: "MongooseServerSelectionError"
- Check your internet connection
- Verify the connection string is correct
- Make sure cluster is not paused

## Example .env File
```env
PORT=5000
MONGODB_URI=mongodb+srv://eduuser:EduLib2025!@cluster0.abc12.mongodb.net/educational-library?retryWrites=true&w=majority
JWT_SECRET=educational_library_secret_key_2025
JWT_EXPIRE=7d
```

## Quick Start After Setup
1. Terminal 1 - Backend:
   ```bash
   cd C:\Users\rajes\hackathon\backend
   npm run seed    # First time only
   npm run dev
   ```

2. Terminal 2 - Frontend:
   ```bash
   cd C:\Users\rajes\hackathon\frontend
   npm run dev
   ```

3. Access: http://localhost:3000

---

**That's it! Your cloud database is ready!** 🎉

No need to install MongoDB locally - Atlas handles everything for you!
