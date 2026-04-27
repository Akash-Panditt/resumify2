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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
      <Navbar user={user} />
      
      <main style={{ padding: 'clamp(1.5rem, 5vw, 3rem) 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem' 
        }} className="dashboard-header">
          <div>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 800 }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Welcome back, <span className="text-gradient" style={{ fontWeight: 700 }}>{user?.name}</span>. Manage your professional profile.
            </p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/templates')}
            style={{ 
              padding: '0.85rem 2rem',
              fontSize: '1.1rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
            }}
          >
            ✨ Create New Resume
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="mini-stat-card">
            <span className="mini-stat-label">Resumes Created</span>
            <span className="mini-stat-value">{resumes.length}</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-stat-label">Downloads Used</span>
            <span className="mini-stat-value">{user?.download_count || 0}</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-stat-label">Current Plan</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="mini-stat-value" style={{ textTransform: 'capitalize' }}>{user?.plan || 'free'}</span>
              {user?.plan === 'pro' && <span className="badge badge-success">Active</span>}
            </div>
          </div>
        </div>

        {/* Recent Downloads Section */}
        {recentDownloads.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
               <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               </div>
               <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Downloads</h2>
            </div>
            <div className="responsive-grid">
              {recentDownloads.map(resume => (
                <div key={`dl-${resume._id}`} className="card resume-card" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                      {resume.title && resume.title !== 'Untitled Resume'
                        ? resume.title
                        : (resume.personalDetails?.jobTitle || masterProfile?.personalDetails?.jobTitle || 'Untitled Resume')}
                    </h3>
                    <span className="badge badge-purple">{resume.template}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                    Generated on {new Date(resume.downloadedAt).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => navigate(`/preview/${resume._id}`)}>Download</button>
                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate(`/builder/${resume._id}`)}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Drafts Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
             <div style={{ padding: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
             </div>
             <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Resume Drafts</h2>
          </div>
          
          <div className="responsive-grid">
            <div onClick={() => navigate('/templates')} className="card empty-state-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '240px', cursor: 'pointer' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>+</div>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Create New Draft</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>Choose from premium templates</p>
            </div>

            {resumes.map(resume => (
              <div key={resume._id} className="card resume-card" style={{ minHeight: '240px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                    {resume.title && resume.title !== 'Untitled Resume'
                      ? resume.title
                      : (resume.personalDetails?.jobTitle || masterProfile?.personalDetails?.jobTitle || 'Untitled Resume')}
                  </h3>
                  <span className="badge badge-primary">{resume.template}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                  Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" style={{ flex: '2 1 0%', minWidth: '80px' }} onClick={() => navigate(`/builder/${resume._id}`)}>Edit Resume</button>
                  <button className="btn btn-secondary" style={{ flex: '1 1 0%', minWidth: '80px' }} onClick={() => navigate(`/preview/${resume._id}`)}>Preview</button>
                  <button className="btn btn-danger" style={{ flex: '0 0 auto', width: '44px', padding: 0 }} onClick={() => handleDeleteResume(resume._id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
