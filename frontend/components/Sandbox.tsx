'use client';

import React, { useState } from 'react';
import { motion } from '../lib/motion';
import { Shield, Send, Image as ImageIcon, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { api } from '../lib/api';

export default function Sandbox() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  const handleTextAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await api.post('/api/v1/moderate/text', {
        content: inputText,
        user_id: 'guest_user'
      });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-4 md:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#0050FF]/20 p-3 rounded-2xl border border-[#0050FF]/30">
            <Shield className="text-[#00D6FF] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-['Outfit']">AI Sandbox</h1>
            <p className="text-gray-400">Test our neural moderation engine in real-time.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-4 font-semibold transition-colors ${activeTab === 'text' ? 'bg-white/5 text-[#00D6FF]' : 'text-gray-500 hover:text-white'}`}
            >
              Text Analysis
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-4 font-semibold transition-colors ${activeTab === 'image' ? 'bg-white/5 text-[#00D6FF]' : 'text-gray-500 hover:text-white'}`}
            >
              Vision (Image)
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'text' ? (
              <div className="space-y-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste contents to analyze (e.g., comments, messages...)"
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-[#0050FF]/50 transition-colors resize-none"
                />
                <button
                  onClick={handleTextAnalyze}
                  disabled={isAnalyzing || !inputText}
                  className="w-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {isAnalyzing ? 'Analyzing Neural Patterns...' : 'Run Diagnostics'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-2xl bg-black/20">
                <ImageIcon className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400 mb-6 text-center">Drag and drop an image or click to upload.<br /><span className="text-xs">Supports JPG, PNG (Max 5MB)</span></p>
                <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full transition-colors border border-white/10">
                  Select Image
                </button>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    Analysis Result
                    {result.is_flagged ? <AlertTriangle className="text-[#FF3366]" /> : <CheckCircle className="text-[#00FF66]" />}
                  </h3>
                  <span className="text-sm font-mono text-gray-400">{result.processing_time_ms}ms processing</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-gray-500 mb-4">CONFIDENCE SCORE</div>
                    <div className="text-5xl font-bold font-mono text-[#00D6FF]">{(result.confidence * 100).toFixed(1)}%</div>
                    <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${result.is_flagged ? 'bg-[#FF3366]/20 text-[#FF3366]' : 'bg-[#00FF66]/20 text-[#00FF66]'}`}>
                      {result.is_flagged ? 'Content Flagged' : 'Content Safe'}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">CATEGORY BREAKDOWN</div>
                    {Object.entries(result.categories).map(([cat, score]: [string, any]) => (
                      <div key={cat}>
                        <div className="flex justify-between text-xs mb-1 uppercase tracking-widest text-gray-400">
                          <span>{cat}</span>
                          <span>{(score * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score * 100}%` }}
                            className={`h-full ${score > 0.5 ? 'bg-[#FF3366]' : 'bg-[#00D6FF]'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
