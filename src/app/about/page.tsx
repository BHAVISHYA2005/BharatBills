'use client';

import Link from 'next/link';
import { Rocket, Heart, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white/80 backdrop-blur-xl border-b border-[var(--surface-container-highest)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter text-[var(--on-surface)]">
            <span style={{ color: 'var(--primary)' }}>Bharat</span>Bills
          </Link>
          <Link href="/auth/signup" className="signature-gradient text-white px-6 py-2.5 rounded-lg font-bold text-sm">
            Get Started
          </Link>
        </div>
      </header>

      <section className="py-20 md:py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[var(--primary)] bg-[var(--primary-light)] rounded-full">
            ABOUT US
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--on-surface)] mb-6">
            Built by Indians, <br />
            <span className="text-transparent bg-clip-text signature-gradient">For Indians</span>
          </h1>
          <p className="text-lg text-[var(--on-tertiary-fixed-variant)] max-w-2xl mx-auto">
            BharatBills was created to simplify GST compliance for small businesses across India. We believe technology should make your life easier, not harder.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--surface-container-low)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">Our Mission</h2>
              <p className="text-[var(--on-tertiary-fixed-variant)] mb-6 leading-relaxed">
                We started BharatBills with a simple mission: make GST compliance accessible to every Indian business owner, regardless of their technical knowledge.
              </p>
              <p className="text-[var(--on-tertiary-fixed-variant)] leading-relaxed">
                From kirana shops to growing startups, everyone deserves professional invoicing tools that Just Work™.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, num: '50,000+', label: 'Businesses' },
                { icon: Rocket, num: '1M+', label: 'Invoices Created' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl text-center">
                  <stat.icon size={40} className="text-[var(--primary)] mx-auto mb-4" />
                  <p className="text-3xl font-black text-[var(--on-surface)]">{stat.num}</p>
                  <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Simplicity First', desc: 'Complex GST rules, simplified into a few clicks.' },
              { icon: Heart, title: 'Built with Care', desc: 'Every feature is designed with real users in mind.' },
              { icon: Rocket, title: 'Fast & Reliable', desc: '99.9% uptime. Your data is always accessible.' },
            ].map((val, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-4">
                  <val.icon size={32} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                <p className="text-[var(--on-tertiary-fixed-variant)]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="signature-gradient rounded-[3rem] p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Join Us?</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Start your journey with BharatBills today. It's free to get started.
            </p>
            <Link href="/auth/signup" className="bg-white text-[var(--primary)] px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2 hover:scale-105 transition-all">
              Create Free Account <Rocket size={20} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--surface-container-low)] py-8 px-6 text-center border-t border-[var(--surface-container-highest)]">
        <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">© 2026 BharatBills. High-End GST Compliance.</p>
      </footer>
    </div>
  );
}
