import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Browser client for client-side operations
export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  
  return createBrowserClient(url, key);
}

// Server client for server-side operations
export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: 'free' | 'pro' | 'enterprise';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          usage_stats: {
            analyses_this_month: number;
            videos_this_month: number;
            last_reset: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          usage_stats?: {
            analyses_this_month: number;
            videos_this_month: number;
            last_reset: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          usage_stats?: {
            analyses_this_month: number;
            videos_this_month: number;
            last_reset: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_analyses: {
        Row: {
          id: string;
          user_id: string;
          tiktok_url: string;
          video_id: string;
          metadata: any;
          frame_analysis: any;
          virality_score: number;
          recommendations: any;
          tags: string[];
          notes: string | null;
          folder: string | null;
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tiktok_url: string;
          video_id: string;
          metadata: any;
          frame_analysis: any;
          virality_score: number;
          recommendations: any;
          tags?: string[];
          notes?: string | null;
          folder?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tiktok_url?: string;
          video_id?: string;
          metadata?: any;
          frame_analysis?: any;
          virality_score?: number;
          recommendations?: any;
          tags?: string[];
          notes?: string | null;
          folder?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      generated_videos: {
        Row: {
          id: string;
          user_id: string;
          template: string;
          data: any;
          customization: any;
          status: 'queued' | 'processing' | 'completed' | 'failed';
          video_url: string | null;
          thumbnail_url: string | null;
          duration: number | null;
          error_message: string | null;
          views: number;
          shares: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template: string;
          data: any;
          customization: any;
          status?: 'queued' | 'processing' | 'completed' | 'failed';
          video_url?: string | null;
          thumbnail_url?: string | null;
          duration?: number | null;
          error_message?: string | null;
          views?: number;
          shares?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template?: string;
          data?: any;
          customization?: any;
          status?: 'queued' | 'processing' | 'completed' | 'failed';
          video_url?: string | null;
          thumbnail_url?: string | null;
          duration?: number | null;
          error_message?: string | null;
          views?: number;
          shares?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      trending_cache: {
        Row: {
          id: string;
          type: string;
          data: any;
          country: string;
          period: number;
          cached_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          data: any;
          country?: string;
          period?: number;
          cached_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          type?: string;
          data?: any;
          country?: string;
          period?: number;
          cached_at?: string;
          expires_at?: string;
        };
      };
    };
  };
}

