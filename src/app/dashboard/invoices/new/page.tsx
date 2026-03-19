'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { INDIAN_STATES } from '@/lib/gst';
import { showToast } from '@/components/Toaster';

interface Customer { id: number; name: string; state: string | null; gstin: string | null; }
interface Product { id: number; name: string; hsnCode: string; gstRate: number; price: number; }
interface LineItem { productId: number; productName: string; hsnCode: string; quantity: number; unitPrice: number; gstRate: number; }

const stateOptions = Object.entries(INDIAN_STATES).map(([code, name]) => ({ code, name }));

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function NewInvoicePage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [customerId, setCustomerId] = useState<number>(0);
    const [sellerState, setSellerState] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [items, setItems] = useState<LineItem[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('/api/customers').then(r => r.json()),
            fetch('/api/products').then(r => r.json()),
        ]).then(([c, p]) => {
            setCustomers(c.data || []);
            setProducts(p.data || []);
            setLoading(false);
        }).catch(() => {
            showToast('Failed to load data', 'error');
            setLoading(false);
        });
    }, []);

    const selectedCustomer = customers.find(c => c.id === customerId);
    const isInterstate = sellerState && selectedCustomer?.state && sellerState !== selectedCustomer.state;

    const addItem = () => {
        if (products.length === 0) {
            showToast('Please add products first', 'error');
            return;
        }
        const p = products[0];
        setItems([...items, { productId: p.id, productName: p.name, hsnCode: p.hsnCode, quantity: 1, unitPrice: p.price, gstRate: p.gstRate }]);
    };

    const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
        const updated = [...items];
        if (field === 'productId') {
            const p = products.find(pr => pr.id === Number(value));
            if (p) {
                updated[index] = { ...updated[index], productId: p.id, productName: p.name, hsnCode: p.hsnCode, unitPrice: p.price, gstRate: p.gstRate };
            }
        } else if (field === 'quantity') {
            updated[index] = { ...updated[index], quantity: Number(value) || 1 };
        } else if (field === 'unitPrice') {
            updated[index] = { ...updated[index], unitPrice: Number(value) || 0 };
        }
        setItems(updated);
    };

    const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

    const totals = useMemo(() => {
        let subtotal = 0, totalCgst = 0, totalSgst = 0, totalIgst = 0;
        items.forEach(item => {
            const lineTotal = item.quantity * item.unitPrice;
            subtotal += lineTotal;
            const gstAmount = lineTotal * (item.gstRate / 100);
            if (isInterstate) { totalIgst += gstAmount; }
            else { totalCgst += gstAmount / 2; totalSgst += gstAmount / 2; }
        });
        const totalTax = totalCgst + totalSgst + totalIgst;
        return { subtotal, totalCgst, totalSgst, totalIgst, totalTax, total: subtotal + totalTax };
    }, [items, isInterstate]);

    const handleSubmit = async () => {
        if (!customerId || items.length === 0) {
            showToast('Please select a customer and add at least one item', 'error');
            return;
        }
        if (!sellerState) {
            showToast('Please select your state (Seller State)', 'error');
            return;
        }

        setSaving(true);
        const res = await fetch('/api/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerId, invoiceDate, dueDate: dueDate || null, notes: notes || null, sellerState,
                items: items.map(i => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice, gstRate: i.gstRate })),
            }),
        });
        const data = await res.json();
        setSaving(false);

        if (data.success) {
            showToast('Invoice created successfully');
            router.push(`/dashboard/invoices/${data.data.id}`);
        } else {
            showToast(data.error || 'Failed to create invoice', 'error');
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Link href="/dashboard/invoices" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>
                    <ArrowLeft size={16} /> Back to invoices
                </Link>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Create New Invoice</h1>
            </div>

            {/* Empty state check */}
            {(customers.length === 0 || products.length === 0) && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <div className="card-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <AlertCircle size={48} style={{ color: 'var(--warning)', marginBottom: 16 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Setup Required</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                            You need to add {customers.length === 0 && products.length === 0 ? 'customers and products' : customers.length === 0 ? 'customers' : 'products'} before creating an invoice.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {customers.length === 0 && (
                                <Link href="/dashboard/customers" className="btn btn-secondary">
                                    <Plus size={16} /> Add Customer
                                </Link>
                            )}
                            {products.length === 0 && (
                                <Link href="/dashboard/products" className="btn btn-secondary">
                                    <Plus size={16} /> Add Product
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice details */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-body">
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Invoice Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        <div>
                            <label className="label">Customer *</label>
                            <select className="input" value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))} disabled={customers.length === 0}>
                                <option value={0}>Select customer</option>
                                {customers.map(c => <option key={c.id} value={c.id}>{c.name}{c.gstin ? ` (${c.gstin})` : ''}</option>)}
                            </select>
                            {customers.length === 0 && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>No customers added yet</span>}
                        </div>
                        <div>
                            <label className="label">Your State (Seller) *</label>
                            <select className="input" value={sellerState} onChange={(e) => setSellerState(e.target.value)}>
                                <option value="">Select state</option>
                                {stateOptions.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Invoice Date</label>
                            <input className="input" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Due Date</label>
                            <input className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                    </div>
                    {selectedCustomer?.state && sellerState && (
                        <div style={{ marginTop: 12 }}>
                            <span className={`badge ${isInterstate ? 'badge-info' : 'badge-success'}`}>
                                {isInterstate ? `Interstate → IGST applies (${sellerState} → ${selectedCustomer.state})` : `Intrastate → CGST + SGST applies (${sellerState})`}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Line Items */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600 }}>Line Items</h3>
                    <button className="btn btn-secondary btn-sm" onClick={addItem} disabled={products.length === 0}><Plus size={14} /> Add Item</button>
                </div>
                <div style={{ padding: 24 }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 30 }}>
                            {products.length === 0 ? (
                                <>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>No products available</p>
                                    <Link href="/dashboard/products" className="btn btn-primary btn-sm"><Plus size={14} /> Add First Product</Link>
                                </>
                            ) : (
                                <button className="btn btn-primary btn-sm" onClick={addItem}><Plus size={14} /> Add First Item</button>
                            )}
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th style={{ width: 90 }}>HSN</th>
                                        <th style={{ width: 80 }}>Qty</th>
                                        <th style={{ width: 120 }}>Price</th>
                                        <th style={{ width: 70 }}>GST%</th>
                                        <th style={{ width: 120 }}>Total</th>
                                        <th style={{ width: 50 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, i) => {
                                        const lineTotal = item.quantity * item.unitPrice;
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <select className="input" value={item.productId} onChange={(e) => updateItem(i, 'productId', e.target.value)} style={{ minWidth: 150 }}>
                                                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                </td>
                                                <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{item.hsnCode}</td>
                                                <td><input className="input" type="number" min={1} value={item.quantity} onChange={(e) => updateItem(i, 'quantity', e.target.value)} /></td>
                                                <td><input className="input" type="number" step="0.01" value={item.unitPrice} onChange={(e) => updateItem(i, 'unitPrice', e.target.value)} /></td>
                                                <td><span className="badge badge-primary">{item.gstRate}%</span></td>
                                                <td style={{ fontWeight: 600 }}>{formatCurrency(lineTotal)}</td>
                                                <td><button className="btn btn-ghost btn-sm" onClick={() => removeItem(i)}><Trash2 size={14} style={{ color: 'var(--danger)' }} /></button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Totals */}
            {items.length > 0 && (
                <div className="card" style={{ marginBottom: 20 }}>
                    <div className="card-body">
                        <div style={{ maxWidth: 320, marginLeft: 'auto', display: 'grid', gap: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span>{formatCurrency(totals.subtotal)}</span>
                            </div>
                            {isInterstate ? (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>IGST</span>
                                    <span>{formatCurrency(totals.totalIgst)}</span>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>CGST</span>
                                        <span>{formatCurrency(totals.totalCgst)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>SGST</span>
                                        <span>{formatCurrency(totals.totalSgst)}</span>
                                    </div>
                                </>
                            )}
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Total Tax</span>
                                <span>{formatCurrency(totals.totalTax)}</span>
                            </div>
                            <div style={{ borderTop: '2px solid var(--text)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
                                <span>Grand Total</span>
                                <span style={{ color: 'var(--primary)' }}>{formatCurrency(totals.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-body">
                    <label className="label">Notes (optional)</label>
                    <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, bank details, or any other notes..." rows={3} />
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 40 }}>
                <Link href="/dashboard/invoices" className="btn btn-secondary">Cancel</Link>
                <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={!customerId || items.length === 0 || !sellerState || saving}>
                    {saving ? <span className="spinner" /> : 'Create Invoice'}
                </button>
            </div>
        </div>
    );
}
