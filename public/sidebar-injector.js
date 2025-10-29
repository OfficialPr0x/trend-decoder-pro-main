// VIRALIFY Sidebar Injector - Injects a sticky right sidebar into TikTok pages

console.log('VIRALIFY: Sidebar injector loaded on', window.location.href);

// Add a simple test button first to verify injection works
function addTestButton() {
  const testBtn = document.createElement('img');
  testBtn.src = 'https://res.cloudinary.com/dolij7wjr/image/upload/v1761338354/81ebecc0-9854-4890-85cf-9d0b15556f7e_jb5bsg.png';
  testBtn.alt = 'VIRALIFY TEST';
  testBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    width: 120px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
    border: 3px solid #000;
  `;
  
  testBtn.addEventListener('mouseenter', () => {
    testBtn.style.transform = 'scale(1.05)';
    testBtn.style.boxShadow = '6px 6px 15px rgba(0, 0, 0, 0.6)';
  });
  
  testBtn.addEventListener('mouseleave', () => {
    testBtn.style.transform = 'scale(1)';
    testBtn.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.5)';
  });
  
  testBtn.onclick = () => showViralifyNotification();
  document.body.appendChild(testBtn);
}

// Custom notification with image
function showViralifyNotification() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  // Create notification box
  const notification = document.createElement('div');
  notification.style.cssText = `
    background: linear-gradient(135deg, #5B2C8A 0%, #3D1F6B 50%, #2B1550 100%);
    border: 4px solid #000;
    border-radius: 20px;
    padding: 0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 90%;
    animation: slideUp 0.3s ease;
    overflow: hidden;
  `;
  
  // Create content - minimal design
  notification.innerHTML = `
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    </style>
    
    <div style="position: relative;">
      <!-- Image -->
      <img 
        src="https://res.cloudinary.com/dolij7wjr/image/upload/v1761338012/ChatGPT_Image_Oct_24_2025_04_33_10_PM_lk69db.png" 
        alt="VIRALIFY" 
        style="width: 100%; display: block;"
      />
      
      <!-- Button -->
      <div style="padding: 20px; text-align: center; background: rgba(0,0,0,0.3);">
        <button 
          id="viralify-notification-ok" 
          style="
            background: linear-gradient(135deg, #FF006B 0%, #FFAA00 100%);
            color: white;
            border: 3px solid #000;
            border-radius: 12px;
            padding: 16px 50px;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
            transition: all 0.2s ease;
            text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
            letter-spacing: 1px;
            width: 100%;
          "
        >
          GO TO TIKTOK
        </button>
      </div>
    </div>
  `;
  
  // Add to overlay
  overlay.appendChild(notification);
  document.body.appendChild(overlay);
  
  // Close on button click or overlay click
  const closeNotification = () => {
    overlay.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => overlay.remove(), 300);
  };
  
  // Get button and add event listeners (no inline handlers for CSP compliance)
  const okButton = document.getElementById('viralify-notification-ok');
  okButton.addEventListener('click', closeNotification);
  
  // Add hover effects via event listeners (not inline handlers)
  okButton.addEventListener('mouseenter', () => {
    okButton.style.transform = 'scale(1.05)';
    okButton.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.3)';
  });
  
  okButton.addEventListener('mouseleave', () => {
    okButton.style.transform = 'scale(1)';
    okButton.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.3)';
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeNotification();
  });
  
  // Auto-close after 5 seconds
  setTimeout(closeNotification, 5000);
}

// Function to inject sidebar
function injectViralifysSidebar() {
  // Check if sidebar already exists to avoid duplicates
  if (document.getElementById('viralify-sidebar')) {
    console.log('VIRALIFY: Sidebar already exists');
    return;
  }
  
  console.log('VIRALIFY: Injecting sidebar...');
  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'viralify-sidebar';
  
  // Create iframe to host the extension UI
  const iframe = document.createElement('iframe');
  iframe.id = 'viralify-iframe';
  iframe.src = chrome.runtime.getURL('sidebar.html');
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
  `;
  
  // Style the sidebar container
  sidebar.style.cssText = `
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: linear-gradient(135deg, #5B2C8A 0%, #3D1F6B 50%, #2B1550 100%);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    z-index: 999999;
    transition: right 0.3s ease-in-out;
    border-left: 4px solid #000;
  `;
  
  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'viralify-toggle';
  toggleBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <path d="M15 6l-6 6 6 6"/>
    </svg>
  `;
  toggleBtn.style.cssText = `
    position: fixed;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FF006B 0%, #FFAA00 100%);
    border: 3px solid #000;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999998;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  `;
  
  // Add hover effect
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.transform = 'translateY(-50%) scale(1.1)';
  });
  
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.transform = 'translateY(-50%) scale(1)';
  });
  
  // Toggle sidebar visibility
  let isOpen = false;
  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    sidebar.style.right = isOpen ? '0' : '-400px';
    toggleBtn.style.right = isOpen ? '410px' : '10px';
    toggleBtn.innerHTML = isOpen ? 
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M15 6l-6 6 6 6"/>
      </svg>` :
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M9 6l6 6-6 6"/>
      </svg>`;
  });
  
  // Append elements to page
  sidebar.appendChild(iframe);
  document.body.appendChild(sidebar);
  document.body.appendChild(toggleBtn);
  
  // Listen for messages from iframe
  window.addEventListener('message', (event) => {
    if (event.data.action === 'extractUrl') {
      // Send current URL to iframe
      iframe.contentWindow.postMessage({
        action: 'urlExtracted',
        url: window.location.href
      }, '*');
    }
    
    if (event.data.action === 'getVideoData') {
      // Extract video data from page
      const videoData = {
        url: window.location.href,
        creator: document.querySelector('[data-e2e="browse-username"]')?.textContent || '',
        description: document.querySelector('[data-e2e="browse-video-desc"]')?.textContent || '',
        likes: document.querySelector('[data-e2e="like-count"]')?.textContent || '',
        comments: document.querySelector('[data-e2e="comment-count"]')?.textContent || '',
        shares: document.querySelector('[data-e2e="share-count"]')?.textContent || '',
      };
      
      iframe.contentWindow.postMessage({
        action: 'videoDataExtracted',
        data: videoData
      }, '*');
    }
  });
  
  console.log('VIRALIFY: Sidebar injected successfully');
}

// Add test button immediately
addTestButton();

// Run injection when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectViralifysSidebar);
} else {
  injectViralifysSidebar();
}

// Also run on navigation changes (for single-page apps like TikTok)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectViralifysSidebar, 1000);
  }
}).observe(document, {subtree: true, childList: true});
