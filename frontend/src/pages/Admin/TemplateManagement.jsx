import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category_id: '',
    image_url: '',
    is_premium: false
  });

  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tRes, cRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/templates`, {
          headers: { 'Authorization': `Bearer ${admin.token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/categories`, {
          headers: { 'Authorization': `Bearer ${admin.token}` }
        })
      ]);
      setTemplates(tRes.data);
      setCategories(cRes.data);
    } catch (err) {
      console.error('Fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTemplate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/templates`, newTemplate, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      setNewTemplate({ name: '', category_id: '', image_url: '', is_premium: false });
      setIsAdding(false);
      fetchData();
    } catch (err) {
      alert('Failed to add template');
    }
  };
  const handleDeleteTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template from the catalog?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/templates/${templateId}`, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      fetchData();
    } catch (err) {
      alert('Failed to delete template');
    }
  };

  const handleTogglePremium = async (template) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/templates/${template.id}`, { is_premium: !template.is_premium }, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      fetchData();
    } catch (err) {
      alert('Failed to update template status');
    }
  };
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Templates...</div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', marginBottom: '0.25rem' }}>Template Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Inventory of all resume templates available to users.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)} style={{ padding: '0.6rem 1.2rem' }}>
          {isAdding ? 'Cancel' : '+ Add Template'}
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleAddTemplate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 1fr), 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Template Name</label>
              <input
                type="text"
                className="form-input"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={newTemplate.category_id}
                onChange={(e) => setNewTemplate({ ...newTemplate, category_id: e.target.value })}
                required
              >
                <option value="">Select a Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Image URL (Preview)</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://example.com/template.png"
                value={newTemplate.image_url}
                onChange={(e) => setNewTemplate({ ...newTemplate, image_url: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="is_premium"
                checked={newTemplate.is_premium}
                onChange={(e) => setNewTemplate({ ...newTemplate, is_premium: e.target.checked })}
              />
              <label htmlFor="is_premium" className="form-label" style={{ marginBottom: 0 }}>Mark as Premium (Gated for Pro users)</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Add Template to Catalog</button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 100%, 1fr), 1fr))', gap: '1.5rem' }}>
        {templates.map((t) => (
          <div key={t.id} className="template-card">
            <div className="template-preview" style={{ height: '200px', background: '#f1f5f9', position: 'relative' }}>
              {t.image_url ? (
                <img src={t.image_url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No Preview Available</div>
              )}
              {t.is_premium && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <span className="badge badge-purple">PREMIUM</span>
                </div>
              )}
            </div>
            <div className="template-info">
              <h3 style={{ fontSize: '1.1rem' }}>{t.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Category: {t.categories?.name || 'Uncategorized'}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={`btn ${t.is_premium ? 'btn-secondary' : 'btn-primary'}`} 
                  style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', background: t.is_premium ? 'transparent' : 'rgba(99, 102, 241, 0.1)' }}
                  onClick={() => handleTogglePremium(t)}
                >
                  {t.is_premium ? 'Make Free' : 'Make Premium'}
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '0.4rem', fontSize: '0.8rem', color: 'var(--error)' }}
                  onClick={() => handleDeleteTemplate(t.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {templates.length === 0 && !isAdding && (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
            Template catalog is empty. Add templates to make them accessible in the resume builder.
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateManagement;
