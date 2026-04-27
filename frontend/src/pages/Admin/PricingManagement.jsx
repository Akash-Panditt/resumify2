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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/pricing`, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
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
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/pricing/${editingPlan.id}`, editingPlan, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
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
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingPlan(null)}>Cancel</button>
                <button type="submit" className="btn-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-pricing-v2 { padding: 1rem; }
        .page-header-v2 { margin-bottom: 3rem; }
        .title-v2 { font-size: 2rem; font-weight: 800; }
        .subtitle-v2 { color: var(--text-muted); }

        .pricing-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .admin-plan-card {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
        }

        .card-badge {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .price-tag {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .price-tag .currency { font-size: 1.25rem; margin-right: 2px; color: var(--text-muted); }
        .price-tag .period { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }

        .limit-row {
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.05);
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .limit-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .limit-value { font-weight: 800; }

        .admin-feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .btn-edit {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit:hover { filter: brightness(1.1); transform: translateY(-2px); }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-card {
          background: var(--surface);
          padding: 2.5rem;
          border-radius: 24px;
          width: 100%;
          max-width: 450px;
        }

        .field { margin-bottom: 1.5rem; }
        .field label { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
        .field input {
          width: 100%;
          padding: 0.85rem;
          background: var(--bg-color);
          border: 1px solid var(--surface-border);
          border-radius: 10px;
          color: var(--text-main);
          font-size: 1rem;
        }

        .modal-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-save { flex: 1; padding: 1rem; background: var(--primary); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-cancel { flex: 1; padding: 1rem; background: rgba(255,255,255,0.05); color: var(--text-main); border: 1px solid var(--surface-border); border-radius: 12px; font-weight: 700; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default PricingManagement;
