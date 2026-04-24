const { Client } = require('pg');

const c = new Client({
  connectionString: 'postgresql://postgres:Supabase@2026@db.oepnqvkcckjcejrgkpin.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await c.connect();
  const res = await c.query("SELECT id, email, requested_plan FROM public.users WHERE requested_plan IS NOT NULL");
  console.log('Users with requested_plan:', JSON.stringify(res.rows, null, 2));
  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
