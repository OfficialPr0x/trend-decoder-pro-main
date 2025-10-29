/**
 * Competitive Intelligence Service
 * Cross-references multiple data sources for deeper insights
 */

import * as viralDiscovery from './viral-discovery.js';
import * as entityScanner from './entity-scanner.js';

/**
 * Analyze creator's competitive position
 * @param {object} profileData - Profile analysis data
 * @param {string} apiKey - RapidAPI key
 * @returns {Promise<object>} - Competitive intelligence
 */
export async function analyzeCreatorPosition(profileData, apiKey) {
  try {
    // Get trending creators for comparison
    const trendingCreators = await viralDiscovery.fetchTrendingCreators(apiKey, 20, 'follower', 'US');
    
    const userStats = profileData.data?.userInfo?.data?.userInfo?.stats;
    if (!userStats) return null;

    const followerCount = userStats.followerCount || 0;
    const videoCount = userStats.videoCount || 0;
    
    // Calculate percentile rank
    const trendingFollowerCounts = trendingCreators.data?.map(c => c.follower_count || c.fans || 0) || [];
    const percentile = calculatePercentile(followerCount, trendingFollowerCounts);

    // Determine tier
    let tier = 'Emerging';
    if (followerCount > 10000000) tier = 'Mega Influencer';
    else if (followerCount > 1000000) tier = 'Top Creator';
    else if (followerCount > 100000) tier = 'Established Creator';
    else if (followerCount > 10000) tier = 'Growing Creator';

    return {
      tier,
      percentile: percentile.toFixed(1) + '%',
      followerCount,
      videoCount,
      avgFollowersPerVideo: Math.round(followerCount / videoCount),
      competitiveAdvantage: percentile > 75 ? 'Strong' : percentile > 50 ? 'Moderate' : 'Developing',
      recommendations: generateCompetitiveRecommendations(tier, percentile)
    };
  } catch (error) {
    console.error('Creator position analysis failed:', error.message);
    return null;
  }
}

/**
 * Analyze sound saturation and opportunity
 * @param {object} soundData - Sound analysis data
 * @param {string} apiKey - RapidAPI key
 * @returns {Promise<object>} - Sound competitive analysis
 */
export async function analyzeSoundOpportunity(soundData, apiKey) {
  try {
    // Get trending sounds for comparison
    const trendingSounds = await viralDiscovery.fetchTrendingSounds(apiKey, 20, 7, 'US');
    
    const videoCount = soundData.data?.musicInfo?.data?.stats?.videoCount || 0;
    
    // Check if sound is in trending list
    const musicId = soundData.data?.musicInfo?.data?.id;
    const isTrending = trendingSounds.data?.some(s => s.music_id === musicId) || false;

    // Calculate saturation score
    let saturationScore = 0;
    if (videoCount > 100000) saturationScore = 90;
    else if (videoCount > 50000) saturationScore = 70;
    else if (videoCount > 10000) saturationScore = 50;
    else if (videoCount > 1000) saturationScore = 30;
    else saturationScore = 10;

    // Opportunity window
    let opportunityWindow = 'Closed';
    if (isTrending && videoCount < 50000) opportunityWindow = 'Wide Open';
    else if (videoCount > 1000 && videoCount < 100000) opportunityWindow = 'Open';
    else if (videoCount > 100000) opportunityWindow = 'Narrow';

    return {
      isTrending,
      videoCount,
      saturationScore,
      opportunityWindow,
      optimalTiming: isTrending && videoCount < 50000 ? 'Use Now!' : videoCount < 1000 ? 'Wait for momentum' : 'Consider alternatives',
      competitiveEdge: videoCount < 10000 ? 'High - Low competition' : videoCount < 50000 ? 'Moderate' : 'Low - Highly competitive'
    };
  } catch (error) {
    console.error('Sound opportunity analysis failed:', error.message);
    return null;
  }
}

/**
 * Analyze hashtag competition level
 * @param {object} hashtagData - Hashtag analysis data
 * @param {string} apiKey - RapidAPI key
 * @returns {Promise<object>} - Hashtag competitive analysis
 */
export async function analyzeHashtagCompetition(hashtagData, apiKey) {
  try {
    // Get trending hashtags for comparison
    const trendingHashtags = await viralDiscovery.fetchTrendingHashtags(apiKey, 20, 30, 'US');
    
    const challenge = hashtagData.data?.challengeInfo?.data?.challengeInfo?.challenge;
    const stats = hashtagData.data?.challengeInfo?.data?.challengeInfo?.stats;
    
    if (!challenge || !stats) return null;

    const viewCount = stats.viewCount || 0;
    const videoCount = stats.videoCount || 0;

    // Check if hashtag is trending
    const isTrending = trendingHashtags.data?.some(h => 
      h.title?.toLowerCase() === challenge.title?.toLowerCase()
    ) || false;

    // Calculate competition density (videos per view)
    const competitionDensity = viewCount > 0 ? (videoCount / viewCount) * 1000000 : 0;

    // Opportunity scoring
    let opportunityScore = 0;
    if (viewCount > 10000000 && videoCount < 50000) opportunityScore = 90; // Blue ocean
    else if (viewCount > 1000000 && videoCount < 10000) opportunityScore = 80;
    else if (viewCount > 100000 && videoCount < 5000) opportunityScore = 70;
    else if (videoCount < 1000) opportunityScore = 50; // Emerging
    else opportunityScore = 30; // Saturated

    return {
      isTrending,
      viewCount,
      videoCount,
      competitionDensity: competitionDensity.toFixed(2),
      opportunityScore,
      marketPosition: opportunityScore > 70 ? 'Blue Ocean' : opportunityScore > 50 ? 'Growing Market' : 'Red Ocean',
      recommendedUse: opportunityScore > 60 ? 'Primary Hashtag' : opportunityScore > 40 ? 'Secondary Hashtag' : 'Avoid - Too Competitive'
    };
  } catch (error) {
    console.error('Hashtag competition analysis failed:', error.message);
    return null;
  }
}

