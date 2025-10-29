import { Hero } from './components/sections/Hero'
import { Testimonials } from './components/sections/Testimonials'
import { Problem } from './components/sections/Problem'
import { Features } from './components/sections/Features'
import { BeastMode } from './components/sections/BeastMode'
import { HowItWorks } from './components/sections/HowItWorks'
import { Pricing } from './components/sections/Pricing'
import { Stats } from './components/sections/Stats'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'
import { Navbar } from './components/Navbar'
import { AnimatedBackground } from './components/AnimatedBackground'
import { SalesPopup } from './components/SalesPopup'

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Testimonials />
        <Problem />
        <Stats />
        <Features />
        <BeastMode />
        <Pricing />
        <CTA />
      </main>
      <Footer />
      <SalesPopup />
    </div>
  )
}

export default App

