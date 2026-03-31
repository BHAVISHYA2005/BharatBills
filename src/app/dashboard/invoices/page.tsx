'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, FileText } from 'lucide-react';

interface Invoice {
    id: number;
    invoiceNumber: string;
    totalAmount: number;
    status: string;
    invoiceDate: string;
    customer: { name: string };
}

const statusBadge = (status: string) => {
    const map: Record<string, string> = { draft: 'badge-default', sent: 'badge-info', paid: 'badge-success', overdue: 'badge-danger', cancelled: 'badge-warning' };
    return map[status] || 'badge-default';
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const statuses = ['all', 'draft', 'sent', 'paid', 'overdue', 'cancelled'];

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchInvoices = async () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (statusFilter !== 'all') params.set('status', statusFilter);
        const res = await fetch(`/api/invoices?${params}`);
        const data = await res.json();
        setInvoices(data.data || []);
        setLoading(false);
    };

    useEffect(() => { fetchInvoices(); }, [search, statusFilter]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Invoices</h1>
                    <p>Manage your invoices</p>
                </div>
                <Link href="/dashboard/invoices/new" className="btn btn-primary"><Plus size={16} /> New Invoice</Link>
            </div>

            <div className="toolbar">
                <div className="icon-input-wrap">
                    <Search size={16} />
                    <input className="input" placeholder="Search by invoice # or customer..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="chip-group">
                    {statuses.map(s => (
                        <button
                            key={s}
                            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setStatusFilter(s)}
                            style={{ textTransform: 'capitalize' }}
                        >{s}</button>
                    ))}
                </div>
            </div>

            {invoices.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <FileText size={40} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
                        <h3>No invoices found</h3>
                        <p>{statusFilter !== 'all' ? 'No invoices match this filter' : 'Create your first invoice to get started'}</p>
                        <Link href="/dashboard/invoices/new" className="btn btn-primary btn-sm"><Plus size={14} /> Create Invoice</Link>
                    </div>
                </div>
            ) : (
                <div className="card table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice #</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td>
                                        <Link href={`/dashboard/invoices/${inv.id}`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                                            {inv.invoiceNumber}
                                        </Link>
                                    </td>
                                    <td>{inv.customer.name}</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(inv.totalAmount)}</td>
                                    <td><span className={`badge ${statusBadge(inv.status)}`}>{inv.status}</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{new Date(inv.invoiceDate).toLocaleDateString('en-IN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
