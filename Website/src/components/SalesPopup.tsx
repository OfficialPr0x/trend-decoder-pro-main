import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// 100 diverse global names with their countries
const globalCustomers = [
  { name: 'Sarah Johnson', location: 'Los Angeles, USA', flag: '🇺🇸' },
  { name: 'Miguel Rodriguez', location: 'Mexico City, Mexico', flag: '🇲🇽' },
  { name: 'Emma Thompson', location: 'London, UK', flag: '🇬🇧' },
  { name: 'Lucas Silva', location: 'São Paulo, Brazil', flag: '🇧🇷' },
  { name: 'Yuki Tanaka', location: 'Tokyo, Japan', flag: '🇯🇵' },
  { name: 'Sophie Martin', location: 'Paris, France', flag: '🇫🇷' },
  { name: 'Ahmed Hassan', location: 'Dubai, UAE', flag: '🇦🇪' },
  { name: 'Isabella Romano', location: 'Rome, Italy', flag: '🇮🇹' },
  { name: 'Chen Wei', location: 'Shanghai, China', flag: '🇨🇳' },
  { name: 'Maria Garcia', location: 'Madrid, Spain', flag: '🇪🇸' },
  { name: 'James Wilson', location: 'Sydney, Australia', flag: '🇦🇺' },
  { name: 'Priya Patel', location: 'Mumbai, India', flag: '🇮🇳' },
  { name: 'Kim Min-jun', location: 'Seoul, South Korea', flag: '🇰🇷' },
  { name: 'Anna Kowalski', location: 'Warsaw, Poland', flag: '🇵🇱' },
  { name: 'David Cohen', location: 'Tel Aviv, Israel', flag: '🇮🇱' },
  { name: 'Fatima Al-Mansoori', location: 'Abu Dhabi, UAE', flag: '🇦🇪' },
  { name: 'Oliver Schmidt', location: 'Berlin, Germany', flag: '🇩🇪' },
  { name: 'Aisha Okonkwo', location: 'Lagos, Nigeria', flag: '🇳🇬' },
  { name: 'Ryan O\'Connor', location: 'Dublin, Ireland', flag: '🇮🇪' },
  { name: 'Nina Petrov', location: 'Moscow, Russia', flag: '🇷🇺' },
  { name: 'Carlos Mendez', location: 'Buenos Aires, Argentina', flag: '🇦🇷' },
  { name: 'Lily Chan', location: 'Hong Kong', flag: '🇭🇰' },
  { name: 'Mohammed Al-Rashid', location: 'Riyadh, Saudi Arabia', flag: '🇸🇦' },
  { name: 'Helena Andersson', location: 'Stockholm, Sweden', flag: '🇸🇪' },
  { name: 'Marco Rossi', location: 'Milan, Italy', flag: '🇮🇹' },
  { name: 'Zara Khan', location: 'Karachi, Pakistan', flag: '🇵🇰' },
  { name: 'Thomas Müller', location: 'Munich, Germany', flag: '🇩🇪' },
  { name: 'Camila Santos', location: 'Rio de Janeiro, Brazil', flag: '🇧🇷' },
  { name: 'Alex Ivanov', location: 'St. Petersburg, Russia', flag: '🇷🇺' },
  { name: 'Maya Cohen', location: 'Toronto, Canada', flag: '🇨🇦' },
  { name: 'Viktor Novak', location: 'Prague, Czech Republic', flag: '🇨🇿' },
  { name: 'Jasmine Wong', location: 'Singapore', flag: '🇸🇬' },
  { name: 'Diego Fernandez', location: 'Barcelona, Spain', flag: '🇪🇸' },
  { name: 'Amara Diallo', location: 'Dakar, Senegal', flag: '🇸🇳' },
  { name: 'Liam Murphy', location: 'Vancouver, Canada', flag: '🇨🇦' },
  { name: 'Sofia Popescu', location: 'Bucharest, Romania', flag: '🇷🇴' },
  { name: 'Hassan Farah', location: 'Cairo, Egypt', flag: '🇪🇬' },
  { name: 'Grace Kim', location: 'Busan, South Korea', flag: '🇰🇷' },
  { name: 'Andre Dubois', location: 'Montreal, Canada', flag: '🇨🇦' },
  { name: 'Mei Lin', location: 'Beijing, China', flag: '🇨🇳' },
  { name: 'Pablo Morales', location: 'Lima, Peru', flag: '🇵🇪' },
  { name: 'Zoe Richards', location: 'Auckland, New Zealand', flag: '🇳🇿' },
  { name: 'Ibrahim Yilmaz', location: 'Istanbul, Turkey', flag: '🇹🇷' },
  { name: 'Charlotte Larsen', location: 'Copenhagen, Denmark', flag: '🇩🇰' },
  { name: 'Mateo Lopez', location: 'Santiago, Chile', flag: '🇨🇱' },
  { name: 'Nadia Sharma', location: 'New Delhi, India', flag: '🇮🇳' },
  { name: 'Felix Berg', location: 'Oslo, Norway', flag: '🇳🇴' },
  { name: 'Luna Nguyen', location: 'Hanoi, Vietnam', flag: '🇻🇳' },
  { name: 'Oscar Jimenez', location: 'Bogotá, Colombia', flag: '🇨🇴' },
  { name: 'Alina Volkov', location: 'Kiev, Ukraine', flag: '🇺🇦' },
  { name: 'Ryan Chen', location: 'Taipei, Taiwan', flag: '🇹🇼' },
  { name: 'Elisa Bianchi', location: 'Florence, Italy', flag: '🇮🇹' },
  { name: 'Tariq Al-Zahrani', location: 'Jeddah, Saudi Arabia', flag: '🇸🇦' },
  { name: 'Isla MacLeod', location: 'Edinburgh, UK', flag: '🇬🇧' },
  { name: 'Rafael Costa', location: 'Lisbon, Portugal', flag: '🇵🇹' },
  { name: 'Ananya Rao', location: 'Bangalore, India', flag: '🇮🇳' },
  { name: 'Max Fischer', location: 'Zurich, Switzerland', flag: '🇨🇭' },
  { name: 'Layla Mansour', location: 'Beirut, Lebanon', flag: '🇱🇧' },
  { name: 'Jack Taylor', location: 'Melbourne, Australia', flag: '🇦🇺' },
  { name: 'Valentina Rossi', location: 'Naples, Italy', flag: '🇮🇹' },
  { name: 'Mohammed Abdi', location: 'Nairobi, Kenya', flag: '🇰🇪' },
  { name: 'Ava Nielsen', location: 'Amsterdam, Netherlands', flag: '🇳🇱' },
  { name: 'Diego Ramirez', location: 'Guadalajara, Mexico', flag: '🇲🇽' },
  { name: 'Yuna Park', location: 'Tokyo, Japan', flag: '🇯🇵' },
  { name: 'Marcus Johnson', location: 'Chicago, USA', flag: '🇺🇸' },
  { name: 'Léa Dubois', location: 'Lyon, France', flag: '🇫🇷' },
  { name: 'Omar Hussein', location: 'Marrakech, Morocco', flag: '🇲🇦' },
  { name: 'Emily Watson', location: 'Manchester, UK', flag: '🇬🇧' },
  { name: 'Alessandro Ferrari', location: 'Venice, Italy', flag: '🇮🇹' },
  { name: 'Sana Ali', location: 'Islamabad, Pakistan', flag: '🇵🇰' },
  { name: 'Noah Brown', location: 'New York, USA', flag: '🇺🇸' },
  { name: 'Karina Sokolova', location: 'Minsk, Belarus', flag: '🇧🇾' },
  { name: 'Santiago Vargas', location: 'Quito, Ecuador', flag: '🇪🇨' },
  { name: 'Hana Suzuki', location: 'Osaka, Japan', flag: '🇯🇵' },
  { name: 'Lucas Andersen', location: 'Helsinki, Finland', flag: '🇫🇮' },
  { name: 'Aria Patel', location: 'Ahmedabad, India', flag: '🇮🇳' },
  { name: 'Ethan Lee', location: 'San Francisco, USA', flag: '🇺🇸' },
  { name: 'Mia Torres', location: 'Manila, Philippines', flag: '🇵🇭' },
  { name: 'Benjamin White', location: 'Boston, USA', flag: '🇺🇸' },
  { name: 'Amelia Clarke', location: 'Brisbane, Australia', flag: '🇦🇺' },
  { name: 'Khalid Aziz', location: 'Doha, Qatar', flag: '🇶🇦' },
  { name: 'Julia Santos', location: 'Porto, Portugal', flag: '🇵🇹' },
  { name: 'Daniel Park', location: 'Incheon, South Korea', flag: '🇰🇷' },
  { name: 'Chloe Martin', location: 'Brussels, Belgium', flag: '🇧🇪' },
  { name: 'Andre Silva', location: 'Salvador, Brazil', flag: '🇧🇷' },
  { name: 'Zainab Mohammed', location: 'Khartoum, Sudan', flag: '🇸🇩' },
  { name: 'William Anderson', location: 'Seattle, USA', flag: '🇺🇸' },
  { name: 'Isabella Martinez', location: 'Valencia, Spain', flag: '🇪🇸' },
  { name: 'Ravi Kumar', location: 'Chennai, India', flag: '🇮🇳' },
  { name: 'Emma Berg', location: 'Gothenburg, Sweden', flag: '🇸🇪' },
  { name: 'Ali Reza', location: 'Tehran, Iran', flag: '🇮🇷' },
  { name: 'Sophie Leroy', location: 'Geneva, Switzerland', flag: '🇨🇭' },
  { name: 'Jackson Smith', location: 'Austin, USA', flag: '🇺🇸' },
  { name: 'Nora Kowalczyk', location: 'Krakow, Poland', flag: '🇵🇱' },
  { name: 'Gabriel Costa', location: 'Brasilia, Brazil', flag: '🇧🇷' },
  { name: 'Maya Thompson', location: 'Cape Town, South Africa', flag: '🇿🇦' },
  { name: 'Leon Schmidt', location: 'Hamburg, Germany', flag: '🇩🇪' },
  { name: 'Anika Joshi', location: 'Pune, India', flag: '🇮🇳' },
]

