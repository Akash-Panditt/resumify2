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
  dashboard: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  approvals: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="m9 15 2 2 4-4"/><path d="M14 2v6h6"/></>,
  templates: <><path d="M4 7V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 12h.01"/></>,
  pricing: <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M7 15h.01"/><path d="M11 15h.01"/></>,
  payments: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>, // This was payments, maybe a credit card is better
  announcements: <><path d="M6 7h3l5-4v18l-5-4H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>,
  settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
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
    navigate('/login');
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
    if (user.role !== 'admin') {
      localStorage.removeItem('resumify_admin');
      navigate('/login');
    }
  }, [user.role, navigate]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`);
        setPendingCount(res.data.pendingUpgradesCount || 0);
      } catch (err) {
        console.error('Failed to fetch pending count', err);
      }
    };
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 15000);
    return () => clearInterval(interval);
  }, []);

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
          background: linear-gradient(135deg, var(--primary), #a855f7);
          color: white;
          box-shadow: 0 10px 25px -5px rgba(var(--primary-rgb, 99, 102, 241), 0.5);
        }

        .sidebar-link:hover .link-icon {
          transform: scale(1.1) translateX(2px);
        }

        .link-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
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
