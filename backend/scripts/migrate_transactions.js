const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('Adding item_name column to transactions table...');

  const { error } = await supabase.rpc('run_sql', {
    sql_query: `
      ALTER TABLE transactions 
      ADD COLUMN IF NOT EXISTS item_name TEXT;
    `
  });

  if (error) {
    // If RPC fails, try a direct query if the environment supports it, 
    // but usually in this setup we rely on the DB being accessible.
    // Since we saw SQL errors before, maybe we can use a different approach.
    console.error('Error adding column via RPC:', error.message);
    
    // Fallback: Check if we can just skip it if it's not critical, 
    // but here it IS critical for the current code.
  } else {
    console.log('Successfully added item_name column to transactions.');
  }
}

migrate();
