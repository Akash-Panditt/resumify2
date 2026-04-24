require('dotenv').config({ path: './.env' });
const supabase = require('./supabase');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const email = 'testadmin@resumify.com';
  const password = 'Password@123';
  const name = 'Test Admin';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from('users')
    .upsert({ 
      email, 
      password: hashedPassword, 
      name, 
      role: 'admin', 
      is_verified: true,
      plan: 'premium'
    }, { onConflict: 'email' })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error);
  } else {
    console.log('Admin created successfully:', data.email);
  }
}

createAdmin();
