import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Crown, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  Flame,
  Shield,
  Star,
  ArrowUpCircle
} from "lucide-react";

// Pricing tiers configuration
const TIERS = {
  FREE: {
    name: 'Free',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-gray-500 to-gray-600',
    credits: 10,
    features: [
      { name: 'Quick Analysis', included: true, limit: '10/month' },
      { name: 'BEAST MODE', included: false },
      { name: 'Entity Scanning', included: false },
      { name: 'Viral Discovery', included: false },
      { name: 'AI Generation', included: false },
      { name: 'Library Storage', included: true, limit: '5 items' }
    ]
  },
  STARTER: {
    name: 'Starter',
    price: 9.99,
    icon: <Star className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
    credits: 100,
    features: [
      { name: 'Quick Analysis', included: true, limit: 'Unlimited' },
      { name: 'BEAST MODE', included: true, limit: '20/month' },
      { name: 'Entity Scanning', included: true, limit: '50/month' },
      { name: 'Viral Discovery', included: true, limit: 'Daily refresh' },
      { name: 'AI Generation', included: false },
      { name: 'Library Storage', included: true, limit: '50 items' }
    ]
  },
  PRO: {
    name: 'Pro',
    price: 29.99,
    icon: <Crown className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-500',
    credits: 500,
    features: [
      { name: 'Quick Analysis', included: true, limit: 'Unlimited' },
      { name: 'BEAST MODE', included: true, limit: 'Unlimited' },
      { name: 'Entity Scanning', included: true, limit: 'Unlimited' },
      { name: 'Viral Discovery', included: true, limit: 'Real-time' },
      { name: 'AI Generation', included: true, limit: '100/month' },
      { name: 'Library Storage', included: true, limit: 'Unlimited' },
      { name: 'Competitive Intel', included: true, limit: 'Unlimited' },
      { name: 'Priority Support', included: true }
    ]
  },
  AGENCY: {
    name: 'Agency',
    price: 99.99,
    icon: <Flame className="w-5 h-5" />,
    color: 'from-red-500 to-orange-500',
    credits: 2000,
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Team Collaboration', included: true, limit: '5 users' },
      { name: 'White Label Reports', included: true },
      { name: 'API Access', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Dedicated Account Manager', included: true }
    ]
  }
};

// Credit costs
const CREDIT_COSTS = {
  quickAnalysis: 1,
  beastMode: 5,
  entityScan: 3,
  viralDiscovery: 2,
  aiGeneration: 4
};

