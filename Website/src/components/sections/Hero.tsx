import { Button } from '../ui/button'
import { ArrowRight, Play, TrendingUp, Clock, DollarSign } from 'lucide-react'

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Urgent Banner */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 max-w-[90%] md:max-w-none">
        <div className="glass-card rounded-full px-4 md:px-6 py-1.5 md:py-2 border-2 border-viralify-orange/50 animate-pulse-glow">
          <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
            🔥 <span className="text-viralify-orange">412 creators</span> joined in the last 24 hours
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Main Headline - POWER COPY */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
            <span className="block text-white mb-2">
              The Secret Weapon
            </span>
            <span className="block text-white mb-2">
              Behind Every Viral
            </span>
            <span className="block">
              <span className="text-gradient-accent">TikTok Creator</span>
            </span>
          </h1>

          {/* Power Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-semibold px-4">
            Access <span className="text-viralify-cyan">raw TikTok intelligence</span> that powers AI agents for viral content. 
            Deep data analysis, competitor research, and AI-powered generation—
            <span className="text-viralify-orange"> all in one credit-based platform.</span>
          </p>

          {/* Social Proof Numbers */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-6 px-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">8</div>
              <div className="text-white/50 text-xs md:text-sm">Deep API Endpoints</div>
            </div>
            <div className="h-10 md:h-12 w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-viralify-cyan mb-1">50+</div>
              <div className="text-white/50 text-xs md:text-sm">Data Points/Video</div>
            </div>
            <div className="h-10 md:h-12 w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-viralify-orange mb-1">2,500+</div>
              <div className="text-white/50 text-xs md:text-sm">Active Creators</div>
            </div>
          </div>

          {/* CTA Buttons - HIGH CONTRAST */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 px-4">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-viralify-orange to-viralify-red text-white hover:scale-105 font-bold text-base md:text-lg h-14 md:h-16 px-6 md:px-10 w-full sm:w-auto enterprise-shadow animate-pulse-glow"
              onClick={() => scrollToSection('pricing')}
            >
              <span className="hidden sm:inline">Start with 1,500 Credits - $9.99/mo</span>
              <span className="sm:hidden">Get Started - $9.99/mo</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-card hover:glass-card-hover font-semibold text-sm md:text-base h-14 md:h-16 px-6 md:px-8 w-full sm:w-auto border-white/20 text-white group"
              onClick={() => scrollToSection('features')}
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
              See What You Get
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="pt-6 md:pt-8 px-4">
            <p className="text-white/40 text-xs md:text-sm mb-3 md:mb-4">Trusted by creators & agencies from:</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-60">
              <div className="text-white font-bold text-sm md:text-lg">TikTok</div>
              <div className="text-white font-bold text-sm md:text-lg">Instagram</div>
              <div className="text-white font-bold text-sm md:text-lg">YouTube</div>
              <div className="text-white font-bold text-sm md:text-lg">Shopify</div>
            </div>
          </div>

          {/* Value Props - BENEFIT FOCUSED */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 md:pt-16 max-w-5xl mx-auto px-4">
            <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 text-left border-2 border-viralify-purple/20 hover:border-viralify-purple/50 transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-viralify-purple to-viralify-pink flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3">Save 20+ Hours/Week</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Stop guessing. Get instant access to raw TikTok data that feeds your AI agents with actionable insights.
              </p>
            </div>
            <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 text-left border-2 border-viralify-orange/20 hover:border-viralify-orange/50 transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-viralify-orange to-viralify-red flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3">10x Your Engagement</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Reverse-engineer viral content. Access deep analytics no other tool provides. Create what actually works.
              </p>
            </div>
            <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 text-left border-2 border-viralify-cyan/20 hover:border-viralify-cyan/50 transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-viralify-cyan to-viralify-purple flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3">Scale Revenue Fast</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Turn data into dollars. Credit-based pricing means you only pay for results, not empty features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

