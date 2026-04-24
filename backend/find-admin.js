require('dotenv').config();
const supabase = require('./supabase');

async function listUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, role, plan')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log('No users found in the database.');
  } else {
    console.log(`=== All Users (${data.length}) ===`);
    data.forEach((u, i) => {
      console.log(`${i+1}. ${u.email} | name: ${u.name} | role: ${u.role || 'user'} | plan: ${u.plan}`);
    });
  }
}

listUsers();
