const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, requireAdmin, requireSuperAdmin, logAdminActivity } = require('../middleware/auth');

const router = express.Router();

// Stats & Analytics
router.get('/stats', protect, requireAdmin, adminController.getStats);
router.get('/analytics/growth', protect, requireAdmin, adminController.getGrowthAnalytics);

// Resumes
router.get('/resumes', protect, requireAdmin, adminController.getResumes);
router.delete('/resumes/:id', protect, requireSuperAdmin, logAdminActivity('DELETE_RESUME', 'resumes'), adminController.deleteResume);

// Users
router.get('/users', protect, requireAdmin, adminController.getUsers);
router.put('/users/:id', protect, requireAdmin, logAdminActivity('UPDATE_USER', 'users'), adminController.updateUser);
router.delete('/users/:id', protect, requireSuperAdmin, logAdminActivity('DELETE_USER', 'users'), adminController.deleteUser);
router.post('/approve-upgrade/:id', protect, requireAdmin, logAdminActivity('APPROVE_UPGRADE', 'users'), adminController.approveUpgrade);
router.post('/reject-upgrade/:id', protect, requireAdmin, logAdminActivity('REJECT_UPGRADE', 'users'), adminController.rejectUpgrade);
router.post('/revoke-subscription/:id', protect, requireSuperAdmin, logAdminActivity('REVOKE_SUB', 'users'), adminController.revokeSubscription);

// Templates
router.get('/templates', protect, requireAdmin, adminController.getTemplates);
router.post('/templates', protect, requireSuperAdmin, logAdminActivity('CREATE_TEMPLATE', 'templates'), adminController.createTemplate);
router.put('/templates/:id', protect, requireSuperAdmin, logAdminActivity('UPDATE_TEMPLATE', 'templates'), adminController.updateTemplate);

// Categories
router.get('/categories', protect, requireAdmin, adminController.getCategories);
router.post('/categories', protect, requireSuperAdmin, logAdminActivity('CREATE_CATEGORY', 'categories'), adminController.createCategory);

// Pricing
router.get('/pricing', protect, requireAdmin, adminController.getPricing);
router.put('/pricing/:id', protect, requireSuperAdmin, logAdminActivity('UPDATE_PRICING', 'pricing_plans'), adminController.updatePricing);

// Premium Requests
router.get('/premium-requests', protect, requireAdmin, adminController.getPremiumRequests);
router.put('/premium-requests/:id', protect, requireAdmin, logAdminActivity('UPDATE_PRO_REQUEST', 'pro_requests'), adminController.updatePremiumRequestStatus);

// Settings
router.get('/settings', protect, requireAdmin, adminController.getSettings);
router.put('/settings', protect, requireSuperAdmin, logAdminActivity('UPDATE_SETTINGS', 'platform_settings'), adminController.updateSettings);

// Announcements
router.get('/announcements', protect, requireAdmin, adminController.getAnnouncements);
router.post('/announcements', protect, requireSuperAdmin, logAdminActivity('CREATE_ANNOUNCEMENT', 'announcements'), adminController.createAnnouncement);
router.delete('/announcements/:id', protect, requireSuperAdmin, logAdminActivity('DELETE_ANNOUNCEMENT', 'announcements'), adminController.deleteAnnouncement);

// Payments (Mocked Dashboard)
router.get('/payments', protect, requireAdmin, adminController.getPaymentsHistory);

module.exports = router;

