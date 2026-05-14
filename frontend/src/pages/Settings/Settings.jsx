import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import StatusModal from '../../components/StatusModal';

const PLAN_LIMITS = { free: 2, basic: 50, pro: 500, premium: 500 };

const Settings = () => {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [navigate]);

  const maxDownloads = PLAN_LIMITS[user?.plan] || 1;
  const currentDownloads = user?.download_count || 0;
  const usagePercent = maxDownloads === Infinity ? 5 : Math.min(100, (currentDownloads / maxDownloads) * 100);
  const isNearLimit = maxDownloads !== Infinity && usagePercent >= 80;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar user={user} />
      
      <div className="settings-container">
        {/* Responsive Tabs */}
        <div className="settings-tabs-wrapper">
          <div className="settings-tabs">
            <button 
              className="tab-btn active"
            >
              Account & Billing
            </button>
          </div>
        </div>

        <div className="settings-content">
          <div className="settings-section animate-slide-up">
            <div className="card settings-card">
              <h2 className="section-title">Account Details</h2>
              <p className="section-subtitle">Your personal account information.</p>
              <div className="form-layout">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" disabled value={user?.name || ''} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" disabled value={user?.email || ''} />
                </div>
                <div className="form-group form-group-full">
                  <label className="form-label">Role</label>
                  <div className="badge-wrapper">
                    {user?.role === 'admin' ? 
                      <span className="badge badge-danger">Administrator</span> : 
                      <span className="badge badge-primary">Standard User</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Usage & Plan Card */}
            <div className="card usage-card">
              <div className="usage-header">
                <div className="plan-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)', display: 'flex', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.1)' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                      </div>
                      <h2 className="plan-title" style={{ margin: 0, fontSize: '1.4rem' }}>
                        Current Plan: <span className="text-gradient capitalize" style={{ fontWeight: 800 }}>{user?.plan || 'Free'}</span>
                      </h2>
                  </div>
                  <p className="plan-desc" style={{ marginTop: '0.5rem', paddingLeft: '3.2rem', fontSize: '0.95rem' }}>
                    {['basic', 'pro', 'premium'].includes(user?.plan) ? 
                      'You have full access to all premium features and templates.' : 
                      'Upgrade to unlock unlimited templates and AI features.'}
                  </p>
                </div>
                {!['basic', 'pro', 'premium'].includes(user?.plan) && (
                  <button className="btn btn-primary upgrade-btn" onClick={() => navigate('/pricing')} style={{ boxShadow: '0 8px 20px rgba(99,102,241,0.3)', padding: '0.85rem 2.5rem', fontWeight: 800, borderRadius: '50px' }}>
                      ✨ Upgrade Now
                  </button>
                )}
              </div>

              <div className="usage-stats-grid">
                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span className="stat-label" style={{ margin: 0 }}>Account Status</span>
                  </div>
                  <span className="stat-value text-success" style={{ fontSize: '1.25rem', paddingLeft: '1.5rem' }}>ACTIVE</span>
                </div>
                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span className="stat-label" style={{ margin: 0 }}>Renewal | Expiry</span>
                  </div>
                  <span className="stat-value" style={{ fontSize: '1.2rem', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {user?.expires_at ? (
                      <>
                        {new Date(user.expires_at).toLocaleDateString()}
                        <span className="days-left" style={{ background: 'rgba(99,102,241,0.1)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(99,102,241,0.2)' }}>
                          {Math.ceil((new Date(user.expires_at) - new Date()) / (1000 * 60 * 60 * 24))}d left
                        </span>
                      </>
                    ) : 'Lifetime Access'}
                  </span>
                </div>
              </div>

              <div className="usage-progress-section" style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--surface-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div className="usage-label-row" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span className="usage-label" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>PDF Downloads Used</span>
                  </div>
                  <span className={`usage-count ${isNearLimit ? 'text-error' : ''}`} style={{ fontWeight: 800, fontSize: '1rem' }}>
                    {currentDownloads} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>/ {maxDownloads === Infinity ? '∞' : maxDownloads}</span>
                  </span>
                </div>
                <div className="usage-progress-container" style={{ height: '10px', background: 'var(--progress-bg)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div className={`usage-progress-bar ${isNearLimit ? 'danger' : ''}`} style={{ width: `${usagePercent}%`, borderRadius: '6px', background: isNearLimit ? 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)' : 'linear-gradient(90deg, var(--primary) 0%, #a855f7 100%)' }}></div>
                </div>
                  {isNearLimit && (
                    <div className="usage-warning" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginTop: '1.25rem', 
                      background: usagePercent >= 100 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.05)', 
                      border: usagePercent >= 100 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(244, 63, 94, 0.2)', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '8px' 
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--error)' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--error)' }}>
                        {usagePercent >= 100 
                          ? 'Download limit reached! Upgrade now for unlimited access.' 
                          : "You're running low on downloads. Upgrade for unlimited access."}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .settings-container {
            padding: clamp(1rem, 5vw, 3rem) 1rem;
            max-width: 900px;
            margin: 0 auto;
            width: 100%;
          }

          .settings-tabs-wrapper {
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--surface-border);
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .settings-tabs-wrapper::-webkit-scrollbar {
            display: none;
          }

          .settings-tabs {
            display: flex;
            gap: 1.5rem;
            padding-bottom: 1px;
            min-width: max-content;
          }

          .tab-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            padding: 1rem 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
          }

          .tab-btn.active {
            color: var(--primary);
          }

          .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--primary);
            box-shadow: 0 0 10px var(--primary);
          }

          .settings-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .settings-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .settings-card, .usage-card, .profile-card {
            padding: clamp(1rem, 3vw, 1.5rem);
          }

          .section-title {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 0.25rem;
            text-align: left;
          }

          .section-subtitle {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin-bottom: 1.25rem;
            text-align: left;
          }

          .form-layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.25rem;
          }

          .form-group-full {
            grid-column: 1 / -1;
          }

          .badge-wrapper {
            margin-top: 0.5rem;
          }

          .usage-card {
            border: 1px solid var(--primary);
            background: linear-gradient(145deg, rgba(var(--bg-rgb), 0.6) 0%, rgba(99, 102, 241, 0.05) 100%);
          }

          .usage-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.25rem;
            flex-wrap: wrap;
          }

          .plan-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .plan-desc {
            color: var(--text-muted);
            font-size: 0.9rem;
          }

          .upgrade-btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
          }

          .usage-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.25rem;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1.25rem;
            background: rgba(var(--bg-rgb), 0.4);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-lg);
          }

          .stat-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            font-weight: 700;
          }

          .stat-value {
            font-weight: 700;
            font-size: 1.1rem;
          }

          .days-left {
            font-size: 0.75rem;
            color: var(--primary);
            margin-left: 0.5rem;
          }

          .usage-label-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
          }

          .usage-label {
            font-size: 0.9rem;
            color: var(--text-muted);
          }

          .usage-count {
            font-weight: 700;
            font-size: 0.9rem;
          }

          .usage-progress-container {
            height: 10px;
            background: var(--progress-bg);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 1rem;
          }

          .usage-progress-bar {
            height: 100%;
            background: var(--primary);
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .usage-progress-bar.danger { background: var(--error); }

          .usage-warning {
            padding: 0.75rem 1rem;
            background: rgba(244, 63, 94, 0.08);
            border-radius: 8px;
            border: 1px solid rgba(244, 63, 94, 0.15);
            font-size: 0.85rem;
            color: var(--error);
          }

          .profile-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }

          .profile-save-btn {
            min-width: 140px;
          }

          .profile-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .skills-section {
            padding-top: 1.5rem;
            border-top: 1px solid var(--surface-border);
          }

          .capitalize { text-transform: capitalize; }
          .text-success { color: var(--success); }
          .text-error { color: var(--error); }

          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up { animation: slide-up 0.5s ease-out; }

          @media (max-width: 640px) {
            .profile-save-btn { width: 100%; }
            .upgrade-btn { width: 100%; }
            .usage-header { flex-direction: column; }
          }
        `}</style>
      </div>

      <StatusModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default Settings;


