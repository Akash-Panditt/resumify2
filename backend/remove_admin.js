require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function removeAdmin() {
    const { data: users, error: fetchErr } = await supabase.from('users').select('id');
    if (fetchErr) {
        console.error('Error fetching users:', fetchErr);
        return;
    }
    
    for (const user of users) {
        const { error: updateErr } = await supabase
            .from('users')
            .update({ role: 'user' }) // Revert everyone back to user role
            .eq('id', user.id);
        if (updateErr) {
            console.error(`Error updating user ${user.id}:`, updateErr);
        } else {
            console.log(`Updated user ${user.id} to role: user.`);
        }
    }
    console.log('Finished updating users.');
}

removeAdmin();
