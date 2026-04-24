const { Client } = require('pg');

const c = new Client({
  host: 'db.oepnqvkcckjcejrgkpin.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Supabase@2026',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await c.connect();

  // Check existing columns
  const cols = await c.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position"
  );
  console.log('All columns:', cols.rows.map(r => r.column_name).join(', '));

  // Add missing columns if they don't exist
  await c.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ DEFAULT NULL');
  console.log('expires_at: OK');

  await c.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS requested_plan TEXT DEFAULT NULL');
  console.log('requested_plan: OK');

  await c.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE');
  console.log('is_verified: OK');

  // Reload PostgREST schema cache
  await c.query("SELECT pg_notify('pgrst', 'reload schema')");
  console.log('Schema cache reload triggered');

  await c.end();
  console.log('DONE');
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
