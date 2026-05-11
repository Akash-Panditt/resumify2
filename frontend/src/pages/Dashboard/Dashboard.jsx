import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import ConfirmModal from '../../components/ConfirmModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [masterProfile, setMasterProfile] = useState(null);
  const [recentDownloads, setRecentDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, resumeId: null });

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchProfile(parsedUser);
    fetchResumes();
  }, [navigate]);

  const fetchProfile = async (currentUser) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`);
      const updatedUser = { ...currentUser, ...res.data, _id: res.data.id || currentUser._id };
      setUser(updatedUser);
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Profile sync failed:', err?.response?.status, err?.message);
    }
  };

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes`);
      const fetchedResumes = res.data;

      const master = fetchedResumes.find(r => r.title === '___MASTER_PROFILE___');
      const actualResumes = fetchedResumes.filter(r => r.title !== '___MASTER_PROFILE___');

      setMasterProfile(master);
      setResumes(actualResumes);

      if (user?.id || user?._id) {
        const uid = user.id || user._id;
        const dlKey = `resumify_downloads_${uid}`;
        const downloadsInfo = JSON.parse(localStorage.getItem(dlKey) || '[]');

        const recentList = downloadsInfo.map(dInfo => {
          const match = actualResumes.find(r => r._id === dInfo.id);
          return match ? { ...match, downloadedAt: dInfo.downloadedAt } : null;
        }).filter(Boolean);

        setRecentDownloads(recentList);
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  const handleDeleteResume = (resumeId) => {
    setConfirmDelete({ isOpen: true, resumeId });
  };

  const confirmDeleteResume = async () => {
    const { resumeId } = confirmDelete;
    if (!resumeId) return;

    setConfirmDelete({ isOpen: false, resumeId: null });
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/resumes/${resumeId}`, {
        withCredentials: true
      });
      setResumes(resumes.filter(r => r._id !== resumeId));
      setRecentDownloads(prev => prev.filter(r => r._id !== resumeId));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const getFilteredList = (list) => {
    if (!searchTerm.trim()) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(resume => {
      const title = (resume.title && resume.title !== 'Untitled Resume'
        ? resume.title
        : (resume.personalDetails?.fullName || user?.name || 'Untitled Resume')).toLowerCase();
      const template = (resume.template || '').toLowerCase();
      return title.includes(term) || template.includes(term);
    });
  };

  const filteredResumes = getFilteredList(resumes);
  const filteredRecentDownloads = getFilteredList(recentDownloads);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
      <Navbar user={user} />

      <main style={{ padding: 'clamp(1rem, 3vw, 1.5rem) 0.75rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }} className="dashboard-header">
          <div>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 800 }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Welcome back, <span className="text-gradient" style={{ fontWeight: 700 }}>{user?.name}</span>
            </p>
          </div>

          <button
            className="btn btn-primary btn-maximize"
            onClick={() => navigate('/templates')}
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              fontWeight: '800',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              border: 'none',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'pulse-attention 2s infinite',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Resume
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          width: '100%'
        }}>
          <div className="mini-stat-card" style={{ padding: '0.65rem 0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="mini-stat-label" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Resumes</span>
            <span className="mini-stat-value" style={{ fontSize: '1.1rem', fontWeight: 800 }}>{resumes.length}</span>
          </div>
          <div className="mini-stat-card" style={{ padding: '0.65rem 0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="mini-stat-label" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Downloads</span>
            <span className="mini-stat-value" style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user?.download_count || 0}</span>
          </div>
          <div className="mini-stat-card" style={{ padding: '0.65rem 0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gridColumn: 'span 1' }}>
            <span className="mini-stat-label" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Plan</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className="mini-stat-value" style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 800 }}>{user?.plan || 'free'}</span>
              {user?.plan === 'pro' && <span className="badge badge-success" style={{ fontSize: '0.55rem', padding: '1px 4px' }}>Active</span>}
            </div>
          </div>
        </div>

        {/* Recent Downloads Section */}
        {filteredRecentDownloads.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.35rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </div>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Recent Downloads</h2>
            </div>
            <div className="responsive-grid" style={{ gap: '0.75rem' }}>
              {filteredRecentDownloads.map(resume => (
                <div key={`dl-${resume._id}`} className="card resume-card" style={{ minHeight: '140px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                      {resume.title && resume.title !== 'Untitled Resume'
                        ? resume.title
                        : (resume.personalDetails?.fullName || user?.name || 'Untitled Resume')}
                    </h3>
                    <span className="badge badge-purple">{resume.template}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                    Generated on {new Date(resume.downloadedAt).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <button className="dashboard-action-btn primary" onClick={() => navigate(`/preview/${resume._id}`)} title="Download">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                    <button className="dashboard-action-btn" onClick={() => navigate(`/builder/${resume._id}`)} title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Drafts Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '0.35rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
              </div>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Resume Drafts</h2>
            </div>

            <div style={{ maxWidth: '180px', position: 'relative' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.3rem 0.5rem 0.3rem 1.75rem',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  height: '32px'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--surface-border)'; e.target.style.background = 'rgba(255, 255, 255, 0.04)'; }}
              />
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="empty-dashboard-state">
              <div className="empty-state-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 15h6" />
                  <path d="M12 12v6" />
                </svg>
              </div>
              <h3>No resumes yet. Create your first one!</h3>
              <p>Choose from our professional templates and land your dream job faster.</p>
              <button
                className="btn btn-primary btn-maximize"
                onClick={() => navigate('/templates')}
                style={{ 
                  marginTop: '1.5rem', 
                  padding: '1rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  border: 'none',
                  boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: 'pulse-attention 2s infinite',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Create My First Resume
              </button>
            </div>
          ) : (
            <div className="responsive-grid">
              {filteredResumes.map(resume => (
                <div key={resume._id} className="card resume-card" style={{ minHeight: '140px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                      {resume.title && resume.title !== 'Untitled Resume'
                        ? resume.title
                        : ([resume.personalDetails?.fullName, resume.personalDetails?.jobTitle].filter(Boolean).join(' - ') || user?.name || 'Untitled Resume')}
                    </h3>
                    <span className="badge badge-primary">{resume.template}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                    Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', width: '100%', justifyContent: 'flex-start' }}>
                      <button className="dashboard-action-btn primary" onClick={() => navigate(`/builder/${resume._id}`)} title="Edit Resume">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="dashboard-action-btn" onClick={() => navigate(`/preview/${resume._id}`)} title="Preview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="dashboard-action-btn success" onClick={() => navigate(`/preview/${resume._id}`)} title="Download">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </button>
                      <button
                        className="dashboard-action-btn danger"
                        onClick={() => handleDeleteResume(resume._id)}
                        title="Delete"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, resumeId: null })}
        onConfirm={confirmDeleteResume}
        title="Delete Resume"
        message="Delete this resume permanently? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Keep It"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;
