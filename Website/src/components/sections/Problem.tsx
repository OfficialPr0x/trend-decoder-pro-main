import { X, Check, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

export const Problem = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-32 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Stop Guessing.
            <span className="block text-gradient-accent">Start Winning.</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Every hour you spend guessing is an hour your competitors are winning
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Without Viralify */}
          <div className="glass-card rounded-3xl p-8 border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Without Viralify</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Spending 20+ hours/week on manual research",
                "Guessing what content will perform",
                "Copying competitors blindly (and failing)",
                "No idea what's actually trending",
                "Wasting money on content that flops",
                "Stuck at the same follower count",
                "Missing viral trends by days/weeks"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Viralify */}
          <div className="glass-card rounded-3xl p-8 border-2 border-viralify-cyan/50 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-viralify-orange to-viralify-red text-white">
                YOU
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-viralify-cyan/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-viralify-cyan" />
              </div>
              <h3 className="text-2xl font-black text-white">With Viralify</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Analyze ANY video in under 1 second",
                "Know exactly what will go viral (before you post)",
                "Reverse-engineer competitor success",
                "Real-time trend alerts & insights",
                "Only create content that CONVERTS",
                "Grow 10x faster with data",
                "Stay ahead of every trend"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-viralify-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-white leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 border-2 border-viralify-purple/30 text-center">
          <h3 className="text-3xl font-black text-white mb-4">The Math is Simple</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-5xl font-black text-white mb-2">20</div>
              <div className="text-white/60">Hours saved per week</div>
            </div>
            <div>
              <div className="text-5xl font-black text-viralify-cyan mb-2">10x</div>
              <div className="text-white/60">Faster content creation</div>
            </div>
            <div>
              <div className="text-5xl font-black text-viralify-orange mb-2">$47K</div>
              <div className="text-white/60">Avg. revenue increase</div>
            </div>
          </div>
          <p className="text-xl text-white/80 mb-6">
            If you value your time at just <span className="text-viralify-cyan font-bold">$50/hour</span>, 
            Viralify pays for itself in the <span className="text-viralify-orange font-bold">first week</span>.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-viralify-orange to-viralify-red text-white hover:scale-105 font-bold text-lg h-16 px-10"
            onClick={() => scrollToSection('pricing')}
          >
            Start Your Free Trial Now
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

