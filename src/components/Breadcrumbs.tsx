'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean);

    if (paths.length <= 1) return null; // Hide on home or empty paths

    const breadcrumbs = paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
        const isLast = index === paths.length - 1;

        return { href, label, isLast };
    });

    return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 13, color: 'var(--text-muted)' }}>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'inherit', textDecoration: 'none' }}>
                <Home size={14} />
            </Link>

            {breadcrumbs.map((bc, idx) => (
                <div key={bc.href} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} />
                    {bc.isLast ? (
                        <span style={{ color: 'var(--text)', fontWeight: 500 }}>{bc.label}</span>
                    ) : (
                        <Link href={bc.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {bc.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
