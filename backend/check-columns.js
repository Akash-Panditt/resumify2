require('dotenv').config();
const supabase = require('./supabase');

async function checkColumns() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .limit(1);
        
        if (error) throw error;
        if (data && data.length > 0) {
            console.log('Columns found:', Object.keys(data[0]));
        } else {
            console.log('No users found to check columns.');
        }
    } catch (err) {
        console.error('Column Check Failed:', err.message);
    }
}

checkColumns();
