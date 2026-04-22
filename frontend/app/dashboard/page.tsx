'use client';

import React from 'react';
import { motion } from '../../lib/motion';
import { Activity, ShieldCheck, AlertTriangle, Users, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit'] mb-2">Platform Overview</h1>
          <p className="text-gray-500">Real-time telemetry and AI diagnostic summary.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-xs text-gray-400">STATUS:</span>
            <span className="text-sm font-bold text-[#00FF66] flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              OPERATIONAL
            </span>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Content Scanned', value: '1.2M', trend: '+12.5%', color: '#0050FF', icon: <Activity size={20} /> },
          { label: 'Toxicity Prevented', value: '42.8K', trend: '+8.2%', color: '#00FF66', icon: <ShieldCheck size={20} /> },
          { label: 'High Risk Threats', value: '124', trend: '-14%', color: '#FF3366', icon: <AlertTriangle size={20} /> },
          { label: 'Active Channels', value: '891', trend: '+2.1%', color: '#00D6FF', icon: <Users size={20} /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-[#00FF66]' : 'text-[#FF3366]'}`}>
                {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="text-3xl font-bold font-mono mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* BIG CHART AREA */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Inference Latency (ms)</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          <div className="h-64 w-full flex items-end gap-2 px-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = 20 + Math.random() * 60;
              return (
                <div key={i} className="flex-1 bg-[#0050FF]/20 rounded-t-sm relative group cursor-pointer hover:bg-[#00D6FF]/40 transition-colors" style={{ height: `${height}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {Math.floor(height * 2)}ms
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-gray-500 font-mono">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>23:59</span>
          </div>
        </div>

        {/* SIDE PANELS */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#0050FF]/20 to-transparent border border-[#0050FF]/30 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-[#00D6FF]" size={20} />
              <h3 className="font-bold">Neural Engine v4</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Sentinel-BERT core is currently processing at <span className="text-white font-mono">98.2%</span> efficiency. No anomalies detected in current batch.
            </p>
            <button className="w-full bg-[#0050FF] hover:bg-[#00D6FF] py-3 rounded-xl text-sm font-bold transition-colors">
              Optimization Settings
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h3 className="font-bold mb-4">Top Threats</h3>
            <div className="space-y-4">
              {[
                { label: 'Harassment', count: '12.4K', color: '#FF3366' },
                { label: 'Identity Hate', count: '8.1K', color: '#FF3366' },
                { label: 'NSFW Visuals', count: '5.2K', color: '#00D6FF' },
              ].map((threat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-400">{threat.label}</span>
                    <span className="font-mono">{threat.count}</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: '70%', backgroundColor: threat.color, opacity: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
