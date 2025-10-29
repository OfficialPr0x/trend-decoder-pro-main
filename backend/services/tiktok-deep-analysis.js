/**
 * TikTok Deep Analysis Service
 * Maxes out RapidAPI to provide comprehensive multi-point analysis
 */

import fetch from 'node-fetch';
import * as tiktokAPI from './tiktok-rapidapi.js';

const RAPIDAPI_BASE_URL = 'https://tiktok-api23.p.rapidapi.com/api';

/**
 * Comprehensive deep analysis using multiple RapidAPI endpoints
 * @param {string} videoId - TikTok video ID
 * @param {string} apiKey - RapidAPI key
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<object>} - Comprehensive analysis data
 */
export async function performDeepAnalysis(videoId, apiKey, onProgress) {
  const results = {
    videoDetails: null,
    comments: null,
    relatedVideos: null,
    userInfo: null,
    userTopPosts: null,
    userOldestPosts: null,
    userFollowers: null,
    userFollowings: null,
    musicInfo: null,
    musicPosts: null,
    challengeInfo: null,
    challengePosts: null,
    trendingComparison: null,
    trendingSounds: null,
    trendingHashtags: null,
    searchRelated: null
  };
  
  try {
    // 1. Get video details
    onProgress?.(10, 'Fetching video details...');
    results.videoDetails = await tiktokAPI.fetchVideoDetails(videoId, apiKey);
    
    const video = results.videoDetails.itemInfo.itemStruct;
    const author = video.author;
    const music = video.music;
    
    // 2. Get top comments (insights into audience engagement)
    onProgress?.(20, 'Analyzing comments...');
    if (apiKey) {
      try {
        results.comments = await fetchTopComments(videoId, apiKey, 50);
        console.log('✅ Comments API successful - premium access confirmed!');
      } catch (e) {
        console.log('❌ Comments API failed:', e.message);
        console.log('❌ Full error details:', e);
      }
    } else {
      console.log('Skipping comments analysis - no RapidAPI key provided');
    }

    // 3. Get related videos (understand competition)
    onProgress?.(30, 'Finding related content...');
    if (apiKey) {
      try {
        results.relatedVideos = await fetchRelatedVideos(videoId, apiKey, 16);
        console.log('✅ Related videos API successful - premium access confirmed!');
      } catch (e) {
        console.log('❌ Related videos API failed:', e.message);
        console.log('❌ Full error details:', e);
      }
    } else {
      console.log('Skipping related videos analysis - no RapidAPI key provided');
    }
    
    // 4. Get user info with region
    onProgress?.(40, 'Analyzing creator profile...');
    try {
      results.userInfo = await fetchUserInfoWithRegion(author.uniqueId, apiKey);
    } catch (e) {
      console.log('User info fetch failed:', e.message);
    }
    
    // 5. Get user's top performing posts (understand their strategy)
    onProgress?.(50, 'Analyzing creator\'s top content...');
    try {
      results.userTopPosts = await fetchUserTopPosts(author.secUid, apiKey, 20);
    } catch (e) {
      console.log('User posts fetch failed:', e.message);
    }

    // 6. Get user's liked posts (understand their interests and preferences)
    onProgress?.(45, 'Analyzing creator\'s liked content...');
    if (apiKey) {
      try {
        results.userLikedPosts = await tiktokAPI.fetchUserLikedPosts(author.secUid, apiKey, 20);
        console.log('✅ Liked posts API successful - premium access confirmed!');
      } catch (e) {
        console.log('❌ Liked posts API failed:', e.message);
      }
    }

    // 7. Get user's oldest posts (understand content evolution)
    onProgress?.(50, 'Analyzing content history...');
    try {
      results.userOldestPosts = await fetchUserOldestPosts(author.secUid, apiKey, 15);
      console.log('✅ Oldest posts fetched');
    } catch (e) {
      console.log('❌ Oldest posts fetch failed:', e.message);
    }

    // 8. Get user's followers sample (audience insights)
    onProgress?.(55, 'Analyzing follower base...');
    try {
      results.userFollowers = await fetchUserFollowers(author.secUid, apiKey, 20);
      console.log('✅ Followers data fetched');
    } catch (e) {
      console.log('❌ Followers fetch failed:', e.message);
    }

    // 9. Get user's followings (network analysis)
    onProgress?.(58, 'Analyzing creator network...');
    try {
      results.userFollowings = await fetchUserFollowings(author.secUid, apiKey, 20);
      console.log('✅ Followings data fetched');
    } catch (e) {
      console.log('❌ Followings fetch failed:', e.message);
    }
    
    // 10. Get music/sound info (trend analysis)
    onProgress?.(62, 'Analyzing music trends...');
    try {
      if (music?.id) {
        results.musicInfo = await fetchMusicInfo(music.id, apiKey);
      }
    } catch (e) {
      console.log('Music info fetch failed:', e.message);
    }

    // 11. Get posts using this music (saturation check)
    onProgress?.(65, 'Checking sound saturation...');
    try {
      if (music?.id) {
        results.musicPosts = await fetchMusicPosts(music.id, apiKey, 15);
      }
    } catch (e) {
      console.log('Music posts fetch failed:', e.message);
    }
    
    // 12. Get challenge/hashtag info
    onProgress?.(68, 'Analyzing hashtags...');
    try {
      const hashtags = extractHashtags(video.desc);
      if (hashtags.length > 0) {
        results.challengeInfo = await fetchChallengeInfo(hashtags[0], apiKey);
      }
    } catch (e) {
      console.log('Challenge info fetch failed:', e.message);
    }

    // 13. Get posts using main hashtag (competition analysis)
    onProgress?.(72, 'Analyzing hashtag competition...');
    try {
      const hashtags = extractHashtags(video.desc);
      if (hashtags.length > 0 && results.challengeInfo?.data?.challengeInfo?.challenge?.id) {
        results.challengePosts = await fetchChallengePosts(
          results.challengeInfo.data.challengeInfo.challenge.id,
          apiKey,
          15
        );
      }
    } catch (e) {
      console.log('Challenge posts fetch failed:', e.message);
    }
    
    // 14. Get trending videos for comparison
    onProgress?.(76, 'Comparing with trending videos...');
    try {
      results.trendingComparison = await fetchTrendingVideos(apiKey, 15);
    } catch (e) {
      console.log('Trending videos fetch failed:', e.message);
    }

    // 15. Get trending sounds for comparison
    onProgress?.(80, 'Comparing with trending sounds...');
    try {
      results.trendingSounds = await fetchTrendingSounds(apiKey, 15);
    } catch (e) {
      console.log('Trending sounds fetch failed:', e.message);
    }

    // 16. Get trending hashtags for comparison
    onProgress?.(84, 'Comparing with trending hashtags...');
    try {
      results.trendingHashtags = await fetchTrendingHashtags(apiKey, 15);
    } catch (e) {
      console.log('Trending hashtags fetch failed:', e.message);
    }

    // 17. Search for related content
    onProgress?.(88, 'Finding related content...');
    try {
      const searchTerm = video.desc?.split(' ').slice(0, 3).join(' ') || author.uniqueId;
      if (searchTerm) {
        results.searchRelated = await searchGeneral(searchTerm, apiKey, 10);
      }
    } catch (e) {
      console.log('Related content search failed:', e.message);
    }
    
    onProgress?.(92, 'Generating insights...');

    // Generate comprehensive insights
    const insights = generateDeepInsights(results);

    // Debug: Log insights to see what's being generated
    console.log('🎯 DEEP ANALYSIS INSIGHTS GENERATED:');
    console.log('- Audience:', insights.audience ? '✅ Available' : '❌ Null');
    console.log('- Competition:', insights.competition ? '✅ Available' : '❌ Null');
    console.log('- Liked Posts:', insights.likedPosts ? '✅ Available' : '❌ Null');
    console.log('- Creator Strategy:', insights.creatorStrategy ? '✅ Available' : '❌ Null');
    console.log('- Virality:', insights.virality ? '✅ Available' : '❌ Null');
    console.log('- Recommendations:', insights.recommendations?.length || 0, 'items');

    return {
      success: true,
      data: results,
      insights,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    throw new Error(`Deep analysis failed: ${error.message}`);
  }
}

/**
 * Fetch top comments
 */
async function fetchTopComments(videoId, apiKey, count = 50) {
  const url = `${RAPIDAPI_BASE_URL}/post/comments`;
  const querystring = new URLSearchParams({
    videoId,
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Comments API failed: ${response.status}`);
  const data = await response.json();
  console.log('📝 COMMENTS API RAW RESPONSE:', JSON.stringify(data).substring(0, 500));
  return data;
}

/**
 * Fetch related videos
 */
async function fetchRelatedVideos(videoId, apiKey, count = 16) {
  const url = `${RAPIDAPI_BASE_URL}/post/related`;
  const querystring = new URLSearchParams({
    videoId,
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Related API failed: ${response.status}`);
  const data = await response.json();
  console.log('📝 RELATED VIDEOS API RAW RESPONSE:', JSON.stringify(data).substring(0, 500));
  return data;
}

/**
 * Fetch user info with region
 */
async function fetchUserInfoWithRegion(username, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/user/info-with-region`;
  const querystring = new URLSearchParams({
    uniqueId: username
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`User info API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch user's popular posts
 */
async function fetchUserTopPosts(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/popular-posts`;
  const querystring = new URLSearchParams({
    secUid,
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`User posts API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch music info
 */
async function fetchMusicInfo(musicId, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/music/info`;
  const querystring = new URLSearchParams({
    musicId
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Music API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch challenge/hashtag info
 */
async function fetchChallengeInfo(challengeName, apiKey) {
  const url = `${RAPIDAPI_BASE_URL}/challenge/info`;
  const querystring = new URLSearchParams({
    challengeName: challengeName.replace('#', '')
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Challenge API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch trending videos
 */
async function fetchTrendingVideos(apiKey, count = 16) {
  const url = `${RAPIDAPI_BASE_URL}/post/trending`;
  const querystring = new URLSearchParams({
    count: count.toString()
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Trending API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch user's oldest posts
 */
async function fetchUserOldestPosts(secUid, apiKey, count = 15) {
  const url = `${RAPIDAPI_BASE_URL}/user/oldest-posts`;
  const querystring = new URLSearchParams({
    secUid,
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Oldest posts API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch user followers
 */
async function fetchUserFollowers(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/followers`;
  const querystring = new URLSearchParams({
    secUid,
    count: count.toString(),
    minCursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Followers API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch user followings
 */
async function fetchUserFollowings(secUid, apiKey, count = 20) {
  const url = `${RAPIDAPI_BASE_URL}/user/followings`;
  const querystring = new URLSearchParams({
    secUid,
    count: count.toString(),
    minCursor: '0',
    maxCursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Followings API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch music posts
 */
async function fetchMusicPosts(musicId, apiKey, count = 15) {
  const url = `${RAPIDAPI_BASE_URL}/music/posts`;
  const querystring = new URLSearchParams({
    musicId,
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Music posts API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch challenge posts
 */
async function fetchChallengePosts(challengeId, apiKey, count = 15) {
  const url = `${RAPIDAPI_BASE_URL}/challenge/posts`;
  const querystring = new URLSearchParams({
    challengeId: challengeId.toString(),
    count: count.toString(),
    cursor: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Challenge posts API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch trending sounds
 */
async function fetchTrendingSounds(apiKey, count = 15) {
  const url = `${RAPIDAPI_BASE_URL}/trending/song`;
  const querystring = new URLSearchParams({
    page: '1',
    limit: count.toString(),
    period: '7',
    rank_type: 'popular',
    country: 'US'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Trending sounds API failed: ${response.status}`);
  return await response.json();
}

/**
 * Fetch trending hashtags
 */
async function fetchTrendingHashtags(apiKey, count = 15) {
  const url = `${RAPIDAPI_BASE_URL}/trending/hashtag`;
  const querystring = new URLSearchParams({
    page: '1',
    limit: count.toString(),
    period: '30',
    country: 'US',
    sort_by: 'popular'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Trending hashtags API failed: ${response.status}`);
  return await response.json();
}

/**
 * Search for general content
 */
async function searchGeneral(keyword, apiKey, count = 10) {
  const url = `${RAPIDAPI_BASE_URL}/search/general`;
  const querystring = new URLSearchParams({
    keyword: encodeURIComponent(keyword),
    cursor: '0',
    search_id: '0'
  });
  
  const response = await fetch(`${url}?${querystring}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  });
  
  if (!response.ok) throw new Error(`Search API failed: ${response.status}`);
  return await response.json();
}

/**
 * Extract hashtags from description
 */
function extractHashtags(description) {
  const hashtagRegex = /#[\w]+/g;
  const matches = description?.match(hashtagRegex);
  return matches || [];
}

/**
 * Generate comprehensive insights from all data
 */
function generateDeepInsights(results) {
  const insights = {
    audience: analyzeAudience(results.comments),
    competition: analyzeCompetition(results.relatedVideos),
    creatorStrategy: analyzeCreatorStrategy(results.userTopPosts, results.videoDetails),
    likedPosts: analyzeLikedPosts(results.userLikedPosts, results.videoDetails),
    followerNetwork: analyzeFollowerNetwork(results.userFollowers, results.userFollowings, results.videoDetails),
    musicSaturation: analyzeMusicSaturation(results.musicInfo, results.musicPosts, results.trendingSounds),
    contentEvolution: analyzeContentEvolution(results.userOldestPosts, results.userTopPosts, results.videoDetails),
    trendAlignment: analyzeTrendAlignment(results.musicInfo, results.challengeInfo, results.trendingComparison),
    virality: analyzeViralityFactors(results.videoDetails, results.comments, results.relatedVideos),
    recommendations: generateActionableRecommendations(results)
  };
  
  return insights;
}

/**
 * Analyze audience engagement from comments
 */
function analyzeAudience(commentsData) {
  console.log('🔍 ANALYZING AUDIENCE - Raw data:', JSON.stringify(commentsData).substring(0, 300));

  // Try multiple ways to extract comments
  let comments = [];
  if (Array.isArray(commentsData)) {
    comments = commentsData; // Direct array
  } else if (commentsData?.data?.comments) {
    comments = commentsData.data.comments; // Wrapped in data
  } else if (commentsData?.comments) {
    comments = commentsData.comments; // Direct property
  } else {
    // Try to find any array in the response
    for (const key in commentsData) {
      if (Array.isArray(commentsData[key]) && commentsData[key].length > 0) {
        comments = commentsData[key];
        console.log('🔍 ANALYZING AUDIENCE - Found array in key:', key);
        break;
      }
    }
  }

  console.log('🔍 ANALYZING AUDIENCE - Final comments array length:', comments.length);

  if (!comments || comments.length === 0) {
    console.log('❌ ANALYZING AUDIENCE - No comments data, returning basic info');
    return {
      totalComments: 0,
      avgCommentLikes: 0,
      engagementQuality: 'No comments available',
      commonThemes: [],
      sentiment: 'No comments to analyze'
    };
  }
  const totalLikes = comments.reduce((sum, c) => sum + (c.digg_count || 0), 0);
  const avgLikes = comments.length > 0 ? totalLikes / comments.length : 0;

  // Analyze sentiment and common themes
  const themes = extractCommentThemes(comments);

  // More realistic thresholds for comment engagement
  const engagementQuality = avgLikes > 500 ? 'High' : avgLikes > 100 ? 'Medium' : avgLikes > 10 ? 'Low' : 'Very Low';

  return {
    totalComments: comments.length,
    avgCommentLikes: Math.round(avgLikes),
    topCommentLikes: comments[0]?.digg_count || 0,
    engagementQuality,
    commonThemes: themes,
    sentiment: comments.length > 5 ? analyzeCommentSentiment(comments) : 'Insufficient data'
  };
}

/**
 * Analyze competition from related videos
 */
function analyzeCompetition(relatedData) {
  console.log('🔍 ANALYZING COMPETITION - Raw data:', JSON.stringify(relatedData).substring(0, 300));

  // Try multiple ways to extract videos
  let videos = [];
  if (Array.isArray(relatedData)) {
    videos = relatedData; // Direct array
  } else if (relatedData?.data?.itemList) {
    videos = relatedData.data.itemList; // Wrapped in data
  } else if (relatedData?.itemList) {
    videos = relatedData.itemList; // Direct property
  } else {
    // Try to find any array in the response
    for (const key in relatedData) {
      if (Array.isArray(relatedData[key]) && relatedData[key].length > 0) {
        videos = relatedData[key];
        console.log('🔍 ANALYZING COMPETITION - Found array in key:', key);
        break;
      }
    }
  }

  console.log('🔍 ANALYZING COMPETITION - Final videos array length:', videos.length);

  if (!videos || videos.length === 0) {
    console.log('❌ ANALYZING COMPETITION - No videos data, returning basic info');
    return {
      competitorCount: 0,
      avgCompetitorViews: 0,
      avgCompetitorLikes: 0,
      avgCompetitorEngagementRate: '0.00%',
      competitionLevel: 'No competition data',
      marketPosition: 'Unable to determine'
    };
  }
  const avgViews = videos.reduce((sum, v) => sum + (v.stats?.playCount || 0), 0) / videos.length;
  const avgLikes = videos.reduce((sum, v) => sum + (v.stats?.diggCount || 0), 0) / videos.length;
  const avgEngagementRate = videos.reduce((sum, v) => {
    const views = v.stats?.playCount || 0;
    const likes = v.stats?.diggCount || 0;
    return sum + (views > 0 ? likes / views : 0);
  }, 0) / videos.length;

  // More realistic competition levels for TikTok
  const competitionLevel = avgViews > 5000000 ? 'Very High' : avgViews > 1000000 ? 'High' : avgViews > 100000 ? 'Medium' : 'Low';

  return {
    competitorCount: videos.length,
    avgCompetitorViews: Math.round(avgViews),
    avgCompetitorLikes: Math.round(avgLikes),
    avgCompetitorEngagementRate: (avgEngagementRate * 100).toFixed(2) + '%',
    competitionLevel,
    marketPosition: avgViews > 1000000 ? 'Highly competitive niche' : avgViews > 100000 ? 'Moderately competitive' : 'Underserved niche'
  };
}

/**
 * Analyze creator's content strategy
 */
function analyzeLikedPosts(likedPostsData, currentVideo) {
  console.log('🔍 ANALYZING LIKED POSTS - Raw data:', JSON.stringify(likedPostsData).substring(0, 300));

  // Try multiple ways to extract liked posts
  let likedPosts = [];
  if (Array.isArray(likedPostsData)) {
    likedPosts = likedPostsData; // Direct array
  } else if (likedPostsData?.data?.itemList) {
    likedPosts = likedPostsData.data.itemList; // Wrapped in data
  } else if (likedPostsData?.itemList) {
    likedPosts = likedPostsData.itemList; // Direct property
  } else {
    // Try to find any array in the response
    for (const key in likedPostsData) {
      if (Array.isArray(likedPostsData[key])) {
        likedPosts = likedPostsData[key];
        console.log('🔍 ANALYZING LIKED POSTS - Found array in key:', key);
        break;
      }
    }
  }

  console.log('🔍 ANALYZING LIKED POSTS - Final array length:', likedPosts.length);

  if (!likedPosts || likedPosts.length === 0) {
    return {
      totalLiked: 0,
      insights: 'No liked posts found or creator has private liked posts',
      preferredContentType: 'Unknown',
      contentPreferences: {}
    };
  }
  const totalLiked = likedPosts.length;

  if (totalLiked === 0) return { totalLiked: 0, insights: 'No liked posts found' };

  // Analyze content preferences
  const contentTypes = likedPosts.reduce((acc, post) => {
    const desc = (post.desc || '').toLowerCase();

    if (desc.includes('dance') || desc.includes('choreo')) acc.dance++;
    else if (desc.includes('music') || desc.includes('song')) acc.music++;
    else if (desc.includes('funny') || desc.includes('comedy')) acc.comedy++;
    else if (desc.includes('tutorial') || desc.includes('how to')) acc.educational++;
    else acc.other++;

    return acc;
  }, { dance: 0, music: 0, comedy: 0, educational: 0, other: 0 });

  // Find most liked content type
  const preferredType = Object.entries(contentTypes).reduce((a, b) =>
    contentTypes[a[0]] > contentTypes[b[0]] ? a : b
  )[0];

  return {
    totalLiked,
    preferredContentType: preferredType,
    contentPreferences: contentTypes,
    insights: `Creator prefers ${preferredType} content, having liked ${contentTypes[preferredType]} such posts`
  };
}

function analyzeCreatorStrategy(userPostsData, currentVideo) {
  if (!userPostsData?.data?.itemList) return null;

  const posts = userPostsData.data.itemList;
  const avgViews = posts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / posts.length;
  const avgLikes = posts.reduce((sum, p) => sum + (p.stats?.diggCount || 0), 0) / posts.length;
  const currentViews = currentVideo?.itemInfo?.itemStruct?.stats?.playCount || 0;
  const currentLikes = currentVideo?.itemInfo?.itemStruct?.stats?.diggCount || 0;

  // More nuanced performance analysis
  const viewPerformance = currentViews > avgViews * 1.5 ? 'Above Average' :
                         currentViews > avgViews * 0.8 ? 'On Par' : 'Below Average';

  const likePerformance = currentLikes > avgLikes * 1.5 ? 'Above Average' :
                         currentLikes > avgLikes * 0.8 ? 'On Par' : 'Below Average';

  // Analyze content consistency
  const consistency = calculateConsistency(posts);
  const postingFrequency = estimatePostingFrequency(posts);

  // Content type analysis
  const contentTypes = analyzeContentTypes(posts);
  
  return {
    totalPosts: posts.length,
    avgViews: Math.round(avgViews),
    avgLikes: Math.round(avgLikes),
    currentViews,
    currentLikes,
    viewPerformance,
    likePerformance,
    contentConsistency: Math.round(consistency) + '%',
    postingFrequency,
    contentTypes,
    strategy: consistency > 70 ? 'Consistent and effective' : consistency > 40 ? 'Moderately consistent' : 'Needs improvement'
  };
}

/**
 * Analyze trend alignment
 */
function analyzeTrendAlignment(musicInfo, challengeInfo, trendingData) {
  const insights = {
    musicTrending: false,
    challengeTrending: false,
    overallTrendScore: 0
  };
  
  if (musicInfo?.data) {
    insights.musicTrending = musicInfo.data.stats?.videoCount > 10000;
    insights.musicPopularity = musicInfo.data.stats?.videoCount || 0;
  }
  
  if (challengeInfo?.data?.challengeInfo) {
    const challenge = challengeInfo.data.challengeInfo;
    insights.challengeTrending = challenge.stats?.viewCount > 1000000;
    insights.challengeViews = challenge.stats?.viewCount || 0;
  }
  
  // Calculate overall trend score
  let score = 0;
  if (insights.musicTrending) score += 30;
  if (insights.challengeTrending) score += 30;
  if (trendingData?.data?.itemList?.length > 0) score += 20;
  
  insights.overallTrendScore = score;
  
  return insights;
}

/**
 * Analyze virality factors
 */
function analyzeViralityFactors(videoDetails, commentsData, relatedData) {
  const video = videoDetails?.itemInfo?.itemStruct;
  if (!video) return null;

  const stats = video.stats;
  const playCount = stats?.playCount || 0;
  const shareCount = stats?.shareCount || 0;
  const commentCount = stats?.commentCount || 0;
  const diggCount = stats?.diggCount || 0;

  // More realistic calculations for TikTok scale
  const shareRate = playCount > 0 ? shareCount / playCount : 0;
  const commentRate = playCount > 0 ? commentCount / playCount : 0;
  const likeRate = playCount > 0 ? diggCount / playCount : 0;
  const totalEngagementRate = commentRate + likeRate;

  // Realistic TikTok thresholds (most videos don't go viral)
  const hookStrength = playCount > 1000000 ? 'Strong' : playCount > 100000 ? 'Moderate' : 'Weak';
  const shareability = shareRate > 0.02 ? 'High' : shareRate > 0.008 ? 'Medium' : 'Low';
  const engagement = totalEngagementRate > 0.08 ? 'Excellent' : totalEngagementRate > 0.03 ? 'Good' : 'Poor';
  const viralPotential = (shareRate > 0.015 && likeRate > 0.05 && playCount > 50000) ? 'High' : (shareRate > 0.008 && likeRate > 0.025) ? 'Medium' : 'Low';

  // Rewatch value based on duration and completion rate (estimated)
  const duration = video.video?.duration || 0;
  const estimatedCompletionRate = duration > 0 ? Math.max(0.1, Math.min(1, 60 / duration)) : 0.5;
  const rewatchValue = estimatedCompletionRate > 0.7 ? 'High' : estimatedCompletionRate > 0.4 ? 'Medium' : 'Low';

  return {
    hookStrength,
    shareability,
    engagement,
    viralPotential,
    rewatchValue,
    metrics: {
      shareRate: (shareRate * 100).toFixed(2) + '%',
      commentRate: (commentRate * 100).toFixed(2) + '%',
      likeRate: (likeRate * 100).toFixed(2) + '%',
      totalEngagementRate: (totalEngagementRate * 100).toFixed(2) + '%'
    }
  };
}

/**
 * Analyze follower network and audience demographics
 */
function analyzeFollowerNetwork(followersData, followingsData, currentVideo) {
  console.log('🔍 ANALYZING FOLLOWER NETWORK');
  
  // Extract followers
  let followers = [];
  if (Array.isArray(followersData)) {
    followers = followersData;
  } else if (followersData?.data?.followers) {
    followers = followersData.data.followers;
  } else if (followersData?.followers) {
    followers = followersData.followers;
  } else if (followersData?.data?.userList) {
    followers = followersData.data.userList;
  }

  // Extract followings
  let followings = [];
  if (Array.isArray(followingsData)) {
    followings = followingsData;
  } else if (followingsData?.data?.followings) {
    followings = followingsData.data.followings;
  } else if (followingsData?.followings) {
    followings = followingsData.followings;
  } else if (followingsData?.data?.userList) {
    followings = followingsData.data.userList;
  }

  const followersSampled = followers.length;
  const followingsSampled = followings.length;

  if (followersSampled === 0 && followingsSampled === 0) {
    return {
      followersSampled: 0,
      followingsSampled: 0,
      insights: 'Follower network data unavailable (may be private account or API limitations)',
      networkStrength: 'Unknown',
      audienceType: 'Unable to determine',
      collaborationPotential: 'Data needed'
    };
  }

  // Analyze follower characteristics
  const verifiedFollowers = followers.filter(f => f.verified || f.isVerified).length;
  const avgFollowerCount = followers.length > 0
    ? followers.reduce((sum, f) => sum + (f.followerCount || f.stats?.followerCount || 0), 0) / followers.length
    : 0;

  // Analyze following patterns
  const verifiedFollowings = followings.filter(f => f.verified || f.isVerified).length;
  const avgFollowingCount = followings.length > 0
    ? followings.reduce((sum, f) => sum + (f.followerCount || f.stats?.followerCount || 0), 0) / followings.length
    : 0;

  // Network strength assessment
  const networkStrength = 
    avgFollowerCount > 50000 ? 'Very Strong - High-value audience' :
    avgFollowerCount > 10000 ? 'Strong - Quality followers' :
    avgFollowerCount > 1000 ? 'Growing - Engaged community' :
    'Emerging - Building audience';

  // Audience type
  const audienceType = 
    verifiedFollowers > followersSampled * 0.1 ? 'Industry Professionals & Influencers' :
    avgFollowerCount > 20000 ? 'Established Content Creators' :
    avgFollowerCount > 5000 ? 'Active Content Consumers & Creators' :
    'General Audience & New Users';

  // Collaboration insights
  const potentialCollaborators = followings.filter(f => 
    (f.followerCount || f.stats?.followerCount || 0) > 10000 && 
    (f.followerCount || f.stats?.followerCount || 0) < 1000000
  ).length;

  const collaborationPotential = 
    potentialCollaborators > 5 ? `High - ${potentialCollaborators} suitable collaboration targets identified` :
    potentialCollaborators > 2 ? `Medium - ${potentialCollaborators} potential collaborators` :
    'Low - Focus on growing network first';

  return {
    followersSampled,
    followingsSampled,
    verifiedFollowers,
    verifiedFollowings,
    avgFollowerSize: Math.round(avgFollowerCount),
    avgFollowingSize: Math.round(avgFollowingCount),
    networkStrength,
    audienceType,
    collaborationPotential,
    insights: `Analyzed ${followersSampled} followers and ${followingsSampled} followings. ${networkStrength}. Audience consists of ${audienceType.toLowerCase()}.`
  };
}

/**
 * Analyze music/sound saturation and opportunity
 */
function analyzeMusicSaturation(musicInfo, musicPosts, trendingSounds) {
  console.log('🔍 ANALYZING MUSIC SATURATION');

  if (!musicInfo?.data) {
    return {
      soundUsage: 0,
      saturationLevel: 'Unknown',
      opportunity: 'No music data available',
      recommendation: 'Use trending sounds from the Viral tab for better discoverability',
      isTrending: false
    };
  }

  const videoCount = musicInfo.data.stats?.videoCount || 0;
  const musicTitle = musicInfo.data.title || 'Unknown Sound';
  const authorName = musicInfo.data.authorName || 'Unknown Artist';

  // Saturation analysis
  const saturationLevel = 
    videoCount > 1000000 ? 'Oversaturated' :
    videoCount > 100000 ? 'Highly Saturated' :
    videoCount > 10000 ? 'Moderately Saturated' :
    videoCount > 1000 ? 'Rising' :
    'Underutilized';

  // Opportunity assessment
  const isSweet = videoCount > 5000 && videoCount < 50000;
  const opportunity = 
    videoCount > 1000000 ? 'Low - Sound is oversaturated, hard to stand out' :
    videoCount > 100000 ? 'Medium - Popular but competitive' :
    videoCount > 10000 ? 'High - Sweet spot for discoverability!' :
    videoCount > 1000 ? 'Very High - Early trend opportunity' :
    'Medium - Niche sound, smaller reach potential';

  // Check if trending
  let isTrending = false;
  if (trendingSounds?.data?.songs) {
    isTrending = trendingSounds.data.songs.some(s => 
      s.music_id === musicInfo.data.id || 
      s.title === musicTitle
    );
  }

  // Analyze posts using this music
  let avgViews = 0;
  let topPerformer = null;
  if (musicPosts?.data?.itemList && musicPosts.data.itemList.length > 0) {
    const posts = musicPosts.data.itemList;
    avgViews = posts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / posts.length;
    topPerformer = posts.reduce((max, p) => 
      (p.stats?.playCount || 0) > (max?.stats?.playCount || 0) ? p : max
    , posts[0]);
  }

  const recommendation = 
    videoCount > 1000000 ? 'Consider using less saturated sounds from trending list (10K-100K videos)' :
    videoCount > 100000 ? 'Good choice! Monitor trending sounds for emerging opportunities' :
    isSweet ? '🎯 PERFECT! This sound is in the sweet spot - great discoverability potential' :
    videoCount > 1000 ? '🚀 EXCELLENT! Early on a rising trend - maximize exposure now!' :
    'Consider switching to trending sounds (10K-100K videos) for better reach';

  return {
    soundName: musicTitle,
    artist: authorName,
    soundUsage: videoCount,
    saturationLevel,
    opportunity,
    recommendation,
    isTrending,
    isSweet,
    avgViewsWithSound: Math.round(avgViews),
    topPerformerViews: topPerformer?.stats?.playCount || 0,
    insights: `"${musicTitle}" used in ${videoCount.toLocaleString()} videos. ${saturationLevel}. ${opportunity}`
  };
}

/**
 * Analyze content evolution from oldest to newest posts
 */
function analyzeContentEvolution(oldestPostsData, topPostsData, currentVideo) {
  console.log('🔍 ANALYZING CONTENT EVOLUTION');

  // Extract oldest posts
  let oldestPosts = [];
  if (oldestPostsData?.data?.itemList) {
    oldestPosts = oldestPostsData.data.itemList;
  } else if (Array.isArray(oldestPostsData)) {
    oldestPosts = oldestPostsData;
  }

  // Extract top posts
  let topPosts = [];
  if (topPostsData?.data?.itemList) {
    topPosts = topPostsData.data.itemList;
  } else if (Array.isArray(topPostsData)) {
    topPosts = topPostsData;
  }

  if (oldestPosts.length === 0 || topPosts.length === 0) {
    return {
      oldestPostsAnalyzed: 0,
      topPostsAnalyzed: 0,
      growthTrajectory: 'Insufficient data',
      contentShift: 'Unable to determine',
      insights: 'Content history unavailable (new account or private posts)',
      recommendation: 'Continue posting consistently to establish performance baseline'
    };
  }

  // Calculate average performance for oldest vs top posts
  const avgOldestViews = oldestPosts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / oldestPosts.length;
  const avgTopViews = topPosts.reduce((sum, p) => sum + (p.stats?.playCount || 0), 0) / topPosts.length;
  const growthMultiplier = avgOldestViews > 0 ? avgTopViews / avgOldestViews : 0;

  // Growth trajectory
  const growthTrajectory = 
    growthMultiplier > 10 ? '🚀 Explosive Growth - 10x+ improvement!' :
    growthMultiplier > 5 ? '📈 Strong Growth - 5x performance increase' :
    growthMultiplier > 2 ? '✅ Steady Growth - 2x improvement' :
    growthMultiplier > 1 ? '➡️ Slight Growth - Minor improvement' :
    '⚠️ Declining - Top posts performing below early content';

  // Content style analysis
  const oldestHashtags = oldestPosts.flatMap(p => extractHashtags(p.desc || ''));
  const topHashtags = topPosts.flatMap(p => extractHashtags(p.desc || ''));
  
  const oldestAvgDuration = oldestPosts.reduce((sum, p) => sum + (p.video?.duration || 0), 0) / oldestPosts.length;
  const topAvgDuration = topPosts.reduce((sum, p) => sum + (p.video?.duration || 0), 0) / topPosts.length;

  const durationChange = 
    Math.abs(topAvgDuration - oldestAvgDuration) < 5 ? 'Consistent duration strategy' :
    topAvgDuration < oldestAvgDuration ? `Shifted to shorter videos (${Math.round(topAvgDuration)}s vs ${Math.round(oldestAvgDuration)}s)` :
    `Shifted to longer videos (${Math.round(topAvgDuration)}s vs ${Math.round(oldestAvgDuration)}s)`;

  const contentShift = 
    growthMultiplier > 5 ? 'Found winning formula - content resonates much better now' :
    growthMultiplier > 2 ? 'Improved content strategy showing positive results' :
    growthMultiplier > 1 ? 'Incremental improvements in content approach' :
    'Need to analyze what worked in early content and iterate';

  // Success pattern identification
  const topPostDuration = Math.round(topAvgDuration);
  const successPattern = 
    topPostDuration < 15 && growthMultiplier > 2 ? 'Short-form content (under 15s) driving success' :
    topPostDuration > 30 && growthMultiplier > 2 ? 'Longer storytelling content resonating with audience' :
    'Experimenting with various formats';

  const recommendation = 
    growthMultiplier > 5 ? 'Keep current strategy! Content quality significantly improved. Double down on recent approach.' :
    growthMultiplier > 2 ? 'Positive trend! Continue refining current content style and test variations.' :
    growthMultiplier > 1 ? 'Slow growth. Analyze top performers and pivot towards what works.' :
    'Performance declining. Study your earliest viral content and return to what worked.';

  return {
    oldestPostsAnalyzed: oldestPosts.length,
    topPostsAnalyzed: topPosts.length,
    avgOldestViews: Math.round(avgOldestViews),
    avgTopViews: Math.round(avgTopViews),
    growthMultiplier: growthMultiplier.toFixed(1) + 'x',
    growthTrajectory,
    contentShift,
    durationChange,
    successPattern,
    recommendation,
    insights: `${growthTrajectory}. ${contentShift}. ${durationChange}.`
  };
}

/**
 * Generate actionable recommendations
 */
function generateActionableRecommendations(results) {
  const recommendations = [];
  
  const video = results.videoDetails?.itemInfo?.itemStruct;
  if (!video) return recommendations;
  
  const stats = video.stats;
  const engagement = stats.playCount > 0 ? {
    likeRate: (stats.diggCount / stats.playCount),
    commentRate: (stats.commentCount / stats.playCount),
    shareRate: (stats.shareCount / stats.playCount)
  } : null;

  // HIGH PRIORITY - Music/Sound Strategy
  const musicVideoCount = results.musicInfo?.data?.stats?.videoCount || 0;
  if (musicVideoCount > 1000000) {
    recommendations.push({
      category: 'Sound Strategy',
      priority: 'High',
      action: `Switch to less saturated sounds (10K-100K uses). Current sound is oversaturated with ${(musicVideoCount/1000000).toFixed(1)}M videos`,
      expectedImpact: '+30-50% discoverability'
    });
  } else if (musicVideoCount < 1000) {
    recommendations.push({
      category: 'Sound Strategy',
      priority: 'High',
      action: 'Use trending sounds (10K-100K videos) for better algorithm push. Current sound has limited reach potential',
      expectedImpact: '+50-100% views'
    });
  } else if (musicVideoCount > 10000 && musicVideoCount < 50000) {
    recommendations.push({
      category: 'Sound Strategy',
      priority: 'Low',
      action: '🎯 Perfect sound saturation! Keep using sounds in the 10K-50K range',
      expectedImpact: 'Maintain current performance'
    });
  }

  // HIGH PRIORITY - Engagement Rate
  if (engagement && engagement.commentRate < 0.005) {
    const currentCommentRate = (engagement.commentRate * 100).toFixed(2);
    const targetRate = '0.5%';
    recommendations.push({
      category: 'Engagement',
      priority: 'High',
      action: `Comment rate is ${currentCommentRate}% (target: ${targetRate}+). Add clear CTAs: "Comment your favorite part!" or ask questions`,
      expectedImpact: '+2-3x comments, better algorithm ranking'
    });
  }

  if (engagement && engagement.shareRate < 0.01) {
    recommendations.push({
      category: 'Virality',
      priority: 'High',
      action: 'Share rate is low. Create "shareable moments" - surprising reveals, useful tips, relatable humor',
      expectedImpact: '+100-200% shares, viral potential'
    });
  }

  // MEDIUM PRIORITY - Duration Optimization
  const duration = video.video?.duration || 0;
  if (duration > 30) {
    recommendations.push({
      category: 'Duration',
      priority: 'Medium',
      action: `Video is ${duration}s (long). Test 10-15s versions for higher completion rates`,
      expectedImpact: '+20-30% completion rate'
    });
  } else if (duration < 8) {
    recommendations.push({
      category: 'Duration',
      priority: 'Low',
      action: `Video is very short (${duration}s). Consider 10-15s for better engagement opportunity`,
      expectedImpact: '+10-20% engagement time'
    });
  }
  
  // MEDIUM PRIORITY - Hashtag Strategy
  const hashtags = extractHashtags(video.desc);
  if (hashtags.length < 3) {
    recommendations.push({
      category: 'Hashtags',
      priority: 'Medium',
      action: `Using only ${hashtags.length} hashtags. Add 3-5 relevant tags mixing trending and niche`,
      expectedImpact: '+15-25% discoverability'
    });
  } else if (hashtags.length > 8) {
    recommendations.push({
      category: 'Hashtags',
      priority: 'Low',
      action: `Using ${hashtags.length} hashtags (may dilute). Optimize to 3-5 most relevant tags`,
      expectedImpact: '+5-10% reach'
    });
  }

  // COMPETITION-BASED RECOMMENDATIONS
  if (results.relatedVideos?.data?.itemList) {
    const competitors = results.relatedVideos.data.itemList;
    const avgCompViews = competitors.reduce((sum, v) => sum + (v.stats?.playCount || 0), 0) / competitors.length;
    if (stats.playCount < avgCompViews * 0.5) {
      recommendations.push({
        category: 'Competition',
        priority: 'High',
        action: `Video underperforming vs competition (${Math.round(avgCompViews).toLocaleString()} avg views). Study top 3 competitors' hooks and replicate successful patterns`,
        expectedImpact: '+50-100% views to match niche average'
      });
    }
  }

  // CONTENT EVOLUTION RECOMMENDATIONS
  if (results.userOldestPosts && results.userTopPosts) {
    const hasGrowth = results.userTopPosts.data?.itemList?.[0]?.stats?.playCount > 
                      (results.userOldestPosts.data?.itemList?.[0]?.stats?.playCount || 0) * 2;
    if (!hasGrowth) {
      recommendations.push({
        category: 'Content Strategy',
        priority: 'High',
        action: 'Recent content not outperforming early posts. Return to what worked initially and iterate',
        expectedImpact: '+100-300% by leveraging proven formulas'
      });
    }
  }

  // Sort by priority
  const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}

// Helper functions
function extractCommentThemes(comments) {
  // Enhanced theme extraction from comments
  const themes = [];
  const text = comments.map(c => c.text).join(' ').toLowerCase();

  if (text.includes('love') || text.includes('amazing') || text.includes('awesome')) themes.push('Positive reactions');
  if (text.includes('tutorial') || text.includes('how to') || text.includes('learn')) themes.push('Educational interest');
  if (text.includes('music') || text.includes('song') || text.includes('sound')) themes.push('Music appreciation');
  if (text.includes('dance') || text.includes('moves') || text.includes('choreo')) themes.push('Dance feedback');
  if (text.includes('funny') || text.includes('lol') || text.includes('haha')) themes.push('Humor appreciation');
  if (text.includes('cute') || text.includes('adorable') || text.includes('sweet')) themes.push('Emotional connection');

  return themes.length > 0 ? themes : ['General engagement'];
}

function analyzeCommentSentiment(comments) {
  const text = comments.map(c => c.text).join(' ').toLowerCase();

  const positiveWords = ['love', 'amazing', 'awesome', 'great', 'perfect', 'beautiful', 'cute', 'adorable', 'funny', 'hilarious', 'wow', 'omg'];
  const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'stupid', 'ugly', 'boring', 'annoying'];

  const positiveCount = positiveWords.reduce((count, word) => count + (text.split(word).length - 1), 0);
  const negativeCount = negativeWords.reduce((count, word) => count + (text.split(word).length - 1), 0);

  if (positiveCount > negativeCount * 2) return 'Overwhelmingly positive';
  if (positiveCount > negativeCount) return 'Mostly positive';
  if (negativeCount > positiveCount) return 'Mixed to negative';
  return 'Neutral';
}

function analyzeContentTypes(posts) {
  const types = { dance: 0, comedy: 0, educational: 0, music: 0, other: 0 };

  posts.forEach(post => {
    const desc = (post.desc || '').toLowerCase();
    const music = (post.music?.title || '').toLowerCase();

    if (desc.includes('dance') || desc.includes('choreo') || music.includes('dance')) types.dance++;
    else if (desc.includes('funny') || desc.includes('lol') || desc.includes('comedy')) types.comedy++;
    else if (desc.includes('tutorial') || desc.includes('how to') || desc.includes('learn')) types.educational++;
    else if (desc.includes('music') || desc.includes('song') || music.length > 0) types.music++;
    else types.other++;
  });

  const total = posts.length;
  return {
    primary: Object.entries(types).reduce((a, b) => types[a[0]] > types[b[0]] ? a : b)[0],
    distribution: Object.fromEntries(
      Object.entries(types).map(([k, v]) => [k, Math.round((v / total) * 100) + '%'])
    )
  };
}

function calculateConsistency(posts) {
  if (posts.length < 2) return 100;
  const views = posts.map(p => p.stats?.playCount || 0);
  const avg = views.reduce((a, b) => a + b, 0) / views.length;
  const variance = views.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / views.length;
  const stdDev = Math.sqrt(variance);
  const coefficient = stdDev / avg;
  return Math.max(0, Math.min(100, 100 - coefficient * 100));
}

function estimatePostingFrequency(posts) {
  if (posts.length < 2) return 'Unknown';
  const timestamps = posts.map(p => p.createTime).sort();
  const avgGap = (timestamps[timestamps.length - 1] - timestamps[0]) / (posts.length - 1);
  const daysGap = avgGap / (24 * 3600);
  
  if (daysGap < 1) return 'Multiple per day';
  if (daysGap < 3) return 'Daily';
  if (daysGap < 7) return 'Several per week';
  return 'Weekly';
}

export default {
  performDeepAnalysis
};

