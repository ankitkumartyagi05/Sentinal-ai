'use client';

import React from 'react';
import { motion } from '../lib/motion';

export default function HeroSequence() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,80,255,0.22),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,214,255,0.12),_transparent_35%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 text-center md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00D6FF] backdrop-blur"
        >
          AI Engine Initialized
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl text-5xl font-bold tracking-tight text-white md:text-7xl font-['Outfit']"
        >
          The unified core is ready.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 max-w-2xl text-lg text-gray-400 md:text-2xl"
        >
          SentinelAI processes text and image content with real-time moderation pipelines built for production deployment.
        </motion.p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Scroll to Analyze</p>
          <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#0050FF] to-transparent" />
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-8 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-8 py-4 text-lg font-bold text-white shadow-[0_0_24px_rgba(0,80,255,0.35)] transition-transform hover:scale-105"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
