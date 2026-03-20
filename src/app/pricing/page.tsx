'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for freelancers and small businesses',
    features: ['5 invoices/month', '10 customers', '5 products', 'PDF export', 'Basic GST calculation'],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹499',
    period: '/month',
    desc: 'For growing businesses with more needs',
    features: ['Unlimited invoices', 'Unlimited customers', 'Unlimited products', 'PDF & Email export', 'Advanced GST reports', 'Priority support', 'Multi-user access'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large organizations with custom needs',
    features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'API access', 'SLA guarantee', 'Training & onboarding'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage() {
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
            SIMPLE PRICING
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--on-surface)] mb-6">
            Choose the Plan That <span className="text-transparent bg-clip-text signature-gradient">Fits Your Business</span>
          </h1>
          <p className="text-lg text-[var(--on-tertiary-fixed-variant)] max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl p-8 ${plan.highlight
                    ? 'bg-[var(--primary-container)] text-white scale-105 shadow-xl'
                    : 'bg-white border border-[var(--surface-container-highest)]'
                  }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : ''}`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : ''}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-[var(--on-tertiary-fixed-variant)]'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/80' : 'text-[var(--on-tertiary-fixed-variant)]'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check size={18} className={plan.highlight ? 'text-white' : 'text-[var(--success)]'} />
                      <span className={plan.highlight ? 'text-white/90' : ''}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'}
                  className={`w-full py-3 rounded-xl font-bold text-center block transition-all ${
                    plan.highlight
                      ? 'bg-white text-[var(--primary)] hover:bg-white/90'
                      : 'signature-gradient text-white hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left max-w-2xl mx-auto">
            {[
              { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time.' },
              { q: 'Is there a free trial for Pro?', a: 'Yes, Pro comes with a 14-day free trial.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, and net banking.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[var(--surface-container-highest)]">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-[var(--on-tertiary-fixed-variant)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--surface-container-low)] py-8 px-6 text-center border-t border-[var(--surface-container-highest)]">
        <p className="text-sm text-[var(--on-tertiary-fixed-variant)]">© 2026 BharatBills. High-End GST Compliance.</p>
      </footer>
    </div>
  );
}
