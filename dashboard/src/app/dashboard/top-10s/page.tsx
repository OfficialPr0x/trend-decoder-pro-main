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
  RefreshCcw
} from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';

export default function Top10sPage() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const handleRefresh = async () => {
    setLoading(true);
    // TODO: Fetch from backend API
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log('Exporting data...');
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
          <TrendingVideosTable />
        </TabsContent>

        {/* Trending Creators */}
        <TabsContent value="creators" className="space-y-4">
          <TrendingCreatorsTable />
        </TabsContent>

        {/* Trending Hashtags */}
        <TabsContent value="hashtags" className="space-y-4">
          <TrendingHashtagsTable />
        </TabsContent>

        {/* Trending Songs */}
        <TabsContent value="songs" className="space-y-4">
          <TrendingSongsTable />
        </TabsContent>

        {/* Trending Keywords */}
        <TabsContent value="keywords" className="space-y-4">
          <TrendingKeywordsTable />
        </TabsContent>

        {/* Top Products */}
        <TabsContent value="products" className="space-y-4">
          <TrendingProductsTable />
        </TabsContent>

        {/* Trending Ads */}
        <TabsContent value="ads" className="space-y-4">
          <TrendingAdsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Trending Videos Component
function TrendingVideosTable() {
  const mockVideos = [
    {
      rank: 1,
      creator: '@viralcontent',
      description: 'This trend is EXPLODING right now 🔥',
      views: 12500000,
      likes: 2100000,
      comments: 85000,
      shares: 420000,
      engagementRate: 20.8,
      growth: 458,
    },
    {
      rank: 2,
      creator: '@trendmaster',
      description: 'You won\'t believe this hack...',
      views: 9800000,
      likes: 1600000,
      comments: 72000,
      shares: 350000,
      engagementRate: 20.6,
      growth: 392,
    },
    // Add more mock data...
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Videos</CardTitle>
        <CardDescription>Top performing videos by engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockVideos.map((video) => (
            <div
              key={video.rank}
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-black text-white shadow-lg ${
                video.rank === 1 ? 'bg-gradient-to-br from-[#FFB800] to-[#F97316] shadow-[#FFB800]/40' :
                video.rank === 2 ? 'bg-gradient-to-br from-[#A855F7] to-[#7C3AED] shadow-[#A855F7]/40' :
                'bg-gradient-to-br from-[#00D9FF] to-[#0099CC] shadow-[#00D9FF]/30'
              }`}>
                #{video.rank}
              </div>
              <div className="flex-1">
                <div className="font-medium">{video.creator}</div>
                <div className="text-sm text-muted-foreground">{video.description}</div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatNumber(video.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {formatNumber(video.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {formatNumber(video.comments)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    {formatNumber(video.shares)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Engagement</div>
                <div className="text-2xl font-bold text-primary">{video.engagementRate}%</div>
                <Badge variant="secondary" className="mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +{video.growth}%
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-[#00D9FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D9FF] font-bold shadow-md shadow-[#00D9FF]/30">
                  <Eye className="mr-2 h-4 w-4" />
                  Analyze
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#A855F7] font-bold shadow-md shadow-[#A855F7]/30">
                  Send to Generator
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Trending Creators Component
function TrendingCreatorsTable() {
  const mockCreators = [
    {
      rank: 1,
      username: '@megacreator',
      nickname: 'Mega Creator',
      followers: 15200000,
      likes: 892000000,
      videos: 1245,
      engagementRate: 12.5,
      growth: 28.3,
      verified: true,
    },
    // Add more mock data...
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Creators</CardTitle>
        <CardDescription>Top creators by follower growth and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockCreators.map((creator) => (
            <div
              key={creator.rank}
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-black text-white shadow-lg ${
                creator.rank === 1 ? 'bg-gradient-to-br from-[#FFB800] to-[#F97316] shadow-[#FFB800]/40' :
                'bg-gradient-to-br from-[#EC4899] to-[#DB2777] shadow-[#EC4899]/30'
              }`}>
                #{creator.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{creator.username}</span>
                  {creator.verified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{creator.nickname}</div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span>{formatNumber(creator.followers)} followers</span>
                  <span>{formatNumber(creator.likes)} likes</span>
                  <span>{formatNumber(creator.videos)} videos</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Engagement</div>
                <div className="text-2xl font-bold text-primary">{creator.engagementRate}%</div>
                <Badge variant="secondary" className="mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +{creator.growth}%
                </Badge>
              </div>
              <Button size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Placeholder components for other tabs
function TrendingHashtagsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
        <CardDescription>Most used and fastest growing hashtags</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Hashtag data will be populated from TikTok RapidAPI
        </div>
      </CardContent>
    </Card>
  );
}

function TrendingSongsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Songs</CardTitle>
        <CardDescription>Most popular songs used in videos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Song data will be populated from TikTok RapidAPI
        </div>
      </CardContent>
    </Card>
  );
}

function TrendingKeywordsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Keywords</CardTitle>
        <CardDescription>Popular search terms and topics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Keyword data will be populated from TikTok RapidAPI
        </div>
      </CardContent>
    </Card>
  );
}

function TrendingProductsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Most promoted products on TikTok Shop</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Product data will be populated from TikTok RapidAPI
        </div>
      </CardContent>
    </Card>
  );
}

function TrendingAdsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Ads</CardTitle>
        <CardDescription>Top performing TikTok advertisements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Ad data will be populated from TikTok RapidAPI
        </div>
      </CardContent>
    </Card>
  );
}

