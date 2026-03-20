'use client';

import Link from 'next/link';
import { Wallet, Zap, Package, BarChart3, Shield, Check, ArrowRight, FileText, Users, Receipt } from 'lucide-react';

const features = [
  { icon: Wallet, title: 'One-Click GST Filing', desc: 'Direct integration with GSTN allows you to reconcile and file returns in seconds.', badge: 'GSTR-1 Ready' },
  { icon: Zap, title: 'Instant Invoices', desc: 'Generate professional, GST-compliant invoices and send them via WhatsApp or Email instantly.' },
  { icon: Package, title: 'Inventory Management', desc: 'Track stock levels across multiple warehouses with real-time low-stock alerts.' },
  { icon: BarChart3, title: 'Insights & Analytics', desc: 'Understand your cash flow with editorial-style reports and beautiful visualizations.' },
  { icon: Shield, title: 'Bank-Grade Security', desc: 'Your data is encrypted and stored in Indian servers with 99.9% uptime.' },
];

const whyFeatures = [
  { icon: FileText, title: 'Professional Templates', desc: 'Beautiful, customizable invoice templates that make your business look professional.' },
  { icon: Receipt, title: 'Auto GST Calculation', desc: 'Automatic CGST, SGST, and IGST calculation based on state.' },
  { icon: Users, title: 'Client Management', desc: 'Store client details, GSTIN, and billing history in one place.' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Simple Header */}
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

      {/* Hero */}
      <section className="py-20 md:py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[var(--primary)] bg-[var(--primary-light)] rounded-full">
            POWERFUL FEATURES
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--on-surface)] mb-6">
            Everything You Need for <span className="text-transparent bg-clip-text signature-gradient">GST Compliance</span>
          </h1>
          <p className="text-lg text-[var(--on-tertiary-fixed-variant)] max-w-2xl mx-auto mb-10">
            BharatBills combines powerful features with simplicity. Create invoices, file GST returns, and manage your business—all in one place.
          </p>
          <Link href="/auth/signup" className="signature-gradient text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2 hover:scale-105 transition-all">
            Start Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-[var(--surface-container-low)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Core Features</h2>
          <p className="text-center text-[var(--on-tertiary-fixed-variant)] mb-12 max-w-2xl mx-auto">Built for Indian businesses, designed for simplicity.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-3xl hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center mb-6">
                    <Icon size={28} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-[var(--on-tertiary-fixed-variant)] mb-4">{f.desc}</p>
                  {f.badge && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {f.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why BharatBills */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Why Choose BharatBills?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-[var(--on-tertiary-fixed-variant)]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-[var(--on-tertiary-fixed-variant)] mb-8">Join 50,000+ businesses across India.</p>
          <Link href="/auth/signup" className="signature-gradient text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2">
            Create Free Account <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface-container-low)] py-8 px-6 text-center border-t border-[var(--surface-container-highest)]">
        <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">© 2026 BharatBills. High-End GST Compliance.</p>
      </footer>
    </div>
  );
}
