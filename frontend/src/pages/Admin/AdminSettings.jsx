import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      // Ensure defaults if empty DB
      const defaultSettings = {
        site_name: 'Resumify',
        support_email: 'support@resumify.com',
        maintenance_mode: 'false',
        registration_enabled: 'true',
        smtp_host: '',
        smtp_port: '587',
        smtp_user: '',
        smtp_pass: ''
      };
      
      const loaded = res.data || {};
      const merged = { ...defaultSettings };
      Object.keys(loaded).forEach(k => {
        try {
           merged[k] = JSON.parse(loaded[k]);
        } catch(e) {
           merged[k] = loaded[k]; // fallback for raw strings
        }
      });
      
      setSettings(merged);
    } catch (err) {
      console.error('Settings fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      alert('Platform settings saved successfully.');
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings. Insufficient permissions?');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Settings...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Platform Settings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Global configuration for the Resumify application.</p>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* General Settings */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>General Platform Info</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 1fr), 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Platform Name</label>
                <input type="text" className="form-input" value={settings.site_name || ''} onChange={e => handleChange('site_name', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Support Email Address</label>
                <input type="email" className="form-input" value={settings.support_email || ''} onChange={e => handleChange('support_email', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--success)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Features & Access</h3>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label className="form-label" style={{ marginBottom: '0.2rem' }}>User Registration</label>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allow new users to sign up on the platform.</div>
                </div>
                <select className="form-input" style={{ width: 'auto', minWidth: '120px' }} value={settings.registration_enabled} onChange={e => handleChange('registration_enabled', e.target.value)}>
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
              
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label className="form-label" style={{ marginBottom: '0.2rem', color: '#ef4444' }}>Maintenance Mode</label>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Disable frontend access for non-admin users.</div>
                </div>
                <select className="form-input" style={{ width: 'auto', minWidth: '120px' }} value={settings.maintenance_mode} onChange={e => handleChange('maintenance_mode', e.target.value)}>
                  <option value="false">Off (Live)</option>
                  <option value="true">On (Maintenance)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SMTP Settings */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#f59e0b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>SMTP Configuration</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 1fr), 1fr))', gap: '1.5rem' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">SMTP Host</label>
                <input type="text" className="form-input" placeholder="smtp.gmail.com" value={settings.smtp_host || ''} onChange={e => handleChange('smtp_host', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">SMTP Port</label>
                <input type="text" className="form-input" placeholder="587" value={settings.smtp_port || ''} onChange={e => handleChange('smtp_port', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">SMTP Username</label>
                <input type="text" className="form-input" placeholder="user@gmail.com" value={settings.smtp_user || ''} onChange={e => handleChange('smtp_user', e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">SMTP Password</label>
                <input type="password" className="form-input" placeholder="••••••••" value={settings.smtp_pass || ''} onChange={e => handleChange('smtp_pass', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', display: 'block', width: '100%' }} disabled={saving}>
          {saving ? 'Saving Framework...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
