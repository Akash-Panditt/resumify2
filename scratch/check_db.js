const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkSchema() {
    console.log('Checking transactions table schema...');
    // We try to insert a dummy record with a non-existent column to see the error or the schema hint
    const { data, error } = await supabase.from('transactions').insert([{ dummy_col: 'test' }]);
    if (error) {
        console.log('Error hint:', error.message);
        if (error.details) console.log('Details:', error.details);
    }
}

checkSchema();
