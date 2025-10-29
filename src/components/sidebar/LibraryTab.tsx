import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Share2, Trash2, FileText, Image, Video, Maximize2, Sparkles, MessageSquare, Copy, ExternalLink, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LibraryItem {
  id: string;
  type: 'analysis' | 'deep-analysis' | 'image' | 'video';
  title: string;
  content: any;
  timestamp: number;
  aspectRatio?: string;
  url?: string;
}

export const LibraryTab = () => {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'analysis' | 'deep-analysis' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAIChat, setIsAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Helper functions for storage
  const loadItems = async () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      return new Promise<LibraryItem[]>((resolve) => {
        chrome.storage.local.get(['viralify_library'], (result) => {
          resolve(result.viralify_library || []);
        });
      });
    } else {
      const savedItems = localStorage.getItem('viralify-library');
      return savedItems ? JSON.parse(savedItems) : [];
    }
  };

  const saveItems = async (newItems: LibraryItem[]) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({ viralify_library: newItems });
    } else {
      localStorage.setItem('viralify-library', JSON.stringify(newItems));
    }
  };

  // Load items on mount
  useEffect(() => {
    loadItems().then(setItems);
  }, []);

  // Listen for save events
  useEffect(() => {
    const handleSave = async (event: CustomEvent) => {
      console.log('VIRALIFY: Save to library event received:', event.detail);
      
      const newItem: LibraryItem = {
        id: Date.now().toString(),
        type: event.detail.type || 'image',
        title: event.detail.title || event.detail.prompt || 'Untitled',
        content: event.detail.content || event.detail,
        timestamp: event.detail.timestamp || Date.now(),
        aspectRatio: event.detail.aspectRatio,
        url: event.detail.url,
      };
      
      console.log('VIRALIFY: Creating library item:', newItem);
      
      setItems(prev => {
        const updated = [newItem, ...prev];
        saveItems(updated).then(() => {
          console.log('VIRALIFY: Library updated, total items:', updated.length);
        });
        return updated;
      });
    };

    window.addEventListener('save-to-library', handleSave as EventListener);
    return () => window.removeEventListener('save-to-library', handleSave as EventListener);
  }, []);

  const filteredItems = items
    .filter(item => activeFilter === 'all' || item.type === activeFilter)
    .filter(item => 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const deleteItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveItems(updated);
      return updated;
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <FileText className="w-4 h-4" />;
      case 'deep-analysis': return <FileText className="w-4 h-4 text-red-400" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return null;
    }
  };

  const openDetailView = (item: LibraryItem) => {
    setSelectedItem(item);
    setIsDetailView(true);
    setIsAIChat(false);
    setAiMessages([]);
  };

  const startAIChat = () => {
    if (!selectedItem) return;
    
    setIsAIChat(true);
    setAiMessages([{
      role: 'assistant',
      content: `I'm your AI agent ready to help you create a viral content strategy based on this ${selectedItem.type === 'deep-analysis' ? 'deep' : 'quick'} analysis!\n\nI can help you:\n• Create a full viral spec\n• Suggest content ideas\n• Write hooks and scripts\n• Optimize for engagement\n• Plan posting strategy\n\nWhat would you like to work on?`
    }]);
  };

  const generateViralSpec = async () => {
    if (!selectedItem) return;

    toast({
      title: "🚀 Generating Viral Spec...",
      description: "Creating your complete go-viral strategy",
      duration: 2000,
    });

    // Add AI message to simulate spec generation
    const specMessage = `# 🎯 VIRAL CONTENT SPEC\n\n## Analysis Summary\n${selectedItem.title}\n\n## Top Hooks Found:\n${selectedItem.content?.viralHooks?.slice(0, 3).map((h: string, i: number) => `${i + 1}. ${h}`).join('\n') || 'Based on the analysis data...'}\n\n## Recommended Strategy:\n\n### Content Format:\n- **Duration**: 15-30 seconds (optimal engagement)\n- **Opening**: Strong visual hook in first 1-2 seconds\n- **Body**: Fast-paced, engaging narrative\n- **CTA**: Clear call-to-action at end\n\n### Engagement Tactics:\n1. Use trending audio/music\n2. Add text overlays for accessibility\n3. Post during peak hours (6-9 PM)\n4. Engage with comments within first hour\n\n### Hashtag Strategy:\n- 3-5 relevant hashtags\n- Mix of trending + niche tags\n- Include one branded hashtag\n\n### Caption Template:\n"[HOOK QUESTION] 🔥\n\n[Brief context in 1-2 lines]\n\n[Call to action]\n\n#[Trending] #[Niche] #[Branded]"\n\n## Next Steps:\n1. Create content following this format\n2. Film multiple variations\n3. A/B test different hooks\n4. Monitor performance\n5. Iterate based on analytics\n\nReady to create? Let me know what you need help with!`;

    setAiMessages(prev => [...prev, {
      role: 'assistant',
      content: specMessage
    }]);
  };

  const sendAIMessage = async () => {
    if (!userMessage.trim() || !selectedItem) return;

    const newMessage = userMessage.trim();
    setUserMessage('');

    setAiMessages(prev => [...prev, {
      role: 'user',
      content: newMessage
    }]);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (newMessage.toLowerCase().includes('hook')) {
        response = `Here are 5 viral hook variations based on the analysis:\n\n1. "POV: You discover [shocking insight]..."\n2. "Stop scrolling! This will change [topic]..."\n3. "Nobody talks about [unique angle]..."\n4. "Day [X] of [challenge/journey]..."\n5. "The [authority figure] don't want you to know this..."\n\nWhich style resonates with your audience?`;
      } else if (newMessage.toLowerCase().includes('script')) {
        response = `📝 Here's your viral script structure:\n\n**HOOK (0-2s)**\n[Attention-grabbing statement]\n\n**SETUP (2-10s)**\n[Context + why it matters]\n\n**PAYOFF (10-25s)**\n[Main content/reveal]\n\n**CTA (25-30s)**\n[Call to action + engagement driver]\n\nWant me to write a specific script for your topic?`;
      } else if (newMessage.toLowerCase().includes('spec') || newMessage.toLowerCase().includes('strategy')) {
        generateViralSpec();
        return;
      } else {
        response = `Based on the analysis data, here's my suggestion:\n\n${newMessage.toLowerCase().includes('when') ? 'Best posting times are 6-9 PM on weekdays and 10 AM - 2 PM on weekends when engagement is highest.' : ''}\n\n${newMessage.toLowerCase().includes('hashtag') ? 'Use 3-5 hashtags: Mix trending hashtags with niche-specific ones. Research shows 3-5 tags get better reach than 10+.' : ''}\n\n${newMessage.toLowerCase().includes('music') || newMessage.toLowerCase().includes('sound') ? 'Trending sounds can 10x your reach! Check the "Trending" tab daily and use sounds within their first 2-3 days of trending.' : ''}\n\nWhat else can I help you with?`;
      }

      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    }, 1000);
  };

  const exportToJSON = () => {
    if (!selectedItem) return;
    
    const dataStr = JSON.stringify(selectedItem, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItem.title.replace(/[^a-z0-9]/gi, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "📥 Exported!",
      description: "Analysis downloaded as JSON",
      duration: 2000,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "📋 Copied!",
        description: "Content copied to clipboard",
        duration: 2000,
      });
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white"
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}>
        Your Vault
      </h3>

      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search library..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-10 bg-white/90 text-black placeholder:text-gray-500 font-medium"
        style={{
          border: "2px solid black",
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={(v: any) => setActiveFilter(v)}>
        <TabsList className="grid w-full grid-cols-5 bg-black/20"
                  style={{ border: "2px solid black" }}>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="analysis">Quick</TabsTrigger>
          <TabsTrigger value="deep-analysis">Deep</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Items Grid */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60 text-sm">No items saved yet</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <Card key={item.id} 
                  className="p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
                  style={{ border: "2px solid black" }}
                  onClick={() => openDetailView(item)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getIcon(item.type)}
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <Maximize2 className="w-3 h-3 text-cyan-300 ml-auto" />
                  </div>
                  <p className="text-xs text-white/60">
                    {new Date(item.timestamp).toLocaleDateString()}
                    {item.url && (
                      <span className="ml-2 text-cyan-300">
                        • {(() => {
                          try {
                            return new URL(item.url).hostname;
                          } catch {
                            return 'tiktok.com';
                          }
                        })()}
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => {
                      copyToClipboard(item.url || '');
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-400"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Preview */}
              {item.type === 'image' && item.content.content && (
                <div className="relative mt-2">
                  <img 
                    src={item.content.content} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded"
                    style={{ border: "2px solid black" }}
                  />
                  {item.aspectRatio && (
                    <span className="absolute top-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs font-bold">
                      {item.aspectRatio}
                    </span>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Storage Info & Test */}
      <div className="text-center space-y-2">
        <div className="text-xs text-white/60">
          {items.length} items saved locally
        </div>
        {process.env.NODE_ENV === 'development' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const testItem = {
                type: 'analysis',
                title: 'Test Analysis - ' + new Date().toLocaleTimeString(),
                content: { test: true, message: 'This is a test save' },
                url: 'https://www.tiktok.com/@test/video/123456',
                timestamp: Date.now()
              };
              window.dispatchEvent(new CustomEvent('save-to-library', { detail: testItem }));
            }}
            className="text-xs"
          >
            🧪 Test Save
          </Button>
        )}
      </div>

      {/* Detail View Modal */}
      <Dialog open={isDetailView} onOpenChange={setIsDetailView}>
        <DialogContent className="max-w-2xl max-h-[90vh] bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-4 border-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black flex items-center gap-2">
              {selectedItem && getIcon(selectedItem.type)}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {selectedItem?.url && (
                <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  {selectedItem.url}
                </a>
              )}
            </DialogDescription>
          </DialogHeader>

          {!isAIChat ? (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={startAIChat}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-black"
                    style={{ border: "2px solid black" }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Strategy Chat
                  </Button>
                  <Button
                    onClick={generateViralSpec}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-black"
                    style={{ border: "2px solid black" }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Viral Spec
                  </Button>
                  <Button
                    onClick={exportToJSON}
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>

                {/* Analysis Content */}
                <Card className="p-4 bg-black/30" style={{ border: "2px solid white" }}>
                  <h3 className="text-lg font-black mb-3">📊 Analysis Data</h3>
                  <pre className="text-xs whitespace-pre-wrap font-mono bg-black/50 p-3 rounded overflow-auto max-h-96">
                    {JSON.stringify(selectedItem?.content, null, 2)}
                  </pre>
                </Card>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col h-[60vh]">
              {/* AI Chat Messages */}
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-3">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-cyan-500 text-white' 
                          : 'bg-white/10 text-white border-2 border-white/20'
                      }`}>
                        <pre className="whitespace-pre-wrap text-sm font-sans">
                          {msg.content}
                        </pre>
                        {msg.role === 'assistant' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 h-6 text-xs"
                            onClick={() => copyToClipboard(msg.content)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* AI Chat Input */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask about hooks, scripts, strategy..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                  className="flex-1 bg-white/90 text-black"
                  style={{ border: "2px solid black" }}
                />
                <Button
                  onClick={sendAIMessage}
                  disabled={!userMessage.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black"
                  style={{ border: "2px solid black" }}
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={() => setIsAIChat(false)}
                variant="outline"
                className="mt-2 text-white border-white"
              >
                ← Back to Analysis
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
