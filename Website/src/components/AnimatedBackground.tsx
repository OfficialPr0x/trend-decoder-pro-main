export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Refined Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0014] to-black" />
      
      {/* Subtle Animated Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-viralify-purple/15 rounded-full blur-[120px] animate-float" 
           style={{ animationDuration: '20s' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-viralify-pink/10 rounded-full blur-[100px] animate-float" 
           style={{ animationDuration: '25s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-viralify-cyan/8 rounded-full blur-[100px] animate-float" 
           style={{ animationDuration: '30s', animationDelay: '5s' }} />
      
      {/* Minimal Floating Particles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
    </div>
  )
}

