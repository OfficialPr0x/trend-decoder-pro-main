'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!tiktokUrl) return;
    
    setIsAnalyzing(true);
    
    // TODO: Call backend API
    setTimeout(() => {
      setAnalysisResult({
        viralityScore: 87,
        metadata: {
          creator: '@testcreator',
          description: 'This is a test video description',
          views: '2.5M',
          likes: '450K',
          comments: '32K',
          shares: '89K',
          music: 'Trending Sound 2024',
          hashtags: ['#viral', '#trending', '#foryou'],
        },
        frameAnalysis: [
          {
            frame: 'opening',
            analysis: 'Strong hook with attention-grabbing text overlay...',
          },
          {
            frame: 'middle',
            analysis: 'Maintains engagement with quick cuts and dynamic content...',
          },
          {
            frame: 'ending',
            analysis: 'Creates loop potential with seamless transition...',
          },
        ],
        recommendations: [
          {
            type: 'hook',
            priority: 'high',
            suggestion: 'Strengthen opening with bolder text overlay',
          },
          {
            type: 'music',
            priority: 'medium',
            suggestion: 'Consider using a more trending audio',
          },
        ],
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Deep Analytics</h1>
        <p className="text-muted-foreground">
          AI-powered TikTok video analysis and insights
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>Analyze TikTok Video</CardTitle>
          <CardDescription>
            Paste a TikTok URL to get comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="https://www.tiktok.com/@user/video/1234567890"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !tiktokUrl}>
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <>
          {/* Virality Score */}
          <Card>
            <CardHeader>
              <CardTitle>Virality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="text-7xl font-bold text-primary">
                    {analysisResult.viralityScore}
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    out of 100
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
                <div className="text-center">
                  <Eye className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">
                    {analysisResult.metadata.views}
                  </div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <Heart className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">
                    {analysisResult.metadata.likes}
                  </div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <MessageCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">
                    {analysisResult.metadata.comments}
                  </div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
                <div className="text-center">
                  <Share2 className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">
                    {analysisResult.metadata.shares}
                  </div>
                  <div className="text-xs text-muted-foreground">Shares</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Creator</Label>
                <div className="font-medium">{analysisResult.metadata.creator}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <div className="font-medium">{analysisResult.metadata.description}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Music</Label>
                <div className="font-medium">{analysisResult.metadata.music}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Hashtags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {analysisResult.metadata.hashtags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frame Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Frame-by-Frame Analysis</CardTitle>
              <CardDescription>
                AI analysis of key video moments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.frameAnalysis.map((frame: any, index: number) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{frame.frame}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{frame.analysis}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Ways to improve virality potential
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.recommendations.map((rec: any, index: number) => (
                <div key={index} className="flex gap-4 items-start rounded-lg border p-4">
                  <div
                    className={`rounded-full p-2 ${
                      rec.priority === 'high'
                        ? 'bg-red-100 text-red-600'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          rec.priority === 'high'
                            ? 'destructive'
                            : rec.priority === 'medium'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {rec.priority} priority
                      </Badge>
                      <span className="text-sm font-medium capitalize">{rec.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Button className="flex-1">
                  Save to Library
                </Button>
                <Button variant="outline" className="flex-1">
                  Send to Video Generator
                </Button>
                <Button variant="outline" className="flex-1">
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!analysisResult && !isAnalyzing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Paste a TikTok URL above to get started with AI-powered analysis
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

