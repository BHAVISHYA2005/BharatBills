import Sidebar from '@/components/Sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main className="dashboard-main-shell">
                <div className="top-blur-bar">
                    <div className="dashboard-inner">
                        <Breadcrumbs />
                    </div>
                </div>
                <div className="dashboard-inner">
                    {children}
                </div>
            </main>
        </div>
    );
}
