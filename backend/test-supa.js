require('dotenv').config();
const supabase = require('./supabase');

async function check() {
  const { data, error } = await supabase.from('resumes').select('*').limit(1);
  console.log('Error:', error);
  console.log('Data:', data[0]);

  // Try updating last_downloaded_at
  if (data && data[0]) {
    const { data: updateData, error: updateError } = await supabase.from('resumes').update({ last_downloaded_at: new Date().toISOString() }).eq('id', data[0].id).select();
    console.log('Update Error:', updateError);
    console.log('Update Data:', updateData);
  }
}

check();
