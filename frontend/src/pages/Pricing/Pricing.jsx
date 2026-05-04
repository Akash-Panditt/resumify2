import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import StatusModal from '../../components/StatusModal';

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const currentPlan = user?.plan || 'free';
  const requestedPlan = user?.requested_plan || null;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/payments/plans`);
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to fetch plans', err);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan || planId === requestedPlan) return;
    setLoading(planId);
    try {
      const planInfo = plans.find(p => p.id === planId || p.name === planId);
      const amount = planInfo.price;

      // Step 1: Create Payment Session
      const checkoutRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/checkout`, {
        type: 'plan',
        itemId: planId,
        amount,
        billingCycle
      });

      const { transactionId } = checkoutRes.data;

      // Step 2: Show intermediate processing state (Simulation of Gateway)
      setModal({
        isOpen: true,
        type: 'loading', // Custom type for processing
        title: 'Processing Payment',
        message: 'Please wait while we verify your transaction with the provider...'
      });

      // Step 3: Verify Payment
      const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/verify`, {
        transactionId,
        itemId: planId,
        type: 'plan',
        billingCycle
      });

      // Step 4: Success
      const updatedUser = { ...user, plan: planId, requested_plan: null };
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Upgrade Successful!',
        message: verifyRes.data.message
      });
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Payment Failed',
        message: err.response?.data?.message || 'Transaction could not be completed.'
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar user={user} />

      <div className="pricing-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Dashboard
          </button>
        </div>

        <div className="pricing-header">
          <div className="badge-premium">Pricing Plans</div>
          <h1 className="text-gradient pricing-title">Ready to level up?</h1>
          <p className="pricing-subtitle">
            Choose the perfect plan for your career stage.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle-container">
            <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
            <div className="toggle-switch" onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}>
              <div className={`toggle-knob ${billingCycle === 'yearly' ? 'right' : ''}`} />
            </div>
            <span className={billingCycle === 'yearly' ? 'active' : ''}>
              Yearly <span className="savings-badge">Save ~16%</span>
            </span>
          </div>
        </div>

        {loadingPlans ? (
          <div className="loading-state">
            <div className="loader-mini" />
            <span>Loading plans...</span>
          </div>
        ) : (
          <>
            <div className="pricing-grid-v2">
              {plans.map((plan) => {
                const isFree = plan.name === 'free';
                const isPro = plan.name === 'pro';
                const isBasic = plan.name === 'basic';

                const showPlan = (billingCycle === 'monthly' && !isPro) || (billingCycle === 'yearly' && !isBasic) || isFree;
                if (!showPlan) return null;

                const period = isFree ? 'Forever' : (isPro ? 'per year' : 'per month');
                const price = plan.price;

                return (
                  <div key={plan.id} className={`pricing-card-v2 ${isPro ? 'featured' : ''}`}>
                    {isPro && <div className="card-ribbon">Best Value</div>}

                    <div className="card-top">
                      <h3 className="plan-name-v2">{plan.name}</h3>
                      <div className="price-box">
                        <span className="currency-v2">₹</span>
                        <span className="amount-v2">{price}</span>
                        <span className="period-v2">/{period === 'Forever' ? 'life' : (isPro ? 'year' : 'mo')}</span>
                      </div>
                    </div>

                    <ul className="features-list-v2">
                      {(plan.features || []).map((f, i) => (
                        <li key={i} className={f.toLowerCase().includes('no') ? 'dimmed' : ''}>
                          <span className="feat-icon">{f.toLowerCase().includes('no') ? '✕' : '✓'}</span>
                          {f}
                        </li>
                      ))}
                      {plan.download_limit > 0 && !isPro && !isBasic && (
                        <li><span className="feat-icon">✓</span> {plan.download_limit} Free Basic Downloads</li>
                      )}
                    </ul>

                    <div className="card-footer">
                      {currentPlan === plan.name ? (
                        <button className="btn btn-secondary w-full" disabled>Active</button>
                      ) : (
                        <button
                          className={`btn ${isPro ? 'btn-primary' : 'btn-secondary'} w-full`}
                          onClick={() => handleUpgrade(plan.name)}
                          disabled={loading === plan.name}
                        >
                          {loading === plan.name ? 'Processing...' : `Get Started`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="single-unlock-note">
              <div className="note-icon">💡</div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>Just need one resume?</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Use our "Try Before You Buy" model. Build your perfect resume with AI and premium templates for free, then unlock it for download for just <strong>₹9</strong>.
                </p>
              </div>
            </div>
          </>
        )}

        <StatusModal
          {...modal}
          onClose={() => {
            setModal({ ...modal, isOpen: false });
            if (modal.type === 'success') window.location.reload();
          }}
        />

        <style>{`
          .pricing-container {
            padding: clamp(1rem, 4vw, 2rem) 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
          }

          .btn-back {
            background: #2563eb;
            border: none;
            color: white;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            padding: 0.6rem 1.25rem;
            border-radius: 50px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }

          .btn-back:hover {
            background: #1d4ed8;
            color: white;
            transform: translateX(-4px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
          }

          .pricing-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .badge-premium {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1.5rem;
          }

          .pricing-title {
            font-size: clamp(2rem, 6vw, 3rem);
            font-weight: 900;
            margin-bottom: 0.75rem;
            line-height: 1.1;
          }

          .pricing-subtitle {
            color: var(--text-muted);
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          /* Toggle Switch */
          .billing-toggle-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            font-weight: 700;
            color: var(--text-muted);
          }

          .billing-toggle-container span.active {
            color: var(--text-main);
          }

          .toggle-switch {
            width: 64px;
            height: 32px;
            background: var(--surface);
            border: 2px solid var(--surface-border);
            border-radius: 50px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .toggle-knob {
            width: 22px;
            height: 22px;
            background: var(--primary);
            border-radius: 50%;
            position: absolute;
            top: 3px;
            left: 4px;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 10px rgba(99, 102, 241, 0.4);
          }

          .toggle-knob.right {
            left: 34px;
          }

          .savings-badge {
            font-size: 0.7rem;
            background: #10b981;
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 50px;
            margin-left: 0.5rem;
            vertical-align: middle;
          }

          /* Pricing Grid V2 */
          .pricing-grid-v2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            align-items: stretch;
          }

          .pricing-card-v2 {
            background: var(--surface);
            border: 1px solid var(--surface-border);
            border-radius: 24px;
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            position: relative;
            transition: all 0.4s ease;
          }

          .pricing-card-v2:hover {
            transform: translateY(-10px);
            border-color: var(--primary);
            box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
          }

          .pricing-card-v2.featured {
            border-color: var(--primary);
            box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.3);
            background: linear-gradient(180deg, var(--surface) 0%, rgba(99, 102, 241, 0.05) 100%);
          }

          .card-ribbon {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: var(--primary);
            color: white;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            text-transform: uppercase;
          }

          .plan-name-v2 {
            font-size: 1.25rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1.5rem;
            color: var(--primary);
          }

          .price-box {
            display: flex;
            align-items: baseline;
            margin-bottom: 3rem;
          }

          .amount-v2 {
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--text-main);
            line-height: 1;
          }

          .currency-v2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-right: 4px;
          }

          .period-v2 {
            font-size: 1rem;
            color: var(--text-muted);
            margin-left: 6px;
          }

          .features-list-v2 {
            list-style: none;
            padding: 0;
            margin: 0 0 3rem 0;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            flex-grow: 1;
          }

          .features-list-v2 li {
            display: flex;
            gap: 1rem;
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-main);
          }

          .features-list-v2 li.dimmed {
            color: var(--text-muted);
            opacity: 0.6;
          }

          .feat-icon {
            color: var(--primary);
            font-weight: 900;
          }

          .w-full { width: 100%; }

          .single-unlock-note {
            margin-top: 4rem;
            background: rgba(99, 102, 241, 0.05);
            border: 1px dashed var(--primary);
            border-radius: 16px;
            padding: 1.5rem 2rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            text-align: left;
          }

          .note-icon {
            font-size: 2rem;
            background: var(--surface);
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }

          @media (max-width: 768px) {
            .pricing-card-v2 { padding: 2rem; }
            .pricing-grid-v2 { grid-template-columns: 1fr; }
            .single-unlock-note { flex-direction: column; text-align: center; gap: 1rem; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Pricing;
