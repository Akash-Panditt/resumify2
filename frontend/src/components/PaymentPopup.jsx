import React, { useState } from 'react';
import axios from 'axios';

const PaymentPopup = ({ isOpen, onClose, templateName, templateId, price, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  if (!isOpen) return null;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/checkout`, {
        type: 'template',
        itemId: templateId,
        amount: price
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (res.data.success) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Payment failed', err);
      alert(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.5rem'
        }}>
          ✨
        </div>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>Unlock Template</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The <strong style={{ color: 'var(--text-main)' }}>{templateName}</strong> is a premium template.
          Pay a one-time fee to download this resume.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem',
          border: '1px dashed var(--surface-border)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Template Fee:</span>
            <span style={{ fontWeight: 700 }}>₹{price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>License:</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Lifetime</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay & Download`}
          </button>
          <button 
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          🔒 Secure payment via Razorpay / Stripe
        </p>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PaymentPopup;
