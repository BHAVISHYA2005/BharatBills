'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toastFn: (message: string, type?: ToastType) => void;

export const showToast = (message: string, type: ToastType = 'success') => {
    if (toastFn) toastFn(message, type);
};

export function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastFn = (message: string, type: ToastType = 'success') => {
            const id = Math.random().toString(36).substring(2, 9);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 4000);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'grid', gap: 10 }}>
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`toast ${t.type}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 16px',
                        background: 'white',
                        borderRadius: 12,
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                        borderLeft: `4px solid ${t.type === 'success' ? 'var(--success)' : t.type === 'error' ? 'var(--danger)' : 'var(--primary)'}`,
                        minWidth: 280,
                        animation: 'toast-in 0.3s ease-out'
                    }}
                >
                    {t.type === 'success' && <CheckCircle size={18} color="var(--success)" />}
                    {t.type === 'error' && <XCircle size={18} color="var(--danger)" />}
                    {t.type === 'info' && <Info size={18} color="var(--primary)" />}

                    <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{t.message}</span>

                    <button
                        onClick={() => removeToast(t.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-muted)' }}
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
            <style>{`
        @keyframes toast-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
