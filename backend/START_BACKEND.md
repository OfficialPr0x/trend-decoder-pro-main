# 🚀 Start VIRALIFY Backend

## Quick Start (Single Command)

```bash
npm start
```

That's it! The master server (`server-openrouter.js`) will start on **port 3001**.

---

## If Port 3001 is Already in Use

### Option 1: Kill the port first
```bash
npm run kill-port
npm start
```

### Option 2: Kill manually (Windows)
```powershell
# Find the process using port 3001
netstat -ano | findstr :3001

# Kill it (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

### Option 3: Kill manually (Mac/Linux)
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9
```

---

## Master Server Features

`server-openrouter.js` is the **single comprehensive backend** that includes:

✅ **Core Analysis**
- Quick Video Analysis (OpenRouter AI)
- BEAST MODE Deep Analysis (17+ RapidAPI endpoints)

✅ **Multi-Entity Scanning** (NEW)
- Profile Analysis
- Hashtag Analysis  
- Sound/Music Analysis

✅ **Viral Discovery** (NEW)
- Top 10 Trending Videos
- Top 10 Trending Sounds
- Top 10 Trending Hashtags
- Top 10 Trending Creators
- Top 10 Trending Keywords
- Top 10 Trending Products

✅ **Competitive Intelligence** (NEW)
- Creator positioning
- Sound saturation analysis
- Hashtag competition
- Niche opportunities

✅ **AI Generation**
- Image generation (Gemini/DALL-E)
- Video storyboard generation

---

## Configuration

Make sure you have a `.env` file in the `backend/` directory:

```env
# Required for AI analysis
OPENROUTER_API_KEY=your_openrouter_key_here

# Required for TikTok data (BEAST MODE, entity scanning, viral discovery)
X-RapidAPI-Key=your_rapidapi_key_here

# Optional - server port
PORT=3001
```

---

## Development Mode (Auto-restart on changes)

```bash
npm run dev
```

---

## API Endpoints Available

### Analysis
- `POST /api/analyze` - Quick video analysis (SSE streaming)
- `POST /api/analyze/deep` - BEAST MODE (17+ endpoints, SSE)

### Entity Scanning (NEW)
- `POST /api/scan/entity` - Scan profiles, hashtags, or sounds

### Viral Discovery (NEW)
- `POST /api/discover/trending` - Get Top 10 trending data

### Competitive Intelligence (NEW)
- `POST /api/analyze/competitive` - Competitive positioning analysis

### AI Generation
- `POST /api/generate/image` - Generate images (SSE)
- `POST /api/generate/video` - Generate video storyboards

### Utility
- `GET /api/health` - Health check
- `GET /api/models` - Available AI models

---

## Troubleshooting

### "EADDRINUSE" Error
- **Cause**: Another process is using port 3001
- **Fix**: Run `npm run kill-port` then `npm start`

### "Cannot find module" Error
- **Cause**: Missing dependencies
- **Fix**: Run `npm install` in the backend folder

### "RapidAPI key required" Error
- **Cause**: Missing or invalid RapidAPI key
- **Fix**: Add `X-RapidAPI-Key` to your `.env` file

### "OpenRouter API error"
- **Cause**: Missing or invalid OpenRouter key
- **Fix**: Add `OPENROUTER_API_KEY` to your `.env` file

---

## Notes

- ❌ **Do NOT use** `npm run start:server` (old server, deprecated)
- ✅ **Always use** `npm start` (master server with all features)
- The old `server.js` file is kept for reference but is not needed
- `server-openrouter.js` is the **single master server** with everything

---

## What Happened to server.js?

The old `server.js` used Puppeteer + FFmpeg to download videos and analyze frames. This was:
- Slow (had to download entire videos)
- Resource-intensive (video processing)
- Less reliable (web scraping can break)

The new `server-openrouter.js` uses **RapidAPI** which:
- ✅ Gets data instantly (no downloads)
- ✅ Much faster (API calls vs video processing)
- ✅ More reliable (official TikTok data)
- ✅ More features (17+ endpoints vs basic scraping)

**TL;DR**: Use `server-openrouter.js` - it's better in every way!

