import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import StatusModal from '../../components/StatusModal';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'Forever',
    features: ['5 PDF downloads total', 'Unlimited editing', 'Basic resume builder', '₹9 per Premium template', '❌ No AI Smart Features'],
    featured: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '₹199',
    period: 'per month',
    features: ['50 PDF downloads /mo', 'Unlimited editing', '₹9 per Premium template', '❌ No AI Smart Features', 'Standard processing speed'],
    featured: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹1999',
    period: 'per year',
    features: ['Unlimited downloads', 'All templates (Free + Premium)', 'AI Smart Resume Builder', 'Priority generation', 'Priority support'],
    featured: false
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const currentPlan = user?.plan || 'free';
  const requestedPlan = user?.requested_plan || null;

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan || planId === requestedPlan) return;
    if (!user?.token) return navigate('/login');

    setLoading(planId);
    try {
      const planInfo = PLANS.find(p => p.id === planId);
      const amount = parseInt(planInfo.price.replace('₹', ''));

      const res = await axios.post(`http://localhost:5000/api/payments/checkout`, { 
        type: 'plan', 
        itemId: planId,
        amount
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      // Update local storage with the new plan
      const updatedUser = { ...user, plan: planId, requested_plan: null };
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
      
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Upgrade Successful!',
        message: res.data.message
      });
    } catch (err) {
      console.error('Upgrade request failed', err);
      const diagnosticMsg = err.response?.data?.message 
        || (err.message === 'Network Error' ? 'Network Error: Backend may be unreachable or blocked by CORS.' : err.message)
        || 'Unexpected error occurred.';

      setModal({
        isOpen: true,
        type: 'error',
        title: 'Upgrade Failed',
        message: diagnosticMsg
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar user={user} />
      
      <div style={{ padding: '3rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient">Choose Your Plan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Choose the plan that fits your career goals. Upgrade anytime.
          </p>
        </div>

        <div className="responsive-grid" style={{ alignItems: 'stretch' }}>
        {PLANS.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured && (
              <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--primary)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '0 0 0.5rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{plan.name}</h3>
            <div className="price">
              {plan.price}<span> {plan.period}</span>
            </div>
            <ul className="feature-list">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {currentPlan === plan.id ? (
              <button className="btn btn-secondary" style={{ width: '100%', cursor: 'default' }} disabled>Current Plan</button>
            ) : requestedPlan === plan.id ? (
              <button className="btn btn-secondary" style={{ width: '100%', cursor: 'default', color: 'var(--primary)' }} disabled>Request Pending...</button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading === plan.id || (requestedPlan && requestedPlan !== plan.id)}
              >
                {loading === plan.id ? 'Processing...' : `Upgrade to ${plan.name}`}
              </button>
            )}
          </div>
        ))}
      </div>

      <StatusModal 
        {...modal} 
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.type === 'success') window.location.reload();
        }} 
      />
      </div>
    </div>
  );
};

export default Pricing;
