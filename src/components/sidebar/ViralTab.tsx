import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Music, Hash, TrendingUp, Users, ShoppingBag, Sparkles, RefreshCw } from "lucide-react";
import { fetchAllTrending } from "@/services/viral-discovery-api";
import { useToast } from "@/hooks/use-toast";
import { GhostLoader } from "@/components/GhostLoader";

interface TrendingCategory {
  icon: React.ReactNode;
  title: string;
  key: string;
  gradient: string;
}

export const ViralTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingData, setTrendingData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const categories: TrendingCategory[] = [
    { icon: <Flame className="w-5 h-5" />, title: "Trending Videos", key: "videos", gradient: "from-red-500 to-orange-500" },
    { icon: <Music className="w-5 h-5" />, title: "Trending Sounds", key: "sounds", gradient: "from-purple-500 to-pink-500" },
    { icon: <Hash className="w-5 h-5" />, title: "Trending Hashtags", key: "hashtags", gradient: "from-blue-500 to-cyan-500" },
    { icon: <Users className="w-5 h-5" />, title: "Trending Creators", key: "creators", gradient: "from-green-500 to-emerald-500" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Trending Keywords", key: "keywords", gradient: "from-yellow-500 to-orange-500" },
    { icon: <ShoppingBag className="w-5 h-5" />, title: "Trending Products", key: "products", gradient: "from-pink-500 to-rose-500" },
  ];

  const loadTrendingData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAllTrending({ limit: 10, period: 7 });
      setTrendingData(result.data);
      toast({
        title: "🔥 Trending Data Loaded!",
        description: "Showing latest viral trends",
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to load trending data:', error);
      toast({
        title: "❌ Failed to Load Trending Data",
        description: error instanceof Error ? error.message : "Backend connection failed. Make sure the server is running.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load on mount (no API key needed anymore)
  useEffect(() => {
    loadTrendingData();
  }, []);

  const renderCategoryData = (category: TrendingCategory) => {
    if (!trendingData || !trendingData[category.key]) {
      return (
        <div className="text-white/60 text-xs text-center py-2">
          No data available
        </div>
      );
    }

    const data = trendingData[category.key]?.data || [];
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-white/60 text-xs text-center py-2">
          No {category.title.toLowerCase()} found
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {data.slice(0, 10).map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-2 text-xs hover:bg-white/20 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <div className="text-white font-black text-sm w-6 flex-shrink-0">
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                {renderItemContent(item, category.key)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderItemContent = (item: any, categoryKey: string) => {
    switch (categoryKey) {
      case 'videos':
        return (
          <>
            <div className="text-white font-bold truncate">{item.desc || item.title || 'Video'}</div>
            <div className="text-white/70 text-xs">
              {formatNumber(item.vv || item.views || 0)} views • {formatNumber(item.digg_count || item.likes || 0)} likes
            </div>
          </>
        );
      case 'sounds':
        return (
          <>
            <div className="text-white font-bold truncate">{item.title || item.music_title || 'Sound'}</div>
            <div className="text-white/70 text-xs">
              {formatNumber(item.post_count || item.video_count || 0)} videos
            </div>
          </>
        );
      case 'hashtags':
        return (
          <>
            <div className="text-white font-bold">#{item.title || item.hashtag || 'hashtag'}</div>
            <div className="text-white/70 text-xs">
              {formatNumber(item.view_count || item.views || 0)} views
            </div>
          </>
        );
      case 'creators':
        return (
          <>
            <div className="text-white font-bold truncate">@{item.unique_id || item.username || 'creator'}</div>
            <div className="text-white/70 text-xs">
              {formatNumber(item.follower_count || item.fans || 0)} followers
            </div>
          </>
        );
      case 'keywords':
        return (
          <>
            <div className="text-white font-bold truncate">{item.keyword || item.title || 'keyword'}</div>
            <div className="text-white/70 text-xs">
              Trending search term
            </div>
          </>
        );
      case 'products':
        return (
          <>
            <div className="text-white font-bold truncate">{item.title || item.product_name || 'Product'}</div>
            <div className="text-white/70 text-xs">
              {formatNumber(item.post_count || 0)} posts
            </div>
          </>
        );
      default:
        return (
          <div className="text-white">{JSON.stringify(item).substring(0, 50)}...</div>
        );
    }
  };

  const formatNumber = (num: number): string => {
    if (!num) return '0';
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-black px-4 py-2 rounded-full mb-2"
             style={{ border: "2px solid black" }}>
          <Flame className="w-4 h-4" />
          VIRAL DISCOVERY
        </div>
        <p className="text-white/80 text-xs">
          Top 10 trending content across TikTok
        </p>
      </div>

      {/* Refresh Button */}
      <Button
        onClick={loadTrendingData}
        disabled={isLoading}
        className="w-full h-12 text-sm font-black uppercase bg-gradient-to-r from-[#FF006B] to-[#FFAA00] hover:opacity-95 text-white rounded-xl"
        style={{
          fontFamily: "'Rubik', sans-serif",
          border: "3px solid black",
          boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Loading...' : 'Load Trending Data'}
      </Button>

      {/* Loading State */}
      {isLoading && (
        <Card 
          className="p-6 bg-gradient-to-br from-pink-900/90 to-purple-900/90 backdrop-blur-sm"
          style={{ border: "3px solid black" }}
        >
          <GhostLoader progress={50} />
          <div className="text-white/80 font-medium text-sm text-center mt-4">
            Fetching viral trends...
          </div>
        </Card>
      )}

      {/* Category Cards */}
      {!isLoading && trendingData && (
        <div className="space-y-3">
          {categories.map((category) => (
            <Card
              key={category.key}
              className={`p-3 bg-gradient-to-br ${category.gradient}/20 backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-transform`}
              style={{ border: "3px solid black" }}
              onClick={() => setSelectedCategory(selectedCategory === category.key ? null : category.key)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`bg-gradient-to-r ${category.gradient} p-2 rounded-lg`}>
                    {category.icon}
                  </div>
                  <span className="text-white font-black text-sm uppercase">
                    {category.title}
                  </span>
                </div>
                <TrendingUp className={`w-4 h-4 text-white transition-transform ${selectedCategory === category.key ? 'rotate-180' : ''}`} />
              </div>

              {selectedCategory === category.key && (
                <div className="mt-3 max-h-96 overflow-y-auto">
                  {renderCategoryData(category)}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !trendingData && (
        <Card
          className="p-6 bg-white/10 backdrop-blur-sm text-center"
          style={{ border: "3px solid black" }}
        >
          <Flame className="w-12 h-12 mx-auto mb-3 text-orange-400" />
          <p className="text-white font-bold text-sm mb-2">
            Discover What's Trending
          </p>
          <p className="text-white/60 text-xs mb-4">
            Load trending data to see the hottest videos, sounds, hashtags, and creators on TikTok
          </p>
          <Button
            onClick={loadTrendingData}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold"
            style={{ border: "2px solid black" }}
          >
            <Flame className="w-4 h-4 mr-2" />
            Load Trending Data
          </Button>
        </Card>
      )}
    </div>
  );
};

