# Viralify Dashboard

Enterprise-grade TikTok analytics, trending insights, and AI-powered video generation SaaS platform.

## Features

- **Authentication**: Supabase-powered login/signup with Google OAuth
- **Analytics Dashboard**: Real-time overview of analyses, videos, and performance metrics
- **Top 10s**: Comprehensive trending data across 7 categories
  - Trending Videos
  - Trending Creators
  - Trending Hashtags
  - Trending Songs
  - Trending Keywords
  - Top Products
  - Trending Ads
- **Video Generator**: Create faceless viral videos using AI and templates
- **Library**: Save and organize analyses with tags, folders, and notes
- **Settings**: Account management, subscription control, usage limits
- **Chrome Extension Integration**: Seamless sync between extension and dashboard

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js (existing backend at `/backend`)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe
- **APIs**: TikTok RapidAPI, OpenRouter AI
- **Video Generation**: Remotion + FFmpeg

## Setup

### 1. Install Dependencies

```bash
cd dashboard
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations (see `supabase/migrations/`)
3. Enable Google OAuth in Authentication settings
4. Create storage buckets: `videos`, `thumbnails`

### 4. Start Development Server

```bash
npm run dev
```

Dashboard will run on `http://localhost:3002`

### 5. Start Backend Server

In a separate terminal:

```bash
cd backend
npm start
```

Backend will run on `http://localhost:3001`

## Project Structure

```
dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/       # Dashboard pages
│   │   │   ├── page.tsx       # Home/Analytics
│   │   │   ├── top-10s/       # Top 10s trending data
│   │   │   ├── video-generator/ # Video generation
│   │   │   ├── library/       # Saved analyses
│   │   │   ├── analytics/     # Deep analytics
│   │   │   └── settings/      # User settings
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── DashboardSidebar.tsx
│   │   └── DashboardHeader.tsx
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   ├── stripe.ts          # Stripe integration
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── package.json
```

## API Endpoints

### Dashboard API (Backend)

- `GET /api/dashboard/top-10s/:type` - Get trending data
- `POST /api/dashboard/save-analysis` - Save analysis
- `GET /api/dashboard/user-analyses` - Get user's analyses
- `POST /api/dashboard/generate-video` - Queue video generation
- `POST /api/dashboard/sync-from-extension` - Sync from extension

### Types

- `videos`, `creators`, `hashtags`, `songs`, `keywords`, `products`, `ads`, `all`

### Example Request

```bash
curl http://localhost:3001/api/dashboard/top-10s/videos?country=US&period=7&limit=20
```

## Subscription Tiers

### Free
- 10 analyses/month
- 2 videos/month
- Basic support

### Pro ($29/mo)
- Unlimited analyses
- 50 videos/month
- Priority support
- Advanced analytics

### Enterprise ($99/mo)
- Everything in Pro
- Unlimited videos
- API access
- White-label option
- Dedicated support

## Development Workflow

1. **Create Feature Branch**: `git checkout -b feature/your-feature`
2. **Make Changes**: Code your feature
3. **Test Locally**: Ensure everything works
4. **Commit**: `git commit -m "Add feature"`
5. **Push**: `git push origin feature/your-feature`
6. **Create PR**: Open pull request for review

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to `main`

### Manual Deployment

```bash
npm run build
npm start
```

## Support

- Documentation: `/docs`
- Email: support@viralify.ai
- Discord: [Join our community](#)

## License

Proprietary - All rights reserved

