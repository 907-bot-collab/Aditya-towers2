'use client';
import { useState, useEffect } from 'react';
import { MockDB } from '@/lib/mockData';
import { useRole, canPublishNotices } from '@/lib/roleContext';
import type { Notice } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  maintenance: 'badge-yellow',
  security: 'badge-red',
  events: 'badge-blue',
  general: 'badge-purple',
  financial: 'badge-green',
};

const CATEGORY_BORDER: Record<string, string> = {
  maintenance: '#f59e0b',
  security: '#ef4444',
  events: '#6366f1',
  general: '#a78bfa',
  financial: '#10b981',
};

export default function CommunicationPage() {
  const { role } = useRole();
  const canPublish = canPublishNotices(role);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'general', is_pinned: false });

  useEffect(() => {
    let active = true;
    const load = () => {
      const data = MockDB.getNotices();
      if (active) {
        setNotices(data);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const pinned = notices.filter(n => n.is_pinned);
  const all = notices.filter(n => !n.is_pinned);

  const handleAdd = () => {
    if (!form.title || !form.content) return;
    const n: Notice = {
      id: `n${Date.now()}`,
      title: form.title,
      content: form.content,
      category: form.category as Notice['category'],
      is_pinned: form.is_pinned,
      created_at: new Date().toISOString(),
    };
    MockDB.addNotice(n);
    setNotices(MockDB.getNotices());
    setShowModal(false);
    setForm({ title: '', content: '', category: 'general', is_pinned: false });
  };

  const NoticeCard = ({ n, big }: { n: Notice; big?: boolean }) => (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid rgba(255,255,255,0.06)`,
      borderLeft: `4px solid ${CATEGORY_BORDER[n.category] || '#6366f1'}`,
      borderRadius: '12px',
      padding: big ? '20px' : '14px 16px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}
      onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            {n.is_pinned && <span style={{ fontSize: '14px' }}>📌</span>}
            <span className={`badge ${CATEGORY_COLORS[n.category] || 'badge-blue'}`}>
              {n.category.charAt(0).toUpperCase() + n.category.slice(1)}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <h3 style={{ fontSize: big ? '16px' : '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>{n.title}</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>
            {expandedId === n.id ? n.content : n.content.slice(0, 140) + (n.content.length > 140 ? '...' : '')}
          </p>
          {n.content.length > 140 && (
            <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', cursor: 'pointer', marginTop: '6px', padding: 0 }}>
              {expandedId === n.id ? '↑ Show less' : '→ Read more'}
            </button>
          )}
          {n.attachment_url && (
            <a href={n.attachment_url} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '12px', color: '#a5b4fc', textDecoration: 'none' }}>
              📎 Download attachment
            </a>
          )}
        </div>
        {canPublish && (
          <button className="btn-danger" style={{ padding: '4px 8px', fontSize: '11px', flexShrink: 0 }}
            onClick={e => { e.stopPropagation(); MockDB.deleteNotice(n.id); setNotices(MockDB.getNotices()); }}>
            🗑️
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>📢 Communication</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Minutes of meetings, circulars, notices & official communications
          </p>
        </div>
        {canPublish && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Post Notice</button>
        )}
      </div>

      {/* Pinned Notices */}
      {pinned.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            📌 PINNED NOTICES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
            {pinned.map(n => <NoticeCard key={n.id} n={n} big />)}
          </div>
        </div>
      )}

      {/* All Notices */}
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
          📋 ALL NOTICES & COMMUNICATIONS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {all.map(n => <NoticeCard key={n.id} n={n} />)}
          {all.length === 0 && pinned.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
              <p>No notices published yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>📢 Post New Notice</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="label">Title</label>
                <input className="input" placeholder="Notice title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['maintenance', 'security', 'events', 'general', 'financial'].map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Content</label>
                <textarea className="input" rows={5} placeholder="Notice content / circular text..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#cbd5e1' }}>
                <input type="checkbox" checked={form.is_pinned} onChange={e => setForm(f => ({ ...f, is_pinned: e.target.checked }))} />
                📌 Pin this notice (show at top)
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>✅ Publish Notice</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
