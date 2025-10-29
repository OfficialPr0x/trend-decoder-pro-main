# ⚙️ VIRALIFY Settings Guide

## What's New in Settings

### 🎨 Visual Improvements
- **Bigger Logo** - 50% larger for better visibility
- **High Contrast Inputs** - Black text on white background (no more gray-on-gray!)
- **Colorful Cards** - Each setting section has its own gradient color
- **Bold Typography** - Everything is easier to read with bigger, bolder text
- **Branded Toasts** - Purple/pink gradient notifications with black borders

### ✨ New Features

#### 1. Test API Key Button
Click **"Test Key"** to verify your OpenRouter API key works before saving:
- ✅ Shows "API Key Valid!" if successful
- ❌ Shows error if invalid or connection fails
- No more guessing if your key works!

#### 2. Save Animation
When you click **"Save Settings"**:
- Button shows loading spinner
- Settings are saved to localStorage
- Success toast appears with sparkle icon ✨
- Message: "Your VIRALIFY preferences are locked in 🔥"

#### 3. Improved Input Fields
All inputs now have:
- **White background** with black text
- **Bold font** for better readability
- **3px black borders** matching the VIRALIFY style
- **Placeholder text** in gray (easy to see)

## Settings Sections

### 🔑 OpenRouter API Key
- **Purpose**: Connect to AI models for generation
- **Format**: Starts with `sk-or-v1-...`
- **Actions**:
  - Test Key - Validates your key instantly
  - Get key at [openrouter.ai/keys](https://openrouter.ai/keys)

### 🧠 AI Models
Configure which AI models to use:
- **Vision Model**: For analyzing TikTok videos
  - GPT-4 Vision
  - Claude 3 Opus Vision
  - Gemini Pro Vision

- **Image Generation**: For creating viral content
  - Gemini 2.0 Flash (Recommended - Fast & Free)
  - DALL-E 3
  - Stable Diffusion XL

### 🎨 Theme
Choose your visual style:
- 🎨 Graffiti (Default) - Vibrant and energetic
- 🤖 Cyberpunk - Futuristic neon
- 💿 Y2K Aesthetic - Retro 2000s
- ⚪ Minimal - Clean and simple

### 🎯 Preferences
Toggle features on/off:
- **Auto-analyze videos** - Analyze automatically when extracting URL
- **Save history locally** - Keep all analyses in your Library

## How to Save Settings

1. Fill in your OpenRouter API key
2. (Optional) Click "Test Key" to verify it works
3. Configure your preferred models
4. Choose your theme
5. Toggle preferences as desired
6. Click the big green **"SAVE SETTINGS"** button
7. Watch for the success toast! 🎉

## Toast Notifications

All actions show branded notifications:

### Success Toasts (Purple/Pink Gradient)
- ✨ "Settings Saved!" - Your preferences are saved
- ✅ "API Key Valid!" - Your key is working
- 🎨 "Image Generated!" - Creation successful
- 📚 "Saved to Library!" - Content added to vault

### Error Toasts (Red/Orange Gradient)
- ❌ "Invalid API Key" - Check your key
- ⚠️ "Generation Failed" - API or connection issue
- 🔒 "No API Key!" - Add key in Settings

## Troubleshooting

### "Settings not saving"
- Make sure you click the "Save Settings" button
- Check browser console for errors
- Try refreshing the page

### "Test Key fails"
- Verify your key starts with `sk-or-v1-`
- Check you have credits on OpenRouter
- Try copying the key again (no extra spaces)

### "Can't read input fields"
Fixed! All inputs now have:
- ✅ White background
- ✅ Black text
- ✅ Bold font
- ✅ High contrast

### "Logo too small"
Fixed! Logo is now **1.2x scale** (was 0.8x)

## API Key Security

Your API key is:
- ✅ Stored locally in your browser
- ✅ Never sent to any server except OpenRouter
- ✅ Hidden with password input field
- ✅ Only accessible by the extension

**Note**: Each browser profile has its own settings. If you use multiple profiles, you'll need to add your key in each one.

## Credits & Costs

OpenRouter charges based on:
- Model used (some are free!)
- Number of requests
- Tokens generated

**Free Models**:
- Google Gemini 2.0 Flash - Great for images!
- Many other models with credits

**Paid Models**:
- DALL-E 3 - $0.04-0.12 per image
- GPT-4 Vision - $0.01 per 1K tokens
- Claude 3 Opus - $0.015 per 1K tokens

Check [OpenRouter pricing](https://openrouter.ai/docs#pricing) for details.

---

**Now go create some viral content! 🚀**

