'use client';
import { useState } from 'react';
import { useRole } from '@/lib/roleContext';
import type { Role } from '@/lib/types';

const ROLES: { value: Role; label: string; color: string }[] = [
  { value: 'super_admin', label: '🔑 Super Admin', color: '#ef4444' },
  { value: 'committee_admin', label: '🛡️ Admin', color: '#f59e0b' },
  { value: 'resident', label: '🏠 Resident', color: '#6366f1' },
  { value: 'security_staff', label: '🔒 Security', color: '#10b981' },
];

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const current = ROLES.find(r => r.value === role)!;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
      {open && (
        <div style={{
          position: 'absolute',
          bottom: '48px',
          right: 0,
          background: '#1a1a2e',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px',
          padding: '8px',
          minWidth: '170px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: '10px', color: '#64748b', padding: '4px 8px 8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Switch Role (Demo)
          </div>
          {ROLES.map(r => (
            <button
              key={r.value}
              onClick={() => { setRole(r.value); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                background: r.value === role ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: r.value === role ? '#a5b4fc' : '#94a3b8',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: r.value === role ? 600 : 400,
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        title="Switch demo role"
        style={{
          background: `rgba(${current.color === '#ef4444' ? '239,68,68' : current.color === '#f59e0b' ? '245,158,11' : current.color === '#6366f1' ? '99,102,241' : '16,185,129'},0.15)`,
          border: `1px solid ${current.color}40`,
          borderRadius: '20px',
          padding: '6px 14px',
          color: current.color,
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        {current.label} <span style={{ opacity: 0.7 }}>▲</span>
      </button>
    </div>
  );
}
