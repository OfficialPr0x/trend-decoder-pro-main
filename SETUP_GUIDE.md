# VIRALIFY Setup Guide - Real TikTok Analysis

## Overview

VIRALIFY now includes a real backend that:
- Downloads TikTok videos
- Extracts frames
- Analyzes content with AI (OpenAI Vision)
- Extracts real engagement metrics
- Calculates virality scores

## Prerequisites

1. **Node.js** (v18+)
2. **Python** (for yt-dlp)
3. **FFmpeg** (for video processing)
4. **OpenAI API Key** (for AI analysis)

## Installation Steps

### 1. Install Required Tools

#### Windows:
```bash
# Install yt-dlp
pip install yt-dlp

# Install FFmpeg
# Download from https://ffmpeg.org/download.html
# Add to PATH

# Or use chocolatey:
choco install ffmpeg
choco install yt-dlp
```

#### Mac:
```bash
# Using Homebrew
brew install ffmpeg
brew install yt-dlp
```

#### Linux:
```bash
sudo apt update
sudo apt install ffmpeg
pip install yt-dlp
```

### 2. Set Up Backend

```bash
cd backend
npm install

# Create .env file
cp env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

### 3. Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

### 4. Build & Install Extension

```bash
# In root directory
npm run build

# Load in Chrome/Edge:
1. Go to chrome://extensions/
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the 'dist' folder
```

## How It Works

### Real Analysis Pipeline:

1. **Video Download**: Uses yt-dlp to download TikTok videos
2. **Frame Extraction**: FFmpeg extracts frames at 1fps
3. **AI Analysis**: 
   - Opening frame: Analyzes hook effectiveness
   - Middle frame: Checks story engagement
   - Ending frame: Evaluates loop potential
4. **Metrics Extraction**: Puppeteer scrapes real engagement data
5. **Virality Scoring**: Algorithm based on:
   - Engagement rate (likes/views)
   - Comment rate
   - Share rate (most important)
   - Trending audio usage
   - Hashtag optimization

### API Endpoints:

- `POST /api/analyze` - Main analysis endpoint
  ```json
  {
    "url": "https://www.tiktok.com/@user/video/123"
  }
  ```

- `GET /api/health` - Check if backend is running

## Costs

- **OpenAI Vision API**: ~$0.01-0.03 per video analysis
- **Storage**: Temporary files are auto-cleaned after 1 hour

## Troubleshooting

### "Backend Not Connected" Error
- Make sure backend server is running (`npm start` in backend folder)
- Check console for errors
- Verify API key is set correctly

### Video Download Fails
- Ensure yt-dlp is installed and updated: `yt-dlp -U`
- Some TikTok videos may be private/deleted

### Frame Extraction Fails
- Verify FFmpeg is installed: `ffmpeg -version`
- Check disk space for temporary files

### AI Analysis Fails
- Check OpenAI API key is valid
- Verify you have credits in your OpenAI account
- Rate limits: ~60 requests per minute

## Advanced Configuration

### Use Different AI Models

In `backend/server.js`, you can change:
```javascript
model: "gpt-4-vision-preview" // to "gpt-4o" or other vision models
```

### Adjust Frame Extraction Rate

```javascript
const frames = await extractFrames(videoPath, framesDir, 2); // 2 fps instead of 1
```

### Add Database Storage

The backend is ready for database integration. Add MongoDB or PostgreSQL to store:
- Analysis history
- User accounts
- Cached results

## Security Notes

- Never commit .env files
- Use environment variables in production
- Consider rate limiting for public deployment
- Implement user authentication for commercial use

## Future Enhancements

1. **Audio Analysis**: Extract and analyze trending sounds
2. **Competitor Analysis**: Compare multiple videos
3. **Batch Processing**: Analyze multiple videos at once
4. **Export Reports**: Generate PDF reports
5. **Webhook Integration**: Send results to Discord/Slack
6. **ML Model**: Train custom model on viral videos

## Support

For issues or questions:
1. Check console logs in both browser and backend
2. Ensure all dependencies are installed
3. Verify TikTok URL is public and accessible

---

Happy analyzing! 🚀 Make those videos go viral! 🎬
