'use client';

import Link from 'next/link';
import { Shield, FileCheck, Clock, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export default function CompliancePage() {
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
            GST COMPLIANCE
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--on-surface)] mb-6">
            Stay Compliant with <span className="text-transparent bg-clip-text signature-gradient">GST Laws</span>
          </h1>
          <p className="text-lg text-[var(--on-tertiary-fixed-variant)] max-w-2xl mx-auto mb-10">
            BharatBills keeps you updated with the latest GST regulations. File returns accurately and on time, every time.
          </p>
          <Link href="/auth/signup" className="signature-gradient text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2">
            Start Compliance <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--surface-container-low)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Supported GST Returns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'GSTR-1', desc: 'Outward supplies (sales) return', status: 'Ready' },
              { name: 'GSTR-3B', desc: 'Summary return with tax payment', status: 'Auto-Draft' },
              { name: 'GSTR-4', desc: 'Composition scheme return', status: 'Coming Soon' },
              { name: 'GSTR-9', desc: 'Annual return', status: 'Coming Soon' },
            ].map((ret, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] flex items-center justify-center shrink-0">
                  <FileCheck size={24} className="text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{ret.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ret.status === 'Ready' ? 'bg-green-100 text-green-700' : ret.status === 'Auto-Draft' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {ret.status}
                    </span>
                  </div>
                  <p className="text-[var(--on-tertiary-fixed-variant)]">{ret.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Why Compliance Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Avoid Penalties', desc: 'Late filing penalties up to ₹500/day' },
              { icon: Clock, title: 'Timely Filing', desc: 'Automatic reminders before deadlines' },
              { icon: CheckCircle, title: '100% Accurate', desc: 'Error-free calculations every time' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--on-tertiary-fixed-variant)]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Lock size={48} className="text-[var(--primary)] mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-6">Bank-Grade Security</h2>
          <p className="text-[var(--on-tertiary-fixed-variant)] mb-8 max-w-2xl mx-auto">
            Your data is encrypted with AES-256 encryption and stored in India's most secure data centers.
          </p>
          <Link href="/auth/signup" className="signature-gradient text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2">
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <footer className="bg-[var(--surface-container-low)] py-8 px-6 text-center border-t border-[var(--surface-container-highest)]">
        <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">© 2026 BharatBills. High-End GST Compliance.</p>
      </footer>
    </div>
  );
}
