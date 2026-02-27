'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { showToast } from '@/components/Toaster';

interface InvoiceDetail {
    id: number;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string | null;
    status: string;
    subtotal: number;
    cgst: number;
    sgst: number;
    igst: number;
    totalTax: number;
    totalAmount: number;
    notes: string | null;
    customer: { name: string; email: string | null; phone: string | null; gstin: string | null; address: string | null; state: string | null };
    items: Array<{ id: number; quantity: number; unitPrice: number; lineTotal: number; gstRate: number; product: { name: string; hsnCode: string } }>;
}

const statusBadge = (s: string) => {
    const m: Record<string, string> = { draft: 'badge-default', sent: 'badge-info', paid: 'badge-success', overdue: 'badge-danger', cancelled: 'badge-warning' };
    return m[s] || 'badge-default';
};

const formatCurrency = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

const statusFlow = ['draft', 'sent', 'paid'];

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/invoices/${id}`)
            .then(r => r.json())
            .then(d => { setInvoice(d.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    const updateStatus = async (status: string) => {
        const res = await fetch(`/api/invoices/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
        const data = await res.json();
        if (data.success) {
            showToast(`Invoice marked as ${status}`);
            setInvoice(prev => prev ? { ...prev, status } : prev);
        } else {
            showToast('Failed to update status', 'error');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete this invoice permanently?')) return;
        const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            showToast('Invoice deleted');
            router.push('/dashboard/invoices');
        } else {
            showToast('Failed to delete invoice', 'error');
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;
    if (!invoice) return <div>Invoice not found</div>;

    const nextStatus = statusFlow[statusFlow.indexOf(invoice.status) + 1];

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Link href="/dashboard/invoices" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>
                <ArrowLeft size={16} /> Back to invoices
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700 }}>{invoice.invoiceNumber}</h1>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                        <span className={`badge ${statusBadge(invoice.status)}`}>{invoice.status}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Created {new Date(invoice.invoiceDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {nextStatus && (
                        <button className="btn btn-primary btn-sm" onClick={() => updateStatus(nextStatus)} style={{ textTransform: 'capitalize' }}>
                            Mark as {nextStatus}
                        </button>
                    )}
                    {invoice.status !== 'cancelled' && invoice.status !== 'paid' && (
                        <button className="btn btn-secondary btn-sm" onClick={() => updateStatus('cancelled')}>Cancel</button>
                    )}
                    <Link href={`/api/invoices/${id}/pdf`} className="btn btn-secondary btn-sm" target="_blank">
                        <Download size={14} /> PDF
                    </Link>
                    <button className="btn btn-ghost btn-sm" onClick={handleDelete} style={{ color: 'var(--danger)' }}>
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Invoice Card */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                        <div>
                            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bill To</h3>
                            <p style={{ fontWeight: 600, fontSize: 16 }}>{invoice.customer.name}</p>
                            {invoice.customer.gstin && <p style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>GSTIN: {invoice.customer.gstin}</p>}
                            {invoice.customer.address && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{invoice.customer.address}</p>}
                            {invoice.customer.state && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{invoice.customer.state}</p>}
                            {invoice.customer.email && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{invoice.customer.email}</p>}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Info</h3>
                            <p style={{ fontSize: 14 }}>Invoice #: <strong>{invoice.invoiceNumber}</strong></p>
                            <p style={{ fontSize: 14, marginTop: 4 }}>Date: {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</p>
                            {invoice.dueDate && <p style={{ fontSize: 14, marginTop: 4 }}>Due: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</p>}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>HSN</th>
                                    <th>Qty</th>
                                    <th>Rate</th>
                                    <th>GST%</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, i) => (
                                    <tr key={item.id}>
                                        <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                                        <td style={{ fontWeight: 500 }}>{item.product.name}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{item.product.hsnCode}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatCurrency(item.unitPrice)}</td>
                                        <td><span className="badge badge-primary">{item.gstRate}%</span></td>
                                        <td style={{ textAlign: 'right', fontWeight: 500 }}>{formatCurrency(item.lineTotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div style={{ maxWidth: 300, marginLeft: 'auto', marginTop: 24, display: 'grid', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                            <span>{formatCurrency(invoice.subtotal)}</span>
                        </div>
                        {invoice.igst > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>IGST</span>
                                <span>{formatCurrency(invoice.igst)}</span>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>CGST</span>
                                    <span>{formatCurrency(invoice.cgst)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>SGST</span>
                                    <span>{formatCurrency(invoice.sgst)}</span>
                                </div>
                            </>
                        )}
                        <div style={{ borderTop: '2px solid var(--text)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)' }}>{formatCurrency(invoice.totalAmount)}</span>
                        </div>
                    </div>

                    {invoice.notes && (
                        <div style={{ marginTop: 24, padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius)', fontSize: 14, color: 'var(--text-secondary)' }}>
                            <strong>Notes:</strong> {invoice.notes}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
