export default function DashboardLoading() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 200, height: 32, background: '#eee', borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: 120, height: 40, background: '#eee', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                <div style={{ height: 120, background: 'white', border: '1px solid #eee', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: 120, background: 'white', border: '1px solid #eee', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: 120, background: 'white', border: '1px solid #eee', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: 120, background: 'white', border: '1px solid #eee', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ height: 400, background: 'white', border: '1px solid #eee', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />

            <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}
