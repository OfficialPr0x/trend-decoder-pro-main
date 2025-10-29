import { Star, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    followers: "2.3M",
    image: "SC",
    quote: "Viralify helped me decode my competitor's strategy. Went from 50K to 2.3M followers in 4 months. This tool is INSANE.",
    results: "+2.2M followers",
    color: "from-viralify-purple to-viralify-pink"
  },
  {
    name: "Marcus Johnson",
    handle: "@marcusbuilds",
    followers: "890K",
    image: "MJ",
    quote: "I was spending 20 hours a week on research. Now I spend 2. The AI analysis is scary accurate. My engagement tripled.",
    results: "3x engagement",
    color: "from-viralify-orange to-viralify-red"
  },
  {
    name: "Emma Rodriguez",
    handle: "@emmavibes",
    followers: "1.5M",
    image: "ER",
    quote: "Finally cracked the TikTok algorithm. The deep analysis feature showed me exactly what hooks to use. Game changer.",
    results: "+$47K revenue",
    color: "from-viralify-cyan to-viralify-purple"
  }
]

export const Testimonials = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Real Creators.
            <span className="block text-gradient-accent">Real Results.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Join thousands of creators who've already transformed their TikTok game
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card hover:glass-card-hover rounded-2xl p-8 transition-all duration-300 border border-white/10 hover:border-viralify-purple/30"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-viralify-orange text-viralify-orange" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 text-base leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Results Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-viralify-purple/20 to-viralify-pink/20 rounded-full px-4 py-2 mb-6 border border-viralify-purple/30">
                <TrendingUp className="w-4 h-4 text-viralify-cyan" />
                <span className="text-white font-bold text-sm">{testimonial.results}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{testimonial.image}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">{testimonial.handle} • {testimonial.followers}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="text-center px-4">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/10 max-w-full">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-viralify-purple to-viralify-pink border-2 border-black"
                />
              ))}
            </div>
            <span className="text-white/70 text-xs md:text-sm font-medium ml-1 md:ml-2">
              Join <span className="text-white font-bold">2,573+</span> creators this week
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

