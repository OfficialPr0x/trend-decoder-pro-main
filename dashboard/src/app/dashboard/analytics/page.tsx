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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white tracking-tight">Deep Analytics</h1>
        <p className="text-lg text-gray-400 font-medium mt-2">
          AI-powered TikTok video analysis and insights
        </p>
      </div>

      {/* URL Input */}
      <Card className="glass-effect border-white/10 bg-gradient-to-br from-[#A855F7]/5 to-[#00D9FF]/5">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-white">Analyze TikTok Video</CardTitle>
          <CardDescription className="text-base text-gray-400 font-medium">
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
                className="h-14 text-base bg-white/5 border-white/20 focus:border-[#A855F7]"
              />
            </div>
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !tiktokUrl}
              className="h-14 px-8 bg-gradient-to-r from-[#FF385C] to-[#FF1744] hover:from-[#FF1744] hover:to-[#FF385C] text-white font-black uppercase tracking-wide transition-all duration-200 shadow-lg shadow-[#FF385C]/40"
            >
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
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
          <Card className="border-0 bg-gradient-to-br from-[#A855F7] to-[#7C3AED] shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-white uppercase tracking-wide">Virality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <div className="text-8xl font-black text-white drop-shadow-2xl">
                    {analysisResult.viralityScore}
                  </div>
                  <div className="text-center text-base text-white/80 font-bold mt-2 uppercase tracking-wide">
                    out of 100
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-white" />
                  <div className="text-2xl font-black text-white">
                    {analysisResult.metadata.views}
                  </div>
                  <div className="text-xs text-white/80 font-bold uppercase tracking-wide mt-1">Views</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-white" />
                  <div className="text-2xl font-black text-white">
                    {analysisResult.metadata.likes}
                  </div>
                  <div className="text-xs text-white/80 font-bold uppercase tracking-wide mt-1">Likes</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-white" />
                  <div className="text-2xl font-black text-white">
                    {analysisResult.metadata.comments}
                  </div>
                  <div className="text-xs text-white/80 font-bold uppercase tracking-wide mt-1">Comments</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Share2 className="h-6 w-6 mx-auto mb-2 text-white" />
                  <div className="text-2xl font-black text-white">
                    {analysisResult.metadata.shares}
                  </div>
                  <div className="text-xs text-white/80 font-bold uppercase tracking-wide mt-1">Shares</div>
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
          <Card className="glass-effect border-white/10">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Button className="flex-1 h-12 bg-gradient-to-r from-[#00D9FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D9FF] font-black uppercase tracking-wide shadow-lg shadow-[#00D9FF]/40">
                  Save to Library
                </Button>
                <Button className="flex-1 h-12 bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#A855F7] font-black uppercase tracking-wide shadow-lg shadow-[#A855F7]/40">
                  Send to Generator
                </Button>
                <Button className="flex-1 h-12 bg-gradient-to-r from-[#EC4899] to-[#DB2777] hover:from-[#DB2777] hover:to-[#EC4899] font-black uppercase tracking-wide shadow-lg shadow-[#EC4899]/40">
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!analysisResult && !isAnalyzing && (
        <Card className="glass-effect border-white/10">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF385C] to-[#F97316] blur-3xl opacity-30 rounded-full"></div>
              <Search className="h-20 w-20 text-[#FF385C] relative z-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No Analysis Yet</h3>
            <p className="text-gray-400 text-center mb-6 font-medium max-w-md">
              Paste a TikTok URL above to get started with AI-powered analysis
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

