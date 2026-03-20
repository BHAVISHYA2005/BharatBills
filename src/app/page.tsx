'use client';

import Link from 'next/link';
import { Verified, Wallet, Zap, Package, BarChart3, Shield, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { FloatingNav } from '@/components/ui/FloatingNav';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', link: '/features' },
    { name: 'Compliance', link: '/compliance' },
    { name: 'Pricing', link: '/pricing' },
    { name: 'About', link: '/about' },
  ];

  const features = [
    { icon: Wallet, title: 'One-Click GST Filing', desc: 'Direct integration with GSTN allows you to reconcile and file returns in seconds.', badge: 'GSTR-1 Ready', colSpan: 'md:col-span-2' },
    { icon: Zap, title: 'Instant Invoices', desc: 'Generate professional, GST-compliant invoices and send them via WhatsApp or Email instantly.', accent: true },
    { icon: Package, title: 'Inventory Management', desc: 'Track stock levels across multiple warehouses with real-time low-stock alerts.' },
    { icon: BarChart3, title: 'Insights & Analytics', desc: 'Understand your cash flow with editorial-style reports and beautiful visualizations.' },
    { icon: Shield, title: 'Bank-Grade Security', desc: 'Your data is encrypted and stored in local Indian servers with 99.9% uptime.' },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Floating Nav (appears on scroll) */}
      <FloatingNav navItems={navItems} />

      {/* Static Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl" style={{ boxShadow: '0px 20px 40px rgba(14,28,46,0.06)' }}>
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[var(--on-surface)]">BharatBills</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] pb-1 text-sm tracking-tight" href="/features">Features</Link>
            <Link className="text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors text-sm tracking-tight" href="/compliance">Compliance</Link>
            <Link className="text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors text-sm tracking-tight" href="/pricing">Pricing</Link>
            <Link className="text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors text-sm tracking-tight" href="/about">About</Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="text-[var(--on-surface)] font-medium text-sm tracking-tight hover:text-[var(--primary)] transition-colors">Login</Link>
            <Link href="/auth/signup" className="signature-gradient text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:scale-105 transition-all shadow-lg">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[var(--surface-container-highest)] px-6 py-4 space-y-4">
            <Link className="block text-[var(--primary)] font-bold" href="/features">Features</Link>
            <Link className="block text-[var(--on-surface)]" href="/compliance">Compliance</Link>
            <Link className="block text-[var(--on-surface)]" href="/pricing">Pricing</Link>
            <Link className="block text-[var(--on-surface)]" href="/about">About</Link>
            <div className="pt-4 border-t border-[var(--surface-container-highest)] space-y-3">
              <Link href="/auth/login" className="block text-[var(--on-surface)] font-medium">Login</Link>
              <Link href="/auth/signup" className="signature-gradient text-white px-6 py-2.5 rounded-lg font-bold text-sm inline-block">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <header className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative z-10 order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[var(--primary)] bg-[var(--primary-light)] rounded-full">
              GST COMPLIANCE REDEFINED
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--on-surface)] leading-[1.05] tracking-tight mb-6 md:mb-8">
              Invoicing that{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text signature-gradient">
                  Empowers
                </span>
                <span className="absolute -inset-2 bg-white/50 rounded-full blur-xl" />
              </span>{' '}
              Indian SMBs.
            </h1>
            <p className="text-base md:text-lg text-[var(--on-tertiary-fixed-variant)] mb-8 md:mb-10 max-w-xl leading-relaxed">
              The energetic authority in GST filing and professional invoicing. Seamlessly manage your finances with the precision of a bank and the speed of a startup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="signature-gradient text-white px-8 md:px-10 py-4 md:py-5 rounded-lg font-black text-base md:text-lg shadow-[0px_20px_40px_rgba(255,107,53,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center">
                Create Free Invoice
              </Link>
              <Link href="/auth/login" className="bg-[var(--surface-container-highest)] text-[var(--on-surface)] px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:bg-[var(--surface-container-high)] transition-all text-center">
                Sign In
              </Link>
            </div>
            <div className="mt-10 md:mt-12 flex items-center gap-4 text-sm text-[var(--on-tertiary-fixed-variant)] font-medium flex-wrap">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-4 border-[var(--background)] flex items-center justify-center text-white font-bold text-sm">RK</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-[var(--background)] flex items-center justify-center text-white font-bold text-sm">PS</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-4 border-[var(--background)] flex items-center justify-center text-white font-bold text-sm">AM</div>
              </div>
              <span>Trusted by 50,000+ businesses across Bharat</span>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-64 h-64 md:w-96 md:h-96 bg-[var(--primary-container)]/10 blur-[100px] rounded-full"></div>
            <div className="relative glass-card p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[0px_40px_80px_rgba(14,28,46,0.1)] border border-white/40">
              <div className="bg-gradient-to-br from-[var(--surface-container-low)] to-[var(--surface-container)] rounded-xl md:rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-xs md:text-sm font-semibold text-[var(--on-surface)]">Revenue Overview</span>
                  <span className="text-xs text-[var(--success)] font-medium">+24.5%</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <div className="w-4 md:w-6 h-12 md:h-20 bg-[var(--primary)]/20 rounded-t"></div>
                  <div className="w-4 md:w-6 h-16 md:h-24 bg-[var(--primary)]/30 rounded-t"></div>
                  <div className="w-4 md:w-6 h-20 md:h-32 bg-[var(--primary)]/40 rounded-t"></div>
                  <div className="w-4 md:w-6 h-24 md:h-40 bg-[var(--primary)]/60 rounded-t"></div>
                  <div className="w-4 md:w-6 h-28 md:h-48 signature-gradient rounded-t"></div>
                </div>
                <div className="flex justify-between text-xs text-[var(--on-tertiary-fixed-variant)]">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
                </div>
              </div>
              <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 glass-card p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl max-w-[160px] md:max-w-[200px]">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Verified size={18} className="text-[var(--primary)]" />
                  <span className="text-xs font-bold text-[var(--on-surface)]">GST Ready</span>
                </div>
                <div className="h-2 w-full bg-[var(--surface-container-high)] rounded-full overflow-hidden">
                  <div className="h-full signature-gradient w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Bento Grid */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-[var(--surface-container-low)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--on-surface)] mb-4">Powerful Features. Zero Stress.</h2>
            <p className="text-[var(--on-tertiary-fixed-variant)] max-w-2xl mx-auto">Compliance doesn't have to be complicated. BharatBills automates the heavy lifting so you can focus on growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 bg-white p-8 md:p-10 rounded-2xl md:rounded-3xl hover:shadow-[0px_20px_40px_rgba(14,28,46,0.06)] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <Wallet size={40} className="text-[var(--primary)] mb-4 md:mb-6" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">One-Click GST Filing</h3>
                <p className="text-[var(--on-tertiary-fixed-variant)] max-w-sm text-sm md:text-base">Direct integration with GSTN allows you to reconcile and file returns in seconds, not hours.</p>
              </div>
              <div className="mt-6 md:mt-8 flex gap-3 flex-wrap">
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-bold">GSTR-1 Ready</span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-bold">GSTR-3B Auto-Draft</span>
              </div>
            </div>
            
            <div className="bg-[var(--primary-container)] p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between text-white relative overflow-hidden">
              <div>
                <Zap size={40} className="mb-4 md:mb-6" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Instant Invoices</h3>
              </div>
              <p className="text-white/80 text-sm md:text-base">Generate professional, GST-compliant invoices and send them via WhatsApp or Email instantly.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl hover:shadow-[0px_20px_40px_rgba(14,28,46,0.06)] transition-all">
              <Package size={36} className="text-[var(--primary)] mb-4 md:mb-6" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Inventory Management</h3>
              <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">Track stock levels across multiple warehouses with real-time alerts.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl hover:shadow-[0px_20px_40px_rgba(14,28,46,0.06)] transition-all">
              <BarChart3 size={36} className="text-[var(--primary)] mb-4 md:mb-6" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Insights & Analytics</h3>
              <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">Understand your cash flow with editorial-style reports and visualizations.</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl hover:shadow-[0px_20px_40px_rgba(14,28,46,0.06)] transition-all">
              <Shield size={36} className="text-[var(--primary)] mb-4 md:mb-6" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Bank-Grade Security</h3>
              <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">Your data is encrypted and stored in Indian servers with 99.9% uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--on-surface)] mb-12 md:mb-20 max-w-3xl leading-tight">
            Designed for the <span className="text-[var(--primary)] italic">next generation</span> of Indian entrepreneurs.
          </h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="border-l-4 border-[var(--primary)] pl-6 md:pl-8 relative z-10">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-[var(--on-surface)] leading-relaxed mb-4 md:mb-6">
                  "Switching to BharatBills was the best decision for our retail chain. GST compliance used to be a nightmare, now it's just a background task."
                </p>
                <div>
                  <p className="font-bold text-[var(--on-surface)]">Rajesh Kumar</p>
                  <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">CEO, Kumar Electronics</p>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[var(--surface-container-low)] to-[var(--surface-container)] rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-white">RK</span>
                  </div>
                  <h4 className="font-bold text-[var(--on-surface)] text-lg md:text-xl">Invoicing Dashboard</h4>
                  <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">Real-time GST tracking</p>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-white rounded-xl p-3 md:p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-[var(--primary)]">156</p>
                    <p className="text-xs text-[var(--on-tertiary-fixed-variant)]">Invoices</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 md:p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-[var(--success)]">₹4.2L</p>
                    <p className="text-xs text-[var(--on-tertiary-fixed-variant)]">Revenue</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 md:p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-[var(--info)]">98%</p>
                    <p className="text-xs text-[var(--on-tertiary-fixed-variant)]">GST Filed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--on-surface)] mb-6">
            Ready to simplify your taxes?
          </h2>
          <p className="text-[var(--on-tertiary-fixed-variant)] mb-8 max-w-xl mx-auto">
            Join thousands of businesses already scaling with BharatBills. No credit card required to start.
          </p>
          <Link href="/auth/signup" className="signature-gradient text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center gap-2 hover:scale-105 transition-all">
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface-container-low)] py-12 md:py-16 px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg md:text-xl font-bold text-[var(--on-surface)] block mb-4">BharatBills</span>
            <p className="text-sm text-[var(--on-tertiary-fixed-variant)] mb-6">High-End GST Compliance for the modern Indian economy.</p>
          </div>
          <div>
            <h4 className="font-bold text-[var(--on-surface)] mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="/features">Features</Link></li>
              <li><Link className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="/compliance">Compliance</Link></li>
              <li><Link className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="/pricing">Pricing</Link></li>
              <li><Link className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--on-surface)] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--on-surface)] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="/about">About Us</Link></li>
              <li><a className="text-sm text-[var(--on-tertiary-fixed-variant)] hover:text-[var(--primary)] transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-[var(--surface-container-highest)] text-center">
          <p className="text-sm text-[var(--on-surface)]">© 2026 BharatBills. High-End GST Compliance.</p>
        </div>
      </footer>
    </div>
  );
}
