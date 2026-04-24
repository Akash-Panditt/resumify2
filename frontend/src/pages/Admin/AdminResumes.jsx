import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Icon = ({ path, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
};

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/resumes', {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setResumes(res.data);
    } catch (err) {
      console.error('Resume fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Are you sure you want to permanently delete this resume? This cannot be undone.')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchResumes();
    } catch (err) {
      alert('Failed to delete resume');
    }
  };

  const filteredResumes = resumes.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      (r.title && r.title.toLowerCase().includes(term)) ||
      (r.user?.name && r.user.name.toLowerCase().includes(term)) ||
      (r.user?.email && r.user.email.toLowerCase().includes(term)) ||
      (r.template?.name && r.template.name.toLowerCase().includes(term))
    );
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Resumes...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Resume Content Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Monitor and manage {resumes.length} resumes created across the platform.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface)' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }}>
            <Icon path={ICONS.search} size={16} />
          </div>
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Search by resume title, user name/email, or template format..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Resume Details</th>
                <th>Author</th>
                <th>Template</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResumes.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '36px', height: '36px', borderRadius: '10px', 
                        background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Icon path={ICONS.resume} size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{r.title || 'Untitled Resume'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {r.id.split('-')[0]}...</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {r.user ? (
                      <div>
                        <div style={{ fontWeight: '500' }}>{r.user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.user.email}</div>
                      </div>
                    ) : (
                      <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>ORPHANED</span>
                    )}
                  </td>
                  <td>
                    {r.template ? (
                      <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{r.template.name}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Default</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(r.updated_at || r.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ textAlign: 'right', minWidth: '120px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {/* Note: Preview routes to actual builder URL in a real app, assuming viewer route exists or we can just mock the button */}
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="View Resume JSON Data (Mock Preview)"
                        onClick={() => alert('Future Feature: Full Preview Mode')}
                      >
                        <Icon path={ICONS.eye} size={16} />
                      </button>

                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }} 
                        onClick={() => handleDeleteResume(r.id)}
                        title="Delete Resume"
                      >
                        <Icon path={ICONS.trash} size={16} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredResumes.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No resumes found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResumes;
