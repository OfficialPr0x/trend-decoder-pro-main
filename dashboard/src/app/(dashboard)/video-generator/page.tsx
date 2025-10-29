'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Video,
  Sparkles,
  Play,
  Download,
  Check,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function VideoGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generationQueue, setGenerationQueue] = useState([
    {
      id: '1',
      template: 'Faceless Viral',
      status: 'completed',
      progress: 100,
      videoUrl: '/placeholder.mp4',
      thumbnailUrl: '/placeholder.svg',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '2',
      template: 'Stats Reveal',
      status: 'processing',
      progress: 65,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: '3',
      template: 'Trending Recap',
      status: 'queued',
      progress: 0,
      createdAt: new Date().toISOString(),
    },
  ]);

  const templates = [
    {
      id: 'faceless-viral',
      name: 'Faceless Viral',
      description: 'Text overlay animations with trending music and effects',
      preview: '/placeholder.svg',
      duration: '15-60s',
      popular: true,
    },
    {
      id: 'stats-reveal',
      name: 'Stats Reveal',
      description: 'Animated statistics and data visualizations',
      preview: '/placeholder.svg',
      duration: '10-30s',
      popular: true,
    },
    {
      id: 'comparison',
      name: 'Comparison',
      description: 'Side-by-side comparisons with smooth transitions',
      preview: '/placeholder.svg',
      duration: '20-45s',
      popular: false,
    },
    {
      id: 'trending-recap',
      name: 'Trending Recap',
      description: 'Top 10 recap videos with engaging visuals',
      preview: '/placeholder.svg',
      duration: '30-60s',
      popular: true,
    },
  ];

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    
    // TODO: Implement video generation queue
    console.log('Generating video with template:', selectedTemplate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Video Generator</h1>
        <p className="text-muted-foreground">
          Create professional faceless videos using AI and templates
        </p>
      </div>

      {/* Usage Stats */}
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Videos This Month</div>
            <div className="text-sm text-muted-foreground">8 / 2 used</div>
          </div>
          <Progress value={(8 / 2) * 100} className="h-2" />
          <p className="mt-2 text-xs text-orange-600">
            You've exceeded your free tier limit. Upgrade to Pro for 50 videos/month.
          </p>
          <Button size="sm" className="mt-3">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Template Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
              <CardDescription>
                Select a template to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {template.popular && (
                    <Badge className="absolute top-2 right-2">Popular</Badge>
                  )}
                  <div className="flex gap-4">
                    <div className="w-24 h-16 bg-muted rounded flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {template.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Customization */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customize Video</CardTitle>
              <CardDescription>
                {selectedTemplate
                  ? 'Customize your video settings'
                  : 'Select a template to customize'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTemplate ? (
                <>
                  <div className="space-y-2">
                    <Label>Title Text</Label>
                    <Input placeholder="Enter your video title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Add a description" />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#3b82f6" className="h-10 w-20" />
                      <Input defaultValue="#3b82f6" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option>15 seconds</option>
                      <option>30 seconds</option>
                      <option>45 seconds</option>
                      <option>60 seconds</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Music</Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option>Trending Track 1</option>
                      <option>Trending Track 2</option>
                      <option>Trending Track 3</option>
                      <option>No Music</option>
                    </select>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleGenerate}>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Video
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Video className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select a template to start customizing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generation Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Queue</CardTitle>
          <CardDescription>Track your video generation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generationQueue.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {item.status === 'completed' ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : item.status === 'processing' ? (
                    <Clock className="h-6 w-6 text-blue-600 animate-spin" />
                  ) : (
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.template}</h3>
                    <Badge
                      variant={
                        item.status === 'completed'
                          ? 'default'
                          : item.status === 'processing'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  {item.status === 'processing' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Processing...</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  )}
                </div>
                {item.status === 'completed' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

