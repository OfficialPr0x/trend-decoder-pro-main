/**
 * Viral Discovery API Service
 * Frontend service for fetching trending data
 */

const API_BASE_URL = 'http://localhost:3001/api';

interface TrendingOptions {
  category: 'all' | 'videos' | 'sounds' | 'hashtags' | 'creators' | 'keywords' | 'ads' | 'products';
  limit?: number;
  period?: number;
  country?: string;
}

interface TrendingResult {
  success: boolean;
  category: string;
  data: any;
  timestamp: string;
}

/**
 * Fetch trending data for a specific category or all categories
 * No API key required - uses backend's hardcoded keys
 */
export async function fetchTrending(options: TrendingOptions): Promise<TrendingResult> {
  const { category, limit = 10, period = 7, country = 'US' } = options;

  const response = await fetch(`${API_BASE_URL}/discover/trending`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category,
      limit,
      period,
      country,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch trending data');
  }

  return await response.json();
}

/**
 * Fetch all trending categories at once
 */
export async function fetchAllTrending(options?: {
  limit?: number;
  period?: number;
  country?: string;
  rapidApiKey?: string;
}): Promise<TrendingResult> {
  return fetchTrending({
    category: 'all',
    ...options,
  });
}

/**
 * Fetch trending videos
 */
export async function fetchTrendingVideos(options?: Omit<TrendingOptions, 'category'>): Promise<TrendingResult> {
  return fetchTrending({
    category: 'videos',
    ...options,
  });
}

/**
 * Fetch trending sounds
 */
export async function fetchTrendingSounds(options?: Omit<TrendingOptions, 'category'>): Promise<TrendingResult> {
  return fetchTrending({
    category: 'sounds',
    ...options,
  });
}

/**
 * Fetch trending hashtags
 */
export async function fetchTrendingHashtags(options?: Omit<TrendingOptions, 'category'>): Promise<TrendingResult> {
  return fetchTrending({
    category: 'hashtags',
    ...options,
  });
}

/**
 * Fetch trending creators
 */
export async function fetchTrendingCreators(options?: Omit<TrendingOptions, 'category'>): Promise<TrendingResult> {
  return fetchTrending({
    category: 'creators',
    ...options,
  });
}

/**
 * Fetch trending keywords
 */
export async function fetchTrendingKeywords(options?: Omit<TrendingOptions, 'category'>): Promise<TrendingResult> {
  return fetchTrending({
    category: 'keywords',
    ...options,
  });
}

export default {
  fetchTrending,
  fetchAllTrending,
  fetchTrendingVideos,
  fetchTrendingSounds,
  fetchTrendingHashtags,
  fetchTrendingCreators,
  fetchTrendingKeywords,
};

