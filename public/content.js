// Content script for TikTok page interaction
// This runs on TikTok pages to extract video URLs

console.log('VIRALIFY content script loaded');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentVideoUrl') {
    const videoUrl = window.location.href;
    sendResponse({ url: videoUrl });
  }
  return true;
});

// Extract video metadata if on a video page
function extractVideoData() {
  const url = window.location.href;
  
  // Check if we're on a video page
  if (url.includes('/video/')) {
    return {
      url: url,
      creator: document.querySelector('[data-e2e="browse-username"]')?.textContent || '',
      description: document.querySelector('[data-e2e="browse-video-desc"]')?.textContent || '',
      likes: document.querySelector('[data-e2e="like-count"]')?.textContent || '',
      comments: document.querySelector('[data-e2e="comment-count"]')?.textContent || '',
      shares: document.querySelector('[data-e2e="share-count"]')?.textContent || '',
    };
  }
  
  return null;
}

// Auto-detect when user opens extension on a video page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getVideoData') {
    const data = extractVideoData();
    sendResponse(data);
  }
  
  // Handle clipboard read request
  if (request.action === 'getClipboard') {
    navigator.clipboard.readText()
      .then(text => sendResponse({ clipboard: text }))
      .catch(err => sendResponse({ error: 'Failed to read clipboard' }));
    return true; // Keep channel open for async response
  }
  
  return true;
});
