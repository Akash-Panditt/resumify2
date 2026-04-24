require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function enablePremium() {
    const { data: users, error: fetchErr } = await supabase.from('users').select('id');
    if (fetchErr) {
        console.error('Error fetching users:', fetchErr);
        return;
    }
    
    for (const user of users) {
        const { error: updateErr } = await supabase
            .from('users')
            .update({ plan: 'premium', role: 'admin' })
            .eq('id', user.id);
        if (updateErr) {
            console.error(`Error updating user ${user.id}:`, updateErr);
        } else {
            console.log(`Updated user ${user.id} to premium and admin.`);
        }
    }
    console.log('Finished updating users.');
}

enablePremium();