const plans = ['Starter Plan', 'Pro Plan', 'Agency Plan']
const planPrices = ['$9.99', '$33', '$97']

interface SalesPopupProps {
  className?: string
}

export const SalesPopup = ({ className = '' }: SalesPopupProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(globalCustomers[0])
  const [currentPlan, setCurrentPlan] = useState({ name: plans[0], price: planPrices[0] })

  useEffect(() => {
    // Show first popup after 5 seconds
    const initialTimer = setTimeout(() => {
      showRandomPopup()
    }, 5000)

    // Then show every 8-15 seconds randomly
    const interval = setInterval(() => {
      showRandomPopup()
    }, Math.random() * 7000 + 8000) // Random between 8-15 seconds

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const showRandomPopup = () => {
    const randomCustomer = globalCustomers[Math.floor(Math.random() * globalCustomers.length)]
    const randomPlanIndex = Math.floor(Math.random() * plans.length)
    
    setCurrentCustomer(randomCustomer)
    setCurrentPlan({ 
      name: plans[randomPlanIndex], 
      price: planPrices[randomPlanIndex] 
    })
    setIsVisible(true)

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 6000)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[9999] animate-slide-up ${className}`}>
      <div className="glass-card rounded-2xl p-4 md:p-5 border-2 border-viralify-cyan/50 shadow-2xl backdrop-blur-xl max-w-sm">
        <div className="flex items-start gap-3 md:gap-4">
          {/* TikTok Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#25F4EE] via-[#FE2C55] to-[#000000] flex items-center justify-center shadow-lg">
              <svg 
                viewBox="0 0 24 24" 
                className="w-7 h-7 md:w-8 md:h-8" 
                fill="white"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-white font-bold text-sm md:text-base truncate">
                  {currentCustomer.name} {currentCustomer.flag}
                </p>
                <p className="text-white/60 text-xs md:text-sm truncate">
                  {currentCustomer.location}
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <p className="text-viralify-cyan text-sm md:text-base font-semibold">
                Just purchased <span className="text-viralify-orange">{currentPlan.name}</span>
              </p>
              <p className="text-white/50 text-xs md:text-sm">
                {currentPlan.price}/month • Just now
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-viralify-cyan to-viralify-purple rounded-full animate-progress" />
        </div>
      </div>
    </div>
  )
}

