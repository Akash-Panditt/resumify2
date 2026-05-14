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
      CREATE TABLE IF NOT EXISTS public.download_activity (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
        template_name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      -- Add index for performance
      CREATE INDEX IF NOT EXISTS idx_download_activity_user_id ON public.download_activity(user_id);
    `;

    await client.query(createTableQuery);
    console.log('Table "download_activity" created or already exists.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
