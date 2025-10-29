-- Viralify Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  usage_stats JSONB DEFAULT '{"analyses_this_month": 0, "videos_this_month": 0, "last_reset": null}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved analyses table
CREATE TABLE IF NOT EXISTS public.saved_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tiktok_url TEXT NOT NULL,
  video_id TEXT NOT NULL,
  metadata JSONB NOT NULL,
  frame_analysis JSONB NOT NULL,
  virality_score INTEGER NOT NULL CHECK (virality_score >= 0 AND virality_score <= 100),
  recommendations JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  folder TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated videos table
CREATE TABLE IF NOT EXISTS public.generated_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  template TEXT NOT NULL,
  data JSONB NOT NULL,
  customization JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  error_message TEXT,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trending cache table
CREATE TABLE IF NOT EXISTS public.trending_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  country TEXT DEFAULT 'US',
  period INTEGER DEFAULT 7,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Extension syncs table (for Chrome extension sync)
CREATE TABLE IF NOT EXISTS public.extension_syncs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_saved_analyses_user_id ON public.saved_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_analyses_created_at ON public.saved_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_analyses_folder ON public.saved_analyses(folder);
CREATE INDEX IF NOT EXISTS idx_saved_analyses_tags ON public.saved_analyses USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_saved_analyses_is_favorite ON public.saved_analyses(is_favorite) WHERE is_favorite = TRUE;

CREATE INDEX IF NOT EXISTS idx_generated_videos_user_id ON public.generated_videos(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_videos_status ON public.generated_videos(status);
CREATE INDEX IF NOT EXISTS idx_generated_videos_created_at ON public.generated_videos(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_trending_cache_type ON public.trending_cache(type);
CREATE INDEX IF NOT EXISTS idx_trending_cache_expires_at ON public.trending_cache(expires_at);

CREATE INDEX IF NOT EXISTS idx_extension_syncs_user_id ON public.extension_syncs(user_id);
CREATE INDEX IF NOT EXISTS idx_extension_syncs_status ON public.extension_syncs(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_analyses_updated_at BEFORE UPDATE ON public.saved_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_videos_updated_at BEFORE UPDATE ON public.generated_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extension_syncs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Saved analyses policies
CREATE POLICY "Users can view own analyses"
  ON public.saved_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
  ON public.saved_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses"
  ON public.saved_analyses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON public.saved_analyses FOR DELETE
  USING (auth.uid() = user_id);

-- Generated videos policies
CREATE POLICY "Users can view own videos"
  ON public.generated_videos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own videos"
  ON public.generated_videos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own videos"
  ON public.generated_videos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own videos"
  ON public.generated_videos FOR DELETE
  USING (auth.uid() = user_id);

-- Extension syncs policies
CREATE POLICY "Users can view own syncs"
  ON public.extension_syncs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own syncs"
  ON public.extension_syncs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Trending cache is public (read-only)
ALTER TABLE public.trending_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view trending cache"
  ON public.trending_cache FOR SELECT
  TO authenticated
  USING (TRUE);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET usage_stats = jsonb_set(
    jsonb_set(
      usage_stats,
      '{analyses_this_month}',
      '0'
    ),
    '{videos_this_month}',
    '0'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired trending cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.trending_cache
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Create storage buckets (run separately in Supabase dashboard)
-- 1. Create bucket: videos
-- 2. Create bucket: thumbnails
-- 3. Set policies to allow authenticated users to upload/read their own files

COMMENT ON TABLE public.users IS 'Extended user profiles with subscription and usage data';
COMMENT ON TABLE public.saved_analyses IS 'User saved TikTok video analyses';
COMMENT ON TABLE public.generated_videos IS 'AI-generated videos with status tracking';
COMMENT ON TABLE public.trending_cache IS 'Cache for TikTok trending data (6 hour TTL)';
COMMENT ON TABLE public.extension_syncs IS 'Sync queue for Chrome extension data';