/**
 * Generate niche analysis by cross-referencing multiple data points
 * @param {object} videoData - Video analysis data
 * @param {string} apiKey - RapidAPI key
 * @returns {Promise<object>} - Niche analysis
 */
export async function analyzeNiche(videoData, apiKey) {
  try {
    const video = videoData.data?.videoDetails?.itemInfo?.itemStruct;
    if (!video) return null;

    // Extract niche indicators
    const hashtags = extractHashtags(video.desc || '');
    const musicId = video.music?.id;

    // Parallel fetch niche data
    const nicheData = await Promise.allSettled([
      hashtags.length > 0 ? viralDiscovery.fetchTrendingHashtags(apiKey, 20, 30, 'US') : null,
      musicId ? viralDiscovery.fetchTrendingSounds(apiKey, 20, 7, 'US') : null,
      viralDiscovery.fetchTrendingVideos(apiKey, 20, 7, 'US')
    ]);

    // Analyze niche saturation
    const trendingHashtags = nicheData[0].status === 'fulfilled' ? nicheData[0].value : null;
    const trendingSounds = nicheData[1].status === 'fulfilled' ? nicheData[1].value : null;
    const trendingVideos = nicheData[2].status === 'fulfilled' ? nicheData[2].value : null;

    // Check overlap with trending content
    const hashtagOverlap = hashtags.filter(tag =>
      trendingHashtags?.data?.some(t => t.title?.toLowerCase() === tag.toLowerCase())
    );

    const soundIsTrending = trendingSounds?.data?.some(s => s.music_id === musicId) || false;

    // Niche saturation score
    let nicheSaturation = 50;
    if (hashtagOverlap.length > 2) nicheSaturation += 20;
    if (soundIsTrending) nicheSaturation += 15;
    if (video.stats?.playCount > 1000000) nicheSaturation += 15;

    return {
      identifiedNiche: determineNiche(video.desc, hashtags),
      nicheSaturation: `${nicheSaturation}%`,
      trendingElements: {
        hashtags: hashtagOverlap.length,
        soundTrending: soundIsTrending
      },
      marketOpportunity: nicheSaturation < 60 ? 'High - Underserved' : nicheSaturation < 80 ? 'Moderate' : 'Low - Oversaturated',
      recommendations: generateNicheRecommendations(nicheSaturation, hashtagOverlap, soundIsTrending)
    };
  } catch (error) {
    console.error('Niche analysis failed:', error.message);
    return null;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function calculatePercentile(value, dataset) {
  if (dataset.length === 0) return 50;
  const sortedData = [...dataset].sort((a, b) => a - b);
  const countBelow = sortedData.filter(v => v < value).length;
  return (countBelow / sortedData.length) * 100;
}

function extractHashtags(description) {
  const hashtagRegex = /#[\w]+/g;
  const matches = description?.match(hashtagRegex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
}

function determineNiche(description, hashtags) {
  const content = (description + ' ' + hashtags.join(' ')).toLowerCase();
  
  if (content.includes('dance') || content.includes('choreo')) return 'Dance';
  if (content.includes('comedy') || content.includes('funny') || content.includes('meme')) return 'Comedy';
  if (content.includes('tutorial') || content.includes('howto') || content.includes('diy')) return 'Educational';
  if (content.includes('fitness') || content.includes('workout') || content.includes('gym')) return 'Fitness';
  if (content.includes('beauty') || content.includes('makeup') || content.includes('skincare')) return 'Beauty';
  if (content.includes('food') || content.includes('recipe') || content.includes('cooking')) return 'Food';
  if (content.includes('fashion') || content.includes('outfit') || content.includes('style')) return 'Fashion';
  if (content.includes('travel') || content.includes('adventure')) return 'Travel';
  if (content.includes('gaming') || content.includes('game')) return 'Gaming';
  if (content.includes('pet') || content.includes('dog') || content.includes('cat')) return 'Pets';
  
  return 'General Entertainment';
}

function generateCompetitiveRecommendations(tier, percentile) {
  const recommendations = [];
  
  if (tier === 'Emerging' || tier === 'Growing Creator') {
    recommendations.push('Focus on consistency - post 3-5 times per week');
    recommendations.push('Collaborate with creators in similar tier for cross-promotion');
  }
  
  if (percentile < 50) {
    recommendations.push('Study top 10 creators in your niche for content ideas');
    recommendations.push('Experiment with trending sounds and hashtags');
  }
  
  if (tier === 'Established Creator' || tier === 'Top Creator') {
    recommendations.push('Maintain brand consistency while testing new formats');
    recommendations.push('Consider launching signature content series');
  }
  
  return recommendations;
}

function generateNicheRecommendations(saturation, hashtagOverlap, soundTrending) {
  const recommendations = [];
  
  if (saturation > 80) {
    recommendations.push('Niche is oversaturated - find unique angle or sub-niche');
    recommendations.push('Mix mainstream and unique hashtags (70/30 split)');
  }
  
  if (saturation < 60) {
    recommendations.push('Great opportunity - low competition detected');
    recommendations.push('Establish authority in this emerging niche');
  }
  
  if (hashtagOverlap.length === 0) {
    recommendations.push('Add 1-2 trending hashtags to increase discoverability');
  }
  
  if (!soundTrending) {
    recommendations.push('Consider using trending sounds for better algorithm boost');
  }
  
  return recommendations;
}

export default {
  analyzeCreatorPosition,
  analyzeSoundOpportunity,
  analyzeHashtagCompetition,
  analyzeNiche
};

