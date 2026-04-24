const supabase = require('../supabase');

const checkDownloadLimit = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

    // 1. Get user plan and limit
    const { data: user, error: uErr } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();
    
    if (uErr) throw uErr;

    const { data: planData, error: pErr } = await supabase
      .from('pricing_plans')
      .select('download_limit')
      .eq('name', user.plan)
      .single();
    
    if (pErr) throw pErr;

    const limit = planData.download_limit;

    // 2. Get current usage
    let { data: usage, error: usErr } = await supabase
      .from('download_usage')
      .select('count')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .maybeSingle();

    if (usErr) throw usErr;

    if (!usage) {
      // Initialize usage for the month
      const { data: newUsage, error: iErr } = await supabase
        .from('download_usage')
        .insert([{ user_id: userId, month: currentMonth, count: 0 }])
        .select()
        .single();
      if (iErr) throw iErr;
      usage = newUsage;
    }

    // 3. Check limit
    if (usage.count >= limit) {
      return res.status(403).json({ 
        message: `Download limit reached for your ${user.plan} plan (${limit} downloads/month).`,
        currentUsage: usage.count,
        limit: limit
      });
    }

    req.currentUsage = usage.count;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const incrementUsage = async (userId) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { error } = await supabase.rpc('increment_download_count', { 
    u_id: userId, 
    u_month: currentMonth 
  });
  
  // If RPC is not supported, fallback to manual update
  if (error) {
    const { data: usage } = await supabase
      .from('download_usage')
      .select('count')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single();
    
    await supabase
      .from('download_usage')
      .update({ count: (usage?.count || 0) + 1, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('month', currentMonth);
  }
};

module.exports = { checkDownloadLimit, incrementUsage };
