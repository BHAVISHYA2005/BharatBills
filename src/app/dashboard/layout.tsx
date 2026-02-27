import Sidebar from '@/components/Sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: 250, padding: '32px 32px', minHeight: '100vh', background: 'var(--bg)' }} className="dashboard-main">
                <Breadcrumbs />
                {children}
            </main>
            <style>{`
        @media (max-width: 768px) {
          .dashboard-main { margin-left: 0 !important; padding: 24px 16px !important; padding-top: 60px !important; }
        }
      `}</style>
        </div>
    );
}