export const SettingsTab = () => {
  const [currentTier, setCurrentTier] = useState<keyof typeof TIERS>('FREE');
  const [credits, setCredits] = useState(10);
  const [usedCredits, setUsedCredits] = useState(0);
  const [selectedTier, setSelectedTier] = useState<keyof typeof TIERS | null>(null);

  // Load user settings from localStorage
  useEffect(() => {
    const savedTier = localStorage.getItem('userTier') as keyof typeof TIERS;
    const savedCredits = localStorage.getItem('userCredits');
    const savedUsed = localStorage.getItem('usedCredits');
    
    if (savedTier && TIERS[savedTier]) {
      setCurrentTier(savedTier);
      setCredits(parseInt(savedCredits || String(TIERS[savedTier].credits)));
    }
    if (savedUsed) {
      setUsedCredits(parseInt(savedUsed));
    }
  }, []);

  const handleUpgrade = (tier: keyof typeof TIERS) => {
    // In a real app, this would redirect to payment
    localStorage.setItem('userTier', tier);
    localStorage.setItem('userCredits', String(TIERS[tier].credits));
    localStorage.setItem('usedCredits', '0');
    
    setCurrentTier(tier);
    setCredits(TIERS[tier].credits);
    setUsedCredits(0);
    setSelectedTier(null);
  };

  const resetCredits = () => {
    localStorage.setItem('usedCredits', '0');
    setUsedCredits(0);
  };

  const creditsRemaining = credits - usedCredits;
  const creditsPercentage = (creditsRemaining / credits) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${TIERS[currentTier].color} text-white text-sm font-black px-4 py-2 rounded-full mb-2`}
             style={{ border: "2px solid black" }}>
          {TIERS[currentTier].icon}
          {TIERS[currentTier].name.toUpperCase()} TIER
        </div>
        <p className="text-white/80 text-xs">
          Manage your subscription and credits
        </p>
      </div>

      {/* Current Credits Card */}
      <Card className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm"
            style={{ border: "3px solid black" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-300" />
            <span className="text-white font-black uppercase text-sm">Credits</span>
          </div>
          <div className="text-white font-black text-2xl">
            {creditsRemaining}/{credits}
          </div>
        </div>
        <Progress value={creditsPercentage} className="h-3 mb-2" />
        <div className="text-white/70 text-xs text-center">
          {Math.round(creditsPercentage)}% remaining
        </div>
        {currentTier === 'FREE' && credits === usedCredits && (
          <div className="mt-3 text-center">
            <Button
              onClick={() => setSelectedTier('STARTER')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xs"
              style={{ border: "2px solid black" }}
            >
              <ArrowUpCircle className="w-4 h-4 mr-1" />
              Upgrade for More Credits
            </Button>
          </div>
        )}
      </Card>

      {/* Credit Costs Reference */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm"
            style={{ border: "3px solid black" }}>
        <div className="text-white font-black uppercase text-sm mb-3">Credit Costs</div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-white/70">Quick Analysis:</span>
            <span className="text-white font-bold">{CREDIT_COSTS.quickAnalysis} credit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">BEAST MODE:</span>
            <span className="text-white font-bold">{CREDIT_COSTS.beastMode} credits</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Entity Scan:</span>
            <span className="text-white font-bold">{CREDIT_COSTS.entityScan} credits</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Viral Discovery:</span>
            <span className="text-white font-bold">{CREDIT_COSTS.viralDiscovery} credits</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">AI Generation:</span>
            <span className="text-white font-bold">{CREDIT_COSTS.aiGeneration} credits</span>
          </div>
        </div>
      </Card>

      {/* Upgrade Options */}
      {selectedTier ? (
        <Card className={`p-4 bg-gradient-to-br ${TIERS[selectedTier].color}/30 backdrop-blur-sm animate-in fade-in`}
              style={{ border: "3px solid black" }}>
          <div className="flex items-center gap-2 mb-3">
            {TIERS[selectedTier].icon}
            <span className="text-white font-black uppercase text-lg">{TIERS[selectedTier].name}</span>
            {TIERS[selectedTier].price && (
              <span className="text-white font-black text-xl ml-auto">${TIERS[selectedTier].price}/mo</span>
            )}
          </div>

          <div className="space-y-2 mb-4">
            {TIERS[selectedTier].features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                {feature.included ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
                <span className={feature.included ? 'text-white' : 'text-white/50'}>
                  {feature.name} {feature.limit && `(${feature.limit})`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => handleUpgrade(selectedTier)}
              className="flex-1 bg-white text-black font-black"
              style={{ border: "2px solid black" }}
            >
              Upgrade Now
            </Button>
            <Button
              onClick={() => setSelectedTier(null)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="text-white font-black uppercase text-sm text-center mb-2">
            Available Plans
          </div>
          {(Object.keys(TIERS) as Array<keyof typeof TIERS>).map((tier) => {
            if (tier === currentTier) return null;
            return (
              <Card
                key={tier}
                className={`p-3 bg-gradient-to-br ${TIERS[tier].color}/20 backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-transform`}
                style={{ border: "3px solid black" }}
                onClick={() => setSelectedTier(tier)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {TIERS[tier].icon}
                    <div>
                      <div className="text-white font-black text-sm">{TIERS[tier].name}</div>
                      <div className="text-white/70 text-xs">{TIERS[tier].credits} credits/month</div>
                    </div>
                  </div>
                  {TIERS[tier].price && (
                    <div className="text-white font-black">${TIERS[tier].price}/mo</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Current Features */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm"
            style={{ border: "3px solid black" }}>
        <div className="text-white font-black uppercase text-sm mb-3">Your Features</div>
        <div className="space-y-2">
          {TIERS[currentTier].features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {feature.included ? (
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={feature.included ? 'text-white' : 'text-white/50'}>
                {feature.name} {feature.limit && `(${feature.limit})`}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Developer Tools (for testing) */}
      <Card className="p-3 bg-black/20 backdrop-blur-sm"
            style={{ border: "2px solid black" }}>
        <div className="text-white/60 font-bold text-xs mb-2">Developer Tools</div>
        <div className="flex gap-2">
          <Button
            onClick={resetCredits}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Reset Credits
          </Button>
          <Button
            onClick={() => {
              localStorage.clear();
              setCurrentTier('FREE');
              setCredits(10);
              setUsedCredits(0);
            }}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Reset Account
          </Button>
        </div>
      </Card>
    </div>
  );
};
