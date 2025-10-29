import { Button } from '../ui/button'
import { ArrowRight, Clock, TrendingUp, Zap } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-viralify-orange/20 via-viralify-purple/10 to-viralify-pink/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-viralify-orange/30 rounded-full blur-[200px] animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 md:px-6 py-2 md:py-3 border-2 border-viralify-red/50 animate-pulse-glow">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-viralify-orange" />
            <span className="text-xs md:text-base font-bold text-white">
              <span className="text-viralify-orange">LIMITED OFFER:</span> <span className="hidden sm:inline">500 bonus credits on annual plans</span><span className="sm:hidden">Save 17% yearly</span>
            </span>
          </div>

          {/* Power Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight text-white px-4">
            Your Competitors Are
            <span className="block text-gradient-accent">Already Using This</span>
          </h2>

          {/* Fear of Missing Out */}
          <p className="text-lg md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed font-bold px-4">
            Every day you wait is another day they're <span className="text-viralify-orange">stealing your audience</span> with better data. 
            Stop falling behind.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto py-6 md:py-8">
            <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-viralify-purple/30">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-viralify-cyan mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white mb-1">412</div>
              <div className="text-white/50 text-xs md:text-sm">Joined Today</div>
            </div>
            <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-viralify-orange/30">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-viralify-orange mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white mb-1">10x</div>
              <div className="text-white/50 text-xs md:text-sm">Faster Growth</div>
            </div>
            <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-viralify-pink/30">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-viralify-pink mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white mb-1">60sec</div>
              <div className="text-white/50 text-xs md:text-sm">Setup Time</div>
            </div>
          </div>

          {/* CTA Button - MASSIVE */}
          <div className="pt-6 px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-viralify-orange to-viralify-red text-white hover:scale-110 font-black text-base md:text-xl lg:text-2xl h-16 md:h-20 px-8 md:px-16 enterprise-shadow animate-pulse-glow w-full sm:w-auto"
            >
              <span className="hidden md:inline">Start with 1,500 Credits - Only $9.99/mo</span>
              <span className="md:hidden">Get Started - $9.99/mo</span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-2" />
            </Button>
            <p className="text-white/60 text-xs md:text-sm mt-4">
              ✓ Instant access to raw data  •  ✓ Cancel anytime  •  ✓ 60-second setup
            </p>
          </div>

          {/* Final Social Proof */}
          <div className="pt-12 px-4">
            <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-white/10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-viralify-purple to-viralify-pink border-2 border-black"
                    />
                  ))}
                </div>
              </div>
              <p className="text-base md:text-xl text-white/90 font-semibold">
                <span className="text-viralify-cyan font-black">2,573 creators</span> joined this week.
                <br />
                <span className="text-white/60 text-sm md:text-base">Don't be the one left behind.</span>
              </p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="pt-8 px-4">
            <div className="inline-flex items-center gap-2 md:gap-3 glass-card rounded-full px-4 md:px-8 py-3 md:py-4 border-2 border-viralify-cyan/50 max-w-full">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-viralify-cyan/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl md:text-2xl">🛡️</span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-sm md:text-lg">30-Day Money-Back Guarantee</div>
                <div className="text-white/60 text-xs md:text-sm">Try it risk-free. Love it or get a full refund.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

