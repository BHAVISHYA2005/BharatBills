'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Package, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Invoices', href: '/dashboard/invoices', icon: FileText },
    { label: 'Customers', href: '/dashboard/customers', icon: Users },
    { label: 'Products', href: '/dashboard/products', icon: Package },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth/login');
    };

    const isActive = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(href);
    };

    const nav = (
        <>
            <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--sidebar-hover)' }}>
                <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>
                        <span style={{ color: '#ff8e66' }}>Bharat</span>Bills
                    </h1>
                </Link>
                <p style={{ fontSize: 11, color: 'var(--sidebar-text)', marginTop: 6 }}>Modern GST Invoicing</p>
            </div>

            <nav style={{ padding: '16px 12px', flex: 1 }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '10px 14px',
                                borderRadius: 12,
                                marginBottom: 6,
                                textDecoration: 'none',
                                fontSize: 14,
                                fontWeight: active ? 600 : 500,
                                color: active ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                                background: active ? 'var(--sidebar-active)' : 'transparent',
                                border: active ? '1px solid rgba(251, 93, 38, 0.4)' : '1px solid transparent',
                                transition: 'all 150ms',
                            }}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ padding: '16px 12px', borderTop: '1px solid var(--sidebar-hover)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 12,
                        width: '100%',
                        border: '1px solid transparent',
                        background: 'transparent',
                        color: 'var(--sidebar-text)',
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'all 150ms',
                    }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 60,
                    display: 'none',
                    padding: 8,
                    borderRadius: 12,
                    border: '1px solid rgba(148, 163, 184, 0.35)',
                    background: 'rgba(13, 22, 40, 0.95)',
                    color: '#f8fafc',
                    cursor: 'pointer',
                }}
                className="mobile-menu-btn"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 39 }}
                    className="mobile-overlay"
                />
            )}

            {/* Sidebar */}
            <aside
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 40,
                    transition: 'transform 300ms ease',
                }}
                className={`sidebar-shell ${mobileOpen ? 'sidebar-open' : 'sidebar'}`}
            >
                {nav}
            </aside>

            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .sidebar { transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0); }
        }
        @media (min-width: 769px) {
          .mobile-overlay { display: none !important; }
        }
      `}</style>
        </>
    );
}
