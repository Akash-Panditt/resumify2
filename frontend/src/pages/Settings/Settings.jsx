import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const PLAN_LIMITS = { free: 2, basic: 50, pro: 500, premium: 500 };

const Settings = () => {
  const [user, setUser] = useState(null);
  const [masterProfile, setMasterProfile] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchMasterProfile(parsedUser.token);
    }
  }, [navigate]);

  const fetchMasterProfile = async (token) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes`);
      let master = res.data.find(r => r.title === '___MASTER_PROFILE___');
      
      if (!master) {
        const createRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/resumes`, 
          { title: '___MASTER_PROFILE___', template: 'modern' }
        );
        master = createRes.data;
      }
      setMasterProfile(master);
    } catch (err) {
      console.error('Failed to fetch master profile', err);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/resumes/${masterProfile._id}`, masterProfile);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save master profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

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
              className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account & Billing
            </button>
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Professional Profile
            </button>
            {['basic', 'pro', 'premium'].includes(user?.plan) && (
              <button 
                className={`tab-btn ${activeTab === 'premium' ? 'active' : ''}`}
                onClick={() => setActiveTab('premium')}
              >
                ✨ Premium Perks
              </button>
            )}
          </div>
        </div>

        <div className="settings-content">
          {activeTab === 'account' ? (
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
                  <div className="form-group">
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
                    <h2 className="plan-title">
                      Current Plan: <span className="text-gradient capitalize">{user?.plan || 'Free'}</span>
                    </h2>
                    <p className="plan-desc">
                      {['basic', 'pro', 'premium'].includes(user?.plan) ? 
                        'You have full access to all features.' : 
                        'Upgrade to unlock more templates and AI features.'}
                    </p>
                  </div>
                  {!['basic', 'pro', 'premium'].includes(user?.plan) && (
                    <button className="btn btn-primary upgrade-btn" onClick={() => navigate('/pricing')}>Upgrade</button>
                  )}
                </div>

                <div className="usage-stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Status</span>
                    <span className="stat-value text-success">ACTIVE</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Renewal | Expiry</span>
                    <span className="stat-value">
                      {user?.expires_at ? (
                        <>
                          {new Date(user.expires_at).toLocaleDateString()}
                          <span className="days-left">
                            ({Math.ceil((new Date(user.expires_at) - new Date()) / (1000 * 60 * 60 * 24))}d left)
                          </span>
                        </>
                      ) : 'Lifetime'}
                    </span>
                  </div>
                </div>

                <div className="usage-progress-section">
                  <div className="usage-label-row">
                    <span className="usage-label">PDF Downloads Used</span>
                    <span className={`usage-count ${isNearLimit ? 'text-error' : ''}`}>
                      {currentDownloads} / {maxDownloads === Infinity ? '∞' : maxDownloads}
                    </span>
                  </div>
                  <div className="usage-progress-container">
                    <div className={`usage-progress-bar ${isNearLimit ? 'danger' : ''}`} style={{ width: `${usagePercent}%` }}></div>
                  </div>
                  {isNearLimit && (
                    <div className="usage-warning">
                      ⚠️ You're running low on downloads. Consider upgrading.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'profile' ? (
            <div className="settings-section animate-slide-up">
              <div className="card profile-card">
                <div className="profile-header">
                  <div className="profile-titles">
                    <h2 className="section-title">Professional Profile</h2>
                    <p className="section-subtitle">Auto-fills your details when creating new resumes.</p>
                  </div>
                  <button 
                    className={`btn btn-primary profile-save-btn ${profileSuccess ? 'btn-success' : ''}`} 
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                  >
                    {isSavingProfile ? 'Saving...' : profileSuccess ? '✓ Saved!' : 'Save Profile'}
                  </button>
                </div>

                {masterProfile && (
                  <div className="profile-form">
                    <div className="responsive-grid">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          className="form-input" 
                          value={masterProfile.personalDetails?.fullName || ''} 
                          onChange={(e) => setMasterProfile({
                            ...masterProfile,
                            personalDetails: { ...masterProfile.personalDetails, fullName: e.target.value }
                          })}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Job Title</label>
                        <input 
                          className="form-input" 
                          value={masterProfile.personalDetails?.jobTitle || ''} 
                          onChange={(e) => setMasterProfile({
                            ...masterProfile,
                            personalDetails: { ...masterProfile.personalDetails, jobTitle: e.target.value }
                          })}
                          placeholder="e.g. Senior Software Engineer"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          className="form-input" 
                          value={masterProfile.personalDetails?.email || ''} 
                          onChange={(e) => setMasterProfile({
                            ...masterProfile,
                            personalDetails: { ...masterProfile.personalDetails, email: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input 
                          className="form-input" 
                          value={masterProfile.personalDetails?.phone || ''} 
                          onChange={(e) => setMasterProfile({
                            ...masterProfile,
                            personalDetails: { ...masterProfile.personalDetails, phone: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Summary / Bio</label>
                      <textarea 
                        className="form-input" 
                        rows="4"
                        value={masterProfile.personalDetails?.summary || ''} 
                        onChange={(e) => setMasterProfile({
                          ...masterProfile,
                          personalDetails: { ...masterProfile.personalDetails, summary: e.target.value }
                        })}
                        placeholder="Brief professional intro..."
                      />
                    </div>

                    <div className="skills-section">
                      <label className="form-label">Key Skills (Comma separated)</label>
                      <input 
                        className="form-input" 
                        value={masterProfile.skills?.map(s => s.name).join(', ') || ''} 
                        onChange={(e) => setMasterProfile({
                          ...masterProfile,
                          skills: e.target.value.split(',').map(s => ({ name: s.trim(), level: 'Expert' })).filter(s => s.name)
                        })}
                        placeholder="React, Node.js, Python, UI Design..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-slide-up">
              <PremiumPerksModule user={user} />
            </div>
          )}
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

          .settings-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .settings-card, .usage-card, .profile-card {
            padding: clamp(1.5rem, 5vw, 2.5rem);
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
          }

          .section-subtitle {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin-bottom: 2rem;
          }

          .form-layout {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
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
            gap: 1.5rem;
            margin-bottom: 2rem;
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
            gap: 1.5rem;
            margin-bottom: 2.5rem;
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
    </div>
  );
};

export default Settings;

const PremiumPerksModule = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pro/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    }
  };

  const handleSubmit = async (type, data = {}) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pro/requests`, { type, request_data: data });
      setSuccess(type);
      fetchRequests();
      setTimeout(() => setSuccess(null), 3000);
      if (type === 'custom_domain') setDomain('');
    } catch (err) {
      alert('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perks-module">
      <div className="card perks-card">
        <h2 className="section-title">✨ Exclusive Premium Perks</h2>
        <p className="section-subtitle">As a Premium member, you have access to personalized services.</p>

        <div className="responsive-grid perks-grid">
          {/* Expert Review */}
          <div className="card perk-item">
            <h3>Expert Resume Review</h3>
            <p className="perk-desc">
              Get your resume reviewed by a professional recruiter. We'll check your grammar, ATS optimization, and overall impact.
            </p>
            <button 
              className={`btn perk-btn ${success === 'expert_review' ? 'btn-success' : 'btn-primary'}`} 
              onClick={() => handleSubmit('expert_review')}
              disabled={loading || requests.some(r => r.type === 'expert_review' && r.status === 'pending')}
            >
              {success === 'expert_review' ? '✓ Request Sent' : requests.some(r => r.type === 'expert_review' && r.status === 'pending') ? 'Review Pending' : 'Request Review'}
            </button>
          </div>

          {/* Custom Domain */}
          <div className="card perk-item">
            <h3>Personal Custom Domain</h3>
            <p className="perk-desc">
              Host your resume on a professional domain (e.g. yourname.com).
            </p>
            <div className="domain-input-group">
              <input 
                className="form-input" 
                placeholder="e.g. johndoe.com" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button 
                className="btn btn-primary domain-btn" 
                onClick={() => handleSubmit('custom_domain', { domain })}
                disabled={loading || !domain}
              >
                Request
              </button>
            </div>
            {success === 'custom_domain' && <p className="success-msg">✓ Domain request submitted!</p>}
          </div>
        </div>
      </div>

      <div className="card history-card">
        <h3 className="history-title">Request History</h3>
        {requests.length === 0 ? (
          <p className="empty-msg">No requests yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => (
                  <tr key={r.id}>
                    <td className="capitalize">{r.type.replace('_', ' ')}</td>
                    <td>
                      <span className={`badge ${r.status === 'completed' ? 'badge-success' : r.status === 'pending' ? 'badge-primary' : 'badge-purple'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="detail-text">{r.request_data?.domain || 'Full Review'}</td>
                    <td className="date-text">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .perks-module {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .perks-card {
          border: 1px solid var(--primary);
          background: rgba(var(--bg-rgb), 0.4);
        }

        .perks-grid {
          gap: 1.5rem;
        }

        .perk-item {
          background: rgba(var(--bg-rgb), 0.6);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .perk-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 1.25rem 0;
          flex-grow: 1;
        }

        .domain-input-group {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
        }

        .perk-btn, .domain-btn {
          width: 100%;
        }

        .success-msg {
          color: var(--success);
          font-size: 0.8rem;
          margin-top: 0.5rem;
          font-weight: 600;
        }

        .history-card {
          padding: 1.5rem;
        }

        .history-title {
          margin-bottom: 1.5rem;
        }

        .empty-msg {
          color: var(--text-muted);
          text-align: center;
          padding: 2rem 0;
        }

        .table-responsive {
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 500px;
        }

        .data-table th {
          text-align: left;
          padding: 1rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--surface-border);
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--surface-border);
          font-size: 0.9rem;
        }

        .detail-text, .date-text {
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .domain-input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
