// Background script for VIRALIFY Chrome Extension

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      sendResponse({ 
        url: currentTab?.url || '',
        isTikTok: currentTab?.url?.includes('tiktok.com') || false
      });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'readClipboard') {
    // Try to read clipboard using execCommand as fallback
    // Return empty to let the content script handle it
    sendResponse({ clipboard: null });
    return false;
  }
});