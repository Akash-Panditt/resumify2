import React, { useState } from 'react';
import axios from 'axios';
import StatusModal from './StatusModal';

const PaymentPopup = ({ isOpen, onClose, templateName, templateId, resumeId, price, onSuccess, message }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.height = 'unset';
        document.body.style.touchAction = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const checkoutRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/checkout`, {
        type: resumeId ? 'resume_download' : 'template',
        itemId: resumeId || templateId,
        itemName: templateName || (resumeId ? 'Resume Download' : 'Template Purchase'),
        amount: price
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const { transactionId } = checkoutRes.data;

      const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/verify`, {
        transactionId,
        itemId: resumeId || templateId,
        type: resumeId ? 'resume_download' : 'template'
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (verifyRes.data.success) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Payment failed', err);
      setModal({
        isOpen: true,
        title: 'Coming Soon',
        message: err.response?.data?.message || 'We couldn\'t process your payment. Please check your connection and try again.'
      });
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
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        color: '#1a1a1a'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.04)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style={{ padding: '2rem 1.75rem' }}>
          {/* PDF Icon - Scaled Down */}
          <div style={{
            width: '64px',
            height: '64px',
            background: '#e8f5ed',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            position: 'relative'
          }}>
            <div style={{
              width: '36px',
              height: '44px',
              background: '#fff',
              border: '2px solid #27ae60',
              borderRadius: '5px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <div style={{ background: '#27ae60', color: '#fff', fontSize: '8px', fontWeight: 'bold', padding: '1px 3px', width: '100%', textAlign: 'center' }}>PDF</div>
              <div style={{ marginTop: '3px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 13 12 18 17 13"></polyline><line x1="12" y1="6" x2="12" y2="18"></line></svg>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '10px', height: '10px', background: '#27ae60', borderRadius: '50%', border: '2px solid #fff' }}></div>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111', textAlign: 'center' }}>
            Unlock PDF Download
          </h3>
          
          <p style={{ color: '#666', fontSize: '0.95rem', textAlign: 'center', marginBottom: '1.25rem' }}>
            Pay <span style={{ color: '#27ae60', fontWeight: '800' }}>₹{price}</span> to download this resume as PDF
          </p>

          {/* Feature Bar - More Compact */}
          <div style={{
            background: '#f0f9f4',
            border: '1px solid #d4edda',
            borderRadius: '12px',
            padding: '0.65rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#155724', fontWeight: '600' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              One-time
            </div>
            <div style={{ width: '3px', height: '3px', background: '#27ae60', borderRadius: '50%' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#155724', fontWeight: '600' }}>
              Instant download
            </div>
            <div style={{ width: '3px', height: '3px', background: '#27ae60', borderRadius: '50%' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#155724', fontWeight: '600' }}>
              Secure
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #eee', margin: '0 0 1.25rem' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#444' }}>Total Amount</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '900', color: '#27ae60' }}>₹{price}</span>
          </div>

          {/* Promo Box - More Compact */}
          <div style={{
            background: '#fff9f0',
            border: '1px solid #ffeeba',
            borderRadius: '14px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
            cursor: 'pointer'
          }}>
            <div style={{ color: '#f39c12' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#856404' }}>Just ₹{price}</div>
              <div style={{ fontSize: '0.75rem', color: '#856404', opacity: 0.8 }}>Pay once and download instantly.</div>
            </div>
            <div style={{ color: '#856404' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
             <span style={{ fontSize: '0.75rem', color: '#888' }}>Secure payment via</span>
             <span style={{ fontWeight: '900', fontStyle: 'italic', color: '#222', fontSize: '0.85rem' }}>Razorpay</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              width: '100%',
              background: '#27ae60',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 16px rgba(39, 174, 96, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Processing...' : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Pay ₹{price} & Download PDF
              </>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1.25rem', color: '#999', fontSize: '0.75rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            100% secure and encrypted
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <StatusModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type="error"
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default PaymentPopup;
