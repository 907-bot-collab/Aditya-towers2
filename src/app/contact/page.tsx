'use client';
import { useState, useEffect } from 'react';
import { MockDB } from '@/lib/mockData';
import { useRole, canUpdateComplaintStatus } from '@/lib/roleContext';
import type { Complaint } from '@/lib/types';

const PRIORITY_COLORS: Record<string, string> = {
  low: 'badge-gray', medium: 'badge-yellow', high: 'badge-red', urgent: 'badge-red',
};
const STATUS_COLORS: Record<string, string> = {
  submitted: 'badge-blue', assigned: 'badge-yellow', in_progress: 'badge-purple', resolved: 'badge-green',
};

export default function ContactPage() {
  const { role, currentUser } = useRole();
  const canUpdate = canUpdateComplaintStatus(role);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [tab, setTab] = useState<'info' | 'complaint'>('info');
  const [form, setForm] = useState({ title: '', description: '', category: 'water', priority: 'medium' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;
    const load = () => {
      const data = MockDB.getComplaints();
      if (active) {
        setComplaints(data);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const myComplaints = complaints.filter(c => c.raised_by === 'mock-user');

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    const c: Complaint = {
      id: `c${Date.now()}`, title: form.title, description: form.description,
      category: form.category as Complaint['category'], status: 'submitted',
      priority: form.priority as Complaint['priority'], raised_by: 'mock-user',
      created_at: new Date().toISOString(), raised_by_name: currentUser.name,
    };
    MockDB.addComplaint(c);
    setComplaints(MockDB.getComplaints());
    setSubmitted(true);
    setForm({ title: '', description: '', category: 'water', priority: 'medium' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const COMMITTEE = [
    { name: 'Rajesh Kumar', role: 'President', phone: '+91 98765 43210', emoji: '👑' },
    { name: 'Suresh Babu', role: 'Secretary', phone: '+91 98765 43213', emoji: '📋' },
    { name: 'Anitha Rao', role: 'Treasurer', phone: '+91 98765 43212', emoji: '💰' },
    { name: 'Security Head', role: 'Security', phone: '+91 98765 43219', emoji: '🔒' },
  ];

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>📞 Contact Us</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Reach out to the Executive Committee or lodge a maintenance complaint
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px', width: 'fit-content', marginBottom: '24px' }}>
        {[{ key: 'info', label: '📍 Contact Info' }, { key: 'complaint', label: '🔧 Lodge Complaint' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as 'info' | 'complaint')} style={{
            padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s',
            background: tab === t.key ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
            color: tab === t.key ? '#fff' : '#94a3b8',
            boxShadow: tab === t.key ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'info' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Club House Address */}
          <div className="glass" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>📍 Club House Address</h2>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '15px', lineHeight: 2 }}>
                <strong>Fortune Towers Club House</strong><br />
                Ground Floor, Main Building<br />
                Fortune Towers Complex<br />
                📮 [Your Society Address Here]
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
                <span>📞</span> Security Gate: <span style={{ color: '#a5b4fc', fontWeight: 600 }}>+91 XXXXX XXXXX</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
                <span>✉️</span> Email: <span style={{ color: '#a5b4fc', fontWeight: 600 }}>secretary@fortunetowers.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
                <span>🕐</span> Office Hours: <span style={{ color: '#a5b4fc', fontWeight: 600 }}>10 AM – 12 PM (Weekdays)</span>
              </div>
            </div>
          </div>

          {/* Executive Committee */}
          <div className="glass" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>👔 Executive Committee</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMMITTEE.map(m => (
                <div key={m.name} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px',
                }}>
                  <div style={{ fontSize: '24px', width: '40px', textAlign: 'center' }}>{m.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{m.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{m.role}</div>
                  </div>
                  <a href={`tel:${m.phone.replace(/\s/g, '')}`} style={{ fontSize: '13px', color: '#a5b4fc', textDecoration: 'none', fontWeight: 500 }}>
                    {m.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* My Complaints */}
          <div className="glass" style={{ padding: '28px', gridColumn: '1/-1' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>📋 My Complaints</h2>
            {myComplaints.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No complaints submitted yet.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr><th>Title</th><th>Category</th><th>Priority</th><th>Status</th><th>Date</th>
                      {canUpdate && <th>Update</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {myComplaints.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 500 }}>{c.title}</td>
                        <td><span className="badge badge-blue">{c.category}</span></td>
                        <td><span className={`badge ${PRIORITY_COLORS[c.priority]}`}>{c.priority}</span></td>
                        <td><span className={`badge ${STATUS_COLORS[c.status]}`}>{c.status.replace('_', ' ')}</span></td>
                        <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        {canUpdate && (
                          <td>
                            <select className="select" style={{ width: '140px', padding: '4px 8px', fontSize: '12px' }}
                              value={c.status}
                              onChange={e => { MockDB.updateComplaintStatus(c.id, e.target.value); setComplaints(MockDB.getComplaints()); }}>
                              {['submitted', 'assigned', 'in_progress', 'resolved'].map(s => (
                                <option key={s} value={s}>{s.replace('_', ' ')}</option>
                              ))}
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'complaint' && (
        <div style={{ maxWidth: '600px' }}>
          {submitted && (
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', color: '#6ee7b7', fontWeight: 600 }}>
              ✅ Complaint submitted successfully! Our team will contact you soon.
            </div>
          )}
          <div className="glass" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>🔧 Lodge a Complaint</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="label">Category</label>
                  <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {['water', 'lift', 'electrical', 'security', 'housekeeping', 'other'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Priority</label>
                  <select className="select" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                    {['low', 'medium', 'high', 'urgent'].map(p => (
                      <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Complaint Title</label>
                <input className="input" placeholder="Brief title of the issue" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input" rows={5} placeholder="Describe the issue in detail — location, duration, impact..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <button className="btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }} onClick={handleSubmit}>
                🚀 Submit Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
