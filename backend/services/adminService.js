const adminRepository = require('../repositories/adminRepository');
const { Client: PgClient } = require('pg');

const getPg = () => new PgClient({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


class AdminService {
  async getDashboardStats() {
    const statsData = await adminRepository.getStats();
    const users = statsData.users || [];

    const planDistribution = { free: 0, premium: 0 };
    users.forEach(u => {
      const uPlan = u.plan?.toLowerCase() || 'free';
      const plan = uPlan === 'pro' || uPlan === 'basic' || uPlan === 'premium' ? 'premium' : 'free';
      planDistribution[plan]++;
    });

    return {
      totalUsers: users.length,
      totalResumes: statsData.resumeCount || 0,
      totalAdmins: users.filter(u => u.role === 'admin').length,
      pendingUpgradesCount: statsData.pendingUpgradesCount || 0,
      planDistribution
    };
  }

  async getAllUsers() {
    return await adminRepository.getUsers();
  }

  // Resumes
  async getAllResumes() {
    return await adminRepository.getResumes();
  }

  async deleteResume(resumeId) {
    return await adminRepository.deleteResume(resumeId);
  }

  async updateUserProfile(userId, updates) {
    // Business rule: Prevent changing own system role if needed? (handled in controller usually)
    return await adminRepository.updateUser(userId, updates);
  }

  async approveUpgradeRequest(userId) {
    const pg = getPg();
    await pg.connect();
    try {
      // 1. Fetch the pending request via direct pg
      const fetchRes = await pg.query(
        'SELECT requested_plan FROM public.users WHERE id = $1',
        [userId]
      );
      const userData = fetchRes.rows[0];

      if (!userData) throw new Error('User not found.');
      if (!userData.requested_plan) throw new Error('No pending upgrade request found for this user.');

      // 2. Calculate expiry
      const expiresAt = new Date();
      if (userData.requested_plan === 'pro') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year
      } else {
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
      }

      // 3. Perform upgrade via direct pg (bypasses PostgREST cache)
      const updateRes = await pg.query(
        `UPDATE public.users 
         SET plan = $1, requested_plan = NULL, expires_at = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING id, name, email, plan, expires_at`,
        [userData.requested_plan, expiresAt.toISOString(), userId]
      );

      console.log(`[AdminService] Approved upgrade for user ${userId} to ${userData.requested_plan}`);
      return updateRes.rows[0];
    } finally {
      await pg.end();
    }
  }

  async rejectUpgradeRequest(userId) {
    const pg = getPg();
    await pg.connect();
    try {
      const fetchRes = await pg.query('SELECT requested_plan FROM public.users WHERE id = $1', [userId]);
      const userData = fetchRes.rows[0];
      if (!userData) throw new Error('User not found.');
      if (!userData.requested_plan) throw new Error('No pending upgrade request found for this user.');

      const updateRes = await pg.query(
        'UPDATE public.users SET requested_plan = NULL, updated_at = NOW() WHERE id = $1 RETURNING id, name, email, plan',
        [userId]
      );
      return updateRes.rows[0];
    } finally {
      await pg.end();
    }
  }

  async revokeSubscription(userId) {
    const pg = getPg();
    await pg.connect();
    try {
      const updateRes = await pg.query(
        'UPDATE public.users SET plan = $1, requested_plan = NULL, expires_at = NULL, updated_at = NOW() WHERE id = $2 RETURNING id, name, email, plan',
        ['free', userId]
      );
      return updateRes.rows[0];
    } finally {
      await pg.end();
    }
  }

  // Templates
  async manageTemplates(action, data, id = null) {
    switch (action) {
      case 'list': return await adminRepository.getTemplates();
      case 'create': return await adminRepository.createTemplate(data);
      case 'update': return await adminRepository.updateTemplate(id, data);
      case 'delete': return await adminRepository.deleteTemplate(id);
      default: throw new Error('Invalid template action');
    }
  }

  // Categories
  async manageCategories(action, data) {
    if (action === 'list') return await adminRepository.getCategories();
    if (action === 'create') return await adminRepository.createCategory(data);
    throw new Error('Invalid category action');
  }

  // Pricing
  async managePricing(action, id, updates) {
    if (action === 'list') return await adminRepository.getPricingPlans();
    if (action === 'update') return await adminRepository.updatePricingPlan(id, updates);
    throw new Error('Invalid pricing action');
  }

  // Pro Requests
  async manageProRequests(action, id = null, updates = {}) {
    const supabase = require('../supabase');
    if (action === 'list') {
      const { data, error } = await supabase
        .from('pro_requests')
        .select('*, user:users(id, name, email)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    if (action === 'update') {
      const { data, error } = await supabase
        .from('pro_requests')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) {
        console.error(`[AdminService] Error updating pro request ${id}:`, error);
        throw error;
      }
      return data;
    }
    throw new Error('Invalid premium request action');
  }

  // Analytics
  async getGrowthAnalytics() {
    const pg = getPg();
    await pg.connect();
    try {
      // Mocking past 30 days data for demonstration if there's not enough active data,
      // but let's query the actual users table to get counts grouped by day.
      const res = await pg.query(`
        SELECT DATE(created_at) as date, COUNT(id) as count
        FROM public.users
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) ASC
      `);

      // If DB is mostly empty, provide some mocked baseline for UI
      if (res.rows.length < 2) {
        return Array.from({ length: 30 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (29 - i));
          return {
            name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            users: Math.floor(Math.random() * 10) + (i * 2), // Growing trend mock
            resumes: Math.floor(Math.random() * 5) + i
          };
        });
      }

      return res.rows.map(r => ({
        name: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: parseInt(r.count, 10),
        resumes: Math.floor(parseInt(r.count, 10) * 1.5) // mock resume trend proportional to users for now
      }));
    } finally {
      await pg.end();
    }
  }

  // Settings
  async getPlatformSettings() {
    const pg = getPg();
    await pg.connect();
    try {
      const res = await pg.query('SELECT key, value FROM platform_settings');
      const settings = {};
      res.rows.forEach(r => { settings[r.key] = r.value; });
      return settings;
    } finally {
      await pg.end();
    }
  }

  async updatePlatformSettings(data) {
    const pg = getPg();
    await pg.connect();
    try {
      await pg.query('BEGIN');
      for (const [key, value] of Object.entries(data)) {
        await pg.query(
          'INSERT INTO platform_settings (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()',
          [key, JSON.stringify(value)]
        );
      }
      await pg.query('COMMIT');
      return { success: true, updatedKeys: Object.keys(data) };
    } catch (e) {
      await pg.query('ROLLBACK');
      throw e;
    } finally {
      await pg.end();
    }
  }

  // Announcements
  async manageAnnouncements(action, payload = null, id = null) {
    const supabase = require('../supabase');
    if (action === 'list') {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    if (action === 'create') {
      const { data, error } = await supabase
        .from('announcements')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    if (action === 'delete') {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    }
    throw new Error('Invalid action for announcements');
  }

  // Payments (Mocked initially)
  async getPaymentsHistory() {
    // 1. We check if there are actual entries in the new `payments_history` table
    const supabase = require('../supabase');
    const { data: realPayments, error } = await supabase
      .from('payments_history')
      .select('*, user:users(name, email)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[AdminService] Payments fetch failed or DB not mapped correctly:', error.message);
      // Fallback below
    }

    if (realPayments && realPayments.length > 0) {
      return { source: 'database', records: realPayments };
    }

    // 2. Generate robust mocked data to support the dashboard UI (Requested by User)
    const mockedRecords = Array.from({ length: 15 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (i * 2 + Math.floor(Math.random() * 3))); // spread over last 30+ days
      return {
        id: `pay_mock_${Math.random().toString(36).substr(2, 9)}`,
        user_id: `user_${i}`,
        user: { name: `Demo User ${i + 1}`, email: `demo${i + 1}@example.com` },
        amount: Math.random() > 0.6 ? 499 : 1499,
        currency: 'INR',
        status: Math.random() > 0.1 ? 'success' : 'failed',
        gateway: Math.random() > 0.5 ? 'stripe' : 'razorpay',
        created_at: d.toISOString()
      };
    });

    return { source: 'mocked', records: mockedRecords };
  }
}

module.exports = new AdminService();
