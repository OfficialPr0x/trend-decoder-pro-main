import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check, Flame, Zap, Crown, Sparkles, Rocket } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter Plan',
    icon: Zap,
    monthlyPrice: 9.99,
    yearlyPrice: 99,
    credits: '1,500',
    description: 'Perfect for aspiring creators',
    features: [
      '1,500 analysis credits/month',
      'Quick Analysis (1 credit)',
      'Beast Mode (8 credits)',
      'AI-powered insights',
      'TikTok data extraction',
      'Chrome extension access',
      'Trend detection',
      'Email support',
    ],
    cta: 'Get Started',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/50',
    popular: false,
  },
  {
    name: 'Pro Plan',
    icon: Flame,
    monthlyPrice: 33,
    yearlyPrice: 330,
    credits: '5,000',
    description: 'For serious content creators',
    features: [
      '5,000 analysis credits/month',
      'Everything in Starter',
      'Unlimited Quick Analysis',
      '625 Beast Mode analyses',
      'AI image generation (DALL-E 3)',
      'Video storyboards',
      'Competitor analysis',
      'Priority support',
      'Advanced analytics dashboard',
      'Export detailed reports',
    ],
    cta: 'Go Pro',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/50',
    popular: true,
  },
  {
    name: 'Agency Plan',
    icon: Crown,
    monthlyPrice: 97,
    yearlyPrice: 970,
    credits: '20,000',
    description: 'For teams and agencies',
    features: [
      '20,000 analysis credits/month',
      'Everything in Pro',
      'Unlimited Beast Mode analyses',
      'Multi-user access (5 seats)',
      'Team collaboration tools',
      'White-label reports',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Live chat support',
      'Training & onboarding',
    ],
    cta: 'Scale Your Agency',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/50',
    popular: false,
  },
]

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyCost = monthlyPrice * 12
    const savings = monthlyCost - yearlyPrice
    const percentSaved = Math.round((savings / monthlyCost) * 100)
    return { savings: Math.round(savings), percentSaved }
  }

  return (
    <section id="pricing" className="relative py-32 px-4">
      {/* Limited Time Banner */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="glass-card rounded-full px-6 py-2 border-2 border-viralify-orange/50 animate-pulse-glow">
          <span className="text-sm md:text-base font-bold text-white">
            🔥 <span className="text-viralify-orange">LIMITED TIME:</span> Get 500 bonus credits on any annual plan
          </span>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Credit-Based Pricing.
            <span className="block text-gradient-accent">No Limits. Pure Power.</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-8">
            Raw, rich TikTok data that feeds your AI agents for viral content generation
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="inline-flex items-center gap-4 glass-card rounded-full p-2 border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                !isYearly
                  ? 'bg-gradient-to-r from-viralify-orange to-viralify-red text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 relative ${
                isYearly
                  ? 'bg-gradient-to-r from-viralify-orange to-viralify-red text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-viralify-cyan text-black text-xs font-black px-2 py-0.5 rounded-full">
                SAVE 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice)
            
            return (
              <div
                key={index}
                className={`glass-card rounded-3xl p-6 md:p-8 transition-all duration-300 relative ${
                  plan.popular 
                    ? 'border-3 border-viralify-orange enterprise-shadow md:scale-105' 
                    : 'border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-black bg-gradient-to-r from-viralify-orange to-viralify-red text-white uppercase animate-pulse-glow whitespace-nowrap">
                      🔥 Best Value
                    </span>
                  </div>
                )}

                <div className="text-center space-y-4 md:space-y-6">
                  <div className="space-y-3">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto`}>
                      <plan.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">{plan.name}</h3>
                    <p className="text-white/60 text-sm md:text-base font-medium">{plan.description}</p>
                  </div>

                  <div className="py-4 md:py-6">
                    {/* Credits Badge */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-viralify-cyan/10 border border-viralify-cyan/30">
                        <Sparkles className="w-4 h-4 text-viralify-cyan" />
                        <span className="text-viralify-cyan font-bold text-sm">{plan.credits} Credits/mo</span>
                      </span>
                    </div>
                    
                    <div className="flex items-baseline justify-center gap-1 md:gap-2">
                      <span className="text-white/50 text-xl md:text-2xl">$</span>
                      <span className="text-5xl md:text-6xl font-black text-white">
                        {isYearly ? (plan.yearlyPrice / 12).toFixed(2) : displayPrice}
                      </span>
                      <span className="text-white/50 text-base md:text-lg">/mo</span>
                    </div>
                    
                    {isYearly ? (
                      <div className="mt-2 space-y-1">
                        <p className="text-viralify-orange font-bold text-sm">
                          Save ${savings.savings}/year ({savings.percentSaved}% off)
                        </p>
                        <p className="text-white/40 text-xs">
                          ${plan.yearlyPrice} billed annually
                        </p>
                      </div>
                    ) : (
                      <p className="text-white/40 text-sm mt-2">
                        Billed monthly
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-viralify-cyan flex-shrink-0 mt-0.5 md:mt-1" />
                        <span className="text-white/80 text-sm md:text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 md:h-14 text-base md:text-lg font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-viralify-orange to-viralify-red text-white hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                  {plan.popular && (
                    <p className="text-white/40 text-xs mt-3">
                      🚀 143 creators joined in the last 24 hours
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 md:mt-20 text-center px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="glass-card rounded-xl p-5 md:p-6">
              <div className="w-10 h-10 rounded-lg bg-viralify-cyan/10 flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-5 h-5 text-viralify-cyan" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Instant Setup</h4>
              <p className="text-white/50 text-xs md:text-sm">Install extension & start analyzing in 60 seconds</p>
            </div>
            <div className="glass-card rounded-xl p-5 md:p-6">
              <div className="w-10 h-10 rounded-lg bg-viralify-purple/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-viralify-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Raw Data Access</h4>
              <p className="text-white/50 text-xs md:text-sm">Deep TikTok insights not available anywhere else</p>
            </div>
            <div className="glass-card rounded-xl p-5 md:p-6">
              <div className="w-10 h-10 rounded-lg bg-viralify-pink/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-viralify-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Cancel Anytime</h4>
              <p className="text-white/50 text-xs md:text-sm">No contracts. Pause or cancel whenever you want</p>
            </div>
          </div>
          
          {/* Value Proposition */}
          <div className="mt-12 max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8 border border-viralify-orange/30">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              Why Credit-Based Pricing?
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Unlike other tools that give you surface-level data, we provide <span className="text-viralify-cyan font-semibold">HARD, RAW, RICH TikTok intelligence</span> that powers your AI agents to create viral content. 
              Each credit unlocks deep analysis including competitor research, audience insights, trend detection, and AI-generated content strategies. 
              <span className="text-viralify-orange font-semibold"> You're not buying features—you're buying results.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

