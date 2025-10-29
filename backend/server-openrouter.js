import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import * as tiktokAPI from './services/tiktok-rapidapi.js';
import { OpenAIService } from './services/openai-service.js';
import deepAnalysis from './services/tiktok-deep-analysis.js';
import entityScanner from './services/entity-scanner.js';
import viralDiscovery from './services/viral-discovery.js';
import competitiveIntel from './services/competitive-intel.js';
import top10sAggregator from './services/top-10s-aggregator.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// API configuration - Hardcoded for users (SaaS model)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const X_RAPIDAPI_KEY = process.env['X-RapidAPI-Key'] || '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const RAPIDAPI_BASE_URL = 'https://tiktok-api23.p.rapidapi.com';


app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Utility to call OpenRouter API
async function callOpenRouter(endpoint, data, stream = false) {
  const response = await fetch(`${OPENROUTER_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3001',
      'X-Title': 'VIRALIFY - TikTok Viral Analyzer',
    },
    body: JSON.stringify({ ...data, stream }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  return response;
}

// Fetch available models from OpenRouter
app.get('/api/models', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY || 'none'}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    const data = await response.json();
    
    // Categorize models by capability
    const models = {
      all: data.data || [],
      image: data.data?.filter(m => 
        m.id.includes('gemini-2.5-flash-image') ||
        m.id.includes('dall-e') || 
        m.id.includes('stable-diffusion') ||
        m.id.includes('midjourney')
      ) || [],
      vision: data.data?.filter(m => 
        m.architecture?.input_modalities?.includes('image') &&
        (m.id.includes('gpt-4') || m.id.includes('claude') || m.id.includes('gemini'))
      ) || [],
      text: data.data?.filter(m => 
        !m.id.includes('vision') && 
        (m.id.includes('gpt') || m.id.includes('claude') || m.id.includes('llama'))
      ) || []
    };

    res.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    // Return hardcoded models as fallback
    res.json({
      all: [],
      image: [
        { id: 'google/gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image' },
        { id: 'google/gemini-2.5-flash-image-preview', name: 'Gemini 2.5 Flash Image Preview' },
        { id: 'openai/dall-e-3', name: 'DALL-E 3' },
      ],
      vision: [
        { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' },
        { id: 'openai/gpt-4-vision-preview', name: 'GPT-4 Vision' },
      ],
      text: [
        { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' },
        { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo' },
      ]
    });
  }
});

// Test backend connection (no API key needed from user)
app.post('/api/test-connection', async (req, res) => {
  try {
    // Test if our hardcoded keys work
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      }
    });

    if (response.ok) {
      res.json({ 
        success: true, 
        message: 'Backend connection successful',
        features: {
          quickAnalysis: true,
          beastMode: true,
          entityScanning: true,
          viralDiscovery: true,
          competitiveIntel: true
        }
      });
    } else {
      res.status(500).json({ success: false, message: 'Backend API connection failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate image with streaming progress
app.post('/api/generate/image', async (req, res) => {
  const { prompt, model, style, size = '1024x1024' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  // Use hardcoded API key
  const API_KEY = OPENROUTER_API_KEY;
  if (!API_KEY) {
    return res.status(401).json({ error: 'API key required' });
  }

  // Set up SSE for real-time progress
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendProgress = (progress, status, data = null) => {
    res.write(`data: ${JSON.stringify({ progress, status, data })}\n\n`);
  };

  try {
    sendProgress(10, 'Connecting to AI model...');

    // Convert size to aspect ratio for Gemini
    const aspectRatioMap = {
      '1024x1024': '1:1',
      '1024x576': '16:9',
      '576x1024': '9:16',
      '1344x768': '16:9',
      '768x1344': '9:16'
    };
    const aspectRatio = aspectRatioMap[size] || '1:1';
    
    sendProgress(20, 'Preparing prompt...');

    // Enhanced prompt for viral content
    const enhancedPrompt = style 
      ? `${prompt}. Style: ${style}, viral TikTok aesthetic, trending, high quality, eye-catching, professional photography`
      : `${prompt}. Viral TikTok content, trending, high quality, eye-catching`;

    sendProgress(30, 'Sending request to AI...');

    // Use the specified model or fallback to Gemini
    const imageModel = model || 'google/gemini-2.5-flash-image';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://viralify.ai',
        'X-Title': 'VIRALIFY - TikTok Viral Analyzer',
      },
      body: JSON.stringify({
        model: imageModel,
        messages: [{
          role: 'user',
          content: enhancedPrompt
        }],
        ...(imageModel.includes('gemini') && {
          modalities: ['text', 'image'],
          image_config: {
            aspect_ratio: aspectRatio
          }
        }),
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    sendProgress(50, 'Processing AI response...');

    let buffer = '';
    let imageData = null;
    let textContent = '';
    let progressIncrement = 50;

    for await (const chunk of response.body) {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            
            if (delta?.content) {
              textContent += delta.content;
              progressIncrement = Math.min(95, progressIncrement + 5);
              sendProgress(progressIncrement, 'Generating image...');
            }

            // Check for image in response (Gemini returns images this way)
            if (parsed.choices?.[0]?.message?.images?.[0]) {
              imageData = parsed.choices[0].message.images[0];
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    sendProgress(95, 'Finalizing...');

    // Extract image URL from response
    let imageUrl = null;
    
    if (imageData) {
      imageUrl = imageData.image_url?.url || imageData.url;
    }

    if (imageUrl) {
      sendProgress(100, 'complete', {
        url: imageUrl,
        prompt: enhancedPrompt,
        model: imageModel,
        style
      });
    } else {
      // No image generated - model might not support it
      sendProgress(100, 'complete', {
        url: `https://placehold.co/${size}/FF006B/FFFFFF?text=${encodeURIComponent('Image Generation\nComing Soon')}`,
        prompt: enhancedPrompt,
        model: imageModel,
        style,
        error: 'Model does not support image generation. Try: google/gemini-2.5-flash-image or google/gemini-2.5-flash-image-preview',
        textContent
      });
    }

    res.end();
  } catch (error) {
    console.error('Image generation error:', error);
    sendProgress(0, 'error', {
      error: error.message,
      url: `https://placehold.co/${size}/FF0000/FFFFFF?text=${encodeURIComponent('Generation Failed')}`
    });
    res.end();
  }
});

