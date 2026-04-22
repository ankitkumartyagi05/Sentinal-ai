'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Shield, Settings, Activity, Bug, LogOut } from 'lucide-react';

const sidebarItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/dashboard' },
  { icon: <Activity size={20} />, label: 'Real-Time Feed', href: '/dashboard/feed' },
  { icon: <History size={20} />, label: 'Moderation Logs', href: '/dashboard/logs' },
  { icon: <Shield size={20} />, label: 'Neural Sandbox', href: '/sandbox' },
  { icon: <Bug size={20} />, label: 'Error Reports', href: '/dashboard/errors' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 font-['Outfit'] font-bold text-xl">
          <div className="w-8 h-8 bg-[#0050FF] rounded-lg"></div>
          Sentinel<span className="text-[#0050FF]">AI</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-[#0050FF]/10 text-[#00D6FF] border border-[#0050FF]/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <span className={`${isActive ? 'text-[#00D6FF]' : 'group-hover:text-white'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00D6FF] shadow-[0_0_8px_#00D6FF]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
