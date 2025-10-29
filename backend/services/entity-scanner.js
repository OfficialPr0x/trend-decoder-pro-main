/**
 * Entity Scanner Service
 * Handles multi-entity scanning: profiles, hashtags, sounds, and searches
 */

import fetch from 'node-fetch';

const RAPIDAPI_BASE_URL = 'https://tiktok-api23.p.rapidapi.com/api';

/**
 * Detect entity type from URL or input
 * @param {string} input - URL or text input
 * @returns {object} - { type, identifier }
 */
export function detectEntityType(input) {
  if (!input) return { type: 'unknown', identifier: null };

  const lowerInput = input.toLowerCase();

  // Profile detection
  if (lowerInput.includes('/@') || lowerInput.startsWith('@')) {
    const username = input.match(/@([a-zA-Z0-9_.]+)/)?.[1] || input.replace('@', '');
    return { type: 'profile', identifier: username };
  }

  // Hashtag detection
  if (lowerInput.includes('/tag/') || lowerInput.startsWith('#')) {
    const hashtag = input.match(/\/tag\/([^/?]+)/)?.[1] || input.replace('#', '');
    return { type: 'hashtag', identifier: hashtag };
  }

  // Music/Sound detection
  if (lowerInput.includes('/music/')) {
    const musicId = input.match(/\/music\/([^/?]+)/)?.[1];
    return { type: 'sound', identifier: musicId };
  }

  // Video detection (existing)
  if (lowerInput.includes('/video/')) {
    const videoId = input.match(/\/video\/(\d+)/)?.[1];
    return { type: 'video', identifier: videoId };
  }

  // Default: treat as username if no special characters
  if (!input.includes('/') && !input.includes('.')) {
    return { type: 'profile', identifier: input.replace('@', '') };
  }

  return { type: 'unknown', identifier: input };
}

/**
 * Analyze TikTok Profile
 * @param {string} username - TikTok username
 * @param {string} apiKey - RapidAPI key
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<object>} - Profile analysis data
 */