// Analyze TikTok content with streaming (using RapidAPI + OpenRouter)
app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: 'Invalid TikTok URL' });
  }

  // Use hardcoded API keys
  const API_KEY = OPENROUTER_API_KEY;
  const RAPID_KEY = X_RAPIDAPI_KEY;
  
  if (!API_KEY) {
    return res.status(401).json({ error: 'OpenRouter API key required' });
  }

  // Set up SSE for real-time progress
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendProgress = (progress, status, data = null) => {
    res.write(`data: ${JSON.stringify({ progress, status, data })}\n\n`);
  };

  try {
    sendProgress(10, 'Analyzing TikTok URL...');

    let tiktokData = null;
    let metadata = null;
    let engagement = null;

    // Try to fetch real TikTok data using RapidAPI if key is available
    if (RAPID_KEY) {
      try {
        sendProgress(15, 'Fetching TikTok data...');
        const { videoId, username } = tiktokAPI.parseTikTokUrl(url);
        
        if (!username) {
          throw new Error('Could not extract username from URL');
        }
        
        const videoDetails = await tiktokAPI.fetchVideoDetails(videoId, RAPID_KEY, username);
        metadata = tiktokAPI.extractMetadata(videoDetails);

        // Ensure rawStats exists and has proper structure
        if (!metadata.rawStats) {
          console.error('Missing rawStats in metadata:', metadata);
          throw new Error('Unable to extract raw statistics from video data');
        }

        engagement = tiktokAPI.calculateEngagement(metadata.rawStats);
        console.log('Engagement object created:', engagement);
        sendProgress(25, 'TikTok data retrieved successfully!');
        tiktokData = metadata;
      } catch (error) {
        console.error('RapidAPI fetch error:', error.message);
        sendProgress(20, 'Could not fetch TikTok data, analyzing URL...');
      }
    } else {
      sendProgress(15, 'No RapidAPI key - analyzing URL only...');
    }

    sendProgress(30, 'Connecting to AI...');

    // Build analysis prompt with real data if available
    let analysisPrompt;
    if (tiktokData) {
      analysisPrompt = `You are a TikTok viral content expert. Analyze this video using REAL PERFORMANCE DATA and provide actionable insights for creators.

VIDEO METRICS:
- Views: ${metadata.views?.toLocaleString() || 'Unknown'}
- Likes: ${metadata.likes?.toLocaleString() || 'Unknown'}
- Comments: ${metadata.comments?.toLocaleString() || 'Unknown'}
- Shares: ${metadata.shares?.toLocaleString() || 'Unknown'}
- Creator: ${metadata.creator || 'Unknown'}
- Duration: ${metadata.duration}s
- Music: ${metadata.music || 'Unknown'}
- Hashtags: ${metadata.hashtags?.join(' ') || 'None'}

ENGAGEMENT ANALYSIS:
- Overall Engagement Rate: ${typeof engagement?.engagementRate === 'number' ? engagement.engagementRate.toFixed(2) : '0.00'}%
- Like Rate: ${typeof engagement?.likeRate === 'number' ? engagement.likeRate.toFixed(2) : '0.00'}%
- Comment Rate: ${typeof engagement?.commentRate === 'number' ? engagement.commentRate.toFixed(2) : '0.00'}%
- Share Rate: ${typeof engagement?.shareRate === 'number' ? engagement.shareRate.toFixed(2) : '0.00'}%
- Virality Score: ${typeof engagement?.viralityScore === 'number' ? engagement.viralityScore : 0}/100

CONTENT ANALYSIS:
Description: "${metadata.description || 'No description'}"

Based on these metrics, provide a DETAILED analysis:

1. CONTENT TYPE: Classify as "Dance", "Comedy", "Educational", "Challenge", "Tutorial", "Storytelling", "Product Demo", "Music Video", "Behind-the-Scenes", "Reaction", "Duet/Stitch", or "Other"

2. VIRAL HOOKS: List 3-5 specific techniques that made this video successful (be specific, not generic like "good music")

3. TRENDING ELEMENTS: Identify specific trending sounds, challenges, effects, or formats being used

4. ENGAGEMENT BREAKDOWN: Explain why the engagement is at this level - what worked/didn't work

5. ACTIONABLE RECOMMENDATIONS: Give 3-5 specific, implementable tips for creating similar content

CRITICAL: Base your analysis on the ACTUAL METRICS. If engagement is low, explain why realistically. If it's high, explain what drove it.

Format as valid JSON:
{
  "contentType": "string (one category only)",
  "viralHooks": ["specific technique 1", "specific technique 2", "specific technique 3"],
  "trendingElements": ["specific trend 1", "specific trend 2"],
  "engagementScore": ${typeof engagement?.viralityScore === 'number' ? engagement.viralityScore : 0},
  "recommendations": ["specific actionable tip 1", "specific actionable tip 2", "specific actionable tip 3"]
}`;
    } else {
      analysisPrompt = `You are a TikTok viral content expert. Analyze this TikTok URL for viral potential: ${url}

Since no metrics are available, make EDUCATED GUESSES based on:
- URL structure and username patterns
- Common TikTok naming conventions
- Current trending formats

Provide realistic analysis:

1. CONTENT TYPE: Based on URL patterns, classify likely category
2. VIRAL HOOKS: What elements typically make similar content viral
3. TRENDING ELEMENTS: Current trends that might apply
4. ENGAGEMENT PREDICTION: Realistic score based on content type
5. RECOMMENDATIONS: Specific tips for this type of content

Be conservative with scores - most TikTok videos get 0-20 engagement, viral ones get 80+.

Format as valid JSON:
{
  "contentType": "Educated guess based on URL",
  "viralHooks": ["technique 1", "technique 2", "technique 3"],
  "trendingElements": ["trend 1", "trend 2"],
  "engagementScore": 25,
  "recommendations": ["tip 1", "tip 2", "tip 3"]
}`;
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://viralify.ai',
        'X-Title': 'VIRALIFY - TikTok Viral Analyzer',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-5-sonnet',
        messages: [{
          role: 'user',
          content: analysisPrompt
        }],
        stream: true,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    sendProgress(50, 'Processing analysis...');

    let buffer = '';
    let fullContent = '';
    let progressIncrement = 50;

    for await (const chunk of response.body) {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            
            if (delta?.content) {
              fullContent += delta.content;
              progressIncrement = Math.min(95, progressIncrement + 2);
              sendProgress(progressIncrement, 'Analyzing...');
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    sendProgress(95, 'Finalizing analysis...');

    // Try to parse JSON from content
    let analysisData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = fullContent.match(/```json\n([\s\S]*?)\n```/) || 
                       fullContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        analysisData = JSON.parse(fullContent);
      }
    } catch (e) {
      // If not valid JSON, structure the text response
      analysisData = {
        contentType: 'Unknown',
        viralHooks: ['See full analysis below'],
        trendingElements: ['Analyzing...'],
        engagementScore: engagement?.viralityScore || 75,
        recommendations: [fullContent],
        rawAnalysis: fullContent
      };
    }

    // Ensure we use the real engagement score if available
    if (engagement) {
      analysisData.engagementScore = engagement.viralityScore;
      analysisData.realMetrics = {
        views: metadata.views,
        likes: metadata.likes,
        comments: metadata.comments,
        shares: metadata.shares,
        engagementRate: engagement.engagementRate,
        creator: metadata.creator
      };
    }

    sendProgress(100, 'complete', {
      success: true,
      url,
      analysis: analysisData,
      tiktokData: tiktokData ? {
        creator: metadata.creator,
        description: metadata.description,
        stats: {
          views: metadata.views,
          likes: metadata.likes,
          comments: metadata.comments,
          shares: metadata.shares
        },
        music: metadata.music,
        hashtags: metadata.hashtags
      } : null,
      timestamp: new Date().toISOString()
    });

    res.end();
  } catch (error) {
    console.error('Analysis error:', error);
    sendProgress(0, 'error', {
      error: error.message
    });
    res.end();
  }
});

