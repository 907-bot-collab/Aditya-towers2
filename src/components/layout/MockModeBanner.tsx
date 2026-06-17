'use client';
export default function MockModeBanner() {
  const isSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co';
  if (isSupabase) return null;
  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(245,158,11,0.15), rgba(99,102,241,0.15))',
      borderBottom: '1px solid rgba(245,158,11,0.3)',
      padding: '8px 20px',
      textAlign: 'center',
      fontSize: '12px',
      color: '#fcd34d',
      fontWeight: 500,
    }}>
      🟡 Demo Mode — Using local data. Connect Supabase in <code style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: '4px' }}>.env.local</code> for live data.
    </div>
  );
}
