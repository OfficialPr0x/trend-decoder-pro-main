import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnalysisCard } from "@/components/AnalysisCard";
import { Zap, Link, Sparkles, Target, TrendingUp, Users, Trophy, Music, Hash, Flame, MessageSquare, BarChart3, Heart, Clipboard, User, Video } from "lucide-react";
import { analyzeTikTok, performDeepAnalysis } from "@/services/openrouter-api";
import { scanEntity } from "@/services/entity-scanner-api";
import { useToast } from "@/hooks/use-toast";
import { GhostLoader } from "@/components/GhostLoader";

interface AnalyzeTabProps {
  currentUrl: string;
  onExtractUrl: () => void;
}

export const AnalyzeTab = ({ currentUrl, onExtractUrl }: AnalyzeTabProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [deepAnalysisData, setDeepAnalysisData] = useState<any | null>(null);
  const [entityScanData, setEntityScanData] = useState<any | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const [scanType, setScanType] = useState<'video' | 'profile' | 'hashtag' | 'sound'>('video');
  const { toast } = useToast();

  const saveToLibrary = (type: 'analysis' | 'deep-analysis', data: any, title: string) => {
    const activeUrl = currentUrl || manualUrl;
    const libraryItem = {
      type,
      title,
      content: data,
      url: activeUrl,
      timestamp: Date.now(),
    };

    console.log('VIRALIFY: Dispatching save-to-library event:', libraryItem);
    
    window.dispatchEvent(new CustomEvent('save-to-library', {
      detail: libraryItem
    }));
    
    toast({
      title: "💾 Saved to Library! 📚",
      description: title,
      duration: 2000,
    });
  };

  const handlePaste = async () => {
    try {
      // Try multiple methods to read from clipboard
      
      // Method 1: Try Chrome extension API first
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        try {
          chrome.runtime.sendMessage(
            { action: 'readClipboard' },
            (response: any) => {
              if (chrome.runtime.lastError) {
                // Fall through to next method
                attemptNavigatorClipboard();
              } else if (response?.clipboard) {
                setManualUrl(response.clipboard);
                toast({
                  title: "📋 Pasted!",
                  description: "URL has been pasted from clipboard",
                });
              } else {
                attemptNavigatorClipboard();
              }
            }
          );
          return; // Wait for callback
        } catch (err) {
          // Fall through to next method
        }
      }
      
      // Method 2: Try standard clipboard API
      attemptNavigatorClipboard();
      
    } catch (err) {
      showPasteInstructions();
    }
  };

  const attemptNavigatorClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setManualUrl(text);
        toast({
          title: "📋 Pasted!",
          description: "URL has been pasted from clipboard",
        });
      } else {
        showPasteInstructions();
      }
    } catch (err) {
      showPasteInstructions();
    }
  };

  const showPasteInstructions = () => {
    toast({
      title: "💡 Manual Paste Required",
      description: "Click the input field and press Ctrl+V (or Cmd+V on Mac) to paste",
      duration: 4000,
    });
    // Focus the input so user can paste manually
    const input = document.querySelector('input[type="url"]') as HTMLInputElement;
    if (input) input.focus();
  };

  const handleQuickAnalyze = async () => {
    const activeUrl = currentUrl || manualUrl;

    console.log('VIRALIFY DEBUG:', {
      currentUrl,
      manualUrl,
      activeUrl,
      hasUrl: !!activeUrl,
      isTikTokUrl: activeUrl?.includes('tiktok.com')
    });

    if (!activeUrl || !activeUrl.includes('tiktok.com')) {
      toast({
        title: "⚠️ Invalid URL",
        description: "Please extract or paste a TikTok URL first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStatus('Starting quick analysis...');
    setAnalysisData(null);
    setDeepAnalysisData(null);

    try {
      console.log('VIRALIFY: Quick analyzing TikTok URL:', activeUrl);
      
      const result = await analyzeTikTok({
        url: activeUrl,
        onProgress: (progress, status) => {
          console.log('VIRALIFY: Analysis progress:', progress, status);
          setAnalysisProgress(progress);
          setAnalysisStatus(status);
        }
      });
      
      console.log('VIRALIFY: Analysis complete:', result);
      setAnalysisData(result.analysis);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      setAnalysisStatus('Complete!');

      toast({
        title: "✨ Quick Analysis Complete! 🎯",
        description: `Engagement Score: ${result.analysis.engagementScore}/100`,
        duration: 3000,
      });
    } catch (error) {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setAnalysisStatus('Failed');
      console.error('Analysis failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "❌ Analysis Failed",
        description: errorMessage.includes('3001')
          ? 'Backend not running. Start it with: npm start (in backend folder)'
          : errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleDeepAnalyze = async () => {
    const activeUrl = currentUrl || manualUrl;

    if (!activeUrl || !activeUrl.includes('tiktok.com')) {
      toast({
        title: "⚠️ Invalid URL",
        description: "Please extract or paste a TikTok URL first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStatus('Starting DEEP analysis...');
    setAnalysisData(null);
    setDeepAnalysisData(null);

    try {
      console.log('VIRALIFY: Deep analyzing (8 endpoints):', activeUrl);
      
      const result = await performDeepAnalysis({
        url: activeUrl,
        onProgress: (progress, status) => {
          console.log('VIRALIFY: Deep analysis progress:', progress, status);
          setAnalysisProgress(progress);
          setAnalysisStatus(status);
        }
      });
      
      console.log('VIRALIFY: Deep analysis complete:', result);
      setDeepAnalysisData(result);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      setAnalysisStatus('Deep Analysis Complete!');

      toast({
        title: "🔥 BEAST MODE COMPLETE! 🎯",
        description: `8 endpoints analyzed! Virality: ${result.insights?.virality?.viralPotential || 'High'}`,
        duration: 3000,
      });
    } catch (error) {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setAnalysisStatus('Failed');
      console.error('Deep analysis failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "❌ Deep Analysis Failed",
        description: errorMessage.includes('3001')
          ? 'Backend not running. Start it with: npm start (in backend folder)'
          : errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleEntityScan = async () => {
    const input = manualUrl || currentUrl;
    if (!input) {
      toast({
        title: "⚠️ Input Required",
        description: "Please enter a TikTok URL, username, hashtag, or sound",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStatus('Starting entity scan...');
    setEntityScanData(null);
    setAnalysisData(null);
    setDeepAnalysisData(null);

    try {
      const result = await scanEntity({
        input,
        type: scanType === 'video' ? undefined : scanType,
        onProgress: (progress, status) => {
          setAnalysisProgress(progress);
          setAnalysisStatus(status);
        }
      });

      setEntityScanData(result);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      setAnalysisStatus('Scan Complete!');

      toast({
        title: `✨ ${result.entityType.charAt(0).toUpperCase() + result.entityType.slice(1)} Scan Complete!`,
        description: `Successfully analyzed ${result.entityType}`,
        duration: 3000,
      });
    } catch (error) {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setAnalysisStatus('Failed');
      console.error('Entity scan failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "❌ Scan Failed",
        description: errorMessage.includes('3001')
          ? 'Backend not running. Start it with: npm start (in backend folder)'
          : errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Scan Type Selector */}
      <div className="space-y-2">
        <div className="text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase"
                style={{ border: "2px solid black" }}>
            SCAN TYPE
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button
            onClick={() => setScanType('video')}
            className={`h-16 flex flex-col items-center justify-center ${scanType === 'video' ? 'bg-gradient-to-r from-[#FF006B] to-[#FFAA00]' : 'bg-white/10'} text-white font-bold text-xs rounded-xl`}
            style={{ border: "2px solid black" }}
          >
            <Video className="w-5 h-5 mb-1" />
            Video
          </Button>
          <Button
            onClick={() => setScanType('profile')}
            className={`h-16 flex flex-col items-center justify-center ${scanType === 'profile' ? 'bg-gradient-to-r from-[#7B2FFF] to-[#B24AFF]' : 'bg-white/10'} text-white font-bold text-xs rounded-xl`}
            style={{ border: "2px solid black" }}
          >
            <User className="w-5 h-5 mb-1" />
            Profile
          </Button>
          <Button
            onClick={() => setScanType('hashtag')}
            className={`h-16 flex flex-col items-center justify-center ${scanType === 'hashtag' ? 'bg-gradient-to-r from-[#00D4FF] to-[#0088FF]' : 'bg-white/10'} text-white font-bold text-xs rounded-xl`}
            style={{ border: "2px solid black" }}
          >
            <Hash className="w-5 h-5 mb-1" />
            Hashtag
          </Button>
          <Button
            onClick={() => setScanType('sound')}
            className={`h-16 flex flex-col items-center justify-center ${scanType === 'sound' ? 'bg-gradient-to-r from-[#FF00FF] to-[#AA00FF]' : 'bg-white/10'} text-white font-bold text-xs rounded-xl`}
            style={{ border: "2px solid black" }}
          >
            <Music className="w-5 h-5 mb-1" />
            Sound
          </Button>
        </div>
      </div>

      {/* Extract URL Button */}
      {scanType === 'video' && (
        <Button
          onClick={onExtractUrl}
          className="w-full h-12 text-lg font-black uppercase tracking-wide bg-gradient-to-r from-[#7B2FFF] to-[#B24AFF] hover:opacity-95 transition-all duration-300 text-white rounded-2xl"
          style={{
            fontFamily: "'Rubik', sans-serif",
            WebkitTextStroke: "1px black",
            paintOrder: "stroke fill",
            border: "3px solid black",
            boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Link className="w-5 h-5 mr-2" strokeWidth={3} />
          Extract URL
        </Button>
      )}

      {/* Paste URL Input */}
      <div className="space-y-2">
        <div className="text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase"
                style={{ border: "2px solid black" }}>
            {scanType === 'video' ? 'OR PASTE URL' : scanType === 'profile' ? 'ENTER USERNAME' : scanType === 'hashtag' ? 'ENTER HASHTAG' : 'ENTER SOUND URL'}
          </span>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder={
              scanType === 'video' ? 'Right-click & paste or press Ctrl+V...' :
              scanType === 'profile' ? '@username or profile URL' :
              scanType === 'hashtag' ? '#hashtag or hashtag name' :
              'Sound URL or ID'
            }
            className="h-12 text-sm bg-white/90 text-black placeholder:text-gray-500 font-medium rounded-xl px-4 pr-12"
            style={{
              border: "3px solid black",
              boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
            }}
            disabled={isAnalyzing}
            onPaste={(e) => {
              // Let the default paste behavior work
              setTimeout(() => {
                const value = (e.target as HTMLInputElement).value;
                if (value && value.includes('tiktok.com')) {
                  toast({
                    title: "✅ URL Pasted!",
                    description: "Ready to analyze",
                    duration: 2000,
                  });
                }
              }, 100);
            }}
          />
          <Button
            type="button"
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gradient-to-r from-[#7B2FFF] to-[#B24AFF] hover:opacity-90 rounded-lg"
            style={{
              border: "2px solid black",
              boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.3)",
            }}
            disabled={isAnalyzing}
            title="Try to paste from clipboard (may not work due to browser restrictions)"
          >
            <Clipboard className="w-4 h-4 text-white" strokeWidth={2} />
          </Button>
        </div>
        <p className="text-xs text-white/60 text-center">
          💡 Right-click in the field and select "Paste" or use Ctrl+V (Cmd+V on Mac)
        </p>
      </div>

      {/* Current URL Display */}
      {(currentUrl || manualUrl) && (
        <div className="bg-white/90 rounded-xl p-3"
             style={{
               border: "3px solid black",
               boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
             }}>
          <p className="text-xs font-bold text-black mb-1">
            {currentUrl ? 'Extracted Video:' : 'Pasted Video:'}
          </p>
          <p className="text-xs text-gray-700 truncate">{currentUrl || manualUrl}</p>
        </div>
      )}

      {/* Entity Scan Button for non-video types */}
      {scanType !== 'video' && (currentUrl || manualUrl) && !isAnalyzing && (
        <Button
          onClick={handleEntityScan}
          className="w-full h-14 text-sm font-black uppercase bg-gradient-to-r from-[#7B2FFF] to-[#B24AFF] hover:opacity-95 text-white rounded-xl"
          style={{
            fontFamily: "'Rubik', sans-serif",
            WebkitTextStroke: "1px black",
            paintOrder: "stroke fill",
            border: "3px solid black",
            boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          {scanType === 'profile' && <User className="w-4 h-4 mr-2" />}
          {scanType === 'hashtag' && <Hash className="w-4 h-4 mr-2" />}
          {scanType === 'sound' && <Music className="w-4 h-4 mr-2" />}
          Scan {scanType.charAt(0).toUpperCase() + scanType.slice(1)}
        </Button>
      )}

      {/* Analysis Buttons */}
      {scanType === 'video' && (currentUrl || manualUrl) && (currentUrl || manualUrl).includes('tiktok.com') && !isAnalyzing && (
        <div className="grid grid-cols-2 gap-2">
          {/* Quick Analysis */}
          <Button
            onClick={handleQuickAnalyze}
            disabled={isAnalyzing}
            className="h-14 text-sm font-black uppercase bg-gradient-to-r from-[#FF006B] to-[#FFAA00] hover:opacity-95 text-white rounded-xl"
            style={{
              fontFamily: "'Rubik', sans-serif",
              WebkitTextStroke: "1px black",
              paintOrder: "stroke fill",
              border: "3px solid black",
              boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Zap className="w-4 h-4 mr-1" />
            <div className="flex flex-col items-start">
              <span className="text-xs">Quick</span>
              <span className="text-[10px] opacity-80">1 credit</span>
            </div>
          </Button>

          {/* Deep Analysis - BEAST MODE */}
          <Button
            onClick={handleDeepAnalyze}
            disabled={isAnalyzing}
            className="h-14 text-sm font-black uppercase bg-gradient-to-r from-[#FF0000] to-[#FF6B00] hover:opacity-95 text-white rounded-xl animate-pulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              WebkitTextStroke: "1.5px black",
              paintOrder: "stroke fill",
              border: "3px solid black",
              boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Flame className="w-4 h-4 mr-1" />
            <div className="flex flex-col items-start">
              <span className="text-xs">BEAST</span>
              <span className="text-[10px] opacity-80">17+ endpoints</span>
            </div>
          </Button>
        </div>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card 
          className="p-6 bg-gradient-to-br from-pink-900/90 to-purple-900/90 backdrop-blur-sm"
          style={{ border: "3px solid black" }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <GhostLoader progress={Math.round(analysisProgress)} />
            <div className="text-center space-y-2">
              <div className="text-white font-black text-2xl">
                {Math.round(analysisProgress)}%
              </div>
              <div className="text-white/80 font-medium text-sm">
                {analysisStatus}
              </div>
              <div className="w-64 h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Deep Analysis Results */}
      {!isAnalyzing && deepAnalysisData && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center py-2">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full"
                  style={{ border: "2px solid black" }}>
              🔥 BEAST MODE ANALYSIS - 17+ ENDPOINTS
            </span>
          </div>

          {/* Premium Summary Card */}
          <Card className="p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm"
                style={{ border: "3px solid black", boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.4)" }}>
            <div className="text-white font-black text-sm mb-3 flex items-center justify-between">
              <span>📊 ANALYSIS SUMMARY</span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[10px] font-black px-2 py-1 rounded-full"
                    style={{ border: "2px solid black" }}>
                {(() => {
                  let count = 0;
                  if (deepAnalysisData.insights?.virality) count++;
                  if (deepAnalysisData.insights?.audience) count++;
                  if (deepAnalysisData.insights?.competition) count++;
                  if (deepAnalysisData.insights?.creatorStrategy) count++;
                  if (deepAnalysisData.insights?.likedPosts) count++;
                  if (deepAnalysisData.insights?.followerNetwork) count++;
                  if (deepAnalysisData.insights?.musicSaturation) count++;
                  if (deepAnalysisData.insights?.contentEvolution) count++;
                  if (deepAnalysisData.insights?.trendAlignment) count++;
                  if (deepAnalysisData.insights?.recommendations?.length > 0) count++;
                  return `${Math.min(count * 2, 17)}+ ENDPOINTS`;
                })()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.virality ? "text-green-400" : "text-red-400"}>●</span>
                <span className="text-white/80">Virality</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.audience ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Audience</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.competition ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Competition</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.creatorStrategy ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Creator Strategy</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.likedPosts ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Content Prefs</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.followerNetwork ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Network</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.musicSaturation ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Music Intel</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.contentEvolution ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Evolution</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.trendAlignment ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Trends</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={deepAnalysisData.insights?.recommendations?.length > 0 ? "text-green-400" : "text-yellow-400"}>●</span>
                <span className="text-white/80">Actions</span>
              </div>
            </div>
          </Card>

          {/* Save to Library Button */}
          <div className="text-center">
            <Button
              onClick={() => {
                const title = `Deep Analysis - ${deepAnalysisData.data?.videoDetails?.itemInfo?.itemStruct?.author?.uniqueId || 'TikTok Video'}`;
                saveToLibrary('deep-analysis', deepAnalysisData, title);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-sm px-6 py-3"
              style={{ border: "3px solid black", boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)" }}
            >
              💾 Save to Library
            </Button>
          </div>

          {/* Virality Score */}
          {deepAnalysisData.insights?.virality && (
            <Card className="p-4 bg-gradient-to-br from-red-500/30 to-orange-500/30 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="text-white font-black uppercase text-sm mb-2">🚀 VIRALITY ANALYSIS</div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-red-300">Hook:</span> <span className="text-white font-bold">{deepAnalysisData.insights.virality.hookStrength}</span></div>
                <div><span className="text-red-300">Share:</span> <span className="text-white font-bold">{deepAnalysisData.insights.virality.shareability}</span></div>
                <div><span className="text-red-300">Engage:</span> <span className="text-white font-bold">{deepAnalysisData.insights.virality.engagement}</span></div>
                <div><span className="text-red-300">Potential:</span> <span className="text-white font-bold">{deepAnalysisData.insights.virality.viralPotential}</span></div>
                <div><span className="text-red-300">Rewatch:</span> <span className="text-white font-bold">{deepAnalysisData.insights.virality.rewatchValue}</span></div>
              </div>
              {deepAnalysisData.insights.virality.metrics && (
                <div className="text-xs space-y-1 border-t border-white/20 pt-2">
                  <div className="text-white/60 text-center font-bold mb-1">DETAILED METRICS</div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div><span className="text-red-300">Like Rate:</span> <span className="text-white">{deepAnalysisData.insights.virality.metrics.likeRate}</span></div>
                    <div><span className="text-red-300">Comment Rate:</span> <span className="text-white">{deepAnalysisData.insights.virality.metrics.commentRate}</span></div>
                    <div><span className="text-red-300">Share Rate:</span> <span className="text-white">{deepAnalysisData.insights.virality.metrics.shareRate}</span></div>
                    <div><span className="text-red-300">Total Engage:</span> <span className="text-white">{deepAnalysisData.insights.virality.metrics.totalEngagementRate}</span></div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Audience Insights */}
          {deepAnalysisData.insights?.audience ? (
            <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-cyan-300" />
                <span className="text-white font-black uppercase text-sm">Audience</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Comments Analyzed:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.audience.totalComments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Engagement Quality:</span>
                  <span className="text-cyan-300 font-bold">{deepAnalysisData.insights.audience.engagementQuality}</span>
                </div>
                {deepAnalysisData.insights.audience.commonThemes?.slice(0, 3).map((theme: string, i: number) => (
                  <div key={i} className="text-white/80 italic">💬 "{theme.substring(0, 40)}..."</div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm"
                  style={{ border: "3px solid #555" }}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-white/80 font-black uppercase text-sm">Audience Analysis</span>
              </div>
              <div className="text-xs">
                <div className="text-yellow-300 font-bold mb-2 text-center">⚠️ No Audience Data</div>
                <div className="text-white/60 mb-3 text-[11px] leading-relaxed">
                  This happens when:
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Comments are disabled on this video</li>
                    <li>Video has no comments yet (new upload)</li>
                    <li>Creator has restricted comment visibility</li>
                  </ul>
                </div>
                <div className="bg-cyan-500/10 p-2 rounded border border-cyan-500/30">
                  <div className="text-cyan-300 text-[10px] font-bold">
                    ✅ BEAST MODE ACTIVE - Audience analysis available on videos with public comments!
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Competition Analysis */}
          {deepAnalysisData.insights?.competition ? (
            <Card className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-orange-300" />
                <span className="text-white font-black uppercase text-sm">Competition</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Competitors Analyzed:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.competition.competitorCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Avg Competitor Views:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.competition.avgCompetitorViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Avg Engagement Rate:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.competition.avgCompetitorEngagementRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Competition Level:</span>
                  <span className={`font-bold ${
                    deepAnalysisData.insights.competition.competitionLevel === 'Very High' ? 'text-red-400' :
                    deepAnalysisData.insights.competition.competitionLevel === 'High' ? 'text-red-300' :
                    deepAnalysisData.insights.competition.competitionLevel === 'Medium' ? 'text-yellow-300' : 'text-green-300'
                  }`}>{deepAnalysisData.insights.competition.competitionLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Market Position:</span>
                  <span className="text-orange-300 font-bold">{deepAnalysisData.insights.competition.marketPosition}</span>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm"
                  style={{ border: "3px solid #555" }}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-gray-400" />
                <span className="text-white/80 font-black uppercase text-sm">Competition Analysis</span>
              </div>
              <div className="text-xs">
                <div className="text-yellow-300 font-bold mb-2 text-center">⚠️ No Competition Data</div>
                <div className="text-white/60 mb-3 text-[11px] leading-relaxed">
                  Possible reasons:
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Video is very new (no related content yet)</li>
                    <li>Unique/niche content with few comparables</li>
                    <li>Private or restricted visibility</li>
                  </ul>
                </div>
                <div className="bg-orange-500/10 p-2 rounded border border-orange-500/30">
                  <div className="text-orange-300 text-[10px] font-bold">
                    💡 TIP: Competition data shows on established videos with similar content!
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Creator Strategy */}
          {deepAnalysisData.insights?.creatorStrategy && (
            <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-purple-300" />
                <span className="text-white font-black uppercase text-sm">Creator Strategy</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Total Posts:</span>
                  <span className="text-purple-300 font-bold">{deepAnalysisData.insights.creatorStrategy.totalPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Avg Views:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.creatorStrategy.avgViews?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">View Performance:</span>
                  <span className="text-purple-300 font-bold">{deepAnalysisData.insights.creatorStrategy.viewPerformance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Like Performance:</span>
                  <span className="text-purple-300 font-bold">{deepAnalysisData.insights.creatorStrategy.likePerformance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Consistency:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.creatorStrategy.contentConsistency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Strategy:</span>
                  <span className="text-purple-300 font-bold">{deepAnalysisData.insights.creatorStrategy.strategy}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Liked Posts Analysis */}
          {deepAnalysisData.insights?.likedPosts ? (
            <Card className="p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-pink-300" />
                <span className="text-white font-black uppercase text-sm">Content Preferences</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Liked Posts Analyzed:</span>
                  <span className="text-pink-300 font-bold">{deepAnalysisData.insights.likedPosts.totalLiked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Preferred Content:</span>
                  <span className="text-pink-300 font-bold capitalize">{deepAnalysisData.insights.likedPosts.preferredContentType}</span>
                </div>
                <div className="text-white/80 text-xs mt-2">
                  {deepAnalysisData.insights.likedPosts.insights}
                </div>
                {deepAnalysisData.insights.likedPosts.contentPreferences && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <div className="text-white/60 text-center font-bold mb-1 text-xs">CONTENT BREAKDOWN</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(deepAnalysisData.insights.likedPosts.contentPreferences).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="text-white/70 capitalize">{type}:</span>
                          <span className="text-white font-bold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : deepAnalysisData.insights && !deepAnalysisData.insights.likedPosts && (
            <Card className="p-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm"
                  style={{ border: "3px solid #555" }}>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-gray-400" />
                <span className="text-white/80 font-black uppercase text-sm">Content Preferences</span>
              </div>
              <div className="text-xs">
                <div className="text-yellow-300 font-bold mb-2 text-center">⚠️ No Preference Data</div>
                <div className="text-white/60 mb-3 text-[11px] leading-relaxed">
                  This occurs when:
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Creator has private liked posts (most common)</li>
                    <li>New account with no liked content</li>
                    <li>Limited public activity</li>
                  </ul>
                </div>
                <div className="bg-pink-500/10 p-2 rounded border border-pink-500/30">
                  <div className="text-pink-300 text-[10px] font-bold">
                    💡 INSIGHT: Check Creator Strategy section for content approach instead!
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Follower Network Analysis - NEW */}
          {deepAnalysisData.insights?.followerNetwork && deepAnalysisData.insights.followerNetwork.followersSampled > 0 && (
            <Card className="p-4 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-indigo-300" />
                <span className="text-white font-black uppercase text-sm">Follower Network</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid black" }}>PREMIUM</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Followers Analyzed:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.followerNetwork.followersSampled}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Following Analyzed:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.followerNetwork.followingsSampled}</span>
                </div>
                {deepAnalysisData.insights.followerNetwork.avgFollowerSize > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Avg Follower Size:</span>
                    <span className="text-indigo-300 font-bold">{deepAnalysisData.insights.followerNetwork.avgFollowerSize.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">Network Strength:</span>
                  <span className="text-indigo-300 font-bold">{deepAnalysisData.insights.followerNetwork.networkStrength.split(' - ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Audience Type:</span>
                  <span className="text-white font-bold text-[10px]">{deepAnalysisData.insights.followerNetwork.audienceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Collab Potential:</span>
                  <span className="text-indigo-300 font-bold text-[10px]">{deepAnalysisData.insights.followerNetwork.collaborationPotential.split(' - ')[0]}</span>
                </div>
                <div className="text-white/80 text-[10px] mt-2 pt-2 border-t border-white/20 italic">
                  {deepAnalysisData.insights.followerNetwork.insights}
                </div>
              </div>
            </Card>
          )}

          {/* Music Saturation Analysis - NEW */}
          {deepAnalysisData.insights?.musicSaturation && (
            <Card className="p-4 bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Music className="w-5 h-5 text-violet-300" />
                <span className="text-white font-black uppercase text-sm">Music Intelligence</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid black" }}>PREMIUM</span>
              </div>
              <div className="space-y-1 text-xs">
                {deepAnalysisData.insights.musicSaturation.soundName && deepAnalysisData.insights.musicSaturation.soundName !== 'Unknown Sound' && (
                  <div className="mb-2 p-2 bg-violet-500/20 rounded">
                    <div className="text-violet-200 font-bold text-[10px]">"{deepAnalysisData.insights.musicSaturation.soundName}"</div>
                    {deepAnalysisData.insights.musicSaturation.artist && deepAnalysisData.insights.musicSaturation.artist !== 'Unknown Artist' && (
                      <div className="text-white/60 text-[9px]">by {deepAnalysisData.insights.musicSaturation.artist}</div>
                    )}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">Sound Usage:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.musicSaturation.soundUsage.toLocaleString()} videos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Saturation Level:</span>
                  <span className={`font-bold ${
                    deepAnalysisData.insights.musicSaturation.saturationLevel === 'Oversaturated' || deepAnalysisData.insights.musicSaturation.saturationLevel === 'Highly Saturated' ? 'text-red-400' :
                    deepAnalysisData.insights.musicSaturation.saturationLevel === 'Moderately Saturated' ? 'text-yellow-300' :
                    deepAnalysisData.insights.musicSaturation.saturationLevel === 'Rising' ? 'text-green-400' : 'text-cyan-300'
                  }`}>{deepAnalysisData.insights.musicSaturation.saturationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Opportunity:</span>
                  <span className={`font-bold text-[10px] ${
                    deepAnalysisData.insights.musicSaturation.isSweet ? 'text-green-400' :
                    deepAnalysisData.insights.musicSaturation.opportunity.includes('High') || deepAnalysisData.insights.musicSaturation.opportunity.includes('Very High') ? 'text-green-300' :
                    deepAnalysisData.insights.musicSaturation.opportunity.includes('Medium') ? 'text-yellow-300' : 'text-red-300'
                  }`}>{deepAnalysisData.insights.musicSaturation.opportunity.split(' - ')[0]}</span>
                </div>
                {deepAnalysisData.insights.musicSaturation.isTrending && (
                  <div className="text-center py-1 bg-green-500/20 rounded">
                    <span className="text-green-300 font-black text-[10px]">🔥 TRENDING SOUND!</span>
                  </div>
                )}
                {deepAnalysisData.insights.musicSaturation.isSweet && (
                  <div className="text-center py-1 bg-green-500/20 rounded">
                    <span className="text-green-300 font-black text-[10px]">🎯 SWEET SPOT!</span>
                  </div>
                )}
                <div className="text-white/80 text-[10px] mt-2 pt-2 border-t border-white/20">
                  💡 {deepAnalysisData.insights.musicSaturation.recommendation}
                </div>
              </div>
            </Card>
          )}

          {/* Content Evolution Analysis - NEW */}
          {deepAnalysisData.insights?.contentEvolution && deepAnalysisData.insights.contentEvolution.oldestPostsAnalyzed > 0 && (
            <Card className="p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-teal-300" />
                <span className="text-white font-black uppercase text-sm">Content Evolution</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid black" }}>PREMIUM</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Posts Compared:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.contentEvolution.oldestPostsAnalyzed + deepAnalysisData.insights.contentEvolution.topPostsAnalyzed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Growth Multiplier:</span>
                  <span className="text-teal-300 font-bold text-lg">{deepAnalysisData.insights.contentEvolution.growthMultiplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Trajectory:</span>
                  <span className="text-white font-bold text-[10px]">{deepAnalysisData.insights.contentEvolution.growthTrajectory.substring(0, 30)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Old Avg Views:</span>
                  <span className="text-white/60 font-bold">{deepAnalysisData.insights.contentEvolution.avgOldestViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Top Avg Views:</span>
                  <span className="text-teal-300 font-bold">{deepAnalysisData.insights.contentEvolution.avgTopViews.toLocaleString()}</span>
                </div>
                {deepAnalysisData.insights.contentEvolution.successPattern && (
                  <div className="text-white/80 text-[10px] mt-2 p-2 bg-teal-500/10 rounded">
                    📊 {deepAnalysisData.insights.contentEvolution.successPattern}
                  </div>
                )}
                <div className="text-white/80 text-[10px] mt-2 pt-2 border-t border-white/20">
                  💡 {deepAnalysisData.insights.contentEvolution.recommendation}
                </div>
              </div>
            </Card>
          )}

          {/* Trend Alignment */}
          {deepAnalysisData.insights?.trendAlignment && (
            <Card className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-white font-black uppercase text-sm">Trend Alignment</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Music Trending:</span>
                  <span className="text-white font-bold">{deepAnalysisData.insights.trendAlignment.musicTrending ? '✅ YES' : '❌ NO'}</span>
                </div>
                {deepAnalysisData.insights.trendAlignment.musicPopularity > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Music Videos:</span>
                    <span className="text-white font-bold">{deepAnalysisData.insights.trendAlignment.musicPopularity.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">Overall Trend Score:</span>
                  <span className="text-green-300 font-bold text-lg">{deepAnalysisData.insights.trendAlignment.overallTrendScore}/100</span>
                </div>
              </div>
            </Card>
          )}

          {/* Enhanced Recommendations */}
          {deepAnalysisData.insights?.recommendations && deepAnalysisData.insights.recommendations.length > 0 && (
            <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-black uppercase text-sm">Action Plan</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded ml-auto"
                      style={{ border: "1px solid black" }}>
                  {deepAnalysisData.insights.recommendations.filter((r: any) => r.priority === 'High').length} HIGH PRIORITY
                </span>
              </div>
              <div className="space-y-2">
                {deepAnalysisData.insights.recommendations.map((rec: any, i: number) => {
                  const isObject = typeof rec === 'object' && rec.action;
                  const priority = isObject ? rec.priority : 'Medium';
                  const action = isObject ? rec.action : rec;
                  const category = isObject ? rec.category : 'General';
                  const impact = isObject ? rec.expectedImpact : null;
                  
                  const priorityColor = 
                    priority === 'High' ? 'bg-red-500/20 border-red-500/40' :
                    priority === 'Medium' ? 'bg-yellow-500/20 border-yellow-500/40' :
                    'bg-blue-500/20 border-blue-500/40';
                  
                  const priorityBadgeColor =
                    priority === 'High' ? 'bg-red-500 text-white' :
                    priority === 'Medium' ? 'bg-yellow-500 text-black' :
                    'bg-blue-500 text-white';

                  return (
                    <div key={i} className={`p-2 rounded border ${priorityColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${priorityBadgeColor}`}
                              style={{ border: "1px solid black" }}>
                          {priority.toUpperCase()}
                        </span>
                        <span className="text-white/60 text-[9px] font-bold">{category}</span>
                      </div>
                      <div className="text-white font-medium text-[11px] leading-tight">
                        {action}
                      </div>
                      {impact && (
                        <div className="text-green-300 text-[10px] mt-1 font-bold">
                          📈 Expected: {impact}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Standard Analysis Results (for quick mode) */}
      {!isAnalyzing && analysisData && !deepAnalysisData && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Engagement Score */}
          <Card 
            className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm"
            style={{ border: "3px solid black" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-300" />
                <span className="text-white font-black uppercase text-sm">Engagement Score</span>
              </div>
              <div className="text-3xl font-black text-white">
                {analysisData.engagementScore}/100
              </div>
            </div>
            <div className="mt-2 h-2 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${analysisData.engagementScore}%` }}
              />
            </div>
          </Card>

          <div className="text-center space-y-2">
            <Button
              onClick={() => {
                const title = `Quick Analysis - ${analysisData.contentType || 'TikTok Video'}`;
                saveToLibrary('analysis', analysisData, title);
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-black text-sm px-6 py-2"
              style={{ border: "3px solid black", boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)" }}
            >
              💾 Save to Library
            </Button>
            <Button
              onClick={handleDeepAnalyze}
              size="sm"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-black text-xs"
              style={{ border: "2px solid black" }}
            >
              <Flame className="w-3 h-3 mr-1" />
              Unlock BEAST MODE (8 endpoints)
            </Button>
          </div>

          {/* Content Type */}
          <AnalysisCard
            icon={<Sparkles className="w-5 h-5 text-cyan-300" strokeWidth={3} />}
            title="CONTENT TYPE"
            description={analysisData.contentType || "Analyzing content..."}
            gradient="hook"
          />

          {/* Viral Hooks */}
          <Card
            className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm"
            style={{ border: "3px solid black" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-pink-300" />
              <span className="text-white font-black uppercase text-sm">Viral Hooks</span>
            </div>
            <ul className="space-y-1">
              {Array.isArray(analysisData.viralHooks) ? analysisData.viralHooks.map((hook: any, i: number) => (
                <li key={i} className="text-white/90 font-medium text-sm flex items-start gap-2">
                  <span className="text-pink-300 font-black">•</span>
                  {typeof hook === 'string' ? hook : 'Analysis technique detected'}
                </li>
              )) : (
                <li className="text-white/70 font-medium text-sm italic">Analyzing viral hooks...</li>
              )}
            </ul>
          </Card>

          {/* Trending Elements */}
          <Card
            className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm"
            style={{ border: "3px solid black" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-black uppercase text-sm">Trending Elements</span>
            </div>
            <ul className="space-y-1">
              {Array.isArray(analysisData.trendingElements) ? analysisData.trendingElements.map((element: any, i: number) => (
                <li key={i} className="text-white/90 font-medium text-sm flex items-start gap-2">
                  <span className="text-yellow-300 font-black">•</span>
                  {typeof element === 'string' ? element : 'Trending element detected'}
                </li>
              )) : (
                <li className="text-white/70 font-medium text-sm italic">Analyzing trends...</li>
              )}
            </ul>
          </Card>
        </div>
      )}

      {/* Entity Scan Results */}
      {!isAnalyzing && entityScanData && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center py-2">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full"
                  style={{ border: "2px solid black" }}>
              {entityScanData.entityType.toUpperCase()} ANALYSIS
            </span>
          </div>

          {/* Overview Card */}
          {entityScanData.insights?.overview && (
            <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="text-white font-black uppercase text-sm mb-3">Overview</div>
              <div className="space-y-2 text-xs">
                {Object.entries(entityScanData.insights.overview).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="text-white font-bold">{value?.toString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Performance/Engagement Card */}
          {(entityScanData.insights?.engagement || entityScanData.insights?.performance) && (
            <Card className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="text-white font-black uppercase text-sm mb-3">
                {entityScanData.entityType === 'profile' ? 'Engagement' : 'Performance'}
              </div>
              <div className="space-y-2 text-xs">
                {Object.entries(entityScanData.insights.engagement || entityScanData.insights.performance || {}).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="text-white font-bold">{value?.toString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recommendations */}
          {entityScanData.insights?.recommendations && entityScanData.insights.recommendations.length > 0 && (
            <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm"
                  style={{ border: "3px solid black" }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-black uppercase text-sm">Recommendations</span>
              </div>
              <ul className="space-y-2">
                {entityScanData.insights.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="text-white/90 font-medium text-xs flex items-start gap-1">
                    <span className="text-cyan-300 font-black">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Save Button */}
          <div className="text-center">
            <Button
              onClick={() => {
                const title = `${entityScanData.entityType.charAt(0).toUpperCase() + entityScanData.entityType.slice(1)} Scan - ${manualUrl || currentUrl}`;
                saveToLibrary('analysis', entityScanData, title);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-sm px-6 py-3"
              style={{ border: "3px solid black", boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)" }}
            >
              💾 Save to Library
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentUrl && !manualUrl && !analysisData && !deepAnalysisData && !entityScanData && !isAnalyzing && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm mb-3"
               style={{ border: "3px solid black" }}>
            <Zap className="w-7 h-7 text-yellow-400" />
          </div>
          <p className="text-white font-bold text-sm mb-2"
             style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}>
            Select scan type & enter URL or username
          </p>
          <p className="text-white/60 text-xs">
            Analyze videos, profiles, hashtags, or sounds!
          </p>
        </div>
      )}
    </div>
  );
};

