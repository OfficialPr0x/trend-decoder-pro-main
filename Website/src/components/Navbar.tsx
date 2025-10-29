import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer group" onClick={() => scrollToSection('hero')}>
          <img 
            src="https://res.cloudinary.com/dolij7wjr/image/upload/v1761333298/ChatGPT_Image_Oct_24__2025__03_13_34_PM-removebg-preview_q7vsob.png" 
            alt="Viralify" 
            className="h-14 md:h-20 w-auto hover:opacity-90 transition-opacity brightness-110"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 hidden sm:flex text-xs md:text-sm"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-white/90 font-medium text-xs md:text-sm h-9 md:h-10 px-3 md:px-4"
            onClick={() => scrollToSection('pricing')}
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

