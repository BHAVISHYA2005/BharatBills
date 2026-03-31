'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IndianRupee, FileText, Users, Package, Plus, TrendingUp } from 'lucide-react';

interface DashboardData {
    totalInvoices: number;
    totalCustomers: number;
    totalProducts: number;
    totalRevenue: number;
    pendingAmount: number;
    recentInvoices: Array<{
        id: number;
        invoiceNumber: string;
        totalAmount: number;
        status: string;
        invoiceDate: string;
        customer: { name: string };
    }>;
}

const statusBadge = (status: string) => {
    const map: Record<string, string> = {
        draft: 'badge-default',
        sent: 'badge-info',
        paid: 'badge-success',
        overdue: 'badge-danger',
        cancelled: 'badge-warning',
    };
    return map[status] || 'badge-default';
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard')
            .then(r => r.json())
            .then(d => { setData(d.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <div className="spinner" style={{ width: 32, height: 32 }} />
            </div>
        );
    }

    if (!data) return <div>Failed to load dashboard</div>;

    const metrics = [
        { label: 'Total Revenue', value: formatCurrency(data.totalRevenue), icon: IndianRupee, color: '#10B981', bg: '#ECFDF5' },
        { label: 'Total Invoices', value: data.totalInvoices, icon: FileText, color: 'var(--primary)', bg: 'var(--primary-light)' },
        { label: 'Customers', value: data.totalCustomers, icon: Users, color: '#3B82F6', bg: '#EFF6FF' },
        { label: 'Pending Amount', value: formatCurrency(data.pendingAmount), icon: TrendingUp, color: '#F59E0B', bg: '#FFFBEB' },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Overview of revenue, invoices, and collections</p>
                </div>
                <Link href="/dashboard/invoices/new" className="btn btn-primary">
                    <Plus size={16} /> New Invoice
                </Link>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
                {metrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <div className="card metric-card" key={m.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div className="metric-label">{m.label}</div>
                                    <div className="metric-value">{m.value}</div>
                                </div>
                                <div className="metric-icon" style={{ background: m.bg }}>
                                    <Icon size={22} color={m.color} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                <Link href="/dashboard/invoices/new" className="btn btn-secondary"><FileText size={16} /> Create Invoice</Link>
                <Link href="/dashboard/customers" className="btn btn-secondary"><Users size={16} /> Manage Customers</Link>
                <Link href="/dashboard/products" className="btn btn-secondary"><Package size={16} /> Manage Products</Link>
            </div>

            {/* Recent Invoices */}
            <div className="card">
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600 }}>Recent Invoices</h2>
                    <Link href="/dashboard/invoices" style={{ fontSize: 13, color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>View all →</Link>
                </div>
                {data.recentInvoices.length === 0 ? (
                    <div className="empty-state">
                        <h3>No invoices yet</h3>
                        <p>Create your first invoice to get started</p>
                        <Link href="/dashboard/invoices/new" className="btn btn-primary btn-sm">
                            <Plus size={14} /> Create Invoice
                        </Link>
                    </div>
                ) : (
                    <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentInvoices.map((inv) => (
                                    <tr key={inv.id}>
                                        <td>
                                            <Link href={`/dashboard/invoices/${inv.id}`} style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>
                                                {inv.invoiceNumber}
                                            </Link>
                                        </td>
                                        <td>{inv.customer.name}</td>
                                        <td style={{ fontWeight: 500 }}>{formatCurrency(inv.totalAmount)}</td>
                                        <td><span className={`badge ${statusBadge(inv.status)}`}>{inv.status}</span></td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{new Date(inv.invoiceDate).toLocaleDateString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
