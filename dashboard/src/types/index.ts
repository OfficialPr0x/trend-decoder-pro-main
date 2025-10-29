export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  usage_stats: {
    analyses_this_month: number;
    videos_this_month: number;
    last_reset: string;
  };
}

export interface SavedAnalysis {
  id: string;
  user_id: string;
  tiktok_url: string;
  video_id: string;
  metadata: TikTokMetadata;
  frame_analysis: FrameAnalysis[];
  virality_score: number;
  recommendations: Recommendation[];
  tags: string[];
  notes: string | null;
  folder: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface TikTokMetadata {
  creator: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  views: string;
  music: string;
  hashtags: string[];
}

export interface FrameAnalysis {
  frame: 'opening' | 'middle' | 'ending';
  analysis: string;
}

export interface Recommendation {
  type: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
}

export interface GeneratedVideo {
  id: string;
  user_id: string;
  template: string;
  data: any;
  customization: VideoCustomization;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  video_url: string | null;
  thumbnail_url: string | null;
  duration: number | null;
  error_message: string | null;
  views: number;
  shares: number;
  created_at: string;
  updated_at: string;
}

export interface VideoCustomization {
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
  music?: string;
  duration?: number;
}

export interface TrendingVideo {
  id: string;
  video_id: string;
  creator: string;
  creator_username: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  thumbnail: string;
  url: string;
  created_time: string;
}

export interface TrendingCreator {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  followers: number;
  likes: number;
  videos: number;
  engagement_rate: number;
  verified: boolean;
}

export interface TrendingHashtag {
  id: string;
  name: string;
  view_count: number;
  video_count: number;
  growth_rate: number;
}

export interface TrendingSong {
  id: string;
  title: string;
  author: string;
  duration: number;
  usage_count: number;
  thumbnail: string;
}

export interface UsageLimits {
  analyses: {
    used: number;
    limit: number;
  };
  videos: {
    used: number;
    limit: number;
  };
}

export interface SubscriptionTier {
  name: 'free' | 'pro' | 'enterprise';
  price: number;
  limits: {
    analyses: number;
    videos: number;
  };
  features: string[];
}

