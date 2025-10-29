/**
 * Viral Discovery Service
 * Fetches trending data across multiple categories
 */

import fetch from 'node-fetch';

const RAPIDAPI_BASE_URL = 'https://tiktok-api23.p.rapidapi.com/api';

// Cache for trending data (30-minute TTL)
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCacheKey(endpoint, params) {
  return `${endpoint}:${JSON.stringify(params)}`;
}

function getFromCache(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Fetch trending videos
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of videos to fetch
 * @param {number} period - Time period (1, 7, 30 days)
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending videos data
 */
export async function fetchTrendingVideos(apiKey, limit = 10, period = 7, country = 'US') {
  const cacheKey = getCacheKey('trending-videos', { limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/video`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&order_by=vv&country=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error(`Trending videos API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending sounds/music
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of sounds to fetch
 * @param {number} period - Time period (1, 7, 30 days)
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending sounds data
 */
export async function fetchTrendingSounds(apiKey, limit = 10, period = 7, country = 'US') {
  const cacheKey = getCacheKey('trending-sounds', { limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/song`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&rank_type=popular&country=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Trending sounds API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending hashtags
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of hashtags to fetch
 * @param {number} period - Time period in days
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending hashtags data
 */
export async function fetchTrendingHashtags(apiKey, limit = 10, period = 30, country = 'US') {
  const cacheKey = getCacheKey('trending-hashtags', { limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/hashtag`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&country=${country}&sort_by=popular`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Trending hashtags API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending creators
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of creators to fetch
 * @param {string} sortBy - Sort by (follower, engagement)
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending creators data
 */
export async function fetchTrendingCreators(apiKey, limit = 10, sortBy = 'follower', country = 'US') {
  const cacheKey = getCacheKey('trending-creators', { limit, sortBy, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/creator`;
  const response = await fetch(`${url}?page=1&limit=${limit}&sort_by=${sortBy}&country=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error(`Trending creators API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending keywords
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of keywords to fetch
 * @param {number} period - Time period (1, 7, 30 days)
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending keywords data
 */
export async function fetchTrendingKeywords(apiKey, limit = 10, period = 7, country = 'US') {
  const cacheKey = getCacheKey('trending-keywords', { limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/keyword`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&country=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Trending keywords API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending ads
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of ads to fetch
 * @param {number} period - Time period (1, 7, 30 days)
 * @param {string} country - Country code
 * @returns {Promise<object>} - Trending ads data
 */
export async function fetchTrendingAds(apiKey, limit = 10, period = 7, country = 'US') {
  const cacheKey = getCacheKey('trending-ads', { limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/ads`;
  const response = await fetch(`${url}?page=1&period=${period}&limit=${limit}&country=${country}&order_by=ctr`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Trending ads API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch trending products
 * @param {string} apiKey - RapidAPI key
 * @param {number} limit - Number of products to fetch
 * @param {number} period - Time period (1, 7, 30 days)
 * @returns {Promise<object>} - Trending products data
 */
export async function fetchTrendingProducts(apiKey, limit = 10, period = 7) {
  const cacheKey = getCacheKey('trending-products', { limit, period });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const url = `${RAPIDAPI_BASE_URL}/trending/top-products`;
  const response = await fetch(`${url}?page=1&last=${period}&order_by=post&order_type=desc`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Trending products API failed: ${response.status}`);
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Fetch all trending data (Top 10s for all categories)
 * @param {string} apiKey - RapidAPI key
 * @param {object} options - Options for each category
 * @returns {Promise<object>} - All trending data
 */
export async function fetchAllTrending(apiKey, options = {}) {
  const {
    limit = 10,
    period = 7,
    country = 'US'
  } = options;

  try {
    // Fetch all trending categories in parallel
    const [videos, sounds, hashtags, creators, keywords, ads, products] = await Promise.allSettled([
      fetchTrendingVideos(apiKey, limit, period, country),
      fetchTrendingSounds(apiKey, limit, period, country),
      fetchTrendingHashtags(apiKey, limit, 30, country), // Hashtags use 30-day default
      fetchTrendingCreators(apiKey, limit, 'follower', country),
      fetchTrendingKeywords(apiKey, limit, period, country),
      fetchTrendingAds(apiKey, limit, period, country),
      fetchTrendingProducts(apiKey, limit, period)
    ]);

    return {
      success: true,
      data: {
        videos: videos.status === 'fulfilled' ? videos.value : null,
        sounds: sounds.status === 'fulfilled' ? sounds.value : null,
        hashtags: hashtags.status === 'fulfilled' ? hashtags.value : null,
        creators: creators.status === 'fulfilled' ? creators.value : null,
        keywords: keywords.status === 'fulfilled' ? keywords.value : null,
        ads: ads.status === 'fulfilled' ? ads.value : null,
        products: products.status === 'fulfilled' ? products.value : null
      },
      errors: {
        videos: videos.status === 'rejected' ? videos.reason.message : null,
        sounds: sounds.status === 'rejected' ? sounds.reason.message : null,
        hashtags: hashtags.status === 'rejected' ? hashtags.reason.message : null,
        creators: creators.status === 'rejected' ? creators.reason.message : null,
        keywords: keywords.status === 'rejected' ? keywords.reason.message : null,
        ads: ads.status === 'rejected' ? ads.reason.message : null,
        products: products.status === 'rejected' ? products.reason.message : null
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to fetch trending data: ${error.message}`);
  }
}

/**
 * Analyze trending item for insights
 * @param {object} item - Trending item data
 * @param {string} category - Category (video, sound, hashtag, etc.)
 * @returns {object} - Insights about the trending item
 */
export function analyzeTrendingItem(item, category) {
  const insights = {
    opportunity: 'Unknown',
    competition: 'Unknown',
    recommendation: 'Analyze further'
  };

  switch (category) {
    case 'video':
      const views = item.views || item.vv || 0;
      const engagement = item.engagement || item.engagement_rate || 0;
      insights.opportunity = views > 10000000 ? 'Viral Pattern Detected' : views > 1000000 ? 'High Reach' : 'Moderate Reach';
      insights.competition = views > 50000000 ? 'Very High' : views > 10000000 ? 'High' : 'Medium';
      insights.recommendation = engagement > 5 ? 'Study engagement tactics' : 'Analyze hook and content structure';
      break;

    case 'sound':
      const usageCount = item.post_count || item.video_count || 0;
      insights.opportunity = usageCount < 50000 && usageCount > 1000 ? 'High - Early Trend' : usageCount > 100000 ? 'Low - Saturated' : 'Medium';
      insights.competition = usageCount > 100000 ? 'Very High' : usageCount > 10000 ? 'High' : 'Low';
      insights.recommendation = usageCount < 50000 ? 'Use immediately' : 'Consider alternatives';
      break;

    case 'hashtag':
      const hashtagViews = item.view_count || item.views || 0;
      const hashtagPosts = item.post_count || item.posts || 0;
      insights.opportunity = hashtagViews > 10000000 && hashtagPosts < 50000 ? 'High' : 'Medium';
      insights.competition = hashtagPosts > 100000 ? 'Very High' : hashtagPosts > 10000 ? 'High' : 'Low';
      insights.recommendation = hashtagPosts < 10000 ? 'Emerging - early adoption advantage' : 'Mix with niche hashtags';
      break;

    case 'creator':
      const followers = item.follower_count || item.fans || 0;
      const growthRate = item.growth_rate || 0;
      insights.opportunity = growthRate > 10 ? 'Study rapid growth tactics' : 'Analyze content strategy';
      insights.competition = followers > 1000000 ? 'Top Tier' : followers > 100000 ? 'Established' : 'Emerging';
      insights.recommendation = 'Analyze posting patterns and content themes';
      break;

    default:
      break;
  }

  return insights;
}

export default {
  fetchTrendingVideos,
  fetchTrendingSounds,
  fetchTrendingHashtags,
  fetchTrendingCreators,
  fetchTrendingKeywords,
  fetchTrendingAds,
  fetchTrendingProducts,
  fetchAllTrending,
  analyzeTrendingItem
};

