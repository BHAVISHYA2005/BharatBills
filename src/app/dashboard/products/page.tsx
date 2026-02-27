'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { VALID_GST_RATES } from '@/lib/gst';
import { showToast } from '@/components/Toaster';

interface Product {
    id: number;
    name: string;
    hsnCode: string;
    gstRate: number;
    price: number;
    description: string | null;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState({ name: '', hsnCode: '', gstRate: '18', price: '', description: '' });
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        const res = await fetch(`/api/products?search=${search}`);
        const data = await res.json();
        setProducts(data.data || []);
        setLoading(false);
    };

    useEffect(() => { fetchProducts(); }, [search]);

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', hsnCode: '', gstRate: '18', price: '', description: '' });
        setShowModal(true);
    };

    const openEdit = (p: Product) => {
        setEditing(p);
        setForm({ name: p.name, hsnCode: p.hsnCode, gstRate: String(p.gstRate), price: String(p.price), description: p.description || '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const url = editing ? `/api/products/${editing.id}` : '/api/products';
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const data = await res.json();
        setSaving(false);

        if (data.success) {
            showToast(editing ? 'Product updated successfully' : 'Product added successfully');
            setShowModal(false);
            fetchProducts();
        } else {
            showToast(data.error || 'Failed to save product', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this product?')) return;
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
            showToast('Product deleted');
            fetchProducts();
        } else {
            showToast('Failed to delete product', 'error');
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Products</h1>
                    <p>Manage your product and HSN catalog</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Product</button>
            </div>

            <div style={{ marginBottom: 20, position: 'relative', maxWidth: 400 }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 40 }} />
            </div>

            {products.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <h3>No products yet</h3>
                        <p>Add your first product to use in invoices</p>
                        <button className="btn btn-primary btn-sm" onClick={openCreate}><Plus size={14} /> Add Product</button>
                    </div>
                </div>
            ) : (
                <div className="card table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>HSN Code</th>
                                <th>GST Rate</th>
                                <th>Price</th>
                                <th style={{ width: 100 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{p.name}</div>
                                        {p.description && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{p.description}</div>}
                                    </td>
                                    <td><span style={{ fontFamily: 'monospace', fontSize: 13 }}>{p.hsnCode}</span></td>
                                    <td><span className="badge badge-primary">{p.gstRate}%</span></td>
                                    <td style={{ fontWeight: 500 }}>{formatCurrency(p.price)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(p.id)} style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
                            <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: 14 }}>
                                <div>
                                    <label className="label">Product Name *</label>
                                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label className="label">HSN Code *</label>
                                        <input className="input" value={form.hsnCode} onChange={(e) => setForm({ ...form, hsnCode: e.target.value })} placeholder="e.g. 6109" style={{ fontFamily: 'monospace' }} />
                                    </div>
                                    <div>
                                        <label className="label">GST Rate *</label>
                                        <select className="input" value={form.gstRate} onChange={(e) => setForm({ ...form, gstRate: e.target.value })}>
                                            {VALID_GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Price (₹) *</label>
                                    <input className="input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="label">Description</label>
                                    <textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" rows={2} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.hsnCode || !form.price || saving}>
                                {saving ? <span className="spinner" /> : (editing ? 'Update' : 'Add Product')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
