import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios';
import App from './App.jsx'

axios.defaults.withCredentials = true;

// Global response interceptor to handle session expiry

// Global response interceptor to handle session expiry
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const isAuthError = error.response?.status === 401;
  const isSecurityForbidden = error.response?.status === 403 && !error.response?.data?.type;

  if (isAuthError || isSecurityForbidden) {
    console.warn(`[Axios Interceptor] Session invalid or forbidden (${error.response?.status}). Clearing session.`);
    
    localStorage.removeItem('resumify_user');
    localStorage.removeItem('resumify_token');
    localStorage.removeItem('resumify_admin');

    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
