// Quick test to verify backend is working
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing VIRALIFY Backend...\n');
  
  // 1. Test health endpoint
  try {
    const healthRes = await fetch(`${API_URL}/api/health`);
    const health = await healthRes.json();
    console.log('✅ Health Check:', health);
  } catch (error) {
    console.log('❌ Backend not running! Start it with:');
    console.log('   cd backend && npm start\n');
    return;
  }
  
  // 2. Test analysis with a real TikTok URL
  const testUrl = 'https://www.tiktok.com/@xkarentorres/video/7562363742453861652';
  console.log(`\n🎥 Testing analysis with: ${testUrl}\n`);
  
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: testUrl })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.log('❌ Analysis failed:', error);
      console.log('\nMake sure you have:');
      console.log('1. OpenRouter API key in backend/.env');
      console.log('2. yt-dlp installed (pip install yt-dlp)');
      console.log('3. FFmpeg installed');
      return;
    }
    
    const result = await response.json();
    console.log('✅ Analysis successful!');
    console.log('📊 Virality Score:', result.data.viralityScore);
    console.log('👤 Creator:', result.data.metadata.creator);
    console.log('👁️ Views:', result.data.metadata.views);
    console.log('❤️ Likes:', result.data.metadata.likes);
    console.log('\n🎯 Frame Analysis:');
    result.data.frameAnalysis.forEach(f => {
      console.log(`- ${f.frame}: ${f.analysis.substring(0, 60)}...`);
    });
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testBackend();
