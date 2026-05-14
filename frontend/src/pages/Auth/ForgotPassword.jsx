import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpVerification from '../../components/OtpVerification';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { email, type: 'forgot' });
      setShowOtp(true);
      setStatus('idle');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (otp) => {
    setStatus('loading');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password/verify`, {
        email,
        otp
      });
      setResetToken(response.data.resetToken);
      setShowOtp(false);
      setShowResetFields(true);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      throw err; 
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password/reset`, {
        email,
        resetToken,
        newPassword
      });
      setStatus('success');
      setMessage('Password reset successful! You can now login with your new password.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <div style={{ padding: 'clamp(1rem, 5vw, 3rem) 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '0.75rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: 'clamp(1.25rem, 5vw, 2.5rem)' }}>
        {!showResetFields && (
          <div style={{ marginBottom: '2rem' }}>
            {!showOtp && <h2 style={{ marginBottom: '0.5rem' }}>Reset Password</h2>}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {showOtp ? 'Verification code sent.' : "Enter your email and we'll send you a verification code."}
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ color: 'var(--error)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}

        {status === 'success' && (
          <div style={{ color: 'var(--success)', padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}
        
        {showOtp ? (
          <OtpVerification 
            email={email}
            onVerify={handleVerifyOtp}
            onResend={() => axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { email, type: 'forgot' })}
            onCancel={() => setShowOtp(false)}
            type="forgot"
          />
        ) : showResetFields ? (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showNewPassword ? 'text' : 'password'} 
                  className="form-input" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                >
                  {showNewPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  className="form-input" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRequestOtp}>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={status === 'loading'}
                required 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending Code...' : 'Send Verification Code'}
              </button>
              <Link to="/login" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
