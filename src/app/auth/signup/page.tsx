'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Signup failed');
                return;
            }

            router.push('/dashboard');
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>BharatBills</h1>
                    </Link>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Create your account</p>
                </div>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div style={{ padding: '10px 14px', background: 'var(--danger-light)', color: '#991B1B', borderRadius: 'var(--radius)', fontSize: 14, marginBottom: 16 }}>
                                    {error}
                                </div>
                            )}

                            <div style={{ marginBottom: 16 }}>
                                <label className="label" htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    className="input"
                                    type="text"
                                    placeholder="Rajesh Kumar"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className="label" htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    className="input"
                                    type="email"
                                    placeholder="rajesh@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <label className="label" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    className="input"
                                    type="password"
                                    placeholder="Min 6 characters"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%' }}>
                                {loading ? <span className="spinner" /> : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>

                <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
