// OpenRouter API service with streaming support
// API keys are now hardcoded in the backend (SaaS model)

const BACKEND_URL = 'http://localhost:3001';

export interface GenerateImageOptions {
  prompt: string;
  model?: string;
  style?: string;
  size?: string;
  onProgress?: (progress: number, status: string) => void;
}

export interface GenerateImageResult {
  url: string;
  prompt: string;
  model: string;
  style?: string;
  error?: string;
  textContent?: string;
}

export async function generateImage(options: GenerateImageOptions): Promise<GenerateImageResult> {
  const { prompt, model, style, size = '1024x1024', onProgress } = options;

  // No API key needed - backend uses hardcoded keys

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/generate/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: model || 'google/gemini-2.5-flash-image',
          style,
          size,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.status === 'complete') {
                resolve(data.data);
                return;
              } else if (data.status === 'error') {
                reject(new Error(data.data.error || 'Generation failed'));
                return;
              } else {
                onProgress?.(data.progress, data.status);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}

export interface GenerateVideoOptions {
  prompt: string;
  model?: string;
  duration?: number;
  style?: string;
}

export interface GenerateVideoResult {
  success: boolean;
  storyboard: string;
  prompt: string;
  model: string;
  duration: number;
  style?: string;
}

export async function generateVideo(options: GenerateVideoOptions): Promise<GenerateVideoResult> {
  const { prompt, model, duration = 15, style } = options;

  // No API key needed - backend uses hardcoded keys

  const response = await fetch(`${BACKEND_URL}/api/generate/video`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      model,
      duration,
      style,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export interface AnalyzeOptions {
  url: string;
  onProgress?: (progress: number, status: string) => void;
}

export interface AnalysisResult {
  success: boolean;
  url: string;
  analysis: {
    contentType: string;
    viralHooks: string[];
    trendingElements: string[];
    engagementScore: number;
    recommendations: string[];
    rawAnalysis?: string;
  };
  timestamp: string;
}

export async function analyzeTikTok(options: AnalyzeOptions): Promise<AnalysisResult> {
  const { url, onProgress } = options;

  // No API keys needed - backend uses hardcoded keys

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.status === 'complete') {
                resolve(data.data);
                return;
              } else if (data.status === 'error') {
                reject(new Error(data.data.error || 'Analysis failed'));
                return;
              } else {
                onProgress?.(data.progress, data.status);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}

export interface ModelCategory {
  id: string;
  name: string;
  context_length?: number;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

export interface ModelsResponse {
  all: ModelCategory[];
  image: ModelCategory[];
  vision: ModelCategory[];
  text: ModelCategory[];
}

export async function fetchModels(): Promise<ModelsResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/models`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    // Return fallback models
    return {
      all: [],
      image: [
        { id: 'google/gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image' },
        { id: 'google/gemini-2.5-flash-image-preview', name: 'Gemini 2.5 Flash Image Preview' },
        { id: 'openai/dall-e-3', name: 'DALL-E 3' },
      ],
      vision: [
        { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
        { id: 'openai/gpt-4-vision-preview', name: 'GPT-4 Vision' },
      ],
      text: [
        { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
        { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo' },
      ]
    };
  }
}

// Test backend connection (replaces testApiKey)
export async function testBackendConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/test-connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error testing backend connection:', error);
    return false;
  }
}

export interface DeepAnalysisResult {
  success: boolean;
  url: string;
  data: {
    videoDetails: any;
    comments: any;
    relatedVideos: any;
    userInfo: any;
    userTopPosts: any;
    musicInfo: any;
    challengeInfo: any;
    trendingComparison: any;
  };
  insights: {
    audience: any;
    competition: any;
    creatorStrategy: any;
    trendAlignment: any;
    virality: any;
    recommendations: Array<{
      category: string;
      priority: string;
      action: string;
    }>;
  };
  timestamp: string;
}

export async function performDeepAnalysis(options: AnalyzeOptions): Promise<DeepAnalysisResult> {
  const { url, onProgress } = options;

  // No API keys needed - backend uses hardcoded keys

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze/deep`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.status === 'complete') {
                resolve(data.data);
                return;
              } else if (data.status === 'error') {
                reject(new Error(data.data.error || 'Deep analysis failed'));
                return;
              } else {
                onProgress?.(data.progress, data.status);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}
