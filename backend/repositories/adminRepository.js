const supabase = require('../supabase');

class AdminRepository {
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, plan, role, requested_plan, download_count, created_at, updated_at, is_blocked')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  // Resumes
  async getResumes() {
    // Left join users and templates
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        id, 
        title, 
        created_at, 
        updated_at,
        is_active,
        user:users(id, name, email),
        template:templates(id, name)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async deleteResume(resumeId) {
    const { error } = await supabase.from('resumes').delete().eq('id', resumeId);
    if (error) throw error;
    return true;
  }

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteUser(userId) {
    console.log(`[AdminRepo] Attempting cascading delete for user: ${userId}`);
    
    // 1. Delete associated data first to satisfy foreign key constraints
    const tables = ['resumes', 'pro_requests', 'download_usage'];
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).delete().eq('user_id', userId);
        if (error && !error.message.includes('Could not find the table')) {
          console.warn(`[AdminRepo] Note: Error while cleaning up ${table}: ${error.message}`);
        }
      } catch (err) {
        console.warn(`[AdminRepo] Note: Could not reach table ${table}`);
      }
    }

    // 2. Delete the user record
    const { error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
      console.error(`[AdminRepo] FATAL: Final User Deletion Failed:`, error.message);
      if (error.details) console.error(`[AdminRepo] DB Error Details:`, error.details);
      throw error; // Rethrow to let the controller handle it
    }
    return true;
  }

  async getStats() {
    try {
      const { data: users, error: uErr } = await supabase.from('users').select('id, plan, role, requested_plan');
      if (uErr) {
        console.error('[AdminRepo] Users fetch failed:', uErr.message);
        throw new Error('Failed to fetch user statistics.');
      }

      let resumeCount = 0;
      try {
        const { count, error: rErr } = await supabase.from('resumes').select('id', { count: 'exact', head: true });
        if (!rErr) resumeCount = count || 0;
      } catch (e) {
        console.warn('[AdminRepo] Resumes table might be missing or inaccessible.');
      }

      const pendingUpgradesCount = users.filter(u => u.requested_plan !== null && u.role !== 'admin').length;

      let pendingProRequestsCount = 0;
      try {
        const { count, error: pErr } = await supabase
          .from('pro_requests')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending');
        if (!pErr) pendingProRequestsCount = count || 0;
      } catch (e) {
        console.warn('[AdminRepo] pro_requests table might be missing.');
      }

      return { 
        users, 
        resumeCount, 
        pendingUpgradesCount,
        totalPendingNotifications: pendingUpgradesCount + pendingProRequestsCount
      };
    } catch (err) {
      console.error('[AdminRepo] getStats Error:', err.message);
      throw err;
    }
  }

  // Templates
  async getTemplates() {
    const { data, error } = await supabase.from('templates').select('*, categories(name)').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async createTemplate(templateData) {
    const { data, error } = await supabase.from('templates').insert([templateData]).select().single();
    if (error) throw error;
    return data;
  }

  async updateTemplate(id, updates) {
    const { data, error } = await supabase.from('templates').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteTemplate(id) {
    const { error } = await supabase.from('templates').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Categories
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    return data;
  }

  async createCategory(categoryData) {
    const { data, error } = await supabase.from('categories').insert([categoryData]).select().single();
    if (error) throw error;
    return data;
  }

  // Pricing
  async getPricingPlans() {
    const { data, error } = await supabase.from('pricing_plans').select('*').order('price');
    if (error) throw error;
    return data;
  }

  async updatePricingPlan(id, updates) {
    const { data, error } = await supabase.from('pricing_plans').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
}

module.exports = new AdminRepository();
