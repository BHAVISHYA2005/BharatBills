import Link from 'next/link';
import { FileText, Calculator, Users, BarChart3, ArrowRight, Shield, Zap } from 'lucide-react';

const features = [
  { icon: FileText, title: 'Professional Invoices', desc: 'Create GST-compliant invoices with automatic sequential numbering and professional formatting.', color: '#E8652B', bg: '#FEF3EE' },
  { icon: Calculator, title: 'Real-time GST', desc: 'Automatic CGST, SGST, and IGST calculation based on seller and buyer state. Supports all GST slabs.', color: '#10B981', bg: '#ECFDF5' },
  { icon: Users, title: 'Customer Management', desc: 'Maintain a database of customers with GSTIN, addresses, and transaction history.', color: '#3B82F6', bg: '#EFF6FF' },
  { icon: BarChart3, title: 'Business Dashboard', desc: 'Track revenue, pending payments, and invoice status at a glance with real-time metrics.', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: Shield, title: 'GSTIN Validation', desc: 'Built-in GSTIN format validation and auto-detection of interstate vs intrastate transactions.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: Zap, title: 'PDF Export', desc: 'Generate print-ready invoice PDFs with your business details, GST breakdown, and professional layout.', color: '#EC4899', bg: '#FDF2F8' },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>
          <span style={{ color: 'var(--primary)' }}>Bharat</span>Bills
        </h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/auth/login" className="btn btn-ghost">Sign In</Link>
          <Link href="/auth/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--primary-light)', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--primary)', marginBottom: 24 }}>
          🇮🇳 Built for Indian Small Businesses
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, maxWidth: 700, margin: '0 auto 20px', letterSpacing: '-0.02em' }}>
          GST Invoicing <br />
          <span style={{ color: 'var(--primary)' }}>Made Simple</span>
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Create professional GST-compliant invoices in minutes. Automatic tax calculations, customer management, and PDF export — all in one place.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ fontSize: 16 }}>
            Start Free <ArrowRight size={18} />
          </Link>
          <Link href="/auth/login" className="btn btn-secondary btn-lg" style={{ fontSize: 16 }}>
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56, flexWrap: 'wrap' }}>
          {[
            { label: 'GST Slabs', value: '4' },
            { label: 'Indian States', value: '37' },
            { label: 'Tax Types', value: 'CGST • SGST • IGST' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h3 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Everything You Need</h3>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
          A complete invoicing toolkit designed for Indian GST compliance
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div className="card" key={f.title} style={{ padding: 28, transition: 'transform 200ms, box-shadow 200ms' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={24} color={f.color} />
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--sidebar-bg)', borderRadius: 20, padding: 'clamp(32px, 5vw, 60px)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'white', marginBottom: 12 }}>
            Ready to simplify your invoicing?
          </h3>
          <p style={{ color: 'var(--sidebar-text)', fontSize: 16, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Start creating GST-compliant invoices in minutes, not hours.
          </p>
          <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ fontSize: 16 }}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
        © 2026 BharatBills — Built with Next.js, TypeScript & PostgreSQL
      </footer>
    </div>
  );
}
