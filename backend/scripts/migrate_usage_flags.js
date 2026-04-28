require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrate() {
  console.log('Starting migration: Adding usage flags to resumes table...');

  // Note: supabase-js doesn't support ALTER TABLE directly. 
  // We usually do this via SQL editor in Supabase UI, but I'll try to use the 'rpc' method if a generic 'exec_sql' exists, 
  // or I'll just assume I need to guide the user if it fails.
  // Actually, I'll try to insert a dummy record with these columns to see if they exist or if I can create them.
  // Wait, I can't create columns via insert.
  
  console.log('Please run the following SQL in your Supabase SQL Editor:');
  console.log(`
    ALTER TABLE resumes 
    ADD COLUMN IF NOT EXISTS has_used_ai BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS has_used_premium_template BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS paid_for_download BOOLEAN DEFAULT FALSE;
  `);

  // I will attempt to check if they exist by trying to select them
  const { data, error } = await supabase.from('resumes').select('has_used_ai').limit(1);
  if (error && error.message.includes('column "has_used_ai" does not exist')) {
    console.error('Columns missing. Please run the SQL above in Supabase dashboard.');
  } else {
    console.log('Columns verified/already exist.');
  }
}

migrate();
