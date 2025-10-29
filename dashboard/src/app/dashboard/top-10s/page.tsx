'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Users, 
  Hash, 
  Music, 
  Search as SearchIcon,
  Package,
  Megaphone,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ArrowUpRight,
  RefreshCcw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';
import {
  getTrendingVideos,
  getTrendingCreators,
  getTrendingHashtags,
  getTrendingSongs,
  getTrendingKeywords,
  getTrendingProducts,
  getTrendingAds,
  type TrendingVideo,
  type TrendingCreator,
  type TrendingHashtag
} from '@/lib/api';

export default function Top10sPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  
  // Data states
  const [videos, setVideos] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);
  const [hashtags, setHashtags] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);

  // Fetch all trending data
  const fetchTrendingData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [videosData, creatorsData, hashtagsData, songsData, keywordsData, productsData, adsData] = await Promise.all([
        getTrendingVideos(1, 10, selectedPeriod, selectedCountry).catch(() => ({ data: [] })),
        getTrendingCreators(1, 10, selectedCountry).catch(() => ({ data: [] })),
        getTrendingHashtags(1, 10, selectedPeriod, selectedCountry).catch(() => ({ data: [] })),
        getTrendingSongs(1, 10, selectedPeriod, selectedCountry).catch(() => ({ data: [] })),
        getTrendingKeywords(1, 10, selectedPeriod, selectedCountry).catch(() => ({ data: [] })),
        getTrendingProducts(1, selectedPeriod).catch(() => ({ data: [] })),
        getTrendingAds(1, selectedPeriod, 10, selectedCountry).catch(() => ({ data: [] })),
      ]);
      
      setVideos(videosData.data || []);
      setCreators(creatorsData.data || []);
      setHashtags(hashtagsData.data || []);
      setSongs(songsData.data || []);
      setKeywords(keywordsData.data || []);
      setProducts(productsData.data || []);
      setAds(adsData.data || []);
    } catch (err: any) {
      console.error('Failed to fetch trending data:', err);
      setError(err.message || 'Failed to load trending data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTrendingData();
  }, [selectedCountry, selectedPeriod]);
  
  const handleRefresh = () => {
    fetchTrendingData();
  };

  const handleExport = () => {
    // TODO: Implement CSV export
    const dataToExport = { videos, creators, hashtags, songs, keywords, products, ads };
    const json = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tiktok-trending-${selectedCountry}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight">Top 10s</h1>
          <p className="text-lg text-gray-400 font-medium mt-2">
            Discover what's trending across TikTok
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExport} className="glass-effect border-white/20 hover:bg-white/10">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={handleRefresh} disabled={loading} className="bg-gradient-to-r from-[#00D9FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D9FF] text-white font-black uppercase tracking-wide">
            <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search trends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="GLOBAL">Global</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7 h-auto p-2 gap-2 bg-white/5 border border-white/10">
          <TabsTrigger value="videos" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF385C] data-[state=active]:to-[#F97316] data-[state=active]:text-white font-bold">
            <TrendingUp className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A855F7] data-[state=active]:to-[#7C3AED] data-[state=active]:text-white font-bold">
            <Users className="mr-2 h-4 w-4" />
            Creators
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9FF] data-[state=active]:to-[#0099CC] data-[state=active]:text-white font-bold">
            <Hash className="mr-2 h-4 w-4" />
            Hashtags
          </TabsTrigger>
          <TabsTrigger value="songs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#EC4899] data-[state=active]:to-[#DB2777] data-[state=active]:text-white font-bold">
            <Music className="mr-2 h-4 w-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger value="keywords" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFB800] data-[state=active]:to-[#F97316] data-[state=active]:text-white font-bold">
            <SearchIcon className="mr-2 h-4 w-4" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10B981] data-[state=active]:to-[#059669] data-[state=active]:text-white font-bold">
            <Package className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="ads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B5CF6] data-[state=active]:to-[#6D28D9] data-[state=active]:text-white font-bold">
            <Megaphone className="mr-2 h-4 w-4" />
            Ads
          </TabsTrigger>
        </TabsList>

        {/* Trending Videos */}
        <TabsContent value="videos" className="space-y-4">
          <TrendingVideosTable videos={videos} loading={loading} />
        </TabsContent>

        {/* Trending Creators */}
        <TabsContent value="creators" className="space-y-4">
          <TrendingCreatorsTable creators={creators} loading={loading} />
        </TabsContent>

        {/* Trending Hashtags */}
        <TabsContent value="hashtags" className="space-y-4">
          <TrendingHashtagsTable hashtags={hashtags} loading={loading} />
        </TabsContent>

        {/* Trending Songs */}
        <TabsContent value="songs" className="space-y-4">
          <TrendingSongsTable songs={songs} loading={loading} />
        </TabsContent>

        {/* Trending Keywords */}
        <TabsContent value="keywords" className="space-y-4">
          <TrendingKeywordsTable keywords={keywords} loading={loading} />
        </TabsContent>

        {/* Top Products */}
        <TabsContent value="products" className="space-y-4">
          <TrendingProductsTable products={products} loading={loading} />
        </TabsContent>

        {/* Trending Ads */}
        <TabsContent value="ads" className="space-y-4">
          <TrendingAdsTable ads={ads} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Trending Videos Component
function TrendingVideosTable({ videos, loading }: { videos: any[], loading: boolean }) {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#A855F7]" />
        </CardContent>
      </Card>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
          <p className="text-gray-400">No trending videos available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Videos</CardTitle>
        <CardDescription>Top performing videos by engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {videos.map((video, index) => {
            const rank = index + 1;
            const stats = video.stats || {};
            const author = video.author || {};
            const engagementRate = stats.play_count > 0 
              ? (((stats.digg_count || 0) + (stats.comment_count || 0) + (stats.share_count || 0)) / stats.play_count * 100).toFixed(1)
              : 0;
            
            return (
              <div
                key={video.video_id || index}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-black text-white shadow-lg ${
                  rank === 1 ? 'bg-gradient-to-br from-[#FFB800] to-[#F97316] shadow-[#FFB800]/40' :
                  rank === 2 ? 'bg-gradient-to-br from-[#A855F7] to-[#7C3AED] shadow-[#A855F7]/40' :
                  'bg-gradient-to-br from-[#00D9FF] to-[#0099CC] shadow-[#00D9FF]/30'
                }`}>
                  #{rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">@{author.unique_id || 'Unknown'}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{video.desc || 'No description'}</div>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {formatNumber(stats.play_count || 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {formatNumber(stats.digg_count || 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {formatNumber(stats.comment_count || 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      {formatNumber(stats.share_count || 0)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Engagement</div>
                  <div className="text-2xl font-bold text-primary">{engagementRate}%</div>
                  <Badge variant="secondary" className="mt-1">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Viral
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-[#00D9FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D9FF] font-bold shadow-md shadow-[#00D9FF]/30">
                    <Eye className="mr-2 h-4 w-4" />
                    Analyze
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Trending Creators Component
function TrendingCreatorsTable({ creators, loading }: { creators: any[], loading: boolean }) {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#A855F7]" />
        </CardContent>
      </Card>
    );
  }

  if (!creators || creators.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
          <p className="text-gray-400">No trending creators available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Creators</CardTitle>
        <CardDescription>Top creators by follower growth and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {creators.map((creator, index) => {
            const rank = index + 1;
            return (
              <div
                key={creator.unique_id || index}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-black text-white shadow-lg ${
                  rank === 1 ? 'bg-gradient-to-br from-[#FFB800] to-[#F97316] shadow-[#FFB800]/40' :
                  'bg-gradient-to-br from-[#EC4899] to-[#DB2777] shadow-[#EC4899]/30'
                }`}>
                  #{rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">@{creator.unique_id || 'Unknown'}</span>
                    {creator.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{creator.nickname || creator.unique_id}</div>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span>{formatNumber(creator.follower_count || 0)} followers</span>
                    <span>{formatNumber(creator.heart_count || 0)} likes</span>
                    <span>{formatNumber(creator.video_count || 0)} videos</span>
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#A855F7] font-bold shadow-md shadow-[#A855F7]/30">
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Placeholder components for other tabs with loading states
function TrendingHashtagsTable({ hashtags, loading }: { hashtags: any[], loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
        <CardDescription>Most used and fastest growing hashtags</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#00D9FF]" />
          </div>
        ) : !hashtags || hashtags.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-400">No trending hashtags available</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {hashtags.map((tag, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-[#00D9FF]">#{tag.challenge_name || tag.name}</span>
                  <Badge className="bg-[#00D9FF]/20 text-[#00D9FF]">#{index + 1}</Badge>
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>{formatNumber(tag.view_count || 0)} views</span>
                  <span>{formatNumber(tag.post_count || 0)} posts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrendingSongsTable({ songs, loading }: { songs: any[], loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Songs</CardTitle>
        <CardDescription>Most popular songs used in videos</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#EC4899]" />
          </div>
        ) : !songs || songs.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-400">No trending songs available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {songs.map((song, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#EC4899] to-[#DB2777] font-black text-white">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{song.title || song.name || 'Unknown Song'}</div>
                  <div className="text-sm text-gray-400">{song.author || 'Unknown Artist'}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-bold">{formatNumber(song.video_count || 0)}</div>
                  <div className="text-gray-400">videos</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrendingKeywordsTable({ keywords, loading }: { keywords: any[], loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Keywords</CardTitle>
        <CardDescription>Popular search terms and topics</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#FFB800]" />
          </div>
        ) : !keywords || keywords.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-400">No trending keywords available</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {keywords.map((keyword, index) => (
              <div key={index} className="p-4 rounded-lg border border-[#FFB800]/30 hover:bg-[#FFB800]/5 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">{keyword.keyword || keyword.name}</span>
                  <Badge className="bg-[#FFB800]/20 text-[#FFB800]">#{index + 1}</Badge>
                </div>
                <div className="text-sm text-gray-400">{formatNumber(keyword.search_count || 0)} searches</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrendingProductsTable({ products, loading }: { products: any[], loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Most promoted products on TikTok Shop</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-400">No trending products available</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] font-black text-white">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium line-clamp-1">{product.title || product.name || 'Product'}</div>
                    <div className="text-sm text-gray-400">{product.shop_name || 'TikTok Shop'}</div>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className="text-[#10B981]">${product.price || '0.00'}</span>
                      <span className="text-gray-400">{formatNumber(product.sales || 0)} sold</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrendingAdsTable({ ads, loading }: { ads: any[], loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Ads</CardTitle>
        <CardDescription>Top performing TikTok advertisements</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
          </div>
        ) : !ads || ads.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-400">No trending ads available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ads.map((ad, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] font-black text-white">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{ad.caption || ad.desc || 'Ad Campaign'}</div>
                  <div className="text-sm text-gray-400">Brand: {ad.brand_name || 'Unknown'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#8B5CF6]">{ad.ctr || '0'}% CTR</div>
                  <div className="text-sm text-gray-400">{formatNumber(ad.impressions || 0)} views</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

