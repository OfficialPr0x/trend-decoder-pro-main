# 🔧 Setup Guide - Viralify Platform

## Step-by-Step Installation

### 1. Install Dependencies

```bash
# From the root directory, run:
npm run install:all
```

This will install dependencies for:
- Root project
- Backend server
- Dashboard frontend

### 2. Configure Backend

Create `backend/.env` file:

```bash
cd backend
cat > .env << 'EOF'
RAPIDAPI_KEY=8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac
TIKTOK_API_PORT=3001
EOF
cd ..
```

> **Note**: The API key provided is a demo key. For production, get your own key from [RapidAPI](https://rapidapi.com/tiktok-api23/api/tiktok-api23)

### 3. Configure Dashboard

Create `dashboard/.env.local` file:

```bash
cd dashboard
cat > .env.local << 'EOF'
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3002
EOF
cd ..
```

### 4. Start the Platform

```bash
# From root directory:
npm start
```

This starts both services:
- **Backend**: http://localhost:3001
- **Dashboard**: http://localhost:3002

### 5. Verify Installation

Open your browser and visit:
- Dashboard: http://localhost:3002
- API Health: http://localhost:3001/health

## 🎯 Quick Test

### Test the Analytics Feature

1. Go to http://localhost:3002/dashboard/analytics
2. Paste any TikTok video URL (e.g., `https://www.tiktok.com/@username/video/1234567890`)
3. Click "ANALYZE"
4. View the virality score and metrics

### Test the Trending Dashboard

1. Go to http://localhost:3002/dashboard/top-10s
2. Browse through different tabs:
   - Videos
   - Creators
   - Hashtags
   - Songs
   - Keywords
   - Products
   - Ads
3. Change country/period filters
4. Click "Refresh" to reload data

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001  # Windows
lsof -i :3001                  # Mac/Linux

# Kill the process if needed
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### Dashboard won't start
```bash
# Check if port 3002 is in use
netstat -ano | findstr :3002  # Windows
lsof -i :3002                  # Mac/Linux
```

### API returns errors
1. Check `backend/.env` exists with valid `RAPIDAPI_KEY`
2. Verify backend is running: `curl http://localhost:3001/health`
3. Check console for error messages

### No data showing in Trending tabs
- This is normal if RapidAPI returns empty data
- The API has rate limits - wait a moment and try again
- Check if your API key is valid and has remaining requests

## 🔄 Development Workflow

### Start services separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Dashboard
cd dashboard
npm run dev
```

### Check logs:

Both services output colored logs:
- **[BACKEND]** - Blue text
- **[DASHBOARD]** - Magenta text

### Stop all services:

Press `Ctrl+C` in the terminal running `npm start`

## 📦 Manual Installation (Alternative)

If `npm run install:all` doesn't work:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install dashboard dependencies
cd dashboard
npm install
cd ..
```

## 🚀 Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Deploy `backend/` directory
3. Ensure Node.js 18+ is available
4. Run `node tiktok-api-server.js`

### Dashboard
1. Set `NEXT_PUBLIC_BACKEND_API_URL` to your backend URL
2. Run `npm run build` in dashboard directory
3. Deploy `.next` folder or use Vercel/Netlify auto-deploy

## 📊 API Usage

### Test endpoints directly:

```bash
# Get trending videos
curl "http://localhost:3001/api/trending/video?country=US&limit=5"

# Get trending creators
curl "http://localhost:3001/api/trending/creator?country=US&limit=5"

# Analyze a video
curl -X POST http://localhost:3001/api/analytics/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"videoUrl":"https://www.tiktok.com/@user/video/7306132438047116586"}'
```

## 🎨 Customization

### Change ports:

**Backend**: Edit `backend/.env`
```env
TIKTOK_API_PORT=5000
```

**Dashboard**: Edit `dashboard/package.json`
```json
{
  "scripts": {
    "dev": "next dev -p 3005"
  }
}
```

Don't forget to update `NEXT_PUBLIC_BACKEND_API_URL` in dashboard `.env.local`

### Change theme colors:

Edit `dashboard/src/styles/globals.css`

### Modify API endpoints:

Edit `backend/tiktok-api-server.js`

## ✅ Checklist

Before considering setup complete:

- [ ] Backend starts without errors
- [ ] Dashboard loads at localhost:3002
- [ ] API health check returns OK
- [ ] Analytics page can analyze videos
- [ ] Trending tabs load data
- [ ] No console errors in browser
- [ ] Backend logs show successful API calls

## 💡 Next Steps

1. **Customize the dashboard** - Add your branding
2. **Set up monitoring** - Track API usage
3. **Implement caching** - Add Redis for better performance
4. **Add authentication** - Integrate Supabase
5. **Deploy to production** - Use Vercel + Railway/Render

## 📞 Support

If you encounter issues:
1. Check the console/terminal for errors
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Try restarting the services
5. Check RapidAPI dashboard for API quota

---

**Happy coding! 🎉**

