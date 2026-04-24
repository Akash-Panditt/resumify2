import React, { useState, useEffect } from 'react';

const OtpVerification = ({ email, onVerify, onResend, onCancel, type = 'login' }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setExpired(true);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expired) {
      setError('OTP has expired. Please request a new one.');
      return;
    }
    setLoading(true);
    try {
      await onVerify(otp);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await onResend();
      setTimer(59);
      setExpired(false);
      setOtp('');
      setError('');
    } catch (err) {
      setError('Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>Enter OTP</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        We've sent a 6-digit code to <strong>{email}</strong>.
      </p>

      {error && (
        <div style={{ 
          color: 'var(--error)', 
          padding: '0.75rem', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.5rem', 
          fontSize: '0.85rem' 
        }}>
          {error}
        </div>
      )}

      {expired && (
        <div style={{ 
          position: 'fixed', 
          top: '30px', 
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
          color: 'white', 
          padding: '0.8rem 2rem', 
          borderRadius: '50px', 
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '600',
          animation: 'slideDown 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
        }}>
          <strong>OTP has expired!</strong>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="0 0 0 0 0 0"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            style={{ 
              textAlign: 'center', 
              fontSize: '1.5rem', 
              letterSpacing: '10px', 
              fontWeight: 'bold',
              height: '50px'
            }}
            required
            disabled={expired || loading}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '0.9rem', 
            color: expired ? '#ef4444' : 'var(--text-muted)',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            {!expired && <div className="timer-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 1.5s infinite' }}></div>}
            {expired ? 'Code Expired' : `Time remaining: 00:${timer < 10 ? `0${timer}` : timer}`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={expired || loading || otp.length < 6}
            style={{ width: '100%', height: '48px', fontSize: '1rem', fontWeight: '600' }}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleResend}
              disabled={loading}
              style={{ flex: 1, height: '44px' }}
            >
              Resend OTP
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={loading}
              style={{ flex: 1, height: '44px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
      `}</style>
    </div>
  );
};

export default OtpVerification;
