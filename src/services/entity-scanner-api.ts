/**
 * Entity Scanner API Service
 * Frontend service for entity scanning (profiles, hashtags, sounds)
 */

const API_BASE_URL = 'http://localhost:3001/api';

interface EntityScanOptions {
  input: string;
  type?: 'profile' | 'hashtag' | 'sound' | 'video';
  onProgress?: (progress: number, status: string) => void;
}

interface EntityScanResult {
  success: boolean;
  entityType: string;
  data: any;
  insights: any;
  timestamp: string;
}

/**
 * Scan entity (profile, hashtag, or sound)
 * No API key required - uses backend's hardcoded keys
 */
export async function scanEntity(options: EntityScanOptions): Promise<EntityScanResult> {
  const { input, type, onProgress } = options;

  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/scan/entity?dummy=${Date.now()}`,
      { withCredentials: false }
    );

    // Make the POST request (no API key needed)
    fetch(`${API_BASE_URL}/scan/entity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        type,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      function read() {
        reader?.read().then(({ done, value }) => {
          if (done) return;

          const text = decoder.decode(value);
          const lines = text.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.status === 'complete' && data.data) {
                  resolve(data.data);
                } else if (data.status === 'error') {
                  reject(new Error(data.data?.error || 'Scan failed'));
                } else {
                  onProgress?.(data.progress, data.status);
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e);
              }
            }
          }

          read();
        }).catch(reject);
      }

      read();
    }).catch(reject);
  });
}

export default {
  scanEntity,
};

