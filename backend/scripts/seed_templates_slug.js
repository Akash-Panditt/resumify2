const { Client } = require('pg');
require('dotenv').config();

const TEMPLATES = [
  { id: 'ats-6', name: 'ATS Gold Elite', category: 'ATS Friendly', isPremium: true },
  { id: 'ds-7', name: 'Structured Gray', category: 'Designer', isPremium: true },
  { id: 'mk-6', name: 'Accounting Blue', category: 'Marketing', isPremium: true },
  { id: 'mk-7', name: 'Sage Minimalist', category: 'Marketing', isPremium: true },
  { id: 'mk-8', name: 'Corporate Dynamic', category: 'Marketing', isPremium: true },
  { id: 'ds-6', name: 'Timeline Artistic', category: 'Designer', isPremium: true },
  { id: 'ats-1', name: 'Standard Professional', category: 'ATS Friendly', isPremium: false },
  { id: 'ats-2', name: 'Technical Grid', category: 'ATS Friendly', isPremium: false },
  { id: 'ats-3', name: 'Clean Minimalist', category: 'ATS Friendly', isPremium: false },
  { id: 'ats-4', name: 'Corporate Sidebar', category: 'ATS Friendly', isPremium: false },
  { id: 'ats-5', name: 'Executive Master', category: 'ATS Friendly', isPremium: true },
  { id: 'dr-1', name: 'Clinical Specialist', category: 'Doctor', isPremium: true },
  { id: 'dr-2', name: 'Medical Associate', category: 'Doctor', isPremium: true },
  { id: 'dr-3', name: 'Medical Researcher', category: 'Doctor', isPremium: true },
  { id: 'dr-4', name: 'ER Specialist', category: 'Doctor', isPremium: true },
  { id: 'dr-5', name: 'Private Practice', category: 'Doctor', isPremium: false },
  { id: 'ns-1', name: 'Head Nurse Pro', category: 'Nurse', isPremium: true },
  { id: 'ns-2', name: 'Clinical Nurse', category: 'Nurse', isPremium: true },
  { id: 'ns-3', name: 'Patient Care Pro', category: 'Nurse', isPremium: true },
  { id: 'ns-4', name: 'Certified Nurse', category: 'Nurse', isPremium: true },
  { id: 'ns-5', name: 'Home Health Pro', category: 'Nurse', isPremium: true },
  { id: 'lw-1', name: 'Senior Attorney', category: 'Lawyer', isPremium: true },
  { id: 'lw-2', name: 'Legal Counsel', category: 'Lawyer', isPremium: true },
  { id: 'lw-3', name: 'Barrister Classic', category: 'Lawyer', isPremium: true },
  { id: 'lw-4', name: 'Law Associate', category: 'Lawyer', isPremium: true },
  { id: 'lw-5', name: 'Judicial Clerk', category: 'Lawyer', isPremium: true },
  { id: 'tc-1', name: 'Senior Educator', category: 'Teacher', isPremium: true },
  { id: 'tc-2', name: 'Secondary Teacher', category: 'Teacher', isPremium: true },
  { id: 'tc-3', name: 'College Professor', category: 'Teacher', isPremium: true },
  { id: 'tc-4', name: 'EdTech Pro', category: 'Teacher', isPremium: true },
  { id: 'tc-5', name: 'Student Engagement', category: 'Teacher', isPremium: true },
  { id: 'mk-1', name: 'Growth Marketer', category: 'Marketing', isPremium: true },
  { id: 'mk-2', name: 'Brand Manager', category: 'Marketing', isPremium: true },
  { id: 'mk-3', name: 'Digital Strategist', category: 'Marketing', isPremium: true },
  { id: 'mk-4', name: 'SEO Specialist', category: 'Marketing', isPremium: true },
  { id: 'mk-5', name: 'Content Creator', category: 'Marketing', isPremium: true },
  { id: 'ds-1', name: 'UX Designer Pro', category: 'Designer', isPremium: true },
  { id: 'ds-2', name: 'Art Director', category: 'Designer', isPremium: true },
  { id: 'ds-3', name: 'Visual Creative', category: 'Designer', isPremium: true },
  { id: 'ds-4', name: 'Product Architect', category: 'Designer', isPremium: true },
  { id: 'ds-5', name: 'Digital Designer', category: 'Designer', isPremium: true },
  { id: 'rt-1', name: 'Retail Professional', category: 'Retail', isPremium: true },
  { id: 'rt-2', name: 'Store Manager', category: 'Retail', isPremium: true },
  { id: 'rt-3', name: 'Sales Associate', category: 'Retail', isPremium: false },
  { id: 'rt-4', name: 'Retail Systems', category: 'Retail', isPremium: true },
  { id: 'rt-5', name: 'Team Leader', category: 'Retail', isPremium: true },
  { id: 'fr-1', name: 'Junior Dev', category: 'Fresher', isPremium: false },
  { id: 'fr-2', name: 'Academic Star', category: 'Fresher', isPremium: true },
  { id: 'fr-3', name: 'Early Career', category: 'Fresher', isPremium: true },
  { id: 'fr-4', name: 'Tech Fresher', category: 'Fresher', isPremium: true },
  { id: 'fr-5', name: 'Campus Leader', category: 'Fresher', isPremium: true },
  { id: 'st-1', name: 'High School', category: 'Student', isPremium: false },
  { id: 'st-2', name: 'Honor Roll', category: 'Student', isPremium: true },
  { id: 'st-3', name: 'College Grad', category: 'Student', isPremium: true },
  { id: 'st-4', name: 'STEM Student', category: 'Student', isPremium: true },
  { id: 'st-5', name: 'Student Athlete', category: 'Student', isPremium: true },
];

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  console.log('Connecting to PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected. Updating templates table schema...');
    
    // Add slug column
    await client.query('ALTER TABLE templates ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE');

    console.log('Seeding templates...');
    for (const t of TEMPLATES) {
      await client.query(`
        INSERT INTO templates (slug, name, is_premium)
        VALUES ($1, $2, $3)
        ON CONFLICT (slug) DO UPDATE 
        SET is_premium = EXCLUDED.is_premium, name = EXCLUDED.name
      `, [t.id, t.name, t.isPremium]);
    }
    
    console.log('Successfully seeded templates.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await client.end();
  }
}

seed();
