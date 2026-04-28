require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updatePlans() {
  console.log('Updating pricing plans with "Try Before You Buy" logic...');

  const plans = [
    {
      id: '53114860-7b31-4dec-8b66-5cd748787f88',
      name: 'free',
      price: 0,
      features: [
        "Try All Premium Templates",
        "AI Resume Enhancer (Preview)",
        "ATS Keyword Analysis",
        "Pay ₹9 only to Download AI Resumes"
      ],
      download_limit: 5
    },
    {
      id: 'b4837a32-a6fc-4f79-956d-57de54d71087',
      name: 'basic',
      price: 199,
      features: [
        "Unlimited Premium Templates",
        "Full AI Power Tools",
        "Priority ATS Checker",
        "Zero Download Fees (Unlimited)"
      ],
      download_limit: 99999
    },
    {
      id: 'cdeccd7f-4165-4ff2-a2aa-41869477107c',
      name: 'pro',
      price: 1999,
      features: [
        "Everything in Basic",
        "Priority 24/7 Support",
        "Exclusive New Templates",
        "Best Value (Save 16%)"
      ],
      download_limit: 999999
    }
  ];

  for (const plan of plans) {
    const { error } = await supabase
      .from('pricing_plans')
      .upsert(plan);
    
    if (error) {
      console.error(`Failed to update plan ${plan.name}:`, error.message);
    } else {
      console.log(`Updated plan: ${plan.name}`);
    }
  }
}

updatePlans();
