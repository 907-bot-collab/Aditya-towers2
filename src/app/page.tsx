'use client';
import { getMockDashboardStats, MockDB } from '@/lib/mockData';

export default function DashboardPage() {
  const stats = getMockDashboardStats();
  const events = MockDB.getEvents().slice(0, 3);
  const notices = MockDB.getNotices().filter(n => n.is_pinned).slice(0, 2);

  const statCards = [
    { label: 'Total Flats', value: stats.totalFlats, icon: '🏢', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { label: 'Occupied Flats', value: stats.occupiedFlats, icon: '👨‍👩‍👧', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: '📅', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Pending Complaints', value: stats.pendingComplaints, icon: '🔧', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    { label: 'Total Income', value: `₹${(stats.totalIncome / 100000).toFixed(1)}L`, icon: '💰', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'Total Expenses', value: `₹${(stats.totalExpenses / 100000).toFixed(1)}L`, icon: '📉', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    { label: 'Active Notices', value: stats.activeNotices, icon: '📢', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { label: 'Net Balance', value: `₹${((stats.totalIncome - stats.totalExpenses) / 100000).toFixed(1)}L`, icon: '📊', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          🏠 Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Welcome to the Fortune Towers Community Portal
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statCards.map((s) => (
          <div key={s.label} className="stat-card hover-lift">
            <div className="stat-icon" style={{ background: s.bg }}>
              <span style={{ fontSize: '22px' }}>{s.icon}</span>
            </div>
            <div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom grid: Events + Notices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Upcoming Events */}
        <div className="glass" style={{ padding: '24px' }}>
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <h2 className="section-title" style={{ fontSize: '16px' }}>📅 Upcoming Events</h2>
            <a href="/events" style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map(ev => (
              <div key={ev.id} style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '10px',
                padding: '12px 14px',
                borderLeft: '3px solid #6366f1',
              }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9', marginBottom: '4px' }}>{ev.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  📅 {new Date(ev.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &nbsp;·&nbsp; 📍 {ev.venue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Notices */}
        <div className="glass" style={{ padding: '24px' }}>
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <h2 className="section-title" style={{ fontSize: '16px' }}>📌 Pinned Notices</h2>
            <a href="/communication" style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notices.map(n => (
              <div key={n.id} style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '10px',
                padding: '12px 14px',
                borderLeft: '3px solid #f59e0b',
              }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9', marginBottom: '4px' }}>📌 {n.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {n.content.slice(0, 100)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
