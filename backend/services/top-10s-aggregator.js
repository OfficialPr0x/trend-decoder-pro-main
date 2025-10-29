import fetch from 'node-fetch';

const RAPIDAPI_KEY = process.env['X-RapidAPI-Key'] || '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac';
const RAPIDAPI_HOST = 'tiktok-api23.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}`;

const headers = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
  'Content-Type': 'application/json',
};

// Cache for trending data
const cache = new Map();
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

function getCacheKey(type, params) {
  return `${type}-${JSON.stringify(params)}`;
}

function getFromCache(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Fetch trending videos
 */
export async function getTrendingVideos({ page = 1, limit = 20, period = 30, order_by = 'vv', country = 'US' } = {}) {
  const cacheKey = getCacheKey('videos', { page, limit, period, order_by, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/video?page=${page}&limit=${limit}&period=${period}&order_by=${order_by}&country=${country}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
}

/**
 * Fetch trending creators
 */
export async function getTrendingCreators({ page = 1, limit = 20, sort_by = 'follower', country = 'US' } = {}) {
  const cacheKey = getCacheKey('creators', { page, limit, sort_by, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/creator?page=${page}&limit=${limit}&sort_by=${sort_by}&country=${country}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending creators:', error);
    throw error;
  }
}

/**
 * Fetch trending hashtags
 */
export async function getTrendingHashtags({ page = 1, limit = 20, period = 120, country = 'US', sort_by = 'popular' } = {}) {
  const cacheKey = getCacheKey('hashtags', { page, limit, period, country, sort_by });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/hashtag?page=${page}&limit=${limit}&period=${period}&country=${country}&sort_by=${sort_by}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending hashtags:', error);
    throw error;
  }
}

/**
 * Fetch trending songs
 */
export async function getTrendingSongs({ page = 1, limit = 20, period = 7, rank_type = 'popular', country = 'US' } = {}) {
  const cacheKey = getCacheKey('songs', { page, limit, period, rank_type, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/song?page=${page}&limit=${limit}&period=${period}&rank_type=${rank_type}&country=${country}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending songs:', error);
    throw error;
  }
}

/**
 * Fetch trending keywords
 */
export async function getTrendingKeywords({ page = 1, limit = 20, period = 7, country = 'US' } = {}) {
  const cacheKey = getCacheKey('keywords', { page, limit, period, country });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/keyword?page=${page}&limit=${limit}&period=${period}&country=${country}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending keywords:', error);
    throw error;
  }
}

/**
 * Fetch top products
 */
export async function getTopProducts({ page = 1, last = 7, order_by = 'post', order_type = 'desc' } = {}) {
  const cacheKey = getCacheKey('products', { page, last, order_by, order_type });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/top-products?page=${page}&last=${last}&order_by=${order_by}&order_type=${order_type}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
}

/**
 * Fetch trending ads
 */
export async function getTrendingAds({ page = 1, period = 7, limit = 20, country = 'US', order_by = 'ctr' } = {}) {
  const cacheKey = getCacheKey('ads', { page, period, limit, country, order_by });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/api/trending/ads?page=${page}&period=${period}&limit=${limit}&country=${country}&order_by=${order_by}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending ads:', error);
    throw error;
  }
}

/**
 * Get all trending data at once (dashboard overview)
 */
export async function getAllTrending({ country = 'US', period = 7 } = {}) {
  try {
    const [videos, creators, hashtags, songs, keywords] = await Promise.all([
      getTrendingVideos({ limit: 10, period, country }),
      getTrendingCreators({ limit: 10, country }),
      getTrendingHashtags({ limit: 10, period, country }),
      getTrendingSongs({ limit: 10, period, country }),
      getTrendingKeywords({ limit: 10, period, country }),
    ]);

    return {
      videos,
      creators,
      hashtags,
      songs,
      keywords,
    };
  } catch (error) {
    console.error('Error fetching all trending data:', error);
    throw error;
  }
}

/**
 * Clear cache (useful for manual refresh)
 */
export function clearCache() {
  cache.clear();
}

/**
 * Get cache stats
 */
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}

export default {
  getTrendingVideos,
  getTrendingCreators,
  getTrendingHashtags,
  getTrendingSongs,
  getTrendingKeywords,
  getTopProducts,
  getTrendingAds,
  getAllTrending,
  clearCache,
  getCacheStats,
};

