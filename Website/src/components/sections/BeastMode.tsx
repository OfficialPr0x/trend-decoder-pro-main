import { Button } from '../ui/button'
import { Zap, Target, TrendingUp, Users, Trophy, Music, Hash, MessageSquare, Heart, BarChart3, ArrowRight } from 'lucide-react'

const endpoints = [
  { icon: Target, label: 'Video Details', color: 'text-red-400' },
  { icon: MessageSquare, label: '50 Comments', color: 'text-blue-400' },
  { icon: Trophy, label: '16 Related Videos', color: 'text-orange-400' },
  { icon: Users, label: 'Creator Profile', color: 'text-purple-400' },
  { icon: BarChart3, label: 'Top 20 Posts', color: 'text-pink-400' },
  { icon: Music, label: 'Music Trends', color: 'text-green-400' },
  { icon: Hash, label: 'Hashtag Analysis', color: 'text-cyan-400' },
  { icon: TrendingUp, label: 'Trending Videos', color: 'text-yellow-400' },
]

const insights = [
  {
    title: '🚀 Virality Analysis',
    items: ['Hook Strength', 'Shareability Score', 'Engagement Quality', 'Viral Potential', 'Rewatch Value'],
    gradient: 'from-red-500/30 to-orange-500/30',
  },
  {
    title: '💬 Audience Intelligence',
    items: ['Comment Sentiment', 'Engagement Quality', 'Common Themes', 'Top Questions', 'Response Rate'],
    gradient: 'from-blue-500/30 to-cyan-500/30',
  },
  {
    title: '🏆 Competition Analysis',
    items: ['Market Position', 'Competitor Views', 'Engagement Rates', 'Competition Level', 'Performance Gap'],
    gradient: 'from-orange-500/30 to-red-500/30',
  },
  {
    title: '👤 Creator Strategy',
    items: ['Posting Patterns', 'Content Consistency', 'Performance Trends', 'Best Practices', 'Strategy Type'],
    gradient: 'from-purple-500/30 to-pink-500/30',
  },
  {
    title: '📈 Trend Alignment',
    items: ['Music Trending Status', 'Hashtag Popularity', 'Challenge Performance', 'Trend Score', 'Timing Analysis'],
    gradient: 'from-green-500/30 to-emerald-500/30',
  },
  {
    title: '💡 Recommendations',
    items: ['High Priority Actions', 'Medium Priority Tasks', 'Quick Wins', 'Long-term Strategy', 'Optimization Tips'],
    gradient: 'from-yellow-500/30 to-amber-500/30',
  },
]

export const BeastMode = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="beast-mode" className="relative py-32 px-4 overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-viralify-purple/5 via-transparent to-viralify-pink/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-viralify-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-viralify-pink/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-viralify-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-viralify-purple"></span>
            </span>
            <span className="text-sm font-medium text-white/70">
              Deep Analysis
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-tight">
            Comprehensive intelligence
            <span className="block text-gradient-accent">across 8 data sources</span>
          </h2>
          
          <p className="text-lg text-white/50 leading-relaxed">
            Our deep analysis mode aggregates data from 8 specialized API endpoints to provide 
            institutional-grade market intelligence for content creators.
          </p>
        </div>

        {/* 8 Endpoints Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-10 text-white">
            8 Data Sources
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="glass-card hover:glass-card-hover rounded-xl p-5 transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <endpoint.icon className={`w-8 h-8 ${endpoint.color} mb-3 mx-auto group-hover:scale-110 transition-transform`} />
                <p className="text-white/80 text-sm font-medium text-center">{endpoint.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-10 text-white">
            6 Intelligence Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="glass-card hover:glass-card-hover rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                <h4 className="text-white text-lg font-semibold mb-4">{insight.title}</h4>
                <ul className="space-y-2">
                  {insight.items.map((item, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                      <svg className="w-4 h-4 text-viralify-cyan mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 mb-12 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Mode */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="text-xl font-semibold text-white">Quick Analysis</h4>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-white">1</span>
                <span className="text-white/50 text-sm">credit</span>
              </div>
              <ul className="text-sm text-white/50 space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic metrics
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI insights
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Under 1 second
                </li>
              </ul>
            </div>

            {/* Deep Analysis */}
            <div className="text-center space-y-4 relative">
              <div className="absolute -top-3 -right-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-viralify-purple to-viralify-pink text-white">
                  Recommended
                </span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-viralify-purple/20 to-viralify-pink/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-viralify-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white">Deep Analysis</h4>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-white">8</span>
                <span className="text-white/50 text-sm">credits</span>
              </div>
              <ul className="text-sm text-white/50 space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  8 API endpoints
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  50+ data points
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-viralify-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Competitor analysis
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 font-semibold text-base h-14 px-8 enterprise-shadow"
            onClick={() => scrollToSection('pricing')}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-white/40 mt-4 text-sm">
            500 free credits monthly • No credit card required
          </p>
        </div>
      </div>
    </section>
  )
}

