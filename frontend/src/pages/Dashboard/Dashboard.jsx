import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [masterProfile, setMasterProfile] = useState(null);
  const [recentDownloads, setRecentDownloads] = useState([]);

  // This bypasses cross-port HttpOnly cookie issues in local dev (port 5173 vs 5000).
  const getAuthHeaders = () => {
    const stored = JSON.parse(localStorage.getItem('resumify_user') || '{}');
    return stored?.token ? { Authorization: `Bearer ${stored.token}` } : {};
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchProfile(parsedUser);
    fetchResumes(parsedUser);
  }, [navigate]);

  const fetchProfile = async (currentUser) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const updatedUser = { ...currentUser, ...res.data, _id: res.data.id || currentUser._id };
      setUser(updatedUser);
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Profile sync failed:', err?.response?.status, err?.message);
      // Only redirect when localStorage is truly empty (explicit logout or token gone)
      if (err.response?.status === 401 && !localStorage.getItem('resumify_user')) {
        navigate('/login');
      }
      // Otherwise silently ignore — user already loaded from localStorage above
    }
  };

  const fetchResumes = async (currentUser) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const fetchedResumes = res.data;

      const master = fetchedResumes.find(r => r.title === '___MASTER_PROFILE___');
      const actualResumes = fetchedResumes.filter(r => r.title !== '___MASTER_PROFILE___');

      setMasterProfile(master);
      setResumes(actualResumes);

      // Load recent downloads mapping from localStorage
      if (currentUser?.id || currentUser?._id) {
        const uid = currentUser.id || currentUser._id;
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

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Delete this resume permanently?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/resumes/${resumeId}`, {
        headers: getAuthHeaders(),
      });
      setResumes(resumes.filter(r => r._id !== resumeId));
      setRecentDownloads(prev => prev.filter(r => r._id !== resumeId));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const isPremium = ['premium', 'pro', 'basic'].includes(user?.plan);
  const planBadgeClass = isPremium ? 'badge-purple' : user?.plan === 'enterprise' ? 'badge-success' : 'badge-primary';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar user={user} />
      
      <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem' 
        }}>
          <div>
            <h2 style={{ margin: 0 }}>Welcome back, {user?.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              Downloads used: <strong>{user?.download_count || 0}</strong> •&nbsp;
              Plan: <strong style={{ textTransform: 'capitalize' }}>{user?.plan || 'free'}</strong>
              {user?.plan === 'pro' && (
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  color: 'var(--success)', 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '6px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>
                  🎉 You saved ₹{Math.max(499, (user?.download_count || 0) * 9 + 499)}
                </span>
              )}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/templates')}>+ Create New Resume</button>
        </div>

      {recentDownloads.length > 0 && (
        <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <span>⬇️</span> Recently Downloaded PDFs
          </h2>
          <div className="responsive-grid">
            {recentDownloads.map(resume => (
              <div key={`dl-${resume._id}`} className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '180px', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ marginBottom: 0, fontSize: '1.1rem' }}>
                    {resume.title && resume.title !== 'Untitled Resume'
                      ? resume.title
                      : (resume.personalDetails?.jobTitle || masterProfile?.personalDetails?.jobTitle || 'Untitled Resume')}
                  </h3>
                  <span className="badge badge-primary">{resume.template}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                  PDF generated: <strong>{new Date(resume.downloadedAt).toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem' }} onClick={() => navigate(`/preview/${resume._id}`)}>Download Again</button>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem' }} onClick={() => navigate(`/builder/${resume._id}`)}>Edit File</button>
                  <button className="btn btn-danger" style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }} onClick={() => handleDeleteResume(resume._id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>All Resume Drafts</h2>
      </div>

      <div className="responsive-grid">
        <div onClick={() => navigate('/templates')} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px', cursor: 'pointer', border: '1px dashed var(--text-muted)', background: 'transparent' }}>
          <span style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>+</span>
          <h3 style={{ color: 'var(--text-muted)' }}>Choose Template</h3>
        </div>

        {resumes.map(resume => (
          <div key={resume._id} className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ marginBottom: 0 }}>
                {resume.title && resume.title !== 'Untitled Resume'
                  ? resume.title
                  : (resume.personalDetails?.jobTitle || masterProfile?.personalDetails?.jobTitle || 'Untitled Resume')}
              </h3>
              <span className="badge badge-primary">{resume.template}</span>
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</span>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => navigate(`/builder/${resume._id}`)}>Edit</button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => navigate(`/preview/${resume._id}`)}>Preview</button>
              <button className="btn btn-danger" style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }} onClick={() => handleDeleteResume(resume._id)}>✕</button>
            </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default Dashboard;
