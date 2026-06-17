'use client';
import { useState, useEffect } from 'react';
import { MockDB } from '@/lib/mockData';
import { useRole, canManageMembers } from '@/lib/roleContext';
import type { Flat } from '@/lib/types';

const OCCUPANCY_COLORS: Record<string, string> = {
  owner: 'badge-green',
  tenant: 'badge-yellow',
  vacant: 'badge-gray',
};

export default function MembersPage() {
  const { role } = useRole();
  const canManage = canManageMembers(role);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [search, setSearch] = useState('');
  const [blockFilter, setBlockFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editFlat, setEditFlat] = useState<Flat | null>(null);
  const [form, setForm] = useState({ id: '', block: 'A', floor_number: '1', unit_number: '', owner_name: '', owner_phone: '', owner_email: '', occupancy_status: 'owner', tenant_name: '', tenant_phone: '' });

  useEffect(() => {
    let active = true;
    const load = () => {
      const data = MockDB.getFlats();
      if (active) {
        setFlats(data);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = flats.filter(f => {
    const matchSearch = !search || f.owner_name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase()) || (f.tenant_name || '').toLowerCase().includes(search.toLowerCase());
    const matchBlock = !blockFilter || f.block === blockFilter;
    const matchStatus = !statusFilter || f.occupancy_status === statusFilter;
    return matchSearch && matchBlock && matchStatus;
  });

  const openAdd = () => {
    setEditFlat(null);
    setForm({ id: '', block: 'A', floor_number: '1', unit_number: '', owner_name: '', owner_phone: '', owner_email: '', occupancy_status: 'owner', tenant_name: '', tenant_phone: '' });
    setShowModal(true);
  };

  const openEdit = (flat: Flat) => {
    setEditFlat(flat);
    setForm({ ...flat, floor_number: String(flat.floor_number), tenant_name: flat.tenant_name || '', tenant_phone: flat.tenant_phone || '', owner_phone: flat.owner_phone || '', owner_email: flat.owner_email || '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.owner_name || !form.unit_number) return;
    if (editFlat) {
      const updatedFlat: Partial<Flat> = {
        block: form.block as Flat['block'],
        floor_number: parseInt(form.floor_number),
        unit_number: form.unit_number,
        owner_name: form.owner_name,
        owner_phone: form.owner_phone || undefined,
        owner_email: form.owner_email || undefined,
        occupancy_status: form.occupancy_status as Flat['occupancy_status'],
        tenant_name: form.tenant_name || undefined,
        tenant_phone: form.tenant_phone || undefined,
      };
      MockDB.updateFlat(editFlat.id, updatedFlat);
    } else {
      const newFlat: Flat = {
        id: `${form.block}-${form.unit_number}`,
        block: form.block as Flat['block'],
        floor_number: parseInt(form.floor_number),
        unit_number: form.unit_number,
        owner_name: form.owner_name,
        owner_phone: form.owner_phone || undefined,
        owner_email: form.owner_email || undefined,
        occupancy_status: form.occupancy_status as Flat['occupancy_status'],
        tenant_name: form.tenant_name || undefined,
        tenant_phone: form.tenant_phone || undefined,
        created_at: new Date().toISOString(),
      };
      MockDB.addFlat(newFlat);
    }
    setFlats(MockDB.getFlats());
    setShowModal(false);
  };

  const occupied = flats.filter(f => f.occupancy_status !== 'vacant').length;
  const vacant = flats.filter(f => f.occupancy_status === 'vacant').length;

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>👥 Members List</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Master directory of all flat owners and residents
          </p>
        </div>
        {canManage && (
          <button className="btn-primary" onClick={openAdd}>+ Add Member</button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input className="input" style={{ maxWidth: '280px' }} placeholder="🔍 Search by name, flat or tenant..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select" style={{ width: '140px' }} value={blockFilter} onChange={e => setBlockFilter(e.target.value)}>
          <option value="">All Blocks</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
        </select>
        <select className="select" style={{ width: '160px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
          <option value="vacant">Vacant</option>
        </select>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { label: `${flats.length} Total Flats`, color: '#6366f1' },
          { label: `${occupied} Occupied`, color: '#10b981' },
          { label: `${vacant} Vacant`, color: '#94a3b8' },
          { label: `${filtered.length} Showing`, color: '#f59e0b' },
        ].map(s => (
          <span key={s.label} style={{ fontSize: '13px', fontWeight: 600, color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}30`, padding: '4px 12px', borderRadius: '20px' }}>
            {s.label}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: '20px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Flat</th>
                <th>Block</th>
                <th>Owner Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Tenant</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#a5b4fc' }}>{f.id}</td>
                  <td><span className="badge badge-blue">Block {f.block}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #f59e0b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>
                        {f.owner_name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500, color: '#f1f5f9' }}>{f.owner_name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', color: '#94a3b8' }}>{f.owner_phone || '—'}</td>
                  <td><span className={`badge ${OCCUPANCY_COLORS[f.occupancy_status]}`}>{f.occupancy_status.charAt(0).toUpperCase() + f.occupancy_status.slice(1)}</span></td>
                  <td style={{ fontSize: '13px', color: '#94a3b8' }}>{f.tenant_name || '—'}</td>
                  {canManage && (
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => openEdit(f)}>✏️</button>
                        <button className="btn-danger" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => { MockDB.deleteFlat(f.id); setFlats(MockDB.getFlats()); }}>🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>
              {editFlat ? '✏️ Edit Member' : '+ Add New Member'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="label">Block</label>
                <select className="select" value={form.block} onChange={e => setForm(f => ({ ...f, block: e.target.value }))}>
                  {['A', 'B', 'C'].map(b => <option key={b} value={b}>Block {b}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Unit Number</label>
                <input className="input" placeholder="e.g. 101" value={form.unit_number} onChange={e => setForm(f => ({ ...f, unit_number: e.target.value }))} />
              </div>
              <div>
                <label className="label">Floor</label>
                <input type="number" className="input" value={form.floor_number} onChange={e => setForm(f => ({ ...f, floor_number: e.target.value }))} />
              </div>
              <div>
                <label className="label">Status</label>
                <select className="select" value={form.occupancy_status} onChange={e => setForm(f => ({ ...f, occupancy_status: e.target.value }))}>
                  <option value="owner">Owner</option>
                  <option value="tenant">Tenant</option>
                  <option value="vacant">Vacant</option>
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Owner Name</label>
                <input className="input" placeholder="Full name" value={form.owner_name} onChange={e => setForm(f => ({ ...f, owner_name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Owner Phone</label>
                <input className="input" placeholder="Phone" value={form.owner_phone} onChange={e => setForm(f => ({ ...f, owner_phone: e.target.value }))} />
              </div>
              <div>
                <label className="label">Owner Email</label>
                <input className="input" placeholder="Email" value={form.owner_email} onChange={e => setForm(f => ({ ...f, owner_email: e.target.value }))} />
              </div>
              {form.occupancy_status === 'tenant' && <>
                <div>
                  <label className="label">Tenant Name</label>
                  <input className="input" placeholder="Tenant name" value={form.tenant_name} onChange={e => setForm(f => ({ ...f, tenant_name: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Tenant Phone</label>
                  <input className="input" placeholder="Tenant phone" value={form.tenant_phone} onChange={e => setForm(f => ({ ...f, tenant_phone: e.target.value }))} />
                </div>
              </>}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleSave}>✅ Save</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
