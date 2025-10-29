import { Twitter, Github, Youtube, Instagram } from 'lucide-react'

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-black border-t border-white/5 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <img 
                src="https://res.cloudinary.com/dolij7wjr/image/upload/v1761333298/ChatGPT_Image_Oct_24__2025__03_13_34_PM-removebg-preview_q7vsob.png" 
                alt="Viralify" 
                className="h-14 w-auto brightness-110"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Enterprise-grade TikTok intelligence powered by AI. Transform insights into revenue.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('beast-mode')} className="hover:text-white transition-colors">
                  Deep Analysis
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 Viralify. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/30 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Changelog
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

