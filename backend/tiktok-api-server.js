import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.TIKTOK_API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TikTok RapidAPI Configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac';
const RAPIDAPI_HOST = 'tiktok-api23.p.rapidapi.com';

// Helper function for API calls
async function tiktokAPI(endpoint, queryParams = {}) {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://${RAPIDAPI_HOST}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('TikTok API Error:', error);
    throw error;
  }
}

// ============================================
// USER ENDPOINTS
// ============================================

// Get user info by username
app.get('/api/user/info', async (req, res) => {
  try {
    const { uniqueId } = req.query;
    if (!uniqueId) return res.status(400).json({ error: 'uniqueId required' });
    
    const data = await tiktokAPI('/api/user/info', { uniqueId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user info with region
app.get('/api/user/info-with-region', async (req, res) => {
  try {
    const { uniqueId } = req.query;
    if (!uniqueId) return res.status(400).json({ error: 'uniqueId required' });
    
    const data = await tiktokAPI('/api/user/info-with-region', { uniqueId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user posts
app.get('/api/user/posts', async (req, res) => {
  try {
    const { secUid, count = 35, cursor = 0 } = req.query;
    if (!secUid) return res.status(400).json({ error: 'secUid required' });
    
    const data = await tiktokAPI('/api/user/posts', { secUid, count, cursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user popular posts
app.get('/api/user/popular-posts', async (req, res) => {
  try {
    const { secUid, count = 35, cursor = 0 } = req.query;
    if (!secUid) return res.status(400).json({ error: 'secUid required' });
    
    const data = await tiktokAPI('/api/user/popular-posts', { secUid, count, cursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user followers
app.get('/api/user/followers', async (req, res) => {
  try {
    const { secUid, count = 30, minCursor = 0 } = req.query;
    if (!secUid) return res.status(400).json({ error: 'secUid required' });
    
    const data = await tiktokAPI('/api/user/followers', { secUid, count, minCursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user followings
app.get('/api/user/followings', async (req, res) => {
  try {
    const { secUid, count = 30, minCursor = 0, maxCursor = 0 } = req.query;
    if (!secUid) return res.status(400).json({ error: 'secUid required' });
    
    const data = await tiktokAPI('/api/user/followings', { secUid, count, minCursor, maxCursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SEARCH ENDPOINTS
// ============================================

// General search
app.get('/api/search/general', async (req, res) => {
  try {
    const { keyword, cursor = 0, search_id = 0 } = req.query;
    if (!keyword) return res.status(400).json({ error: 'keyword required' });
    
    const data = await tiktokAPI('/api/search/general', { keyword, cursor, search_id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search videos
app.get('/api/search/video', async (req, res) => {
  try {
    const { keyword, cursor = 0, search_id = 0 } = req.query;
    if (!keyword) return res.status(400).json({ error: 'keyword required' });
    
    const data = await tiktokAPI('/api/search/video', { keyword, cursor, search_id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search accounts
app.get('/api/search/account', async (req, res) => {
  try {
    const { keyword, cursor = 0, search_id = 0 } = req.query;
    if (!keyword) return res.status(400).json({ error: 'keyword required' });
    
    const data = await tiktokAPI('/api/search/account', { keyword, cursor, search_id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// POST/VIDEO ENDPOINTS
// ============================================

// Get post details
app.get('/api/post/detail', async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: 'videoId required' });
    
    const data = await tiktokAPI('/api/post/detail', { videoId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get post comments
app.get('/api/post/comments', async (req, res) => {
  try {
    const { videoId, count = 50, cursor = 0 } = req.query;
    if (!videoId) return res.status(400).json({ error: 'videoId required' });
    
    const data = await tiktokAPI('/api/post/comments', { videoId, count, cursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending posts
app.get('/api/post/trending', async (req, res) => {
  try {
    const { count = 16 } = req.query;
    const data = await tiktokAPI('/api/post/trending', { count });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// TRENDING ENDPOINTS
// ============================================

// Get trending videos
app.get('/api/trending/video', async (req, res) => {
  try {
    const { page = 1, limit = 20, period = 30, order_by = 'vv', country = 'US' } = req.query;
    const data = await tiktokAPI('/api/trending/video', { page, limit, period, order_by, country });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending creators
app.get('/api/trending/creator', async (req, res) => {
  try {
    const { page = 1, limit = 20, sort_by = 'follower', country = 'US' } = req.query;
    const data = await tiktokAPI('/api/trending/creator', { page, limit, sort_by, country });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending hashtags
app.get('/api/trending/hashtag', async (req, res) => {
  try {
    const { page = 1, limit = 20, period = 120, country = 'US', sort_by = 'popular' } = req.query;
    const data = await tiktokAPI('/api/trending/hashtag', { page, limit, period, country, sort_by });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending songs
app.get('/api/trending/song', async (req, res) => {
  try {
    const { page = 1, limit = 20, period = 7, rank_type = 'popular', country = 'US' } = req.query;
    const data = await tiktokAPI('/api/trending/song', { page, limit, period, rank_type, country });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending keywords
app.get('/api/trending/keyword', async (req, res) => {
  try {
    const { page = 1, limit = 20, period = 7, country = 'US' } = req.query;
    const data = await tiktokAPI('/api/trending/keyword', { page, limit, period, country });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending products
app.get('/api/trending/top-products', async (req, res) => {
  try {
    const { page = 1, last = 7, order_by = 'post', order_type = 'desc' } = req.query;
    const data = await tiktokAPI('/api/trending/top-products', { page, last, order_by, order_type });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending ads
app.get('/api/trending/ads', async (req, res) => {
  try {
    const { page = 1, period = 7, limit = 20, country = 'US', order_by = 'ctr' } = req.query;
    const data = await tiktokAPI('/api/trending/ads', { page, period, limit, country, order_by });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// CHALLENGE/HASHTAG ENDPOINTS
// ============================================

// Get challenge info
app.get('/api/challenge/info', async (req, res) => {
  try {
    const { challengeName } = req.query;
    if (!challengeName) return res.status(400).json({ error: 'challengeName required' });
    
    const data = await tiktokAPI('/api/challenge/info', { challengeName });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get challenge posts
app.get('/api/challenge/posts', async (req, res) => {
  try {
    const { challengeId, count = 30, cursor = 0 } = req.query;
    if (!challengeId) return res.status(400).json({ error: 'challengeId required' });
    
    const data = await tiktokAPI('/api/challenge/posts', { challengeId, count, cursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// MUSIC ENDPOINTS
// ============================================

// Get music info
app.get('/api/music/info', async (req, res) => {
  try {
    const { musicId } = req.query;
    if (!musicId) return res.status(400).json({ error: 'musicId required' });
    
    const data = await tiktokAPI('/api/music/info', { musicId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get music posts
app.get('/api/music/posts', async (req, res) => {
  try {
    const { musicId, count = 30, cursor = 0 } = req.query;
    if (!musicId) return res.status(400).json({ error: 'musicId required' });
    
    const data = await tiktokAPI('/api/music/posts', { musicId, count, cursor });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// DOWNLOAD ENDPOINTS
// ============================================

// Download video
app.get('/api/download/video', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'url required' });
    
    const data = await tiktokAPI('/api/download/video', { url });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download music
app.get('/api/download/music', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'url required' });
    
    const data = await tiktokAPI('/api/download/music', { url });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ANALYTICS ENDPOINT (AI-powered analysis)
// ============================================

// Analyze video (combines multiple endpoints + AI)
app.post('/api/analytics/analyze', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ error: 'videoUrl required' });
    
    // Extract video ID from URL
    const videoIdMatch = videoUrl.match(/video\/(\d+)/);
    if (!videoIdMatch) return res.status(400).json({ error: 'Invalid TikTok URL' });
    
    const videoId = videoIdMatch[1];
    
    // Get video details
    const videoData = await tiktokAPI('/api/post/detail', { videoId });
    
    // Get comments for sentiment analysis
    const commentsData = await tiktokAPI('/api/post/comments', { videoId, count: 100 });
    
    // Calculate virality score
    const video = videoData.data;
    const stats = video.stats;
    
    const engagementRate = ((stats.diggCount + stats.commentCount + stats.shareCount) / stats.playCount) * 100;
    const viralityScore = Math.min(100, Math.round(
      (engagementRate * 0.4) + 
      (Math.log10(stats.playCount) * 10) +
      (stats.shareCount / stats.playCount * 100 * 0.3)
    ));
    
    // Return comprehensive analysis
    res.json({
      viralityScore,
      metadata: {
        creator: `@${video.author.uniqueId}`,
        description: video.desc,
        views: formatNumber(stats.playCount),
        likes: formatNumber(stats.diggCount),
        comments: formatNumber(stats.commentCount),
        shares: formatNumber(stats.shareCount),
        music: video.music.title,
        hashtags: video.challenges?.map(c => `#${c.title}`) || [],
        duration: video.video.duration,
        createTime: new Date(video.createTime * 1000).toISOString(),
      },
      engagement: {
        rate: engagementRate.toFixed(2),
        likesPerView: (stats.diggCount / stats.playCount * 100).toFixed(2),
        commentsPerView: (stats.commentCount / stats.playCount * 100).toFixed(2),
        sharesPerView: (stats.shareCount / stats.playCount * 100).toFixed(2),
      },
      recommendations: generateRecommendations(video, viralityScore),
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper functions
function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function generateRecommendations(video, score) {
  const recommendations = [];
  
  if (score < 50) {
    recommendations.push({
      type: 'hook',
      priority: 'high',
      suggestion: 'Strengthen opening to capture attention in first 3 seconds'
    });
  }
  
  if (video.desc.length < 50) {
    recommendations.push({
      type: 'description',
      priority: 'medium',
      suggestion: 'Add more descriptive text and relevant hashtags'
    });
  }
  
  if (!video.challenges || video.challenges.length === 0) {
    recommendations.push({
      type: 'hashtags',
      priority: 'high',
      suggestion: 'Use trending hashtags to increase discoverability'
    });
  }
  
  return recommendations;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'TikTok API Server', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TikTok API Server running on http://localhost:${PORT}`);
  console.log(`📊 API Key: ${RAPIDAPI_KEY ? 'Configured ✓' : 'Missing ✗'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;

