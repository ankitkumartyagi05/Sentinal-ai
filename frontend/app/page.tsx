'use client';

import HeroSequence from '../components/HeroSequence';
import { motion } from '../lib/motion';
import { Shield, Zap, Globe, Activity, Database, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden">
      <Navbar />

      {/* 3D SCROLL HERO */}
      <HeroSequence />

      {/* AI FEATURES GRID */}
      <section id="engine" className="py-32 relative z-10 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] mb-6">Beyond Human Moderation</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            SentinelAI leverages heavily optimized neural architectures to process, analyze, and enforce community guidelines at lightning speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="w-8 h-8 text-[#00D6FF]" />, title: 'Real-Time Detection', desc: 'Sub-300ms analysis for live streams, websockets, and instant messaging.' },
            { icon: <Globe className="w-8 h-8 text-[#0050FF]" />, title: 'Multi-language NLP', desc: 'Trained on 50+ languages including English, Hindi, and colloquial internet slang.' },
            { icon: <Shield className="w-8 h-8 text-[#00FF66]" />, title: 'Auto Enforcement', desc: 'Instantly shadowban, quarantine, or flag content with dynamic confidence thresholds.' },
            { icon: <Activity className="w-8 h-8 text-[#FF3366]" />, title: 'Vision Intelligence', desc: 'Frame-by-frame analysis via OpenCV + TensorFlow for NSFW and violence detection.' },
            { icon: <Database className="w-8 h-8 text-[#A0A0A0]" />, title: 'Persistent Memory', desc: 'Distributed Redis caching combined with PostgreSQL for historical context.' },
            { icon: <Lock className="w-8 h-8 text-[#FFFFFF]" />, title: 'Enterprise Security', desc: 'End-to-end encryption, role-based access, and strict rate-limiting built-in.' }
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#00D6FF]/50 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 font-['Outfit']">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SYSTEM PIPELINE VISUAL */}
      <section className="py-32 bg-gradient-to-b from-transparent to-[#000814] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-20 text-center">
          <h2 className="text-4xl font-bold font-['Outfit'] mb-16">The Sentinel Pipeline</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl w-64">
              <div className="text-[#A0A0A0] text-sm mb-2 font-mono">STEP 01</div>
              <div className="text-xl font-semibold">User Content</div>
            </div>

            <ArrowRight className="w-8 h-8 text-[#0050FF] hidden md:block" />
            <div className="w-[2px] h-8 bg-[#0050FF] block md:hidden" />

            <div className="bg-white/5 backdrop-blur-xl border border-[#0050FF]/30 p-6 rounded-xl w-64 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#0050FF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[#00D6FF] text-sm mb-2 font-mono">STEP 02</div>
              <div className="text-xl font-semibold">AI Analysis</div>
            </div>

            <ArrowRight className="w-8 h-8 text-[#00D6FF] hidden md:block" />
            <div className="w-[2px] h-8 bg-[#00D6FF] block md:hidden" />

            <div className="bg-white/5 backdrop-blur-xl border border-[#00FF66]/30 p-6 rounded-xl w-64">
              <div className="text-[#00FF66] text-sm mb-2 font-mono">STEP 03</div>
              <div className="text-xl font-semibold">Action Taken</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK AI TEST */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-12 rounded-[3rem] text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-['Outfit'] mb-8">Try the Engine</h2>
          <div className="bg-black/60 p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-white/5">
            <input
              type="text"
              placeholder="Type something controversial..."
              className="flex-1 bg-transparent px-6 py-4 outline-none text-lg"
            />
            <button
              onClick={() => window.location.href = '/sandbox'}
              className="bg-[#0050FF] px-10 py-4 rounded-xl font-bold hover:bg-[#00D6FF] transition-colors"
            >
              Scan Now
            </button>
          </div>
          <p className="mt-6 text-gray-500 text-sm italic">Analysis powered by Sentinel-BERT v4.2</p>
        </div>
      </section>

      {/* USE CASES & CTA */}
      <section id="overview" className="py-32 relative text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0050FF]/10 via-[#050505] to-[#050505] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 font-['Outfit']">Protect Your Community Today</h2>
          <p className="text-xl text-gray-400 mb-12">
            Perfect for Social Media, Gaming Chats, and Web3 Communities. Stop toxicity before it reaches the feed.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => window.location.href = '/dashboard'} className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-bold text-lg px-10 py-5 rounded-full shadow-[0_4px_15px_rgba(0,80,255,0.3)] hover:scale-105 transition-transform">
              Launch Dashboard
            </button>
            <button className="bg-white/5 backdrop-blur border border-white/10 text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-white/10 transition-colors">
              View API Docs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