export async function analyzeProfile(username, apiKey, onProgress) {
  const results = {
    userInfo: null,
    userPosts: null,
    popularPosts: null,
    followers: null,
    followings: null,
    likedPosts: null
  };

  try {
    // 1. Get user info
    onProgress?.(15, 'Fetching profile information...');
    results.userInfo = await fetchUserInfo(username, apiKey);
    
    const secUid = results.userInfo.data?.userInfo?.user?.secUid;
    if (!secUid) throw new Error('Could not find user profile');

    // 2. Get user's recent posts
    onProgress?.(30, 'Analyzing recent posts...');
    results.userPosts = await fetchUserPosts(secUid, apiKey, 20);

    // 3. Get user's popular posts
    onProgress?.(45, 'Fetching top-performing content...');
    results.popularPosts = await fetchUserPopularPosts(secUid, apiKey, 20);

    // 4. Get followers sample (for audience insights)
    onProgress?.(60, 'Analyzing follower base...');
    try {
      results.followers = await fetchUserFollowers(secUid, apiKey, 30);
    } catch (e) {
      console.log('Followers fetch failed:', e.message);
    }

    // 5. Get followings (for network analysis)
    onProgress?.(75, 'Analyzing creator network...');
    try {
      results.followings = await fetchUserFollowings(secUid, apiKey, 30);
    } catch (e) {
      console.log('Followings fetch failed:', e.message);
    }

    // 6. Get liked posts (for content preferences)
    onProgress?.(85, 'Understanding content preferences...');
    try {
      results.likedPosts = await fetchUserLikedPosts(secUid, apiKey, 20);
    } catch (e) {
      console.log('Liked posts fetch failed:', e.message);
    }

    onProgress?.(95, 'Generating profile insights...');

    // Generate comprehensive profile insights
    const insights = generateProfileInsights(results);

    return {
      success: true,
      entityType: 'profile',
      data: results,
      insights,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    throw new Error(`Profile analysis failed: ${error.message}`);
  }
}

/**
 * Analyze Hashtag/Challenge
 * @param {string} hashtag - Hashtag name (without #)
 * @param {string} apiKey - RapidAPI key
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<object>} - Hashtag analysis data
 */
export async function analyzeHashtag(hashtag, apiKey, onProgress) {
  const results = {
    challengeInfo: null,
    challengePosts: null,
    relatedHashtags: null,
    trendingComparison: null
  };

  try {
    // 1. Get challenge info
    onProgress?.(20, 'Fetching hashtag data...');
    results.challengeInfo = await fetchChallengeInfo(hashtag, apiKey);

    // 2. Get top posts using this hashtag
    onProgress?.(40, 'Analyzing top posts...');
    const challengeId = results.challengeInfo.data?.challengeInfo?.challenge?.id;
    if (challengeId) {
      results.challengePosts = await fetchChallengePosts(challengeId, apiKey, 30);
    }

    // 3. Get trending hashtags for comparison
    onProgress?.(70, 'Comparing with trending hashtags...');
    try {
      results.trendingComparison = await fetchTrendingHashtags(apiKey, 20, 30, 'US');
    } catch (e) {
      console.log('Trending hashtags fetch failed:', e.message);
    }

    onProgress?.(90, 'Generating hashtag insights...');

    // Generate hashtag insights
    const insights = generateHashtagInsights(results);

    return {
      success: true,
      entityType: 'hashtag',
      data: results,
      insights,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    throw new Error(`Hashtag analysis failed: ${error.message}`);
  }
}

/**
 * Analyze Sound/Music
 * @param {string} musicId - Music ID
 * @param {string} apiKey - RapidAPI key
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<object>} - Sound analysis data
 */
export async function analyzeSound(musicId, apiKey, onProgress) {
  const results = {
    musicInfo: null,
    musicPosts: null,
    trendingSounds: null
  };

  try {
    // 1. Get music info
    onProgress?.(25, 'Fetching sound information...');
    results.musicInfo = await fetchMusicInfo(musicId, apiKey);

    // 2. Get posts using this sound
    onProgress?.(50, 'Analyzing videos using this sound...');
    results.musicPosts = await fetchMusicPosts(musicId, apiKey, 30);

    // 3. Get trending sounds for comparison
    onProgress?.(75, 'Comparing with trending sounds...');
    try {
      results.trendingSounds = await fetchTrendingSounds(apiKey, 20, 7, 'US');
    } catch (e) {
      console.log('Trending sounds fetch failed:', e.message);
    }

    onProgress?.(90, 'Generating sound insights...');

    // Generate sound insights
    const insights = generateSoundInsights(results);

    return {
      success: true,
      entityType: 'sound',
      data: results,
      insights,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    throw new Error(`Sound analysis failed: ${error.message}`);
  }
}

// ============================================================================
// API Fetch Functions
// ============================================================================

async function fetchUserInfo(username, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/user/info-with-region`;
  const response = await fetch(`${url}?uniqueId=${username}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`User info API failed: ${response.status}`);
  return await response.json();
}

async function fetchUserPosts(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/posts`;
  const response = await fetch(`${url}?secUid=${secUid}&count=${count}&cursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`User posts API failed: ${response.status}`);
  return await response.json();
}

async function fetchUserPopularPosts(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/popular-posts`;
  const response = await fetch(`${url}?secUid=${secUid}&count=${count}&cursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Popular posts API failed: ${response.status}`);
  return await response.json();
}

async function fetchUserFollowers(secUid, apiKey, count = 30) {
  const url = `${RAPIDAPI_BASE_URL}/user/followers`;
  const response = await fetch(`${url}?secUid=${secUid}&count=${count}&minCursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Followers API failed: ${response.status}`);
  return await response.json();
}

async function fetchUserFollowings(secUid, apiKey, count = 30) {
  const url = `${RAPIDAPI_BASE_URL}/user/followings`;
  const response = await fetch(`${url}?secUid=${secUid}&count=${count}&minCursor=0&maxCursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Followings API failed: ${response.status}`);
  return await response.json();
}

async function fetchUserLikedPosts(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/liked-posts`;
  const response = await fetch(`${url}?secUid=${secUid}&count=${count}&cursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Liked posts API failed: ${response.status}`);
  return await response.json();
}

async function fetchChallengeInfo(challengeName, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/challenge/info`;
  const response = await fetch(`${url}?challengeName=${encodeURIComponent(challengeName)}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Challenge info API failed: ${response.status}`);
  return await response.json();
}

async function fetchChallengePosts(challengeId, apiKey, count = 30) {
  const url = `${RAPIDAPI_BASE_URL}/challenge/posts`;
  const response = await fetch(`${url}?challengeId=${challengeId}&count=${count}&cursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Challenge posts API failed: ${response.status}`);
  return await response.json();
}

async function fetchTrendingHashtags(apiKey, limit = 20, period = 30, country = 'US') {
  const url = `${RAPIDAPI_BASE_URL}/trending/hashtag`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&country=${country}&sort_by=popular`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Trending hashtags API failed: ${response.status}`);
  return await response.json();
}

async function fetchMusicInfo(musicId, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/music/info`;
  const response = await fetch(`${url}?musicId=${musicId}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Music info API failed: ${response.status}`);
  return await response.json();
}

async function fetchMusicPosts(musicId, apiKey, count = 30) {
  const url = `${RAPIDAPI_BASE_URL}/music/posts`;
  const response = await fetch(`${url}?musicId=${musicId}&count=${count}&cursor=0`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Music posts API failed: ${response.status}`);
  return await response.json();
}

async function fetchTrendingSounds(apiKey, limit = 20, period = 7, country = 'US') {
  const url = `${RAPIDAPI_BASE_URL}/trending/song`;
  const response = await fetch(`${url}?page=1&limit=${limit}&period=${period}&rank_type=popular&country=${country}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  if (!response.ok) throw new Error(`Trending sounds API failed: ${response.status}`);
  return await response.json();
}

// ============================================================================
// Insight Generation Functions
// ============================================================================

function generateProfileInsights(results) {
  const user = results.userInfo?.data?.userInfo?.user;
  const stats = results.userInfo?.data?.userInfo?.stats;
  const posts = results.userPosts?.data?.itemList || [];
  const popularPosts = results.popularPosts?.data?.itemList || [];

  if (!user || !stats) return null;

  // Calculate engagement rates
  const totalLikes = posts.reduce((sum, p) => sum + (p.stats?.diggCount || 0), 0);
  const totalViews = posts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0);
  const avgEngagementRate = totalViews > 0 ? (totalLikes / totalViews) * 100 : 0;

  // Follower to following ratio
  const followerRatio = stats.followingCount > 0 ? stats.followerCount / stats.followingCount : stats.followerCount;

  // Content consistency
  const avgViews = totalViews / posts.length || 0;
  const avgLikes = totalLikes / posts.length || 0;

  // Posting frequency
  const postingFrequency = estimatePostingFrequency(posts);

  // Content performance
  const bestPost = popularPosts[0];
  const bestViews = bestPost?.stats?.playCount || 0;
  const bestLikes = bestPost?.stats?.diggCount || 0;

  return {
    overview: {
      username: user.uniqueId,
      displayName: user.nickname,
      followers: formatNumber(stats.followerCount),
      following: formatNumber(stats.followingCount),
      totalVideos: stats.videoCount,
      totalLikes: formatNumber(stats.heart),
      verified: user.verified || false,
      followerRatio: followerRatio.toFixed(1)
    },
    engagement: {
      avgEngagementRate: avgEngagementRate.toFixed(2) + '%',
      avgViews: formatNumber(avgViews),
      avgLikes: formatNumber(avgLikes),
      engagementLevel: avgEngagementRate > 5 ? 'Excellent' : avgEngagementRate > 3 ? 'Good' : avgEngagementRate > 1 ? 'Average' : 'Low'
    },
    content: {
      postingFrequency,
      totalPosts: posts.length,
      bestPerformer: {
        views: formatNumber(bestViews),
        likes: formatNumber(bestLikes),
        description: bestPost?.desc?.substring(0, 50) + '...' || 'N/A'
      }
    },
    growth: {
      accountAge: estimateAccountAge(user.createTime),
      growthRate: estimateGrowthRate(stats, posts),
      nichePosition: determineNichePosition(stats, avgEngagementRate)
    },
    recommendations: generateProfileRecommendations(stats, avgEngagementRate, postingFrequency)
  };
}

function generateHashtagInsights(results) {
  const challenge = results.challengeInfo?.data?.challengeInfo?.challenge;
  const stats = results.challengeInfo?.data?.challengeInfo?.stats;
  const posts = results.challengePosts?.data?.itemList || [];
  const trendingHashtags = results.trendingComparison?.data || [];

  if (!challenge) return null;

  // Calculate average post performance
  const avgViews = posts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / posts.length || 0;
  const avgLikes = posts.reduce((sum, p) => sum + (p.stats?.diggCount || 0), 0) / posts.length || 0;

  // Competition level
  const viewCount = stats?.viewCount || 0;
  const postCount = stats?.videoCount || 0;
  const competitionLevel = viewCount > 100000000 ? 'Very High' : viewCount > 10000000 ? 'High' : viewCount > 1000000 ? 'Medium' : 'Low';

  // Trending status
  const isTrending = trendingHashtags.some(t => t.title?.toLowerCase() === challenge.title?.toLowerCase());

  return {
    overview: {
      hashtagName: '#' + challenge.title,
      totalViews: formatNumber(viewCount),
      totalPosts: formatNumber(postCount),
      isTrending,
      description: challenge.desc || 'No description available'
    },
    performance: {
      avgPostViews: formatNumber(avgViews),
      avgPostLikes: formatNumber(avgLikes),
      competitionLevel,
      opportunity: viewCount > 1000000 && postCount < 50000 ? 'High' : viewCount > 100000 && postCount < 10000 ? 'Medium' : 'Low'
    },
    trending: {
      status: isTrending ? 'Currently Trending' : 'Not Trending',
      momentum: viewCount > 50000000 ? 'High Momentum' : viewCount > 10000000 ? 'Moderate Momentum' : 'Low Momentum',
      saturation: postCount > 100000 ? 'Saturated' : postCount > 10000 ? 'Competitive' : 'Emerging'
    },
    recommendations: generateHashtagRecommendations(viewCount, postCount, competitionLevel)
  };
}

function generateSoundInsights(results) {
  const music = results.musicInfo?.data;
  const posts = results.musicPosts?.data?.itemList || [];
  const trendingSounds = results.trendingSounds?.data || [];

  if (!music) return null;

  const videoCount = music.stats?.videoCount || posts.length || 0;
  const avgViews = posts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / posts.length || 0;

  // Trending status
  const isTrending = trendingSounds.some(s => s.music_id === music.id);

  // Saturation level
  const saturationLevel = videoCount > 100000 ? 'Saturated' : videoCount > 10000 ? 'High Usage' : videoCount > 1000 ? 'Moderate Usage' : 'Low Usage';

  return {
    overview: {
      soundName: music.title || 'Unknown',
      artist: music.authorName || 'Unknown',
      totalVideos: formatNumber(videoCount),
      duration: music.duration ? `${music.duration}s` : 'Unknown',
      isTrending
    },
    performance: {
      avgVideoViews: formatNumber(avgViews),
      saturationLevel,
      viralPotential: videoCount > 1000 && videoCount < 50000 ? 'High' : videoCount < 1000 ? 'Medium' : 'Low',
      usageGrowth: videoCount > 10000 ? 'Established' : videoCount > 1000 ? 'Growing' : 'Emerging'
    },
    recommendation: {
      shouldUse: videoCount > 1000 && videoCount < 100000,
      reason: videoCount > 100000 ? 'Overused - consider finding unique sounds' : 
              videoCount > 10000 ? 'Popular but still viable' :
              videoCount > 1000 ? 'Great opportunity - growing trend' : 
              'Unique sound - good for originality'
    },
    recommendations: generateSoundRecommendations(videoCount, isTrending, saturationLevel)
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function estimatePostingFrequency(posts) {
  if (posts.length < 2) return 'Unknown';
  const timestamps = posts.map(p => p.createTime).sort();
  const avgGap = (timestamps[timestamps.length - 1] - timestamps[0]) / (posts.length - 1);
  const daysGap = avgGap / (24 * 3600);
  
  if (daysGap < 1) return 'Multiple per day';
  if (daysGap < 2) return 'Daily';
  if (daysGap < 4) return 'Every 2-3 days';
  if (daysGap < 7) return 'Several per week';
  return 'Weekly or less';
}

function estimateAccountAge(createTime) {
  if (!createTime) return 'Unknown';
  const ageInDays = Math.floor((Date.now() / 1000 - createTime) / (24 * 3600));
  if (ageInDays < 30) return `${ageInDays} days`;
  if (ageInDays < 365) return `${Math.floor(ageInDays / 30)} months`;
  return `${Math.floor(ageInDays / 365)} years`;
}

function estimateGrowthRate(stats, posts) {
  // Simplified growth rate estimation
  const followerCount = stats.followerCount || 0;
  const videoCount = stats.videoCount || posts.length || 1;
  const followersPerVideo = followerCount / videoCount;
  
  if (followersPerVideo > 1000) return 'Viral Growth';
  if (followersPerVideo > 100) return 'Fast Growth';
  if (followersPerVideo > 10) return 'Steady Growth';
  return 'Slow Growth';
}

function determineNichePosition(stats, engagementRate) {
  const followerCount = stats.followerCount || 0;
  
  if (followerCount > 1000000 && engagementRate > 3) return 'Top Tier Creator';
  if (followerCount > 100000 && engagementRate > 2) return 'Established Creator';
  if (followerCount > 10000 && engagementRate > 1) return 'Growing Creator';
  if (followerCount > 1000) return 'Emerging Creator';
  return 'New Creator';
}

function generateProfileRecommendations(stats, engagementRate, postingFrequency) {
  const recommendations = [];
  
  if (engagementRate < 2) {
    recommendations.push('Focus on creating more engaging content with strong hooks');
  }
  
  if (postingFrequency === 'Weekly or less') {
    recommendations.push('Increase posting frequency to 3-5 times per week for better growth');
  }
  
  if (stats.followerCount < 10000) {
    recommendations.push('Collaborate with other creators to expand reach');
  }
  
  if (stats.followerCount / stats.followingCount < 1) {
    recommendations.push('Reduce following count to improve follower-to-following ratio');
  }

  return recommendations.length > 0 ? recommendations : ['Continue current strategy - performing well!'];
}

function generateHashtagRecommendations(viewCount, postCount, competitionLevel) {
  const recommendations = [];
  
  if (competitionLevel === 'Very High') {
    recommendations.push('Mix with less competitive hashtags to improve discoverability');
  }
  
  if (viewCount > 10000000 && postCount < 50000) {
    recommendations.push('Great opportunity - high views with manageable competition');
  }
  
  if (postCount < 1000) {
    recommendations.push('Emerging hashtag - early adoption advantage available');
  }
  
  recommendations.push('Use 3-5 hashtags total, mixing trending and niche tags');
  
  return recommendations;
}

function generateSoundRecommendations(videoCount, isTrending, saturationLevel) {
  const recommendations = [];
  
  if (isTrending && saturationLevel !== 'Saturated') {
    recommendations.push('Use this sound NOW - trending with opportunity');
  }
  
  if (saturationLevel === 'Saturated') {
    recommendations.push('Consider original audio or less-used sounds for differentiation');
  }
  
  if (videoCount > 1000 && videoCount < 10000) {
    recommendations.push('Sweet spot - established but not oversaturated');
  }
  
  if (videoCount < 1000) {
    recommendations.push('Unique sound - good for standing out, but less discoverability');
  }
  
  return recommendations;
}

export default {
  detectEntityType,
  analyzeProfile,
  analyzeHashtag,
  analyzeSound
};

