'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/lib/roleContext';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/about', label: 'About', icon: '🏛️' },
  { href: '/accounts', label: 'Accounts', icon: '💰' },
  { href: '/events', label: 'Events', icon: '📅' },
  { href: '/members', label: 'Members', icon: '👥' },
  { href: '/communication', label: 'Communication', icon: '📢' },
  { href: '/contact', label: 'Contact Us', icon: '📞' },
  { href: '/pictures', label: 'Pictures', icon: '🖼️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, role } = useRole();

  const roleLabel = {
    super_admin: 'Super Admin',
    committee_admin: 'Admin',
    resident: 'Resident',
    security_staff: 'Security',
  }[role];

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo & Branding */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid rgba(245,158,11,0.3)',
        }}>
          <Image
            src="/aditya-logo.jpg"
            alt="Aditya Logo"
            width={44}
            height={44}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9', lineHeight: 1.2 }}>
            Fortune Towers
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Community Portal
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '2px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : '#94a3b8',
                background: isActive
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                  : 'transparent',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
              }}
            >
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User chip */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
          }}>
            {currentUser.name.charAt(0)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {roleLabel} · {currentUser.flat}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
