'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Trash2,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Folder,
  Tag,
  MoreVertical,
} from 'lucide-react';
import { formatNumber, formatDateTime } from '@/lib/utils';

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const mockAnalyses = [
    {
      id: '1',
      creator: '@viralcreator',
      description: 'This is how you go viral in 2024',
      thumbnail: '/placeholder.svg',
      viralityScore: 94,
      views: '5.2M',
      likes: '890K',
      comments: '45K',
      shares: '120K',
      tags: ['viral', 'tutorial', 'trending'],
      folder: 'Best Performers',
      isFavorite: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: '2',
      creator: '@contentmaster',
      description: 'Quick editing hack everyone needs',
      thumbnail: '/placeholder.svg',
      viralityScore: 87,
      views: '3.1M',
      likes: '520K',
      comments: '28K',
      shares: '85K',
      tags: ['editing', 'hack', 'tutorial'],
      folder: 'Research',
      isFavorite: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
  ];

  const folders = ['All', 'Best Performers', 'Research', 'Competitors', 'Ideas'];
  const allTags = ['viral', 'tutorial', 'trending', 'editing', 'hack', 'comedy', 'dance'];

  const filteredAnalyses = mockAnalyses.filter(analysis => {
    const matchesSearch = analysis.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         analysis.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || analysis.folder === selectedFolder;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => analysis.tags.includes(tag));
    return matchesSearch && matchesFolder && matchesTags;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground">
            Your saved analyses and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <Card className="w-64 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Folders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder === 'All' ? 'all' : folder)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  (folder === 'All' && selectedFolder === 'all') || selectedFolder === folder
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <Folder className="h-4 w-4" />
                {folder}
              </button>
            ))}
          </CardContent>
          <CardHeader>
            <CardTitle className="text-sm">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAnalyses.map((analysis) => (
                <Card key={analysis.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={analysis.thumbnail}
                      alt={analysis.description}
                      className="w-full h-full object-cover"
                    />
                    {analysis.isFavorite && (
                      <Star className="absolute top-2 right-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                    )}
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-primary/90 text-white">
                        Score: {analysis.viralityScore}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{analysis.creator}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {analysis.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {analysis.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {analysis.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {analysis.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {analysis.shares}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {analysis.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(analysis.createdAt)}
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 hover:bg-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={analysis.thumbnail}
                          alt={analysis.description}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{analysis.creator}</h3>
                            {analysis.isFavorite && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {analysis.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
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
                        <div className="flex items-center gap-4">
                          <Badge>Score: {analysis.viralityScore}</Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {filteredAnalyses.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No analyses found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Try adjusting your filters or start analyzing videos
                </p>
                <Button>Analyze New Video</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

