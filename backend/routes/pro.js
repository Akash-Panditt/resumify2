const express = require('express');
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Middleware to ensure user is on Premium plan
const requirePremium = (req, res, next) => {
  // Plan check disabled to allow for all users
  /*
  if (req.user.plan !== 'premium' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'This feature is only available to Premium members. Upgrade to unlock!' });
  }
  */
  next();
};

// Get user's premium requests
router.get('/requests', protect, requirePremium, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pro_requests')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new premium request (Expert Review or Custom Domain)
router.post('/requests', protect, requirePremium, async (req, res) => {
  try {
    const { type, request_data } = req.body;
    
    if (!['expert_review', 'custom_domain'].includes(type)) {
      return res.status(400).json({ message: 'Invalid request type' });
    }

    const { data, error } = await supabase
      .from('pro_requests')
      .insert([{
        user_id: req.user.id,
        type,
        request_data,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
