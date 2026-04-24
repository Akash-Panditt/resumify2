require('dotenv').config();
const supabase = require('./supabase');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the email of the user you want to upgrade to premium: ', async (email) => {
  if (!email) {
    console.log('Email is required.');
    process.exit(1);
  }

  // Check if user exists
  const { data: existing, error: fetchError } = await supabase
    .from('users')
    .select('id, name, email, plan')
    .eq('email', email.trim())
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching user:', fetchError.message);
    process.exit(1);
  }

  if (!existing) {
    console.log('User not found with email:', email);
    process.exit(1);
  }

  console.log(`Found user: ${existing.name} (${existing.plan} plan)`);

  // Update plan to premium
  const { data, error } = await supabase
    .from('users')
    .update({ plan: 'premium', download_count: 0 })
    .eq('email', email.trim())
    .select('id, name, email, plan, download_count')
    .single();
  
  if (error) { 
    console.error('Error upgrading user:', error.message); 
    process.exit(1); 
  }
  
  console.log('\n✅ SUCCESS! Account upgraded to PREMIUM:');
  console.log(data);
  console.log('\nPlease log out and log back in on the frontend to refresh your session features!');
  
  process.exit(0);
});
