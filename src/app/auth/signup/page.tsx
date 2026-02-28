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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
            <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>BharatBills</h1>
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

                        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1, height: 1, background: '#eee' }}></div>
                            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>OR</span>
                            <div style={{ flex: 1, height: 1, background: '#eee' }}></div>
                        </div>

                        <button
                            className="btn btn-secondary btn-lg"
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'white', color: 'var(--text)' }}
                            onClick={() => {
                                // signIn will be handled by Auth.js /api/auth/signin/google
                                window.location.href = '/api/auth/signin/google';
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
                                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.173 0 7.548 0 9s.347 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.582C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.295C4.672 5.168 6.656 3.58 9 3.58z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
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
