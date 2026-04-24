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
  // Supabase PostgREST listens on this channel for schema reloads
  await c.query("NOTIFY pgrst, 'reload schema'");
  console.log('PostgREST schema reload notified');
  await c.end();
}

run().catch(e => { console.error(e.message); process.exit(1); });
