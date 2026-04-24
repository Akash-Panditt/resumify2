const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const supabase = require('../supabase');

async function seed() {
  console.log('--- Resumify Admin Seeding Start ---');

  // 1. Seed Categories
  const categories = [
    { name: 'Professional' },
    { name: 'Creative' },
    { name: 'Medical' },
    { name: 'Legal' },
    { name: 'Technical' }
  ];

  console.log('Seeding Categories...');
  const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'name' }).select();
  
  if (catError) {
    if (catError.message.includes('Could not find the table')) {
      console.error('CRITICAL: "categories" table is missing. Seed aborted.');
      return;
    }
    console.error('Category Seed Error:', catError.message);
  } else {
    console.log(`Seeded ${catData.length} categories.`);
  }

  // 2. Seed some Templates mapping to the hardcoded TEMPLATE_MAP keys
  const templateKeys = ['modern', 'classic', 'minimalist', 'professional', 'creative'];
  const profCat = catData?.find(c => c.name === 'Professional')?.id;

  if (profCat) {
    const templates = templateKeys.map(k => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      category_id: profCat,
      is_premium: k === 'creative' || k === 'professional'
    }));

    console.log('Seeding Template Catalog...');
    const { data: tData, error: tError } = await supabase.from('templates').upsert(templates, { onConflict: 'name' }).select();
    
    if (tError) {
      console.error('Template Seed Error:', tError.message);
    } else {
      console.log(`Seeded ${tData.length} templates.`);
    }
  }

  // 3. Seed Pricing Plans
  const plans = [
    { name: 'Free', price: 0, credits: 1, is_active: true },
    { name: 'Pro', price: 9.99, credits: 100, is_active: true },
    { name: 'Premium', price: 19.99, credits: 1000, is_active: true }
  ];

  console.log('Seeding Pricing Plans...');
  const { error: pError } = await supabase.from('pricing_plans').upsert(plans, { onConflict: 'name' });
  if (pError) console.error('Pricing Seed Error:', pError.message);
  else console.log('Pricing plans seeded.');

  console.log('--- Seeding Finished ---');
}

seed();
