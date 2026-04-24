import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import axios from 'axios';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getAuthHeaders = () => {
    const stored = JSON.parse(localStorage.getItem('resumify_user') || '{}');
    return stored?.token ? { Authorization: `Bearer ${stored.token}` } : {};
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { headers: getAuthHeaders() });
    } catch (err) {
      console.error('Logout error', err);
    }
    localStorage.removeItem('resumify_user');
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const planBadgeClass = ['premium', 'pro', 'basic'].includes(user?.plan) 
    ? 'badge-purple' 
    : user?.plan === 'enterprise' ? 'badge-success' : 'badge-primary';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="text-gradient" style={{ cursor: 'pointer', margin: 0 }} onClick={() => navigate(user ? '/dashboard' : '/')}>
          Resumify
        </h1>

        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ThemeToggle />
          
          {user ? (
            <>
              <span className={`badge ${planBadgeClass}`} style={{ alignSelf: 'center' }}>{user?.plan || 'free'}</span>
              
              {user?.role === 'admin' && (
                <button className="btn btn-secondary" onClick={() => navigate('/admin/dashboard')}>
                  🛡️ Admin
                </button>
              )}
              
              <Link to="/dashboard" className={`btn ${location.pathname === '/dashboard' ? 'btn-primary' : 'btn-secondary'}`}>Dashboard</Link>
              <Link to="/ats-checker" className={`btn ${location.pathname === '/ats-checker' ? 'btn-primary' : 'btn-secondary'}`}>ATS Checker</Link>
              <Link to="/pricing" className={`btn ${location.pathname === '/pricing' ? 'btn-primary' : 'btn-secondary'}`}>Pricing</Link>
              <Link to="/settings" className={`btn ${location.pathname === '/settings' ? 'btn-primary' : 'btn-secondary'}`}>Settings</Link>
              
              <button className="btn btn-danger" onClick={handleLogout} style={{ minHeight: '44px' }}>
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
  );
};

export default Navbar;
