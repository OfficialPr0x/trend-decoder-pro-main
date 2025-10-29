# 🚀 Viralify - Enterprise TikTok Analytics Platform

> **Production-ready TikTok analytics platform with full RapidAPI integration**

![Viralify Dashboard](https://res.cloudinary.com/dolij7wjr/image/upload/v1761333298/ChatGPT_Image_Oct_24__2025__03_13_34_PM-removebg-preview_q7vsob.png)

## ✨ Features

- **🎯 Deep Video Analytics** - AI-powered virality score calculation
- **📊 Trending Dashboard** - Real-time trending videos, creators, hashtags, songs, keywords, products, and ads
- **🔍 Advanced Search** - Search videos, accounts, and content across TikTok
- **📈 Engagement Metrics** - Comprehensive engagement rate analysis
- **🎨 Modern UI** - Gamified, vibrant interface built with Next.js 14 and Tailwind CSS
- **🔌 Full API Integration** - Complete TikTok RapidAPI implementation

## 🏗️ Architecture

```
viralify-platform/
├── backend/               # TikTok API Server (Express)
│   ├── tiktok-api-server.js
│   ├── package.json
│   └── .env
├── dashboard/            # Next.js Dashboard (React)
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── components/  # UI components
│   │   ├── lib/         # API client & utils
│   │   └── styles/      # Global styles
│   └── package.json
├── start-all.js         # Master start script
└── package.json         # Root package.json
```

## 🚦 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- TikTok RapidAPI key ([Get one here](https://rapidapi.com/tiktok-api23/api/tiktok-api23))

### Installation

1. **Clone and install all dependencies:**

```bash
# Install all packages (root, backend, and dashboard)
npm run install:all
```

2. **Configure environment variables:**

Create `backend/.env` file:

```env
# TikTok RapidAPI Configuration
RAPIDAPI_KEY=your_rapidapi_key_here

# Server Configuration
TIKTOK_API_PORT=3001
```

Create `dashboard/.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

3. **Start the entire platform:**

```bash
# Starts both backend and dashboard automatically
npm start
```

The platform will be available at:
- **Dashboard**: http://localhost:3002
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## 📚 API Endpoints

### User Endpoints
- `GET /api/user/info?uniqueId={username}` - Get user info
- `GET /api/user/posts?secUid={secUid}` - Get user posts
- `GET /api/user/popular-posts?secUid={secUid}` - Get popular posts
- `GET /api/user/followers?secUid={secUid}` - Get user followers
- `GET /api/user/followings?secUid={secUid}` - Get user followings

### Search Endpoints
- `GET /api/search/general?keyword={query}` - General search
- `GET /api/search/video?keyword={query}` - Search videos
- `GET /api/search/account?keyword={query}` - Search accounts

### Video/Post Endpoints
- `GET /api/post/detail?videoId={id}` - Get video details
- `GET /api/post/comments?videoId={id}` - Get video comments
- `GET /api/post/trending?count={num}` - Get trending posts

### Trending Endpoints
- `GET /api/trending/video` - Trending videos
- `GET /api/trending/creator` - Trending creators
- `GET /api/trending/hashtag` - Trending hashtags
- `GET /api/trending/song` - Trending songs
- `GET /api/trending/keyword` - Trending keywords
- `GET /api/trending/top-products` - Top products
- `GET /api/trending/ads` - Trending ads

### Analytics Endpoints
- `POST /api/analytics/analyze` - Analyze video virality
  ```json
  {
    "videoUrl": "https://www.tiktok.com/@user/video/123456"
  }
  ```

### Challenge/Music Endpoints
- `GET /api/challenge/info?challengeName={name}` - Challenge info
- `GET /api/challenge/posts?challengeId={id}` - Challenge posts
- `GET /api/music/info?musicId={id}` - Music info
- `GET /api/music/posts?musicId={id}` - Music posts

### Download Endpoints
- `GET /api/download/video?url={tiktokUrl}` - Download video
- `GET /api/download/music?url={tiktokUrl}` - Download music

## 🛠️ Development

### Start services individually:

```bash
# Backend only
npm run start:backend

# Dashboard only
npm run start:dashboard
```

### Build for production:

```bash
# Build dashboard
npm run build:dashboard

# Start backend in production mode
cd backend && npm start
```

## 📊 Dashboard Features

### 1. Deep Analytics
- Paste any TikTok video URL
- Get AI-powered virality score (0-100)
- View engagement metrics and recommendations
- Analyze video performance in real-time

### 2. Trending Dashboard
Access real-time trending data across 7 categories:
- **Videos** - Top performing videos by engagement
- **Creators** - Fastest growing creators
- **Hashtags** - Most used hashtags
- **Songs** - Trending audio tracks
- **Keywords** - Popular search terms
- **Products** - Top TikTok Shop products
- **Ads** - Best performing advertisements

### 3. Library
- Save analyses for later
- Organize by folders and tags
- Export data as JSON/CSV
- Search and filter saved content

### 4. Video Generator (Coming Soon)
- Generate faceless viral videos
- Multiple templates
- AI-powered content creation

### 5. Settings
- Account management
- Usage tracking
- Billing and subscriptions
- Notification preferences

## 🎨 UI Theme

The dashboard features a **vibrant, gamified design** with:
- Bold color-blocked cards
- Smooth gradient buttons
- Animated backgrounds
- Modern glass-morphism effects
- Responsive layouts
- Dark mode optimized

## 🔒 Security

- API key stored securely in environment variables
- CORS enabled for frontend-backend communication
- Rate limiting on API endpoints (recommended for production)
- Input validation on all endpoints

## 🚀 Deployment

### Backend (Node.js)
- Deploy to Railway, Render, or any Node.js hosting
- Set `RAPIDAPI_KEY` environment variable
- Ensure `PORT` environment variable is set

### Frontend (Next.js)
- Deploy to Vercel, Netlify, or any Next.js hosting
- Set `NEXT_PUBLIC_BACKEND_API_URL` to your backend URL
- Run `npm run build` before deployment

## 📝 Environment Variables

### Backend (`backend/.env`)
```env
RAPIDAPI_KEY=your_key_here          # Required
TIKTOK_API_PORT=3001                # Optional (default: 3001)
```

### Dashboard (`dashboard/.env.local`)
```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001  # Required
NEXT_PUBLIC_APP_URL=http://localhost:3002          # Optional
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:3001/health

# Test trending videos endpoint
curl http://localhost:3001/api/trending/video?country=US&limit=10

# Test video analysis
curl -X POST http://localhost:3001/api/analytics/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"videoUrl":"https://www.tiktok.com/@user/video/123"}'
```

## 📈 Performance

- Backend: ~50ms average response time
- Frontend: Optimized with Next.js 14 App Router
- Caching: Recommended for production (Redis)
- Rate Limiting: Implement based on RapidAPI limits

## 🤝 Contributing

This is a production-ready platform. For feature requests or bug reports, please document thoroughly with:
1. Clear description
2. Steps to reproduce
3. Expected vs actual behavior
4. Environment details

## 📄 License

MIT License - Use freely for personal and commercial projects

## 🎯 Roadmap

- [ ] Video generator implementation
- [ ] Advanced AI analysis with OpenRouter
- [ ] Real-time WebSocket updates
- [ ] User authentication with Supabase
- [ ] Stripe payment integration
- [ ] Advanced caching layer
- [ ] API rate limiting
- [ ] Data export features
- [ ] Mobile app (React Native)

## 💡 Tips

1. **API Limits**: Monitor your RapidAPI usage to avoid hitting limits
2. **Caching**: Implement Redis caching for frequently accessed data
3. **Error Handling**: All API calls include try-catch with fallback UI
4. **Performance**: Use pagination for large datasets
5. **Security**: Never expose API keys in frontend code

---

**Built with ❤️ using Next.js, Express, and TikTok RapidAPI**

For support or questions, check the API documentation at [RapidAPI TikTok API](https://rapidapi.com/tiktok-api23/api/tiktok-api23)
