'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  name: string;
  link: string;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNav({ navItems, className = '' }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${className}`}>
      <nav className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-[0px_20px_40px_rgba(14,28,46,0.15)] border border-white/50 flex items-center gap-1">
        <Link href="/" className="text-lg font-black tracking-tighter text-[var(--on-surface)] mr-4">
          <span style={{ color: 'var(--primary)' }}>Bharat</span>Bills
        </Link>
        <div className="w-px h-6 bg-[var(--surface-container-highest)] mx-2" />
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="px-4 py-2 rounded-full text-sm font-medium text-[var(--on-surface)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-all"
          >
            {item.name}
          </Link>
        ))}
        <div className="w-px h-6 bg-[var(--surface-container-highest)] mx-2" />
        <Link
          href="/auth/login"
          className="px-4 py-2 rounded-full text-sm font-medium text-[var(--on-surface)] hover:text-[var(--primary)] transition-all"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="signature-gradient text-white px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all ml-2"
        >
          Get Started
        </Link>
      </nav>
    </div>
  );
}
