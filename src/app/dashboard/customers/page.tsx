'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { INDIAN_STATES } from '@/lib/gst';

interface Customer {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    gstin: string | null;
    address: string | null;
    state: string | null;
}

const stateOptions = Object.entries(INDIAN_STATES).map(([code, name]) => ({ code, name }));

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Customer | null>(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '', gstin: '', address: '', state: '' });
    const [saving, setSaving] = useState(false);

    const fetchCustomers = async () => {
        const res = await fetch(`/api/customers?search=${search}`);
        const data = await res.json();
        setCustomers(data.data || []);
        setLoading(false);
    };

    useEffect(() => { fetchCustomers(); }, [search]);

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', email: '', phone: '', gstin: '', address: '', state: '' });
        setShowModal(true);
    };

    const openEdit = (c: Customer) => {
        setEditing(c);
        setForm({ name: c.name, email: c.email || '', phone: c.phone || '', gstin: c.gstin || '', address: c.address || '', state: c.state || '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const url = editing ? `/api/customers/${editing.id}` : '/api/customers';
        const method = editing ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setSaving(false);
        setShowModal(false);
        fetchCustomers();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this customer?')) return;
        await fetch(`/api/customers/${id}`, { method: 'DELETE' });
        fetchCustomers();
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your customer database</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Customer</button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 20, position: 'relative', maxWidth: 400 }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 40 }} />
            </div>

            {customers.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <h3>No customers yet</h3>
                        <p>Add your first customer to start creating invoices</p>
                        <button className="btn btn-primary btn-sm" onClick={openCreate}><Plus size={14} /> Add Customer</button>
                    </div>
                </div>
            ) : (
                <div className="card table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>GSTIN</th>
                                <th>State</th>
                                <th style={{ width: 100 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 500 }}>{c.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{c.email || '—'}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{c.phone || '—'}</td>
                                    <td><span style={{ fontFamily: 'monospace', fontSize: 12 }}>{c.gstin || '—'}</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{c.state || '—'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}><Edit2 size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(c.id)} style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit Customer' : 'Add Customer'}</h2>
                            <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: 14 }}>
                                <div>
                                    <label className="label">Name *</label>
                                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Customer name" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label className="label">Email</label>
                                        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
                                    </div>
                                    <div>
                                        <label className="label">Phone</label>
                                        <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">GSTIN</label>
                                    <input className="input" value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })} placeholder="22AAAAA0000A1Z5" style={{ fontFamily: 'monospace' }} />
                                </div>
                                <div>
                                    <label className="label">State</label>
                                    <select className="input" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                                        <option value="">Select state</option>
                                        {stateOptions.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Address</label>
                                    <textarea className="textarea" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" rows={2} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || saving}>
                                {saving ? <span className="spinner" /> : (editing ? 'Update' : 'Add Customer')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
