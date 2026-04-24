import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Builder from './pages/Builder/Builder';
import Preview from './pages/Preview/Preview';
import Settings from './pages/Settings/Settings';
import Templates from './pages/Templates/Templates';
import Pricing from './pages/Pricing/Pricing';
import AdminLayout from './pages/Admin/AdminLayout';
import UserManagement from './pages/Admin/UserManagement';
import TemplateManagement from './pages/Admin/TemplateManagement';

import PricingManagement from './pages/Admin/PricingManagement';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminResumes from './pages/Admin/AdminResumes';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminAnnouncements from './pages/Admin/AdminAnnouncements';
import PaymentsDashboard from './pages/Admin/PaymentsDashboard';
import UpgradeApprovals from './pages/Admin/UpgradeApprovals';
import ATSChecker from './pages/ATSChecker/ATSChecker';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy_client_id_for_dev_change_me';

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/builder/:id" element={<Builder />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="approvals" element={<UpgradeApprovals />} />
          <Route path="templates" element={<TemplateManagement />} />
          <Route path="resumes" element={<AdminResumes />} />
          <Route path="pricing" element={<PricingManagement />} />
          <Route path="payments" element={<PaymentsDashboard />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}


export default App;
