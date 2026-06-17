'use client';
import { useState, useEffect } from 'react';
import { MockDB } from '@/lib/mockData';
import { useRole, canManageEvents } from '@/lib/roleContext';
import type { Event } from '@/lib/types';

export default function EventsPage() {
  const { role } = useRole();
  const canManage = canManageEvents(role);
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', event_date: '', event_time: '', venue: '', organizer: '' });

  useEffect(() => {
    let active = true;
    const load = () => {
      const data = MockDB.getEvents();
      if (active) {
        setEvents(data);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = () => {
    if (!form.title || !form.event_date) return;
    const ev: Event = {
      id: `e${Date.now()}`, ...form, created_at: new Date().toISOString(), rsvp_count: 0,
    };
    MockDB.addEvent(ev);
    setEvents(MockDB.getEvents());
    setShowModal(false);
    setForm({ title: '', description: '', event_date: '', event_time: '', venue: '', organizer: '' });
  };

  const handleRsvp = (id: string) => {
    const ev = events.find(e => e.id === id);
    if (!ev) return;
    setEvents(prev => prev.map(e => e.id === id ? { ...e, rsvp_count: (e.rsvp_count || 0) + 1, my_rsvp: 'going' } : e));
  };

  const isUpcoming = (dateStr: string) => new Date(dateStr) >= new Date();

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>📅 Events</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Community meetings, cultural activities and celebrations
          </p>
        </div>
        {canManage && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Event</button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {events.map(ev => (
          <div key={ev.id} className="glass hover-lift" style={{ overflow: 'hidden', cursor: 'default' }}>
            {/* Color banner */}
            <div style={{
              height: '100px',
              background: `linear-gradient(135deg, hsl(${ev.id.charCodeAt(1) * 30}, 70%, 35%), hsl(${ev.id.charCodeAt(1) * 50}, 80%, 25%))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}>
              {ev.organizer.includes('Cultural') ? '🎭' : ev.organizer.includes('Welfare') ? '❤️' : ev.organizer.includes('Festival') ? '🪔' : '🏛️'}
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span className={`badge ${isUpcoming(ev.event_date) ? 'badge-green' : 'badge-gray'}`}>
                  {isUpcoming(ev.event_date) ? '🟢 Upcoming' : '⬜ Past'}
                </span>
                {canManage && (
                  <button className="btn-danger" style={{ padding: '3px 8px', fontSize: '11px' }}
                    onClick={() => { MockDB.deleteEvent(ev.id); setEvents(MockDB.getEvents()); }}>
                    🗑️
                  </button>
                )}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '10px', lineHeight: 1.3 }}>{ev.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>
                <div>📅 {new Date(ev.event_date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })} · {ev.event_time}</div>
                <div>📍 {ev.venue}</div>
                <div>👤 {ev.organizer}</div>
              </div>

              {ev.description && (
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '14px' }}>
                  {ev.description.slice(0, 120)}...
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  👥 {ev.rsvp_count || 0} RSVPs
                </span>
                {isUpcoming(ev.event_date) && (
                  <button
                    className={ev.my_rsvp === 'going' ? 'btn-success' : 'btn-primary'}
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                    onClick={() => handleRsvp(ev.id)}
                    disabled={ev.my_rsvp === 'going'}
                  >
                    {ev.my_rsvp === 'going' ? '✅ Going!' : '✋ RSVP'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>📅 Add New Event</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Event Title', key: 'title', type: 'text', placeholder: 'e.g. Annual General Meeting' },
                { label: 'Date', key: 'event_date', type: 'date', placeholder: '' },
                { label: 'Time', key: 'event_time', type: 'time', placeholder: '' },
                { label: 'Venue', key: 'venue', type: 'text', placeholder: 'e.g. Club House, Ground Floor' },
                { label: 'Organizer', key: 'organizer', type: 'text', placeholder: 'e.g. Executive Committee' },
              ].map(f => (
                <div key={f.key}>
                  <label className="label">{f.label}</label>
                  <input type={f.type} className="input" placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="label">Description</label>
                <textarea className="input" rows={3} placeholder="Event description..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>✅ Create Event</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
