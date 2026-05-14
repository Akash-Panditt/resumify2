const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.payments_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        transaction_id TEXT,
        amount NUMERIC NOT NULL,
        currency TEXT DEFAULT 'INR',
        type TEXT NOT NULL, -- 'plan' or 'resume_download'
        item_name TEXT NOT NULL, -- e.g. 'Pro Plan' or 'Modern Template'
        status TEXT NOT NULL DEFAULT 'success',
        gateway TEXT DEFAULT 'internal_simulated',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      -- Add index for performance
      CREATE INDEX IF NOT EXISTS idx_payments_history_user_id ON public.payments_history(user_id);
    `;

    await client.query(createTableQuery);
    console.log('Table "payments_history" created or updated.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
