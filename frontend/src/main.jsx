import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios';
import App from './App.jsx'

axios.defaults.withCredentials = true;

// Global request interceptor to add auth token
axios.interceptors.request.use((config) => {
  // Try to get token from multiple sources for robustness
  let token = localStorage.getItem('resumify_token');
  
  if (!token) {
    const userStr = localStorage.getItem('resumify_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        token = user.token;
      } catch (e) {
        console.error('Failed to parse resumify_user for token', e);
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Global response interceptor to handle session expiry
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('resumify_user');
    localStorage.removeItem('resumify_token');
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