// Deep analysis endpoint - maxes out RapidAPI
app.post('/api/analyze/deep', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: 'Invalid TikTok URL' });
  }

  // Use hardcoded API key
  const RAPID_KEY = X_RAPIDAPI_KEY;
  
  if (!RAPID_KEY) {
    return res.status(401).json({ error: 'RapidAPI key required for deep analysis' });
  }

  // Set up SSE for real-time progress
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendProgress = (progress, status, data = null) => {
    res.write(`data: ${JSON.stringify({ progress, status, data })}\n\n`);
  };

  try {
    sendProgress(5, 'Starting deep analysis...');
    
    const { videoId } = tiktokAPI.parseTikTokUrl(url);
    
    sendProgress(10, 'Performing comprehensive analysis...');
    
    // Perform deep analysis using multiple endpoints
    const deepAnalysisResult = await deepAnalysis.performDeepAnalysis(
      videoId,
      RAPID_KEY,
      (progress, status) => sendProgress(progress, status)
    );
    
    sendProgress(95, 'Finalizing deep analysis...');

    // Debug: Log response structure
    console.log('🎯 SERVER RESPONSE STRUCTURE:');
    console.log('- Has insights:', !!deepAnalysisResult.insights);
    console.log('- Audience insights:', !!deepAnalysisResult.insights?.audience);
    console.log('- Competition insights:', !!deepAnalysisResult.insights?.competition);
    console.log('- Liked posts insights:', !!deepAnalysisResult.insights?.likedPosts);
    console.log('- Full insights keys:', Object.keys(deepAnalysisResult.insights || {}));
    console.log('- Audience data sample:', JSON.stringify(deepAnalysisResult.insights?.audience).substring(0, 200));
    console.log('- Competition data sample:', JSON.stringify(deepAnalysisResult.insights?.competition).substring(0, 200));

    sendProgress(100, 'complete', {
      success: true,
      url,
      ...deepAnalysisResult,
      timestamp: new Date().toISOString()
    });

    res.end();
  } catch (error) {
    console.error('Deep analysis error:', error);
    sendProgress(0, 'error', {
      error: error.message
    });
    res.end();
  }
});

