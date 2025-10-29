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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your TikTok analytics.
        </p>
      </div>

      {/* Usage Warning */}
      {(usageLimits.analyses.used > usageLimits.analyses.limit || 
        usageLimits.videos.used > usageLimits.videos.limit) && (
        <Card className="border-orange-500 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-orange-500 p-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Usage Limit Reached</h3>
                <p className="text-sm text-muted-foreground">
                  You've exceeded your free tier limits. Upgrade to Pro for unlimited access.
                </p>
                <Link href="/dashboard/settings?tab=billing">
                  <Button className="mt-3" size="sm">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnalyses}</div>
            <p className="text-xs text-muted-foreground">
              {usageLimits.analyses.used}/{usageLimits.analyses.limit} used this month
            </p>
            <Progress 
              value={(usageLimits.analyses.used / usageLimits.analyses.limit) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos Generated</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              {usageLimits.videos.used}/{usageLimits.videos.limit} used this month
            </p>
            <Progress 
              value={(usageLimits.videos.used / usageLimits.videos.limit) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              From analyzed videos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">
              Across all analyses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with powerful TikTok tools</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/analytics">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold">Analyze Video</div>
                  <div className="text-xs text-muted-foreground">
                    Get AI-powered insights
                  </div>
                </div>
              </div>
            </Button>
          </Link>
          
          <Link href="/dashboard/video-generator">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold">Generate Video</div>
                  <div className="text-xs text-muted-foreground">
                    Create faceless videos
                  </div>
                </div>
              </div>
            </Button>
          </Link>
          
          <Link href="/dashboard/top-10s">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold">View Top 10s</div>
                  <div className="text-xs text-muted-foreground">
                    Discover trending content
                  </div>
                </div>
              </div>
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Analyses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Your latest TikTok video analyses</CardDescription>
            </div>
            <Link href="/dashboard/library">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{analysis.creator}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {analysis.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {analysis.likes}
                      </span>
                      <span>{formatDateTime(analysis.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Virality Score</div>
                    <div className="text-2xl font-bold text-primary">
                      {analysis.viralityScore}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

