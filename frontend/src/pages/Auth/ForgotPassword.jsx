import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpVerification from '../../components/OtpVerification';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
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
              <input 
                type="password" 
                className="form-input" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-input" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
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
