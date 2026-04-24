const { Client } = require('pg');

const c = new Client({
  connectionString: 'postgresql://postgres:Supabase@2026@db.oepnqvkcckjcejrgkpin.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await c.connect();
  const res = await c.query("UPDATE public.users SET requested_plan = NULL WHERE id = 'f8246ff8-7142-48fc-beaa-8d1a450c1657'");
  console.log('Update result:', res.rowCount, 'row(s) affected');
  await c.end();
}

run().catch(e => { console.error(e); process.exit(1); });
