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
    console.log('Connected. Adding item_name column to transactions table...');
    
    await client.query(`
      ALTER TABLE transactions 
      ADD COLUMN IF NOT EXISTS item_name TEXT;
    `);
    
    console.log('Successfully added item_name column to transactions.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await client.end();
  }
}

migrate();
