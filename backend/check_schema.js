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

  // Check which schemas have a 'users' table
  const schemas = await c.query(
    "SELECT table_schema, table_name FROM information_schema.tables WHERE table_name='users' ORDER BY table_schema"
  );
  console.log('Users tables found:');
  schemas.rows.forEach(r => console.log(' -', r.table_schema + '.users'));

  // Check columns in public.users specifically
  const pubCols = await c.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='users' ORDER BY ordinal_position"
  );
  console.log('\npublic.users columns:', pubCols.rows.map(r => r.column_name).join(', ') || 'NONE - table does not exist in public schema!');

  await c.end();
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
