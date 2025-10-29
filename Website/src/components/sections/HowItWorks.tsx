import { Card } from '../ui/card'
import { Link, Zap, Flame, Sparkles, Download, TrendingUp, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Install Extension',
    description: 'Add Viralify Chrome extension in seconds. No complex setup.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
  },
  {
    number: '02',
    icon: Link,
    title: 'Extract TikTok URL',
    description: 'Click "Extract URL" on any TikTok video or paste any URL manually.',
    color: 'from-cyan-500 to-blue-500',
    iconColor: 'text-cyan-400',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Choose Your Mode',
    description: 'Quick (1 credit) for instant insights or Beast Mode (8 credits) for deep analysis.',
    color: 'from-yellow-500 to-orange-500',
    iconColor: 'text-yellow-400',
  },
  {
    number: '04',
    icon: Flame,
    title: 'Analyze & Learn',
    description: 'Get AI-powered insights, recommendations, and competitive intelligence in seconds.',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Create Content',
    description: 'Use AI to generate viral images and video storyboards based on insights.',
    color: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-400',
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Go Viral',
    description: 'Apply recommendations, publish content, and watch your engagement soar!',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">
              Workflow
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Get started in
            <span className="block text-gradient-accent">minutes, not hours</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A streamlined workflow designed for efficiency and results.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="glass-card hover:glass-card-hover rounded-2xl p-8 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block flex-shrink-0 self-center">
                      <ArrowRight className="w-5 h-5 text-white/20" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Setup time: <span className="text-white font-semibold">under 2 minutes</span>
          </p>
        </div>
      </div>
    </section>
  )
}

