'use client';
import { useRole, isAdmin } from '@/lib/roleContext';

const COMMITTEE = [
  { name: 'Rajesh Kumar', role: 'President', phone: '9876543210', flat: 'A-101' },
  { name: 'Suresh Babu', role: 'Secretary', phone: '9876543213', flat: 'A-202' },
  { name: 'Anitha Rao', role: 'Treasurer', phone: '9876543212', flat: 'A-201' },
  { name: 'Venkat Reddy', role: 'Joint Secretary', phone: '9876543215', flat: 'B-102' },
  { name: 'Lakshmi Devi', role: 'Cultural Committee Head', phone: '9876543214', flat: 'B-101' },
];

export default function AboutPage() {
  const { role } = useRole();
  const admin = isAdmin(role);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>
            🏛️ About the Association
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Fortune Towers Residential Flat Owners Welfare Association
          </p>
        </div>
        {admin && (
          <button className="btn-primary">
            ✏️ Edit Information
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* History */}
        <div className="glass" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📖 History of Fortune Towers
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>
            Fortune Towers was established as a modern residential complex built by Aditya Construction Company under their landmark residential projects initiative.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>
            The complex comprises three blocks (A, B, C) with a total of 126 residential flats spread across multiple floors, offering premium amenities to its residents.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.8 }}>
            The welfare association was formally constituted to manage common facilities, maintain accounts, and ensure a harmonious community living experience for all residents.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[['🏢', '126 Flats'], ['🏗️', '3 Blocks (A, B, C)'], ['🌟', 'Premium Amenities']].map(([icon, label]) => (
              <span key={label as string} className="badge badge-blue">{icon} {label}</span>
            ))}
          </div>
        </div>

        {/* Formation */}
        <div className="glass" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏛️ Formation of Association
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Association Name', value: 'Fortune Towers Flat Owners Welfare Association' },
              { label: 'Registration Type', value: 'Registered Society' },
              { label: 'Members', value: '126 Flat Owners' },
              { label: 'Governing Body', value: 'Executive Committee (elected annually)' },
              { label: 'Meeting Frequency', value: 'Monthly General Body Meeting' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', minWidth: '140px', paddingTop: '2px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  {label}
                </div>
                <div style={{ fontSize: '14px', color: '#e2e8f0' }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(99,102,241,0.08)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p style={{ fontSize: '13px', color: '#a5b4fc' }}>
              ℹ️ All flat owners are members by right. Viewing access is extended to all residents. Administrative rights are restricted to the Executive Committee.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Committee Table */}
      <div className="glass" style={{ padding: '28px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          👔 Executive Committee 2024-25
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Flat</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {COMMITTEE.map((m, i) => (
                <tr key={m.name}>
                  <td style={{ color: 'var(--text-muted)', width: '40px' }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #f59e0b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>
                        {m.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500, color: '#f1f5f9' }}>{m.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${i === 0 ? 'badge-yellow' : 'badge-blue'}`}>{m.role}</span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{m.flat}</td>
                  <td>
                    {admin ? (
                      <a href={`tel:${m.phone}`} style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '13px' }}>
                        📞 {m.phone}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>••••••••••</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!admin && (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
            🔒 Contact details visible to admin members only. Contact the Secretary for any inquiries.
          </p>
        )}
      </div>
    </div>
  );
}
