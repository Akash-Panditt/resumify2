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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/pricing`);
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
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/pricing/${editingPlan.id}`, editingPlan);
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      alert('Failed to update plan');
    }
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Pricing Tiers...</div>;

  return (
    <div className="admin-pricing-v2">
      <div className="page-header-v2">
        <h2 className="title-v2">Subscription Tiers</h2>
        <p className="subtitle-v2">Manage pricing, billing cycles, and download limits.</p>
      </div>

      <div className="pricing-grid-v2">
        {plans.map((plan) => {
          const isPro = plan.name === 'pro';
          const isFree = plan.name === 'free';
          const periodLabel = isFree ? 'Life' : (isPro ? 'Year' : 'Month');

          return (
            <div key={plan.id} className={`admin-plan-card ${plan.name === 'basic' ? 'featured' : ''}`}>
              <div className="card-badge">{plan.name.toUpperCase()}</div>
              
              <div className="price-tag">
                <span className="currency">₹</span>
                {plan.price}
                <span className="period">/{periodLabel}</span>
              </div>

              <div className="limit-row">
                 <span className="limit-label">Monthly Limit</span>
                 <span className="limit-value">{plan.download_limit} Downloads</span>
              </div>

              <ul className="admin-feature-list">
                {(plan.features || []).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <button 
                className="btn-edit" 
                onClick={() => setEditingPlan(plan)}
              >
                Edit Plan Details
              </button>
            </div>
          );
        })}
      </div>

      {editingPlan && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Edit {editingPlan.name} Plan</h3>
            <form onSubmit={handleUpdatePlan}>
              <div className="field">
                <label>Plan Name</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  required
                />
              </div>
              <div className="field">
                <label>Price (INR)</label>
                <input
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="field">
                <label>Download Limit</label>
                <input
                  type="number"
                  value={editingPlan.download_limit}
                  onChange={(e) => setEditingPlan({ ...editingPlan, download_limit: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="field">
                <label>Features (One per line)</label>
                <textarea
                  value={(editingPlan.features || []).join('\n')}
                  onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split('\n') })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingPlan(null)}>Cancel</button>
                <button type="submit" className="btn-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .admin-pricing-v2 { padding: 1.5rem; max-width: 1400px; margin: 0 auto; }
        .page-header-v2 { margin-bottom: 2rem; text-align: left; }
        .title-v2 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem; }
        .subtitle-v2 { color: var(--text-muted); font-size: 0.9rem; }
 
        .pricing-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
 
        .admin-plan-card {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: 20px;
          padding: 1.75rem;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }
 
        .admin-plan-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }
 
        .admin-plan-card.featured {
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
        }
 
        .card-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.3rem 1rem;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 1.25rem;
          align-self: flex-start;
          letter-spacing: 0.05em;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
 
        .price-tag {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: baseline;
          color: var(--text-main);
        }
 
        .price-tag .currency { font-size: 1.5rem; margin-right: 4px; color: var(--text-main); }
        .price-tag .period { font-size: 1rem; color: var(--text-muted); font-weight: 600; margin-left: 4px; }
 
        .limit-row {
          background: var(--bg-color);
          padding: 1rem 1.25rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border: 1px solid var(--surface-border);
        }
 
        .limit-label { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
        .limit-value { font-weight: 700; font-size: 1rem; color: var(--text-main); }
 
        .admin-feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }
 
        .admin-feature-list li {
          display: flex;
          align-items: center;
          gap: 10px;
        }
 
        .admin-feature-list li::before {
          content: '•';
          color: var(--primary);
          font-weight: 900;
        }
 
        .btn-edit {
          width: 100%;
          padding: 0.85rem;
          background: var(--surface-hover);
          color: var(--text-main);
          border: 1px solid var(--surface-border);
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
 
        .btn-edit:hover { 
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
 
        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
 
        .modal-card {
          background: var(--surface);
          padding: 3rem;
          border-radius: 28px;
          width: 100%;
          max-width: 550px;
          border: 1px solid var(--surface-border);
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          max-height: 90vh;
          overflow-y: auto;
        }
 
        .modal-card h3 { font-size: 1.5rem; margin-bottom: 2rem; color: var(--text-main); }
 
        .field { margin-bottom: 1.75rem; }
        .field label { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-muted); }
        .field input, .field textarea {
          width: 100%;
          padding: 1.1rem;
          background: var(--bg-color);
          border: 1px solid var(--surface-border);
          border-radius: 14px;
          color: var(--text-main);
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);
        }
 
        .field input:focus, .field textarea:focus {
          outline: none;
          border-color: var(--primary);
          background: var(--surface);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }
 
        .field textarea {
          line-height: 1.6;
          min-height: 160px;
          resize: vertical;
        }
 
        .modal-actions { display: flex; gap: 1rem; margin-top: 3rem; }
        
        .btn-save { 
          flex: 2; 
          padding: 1rem 2rem; 
          background: #4f46e5; 
          color: #ffffff; 
          border: none; 
          border-radius: 12px; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-cancel { 
          flex: 1; 
          padding: 1rem 2rem; 
          background: #f8fafc; 
          color: #475569; 
          border: 1px solid #e2e8f0; 
          border-radius: 12px; 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.2s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-save:hover { 
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35);
        }
        
        .btn-cancel:hover { 
          background: #f1f5f9; 
          border-color: #cbd5e1;
          color: #1e293b;
        }
 
        .btn-save:active, .btn-cancel:active {
          transform: translateY(0);
        }
 
        /* Dark mode overrides for buttons if needed */
        [data-theme='dark'] .btn-cancel {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }
        [data-theme='dark'] .btn-cancel:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #f1f5f9;
        }
 
        /* Custom scrollbar */
        .field textarea::-webkit-scrollbar { width: 8px; }
        .field textarea::-webkit-scrollbar-track { background: transparent; }
        .field textarea::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.1); border-radius: 10px; }
        .field textarea::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.2); }
      `}</style>
    </div>
  );
};

export default PricingManagement;
