import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
  defaultUrl?: string;
}

export const UrlInput = ({ onAnalyze, isLoading = false, defaultUrl = "" }: UrlInputProps) => {
  const [url, setUrl] = useState(defaultUrl);
  const { toast } = useToast();
  
  useEffect(() => {
    if (defaultUrl) {
      setUrl(defaultUrl);
    }
  }, [defaultUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a TikTok URL to analyze",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes("tiktok.com")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid TikTok URL",
        variant: "destructive",
      });
      return;
    }

    onAnalyze(url);
  };
  
  const handlePaste = async () => {
    try {
      // Try to read from clipboard
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setUrl(text);
        toast({
          title: "Pasted from clipboard",
          description: "URL has been pasted",
        });
      } else if ((window as any).chrome?.runtime?.sendMessage) {
        // Fallback for Chrome extension
        (window as any).chrome.runtime.sendMessage(
          { action: 'readClipboard' },
          (response: any) => {
            if (response?.clipboard) {
              setUrl(response.clipboard);
              toast({
                title: "Pasted from clipboard",
                description: "URL has been pasted",
              });
            }
          }
        );
      }
    } catch (err) {
      toast({
        title: "Failed to paste",
        description: "Could not access clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste TikTok URL here..."
            className="h-14 text-base bg-white/90 text-black placeholder:text-gray-600 font-bold rounded-2xl px-4 pr-14"
            style={{
              border: "4px solid black",
              boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
            }}
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-gradient-to-r from-[#7B2FFF] to-[#B24AFF] hover:opacity-90 rounded-xl"
            style={{
              border: "3px solid black",
              boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.3)",
            }}
            disabled={isLoading}
          >
            <Clipboard className="w-5 h-5 text-white" strokeWidth={3} />
          </Button>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#FF006B] to-[#FFAA00] hover:opacity-95 transition-all duration-300 text-white rounded-2xl"
          style={{
            fontFamily: "'Rubik', sans-serif",
            WebkitTextStroke: "2px black",
            textStroke: "2px black",
            paintOrder: "stroke fill",
            border: "4px solid black",
            boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-6 h-6 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 mr-2" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
