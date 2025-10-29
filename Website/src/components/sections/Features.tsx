import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Zap, Sparkles, Image, Video, TrendingUp, BarChart3, Users, Trophy, Music, Hash, MessageSquare, Heart } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Quick Analysis',
    description: 'Get instant insights in under 1 second. Perfect for quick checks and browsing.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    credits: '1 credit',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Engagement scores, viral hooks, trending elements, and personalized recommendations.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    credits: 'Included',
  },
  {
    icon: Users,
    title: 'Audience Intelligence',
    description: 'Analyze up to 50 comments to understand audience sentiment and engagement quality.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: Trophy,
    title: 'Competition Analysis',
    description: 'Compare with 16 related videos. See how you stack up against competitors.',
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: TrendingUp,
    title: 'Creator Strategy',
    description: "Analyze creator's top 20 posts to identify patterns and winning strategies.",
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: Music,
    title: 'Trend Alignment',
    description: 'Track music trends, hashtag challenges, and viral sounds in real-time.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    borderColor: 'border-green-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: Image,
    title: 'AI Image Generation',
    description: 'Create stunning viral images with DALL-E 3 and Gemini. Multiple aspect ratios.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    iconColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    credits: 'Separate',
  },
  {
    icon: Video,
    title: 'Video Storyboards',
    description: 'Generate detailed video storyboards with AI. Perfect for planning viral content.',
    gradient: 'from-red-500/20 to-pink-500/20',
    iconColor: 'text-red-400',
    borderColor: 'border-red-500/30',
    credits: 'Separate',
  },
  {
    icon: Heart,
    title: 'Content Preferences',
    description: 'Understand what type of content resonates with your audience.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: MessageSquare,
    title: 'Comment Insights',
    description: 'AI-powered analysis of comment themes, sentiment, and engagement quality.',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: Hash,
    title: 'Hashtag Research',
    description: 'Find trending hashtags and challenges to maximize your reach.',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    credits: 'Beast Mode',
  },
  {
    icon: Sparkles,
    title: 'Recommendations',
    description: 'Get 4-6 specific, actionable recommendations to improve your content.',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    credits: 'Always',
  },
]

export const Features = () => {
  return (
    <section id="features" className="relative py-32 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">
              Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Everything you need to
            <span className="block text-gradient-accent">dominate TikTok</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            From instant insights to deep competitive analysis, our platform provides enterprise-grade intelligence at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card hover:glass-card-hover rounded-2xl p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{feature.credits}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

