# Viralify Dashboard - Quick Start Guide

Get your enterprise-grade TikTok analytics dashboard up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- Stripe account (optional, for payments)
- Backend server running (see `/backend`)

## Step 1: Install Dependencies

```bash
cd dashboard
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish setting up (2-3 minutes)

### 2.2 Run Database Schema

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste and click **Run**
6. Wait for success message

### 2.3 Enable Google OAuth (Optional)

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials
4. Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 2.4 Create Storage Buckets

1. Go to **Storage** in Supabase dashboard
2. Create bucket: `videos` (for generated videos)
3. Create bucket: `thumbnails` (for video thumbnails)
4. Set both buckets to **Public**

### 2.5 Get Your API Keys

1. Go to **Settings** > **API**
2. Copy these values:
   - Project URL
   - Anon/Public key
   - Service Role key (keep this secret!)

## Step 3: Configure Environment Variables

Create `.env.local` in the `/dashboard` directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001

# Stripe (optional for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenRouter (optional - can use backend's key)
OPENROUTER_API_KEY=sk-or-v1-...
```

## Step 4: Start the Backend Server

In a new terminal:

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:3001`

## Step 5: Start the Dashboard

```bash
cd dashboard
npm run dev
```

Dashboard will run on `http://localhost:3002`

## Step 6: Test the Setup

1. Open `http://localhost:3002` in your browser
2. Click **Sign Up** to create an account
3. You should be redirected to the dashboard!

## Features Overview

### 🏠 Home Dashboard
- Usage statistics
- Recent analyses
- Quick actions
- Upgrade prompts

### 📊 Top 10s
- Trending Videos
- Trending Creators
- Trending Hashtags
- Trending Songs
- Trending Keywords
- Top Products
- Trending Ads

### 🎬 Video Generator
- Choose from 4 templates
- Customize colors, text, music
- Track generation queue
- Download completed videos

### 📚 Library
- Save analyses
- Organize with folders
- Tag and search
- Grid/list views

### 📈 Analytics
- Deep video analysis
- AI-powered insights
- Virality scoring
- Frame-by-frame breakdown

### ⚙️ Settings
- Account management
- Subscription billing
- Usage tracking
- Notifications

## API Endpoints

### Dashboard API (Backend Port 3001)

```bash
# Get trending videos
GET /api/dashboard/top-10s/videos?country=US&period=7&limit=20

# Get trending creators
GET /api/dashboard/top-10s/creators?country=US&limit=20

# Get all trending data
GET /api/dashboard/top-10s/all?country=US&period=7

# Save analysis
POST /api/dashboard/save-analysis
Body: { userId, tiktokUrl, videoId, metadata, frameAnalysis, viralityScore, recommendations }

# Queue video generation
POST /api/dashboard/generate-video
Body: { userId, template, data, customization }

# Sync from extension
POST /api/dashboard/sync-from-extension
Body: { userId, analyses, timestamp }
```

## Troubleshooting

### "Cannot connect to database"
- Check Supabase project URL in `.env.local`
- Verify your API keys are correct
- Make sure Supabase project is running

### "Authentication failed"
- Clear browser cache and cookies
- Check Supabase Auth is enabled
- Verify redirect URLs are configured

### "Top 10s not loading"
- Ensure backend server is running on port 3001
- Check RapidAPI key in backend `.env`
- Look for errors in backend console

### "Video generation not working"
- This requires Remotion setup (coming in Phase 3)
- For now, it will show "queued" status

## Next Steps

### Phase 2: Stripe Integration
1. Create Stripe account
2. Set up products and pricing
3. Add API keys to `.env.local`
4. Test checkout flow

### Phase 3: Video Generation
1. Install Remotion
2. Create video templates
3. Set up rendering server
4. Test video generation

### Phase 4: Chrome Extension Integration
1. Update extension with Supabase auth
2. Add sync functionality
3. Test bidirectional sync

## Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Import project
4. Add environment variables
5. Deploy!

```bash
# Or deploy manually
npm run build
vercel --prod
```

### Update Environment Variables

In Vercel dashboard, add all your `.env.local` variables.

### Update Supabase URLs

In Supabase Auth settings, add your production URLs:
- `https://your-app.vercel.app`
- `https://your-app.vercel.app/**`

## Support

- **Documentation**: Check README.md files
- **Issues**: Create GitHub issue
- **Discord**: Join our community
- **Email**: support@viralify.ai

## Pro Tips

1. **Cache Performance**: Top 10s data is cached for 6 hours - use refresh button to update
2. **Usage Limits**: Free tier has limits - upgrade for unlimited access
3. **Analytics**: Save your analyses to library for later reference
4. **Trending Data**: Check multiple countries to find global trends
5. **Video Generator**: Start with "Faceless Viral" template - it's the most popular!

## What's Included

✅ Complete Next.js 14 dashboard
✅ Supabase authentication
✅ User profiles and settings
✅ Top 10s trending data
✅ Video generator UI
✅ Library management
✅ Analytics tools
✅ Usage tracking
✅ Dark/light theme
✅ Responsive design
✅ Backend API integration

## What's Coming

🚧 Remotion video rendering
🚧 Stripe payment integration
🚧 Chrome extension sync
🚧 Advanced analytics charts
🚧 Competitor tracking
🚧 AI content suggestions
🚧 Email notifications
🚧 API access for Enterprise

## Success Checklist

- [ ] Supabase project created
- [ ] Database schema run
- [ ] Storage buckets created
- [ ] Environment variables configured
- [ ] Backend server running
- [ ] Dashboard running
- [ ] Can sign up/login
- [ ] Can view Top 10s
- [ ] Can access all pages
- [ ] No console errors

## You're Ready to Go!

Your Viralify Dashboard is now live! Start analyzing TikTok videos, discovering trends, and creating viral content.

Need help? Check the README.md or reach out to support.

Happy creating! 🚀

