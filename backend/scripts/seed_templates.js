const { Client } = require('pg');
require('dotenv').config();

const TEMPLATES = [
  { id: 'ats-6', name: 'ATS Gold Elite', category: 'ATS Friendly', description: 'Premium gold-accented layout optimized for high-end roles.', isPremium: true, popular: true },
  { id: 'ds-7', name: 'Structured Gray', category: 'Designer', description: 'Modern structured layout with dark header and sidebar.', isPremium: true, popular: true },
  { id: 'mk-6', name: 'Accounting Blue', category: 'Marketing', description: 'Professional dark-header layout with blue accents.', isPremium: true, popular: true },
  { id: 'mk-7', name: 'Sage Minimalist', category: 'Marketing', description: 'Soft green sidebar design for modern professionals.', isPremium: true },
  { id: 'mk-8', name: 'Corporate Dynamic', category: 'Marketing', description: 'Bold navy design with geometric header accents.', isPremium: true },
  { id: 'ds-6', name: 'Timeline Artistic', category: 'Designer', description: 'Minimalist B&W layout with unique timeline dates.', isPremium: true },
  { id: 'ats-1', name: 'Standard Professional', category: 'ATS Friendly', description: 'Classic executive layout optimized for AI parsers.', isPremium: false, popular: true },
  { id: 'ats-2', name: 'Technical Grid', category: 'ATS Friendly', description: 'Structured layout focusing on technical toolsets.', isPremium: false },
  { id: 'ats-3', name: 'Clean Minimalist', category: 'ATS Friendly', description: 'Elegant and airy design with maximum clarity.', isPremium: false },
  { id: 'ats-4', name: 'Corporate Sidebar', category: 'ATS Friendly', description: 'Organized hierarchy for easy scanning.', isPremium: false },
  { id: 'ats-5', name: 'Executive Master', category: 'ATS Friendly', description: 'Traditional serif design for senior leadership.', isPremium: true },
  { id: 'dr-1', name: 'Clinical Specialist', category: 'Doctor', description: 'Authoritative layout for senior medical professionals.', isPremium: true, popular: true },
  { id: 'dr-2', name: 'Medical Associate', category: 'Doctor', description: 'Clean practice-focused layout with detailed sections.', isPremium: true },
  { id: 'dr-3', name: 'Medical Researcher', category: 'Doctor', description: 'Minimalist academic-style template for clinical research.', isPremium: true },
  { id: 'dr-4', name: 'ER Specialist', category: 'Doctor', description: 'High-density focus on procedures and credentials.', isPremium: true },
  { id: 'dr-5', name: 'Private Practice', category: 'Doctor', description: 'Refined classic layout for independent doctors.', isPremium: false },
  { id: 'ns-1', name: 'Head Nurse Pro', category: 'Nurse', description: 'Skill-intensive layout for nursing leadership.', isPremium: true, popular: true },
  { id: 'ns-2', name: 'Clinical Nurse', category: 'Nurse', description: 'Hospital-ready design with certification focus.', isPremium: true },
  { id: 'ns-3', name: 'Patient Care Pro', category: 'Nurse', description: 'Warm approach with clean professional lines.', isPremium: true },
  { id: 'ns-4', name: 'Certified Nurse', category: 'Nurse', description: 'Technical layout for specialized departments.', isPremium: true },
  { id: 'ns-5', name: 'Home Health Pro', category: 'Nurse', description: 'Soft modern layout for healthcare services.', isPremium: true },
  { id: 'lw-1', name: 'Senior Attorney', category: 'Lawyer', description: 'Prestigious layout for legal experts.', isPremium: true, popular: true },
  { id: 'lw-2', name: 'Legal Counsel', category: 'Lawyer', description: 'Balanced two-column design for corporate law.', isPremium: true },
  { id: 'lw-3', name: 'Barrister Classic', category: 'Lawyer', description: 'Traditional serif layout for litigation.', isPremium: true },
  { id: 'lw-4', name: 'Law Associate', category: 'Lawyer', description: 'Research-focused technical design.', isPremium: true },
  { id: 'lw-5', name: 'Judicial Clerk', category: 'Lawyer', description: 'Sophisticated academic legal template.', isPremium: true },
  { id: 'tc-1', name: 'Senior Educator', category: 'Teacher', description: 'Modern layout for academic leadership.', isPremium: true },
  { id: 'tc-2', name: 'Secondary Teacher', category: 'Teacher', description: 'Friendly and informative classroom layout.', isPremium: true, popular: true },
  { id: 'tc-3', name: 'College Professor', category: 'Teacher', description: 'Academic-focused minimalist design.', isPremium: true },
  { id: 'tc-4', name: 'EdTech Pro', category: 'Teacher', description: 'Technical grid focusing on digital tools.', isPremium: true },
  { id: 'tc-5', name: 'Student Engagement', category: 'Teacher', description: 'Warm vibrant layout for mentoring roles.', isPremium: true },
  { id: 'mk-1', name: 'Growth Marketer', category: 'Marketing', description: 'KPI-driven layout for performance marketing.', isPremium: true },
  { id: 'mk-2', name: 'Brand Manager', category: 'Marketing', description: 'Vibrant creative layout focusing on impact.', isPremium: true, popular: true },
  { id: 'mk-3', name: 'Digital Strategist', category: 'Marketing', description: 'Modern minimalist design for tech marketing.', isPremium: true },
  { id: 'mk-4', name: 'SEO Specialist', category: 'Marketing', description: 'Detailed grid for analytical toolsets.', isPremium: true },
  { id: 'mk-5', name: 'Content Creator', category: 'Marketing', description: 'Dynamic split layout for creative pros.', isPremium: true },
  { id: 'ds-1', name: 'UX Designer Pro', category: 'Designer', description: 'Portfolio-style layout for UI/UX experts.', isPremium: true, popular: true },
  { id: 'ds-2', name: 'Art Director', category: 'Designer', description: 'Bold high-contrast creative design.', isPremium: true },
  { id: 'ds-3', name: 'Visual Creative', category: 'Designer', description: 'Ultra-clean whitespace for artistic focus.', isPremium: true },
  { id: 'ds-4', name: 'Product Architect', category: 'Designer', description: 'Structured technical design for product roles.', isPremium: true },
  { id: 'ds-5', name: 'Digital Designer', category: 'Designer', description: 'Soft modern palette for creative services.', isPremium: true },
  { id: 'rt-1', name: 'Retail Professional', category: 'Retail', description: 'Clean layout for retail managers and associates.', isPremium: true, popular: true },
  { id: 'rt-2', name: 'Store Manager', category: 'Retail', description: 'Executive layout focusing on store operations.', isPremium: true },
  { id: 'rt-3', name: 'Sales Associate', category: 'Retail', description: 'Minimalist design for sales and inventory care.', isPremium: false },
  { id: 'rt-4', name: 'Retail Systems', category: 'Retail', description: 'Technical layout for retail operations.', isPremium: true },
  { id: 'rt-5', name: 'Team Leader', category: 'Retail', description: 'Modern sidebar layout for team leadership.', isPremium: true },
  { id: 'fr-1', name: 'Junior Dev', category: 'Fresher', description: 'Modern layout for internships and volunteering.', isPremium: false },
  { id: 'fr-2', name: 'Academic Star', category: 'Fresher', description: 'Executive layout focusing on academic projects.', isPremium: true, popular: true },
  { id: 'fr-3', name: 'Early Career', category: 'Fresher', description: 'Minimalist layout for early career history.', isPremium: true },
  { id: 'fr-4', name: 'Tech Fresher', category: 'Fresher', description: 'Technical layout for showcasing toolbox.', isPremium: true },
  { id: 'fr-5', name: 'Campus Leader', category: 'Fresher', description: 'Modern sidebar layout for university contributions.', isPremium: true },
  { id: 'st-1', name: 'High School', category: 'Student', description: 'Modern layout for school involvement.', isPremium: false },
  { id: 'st-2', name: 'Honor Roll', category: 'Student', description: 'Executive layout focusing on academic excellence.', isPremium: true, popular: true },
  { id: 'st-3', name: 'College Grad', category: 'Student', description: 'Minimalist layout for coursework and GPA.', isPremium: true },
  { id: 'st-4', name: 'STEM Student', category: 'Student', description: 'Technical layout for academic tools.', isPremium: true },
  { id: 'st-5', name: 'Student Athlete', category: 'Student', description: 'Modern sidebar layout for leadership and sports.', isPremium: true },
];

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  console.log('Connecting to PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected. Seeding templates table...');
    
    // 1. Ensure table has 'id' column if it's missing (it was 'name' based on previous view)
    // Actually, let's just use 'name' as the unique key if possible, but the code uses 'id' as 'ats-6' etc.
    
    // Let's check table structure again
    const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'templates'");
    const columns = res.rows.map(r => r.column_name);
    
    if (!columns.includes('id')) {
      console.log('Adding id column to templates...');
      await client.query('ALTER TABLE templates ADD COLUMN id TEXT UNIQUE');
    }

    for (const t of TEMPLATES) {
      await client.query(`
        INSERT INTO templates (id, name, is_premium)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE 
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
