const express = require('express');
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Simulated payment endpoint
router.post('/checkout', protect, async (req, res) => {
  const { type, itemId, amount } = req.body; // type: 'plan', 'template'

  try {
    // 1. Create a pending transaction
    const { data: transaction, error: txErr } = await supabase
      .from('transactions')
      .insert([{
        user_id: req.user.id,
        amount,
        type: type === 'plan' ? `plan_purchase_${itemId}` : `single_download_${itemId}`,
        status: 'completed',
        gateway: 'internal_simulated'
      }])
      .select()
      .single();

    if (txErr) throw txErr;

    // 2. Process side effects based on type
    if (type === 'plan') {
      // Update user plan
      const expiresAt = new Date();
      if (itemId === 'pro') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      const { error: uErr } = await supabase
        .from('users')
        .update({
          plan: itemId,
          subscription_expires_at: expiresAt.toISOString(),
          download_count: 0 // Reset downloads on upgrade?
        })
        .eq('id', req.user.id);
      
      if (uErr) throw uErr;
    } else if (type === 'template') {
      // itemId is templateId
      // Grant a one-time download license
      const { error: dlErr } = await supabase
        .from('downloads')
        .insert([{
          user_id: req.user.id,
          template_id: itemId,
          transaction_id: transaction.id
        }]);
      
      if (dlErr) throw dlErr;
    }

    res.json({
      success: true,
      transactionId: transaction.id,
      message: type === 'plan' ? `Successfully upgraded to ${itemId} plan!` : 'Payment successful! Template unlocked for download.'
    });
  } catch (error) {
    console.error('[Payments] Checkout error:', error);
    res.status(500).json({ message: error.message });
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
