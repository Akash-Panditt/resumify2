import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import OtpVerification from '../../components/OtpVerification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateFields()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (res.data.requireOtp) {
        setShowOtp(true);
      } else {
        const userData = res.data;
        localStorage.setItem('resumify_user', JSON.stringify(userData));
        
        if (userData.role === 'admin') {
          localStorage.setItem('resumify_admin', JSON.stringify(userData));
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleVerifyOtp = async (otp) => {
    const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
    const userData = res.data;
    localStorage.setItem('resumify_user', JSON.stringify(userData));
    
    if (userData.role === 'admin') {
      localStorage.setItem('resumify_admin', JSON.stringify(userData));
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleResendOtp = async () => {
    await axios.post('http://localhost:5000/api/auth/send-otp', { email, type: 'login' });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', { credential: credentialResponse.credential });
      const userData = res.data;
      localStorage.setItem('resumify_user', JSON.stringify(userData));
      
      if (userData.role === 'admin') {
        localStorage.setItem('resumify_admin', JSON.stringify(userData));
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google Login failed');
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '1rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Sign in to continue to your dashboard.</p>
        
        {error && <div style={{ color: 'var(--error)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
        
        {showOtp ? (
          <OtpVerification 
            email={email} 
            onVerify={handleVerifyOtp} 
            onResend={handleResendOtp} 
            onCancel={() => setShowOtp(false)} 
          />
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: '' })); }}
                style={fieldErrors.email ? { borderColor: '#ef4444' } : {}}
              />
              {fieldErrors.email && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>{fieldErrors.email}</div>
              )}
            </div>
            
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Password</span>
                <Link to="/forgot-password" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot?</Link>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: '' })); }}
                  style={{ paddingRight: '2.5rem', ...(fieldErrors.password ? { borderColor: '#ef4444' } : {}) }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                  {showPassword ? (
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
              {fieldErrors.password && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>{fieldErrors.password}</div>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
              <Link to="/signup" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>Create an Account</Link>
              
              <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0', color: 'var(--text-muted)' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
                <span style={{ padding: '0 1rem', fontSize: '0.875rem' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google Authentication Failed')} width="100%" text="signin_with" shape="rectangular" />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
