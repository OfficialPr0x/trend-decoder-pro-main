# VIRALIFY Chrome Extension

## Installation Instructions

### Developer Mode Installation

1. **Build the extension:**
   ```bash
   npm install
   npm run build
   ```

2. **Load in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from this project

3. **Test the extension:**
   - Navigate to any TikTok video (e.g., https://www.tiktok.com/@username/video/...)
   - Click the VIRALIFY extension icon in your Chrome toolbar
   - The popup will open with the video URL pre-filled if you're on a TikTok page

### Features

- **Auto-detect TikTok URLs**: When you're on a TikTok video page, the extension automatically detects the URL
- **Viral Analysis**: Analyzes videos for:
  - Hook effectiveness
  - Loop quality
  - Trending audio detection
  - Viral patterns
- **Beautiful UI**: Vibrant, street-art inspired interface

### Building for Production

To create a packaged extension file:

```bash
npm run build
npm run pack-extension
```

This will create a `viralify-extension.zip` file that can be uploaded to the Chrome Web Store.

### File Structure

```
dist/
├── assets/          # Compiled JS and CSS
├── content.js       # Content script for TikTok pages
├── icon16.png       # Extension icon (16x16)
├── icon48.png       # Extension icon (48x48)
├── icon128.png      # Extension icon (128x128)
├── index.html       # Popup HTML
└── manifest.json    # Chrome extension manifest
```

### Permissions

The extension requires:
- `activeTab`: To detect current TikTok URL
- `storage`: To save analysis history
- `tabs`: To query active tabs
- Host permissions for `*.tiktok.com`

### Development

For development with hot reload:
```bash
npm run dev
```
Then load the `dist` folder as an unpacked extension and refresh after changes.

### Troubleshooting

1. **Extension not loading**: Make sure you've run `npm run build` first
2. **Icons not showing**: Ensure icon files exist in the public folder
3. **Content script not working**: Check that you're on a TikTok domain
4. **Popup too small**: The popup is fixed at 500x600px as defined in App.css
