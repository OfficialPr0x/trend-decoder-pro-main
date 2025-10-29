import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Users, Zap, Award } from 'lucide-react'

const StatCard = ({ icon: Icon, value, label, suffix = '', delay = 0 }: any) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div
      ref={ref}
      className="glass-card hover:glass-card-hover rounded-2xl p-8 transition-all duration-300 text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-viralify-purple/20 to-viralify-pink/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-viralify-cyan" />
      </div>
      <div className="text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium">{label}</div>
    </div>
  )
}

export const Stats = () => {
  return (
    <section id="stats" className="relative py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Trusted by content creators worldwide
          </h2>
          <p className="text-lg text-white/50">
            Join thousands of creators using Viralify to grow their TikTok presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <StatCard
            icon={TrendingUp}
            value={500}
            suffix="+"
            label="Monthly Credits"
            delay={0}
          />
          <StatCard
            icon={Zap}
            value={8}
            label="Deep Endpoints"
            delay={100}
          />
          <StatCard
            icon={Users}
            value={1000}
            suffix="+"
            label="Active Users"
            delay={200}
          />
          <StatCard
            icon={Award}
            value={95}
            suffix="%"
            label="Success Rate"
            delay={300}
          />
        </div>
      </div>
    </section>
  )
}

