require('dotenv').config();
const supabase = require('./supabase');

async function testDelete(userId) {
    console.log(`Attempting to delete user: ${userId}`);
    
    // Step 1: Check Resumes
    const { data: resumes, error: rErr } = await supabase.from('resumes').delete().eq('user_id', userId).select();
    if (rErr) console.error('Error deleting resumes:', rErr.message);
    else console.log(`Deleted ${resumes?.length || 0} resumes`);

    // Step 2: Check Pro Requests
    const { data: pros, error: pErr } = await supabase.from('pro_requests').delete().eq('user_id', userId).select();
    if (pErr) console.error('Error deleting pro_requests:', pErr.message);
    else console.log(`Deleted ${pros?.length || 0} pro_requests`);

    // Step 3: Check Download Usage
    const { data: usage, error: uErr } = await supabase.from('download_usage').delete().eq('user_id', userId).select();
    if (uErr) console.error('Error deleting download_usage:', uErr.message);
    else console.log(`Deleted ${usage?.length || 0} download_usage`);

    // Step 4: Final User Delete
    const { data: user, error: userErr } = await supabase.from('users').delete().eq('id', userId).select();
    if (userErr) {
        console.error('FINAL ERROR deleting user:', userErr.message);
        if (userErr.details) console.error('Details:', userErr.details);
    } else {
        console.log('User deleted successfully:', user);
    }
}

testDelete('62eeb9fa-112e-4ccb-8376-4358b4661fe0');
