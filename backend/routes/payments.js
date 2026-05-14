const express = require('express');
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all pricing plans (Public)
router.get('/plans', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('price');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 1. Create a pending transaction
router.post('/checkout', protect, async (req, res) => {
  const { type, itemId, amount, billingCycle } = req.body;

  try {
    const { data: transaction, error: txErr } = await supabase
      .from('transactions')
      .insert([{
        user_id: req.user.id,
        amount,
        type: type === 'plan' ? `plan_purchase_${itemId}` : `resume_download_${itemId}`,
        status: 'pending', // Initially pending
        gateway: 'internal_simulated',
        item_name: req.body.itemName || itemId // Store the human-readable name
      }])
      .select()
      .single();

    if (txErr) throw txErr;

    res.json({
      success: true,
      transactionId: transaction.id,
      message: 'Payment session initiated. Please confirm to complete.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Verify and complete payment
router.post('/verify', protect, async (req, res) => {
  const { transactionId, itemId, type, billingCycle } = req.body;

  try {
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 1. Update transaction status
    const { data: transaction, error: txErr } = await supabase
      .from('transactions')
      .update({ status: 'completed' })
      .eq('id', transactionId)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (txErr || !transaction) throw new Error('Invalid transaction or payment failed');

    // 2. Process side effects
    if (type === 'plan') {
      // UPDATED: Instead of immediate upgrade, set requested_plan for manual admin approval
      const { error: uErr } = await supabase
        .from('users')
        .update({
          requested_plan: itemId,
          updated_at: new Date().toISOString()
        })
        .eq('id', req.user.id);
      
      if (uErr) throw uErr;

      // Log to payments_history
      await supabase.from('payments_history').insert([{
        user_id: req.user.id,
        transaction_id: transactionId,
        amount: transaction.amount,
        type: 'subscription',
        item_name: `${itemId.charAt(0).toUpperCase() + itemId.slice(1)} Plan`,
        status: 'success'
      }]);

    } else if (type === 'resume_download') {
      const { error: rErr } = await supabase
        .from('resumes')
        .update({ paid_for_download: true })
        .eq('id', itemId);
      if (rErr) throw rErr;

      // Get resume title for item_name
      const { data: resume } = await supabase.from('resumes').select('template').eq('id', itemId).single();

      // Log to payments_history
      await supabase.from('payments_history').insert([{
        user_id: req.user.id,
        transaction_id: transactionId,
        amount: transaction.amount,
        type: 'single_download',
        item_name: `${resume?.template || 'Premium'} Template Download`,
        status: 'success'
      }]);
    }

    res.json({
      success: true,
      message: type === 'plan' ? `Upgrade request for ${itemId} plan submitted! Admin will approve shortly.` : 'Resume download unlocked!'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check if user has paid for a specific template
router.get('/check-template/:templateId', protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('downloads')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('template_id', req.params.templateId)
      .maybeSingle();

    if (error) throw error;
    res.json({ purchased: !!data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
