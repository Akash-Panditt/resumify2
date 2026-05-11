import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import axios from 'axios';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    } catch (err) {
      console.error('Logout error', err);
    }
    // Clear all auth-related storage
    localStorage.removeItem('resumify_user');
    localStorage.removeItem('resumify_admin');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const planBadgeClass = ['premium', 'pro', 'basic'].includes(user?.plan)
    ? 'badge-purple'
    : user?.plan === 'enterprise' ? 'badge-success' : 'badge-primary';

  return (
    <>
      {/* Background Overlay for Mobile Menu */}
      <div
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      />

      <nav className="navbar">
        <div className="nav-container">
          <h1 className="text-gradient brand-logo" onClick={() => navigate(user ? '/dashboard' : '/')}>
            Resumify
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {location.pathname !== '/' && <ThemeToggle />}
            </div>
            <button className="mobile-menu-toggle mobile-only" onClick={toggleMenu} aria-label="Toggle menu" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {/* Mobile Header in Menu */}
            <div className="mobile-only nav-user-preview">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Menu</span>
              </div>
              {user && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>{user.name}</p>
                  <span className={`badge ${planBadgeClass}`} style={{ marginTop: '0.25rem' }}>{user.plan || 'free'}</span>
                </div>
              )}
            </div>

            {user ? (
              <>
                {/* Desktop Plan Badge */}
                <span className={`badge ${planBadgeClass} desktop-only`} style={{ alignSelf: 'center' }}>{user?.plan || 'free'}</span>

                {user?.role === 'admin' && location.pathname !== '/' && (
                  <button className="btn btn-secondary" onClick={() => navigate('/admin/dashboard')} style={{ justifyContent: 'flex-start' }}>
                    🛡️ Admin Panel
                  </button>
                )}

                <Link to="/dashboard" className={`btn ${location.pathname === '/dashboard' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  Dashboard
                </Link>

                {location.pathname !== '/' && (
                  <>
                    <Link to="/ats-checker" className={`btn ${location.pathname === '/ats-checker' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      ATS Checker
                    </Link>
                    <Link to="/pricing" className={`btn ${location.pathname === '/pricing' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                      Pricing
                    </Link>
                    <Link to="/settings" className={`btn ${location.pathname === '/settings' ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                      Settings
                    </Link>
                  </>
                )}

                <button className="btn btn-danger logout-btn" onClick={handleLogout} style={{ justifyContent: 'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Log in</Link>
                <Link to="/signup" className="btn btn-primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Small CSS for Hide/Show logic */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
