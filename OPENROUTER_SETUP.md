# 🚀 VIRALIFY 2.0 - OpenRouter Edition Setup Guide

## 🧠 What's New

VIRALIFY now uses **OpenRouter** as a unified gateway to access multiple AI models:
- **Vision Models**: GPT-4 Vision, Claude 3 Opus, Gemini Pro
- **Image Generation**: Midjourney, DALL-E 3, Stable Diffusion, Nanobanana
- **Video Generation**: Sora 2, Kling, WAN (when available), Runway Gen-2
- **Text Analysis**: Claude 3 Opus, GPT-4 Turbo, Llama 3

## 📋 Prerequisites

1. **OpenRouter Account**: Sign up at [openrouter.ai](https://openrouter.ai)
2. **OpenRouter API Key**: Get from dashboard
3. **Node.js** (v18+)
4. **Python** (for yt-dlp)
5. **FFmpeg** (for video processing)

## 🛠️ Installation

### 1. Install System Dependencies

```bash
# Windows (using Chocolatey)
choco install ffmpeg yt-dlp

# Mac (using Homebrew)
brew install ffmpeg yt-dlp

# Linux
sudo apt update && sudo apt install ffmpeg
pip install yt-dlp
```

### 2. Setup Backend

```bash
cd backend
npm install

# Copy and edit .env
cp env.example .env
# Add your OpenRouter API key to .env
```

### 3. Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

### 4. Build Extension

```bash
# In root directory
npm run build
```

### 5. Install Extension

1. Open Chrome/Edge
2. Go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the `dist` folder

## 🎯 New Features

### 📑 Four Tabs in Sidebar

1. **Analyze Tab** 🔍
   - Extract current TikTok URL
   - AI-powered frame analysis
   - Virality scoring
   - One-click "Remix" button

2. **Create Tab** 🎨
   - Generate images with multiple models
   - Video storyboarding (full video gen coming soon)
   - Style presets for viral content
   - Direct save to library

3. **Library Tab** 📚
   - Save analyses and generated content
   - Filter by type (analysis/image/video)
   - Re-use previous prompts
   - Export capabilities

4. **Settings Tab** ⚙️
   - OpenRouter API key configuration
   - Model preferences
   - Theme selection (Graffiti/Cyberpunk/Y2K/Minimal)
   - Auto-analyze options

## 💰 Pricing via OpenRouter

OpenRouter charges per-token/request based on the model used:

| Model Type | Example Model | Approximate Cost |
|------------|--------------|------------------|
| Vision | GPT-4 Vision | ~$0.01-0.03/analysis |
| Text | Claude 3 Opus | ~$0.015/1K tokens |
| Image | DALL-E 3 | ~$0.04/image |
| Video | Runway Gen-2 | ~$0.05/second |

## 🔧 Configuration

### API Key Setup

1. Get your key from [OpenRouter Dashboard](https://openrouter.ai/keys)
2. In the extension:
   - Click Settings tab
   - Paste your OpenRouter API key
   - Click Save Settings

### Model Selection

In Settings, choose your preferred models for:
- Vision analysis
- Text generation  
- Image creation
- Video generation

## 🎬 Usage Flow

### Analyze → Remix → Create

1. **Navigate** to any TikTok video
2. **Open** VIRALIFY sidebar (click toggle button)
3. **Extract** URL in Analyze tab
4. **Analyze** the video (AI breaks down viral elements)
5. **Click "Remix"** to jump to Create tab with pre-filled prompt
6. **Generate** new content based on viral patterns
7. **Save** to library for future use

### Direct Creation

1. Go to **Create tab**
2. Choose **Image** or **Video**
3. Select your preferred **AI model**
4. Enter prompt or use **style presets**
5. Click **Generate**
6. **Download** or **Save to Library**

## 🚨 Troubleshooting

### "API Key not configured"
- Add your OpenRouter key in Settings tab
- Make sure to click Save Settings

### "Model not available"
- Some models (Sora 2, Kling) are coming soon
- Use alternative models in the meantime

### "Analysis failed"
- Check backend server is running
- Verify yt-dlp and ffmpeg are installed
- Ensure video is public

### Rate Limits
- OpenRouter has generous limits
- If hit, wait 60 seconds or upgrade plan

## 🔮 Coming Soon

- **Direct Sora 2 Integration**: When OpenAI releases API
- **Kling & WAN Models**: For advanced video generation
- **Nanobanana Styles**: Specialized viral image aesthetics
- **Batch Processing**: Analyze multiple videos at once
- **Team Collaboration**: Share libraries across team
- **Auto-posting**: Schedule generated content

## 📚 API Documentation

### Generate Image
```javascript
import { generateImage } from '@/services/openrouter-api';

const result = await generateImage({
  prompt: "Viral TikTok style dancing cat",
  model: "midjourney/midjourney",
  style: "viral-tiktok",
  size: "1024x1024"
});
```

### Generate Video Storyboard
```javascript
import { generateVideo } from '@/services/openrouter-api';

const result = await generateVideo({
  prompt: "30 second loop of satisfying content",
  model: "runway/gen-2",
  duration: 30,
  style: "loop-perfect"
});
```

### Analyze Content
```javascript
import { analyzeImage } from '@/services/openrouter-api';

const analysis = await analyzeImage(
  base64Image,
  "What makes this frame viral?"
);
```

## 🎯 Pro Tips

1. **Best Vision Model**: Claude 3 Opus for detailed analysis
2. **Fastest Image Gen**: DALL-E 3 via OpenRouter
3. **Video Storyboards**: Use Claude to plan before generating
4. **Cost Optimization**: Use smaller models for ideation
5. **Viral Patterns**: Save successful analyses for reference

## 🆘 Support

- **OpenRouter Issues**: support@openrouter.ai
- **Extension Bugs**: Create GitHub issue
- **Model Questions**: Check OpenRouter docs
- **Community**: Join Discord for tips

---

Happy Creating! Make those videos go VIRAL! 🚀🎬✨
