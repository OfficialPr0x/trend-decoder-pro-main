# RapidAPI TikTok Integration Setup Guide

## 🎬 What is RapidAPI TikTok Integration?

The RapidAPI TikTok integration enables your VIRALIFY app to fetch **real TikTok data** including:
- ✅ Real view counts
- ✅ Actual likes, comments, and shares
- ✅ Creator information
- ✅ Video descriptions and hashtags
- ✅ Music/audio information
- ✅ Accurate engagement metrics

Without RapidAPI, the app still works but uses AI to analyze the URL without real metrics.

## 📝 Step 1: Get Your RapidAPI Key

### 1.1 Sign Up for RapidAPI
1. Go to [RapidAPI.com](https://rapidapi.com/)
2. Click **"Sign Up"** (or log in if you have an account)
3. Complete registration (free!)

### 1.2 Subscribe to TikTok API
1. Visit the [TikTok API23](https://rapidapi.com/tiktok-api-tiktok-api-default/api/tiktok-api23)
2. Click **"Subscribe to Test"**
3. Choose a plan:
   - **FREE Plan**: 500 requests/month (perfect for testing)
   - **Basic Plan**: More requests for heavy users
4. Complete the subscription

### 1.3 Get Your API Key
1. After subscribing, you'll see your API key at the top of the page
2. Look for `x-rapidapi-key` in the **Code Snippets** section
3. Copy the key (starts with a long string of characters)

## ⚙️ Step 2: Configure VIRALIFY

### Option A: Extension Settings (Recommended for Chrome Extension)

1. Open the VIRALIFY sidebar on any TikTok page
2. Click the **Settings** tab (⚙️)
3. Scroll to **"🎬 RAPIDAPI TIKTOK KEY"** section
4. Paste your RapidAPI key
5. Click **"💾 Save Settings"**

### Option B: Backend .env File (For Backend Server)

1. Navigate to the `backend` folder
2. Create a `.env` file (or edit existing)
3. Add your key:

```env
# OpenRouter API Key (required)
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key

# RapidAPI TikTok API Key (required for real TikTok data)
RAPIDAPI_KEY=your-rapidapi-key-here

# Server Port
PORT=3001
```

4. Save and restart the backend server

## 🚀 Step 3: Start the Backend

Make sure your backend is running:

```bash
cd backend
npm install
npm start
```

You should see:

```
🚀 VIRALIFY Backend Running on port 3001
📡 OpenRouter API: ✅ Configured
🎬 RapidAPI TikTok: ✅ Configured
```

## 🧪 Step 4: Test the Integration

### Test Analysis
1. Go to any TikTok video
2. Open VIRALIFY sidebar
3. Click **"Analyze Video"**
4. Watch the progress - you should see:
   - "Fetching TikTok data..."
   - "TikTok data retrieved successfully!"
5. Results will show **real metrics**:
   - Actual view counts
   - Real engagement rates
   - Creator information

### What You'll See

**Without RapidAPI:**
```
⚠️ No RapidAPI key - analyzing URL only...
Engagement Score: 75 (estimated)
```

**With RapidAPI:**
```
✅ Fetching TikTok data...
✅ TikTok data retrieved successfully!
Engagement Score: 89 (based on real metrics)

Real Metrics:
- Views: 2.5M
- Likes: 450K
- Comments: 12.3K
- Shares: 8.5K
- Engagement Rate: 18.92%
```

## 📊 Understanding the Data

### Engagement Metrics Explained

- **Engagement Rate**: (Likes + Comments + Shares) / Views × 100
- **Like Rate**: Likes / Views × 100
- **Comment Rate**: Comments / Views × 100
- **Share Rate**: Shares / Views × 100 (most important for virality!)
- **Virality Score**: 0-100 based on all metrics combined

### Virality Score Breakdown
- **0-40**: Low engagement
- **40-60**: Average engagement
- **60-80**: Good engagement
- **80-90**: High viral potential
- **90-100**: Extremely viral!

## 🔧 Troubleshooting

### "Failed to fetch TikTok data"
- ✅ Check your RapidAPI key is correct
- ✅ Ensure you're subscribed to TikTok API23
- ✅ Check if you've exceeded your monthly quota
- ✅ Try saving settings again

### "Backend not running"
- ✅ Start backend: `cd backend && npm start`
- ✅ Check port 3001 is not blocked
- ✅ Verify .env file has both API keys

### "Analysis works but no real metrics"
- ✅ Backend might not have RapidAPI key
- ✅ Check backend logs for errors
- ✅ Verify key is saved in both extension AND backend

### Rate Limit Exceeded
- ✅ RapidAPI free plan: 500 requests/month
- ✅ Upgrade your plan on RapidAPI
- ✅ App will still work without RapidAPI (just no real data)

## 💡 Tips for Best Results

1. **API Key Priority**: Extension key > Backend .env key
2. **Free Plan**: Good for ~16 analyses/day
3. **Caching**: The app caches results to save API calls
4. **Fallback**: Even without RapidAPI, AI analysis still works!

## 📚 API Endpoints Used

The integration uses these RapidAPI endpoints:

### Video Info
```
GET /api/video/info?video_id={videoId}
```
Returns full video details, stats, and metadata

### User Posts (optional, for future features)
```
GET /api/user/posts?secUid={secUid}&count=35&cursor=0
```
Returns user's video feed with pagination

## 🎯 Next Steps

Now that you have RapidAPI integrated:

1. ✨ **Analyze viral videos** with real metrics
2. 🎨 **Create content** based on actual engagement data
3. 📊 **Compare videos** to see what works
4. 🚀 **Optimize your strategy** with real insights

## 🆘 Need Help?

- **RapidAPI Support**: [support.rapidapi.com](https://support.rapidapi.com)
- **TikTok API Docs**: Check the API documentation on RapidAPI
- **VIRALIFY Issues**: Check the logs in browser console (F12)

## 🔐 Security Notes

- ✅ API keys are stored securely in Chrome's sync storage
- ✅ Keys are never logged or exposed in the UI
- ✅ Backend uses environment variables for server keys
- ⚠️ Never commit `.env` file to git!

---

**Ready to analyze viral TikToks with real data! 🚀**

