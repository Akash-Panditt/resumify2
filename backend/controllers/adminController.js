const adminService = require('../services/adminService');

class AdminController {
  async getStats(req, res) {
    try {
      const stats = await adminService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await adminService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Resumes
  async getResumes(req, res) {
    try {
      const resumes = await adminService.getAllResumes();
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteResume(req, res) {
    try {
      await adminService.deleteResume(req.params.id);
      res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await adminService.updateUserProfile(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      if (req.params.id === req.user.id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
      }
      
      const repo = require('../repositories/adminRepository');
      await repo.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(`[AdminController] Delete User Failed for ${req.params.id}:`, error.message);
      res.status(500).json({ 
        message: 'Failed to delete user due to a database constraint.',
        details: error.message,
        db_details: error.details 
      });
    }
  }

  async approveUpgrade(req, res) {
    try {
      console.log(`[Admin] Approving upgrade for user: ${req.params.id}`);
      const result = await adminService.approveUpgradeRequest(req.params.id);
      res.json({ message: `Successfully upgraded user to ${result.plan}`, user: result });
    } catch (error) {
      console.error(`[Admin] Approve Upgrade Failed:`, error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async rejectUpgrade(req, res) {
    try {
      console.log(`[Admin] Rejecting upgrade for user: ${req.params.id}`);
      const result = await adminService.rejectUpgradeRequest(req.params.id);
      res.json({ message: 'Upgrade request rejected.', user: result });
    } catch (error) {
      console.error(`[Admin] Reject Upgrade Failed:`, error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async revokeSubscription(req, res) {
    try {
      console.log(`[Admin] Revoking subscription for user: ${req.params.id}`);
      const result = await adminService.revokeSubscription(req.params.id);
      res.json({ message: 'Subscription revoked. User is now on Free plan.', user: result });
    } catch (error) {
      console.error(`[Admin] Revoke Subscription Failed:`, error.message);
      res.status(500).json({ message: error.message });
    }
  }

  // Templates
  async getTemplates(req, res) {
    try {
      const templates = await adminService.manageTemplates('list');
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTemplate(req, res) {
    try {
      const template = await adminService.manageTemplates('create', req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Categories
  async getCategories(req, res) {
    try {
      const categories = await adminService.manageCategories('list');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await adminService.manageCategories('create', req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Pricing
  async getPricing(req, res) {
    try {
      const pricing = await adminService.managePricing('list');
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePricing(req, res) {
    try {
      const pricing = await adminService.managePricing('update', req.params.id, req.body);
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Premium Requests
  async getPremiumRequests(req, res) {
    try {
      const requests = await adminService.manageProRequests('list');
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePremiumRequestStatus(req, res) {
    try {
      const request = await adminService.manageProRequests('update', req.params.id, req.body);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getGrowthAnalytics(req, res) {
    try {
      const data = await adminService.getGrowthAnalytics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Templates extension
  async updateTemplate(req, res) {
    try {
      const template = await adminService.manageTemplates('update', req.body, req.params.id);
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Settings
  async getSettings(req, res) {
    try {
      const settings = await adminService.getPlatformSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateSettings(req, res) {
    try {
      const settings = await adminService.updatePlatformSettings(req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Announcements
  async getAnnouncements(req, res) {
    try {
      const announcements = await adminService.manageAnnouncements('list');
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createAnnouncement(req, res) {
    try {
      const announcement = await adminService.manageAnnouncements('create', req.body);
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAnnouncement(req, res) {
    try {
      await adminService.manageAnnouncements('delete', null, req.params.id);
      res.json({ message: 'Announcement deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Payments
  async getPaymentsHistory(req, res) {
    try {
      const payments = await adminService.getPaymentsHistory();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();
