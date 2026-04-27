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
  pricing: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  payments: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></>,
  announcements: <><polygon points="11 19 2 12 11 5 11 19"/><path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  menu: <path d="M3 12h18M3 6h18M3 18h18" />,
  close: <path d="M18 6L6 18M6 6l12 12" />
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('resumify_admin') || '{}');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      if (width < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
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
    if (!user.token || user.role !== 'admin') {
      localStorage.removeItem('resumify_admin');
      navigate('/admin/login');
    }
  }, [user.token, user.role, navigate]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        if (!user.token) return;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setPendingCount(res.data.pendingUpgradesCount || 0);
      } catch (err) {
        console.error('Failed to fetch pending count', err);
      }
    };
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 15000);
    return () => clearInterval(interval);
  }, [user.token]);

  return (
    <div className="admin-wrapper">
      {/* Mobile/Tablet Drawer Overlay */}
      {(isMobile || isTablet) && isSidebarOpen && (
        <div className="admin-drawer-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar - Smart Adaptation */}
      <aside className={`admin-sidebar-v2 ${isSidebarOpen ? 'is-open' : 'is-collapsed'} ${isMobile ? 'is-mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
             <div className="logo-icon">R</div>
             <span className="logo-text">Resumify</span>
          </div>
          {isMobile && (
            <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
              <Icon path={ICONS.close} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-trigger" onClick={handleLogout}>
            <Icon path={ICONS.logout} size={18} />
            <span className="link-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="admin-main">
        {/* Responsive Header */}
        <header className="admin-header-v2">
          <div className="header-left">
            {(isMobile || isTablet || !isSidebarOpen) && (
              <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>
                <Icon path={ICONS.menu} />
              </button>
            )}
            <div className="header-welcome">
              <span className="welcome-label">Admin Portal</span>
              <h2 className="welcome-title">{navItems.find(i => window.location.pathname.includes(i.path))?.name || 'Dashboard'}</h2>
            </div>
          </div>

          <div className="header-right">
             <ThemeToggle />
             
             <div className="header-action-group">
                <button className="action-btn" onClick={() => navigate('/admin/approvals')}>
                   <Icon path={ICONS.bell} />
                   {pendingCount > 0 && <span className="notification-dot">{pendingCount > 9 ? '9+' : pendingCount}</span>}
                </button>
                
                <div className="admin-profile-compact">
                   <div className="admin-avatar">
                      {user.name?.[0]?.toUpperCase() || 'A'}
                   </div>
                   {!isMobile && (
                      <div className="admin-info">
                         <span className="admin-name">{user.name || 'Admin'}</span>
                         <span className="admin-role">Owner</span>
                      </div>
                   )}
                </div>
             </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="admin-viewport">
          <div className="viewport-container">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          background: var(--bg-color);
        }

        .admin-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        /* Sidebar V2 Styling */
        .admin-sidebar-v2 {
          width: 280px;
          background: var(--surface);
          border-right: 1px solid var(--surface-border);
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1001;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .admin-sidebar-v2.is-collapsed {
          width: 80px;
        }

        .admin-sidebar-v2.is-mobile {
          position: fixed;
          left: -280px;
        }

        .admin-sidebar-v2.is-mobile.is-open {
          left: 0;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 90px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary), #a855f7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 900;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(to right, var(--text-main), var(--text-muted));
          -webkit-background-clip: text;
          -webkit-text-fill_color: transparent;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

        .is-collapsed .logo-text {
          opacity: 0;
          pointer-events: none;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .sidebar-link:hover {
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.05);
          color: var(--primary);
        }

        .sidebar-link.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb, 99, 102, 241), 0.4);
        }

        .link-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .link-text {
          font-size: 0.95rem;
          font-weight: 600;
          transition: opacity 0.3s ease;
        }

        .is-collapsed .link-text {
          opacity: 0;
          pointer-events: none;
        }

        .sidebar-footer {
          padding: 1.5rem 0.75rem;
          border-top: 1px solid var(--surface-border);
        }

        .logout-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(239, 68, 68, 0.05);
          color: #ef4444;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .logout-trigger:hover {
          background: #ef4444;
          color: white;
        }

        /* Main Area V2 */
        .admin-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .admin-header-v2 {
          height: 90px;
          background: rgba(var(--bg-rgb), 0.8);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid var(--surface-border);
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .menu-toggle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          color: var(--text-main);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-welcome {
          display: flex;
          flex-direction: column;
        }

        .welcome-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
        }

        .welcome-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .header-action-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.05);
        }

        .notification-dot {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 20px;
          border: 3px solid var(--bg-color);
        }

        .admin-profile-compact {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0.75rem 0.35rem 0.35rem;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: 50px;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--primary), #a855f7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .admin-info {
          display: flex;
          flex-direction: column;
        }

        .admin-name {
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .admin-role {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .admin-viewport {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
        }

        .viewport-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .admin-header-v2 { padding: 0 1rem; height: 80px; }
          .admin-viewport { padding: 1.5rem 1rem; }
          .welcome-title { font-size: 1.1rem; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
