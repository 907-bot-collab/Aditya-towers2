'use client';
import { useState, useRef } from 'react';
import { useRole, isAdmin } from '@/lib/roleContext';

type MediaCategory = 'all' | 'events' | 'building' | 'approvals' | 'documents' | 'drawings';

interface MediaItem {
  id: string;
  title: string;
  category: Exclude<MediaCategory, 'all'>;
  date: string;
  type: 'image' | 'document';
  gradient: string;
  emoji: string;
}

const DEMO_ITEMS: MediaItem[] = [
  { id: '1', title: 'Independence Day 2024', category: 'events', date: '2024-08-15', type: 'image', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', emoji: '🇮🇳' },
  { id: '2', title: 'Annual Meeting 2023', category: 'events', date: '2023-08-20', type: 'image', gradient: 'linear-gradient(135deg, #6366f1, #a78bfa)', emoji: '🏛️' },
  { id: '3', title: 'Building Approval Certificate', category: 'approvals', date: '2020-01-10', type: 'document', gradient: 'linear-gradient(135deg, #10b981, #059669)', emoji: '📜' },
  { id: '4', title: 'Deepavali Celebration 2023', category: 'events', date: '2023-11-12', type: 'image', gradient: 'linear-gradient(135deg, #f59e0b, #fcd34d)', emoji: '🪔' },
  { id: '5', title: 'Architectural Drawing – Block A', category: 'drawings', date: '2019-06-01', type: 'document', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', emoji: '📐' },
  { id: '6', title: 'Garden Area Inauguration', category: 'events', date: '2024-01-20', type: 'image', gradient: 'linear-gradient(135deg, #10b981, #6ee7b7)', emoji: '🌿' },
  { id: '7', title: 'Society Registration Certificate', category: 'documents', date: '2015-03-15', type: 'document', gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)', emoji: '📋' },
  { id: '8', title: 'Club House Inauguration', category: 'building', date: '2022-12-01', type: 'image', gradient: 'linear-gradient(135deg, #ec4899, #f59e0b)', emoji: '🏠' },
  { id: '9', title: 'Ganesh Festival 2024', category: 'events', date: '2024-09-07', type: 'image', gradient: 'linear-gradient(135deg, #f97316, #fcd34d)', emoji: '🐘' },
];

const CATEGORY_LABELS: Record<MediaCategory, string> = {
  all: '🗂️ All',
  events: '🎉 Events',
  building: '🏢 Building',
  approvals: '✅ Approvals',
  documents: '📋 Documents',
  drawings: '📐 Drawings',
};

const CATEGORY_COLORS: Record<string, string> = {
  events: 'badge-blue',
  building: 'badge-purple',
  approvals: 'badge-green',
  documents: 'badge-gray',
  drawings: 'badge-yellow',
};

export default function PicturesPage() {
  const { role } = useRole();
  const admin = isAdmin(role);
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('all');
  const [hovered, setHovered] = useState<string | null>(null);
  const [items, setItems] = useState<MediaItem[]>(DEMO_ITEMS);
  const [showUpload, setShowUpload] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: 'events', type: 'image' });
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory);

  const handleUpload = () => {
    if (!newItem.title) return;
    const gradients = [
      'linear-gradient(135deg, #6366f1, #a78bfa)',
      'linear-gradient(135deg, #10b981, #059669)',
      'linear-gradient(135deg, #f59e0b, #ef4444)',
      'linear-gradient(135deg, #3b82f6, #6366f1)',
    ];
    const emojis: Record<string, string> = { events: '🎉', building: '🏢', approvals: '✅', documents: '📋', drawings: '📐' };
    setItems(prev => [{
      id: `custom-${Date.now()}`, title: newItem.title,
      category: newItem.category as Exclude<MediaCategory, 'all'>,
      date: new Date().toISOString().split('T')[0],
      type: newItem.type as 'image' | 'document',
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      emoji: emojis[newItem.category] || '📁',
    }, ...prev]);
    setShowUpload(false);
    setNewItem({ title: '', category: 'events', type: 'image' });
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>🖼️ Pictures & Gallery</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Community photos, drawings, approvals and official documents
          </p>
        </div>
        {admin && (
          <button className="btn-primary" onClick={() => setShowUpload(true)}>⬆️ Upload</button>
        )}
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {(Object.keys(CATEGORY_LABELS) as MediaCategory[]).map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
            background: activeCategory === cat ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255,255,255,0.06)',
            color: activeCategory === cat ? '#fff' : '#94a3b8',
            boxShadow: activeCategory === cat ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
          }}>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map(item => (
          <div
            key={item.id}
            style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.2s ease' }}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Thumbnail */}
            <div style={{
              height: '180px', background: item.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '52px', position: 'relative', overflow: 'hidden',
              transform: hovered === item.id ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}>
              {item.emoji}
              {item.type === 'document' && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                  📄 DOC
                </div>
              )}
              {/* Hover overlay */}
              {hovered === item.id && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  animation: 'fadeIn 0.15s ease',
                }}>
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', backdropFilter: 'blur(4px)' }}>
                    👁️ View
                  </button>
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    ⬇️ Download
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ background: 'var(--bg-card)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className={`badge ${CATEGORY_COLORS[item.category] || 'badge-gray'}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                {admin && (
                  <button className="btn-danger" style={{ padding: '4px 8px', fontSize: '11px', flexShrink: 0 }}
                    onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}>
                    🗑️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🖼️</div>
          <p style={{ fontSize: '16px' }}>No items in this category yet.</p>
          {admin && <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => setShowUpload(true)}>⬆️ Upload First Item</button>}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>⬆️ Upload to Gallery</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="label">Title</label>
                <input className="input" placeholder="e.g. Annual Meeting 2024" value={newItem.title} onChange={e => setNewItem(n => ({ ...n, title: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="label">Category</label>
                  <select className="select" value={newItem.category} onChange={e => setNewItem(n => ({ ...n, category: e.target.value }))}>
                    {['events', 'building', 'approvals', 'documents', 'drawings'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="select" value={newItem.type} onChange={e => setNewItem(n => ({ ...n, type: e.target.value }))}>
                    <option value="image">📷 Image / Photo</option>
                    <option value="document">📄 Document / PDF</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Select File</label>
                <div style={{
                  border: '2px dashed rgba(99,102,241,0.3)', borderRadius: '10px', padding: '24px',
                  textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px',
                }} onClick={() => fileRef.current?.click()}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                  Click to select a file or drag & drop
                  <input ref={fileRef} type="file" style={{ display: 'none' }} accept="image/*,.pdf" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleUpload}>✅ Upload</button>
              <button className="btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
