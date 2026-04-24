import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Icon = ({ path, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  megaphone: <><polygon points="11 19 2 12 11 5 11 19"/><path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"/></>,
  trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'info'
  });
  
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/announcements', {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to fetch announcements', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/announcements', {
        ...newAnnouncement,
        is_active: true
      }, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setNewAnnouncement({ title: '', content: '', type: 'info' });
      setIsAdding(false);
      fetchAnnouncements();
    } catch (err) {
      alert('Failed to post announcement');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement permanently?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/announcements/${id}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchAnnouncements();
    } catch (err) {
      alert('Failed to delete announcement');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Announcements...</div>;

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Global Announcements</h2>
          <p style={{ color: 'var(--text-muted)' }}>Broadcast alerts and updates to all registered users.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ New Announcement'}
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Headline</label>
              <input 
                type="text" 
                className="form-input" 
                value={newAnnouncement.title} 
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} 
                required 
                placeholder="e.g., Scheduled Maintenance"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea 
                className="form-input" 
                style={{ resize: 'vertical', minHeight: '100px' }} 
                value={newAnnouncement.content} 
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} 
                required 
                placeholder="Detailed message..."
              />
            </div>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Alert Type</label>
              <select 
                className="form-input" 
                style={{ width: 'auto' }} 
                value={newAnnouncement.type} 
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
              >
                <option value="info">Informational (Blue)</option>
                <option value="warning">Warning (Yellow)</option>
                <option value="success">Success / Promo (Green)</option>
                <option value="danger">Critical (Red)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Post Announcement</button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {announcements.map((a) => (
          <div key={a.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderLeft: `4px solid var(--${a.type === 'danger' ? 'error' : a.type === 'warning' ? 'warning' : a.type === 'success' ? 'success' : 'primary'})` }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: `var(--surface-hover)`, 
              color: `var(--${a.type === 'danger' ? 'error' : a.type === 'warning' ? 'warning' : a.type === 'success' ? 'success' : 'primary'})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
            }}>
              <Icon path={ICONS.megaphone} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{a.title}</h3>
                <button 
                  className="btn btn-danger" 
                  style={{ padding: '0.4rem', background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }} 
                  onClick={() => handleDelete(a.id)}
                  title="Delete Announcement"
                >
                  <Icon path={ICONS.trash} size={16} />
                </button>
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {a.content}
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Posted on {new Date(a.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {announcements.length === 0 && !isAdding && (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No active announcements.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
