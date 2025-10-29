/**
 * TikTok RapidAPI Service
 * 
 * This service provides methods to fetch TikTok data using the RapidAPI TikTok API
 * Documentation: https://rapidapi.com/tiktok-api-tiktok-api-default/api/tiktok-api23
 */

import fetch from 'node-fetch';

const RAPIDAPI_BASE_URL = 'https://tiktok-api23.p.rapidapi.com/api';

/**
 * Extract video ID and user info from TikTok URL
 * @param {string} url - TikTok video URL
 * @returns {object} - { videoId, username }
 */
export function parseTikTokUrl(url) {
  try {
    // Handle different TikTok URL formats:
    // https://www.tiktok.com/@username/video/1234567890
    // https://vm.tiktok.com/XXXXX/ (short link)
    
    const urlObj = new URL(url);
    
    // Extract video ID from path
    const pathParts = urlObj.pathname.split('/');
    const videoIndex = pathParts.indexOf('video');
    
    if (videoIndex !== -1 && pathParts[videoIndex + 1]) {
      const videoId = pathParts[videoIndex + 1];
      const username = pathParts[1]?.replace('@', '') || '';
      
      return { videoId, username };
    }
    
    throw new Error('Invalid TikTok URL format');
  } catch (error) {
    throw new Error(`Failed to parse TikTok URL: ${error.message}`);
  }
}

/**
 * Fetch video details directly using /post/detail endpoint
 * @param {string} videoId - TikTok video ID  
 * @param {string} apiKey - RapidAPI key
 * @param {string} username - Username (optional, not needed for this endpoint)
 * @returns {Promise<object>} - Video details
 */
export async function fetchVideoDetails(videoId, apiKey, username = null) {
  try {
    console.log(`🔍 Fetching video details for ID: ${videoId}...`);
    
    // Use the /post/detail endpoint - direct video lookup with videoId parameter!
    const url = `${RAPIDAPI_BASE_URL}/post/detail`;
    const querystring = new URLSearchParams({
      videoId: videoId  // Use videoId, not aweme_id!
    });
    
    const response = await fetch(`${url}?${querystring}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`RapidAPI request failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.itemInfo) {
      throw new Error('Invalid response from TikTok API');
    }
    
    console.log(`✅ Successfully fetched video details!`);
    
    return data;
    
  } catch (error) {
    throw new Error(`Failed to fetch video details: ${error.message}`);
  }
}

/**
 * Fetch user posts with cursor-based pagination
 * @param {string} secUid - User's secUid
 * @param {string} apiKey - RapidAPI key
 * @param {number} count - Number of posts to fetch (default: 35)
 * @param {string} cursor - Cursor for pagination (default: '0')
 * @returns {Promise<object>} - { posts, cursor, hasMore }
 */
