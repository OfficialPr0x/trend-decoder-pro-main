// TikTok API Service Layer
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

class TikTokAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'TikTokAPIError';
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new TikTokAPIError(error.error || 'API request failed', response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TikTokAPIError) throw error;
    throw new TikTokAPIError(error instanceof Error ? error.message : 'Network error');
  }
}

// ============================================
// USER API
// ============================================

export async function getUserInfo(uniqueId: string) {
  const params = new URLSearchParams({ uniqueId });
  return fetchAPI(`/api/user/info?${params}`);
}

export async function getUserPosts(secUid: string, count = 35, cursor = 0) {
  const params = new URLSearchParams({ secUid, count: count.toString(), cursor: cursor.toString() });
  return fetchAPI(`/api/user/posts?${params}`);
}

export async function getUserPopularPosts(secUid: string, count = 35, cursor = 0) {
  const params = new URLSearchParams({ secUid, count: count.toString(), cursor: cursor.toString() });
  return fetchAPI(`/api/user/popular-posts?${params}`);
}

// ============================================
// SEARCH API
// ============================================

export async function searchVideos(keyword: string, cursor = 0) {
  const params = new URLSearchParams({ keyword, cursor: cursor.toString(), search_id: '0' });
  return fetchAPI(`/api/search/video?${params}`);
}

export async function searchAccounts(keyword: string, cursor = 0) {
  const params = new URLSearchParams({ keyword, cursor: cursor.toString(), search_id: '0' });
  return fetchAPI(`/api/search/account?${params}`);
}

export async function searchGeneral(keyword: string, cursor = 0) {
  const params = new URLSearchParams({ keyword, cursor: cursor.toString(), search_id: '0' });
  return fetchAPI(`/api/search/general?${params}`);
}

// ============================================
// POST/VIDEO API
// ============================================

export async function getVideoDetail(videoId: string) {
  const params = new URLSearchParams({ videoId });
  return fetchAPI(`/api/post/detail?${params}`);
}

export async function getVideoComments(videoId: string, count = 50, cursor = 0) {
  const params = new URLSearchParams({ videoId, count: count.toString(), cursor: cursor.toString() });
  return fetchAPI(`/api/post/comments?${params}`);
}

export async function getTrendingPosts(count = 16) {
  const params = new URLSearchParams({ count: count.toString() });
  return fetchAPI(`/api/post/trending?${params}`);
}

// ============================================
// TRENDING API
// ============================================

export async function getTrendingVideos(page = 1, limit = 20, period = 30, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    period: period.toString(),
    order_by: 'vv',
    country,
  });
  return fetchAPI(`/api/trending/video?${params}`);
}

export async function getTrendingCreators(page = 1, limit = 20, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort_by: 'follower',
    country,
  });
  return fetchAPI(`/api/trending/creator?${params}`);
}

export async function getTrendingHashtags(page = 1, limit = 20, period = 120, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    period: period.toString(),
    country,
    sort_by: 'popular',
  });
  return fetchAPI(`/api/trending/hashtag?${params}`);
}

export async function getTrendingSongs(page = 1, limit = 20, period = 7, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    period: period.toString(),
    rank_type: 'popular',
    country,
  });
  return fetchAPI(`/api/trending/song?${params}`);
}

export async function getTrendingKeywords(page = 1, limit = 20, period = 7, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    period: period.toString(),
    country,
  });
  return fetchAPI(`/api/trending/keyword?${params}`);
}

export async function getTrendingProducts(page = 1, last = 7) {
  const params = new URLSearchParams({
    page: page.toString(),
    last: last.toString(),
    order_by: 'post',
    order_type: 'desc',
  });
  return fetchAPI(`/api/trending/top-products?${params}`);
}

export async function getTrendingAds(page = 1, period = 7, limit = 20, country = 'US') {
  const params = new URLSearchParams({
    page: page.toString(),
    period: period.toString(),
    limit: limit.toString(),
    country,
    order_by: 'ctr',
  });
  return fetchAPI(`/api/trending/ads?${params}`);
}

// ============================================
// ANALYTICS API
// ============================================

export async function analyzeVideo(videoUrl: string) {
  return fetchAPI('/api/analytics/analyze', {
    method: 'POST',
    body: JSON.stringify({ videoUrl }),
  });
}

// ============================================
// CHALLENGE/HASHTAG API
// ============================================

export async function getChallengeInfo(challengeName: string) {
  const params = new URLSearchParams({ challengeName });
  return fetchAPI(`/api/challenge/info?${params}`);
}

export async function getChallengePosts(challengeId: string, count = 30, cursor = 0) {
  const params = new URLSearchParams({ challengeId, count: count.toString(), cursor: cursor.toString() });
  return fetchAPI(`/api/challenge/posts?${params}`);
}

// ============================================
// MUSIC API
// ============================================

export async function getMusicInfo(musicId: string) {
  const params = new URLSearchParams({ musicId });
  return fetchAPI(`/api/music/info?${params}`);
}

export async function getMusicPosts(musicId: string, count = 30, cursor = 0) {
  const params = new URLSearchParams({ musicId, count: count.toString(), cursor: cursor.toString() });
  return fetchAPI(`/api/music/posts?${params}`);
}

// ============================================
// DOWNLOAD API
// ============================================

export async function downloadVideo(url: string) {
  const params = new URLSearchParams({ url });
  return fetchAPI(`/api/download/video?${params}`);
}

export async function downloadMusic(url: string) {
  const params = new URLSearchParams({ url });
  return fetchAPI(`/api/download/music?${params}`);
}

// ============================================
// TYPES
// ============================================

export interface TrendingVideo {
  video_id: string;
  author: {
    unique_id: string;
    nickname: string;
    avatar: string;
  };
  desc: string;
  stats: {
    play_count: number;
    digg_count: number;
    comment_count: number;
    share_count: number;
  };
  create_time: number;
}

export interface TrendingCreator {
  unique_id: string;
  nickname: string;
  avatar: string;
  follower_count: number;
  following_count: number;
  video_count: number;
  heart_count: number;
}

export interface TrendingHashtag {
  challenge_id: string;
  challenge_name: string;
  view_count: number;
  post_count: number;
}

export interface AnalysisResult {
  viralityScore: number;
  metadata: {
    creator: string;
    description: string;
    views: string;
    likes: string;
    comments: string;
    shares: string;
    music: string;
    hashtags: string[];
    duration: number;
    createTime: string;
  };
  engagement: {
    rate: string;
    likesPerView: string;
    commentsPerView: string;
    sharesPerView: string;
  };
  recommendations: Array<{
    type: string;
    priority: string;
    suggestion: string;
  }>;
}

export { TikTokAPIError };

