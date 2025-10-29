'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Video, 
  Library, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Top 10s', href: '/dashboard/top-10s', icon: TrendingUp },
  { name: 'Video Generator', href: '/dashboard/video-generator', icon: Video },
  { name: 'Library', href: '/dashboard/library', icon: Library },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-full flex-col glass-effect border-r border-purple-500/20 backdrop-blur-xl transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center justify-center border-b border-purple-500/20 px-4 relative transition-all duration-300",
        isCollapsed ? "h-24" : "h-40"
      )}>
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className={cn(
            "absolute inset-0 blur-2xl opacity-60 transition-all duration-300",
            isCollapsed ? "scale-100" : "scale-110"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-pulse rounded-full"></div>
          </div>
          
          {/* Logo */}
          <img 
            src="https://res.cloudinary.com/dolij7wjr/image/upload/v1761333298/ChatGPT_Image_Oct_24__2025__03_13_34_PM-removebg-preview_q7vsob.png" 
            alt="Viralify Logo" 
            className={cn(
              "object-contain relative z-10 transition-all duration-500 hover:scale-110 cursor-pointer drop-shadow-2xl",
              isCollapsed ? "h-14 w-14" : "h-28 w-28"
            )}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.6))'
            }}
          />
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 glass-effect border border-purple-500/30 hover:border-purple-500/60 rounded-full p-1.5 bg-slate-950 hover:bg-purple-500/20 transition-all duration-300 group"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : ''}
              className={cn(
                'flex items-center rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden',
                isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent hover:border-purple-500/30'
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive && "text-white"
              )} />
              {!isCollapsed && item.name}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-xl -z-10"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      {!isCollapsed && (
        <div className="border-t border-purple-500/20 p-4">
          <div className="rounded-xl glass-effect bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 border border-purple-500/30 shine-effect relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 blur-xl"></div>
            <div className="relative z-10">
              <h3 className="font-semibold text-white text-lg">Upgrade to Pro</h3>
              <p className="mt-1 text-sm text-purple-200">
                Unlock unlimited analyses and video generation
              </p>
              <Link href="/dashboard/settings?tab=billing">
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#FF385C] to-[#FF1744] hover:from-[#FF1744] hover:to-[#FF385C] py-3 text-sm font-black uppercase tracking-wide text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-[#FF385C]/40">
                  Upgrade Pro
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

