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
      const res = await axios.get('http://localhost:5000/api/resumes');
      let master = res.data.find(r => r.title === '___MASTER_PROFILE___');
      
      if (!master) {
        // Create initial master profile if none exists
        const createRes = await axios.post('http://localhost:5000/api/resumes', 
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
      await axios.put(`http://localhost:5000/api/resumes/${masterProfile._id}`, masterProfile);
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
      
      <div style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        borderBottom: '1px solid var(--surface-border)', 
        paddingBottom: '0.5rem',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <button 
          className={`btn ${activeTab === 'account' ? 'btn-primary' : ''}`}
          style={{ 
            background: activeTab === 'account' ? '' : 'transparent', 
            border: 'none', 
            color: activeTab === 'account' ? '' : 'var(--text-muted)',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
          onClick={() => setActiveTab('account')}
        >
          Account & Billing
        </button>
        <button 
          className={`btn ${activeTab === 'profile' ? 'btn-primary' : ''}`}
          style={{ 
            background: activeTab === 'profile' ? '' : 'transparent', 
            border: 'none', 
            color: activeTab === 'profile' ? '' : 'var(--text-muted)',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
          onClick={() => setActiveTab('profile')}
        >
          Professional Profile
        </button>
        {['basic', 'pro', 'premium'].includes(user?.plan) && (
          <button 
            className={`btn ${activeTab === 'premium' ? 'btn-primary' : ''}`}
            style={{ 
              background: activeTab === 'premium' ? '' : 'transparent', 
              border: 'none', 
              color: activeTab === 'premium' ? '' : 'var(--text-muted)',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem'
            }}
            onClick={() => setActiveTab('premium')}
          >
            ✨ Premium Perks
          </button>
        )}
      </div>

      {activeTab === 'account' ? (
        <>
          {/* Profile Details */}
          <div className="card">
            <h2>Account Details</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Your personal account information.</p>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" disabled value={user?.name || ''} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" disabled value={user?.email || ''} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Role</label>
              <div>{user?.role === 'admin' ? <span className="badge badge-danger">Admin</span> : <span className="badge badge-primary">User</span>}</div>
            </div>
          </div>
        </>
      ) : activeTab === 'profile' ? (
        <div className="master-profile-editor">
          <div className="card" style={{ border: '1px solid var(--primary)', background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem' 
            }}>
              <div>
                <h2 style={{ marginBottom: '0.25rem' }}>Professional Profile</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>This data will be automatically suggested when you create new resumes.</p>
              </div>
              <button 
                className={`btn btn-primary ${profileSuccess ? 'btn-success' : ''}`} 
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                style={{ width: 'auto' }}
              >
                {isSavingProfile ? 'Saving...' : profileSuccess ? '✓ Saved!' : 'Save Profile'}
              </button>
            </div>

            {masterProfile && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="responsive-grid" style={{ gap: '1.5rem' }}>
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

                <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '1rem' }}>Key Skills (Comma separated)</label>
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
        <PremiumPerksModule user={user} />
      )}

      {/* Subscription & Usage */}
      <div className="card" style={{ border: '1px solid var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>
              Current Plan: <span style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{user?.plan || 'Free'}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{['basic', 'pro', 'premium'].includes(user?.plan) ? 'You have full access to all features.' : 'Upgrade to unlock more templates and AI features.'}</p>
          </div>
          {!['basic', 'pro', 'premium'].includes(user?.plan) && (
            <button className="btn btn-primary" onClick={() => navigate('/pricing')}>Upgrade Plan</button>
          )}
        </div>

        {/* Subscription Status & Expiry */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <div className="card" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Status</div>
            <div style={{ color: 'var(--success)', fontWeight: '600' }}>
              ACTIVE
            </div>
          </div>
          <div className="card" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}> Renewal | Expiry </div>
            <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
              {user?.expires_at ? (
                <>
                  {new Date(user.expires_at).toLocaleDateString()}
                  <span style={{ marginLeft: '10px', fontSize: '0.7rem', color: 'var(--primary)' }}>
                    ({Math.ceil((new Date(user.expires_at) - new Date()) / (1000 * 60 * 60 * 24))} days left)
                  </span>
                </>
              ) : 'Never'}
            </div>
          </div>
        </div>

        {/* Download Usage */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>PDF Downloads Used</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: isNearLimit ? 'var(--error)' : 'var(--text-main)' }}>
              {currentDownloads} / {maxDownloads === Infinity ? '∞' : maxDownloads}
            </span>
          </div>
          <div className="progress-container">
            <div className={`progress-bar ${isNearLimit ? 'danger' : ''}`} style={{ width: `${usagePercent}%` }}></div>
          </div>
        </div>

        {isNearLimit && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.875rem', color: '#f87171' }}>
            ⚠️ You're running low on downloads. Consider upgrading your plan for more.
          </div>
        )}
      </div>
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
      const res = await axios.get('http://localhost:5000/api/pro/requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    }
  };

  const handleSubmit = async (type, data = {}) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/pro/requests', { type, request_data: data });
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card" style={{ border: '1px solid var(--primary)', background: 'var(--surface-subtle)' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>✨ Exclusive Premium Perks</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>As a Premium member, you have access to personalized services.</p>

        <div className="responsive-grid" style={{ gap: '1.5rem' }}>
          {/* Expert Review */}
          <div className="card" style={{ background: 'var(--surface-main)' }}>
            <h3>Expert Resume Review</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Get your resume reviewed by a professional recruiter. We'll check your grammar, ATS optimization, and overall impact.
            </p>
            <button 
              className={`btn ${success === 'expert_review' ? 'btn-success' : 'btn-primary'}`} 
              onClick={() => handleSubmit('expert_review')}
              disabled={loading || requests.some(r => r.type === 'expert_review' && r.status === 'pending')}
            >
              {success === 'expert_review' ? '✓ Request Sent' : requests.some(r => r.type === 'expert_review' && r.status === 'pending') ? 'Review Pending...' : 'Request Review'}
            </button>
          </div>

          {/* Custom Domain */}
          <div className="card" style={{ background: 'var(--surface-main)' }}>
            <h3>Personal Custom Domain</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
              Host your resume on a professional domain (e.g. yourname.com).
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                className="form-input" 
                placeholder="e.g. johndoe.com" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button 
                className="btn btn-primary" 
                onClick={() => handleSubmit('custom_domain', { domain })}
                disabled={loading || !domain}
              >
                Request
              </button>
            </div>
            {success === 'custom_domain' && <p style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.5rem' }}>✓ Domain request submitted!</p>}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Request History</h3>
        {requests.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>No requests yet.</p>
        ) : (
          <div className="data-table-container" style={{ marginTop: '1rem', overflowX: 'auto' }}>
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
                    <td style={{ textTransform: 'capitalize' }}>{r.type.replace('_', ' ')}</td>
                    <td>
                      <span className={`badge ${r.status === 'completed' ? 'badge-success' : r.status === 'pending' ? 'badge-primary' : 'badge-purple'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{r.request_data?.domain || 'Full Resume Review'}</td>
                    <td style={{ fontSize: '0.85rem' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
