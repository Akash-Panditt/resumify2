import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';

const Icon = ({ path, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  dashboard: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  approvals: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
  templates: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
  categories: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
  pricing: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  payments: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></>,
  announcements: <><polygon points="11 19 2 12 11 5 11 19"/><path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('resumify_admin') || '{}');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (err) {
      console.error('Logout failed', err);
    }
    localStorage.removeItem('resumify_admin');
    localStorage.removeItem('resumify_user');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <Icon path={ICONS.dashboard} /> },
    { name: 'Users', path: '/admin/users', icon: <Icon path={ICONS.users} /> },
    { name: 'Approvals', path: '/admin/approvals', icon: <Icon path={ICONS.approvals} /> },
    { name: 'Templates', path: '/admin/templates', icon: <Icon path={ICONS.templates} /> },
    { name: 'Pricing', path: '/admin/pricing', icon: <Icon path={ICONS.pricing} /> },
    { name: 'Payments', path: '/admin/payments', icon: <Icon path={ICONS.payments} /> },
    { name: 'Announcements', path: '/admin/announcements', icon: <Icon path={ICONS.announcements} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Icon path={ICONS.settings} /> },
  ];

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Robust Authorization Check
    if (!user.token || user.role !== 'admin') {
      console.warn('Unauthorized access attempt to admin panel');
      localStorage.removeItem('resumify_admin');
      navigate('/admin/login');
    }
  }, [user.token, user.role, navigate]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        if (!user.token) return;
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setPendingCount(res.data.pendingUpgradesCount || 0);
      } catch (err) {
        console.error('Failed to fetch pending count', err);
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 10000); // Check every 10 seconds for snappier updates
    return () => clearInterval(interval);
  }, [user.token]);

  return (
    <div className="admin-container" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'var(--bg-color)',
      position: 'relative'
    }}>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
        width: '260px', 
        borderRight: '1px solid var(--surface-border)', 
        padding: '2rem 1.5rem', 
        background: 'var(--surface)', 
        backdropFilter: 'blur(10px)', 
        position: isMobile ? 'fixed' : 'sticky', 
        left: isMobile ? (isSidebarOpen ? 0 : '-260px') : 0,
        top: 0, 
        height: '100vh', 
        display: isMobile && !isSidebarOpen ? 'none' : 'flex', 
        flexDirection: 'column',
        zIndex: 999,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isMobile && isSidebarOpen ? '20px 0 50px rgba(0,0,0,0.3)' : 'none',
        flexShrink: 0
      }}>
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Resumify</h1>
            <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Admin Control Panel</span>
          </div>
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
            >
              <Icon path={<path d="M18 6L6 18M6 6l12 12" />} size={24} />
            </button>
          )}
        </div>

        <nav className="admin-sidebar-nav" style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', marginBottom: '1.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--surface-border)', paddingTop: '1.75rem' }}>
          <button
            className="btn logout-btn"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '14px',
              background: 'rgba(239, 68, 68, 0.05)',
              color: 'var(--text-main)',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer',
              minHeight: '48px'
            }}
            onClick={handleLogout}
          >
            <Icon path={ICONS.logout} size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content" style={{ 
        flex: 1, 
        width: '100%',
        minWidth: 0,
        position: 'relative'
      }}>
        {/* Top Header/Navbar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: isMobile ? '0.75rem 1rem' : '0.75rem 2rem',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--surface-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          {/* Mobile Toggle & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-main)', 
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)'
                }}
              >
                <Icon path={<path d="M3 12h18M3 6h18M3 18h18" />} size={20} />
              </button>
            )}
            {isMobile && <h2 className="text-gradient" style={{ fontSize: '1.25rem', margin: 0 }}>Resumify</h2>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Bell */}
            <div
              style={{
                position: 'relative',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '10px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => navigate('/admin/approvals')}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              title="Upgrade Requests"
            >
              <Icon path={ICONS.bell} size={20} />
              {pendingCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 3px',
                  border: '2px solid var(--surface)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)'
                }}>
                  {pendingCount > 9 ? '9+' : pendingCount}
                </div>
              )}
            </div>

            {/* Separator */}
            {!isMobile && <div style={{ width: '1px', height: '24px', background: 'var(--surface-border)' }} />}

            {/* Admin Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: isMobile ? '0.25rem' : '0.4rem 0.75rem 0.4rem 0.4rem',
              borderRadius: '14px',
              background: isMobile ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
              border: isMobile ? 'none' : '1px solid var(--surface-border)',
              cursor: 'default'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary), #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '800',
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                {user.name?.[0]?.toUpperCase() || 'A'}
              </div>
              {!isMobile && (
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.2 }}>
                    {user.name || 'Admin'}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                    Administrator
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div style={{ padding: isMobile ? '1.5rem 1rem' : '2rem 3rem' }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        .admin-nav-item:hover {
          background: rgba(99, 102, 241, 0.05);
          color: var(--primary);
        }
        .admin-nav-item.active {
          background: var(--primary);
          color: white !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .admin-sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }
        .admin-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .admin-sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
