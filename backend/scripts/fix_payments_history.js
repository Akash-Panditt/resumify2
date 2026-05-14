const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function migrate() {
  console.log('Connecting to PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected. Updating payments_history table...');
    
    await client.query(`
      ALTER TABLE payments_history 
      ADD COLUMN IF NOT EXISTS transaction_id UUID,
      ADD COLUMN IF NOT EXISTS type TEXT,
      ADD COLUMN IF NOT EXISTS item_name TEXT;
    `);
    
    console.log('Successfully updated payments_history table.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await client.end();
  }
}

migrate();
