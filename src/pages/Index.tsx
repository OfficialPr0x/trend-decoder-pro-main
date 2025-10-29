import { useState, useEffect } from "react";
import { ViralifyLogo } from "@/components/ViralifyLogo";
import { UrlInput } from "@/components/UrlInput";
import { AnalysisCard } from "@/components/AnalysisCard";
import { RealSpecSheet } from "@/components/RealSpecSheet";
import { Zap, Volume2, Download, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { analyzeTikTokVideo, checkAPIHealth, type AnalysisResult } from "@/services/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [apiHealthy, setApiHealthy] = useState(true);
  const { toast } = useToast();

  // Check if running as Chrome extension and get current TikTok URL
  useEffect(() => {
    const isExtension = typeof window !== 'undefined' && 
      (window as any).chrome?.runtime?.id;
    
    if (isExtension) {
      // Get current tab URL
      (window as any).chrome.runtime.sendMessage(
        { action: 'getCurrentTab' },
        (response: any) => {
          if (response?.url && response.url.includes('tiktok.com')) {
            setCurrentUrl(response.url);
          }
        }
      );
      
      // Listen for URL updates from background script
      (window as any).chrome.runtime.onMessage.addListener(
        (request: any) => {
          if (request.action === 'updateUrl' && request.url) {
            setCurrentUrl(request.url);
          }
        }
      );
    }
  }, []);

  // Check API health on mount
  useEffect(() => {
    checkAPIHealth().then(setApiHealthy);
  }, []);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setShowResults(false);
    setAnalysisData(null);

    toast({
      title: "Analysis Started! 🚀",
      description: "Downloading video and extracting frames...",
    });

    try {
      const result = await analyzeTikTokVideo(url);
      setAnalysisData(result);
      setIsAnalyzing(false);
      setShowResults(true);
      
      toast({
        title: "Analysis Complete! ✨",
        description: `Virality Score: ${result.viralityScore}/100`,
      });
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ 
           background: "linear-gradient(135deg, #5B2C8A 0%, #3D1F6B 50%, #2B1550 100%)",
           height: "600px"
         }}>
      {/* Vibrant splatter background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large pink splatter */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-500 rounded-full opacity-90" 
             style={{ 
               clipPath: 'polygon(30% 0%, 70% 10%, 100% 35%, 90% 70%, 60% 100%, 20% 90%, 0% 60%, 10% 30%)',
               filter: 'blur(2px)'
             }} />
        {/* Cyan splatter */}
        <div className="absolute top-1/3 -right-16 w-48 h-48 bg-cyan-400 rounded-full opacity-90" 
             style={{ 
               clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
               filter: 'blur(1px)'
             }} />
        {/* Yellow splatter */}
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 bg-yellow-400 rounded-full opacity-90" 
             style={{ 
               clipPath: 'polygon(40% 0%, 100% 20%, 90% 60%, 100% 100%, 40% 90%, 0% 80%, 10% 30%)',
               filter: 'blur(1px)'
             }} />
        {/* Orange splatter */}
        <div className="absolute bottom-1/4 -right-10 w-44 h-44 bg-orange-500 rounded-full opacity-90" 
             style={{ 
               clipPath: 'polygon(50% 0%, 90% 30%, 80% 80%, 40% 100%, 10% 70%, 20% 20%)',
               filter: 'blur(1px)'
             }} />
        {/* Purple accent splatter */}
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-purple-500 rounded-full opacity-80" 
             style={{ 
               clipPath: 'polygon(60% 0%, 100% 40%, 80% 100%, 20% 80%, 0% 40%, 40% 0%)',
               transform: 'translate(-50%, -50%)',
               filter: 'blur(2px)'
             }} />
        {/* Small decorative splatters */}
        <div className="absolute top-20 left-1/3 w-16 h-16 bg-pink-400 rounded-full opacity-80" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-cyan-300 rounded-full opacity-80" 
             style={{ clipPath: 'polygon(40% 0%, 100% 40%, 60% 100%, 0% 60%)' }} />
        <div className="absolute top-2/3 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-70" 
             style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>

      <div className="relative z-10 h-full overflow-y-auto px-4 py-4">
        {/* Compact Hero Section for Sidebar */}
        <div className="text-center mb-4">
          <ViralifyLogo className="mx-auto mb-2 scale-75" />
          <p className="text-sm text-white font-black uppercase tracking-wide"
             style={{
               textShadow: "2px 2px 0px rgba(0,0,0,0.5)"
             }}>
            Decode viral TikToks
          </p>
        </div>

        {/* URL Input or Auto-Analyze */}
        <div className="mb-6 px-2">
          {currentUrl ? (
            <div className="space-y-3">
              <div className="bg-white/90 rounded-2xl p-4"
                   style={{
                     border: "4px solid black",
                     boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
                   }}>
                <p className="text-sm font-bold text-black mb-2">Current TikTok:</p>
                <p className="text-xs text-gray-700 truncate">{currentUrl}</p>
              </div>
              <Button
                onClick={() => handleAnalyze(currentUrl)}
                disabled={isAnalyzing}
                className="w-full h-16 text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#FF006B] to-[#FFAA00] hover:opacity-95 transition-all duration-300 text-white rounded-2xl"
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  WebkitTextStroke: "2px black",
                  textStroke: "2px black",
                  paintOrder: "stroke fill",
                  border: "4px solid black",
                  boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-6 h-6 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2" />
                    Analyze This Video
                  </>
                )}
              </Button>
            </div>
          ) : (
            <UrlInput 
              onAnalyze={handleAnalyze} 
              isLoading={isAnalyzing}
              defaultUrl={currentUrl}
            />
          )}
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse p-6 rounded-full bg-white/10 mb-4 border-4 border-white/30">
              <Zap className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-2xl font-comic text-white text-outline-black-thin">
              Analyzing Video...
            </p>
          </div>
        )}

        {/* API Warning */}
        {!apiHealthy && (
          <Alert className="mb-4 bg-red-500/20 border-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Backend Not Connected</AlertTitle>
            <AlertDescription>
              Analysis server is offline. Please start the backend server to enable real analysis.
            </AlertDescription>
          </Alert>
        )}

        {/* Analysis Results */}
        {showResults && analysisData && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Analysis Cards */}
            <div className="space-y-3">
              <AnalysisCard
                icon={<Zap className="w-6 h-6 text-yellow-400" strokeWidth={3} />}
                title="HOOK"
                description={analysisData.frameAnalysis.find(f => f.frame === 'opening')?.analysis || "Analyzing opening frame..."}
                gradient="hook"
              />
              <AnalysisCard
                icon={
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M4 12V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4m-16 0a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4m-16 0v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4" />
                    <path d="M12 8v8m-4-4h8" />
                  </svg>
                }
                title="LOOP"
                description={analysisData.frameAnalysis.find(f => f.frame === 'ending')?.analysis || "Analyzing loop potential..."}
                gradient="loop"
              />
              <AnalysisCard
                icon={<Volume2 className="w-6 h-6 text-white" strokeWidth={3} />}
                title="TRENDING AUDIO"
                description={analysisData.metadata.music || "No music detected"}
                gradient="audio"
              />
              <AnalysisCard
                icon={<Download className="w-6 h-6 text-white" strokeWidth={3} />}
                title="VIRALITY SCORE"
                description={`${analysisData.viralityScore}/100 - ${analysisData.viralityScore > 70 ? 'High potential!' : analysisData.viralityScore > 40 ? 'Good engagement' : 'Needs improvement'}`}
                gradient="sop"
              />
            </div>

            {/* Recommendations */}
            {analysisData.recommendations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {analysisData.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white/10 rounded-lg p-3 border-2 border-black">
                      <p className="text-sm text-white font-medium">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spec Sheet */}
            <div className="mt-8">
              <RealSpecSheet data={{
                videoUrl: currentUrl,
                creator: analysisData.metadata.creator,
                viralityScore: analysisData.viralityScore,
                views: analysisData.metadata.views,
                likes: analysisData.metadata.likes,
                comments: analysisData.metadata.comments,
                shares: analysisData.metadata.shares,
                topHashtags: analysisData.metadata.hashtags,
              }} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isAnalyzing && !showResults && !currentUrl && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-3"
                 style={{ border: "3px solid black" }}>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-white font-bold text-base mb-2"
               style={{
                 textShadow: "2px 2px 0px rgba(0,0,0,0.5)"
               }}>
              Go to any TikTok video
            </p>
            <p className="text-white/80 text-sm"
               style={{
                 textShadow: "1px 1px 0px rgba(0,0,0,0.5)"
               }}>
              Then click Analyze!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
