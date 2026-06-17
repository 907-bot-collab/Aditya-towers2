'use client';
import { useState, useEffect } from 'react';
import { MockDB } from '@/lib/mockData';
import { useRole, canManageFinance } from '@/lib/roleContext';
import type { Transaction } from '@/lib/types';

const CATEGORIES: Record<string, string> = {
  maintenance: 'Maintenance',
  corpus_fund: 'Corpus Fund',
  sinking_fund: 'Sinking Fund',
  event_contribution: 'Event',
  repairs: 'Repairs',
  security_salary: 'Security Salary',
  utility_bill: 'Utility Bill',
  other: 'Other',
};

export default function AccountsPage() {
  const { role } = useRole();
  const canManage = canManageFinance(role);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', category: 'maintenance', type: 'income', amount: '', description: '', vendor: '' });

  useEffect(() => {
    let active = true;
    const load = () => {
      const txs = MockDB.getTransactions();
      if (active) {
        setTransactions(txs);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const handleAdd = () => {
    if (!form.date || !form.amount) return;
    const t: Transaction = {
      id: `t${Date.now()}`, date: form.date, category: form.category as Transaction['category'],
      type: form.type as 'income' | 'expense', amount: parseFloat(form.amount),
      description: form.description, vendor: form.vendor || undefined, created_at: new Date().toISOString(),
    };
    MockDB.addTransaction(t);
    setTransactions(MockDB.getTransactions());
    setShowModal(false);
    setForm({ date: '', category: 'maintenance', type: 'income', amount: '', description: '', vendor: '' });
  };

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title gradient-text" style={{ fontSize: '26px' }}>💰 Accounts & Finance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Income & Expenditure Ledger</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => window.print()}>⬇️ Download Report</button>
          {canManage && <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Transaction</button>}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Income', value: fmt(income), color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: '📈' },
          { label: 'Total Expenses', value: fmt(expense), color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '📉' },
          { label: 'Net Balance', value: fmt(income - expense), color: income >= expense ? '#10b981' : '#ef4444', bg: income >= expense ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', icon: '📊' },
        ].map(c => (
          <div key={c.label} className="glass" style={{ padding: '24px', borderLeft: `3px solid ${c.color}` }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>{c.icon} {c.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Transactions table */}
      <div className="glass" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>📋 Income & Expenditure Table</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Vendor</th>
                <th>Type</th>
                <th>Amount</th>
                {canManage && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
                    {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td><span className="badge badge-blue">{CATEGORIES[t.category] || t.category}</span></td>
                  <td style={{ maxWidth: '250px', fontSize: '13px' }}>{t.description}</td>
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.vendor || '—'}</td>
                  <td>
                    <span className={`badge ${t.type === 'income' ? 'badge-green' : 'badge-red'}`}>
                      {t.type === 'income' ? '↑ Income' : '↓ Expense'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: t.type === 'income' ? '#6ee7b7' : '#fca5a5', whiteSpace: 'nowrap' }}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                  {canManage && (
                    <td>
                      <button className="btn-danger" style={{ padding: '4px 10px', fontSize: '12px' }}
                        onClick={() => { MockDB.deleteTransaction(t.id); setTransactions(MockDB.getTransactions()); }}>
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>+ Add Transaction</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="label">Type</label>
                <select className="select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="label">Category</label>
                <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {Object.entries(CATEGORIES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Date</label>
                <input type="date" className="input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="label">Amount (₹)</label>
                <input type="number" className="input" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
              </div>
              <div>
                <label className="label">Description</label>
                <input type="text" className="input" placeholder="Enter description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="label">Vendor (optional)</label>
                <input type="text" className="input" placeholder="Vendor name" value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>✅ Save Transaction</button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
