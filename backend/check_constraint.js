const { Client } = require('pg');
const c = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Supabase@2026@db.oepnqvkcckjcejrgkpin.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await c.connect();

  // Check the constraint definition
  const res = await c.query(`
    SELECT pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conname = 'users_plan_check'
  `);
  console.log('Constraint:', res.rows[0]?.definition || 'NOT FOUND');

  // Check what plan values exist in the DB
  const plans = await c.query("SELECT DISTINCT plan, requested_plan FROM public.users");
  console.log('Current plans:', plans.rows);

  await c.end();
}
run().catch(e => { console.error(e.message); process.exit(1); });
