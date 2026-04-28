require('dotenv').config();
const supabase = require('./supabase');

async function checkPlans() {
  const { data, error } = await supabase.from('pricing_plans').select('*');
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
}

checkPlans();
