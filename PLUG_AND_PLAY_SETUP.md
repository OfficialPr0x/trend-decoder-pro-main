# 🚀 VIRALIFY - True Plug & Play Chrome Extension

## ✅ What Changed?

**NO BACKEND SERVER NEEDED!** The extension now calls OpenRouter API directly from the browser.

### Before ❌
- Required backend server running on port 3001
- Manual server startup every time
- Complex setup with environment variables
- Not truly "plug and play"

### After ✅
- **100% browser-based** - no server needed!
- Secure API key storage in Chrome's encrypted storage
- Works across all your devices (synced via Chrome)
- True plug and play experience

## 📦 Installation (2 Simple Steps)

### Step 1: Install the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the `dist` folder in this project
5. Done! Extension is installed ✓

### Step 2: Add Your OpenRouter API Key

1. Visit any TikTok video
2. Click the VIRALIFY toggle button to open the sidebar
3. Go to the **Settings** tab (⚙️)
4. Enter your OpenRouter API key (get it from https://openrouter.ai/keys)
5. Click **"Test Key"** to verify it works
6. Click **"Save Settings"**

**That's it!** You're ready to generate viral content 🎉

## 🔐 How is the API Key Stored?

Your API key is stored using **Chrome's secure storage API**:
- ✅ Encrypted by Chrome
- ✅ Synced across your devices (if Chrome sync is enabled)
- ✅ Never exposed to websites
- ✅ Isolated from other extensions
- ✅ More secure than localStorage

## 🎯 How to Use

### Analyze TikTok Videos
1. Navigate to any TikTok video
2. Open VIRALIFY sidebar
3. Go to **Analyze** tab
4. Click "Extract Current URL"
5. *Note: Full video analysis requires the backend server for yt-dlp/ffmpeg processing*

### Generate Images
1. Go to **Create** tab
2. Select **Image** type
3. Choose your preferred AI model:
   - **Gemini 2.0 Flash** (fastest, free tier friendly)
   - **DALL-E 3** (highest quality)
   - **Stable Diffusion XL** (artistic styles)
4. Select aspect ratio (1:1, 16:9, or 9:16)
5. Enter your prompt
6. Click **"Generate Image"**
7. Wait for the magic ✨

### Generate Video Storyboards
1. Go to **Create** tab
2. Select **Video** type
3. Choose a text model:
   - **Llama 3** (fast storyboards)
   - **Claude 3** (detailed scripts)
   - **GPT-4** (creative concepts)
4. Enter your video concept
5. Click **"Generate Video"**
6. Get a detailed storyboard/script

## 🌐 What About the Backend?

The backend is now **OPTIONAL** and only needed for:
- Full TikTok video analysis (requires yt-dlp + ffmpeg)
- Frame extraction
- Vision model analysis of video frames

For **content generation** (images, video storyboards, ideas), the extension works 100% independently!

## 💰 Pricing

OpenRouter charges based on usage:
- **Gemini 2.0 Flash**: ~$0.001/image (very cheap!)
- **DALL-E 3**: ~$0.04/image
- **Claude 3 Opus**: ~$0.015/1K tokens
- **Llama 3 70B**: ~$0.001/1K tokens

Get $5 free credits when you sign up!

## 🆘 Troubleshooting

### "OpenRouter API key not found"
- Go to Settings tab
- Add your API key from https://openrouter.ai/keys
- Click Save Settings
- Try again

### "Generation Failed"
- Check your API key is valid (click "Test Key" in Settings)
- Verify you have credits in your OpenRouter account
- Some models may have rate limits - try a different model

### API Key not saving
- Make sure you clicked "Save Settings" button
- Check that Chrome sync is enabled (optional but recommended)
- Try disabling and re-enabling the extension

### Extension not showing up
- Go to `chrome://extensions/`
- Find VIRALIFY and click the reload icon
- Refresh the TikTok page
- Look for the toggle button on the left side

## 🔄 Updating the Extension

Whenever you pull new code:
```bash
npm run build
```

Then reload the extension in `chrome://extensions/`

## 🎨 Features

### Current Features
✅ Direct OpenRouter API integration  
✅ Secure Chrome storage for API keys  
✅ Image generation with multiple models  
✅ Video storyboard generation  
✅ Multiple aspect ratios (1:1, 16:9, 9:16)  
✅ Style presets  
✅ Model selection  
✅ Settings sync across devices  
✅ No backend required for generation  

### Coming Soon
🔜 Direct video generation with Sora 2/Kling  
🔜 Built-in frame analysis (no backend needed)  
🔜 Batch content generation  
🔜 Library/history with cloud sync  
🔜 Content scheduling  

## 📱 Cross-Device Sync

Your settings (including API key) automatically sync across:
- Desktop Chrome
- Laptop Chrome
- Any device where you're signed into Chrome

Just install the extension and your settings are there!

## 🔒 Security

- API keys stored in Chrome's encrypted storage
- All API calls made directly from extension (no middle server)
- Your data never touches our servers
- Open source - audit the code yourself

## 💡 Pro Tips

1. **Save on API costs**: Use Gemini 2.0 Flash for testing, DALL-E 3 for final outputs
2. **Better results**: Be specific in your prompts - mention colors, style, mood
3. **Quick styles**: Use the style preset buttons for instant viral aesthetics
4. **Test your key**: Always click "Test Key" after adding your API key
5. **Sync everywhere**: Enable Chrome sync to use your settings on all devices

## 🎉 You're Ready!

No servers to manage, no complex setup. Just:
1. Install extension
2. Add API key
3. Start creating viral content

That's the power of true plug & play! 🚀

---

**Questions?** Check the console for detailed error messages.

**Want the full analysis features?** You can still use the backend server for video frame analysis - it's just optional now!

**Enjoy creating viral content!** 🎬✨

