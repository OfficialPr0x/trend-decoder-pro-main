'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Video, 
  Eye, 
  Heart,
  MessageCircle,
  Share2,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { formatNumber, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAnalyses: 24,
    totalVideos: 8,
    totalViews: 1250000,
    avgEngagement: 8.5,
  });

  const [recentAnalyses, setRecentAnalyses] = useState([
    {
      id: '1',
      url: 'https://tiktok.com/@user/video/123',
      creator: '@creativecontent',
      viralityScore: 87,
      views: '2.3M',
      likes: '450K',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '2',
      url: 'https://tiktok.com/@user/video/124',
      creator: '@trendsetter',
      viralityScore: 92,
      views: '5.1M',
      likes: '890K',
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ]);

  const usageLimits = {
    analyses: { used: 24, limit: 10, tier: 'free' },
    videos: { used: 8, limit: 2, tier: 'free' },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-5xl font-black text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-lg text-gray-400 font-medium">
          Welcome back! Here's your viral content overview.
        </p>
      </div>

      {/* Usage Warning */}
      {(usageLimits.analyses.used > usageLimits.analyses.limit || 
        usageLimits.videos.used > usageLimits.videos.limit) && (
        <Card className="glass-effect border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 shine-effect">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/50">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Usage Limit Reached</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You've exceeded your free tier limits. Upgrade to Pro for unlimited access.
                </p>
                <Link href="/dashboard/settings?tab=billing">
                  <Button className="mt-4 bg-gradient-to-r from-[#FF385C] to-[#FF1744] hover:from-[#FF1744] hover:to-[#FF385C] text-white font-black uppercase tracking-wide hover:scale-105 transition-all duration-200 shadow-lg shadow-[#FF385C]/40" size="sm">
                    Upgrade to Pro <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#FF385C] to-[#FF1744] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-white uppercase tracking-wide">Analyses</CardTitle>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Eye className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">
              {stats.totalAnalyses}
            </div>
            <p className="text-xs text-white/80 mt-1 font-medium">
              {usageLimits.analyses.used}/{usageLimits.analyses.limit} used
            </p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(usageLimits.analyses.used / usageLimits.analyses.limit) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-white uppercase tracking-wide">Videos</CardTitle>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Video className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">
              {stats.totalVideos}
            </div>
            <p className="text-xs text-white/80 mt-1 font-medium">
              {usageLimits.videos.used}/{usageLimits.videos.limit} used
            </p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(usageLimits.videos.used / usageLimits.videos.limit) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#A855F7] to-[#7C3AED] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-white uppercase tracking-wide">Views</CardTitle>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">
              {formatNumber(stats.totalViews)}
            </div>
            <p className="text-xs text-white/80 mt-1 font-medium">
              From analyzed videos
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#FFB800] to-[#FF8A00] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-white uppercase tracking-wide">Engagement</CardTitle>
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Heart className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">
              {stats.avgEngagement}%
            </div>
            <p className="text-xs text-white/80 mt-1 font-medium">
              Across all analyses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-3xl font-black text-white">Quick Actions</CardTitle>
          <CardDescription className="text-base text-gray-400 font-medium">Launch your viral content tools</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/analytics" className="group">
            <div className="relative overflow-hidden border-2 border-[#FF385C]/30 hover:border-[#FF385C] bg-[#FF385C]/5 hover:bg-[#FF385C]/10 transition-all duration-200 rounded-2xl p-6 h-full cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-[#FF385C] shadow-lg shadow-[#FF385C]/30">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#FF385C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="font-black text-xl mb-1 text-white">Analyze Video</div>
                  <div className="text-sm text-gray-400 font-medium">
                    AI-powered insights
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/video-generator" className="group">
            <div className="relative overflow-hidden border-2 border-[#00D9FF]/30 hover:border-[#00D9FF] bg-[#00D9FF]/5 hover:bg-[#00D9FF]/10 transition-all duration-200 rounded-2xl p-6 h-full cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-[#00D9FF] shadow-lg shadow-[#00D9FF]/30">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="font-black text-xl mb-1 text-white">Generate Video</div>
                  <div className="text-sm text-gray-400 font-medium">
                    Create viral content
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/top-10s" className="group">
            <div className="relative overflow-hidden border-2 border-[#A855F7]/30 hover:border-[#A855F7] bg-[#A855F7]/5 hover:bg-[#A855F7]/10 transition-all duration-200 rounded-2xl p-6 h-full cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-[#A855F7] shadow-lg shadow-[#A855F7]/30">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="font-black text-xl mb-1 text-white">View Top 10s</div>
                  <div className="text-sm text-gray-400 font-medium">
                    Trending discoveries
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Analyses */}
      <Card className="glass-effect border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Analyses</CardTitle>
              <CardDescription className="text-base">Your latest TikTok video analyses</CardDescription>
            </div>
            <Link href="/dashboard/library">
              <Button variant="outline" size="sm" className="glass-effect border-purple-500/30 hover:border-purple-500/60">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis, index) => (
              <div
                key={analysis.id}
                className={`group glass-effect rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shine-effect ${
                  index === 0 ? 'border-purple-500/30' : 'border-blue-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-lg ${
                      index === 0 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/50' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/50'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Video className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{analysis.creator}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          {analysis.views}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Heart className="h-4 w-4" />
                          {analysis.likes}
                        </span>
                        <span>{formatDateTime(analysis.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-muted-foreground">Virality Score</div>
                      <div className={`text-3xl font-bold ${
                        index === 0 
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                      } bg-clip-text text-transparent`}>
                        {analysis.viralityScore}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

