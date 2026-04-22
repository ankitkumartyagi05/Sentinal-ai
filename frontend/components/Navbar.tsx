'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      padding: scrolled ? '15px 0' : '25px 0',
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      backgroundColor: scrolled ? 'rgba(25, 25, 25, 0.4)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-6" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Sentinel<span style={{ color: '#0050FF' }}>AI</span>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '30px',
          fontSize: '0.9rem',
          fontWeight: 500
        }} className="hidden md:flex">
          <Link href="#overview" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Overview</Link>
          <Link href="#engine" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>AI Engine</Link>
          <Link href="/dashboard" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Dashboard</Link>
          <Link href="/sandbox" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Sandbox</Link>
          <Link href="#security" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Security</Link>
          <Link href="#pricing" style={{ color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Pricing</Link>
        </div>

        <div>
          <button className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-semibold px-6 py-2 rounded-full shadow-[0_4px_15px_rgba(0,80,255,0.3)] hover:scale-105 transition-transform" onClick={() => window.location.href='/dashboard'}>Start Moderating</button>
        </div>
      </div>
    </nav>
  );
}