// Generate video storyboard
app.post('/api/generate/video', async (req, res) => {
  const { prompt, model, duration = 15, style } = req.body;

  // Use hardcoded API key
  const API_KEY = OPENROUTER_API_KEY;
  if (!API_KEY) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const storyboardPrompt = `Create a ${duration}-second viral TikTok video storyboard for: ${prompt}
    
    Include:
    - Scene-by-scene breakdown
    - Timing for each scene
    - Visual descriptions
    - Transitions
    - Text overlays
    - Audio/music suggestions
    - Hook elements
    - Call-to-action
    
    Make it viral-worthy and trending.`;

    const response = await callOpenRouter('/chat/completions', {
      model: model || 'anthropic/claude-3-5-sonnet',
      messages: [{
        role: 'user',
        content: storyboardPrompt
      }],
      max_tokens: 2000,
      temperature: 0.8
    });

    const content = await response.json();
    
    res.json({
      success: true,
      storyboard: content.choices[0].message.content,
      prompt,
      model: model || 'anthropic/claude-3-5-sonnet',
      duration,
      style
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Entity scanning endpoint (profiles, hashtags, sounds)
app.post('/api/scan/entity', async (req, res) => {
  const { input, type } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input required' });
  }

  // Use hardcoded API key
  const RAPID_KEY = X_RAPIDAPI_KEY;
  if (!RAPID_KEY) {
    return res.status(401).json({ error: 'RapidAPI key required for entity scanning' });
  }

  // Set up SSE for real-time progress
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendProgress = (progress, status, data = null) => {
    res.write(`data: ${JSON.stringify({ progress, status, data })}\n\n`);
  };

  try {
    sendProgress(5, 'Detecting entity type...');
    
    // Auto-detect or use provided type
    const entityType = type || entityScanner.detectEntityType(input).type;
    const identifier = entityScanner.detectEntityType(input).identifier;

    sendProgress(10, `Analyzing ${entityType}: ${identifier}...`);

    let result;
    switch (entityType) {
      case 'profile':
        result = await entityScanner.analyzeProfile(
          identifier,
          RAPID_KEY,
          (progress, status) => sendProgress(progress, status)
        );
        break;
      case 'hashtag':
        result = await entityScanner.analyzeHashtag(
          identifier,
          RAPID_KEY,
          (progress, status) => sendProgress(progress, status)
        );
        break;
      case 'sound':
        result = await entityScanner.analyzeSound(
          identifier,
          RAPID_KEY,
          (progress, status) => sendProgress(progress, status)
        );
        break;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }

    sendProgress(100, 'complete', result);
    res.end();
  } catch (error) {
    console.error('Entity scanning error:', error);
    sendProgress(0, 'error', {
      error: error.message
    });
    res.end();
  }
});

// Viral discovery endpoint - Top 10s
app.post('/api/discover/trending', async (req, res) => {
  const { category, limit = 10, period = 7, country = 'US' } = req.body;

  // Use hardcoded API key
  const RAPID_KEY = X_RAPIDAPI_KEY;
  if (!RAPID_KEY) {
    return res.status(401).json({ error: 'RapidAPI key required for viral discovery' });
  }

  try {
    let result;
    
    if (category === 'all') {
      // Fetch all trending categories
      result = await viralDiscovery.fetchAllTrending(RAPID_KEY, { limit, period, country });
    } else {
      // Fetch specific category
      switch (category) {
        case 'videos':
          result = await viralDiscovery.fetchTrendingVideos(RAPID_KEY, limit, period, country);
          break;
        case 'sounds':
          result = await viralDiscovery.fetchTrendingSounds(RAPID_KEY, limit, period, country);
          break;
        case 'hashtags':
          result = await viralDiscovery.fetchTrendingHashtags(RAPID_KEY, limit, 30, country);
          break;
        case 'creators':
          result = await viralDiscovery.fetchTrendingCreators(RAPID_KEY, limit, 'follower', country);
          break;
        case 'keywords':
          result = await viralDiscovery.fetchTrendingKeywords(RAPID_KEY, limit, period, country);
          break;
        case 'ads':
          result = await viralDiscovery.fetchTrendingAds(RAPID_KEY, limit, period, country);
          break;
        case 'products':
          result = await viralDiscovery.fetchTrendingProducts(RAPID_KEY, limit, period);
          break;
        default:
          return res.status(400).json({ error: `Unknown category: ${category}` });
      }
    }

    res.json({
      success: true,
      category,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Viral discovery error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Competitive intelligence endpoint
app.post('/api/analyze/competitive', async (req, res) => {
  const { entityType, entityData } = req.body;

  // Use hardcoded API key
  const RAPID_KEY = X_RAPIDAPI_KEY;
  if (!RAPID_KEY) {
    return res.status(401).json({ error: 'RapidAPI key required for competitive analysis' });
  }

  try {
    let result;
    
    switch (entityType) {
      case 'profile':
        result = await competitiveIntel.analyzeCreatorPosition(entityData, RAPID_KEY);
        break;
      case 'sound':
        result = await competitiveIntel.analyzeSoundOpportunity(entityData, RAPID_KEY);
        break;
      case 'hashtag':
        result = await competitiveIntel.analyzeHashtagCompetition(entityData, RAPID_KEY);
        break;
      case 'video':
        result = await competitiveIntel.analyzeNiche(entityData, RAPID_KEY);
        break;
      default:
        return res.status(400).json({ error: `Unknown entity type: ${entityType}` });
    }

    res.json({
      success: true,
      entityType,
      competitiveIntel: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Competitive analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'VIRALIFY API with OpenRouter + RapidAPI is running 🚀',
    hasOpenRouterKey: !!OPENROUTER_API_KEY,
    hasRapidApiKey: !!X_RAPIDAPI_KEY,
    debug: {
      X_RAPIDAPI_KEY: X_RAPIDAPI_KEY ? 'set' : 'not set',
      X_RAPIDAPI_KEY_length: X_RAPIDAPI_KEY ? X_RAPIDAPI_KEY.length : 0
    },
    timestamp: new Date().toISOString()
  });
});

// Proxy endpoint for frontend to call OpenRouter directly with proper CORS
app.post('/api/openrouter/chat', async (req, res) => {
  const { ...body } = req.body;
  
  // Use hardcoded API key
  const API_KEY = OPENROUTER_API_KEY;

  if (!API_KEY) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://viralify.ai',
        'X-Title': 'VIRALIFY',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// DASHBOARD API ENDPOINTS
// ============================================================================

/**
 * Get Top 10s data by type
 * GET /api/dashboard/top-10s/:type
 */
app.get('/api/dashboard/top-10s/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 20, period = 7, country = 'US', sort_by, order_by } = req.query;

    let data;
    
    switch (type) {
      case 'videos':
        data = await top10sAggregator.getTrendingVideos({ 
          page: Number(page), 
          limit: Number(limit), 
          period: Number(period), 
          country,
          order_by: order_by || 'vv'
        });
        break;
        
      case 'creators':
        data = await top10sAggregator.getTrendingCreators({ 
          page: Number(page), 
          limit: Number(limit), 
          country,
          sort_by: sort_by || 'follower'
        });
        break;
        
      case 'hashtags':
        data = await top10sAggregator.getTrendingHashtags({ 
          page: Number(page), 
          limit: Number(limit), 
          period: Number(period), 
          country,
          sort_by: sort_by || 'popular'
        });
        break;
        
      case 'songs':
        data = await top10sAggregator.getTrendingSongs({ 
          page: Number(page), 
          limit: Number(limit), 
          period: Number(period), 
          country,
          rank_type: sort_by || 'popular'
        });
        break;
        
      case 'keywords':
        data = await top10sAggregator.getTrendingKeywords({ 
          page: Number(page), 
          limit: Number(limit), 
          period: Number(period), 
          country
        });
        break;
        
      case 'products':
        data = await top10sAggregator.getTopProducts({ 
          page: Number(page), 
          last: Number(period),
          order_by: order_by || 'post',
          order_type: 'desc'
        });
        break;
        
      case 'ads':
        data = await top10sAggregator.getTrendingAds({ 
          page: Number(page), 
          limit: Number(limit), 
          period: Number(period), 
          country,
          order_by: order_by || 'ctr'
        });
        break;
        
      case 'all':
        data = await top10sAggregator.getAllTrending({ country, period: Number(period) });
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid type. Use: videos, creators, hashtags, songs, keywords, products, ads, or all' });
    }

    res.json(data);
  } catch (error) {
    console.error('Dashboard Top 10s error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Clear Top 10s cache
 * POST /api/dashboard/top-10s/cache/clear
 */
app.post('/api/dashboard/top-10s/cache/clear', async (req, res) => {
  try {
    top10sAggregator.clearCache();
    res.json({ success: true, message: 'Cache cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get cache stats
 * GET /api/dashboard/cache/stats
 */
app.get('/api/dashboard/cache/stats', async (req, res) => {
  try {
    const stats = top10sAggregator.getCacheStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Save analysis from extension/dashboard
 * POST /api/dashboard/save-analysis
 */
app.post('/api/dashboard/save-analysis', async (req, res) => {
  try {
    const { userId, tiktokUrl, videoId, metadata, frameAnalysis, viralityScore, recommendations } = req.body;
    
    if (!userId || !tiktokUrl || !videoId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Save to Supabase when integrated
    res.json({ 
      success: true, 
      message: 'Analysis saved successfully',
      id: `analysis-${Date.now()}` // Temporary ID
    });
  } catch (error) {
    console.error('Save analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user's saved analyses
 * GET /api/dashboard/user-analyses
 */
app.get('/api/dashboard/user-analyses', async (req, res) => {
  try {
    const { userId, limit = 20, offset = 0 } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    // TODO: Fetch from Supabase when integrated
    res.json({ 
      success: true,
      analyses: [],
      total: 0
    });
  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Queue video generation
 * POST /api/dashboard/generate-video
 */
app.post('/api/dashboard/generate-video', async (req, res) => {
  try {
    const { userId, template, data, customization } = req.body;
    
    if (!userId || !template || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Implement video generation queue
    res.json({ 
      success: true,
      message: 'Video generation queued',
      videoId: `video-${Date.now()}`,
      status: 'queued'
    });
  } catch (error) {
    console.error('Generate video error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Sync data from extension
 * POST /api/dashboard/sync-from-extension
 */
app.post('/api/dashboard/sync-from-extension', async (req, res) => {
  try {
    const { userId, analyses, timestamp } = req.body;
    
    if (!userId || !analyses) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Implement sync logic with Supabase
    res.json({ 
      success: true,
      synced: analyses.length,
      message: 'Data synced successfully'
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`\n🚀 VIRALIFY Backend Running on port ${port}`);
  console.log(`📡 OpenRouter API: ${OPENROUTER_API_KEY ? '✅ Configured' : '❌ Missing (set in .env)'}`);
  console.log(`🎬 RapidAPI TikTok: ${X_RAPIDAPI_KEY ? '✅ Configured' : '⚠️  Missing (optional - for real TikTok data)'}`);
  console.log(`🔗 DEBUG - X_RAPIDAPI_KEY value: "${X_RAPIDAPI_KEY}"`);
  console.log(`🔗 DEBUG - process.env['X-RapidAPI-Key']: "${process.env['X-RapidAPI-Key']}"`);
  console.log(`🔗 Endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/models`);
  console.log(`   - POST /api/generate/image (SSE streaming)`);
  console.log(`   - POST /api/analyze (SSE streaming with RapidAPI)`);
  console.log(`   - POST /api/analyze/deep (🔥 BEAST MODE - 17+ endpoints!)`);
  console.log(`   - POST /api/scan/entity (🎯 NEW - Profile/Hashtag/Sound scanning)`);
  console.log(`   - POST /api/discover/trending (🔥 NEW - Viral Discovery Top 10s)`);
  console.log(`   - POST /api/analyze/competitive (📊 NEW - Competitive Intelligence)`);
  console.log(`   - POST /api/generate/video`);
  console.log(`   - GET  /api/dashboard/top-10s/:type (📊 Dashboard - Top 10s data)`);
  console.log(`\n✨ Ready to create viral content!`);
  console.log(`🔥 Deep Analysis Mode: ${X_RAPIDAPI_KEY ? 'ENABLED (17+ RapidAPI endpoints)' : 'Disabled (no RapidAPI key)'}`);
  console.log(`🎯 Multi-Entity Scanning: ${X_RAPIDAPI_KEY ? 'ENABLED' : 'Disabled (no RapidAPI key)'}`);
  console.log(`📊 Viral Discovery: ${X_RAPIDAPI_KEY ? 'ENABLED (Top 10 trending everything!)' : 'Disabled (no RapidAPI key)'}`);
  console.log(`🎨 Dashboard API: ENABLED\n`);
});
