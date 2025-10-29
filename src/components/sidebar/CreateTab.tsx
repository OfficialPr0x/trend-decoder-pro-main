import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, Wand2, Download, Square, RectangleHorizontal, RectangleVertical, Sparkles, RefreshCw } from "lucide-react";
import { generateImage, generateVideo, fetchModels } from "@/services/openrouter-api";
import { useToast } from "@/hooks/use-toast";
import { GhostLoader } from "@/components/GhostLoader";

type AspectRatio = '1:1' | '16:9' | '9:16';
type ContentType = 'image' | 'video';

const aspectRatioConfig = {
  '1:1': { width: 1024, height: 1024, icon: Square, label: 'Square' },
  '16:9': { width: 1024, height: 576, icon: RectangleHorizontal, label: 'Landscape' },
  '9:16': { width: 576, height: 1024, icon: RectangleVertical, label: 'Portrait' }
};

export const CreateTab = () => {
  const [contentType, setContentType] = useState<ContentType>('image');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('google/gemini-2.5-flash-image');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [availableModels, setAvailableModels] = useState<{
    image: Array<{ id: string; name: string }>;
    text: Array<{ id: string; name: string }>;
  }>({ image: [], text: [] });
  const { toast } = useToast();

  // Listen for remix events and load models
  useEffect(() => {
    const handleRemix = (event: CustomEvent) => {
      const data = event.detail;
      setPrompt(`Create a viral ${contentType} similar to: ${data.metadata?.description || 'trending content'}. ${data.metadata?.music ? `Use ${data.metadata.music} style.` : ''}`);
    };

    window.addEventListener('remix-content', handleRemix as EventListener);
    
    // Load models on mount
    loadModels();
    
    return () => window.removeEventListener('remix-content', handleRemix as EventListener);
  }, [contentType]);

  const loadModels = async () => {
    setIsLoadingModels(true);
    try {
      const models = await fetchModels();
      setAvailableModels({
        image: models.image || [],
        text: models.text || []
      });
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt ⚠️",
        description: "Please enter a prompt to generate content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStatus('Starting...');
    setGenerationError(null);
    setGeneratedContent(null);
    
    try {
      if (contentType === 'image') {
        const { width, height } = aspectRatioConfig[aspectRatio];
        
        console.log('VIRALIFY: Generating image with model:', model);
        
        const result = await generateImage({
          prompt,
          model,
          style: 'viral-tiktok',
          size: `${width}x${height}`,
          onProgress: (progress, status) => {
            console.log('VIRALIFY: Progress:', progress, status);
            setGenerationProgress(progress);
            setGenerationStatus(status);
          }
        });
        
        setGeneratedContent(result.url);
        setIsGenerating(false);
        setGenerationProgress(100);
        setGenerationStatus('Complete!');
        
        if (result.error) {
          setGenerationError(result.error);
          toast({
            title: "Generation Complete ⚠️",
            description: result.error,
            duration: 5000,
          });
        } else {
          toast({
            title: "✨ Image Generated! 🎨",
            description: "Your viral content is ready to download",
            duration: 3000,
          });
        }
      } else {
        setGenerationStatus('Creating storyboard...');
        const result = await generateVideo({
          prompt,
          model,
          duration: 15,
          style: 'viral-tiktok'
        });
        
        setGenerationProgress(100);
        setGeneratedContent(`data:text/plain,${encodeURIComponent(result.storyboard)}`);
        setIsGenerating(false);
        setGenerationStatus('Complete!');
        
        toast({
          title: "✨ Video Storyboard Created! 🎬",
          description: "Full video generation coming soon",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsGenerating(false);
      setGenerationProgress(0);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Generation failed:', errorMessage);
      setGenerationError(errorMessage);
      setGenerationStatus('Failed');
      
      toast({
        title: "❌ Generation Failed",
        description: errorMessage.includes('API key') 
          ? 'Add your OpenRouter API key in Settings' 
          : errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const imageModels = availableModels.image.length > 0 
    ? availableModels.image 
    : [
        { id: 'google/gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image' },
        { id: 'google/gemini-2.5-flash-image-preview', name: 'Gemini 2.5 Flash Image Preview' },
        { id: 'openai/dall-e-3', name: 'DALL-E 3' },
      ];

  const videoModels = availableModels.text.length > 0
    ? availableModels.text.slice(0, 5)
    : [
        { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
        { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo' },
      ];

  // Check if API key is present
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Check for API key in Chrome storage or localStorage
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['openrouter_api_key'], (result) => {
        setHasApiKey(!!result.openrouter_api_key);
      });
    } else {
      setHasApiKey(!!localStorage.getItem('openrouter_api_key'));
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* API Key Warning */}
      {!hasApiKey && (
        <Card className="p-3 bg-yellow-500/20 backdrop-blur-sm border-2 border-yellow-500">
          <p className="text-sm text-white font-medium">
            ⚠️ Add your OpenRouter API key in Settings to enable AI generation
          </p>
        </Card>
      )}

      {/* Content Type Tabs */}
      <Tabs value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
        <TabsList className="grid w-full grid-cols-2 bg-black/20" style={{ border: "2px solid black" }}>
          <TabsTrigger 
            value="image" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF006B] data-[state=active]:to-[#FFAA00] font-bold"
          >
            <Image className="w-4 h-4 mr-1" />
            Image
          </TabsTrigger>
          <TabsTrigger 
            value="video"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7B2FFF] data-[state=active]:to-[#B24AFF] font-bold"
          >
            <Video className="w-4 h-4 mr-1" />
            Video
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Model Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white/80">AI Model:</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={loadModels}
            disabled={isLoadingModels}
            className="h-6 px-2 text-xs text-white"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingModels ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger 
            className="w-full bg-white text-black font-bold"
            style={{ border: "3px solid black" }}
          >
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {(contentType === 'image' ? imageModels : videoModels).map(m => (
              <SelectItem key={m.id} value={m.id} className="font-medium">
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Aspect Ratio Selector - Only for images */}
      {contentType === 'image' && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-white/80">Aspect Ratio:</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(aspectRatioConfig).map(([ratio, config]) => {
              const Icon = config.icon;
              return (
                <Button
                  key={ratio}
                  variant={aspectRatio === ratio ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAspectRatio(ratio as AspectRatio)}
                  className={aspectRatio === ratio ? 'bg-gradient-to-r from-[#FF006B] to-[#FFAA00]' : 'bg-white/20'}
                  style={{ border: "2px solid black" }}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="text-xs font-bold">{ratio}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <Textarea
        placeholder={`Describe your viral ${contentType}...`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] bg-white text-black font-medium resize-none placeholder:text-gray-500"
        style={{
          border: "3px solid black",
          boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Style Presets */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-white/80">Quick Styles:</p>
        <div className="flex flex-wrap gap-2">
          {['Viral Hook', 'Loop Perfect', 'Trending Style', 'Meme Format'].map(style => (
            <Button
              key={style}
              size="sm"
              variant="outline"
              className="text-xs bg-white/20 hover:bg-white/30"
              style={{ border: "2px solid black" }}
              onClick={() => setPrompt(prev => `${prev} ${style}`)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      {!isGenerating && (
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim()}
          className="w-full h-14 text-xl font-black uppercase tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 transition-all duration-300 text-white rounded-2xl"
          style={{
            fontFamily: "'Rubik', sans-serif",
            WebkitTextStroke: "1px black",
            textStroke: "1px black",
            paintOrder: "stroke fill",
            border: "3px solid black",
            boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Wand2 className="w-5 h-5 mr-2" />
          Generate {contentType}
        </Button>
      )}

      {/* Generation Progress */}
      {isGenerating && (
        <Card 
          className="p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm"
          style={{ 
            border: "3px solid black",
            aspectRatio: contentType === 'image' ? 
              `${aspectRatioConfig[aspectRatio].width}/${aspectRatioConfig[aspectRatio].height}` : 
              '16/9'
          }}
        >
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <GhostLoader progress={Math.round(generationProgress)} />
            <div className="text-center space-y-2">
              <div className="text-white font-black text-2xl">
                {Math.round(generationProgress)}%
              </div>
              <div className="text-white/80 font-medium text-sm">
                {generationStatus}
              </div>
              <div className="w-64 h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Generated Content */}
      {!isGenerating && generatedContent && (
        <Card className="p-4 bg-white/10 backdrop-blur-sm" 
              style={{ border: "3px solid black" }}>
          <div className="space-y-3">
            {contentType === 'image' ? (
              <div className="relative">
                <img 
                  src={generatedContent} 
                  alt="Generated content" 
                  className="w-full rounded-lg"
                  style={{ 
                    border: "2px solid black",
                    aspectRatio: `${aspectRatioConfig[aspectRatio].width}/${aspectRatioConfig[aspectRatio].height}`,
                    objectFit: 'cover'
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                    {aspectRatio}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-black/50 p-4 rounded-lg">
                <pre className="text-white text-xs whitespace-pre-wrap">{generatedContent}</pre>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-[#FFAA00] to-[#FF6B00]"
                style={{ border: "2px solid black" }}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white/20"
                style={{ border: "2px solid black" }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('save-to-library', {
                    detail: { 
                      content: generatedContent, 
                      prompt, 
                      type: contentType,
                      aspectRatio: contentType === 'image' ? aspectRatio : undefined
                    }
                  }));
                  toast({
                    title: "Saved to Library! 📚",
                    description: "You can access it anytime",
                  });
                }}
              >
                Save to Library
              </Button>
            </div>
            
            {/* Regenerate with variations */}
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-purple-500/20"
              style={{ border: "2px solid black" }}
              onClick={() => {
                setPrompt(prev => `${prev} (variation)`);
                handleGenerate();
              }}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Generate Variation
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};