export async function fetchUserPosts(secUid, apiKey, count = 35, cursor = '0') {
  try {
    const url = `${RAPIDAPI_BASE_URL}/user/posts`;
    
    const querystring = new URLSearchParams({
      secUid: secUid,
      count: count.toString(),
      cursor: cursor
    });
    
    const response = await fetch(`${url}?${querystring}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error(`RapidAPI request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    const data = result.data || {};
    
    return {
      posts: data.itemList || [],
      cursor: data.cursor === '-1' ? null : data.cursor,
      hasMore: data.hasMore || false
    };
  } catch (error) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

/**
 * Fetch all user posts using pagination
 * @param {string} secUid - User's secUid
 * @param {string} apiKey - RapidAPI key
 * @param {number} maxPosts - Maximum number of posts to fetch (default: 100)
 * @returns {Promise<array>} - Array of posts
 */
export async function fetchAllUserPosts(secUid, apiKey, maxPosts = 100) {
  const allPosts = [];
  let cursor = '0';
  let hasMore = true;
  
  while (hasMore && allPosts.length < maxPosts) {
    const { posts, cursor: nextCursor, hasMore: more } = await fetchUserPosts(
      secUid, 
      apiKey, 
      35, 
      cursor
    );
    
    allPosts.push(...posts);
    cursor = nextCursor;
    hasMore = more && cursor !== null;
    
    // Avoid rate limiting
    if (hasMore) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return allPosts.slice(0, maxPosts);
}

/**
 * Extract metadata from TikTok video data
 * @param {object} videoData - Raw video data from RapidAPI
 * @returns {object} - Formatted metadata
 */
export function extractMetadata(videoData) {
  try {
    // Handle both response formats:
    // 1. Direct format: { itemInfo: { itemStruct: {...} } }  [/post/detail]
    // 2. Nested format: { data: { itemInfo: { itemStruct: {...} } } }  [/user/posts]
    const itemInfo = videoData.itemInfo?.itemStruct || videoData.data?.itemInfo?.itemStruct || videoData;
    const author = itemInfo.author || {};
    const stats = itemInfo.stats || {};
    const music = itemInfo.music || {};
    const video = itemInfo.video || {};
    
    return {
      creator: author.uniqueId || author.nickname || 'Unknown',
      creatorId: author.id || '',
      secUid: author.secUid || '',
      description: itemInfo.desc || '',
      likes: formatNumber(stats.diggCount || 0),
      comments: formatNumber(stats.commentCount || 0),
      shares: formatNumber(stats.shareCount || 0),
      views: formatNumber(stats.playCount || 0),
      music: music.title || music.authorName || '',
      musicId: music.id || '',
      hashtags: extractHashtags(itemInfo.desc || ''),
      createTime: itemInfo.createTime || 0,
      videoUrl: video.downloadAddr || video.playAddr || '',
      coverUrl: video.cover || video.originCover || '',
      duration: video.duration || 0,
      // Raw numbers for calculations
      rawStats: {
        likes: stats.diggCount || 0,
        comments: stats.commentCount || 0,
        shares: stats.shareCount || 0,
        views: stats.playCount || 0
      }
    };
  } catch (error) {
    throw new Error(`Failed to extract metadata: ${error.message}`);
  }
}

/**
 * Extract hashtags from description
 * @param {string} description - Video description
 * @returns {array} - Array of hashtags
 */
function extractHashtags(description) {
  const hashtagRegex = /#[\w]+/g;
  const matches = description.match(hashtagRegex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
}

/**
 * Format large numbers for display
 * @param {number} num - Number to format
 * @returns {string} - Formatted number (e.g., "1.2M", "45.3K")
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Calculate engagement metrics
 * @param {object} rawStats - Raw statistics
 * @returns {object} - Engagement metrics
 */
export function calculateEngagement(rawStats) {
  // Ensure rawStats is an object and extract values safely
  console.log('calculateEngagement called with:', rawStats);

  if (!rawStats || typeof rawStats !== 'object') {
    console.warn('Invalid rawStats provided to calculateEngagement:', rawStats);
    return {
      engagementRate: 0,
      likeRate: 0,
      commentRate: 0,
      shareRate: 0,
      viralityScore: 0
    };
  }

  const views = Number(rawStats.views) || Number(rawStats.playCount) || 0;
  const likes = Number(rawStats.likes) || Number(rawStats.diggCount) || 0;
  const comments = Number(rawStats.comments) || Number(rawStats.commentCount) || 0;
  const shares = Number(rawStats.shares) || Number(rawStats.shareCount) || 0;

  console.log('Extracted values:', { views, likes, comments, shares });

  if (views === 0 || isNaN(views)) {
    return {
      engagementRate: 0,
      likeRate: 0,
      commentRate: 0,
      shareRate: 0,
      viralityScore: 0
    };
  }

  const likeRate = (likes / views) * 100;
  const commentRate = (comments / views) * 100;
  const shareRate = (shares / views) * 100;
  const engagementRate = ((likes + comments + shares) / views) * 100;
  
  // Calculate virality score (0-100)
  let viralityScore = 0;
  viralityScore += Math.min(likeRate * 10, 30); // Max 30 points
  viralityScore += Math.min(commentRate * 50, 20); // Max 20 points
  viralityScore += Math.min(shareRate * 100, 30); // Max 30 points (shares are most important)
  viralityScore += Math.min((views / 1000000) * 20, 20); // Max 20 points for view count
  
  return {
    engagementRate: engagementRate.toFixed(2),
    likeRate: likeRate.toFixed(2),
    commentRate: commentRate.toFixed(2),
    shareRate: shareRate.toFixed(2),
    viralityScore: Math.round(viralityScore)
  };
}

/**
 * Fetch user's liked posts
 * @param {string} secUid - User's secUid
 * @param {string} apiKey - RapidAPI key
 * @param {number} count - Number of posts to fetch (default: 30)
 * @param {number} cursor - Pagination cursor (default: 0)
 * @returns {Promise<object>} - Liked posts data
 */
export async function fetchUserLikedPosts(secUid, apiKey, count = 30, cursor = 0) {
  const url = `${RAPIDAPI_BASE_URL}/user/liked-posts`;
  const querystring = new URLSearchParams({
    secUid,
    count: count.toString(),
    cursor: cursor.toString()
  });

  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`Liked posts API failed: ${response.status}`);
  return await response.json();
}

export default {
  parseTikTokUrl,
  fetchVideoDetails,
  fetchUserPosts,
  fetchAllUserPosts,
  fetchUserLikedPosts,
  extractMetadata,
  calculateEngagement
};

