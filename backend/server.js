import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import sharp from 'sharp';
import crypto from 'crypto';
import puppeteer from 'puppeteer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);
const app = express();
const port = process.env.PORT || 3001;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Call OpenRouter API
async function callOpenRouter(endpoint, data) {
  const response = await fetch(`${OPENROUTER_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3001',
      'X-Title': 'VIRALIFY - Video Frame Analyzer',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  return response.json();
}

app.use(cors());
app.use(express.json());

// Ensure directories exist
const TEMP_DIR = path.join(__dirname, 'temp');
const FRAMES_DIR = path.join(__dirname, 'frames');

async function ensureDirectories() {
  await fs.mkdir(TEMP_DIR, { recursive: true });
  await fs.mkdir(FRAMES_DIR, { recursive: true });
}

// Clean up old files
async function cleanupOldFiles() {
  const dirs = [TEMP_DIR, FRAMES_DIR];
  const now = Date.now();
  const maxAge = 3600000; // 1 hour

  for (const dir of dirs) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (now - stats.mtime.getTime() > maxAge) {
        await fs.unlink(filePath);
      }
    }
  }
}

// Extract real TikTok data using Puppeteer
async function extractTikTokData(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for video to load
    await page.waitForSelector('video', { timeout: 10000 });

    // Extract data
    const data = await page.evaluate(() => {
      const getTextContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : '';
      };

      return {
        creator: getTextContent('[data-e2e="browse-username"]'),
        description: getTextContent('[data-e2e="browse-video-desc"]'),
        likes: getTextContent('[data-e2e="like-count"]'),
        comments: getTextContent('[data-e2e="comment-count"]'),
        shares: getTextContent('[data-e2e="share-count"]'),
        views: getTextContent('[data-e2e="video-views"]'),
        music: getTextContent('[data-e2e="browse-music"]'),
        hashtags: Array.from(document.querySelectorAll('a[href*="/tag/"]')).map(a => a.textContent),
      };
    });

    return data;
  } finally {
    await browser.close();
  }
}

// Download TikTok video using yt-dlp
async function downloadVideo(url, outputPath) {
  try {
    // Use yt-dlp to download TikTok video
    const command = `yt-dlp -f "best[ext=mp4]/best" -o "${outputPath}" --no-playlist "${url}"`;
    await execAsync(command);
    return true;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw new Error('Failed to download video');
  }
}

// Extract frames from video using FFmpeg
async function extractFrames(videoPath, outputDir, frameRate = 1) {
  try {
    // Extract frames at specified rate (default: 1 frame per second)
    const command = `ffmpeg -i "${videoPath}" -vf "fps=${frameRate}" "${outputDir}/frame_%04d.jpg"`;
    await execAsync(command);
    
    // Get list of extracted frames
    const frames = await fs.readdir(outputDir);
    return frames.filter(f => f.endsWith('.jpg')).sort();
  } catch (error) {
    console.error('Error extracting frames:', error);
    throw new Error('Failed to extract frames');
  }
}

// Analyze frame with OpenRouter Vision
async function analyzeFrame(framePath, prompt) {
  try {
    // Read and encode image
    const imageBuffer = await fs.readFile(framePath);
    const base64Image = imageBuffer.toString('base64');

    const response = await callOpenRouter('/chat/completions', {
      model: "openai/gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "low"
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing frame:', error);
    throw new Error('Failed to analyze frame');
  }
}

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;
  
  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: 'Invalid TikTok URL' });
  }

  const sessionId = crypto.randomBytes(16).toString('hex');
  const videoPath = path.join(TEMP_DIR, `${sessionId}.mp4`);
  const framesDir = path.join(FRAMES_DIR, sessionId);

  try {
    // 1. Extract TikTok metadata
    console.log('Extracting TikTok data...');
    const metadata = await extractTikTokData(url);

    // 2. Download video
    console.log('Downloading video...');
    await downloadVideo(url, videoPath);

    // 3. Extract frames
    console.log('Extracting frames...');
    await fs.mkdir(framesDir, { recursive: true });
    const frames = await extractFrames(videoPath, framesDir);

    // 4. Analyze key frames
    console.log('Analyzing frames...');
    const frameAnalysis = [];
    
    // Analyze first frame (hook)
    if (frames.length > 0) {
      const hookAnalysis = await analyzeFrame(
        path.join(framesDir, frames[0]),
        "Analyze this opening frame. What makes it attention-grabbing? Identify visual hooks, text overlays, facial expressions, and composition that would make someone stop scrolling."
      );
      frameAnalysis.push({ frame: 'opening', analysis: hookAnalysis });
    }

    // Analyze middle frame
    if (frames.length > 2) {
      const middleFrame = frames[Math.floor(frames.length / 2)];
      const middleAnalysis = await analyzeFrame(
        path.join(framesDir, middleFrame),
        "Analyze this middle frame. What's happening in the story? How does it maintain viewer engagement? Look for visual interest, action, or narrative development."
      );
      frameAnalysis.push({ frame: 'middle', analysis: middleAnalysis });
    }

    // Analyze last frame (loop potential)
    if (frames.length > 1) {
      const lastFrame = frames[frames.length - 1];
      const loopAnalysis = await analyzeFrame(
        path.join(framesDir, lastFrame),
        "Analyze this ending frame. Does it create a seamless loop back to the beginning? What makes viewers want to rewatch? Look for cliffhangers or visual continuity."
      );
      frameAnalysis.push({ frame: 'ending', analysis: loopAnalysis });
    }

    // 5. Calculate virality score
    const viralityFactors = {
      views: parseInt(metadata.views?.replace(/[^\d]/g, '') || '0'),
      likes: parseInt(metadata.likes?.replace(/[^\d]/g, '') || '0'),
      comments: parseInt(metadata.comments?.replace(/[^\d]/g, '') || '0'),
      shares: parseInt(metadata.shares?.replace(/[^\d]/g, '') || '0'),
      hasMusic: !!metadata.music,
      hashtagCount: metadata.hashtags.length,
      descriptionLength: metadata.description.length,
    };

    const viralityScore = calculateViralityScore(viralityFactors);

    // 6. Clean up files
    await fs.rm(videoPath, { force: true });
    await fs.rm(framesDir, { recursive: true, force: true });

    // Return analysis
    res.json({
      success: true,
      data: {
        metadata,
        frameAnalysis,
        viralityScore,
        recommendations: generateRecommendations(frameAnalysis, viralityFactors),
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up on error
    await fs.rm(videoPath, { force: true }).catch(() => {});
    await fs.rm(framesDir, { recursive: true, force: true }).catch(() => {});
    
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
});

// Calculate virality score based on metrics
function calculateViralityScore(factors) {
  let score = 0;
  
  // Engagement rate (likes/views)
  if (factors.views > 0) {
    const engagementRate = factors.likes / factors.views;
    score += Math.min(engagementRate * 100, 30); // Max 30 points
  }
  
  // Comment rate
  if (factors.views > 0) {
    const commentRate = factors.comments / factors.views;
    score += Math.min(commentRate * 200, 20); // Max 20 points
  }
  
  // Share rate (most important)
  if (factors.views > 0) {
    const shareRate = factors.shares / factors.views;
    score += Math.min(shareRate * 500, 30); // Max 30 points
  }
  
  // Trending audio bonus
  if (factors.hasMusic) {
    score += 10;
  }
  
  // Hashtag optimization
  if (factors.hashtagCount >= 3 && factors.hashtagCount <= 5) {
    score += 10;
  }
  
  return Math.round(score);
}

// Generate recommendations based on analysis
function generateRecommendations(frameAnalysis, metrics) {
  const recommendations = [];
  
  // Check hook strength
  const hookAnalysis = frameAnalysis.find(f => f.frame === 'opening');
  if (hookAnalysis && !hookAnalysis.analysis.toLowerCase().includes('strong')) {
    recommendations.push({
      type: 'hook',
      priority: 'high',
      suggestion: 'Improve your opening hook - consider adding text overlay, surprising visual, or immediate action'
    });
  }
  
  // Check loop quality
  const loopAnalysis = frameAnalysis.find(f => f.frame === 'ending');
  if (loopAnalysis && !loopAnalysis.analysis.toLowerCase().includes('loop')) {
    recommendations.push({
      type: 'loop',
      priority: 'medium',
      suggestion: 'Create a seamless loop by matching the ending frame with the beginning'
    });
  }
  
  // Check engagement metrics
  if (metrics.likes && metrics.views && (metrics.likes / metrics.views) < 0.1) {
    recommendations.push({
      type: 'engagement',
      priority: 'high',
      suggestion: 'Engagement rate is low - focus on more relatable or emotional content'
    });
  }
  
  return recommendations;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VIRALIFY API is running' });
});

// Start server
app.listen(port, async () => {
  await ensureDirectories();
  console.log(`VIRALIFY API server running on port ${port}`);
  
  // Schedule cleanup every hour
  setInterval(cleanupOldFiles, 3600000);
});
