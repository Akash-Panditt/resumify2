import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PricingManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pricing');
      setPlans(res.data);
    } catch (err) {
      console.error('Pricing fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/pricing/${editingPlan.id}`, editingPlan);
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      alert('Failed to update plan');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Pricing Plans...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Pricing & Limits</h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure subscription tiers and monthly download tokens.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem', 
        marginTop: '3rem' // Add space for badges
      }}>
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.name === 'basic' ? 'featured' : ''}`}>
            {plan.name === 'basic' && (
              <div style={{ 
                position: 'absolute', 
                top: '0', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', // Better centering
                zIndex: 10 
              }}>
                <span className="badge badge-purple" style={{ 
                  padding: '0.5rem 1.5rem', 
                  fontSize: '0.75rem', 
                  fontWeight: '800', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  whiteSpace: 'nowrap',
                  display: 'block'
                }}>
                  Most Popular
                </span>
              </div>
            )}
            <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{plan.name} Plan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Best for {plan.name === 'free' ? 'individuals starting out' : 'professional resume creation'}</p>
            
            <div className="price" style={{ margin: '0.5rem 0 1.5rem 0' }}>
              <span style={{ fontSize: '1.75rem', marginRight: '0.15rem', color: 'var(--text-muted)', fontWeight: '500' }}>₹</span>
              {plan.price}
              <span style={{ marginLeft: '0.35rem', opacity: 0.8 }}>/month</span>
            </div>

            <div style={{ 
              margin: '2rem 0', 
              padding: '1.25rem', 
              background: 'rgba(99, 102, 241, 0.05)', 
              borderRadius: '16px', 
              border: '1px solid rgba(99, 102, 241, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Monthly Limit</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{plan.download_limit} Downloads</div>
            </div>

            <ul className="feature-list" style={{ marginBottom: '2.5rem' }}>
              {(plan.features || []).map((f, i) => (
                <li key={i} className={f.toLowerCase().includes('no') ? 'disabled' : ''}>
                  <span className="feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      {f.toLowerCase().includes('no') ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                      ) : (
                        <polyline points="20 6 9 17 4 12" />
                      )}
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button 
              className="btn btn-primary" 
              style={{ padding: '1rem', borderRadius: '14px', fontWeight: '700', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)' }}
              onClick={() => setEditingPlan(plan)}
            >
              Edit Plan Details
            </button>
          </div>
        ))}
      </div>

      {editingPlan && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setEditingPlan(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              ×
            </button>
            <h3 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>Edit {editingPlan.name} Plan</h3>
            <form onSubmit={handleUpdatePlan}>
              <div className="form-group">
                <label className="form-label">Price (INR)</label>
                <input
                  type="number"
                  className="form-input"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Download Limit (Tokens/Month)</label>
                <input
                  type="number"
                  className="form-input"
                  value={editingPlan.download_limit}
                  onChange={(e) => setEditingPlan({ ...editingPlan, download_limit: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditingPlan(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManagement;
