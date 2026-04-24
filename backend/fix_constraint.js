const { Client } = require('pg');

const c = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Supabase@2026@db.oepnqvkcckjcejrgkpin.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await c.connect();

  console.log('Dropping old constraint...');
  await c.query('ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_plan_check');

  console.log('Adding updated constraint...');
  await c.query("ALTER TABLE public.users ADD CONSTRAINT users_plan_check CHECK (plan = ANY (ARRAY['free'::text, 'premium'::text, 'enterprise'::text, 'basic'::text, 'pro'::text]))");

  console.log('Reloading PostgREST schema cache...');
  await c.query("NOTIFY pgrst, 'reload schema'");

  await c.end();
  console.log('DONE: Constraint updated successfully');
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
