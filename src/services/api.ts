// API service for real TikTok analysis

// Use localhost for Chrome extension - no CORS issues
const API_BASE_URL = 'http://localhost:3001';

export interface TikTokMetadata {
  creator: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  views: string;
  music: string;
  hashtags: string[];
}

export interface FrameAnalysis {
  frame: 'opening' | 'middle' | 'ending';
  analysis: string;
}

export interface AnalysisResult {
  metadata: TikTokMetadata;
  frameAnalysis: FrameAnalysis[];
  viralityScore: number;
  recommendations: Array<{
    type: string;
    priority: string;
    suggestion: string;
  }>;
}

export async function analyzeTikTokVideo(url: string): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Analysis failed');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('API Health check failed:', error);
    return false;
  }
}
