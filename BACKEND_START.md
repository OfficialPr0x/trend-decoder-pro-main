# 🚀 Start VIRALIFY Backend

## Quick Start

### 1. Open Terminal in Backend Folder
```bash
cd backend
```

### 2. Make Sure Dependencies are Installed
```bash
npm install
```

### 3. Create .env File (if not exists)
```bash
# Copy from example
cp env.example .env
```

### 4. Add Your OpenRouter API Key
Open `backend/.env` and add:
```
OPENROUTER_API_KEY=your_actual_key_here
PORT=3001
```

### 5. Start the Server
```bash
npm start
```

You should see:
```
🚀 VIRALIFY Backend Running on port 3001
📡 API Key Status: ✅ Configured
🔗 Endpoints:
   - GET  /api/health
   - GET  /api/models
   - POST /api/generate/image (SSE streaming)
   - POST /api/analyze (SSE streaming)
   - POST /api/generate/video

✨ Ready to create viral content!
```

## Troubleshooting

### Error: Cannot find module 'express'
**Solution:**
```bash
cd backend
npm install
```

### Error: OPENROUTER_API_KEY not found
**Solution:**
1. Create `backend/.env` file
2. Add: `OPENROUTER_API_KEY=sk-or-v1-your-key-here`
3. Get key from: https://openrouter.ai/keys

### Port 3001 Already in Use
**Solution:**
1. Change PORT in `.env`: `PORT=3002`
2. Update frontend: `src/services/openrouter-api.ts` line 3:
   ```typescript
   const BACKEND_URL = 'http://localhost:3002';
   ```

### Backend Starts but Extension Can't Connect
**Check:**
1. Backend is running: `curl http://localhost:3001/api/health`
2. Should return: `{"status":"ok","message":"VIRALIFY API with OpenRouter is running 🚀"}`
3. Check browser console for CORS errors
4. Make sure you rebuilt extension after code changes

## Testing Backend

### Test Health Endpoint
```bash
curl http://localhost:3001/api/health
```

### Test Models Endpoint
```bash
curl http://localhost:3001/api/models
```

### Test with Extension
1. Open Chrome
2. Go to TikTok video
3. Click VIRALIFY extension
4. Try "Analyze Video"
5. Watch console for progress logs

## Keep Backend Running

### Option 1: Leave Terminal Open
Just keep the terminal window open

### Option 2: Use PM2 (Production)
```bash
npm install -g pm2
cd backend
pm2 start server-openrouter.js --name viralify
pm2 logs viralify  # View logs
pm2 stop viralify  # Stop server
```

### Option 3: Use nodemon (Development)
```bash
cd backend
npm run dev  # Auto-restarts on file changes
```

## Backend Structure

```
backend/
├── server-openrouter.js   # Main server (OpenRouter integration)
├── server.js              # Alternative (OpenAI direct)
├── package.json           # Dependencies
├── .env                   # Your API keys (DON'T COMMIT)
└── env.example            # Template for .env
```

## API Endpoints

### GET /api/health
Check if backend is running

### GET /api/models
Get available models from OpenRouter

### POST /api/generate/image
Generate images with streaming progress
- Uses SSE for real-time updates
- Returns progress percentage
- Returns final image URL

### POST /api/analyze
Analyze TikTok videos with streaming
- Extracts viral insights
- Real-time progress updates
- Returns engagement score, hooks, recommendations

### POST /api/generate/video
Generate video storyboards
- Creates scene-by-scene breakdown
- Timing and transitions
- Audio suggestions

## Environment Variables

```bash
# Required
OPENROUTER_API_KEY=sk-or-v1-...

# Optional
PORT=3001                    # Server port (default: 3001)
NODE_ENV=development         # Environment
```

## Logs

Watch backend logs in real-time:
```bash
# In backend terminal you'll see:
VIRALIFY: Generating image with model: google/gemini-2.5-flash-image
VIRALIFY: Progress: 10 Connecting to AI model...
VIRALIFY: Progress: 30 Sending request to AI...
VIRALIFY: Progress: 95 Finalizing...
```

## Need Help?

1. Check STATUS.md for current issues
2. Check console logs (both terminal and browser)
3. Verify API key is valid at https://openrouter.ai
4. Make sure port 3001 is not blocked by firewall

