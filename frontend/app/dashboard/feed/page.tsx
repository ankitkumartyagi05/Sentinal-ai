'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, XCircle, Ban, Filter, RefreshCw, Loader2 } from 'lucide-react';
import { useWebsocket } from '../../../lib/websocket';

interface ModerationItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  confidence: number;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected' | 'banned';
  timestamp: string;
  user: string;
}

export default function LiveFeed() {
  const [feed, setFeed] = useState<ModerationItem[]>([]);
  const { messages, isConnected } = useWebsocket();

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[0];
      const newItem: ModerationItem = {
        id: lastMsg.id || Math.random().toString(36).substr(2, 9),
        type: lastMsg.type || 'text',
        content: lastMsg.content_preview || lastMsg.data || 'No content',
        confidence: lastMsg.confidence || 0,
        tags: lastMsg.categories ? Object.keys(lastMsg.categories).filter(k => lastMsg.categories[k] > 0.5) : [],
        status: 'pending',
        timestamp: new Date().toLocaleTimeString(),
        user: lastMsg.user_id ? `User_${lastMsg.user_id.slice(0,4)}` : 'Anonymous'
      };
      setFeed(prev => [newItem, ...prev].slice(0, 50));
    }
  }, [messages]);

  const handleAction = (id: string, action: 'approved' | 'rejected' | 'banned') => {
    setFeed(prev => prev.map(item => item.id === id ? { ...item, status: action } : item));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit']">Live Moderation Feed</h1>
          <p className="text-gray-500 text-sm">Real-time content stream from all connected nodes.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className={`px-4 py-2 rounded-full border text-xs font-bold flex items-center gap-2 ${isConnected ? 'bg-[#00FF66]/10 border-[#00FF66]/30 text-[#00FF66]' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#00FF66] animate-pulse' : 'bg-red-500'}`} />
              {isConnected ? 'NODE CONNECTED' : 'NODE DISCONNECTED'}
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
           <div className="flex gap-4">
              <button className="text-xs font-bold px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-white">All Content</button>
              <button className="text-xs font-bold px-3 py-1.5 text-gray-400 hover:text-white transition-colors">Flagged Only</button>
              <button className="text-xs font-bold px-3 py-1.5 text-gray-400 hover:text-white transition-colors">High Confidence</button>
           </div>
           <div className="text-xs font-mono text-gray-500">
             {feed.length} ITEMS IN QUEUE
           </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {feed.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center text-gray-500 gap-4">
                   <Loader2 className="animate-spin text-[#0050FF]" size={40} />
                   <div className="text-lg font-['Outfit']">Awaiting live content...</div>
                </div>
              )}
              {feed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative bg-white/5 border border-white/10 p-5 rounded-2xl border-l-[6px] transition-all duration-300 ${item.confidence > 0.8 ? 'border-l-[#FF3366]' : 'border-l-[#00FF66]'} ${item.status !== 'pending' ? 'opacity-40 blur-[1px]' : 'hover:bg-white/[0.08]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center font-bold text-[#00D6FF]">
                          {item.user.charAt(0)}
                        </div>
                        <div>
                           <div className="text-sm font-bold">{item.user}</div>
                           <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{item.timestamp} / ID: {item.id}</div>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 border border-white/10 uppercase tracking-widest text-[#FF3366]">
                            {tag}
                          </span>
                        ))}
                        <div className="bg-black/60 px-3 py-1 rounded-lg border border-white/5 text-[10px] font-mono">
                          CONF: {(item.confidence * 100).toFixed(1)}%
                        </div>
                     </div>
                  </div>

                  <div className="bg-black/40 p-5 rounded-xl text-sm leading-relaxed text-gray-300 border border-white/5">
                    "{item.content}"
                  </div>

                  {item.status === 'pending' ? (
                     <div className="flex gap-3 justify-end mt-4">
                        <button onClick={() => handleAction(item.id, 'approved')} className="flex items-center gap-2 px-5 py-2.5 bg-[#00FF66]/10 hover:bg-[#00FF66]/20 text-[#00FF66] rounded-xl text-xs font-bold transition-all border border-[#00FF66]/20">
                          <CheckCircle size={14} /> ALLOW
                        </button>
                        <button onClick={() => handleAction(item.id, 'rejected')} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF3366]/10 hover:bg-[#FF3366]/20 text-[#FF3366] rounded-xl text-xs font-bold transition-all border border-[#FF3366]/20">
                          <AlertTriangle size={14} /> FLAG
                        </button>
                        <button onClick={() => handleAction(item.id, 'banned')} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/10">
                          <Ban size={14} /> QUARANTINE
                        </button>
                     </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-10">
                       <div className="text-2xl font-black font-['Outfit'] italic tracking-[0.2em] uppercase opacity-20 text-white">
                         {item.status}
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
