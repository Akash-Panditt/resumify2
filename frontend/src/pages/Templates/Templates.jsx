import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import GoldStar from '../../components/GoldStar';

const SvgIcon = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const CATEGORIES = [
  { id: 'All templates', icon: <SvgIcon><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></SvgIcon> },
  { id: 'ATS Friendly', icon: <SvgIcon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></SvgIcon> },
  { id: 'Doctor', icon: <SvgIcon><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></SvgIcon> },
  { id: 'Nurse', icon: <SvgIcon><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></SvgIcon> },
  { id: 'Lawyer', icon: <SvgIcon><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></SvgIcon> },
  { id: 'Teacher', icon: <SvgIcon><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></SvgIcon> },
  { id: 'Marketing', icon: <SvgIcon><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></SvgIcon> },
  { id: 'Designer', icon: <SvgIcon><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></SvgIcon> },
  { id: 'Retail', icon: <SvgIcon><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></SvgIcon> },
  { id: 'Fresher', icon: <SvgIcon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></SvgIcon> },
  { id: 'Student', icon: <SvgIcon><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></SvgIcon> }
];

const TEMPLATES = [
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

const ACCENT_COLORS = [
  { id: 'indigo', hex: '#6366f1', name: 'Indigo' },
  { id: 'emerald', hex: '#10b981', name: 'Emerald' },
  { id: 'rose', hex: '#f43f5e', name: 'Rose' },
  { id: 'amber', hex: '#f59e0b', name: 'Amber' },
  { id: 'purple', hex: '#a855f7', name: 'Purple' },
  { id: 'slate', hex: '#475569', name: 'Slate' },
];

const TemplateMiniPreview = ({ templateId }) => {
  const sampleData = {
    personalDetails: { fullName: 'Alex Johnson', jobTitle: 'Software Engineer', email: 'alex@example.com', summary: 'Passionate developer building modern web apps.' },
    experience: [{ jobTitle: 'Full Stack Dev', company: 'TechCorp', startDate: '2021', endDate: 'Present' }],
    education: [{ degree: 'B.S. CS', school: 'MIT', startDate: '2017', endDate: '2021' }],
    skills: [{ name: 'React', level: 'Expert' }, { name: 'Node.js', level: 'Advanced' }],
    languages: [{ name: 'English', level: 5 }]
  };

  const templates = {
    'dr-1': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.DoctorD1 }))),
    'dr-2': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.DoctorD2 }))),
    'dr-3': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.DoctorD3 }))),
    'dr-4': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.DoctorD4 }))),
    'dr-5': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.DoctorD5 }))),
    'ns-1': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.NurseN1 }))),
    'ns-2': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.NurseN2 }))),
    'ns-3': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.NurseN3 }))),
    'ns-4': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.NurseN4 }))),
    'ns-5': React.lazy(() => import('../../components/Templates/MedicalTemplates').then(m => ({ default: m.NurseN5 }))),
    'lw-1': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.LawyerL1 }))),
    'lw-2': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.LawyerL2 }))),
    'lw-3': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.LawyerL3 }))),
    'lw-4': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.LawyerL4 }))),
    'lw-5': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.LawyerL5 }))),
    'tc-1': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.TeacherT1 }))),
    'tc-2': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.TeacherT2 }))),
    'tc-3': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.TeacherT3 }))),
    'tc-4': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.TeacherT4 }))),
    'tc-5': React.lazy(() => import('../../components/Templates/LegalAndEduTemplates').then(m => ({ default: m.TeacherT5 }))),
    'mk-1': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.MarketingM1 }))),
    'mk-2': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.MarketingM2 }))),
    'mk-3': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.MarketingM3 }))),
    'mk-4': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.MarketingM4 }))),
    'mk-5': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.MarketingM5 }))),
    'ds-1': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.DesignerDS1 }))),
    'ds-2': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.DesignerDS2 }))),
    'ds-3': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.DesignerDS3 }))),
    'ds-4': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.DesignerDS4 }))),
    'ds-5': React.lazy(() => import('../../components/Templates/CreativeTemplates').then(m => ({ default: m.DesignerDS5 }))),
    'ats-1': React.lazy(() => import('../../components/Templates/ProfessionalTemplate')),
    'ats-2': React.lazy(() => import('../../components/Templates/TechTemplate')),
    'ats-3': React.lazy(() => import('../../components/Templates/MinimalistTemplate')),
    'ats-4': React.lazy(() => import('../../components/Templates/ModernTemplate')),
    'ats-5': React.lazy(() => import('../../components/Templates/FormalTemplate')),
    'rt-1': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.RetailR1 }))),
    'rt-2': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.RetailR2 }))),
    'rt-3': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.RetailR3 }))),
    'rt-4': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.RetailR4 }))),
    'rt-5': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.RetailR5 }))),
    'fr-1': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.FresherF1 }))),
    'fr-2': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.FresherF2 }))),
    'fr-3': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.FresherF3 }))),
    'fr-4': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.FresherF4 }))),
    'fr-5': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.FresherF5 }))),
    'st-1': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.StudentS1 }))),
    'st-2': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.StudentS2 }))),
    'st-3': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.StudentS3 }))),
    'st-4': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.StudentS4 }))),
    'st-5': React.lazy(() => import('../../components/Templates/ServiceAndEntryTemplates').then(m => ({ default: m.StudentS5 }))),
  };

  const TemplateComponent = templates[templateId];
  if (!TemplateComponent) return <div style={{ padding: '2rem', color: '#999' }}>Preview unavailable</div>;

  return (
    <React.Suspense fallback={<div style={{ padding: '2rem', color: '#ccc' }}>Loading...</div>}>
      <TemplateComponent data={sampleData} />
    </React.Suspense>
  );
};

const Templates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All templates");
  const [selectedAccent, setSelectedAccent] = useState(ACCENT_COLORS[0]);
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  const handleSelect = async (templateId) => {
    if (!user?.token) return navigate('/login');
    setLoading(true);
    try {
      localStorage.setItem('resumify_accent_color', selectedAccent.hex);
      const isPremium = TEMPLATES.find(t => t.id === templateId)?.isPremium || false;

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resumes`, {
        template: templateId,
        color: selectedAccent.hex,
        hasUsedPremiumTemplate: isPremium
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      navigate(`/builder/${res.data._id}`);
    } catch (err) {
      console.error('Failed to create resume', err);
      alert(err.response?.data?.message || 'Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-color)',
      '--primary': selectedAccent.hex,
    }}>
      <Navbar user={user} />

      <main className="templates-container">
        {/* Cinematic Header */}
        <div className="templates-header">
          <div className="header-badge">Design Your Future</div>
          <h1 className="text-gradient cinematic-title">Select Template</h1>
          <div className="header-line"></div>
        </div>

        {/* Premium Control Center */}
        <div className="control-center">
          {/* Theme Color Picker */}
          <div className="color-section">
            <span className="control-label">Visual Theme</span>
            <div className="color-palette">
              {ACCENT_COLORS.map((color) => {
                const isActive = selectedAccent.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedAccent(color)}
                    className={`color-bubble ${isActive ? 'active' : ''}`}
                    style={{ background: color.hex }}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="category-section">
            <div className="category-scroll-container">
              <div className="category-scroll">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`category-pill ${isActive ? 'active' : ''}`}
                    >
                      <span className="pill-icon">{cat.icon}</span>
                      <span className="pill-text">{cat.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="responsive-grid templates-grid">
          {TEMPLATES.filter(t => selectedCategory === 'All templates' || t.category === selectedCategory).map((t) => {
            const isPremium = t.isPremium;
            const isPopular = t.popular;

            return (
              <div key={t.id} className={`template-card-pro ${isPremium ? 'is-premium' : ''}`} onClick={() => !loading && handleSelect(t.id)}>
                <div className="card-media">
                  <div className="preview-scaler">
                    <TemplateMiniPreview templateId={t.id} />
                  </div>
                  <div className="card-overlay">
                    <button className="btn btn-primary select-btn">Use This Template</button>
                  </div>
                  {isPremium && (
                    <div className="premium-tag">
                      <GoldStar size={14} />
                      <span>Premium</span>
                    </div>
                  )}
                  {isPopular && <div className="popular-tag">Trending</div>}
                </div>

                <div className="card-content">
                  <div className="content-main">
                    <h3 className="template-name">{t.name}</h3>
                    <p className="template-desc">{t.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          .templates-container {
            padding: clamp(1.5rem, 5vw, 4rem) 1rem;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
          }
          
          .templates-header {
            text-align: center;
            margin-bottom: clamp(2rem, 8vw, 4rem);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .header-badge {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--primary);
            margin-bottom: 1rem;
            background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
            padding: 0.5rem 1.25rem;
            border-radius: 50px;
          }

          .cinematic-title {
            font-size: clamp(2.2rem, 8vw, 4.5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
          }

          .header-line {
            width: 60px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
            box-shadow: 0 0 15px var(--primary);
          }

          .control-center {
            background: var(--surface);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-2xl);
            padding: 1.5rem 2rem;
            margin-bottom: 3rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            box-shadow: 0 20px 50px -20px rgba(0,0,0,0.3);
            backdrop-filter: blur(20px);
          }

          @media (min-width: 1024px) {
            .control-center {
              flex-direction: row;
              align-items: center;
              padding: 1.5rem;
            }
            
            .color-section {
              flex-shrink: 0;
              padding-right: 2rem;
              border-right: 1px solid var(--surface-border);
            }

            .category-section {
              flex: 1;
              min-width: 0;
            }
          }

          .control-label {
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--text-muted);
            margin-bottom: 0.75rem;
            display: block;
          }

          .color-palette {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .color-bubble {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .color-bubble.active {
            border-color: white;
            box-shadow: 0 0 15px var(--primary);
            transform: scale(1.15);
          }

          /* Category Selection with Fade Effect */
          .category-scroll-container {
            position: relative;
            margin: 0 -2rem;
          }

          @media (max-width: 768px) {
            .category-scroll-container::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0.75rem;
              width: 50px;
              background: linear-gradient(to right, transparent, var(--bg-color));
              pointer-events: none;
              z-index: 2;
            }
          }

          .category-scroll {
            display: flex;
            gap: 0.75rem;
            overflow-x: auto;
            padding-bottom: 0.75rem;
            -webkit-overflow-scrolling: touch;
            padding: 0 2rem 0.75rem 2rem;
            scrollbar-width: none;
          }

          .category-scroll::-webkit-scrollbar {
            display: none;
          }

          @media (min-width: 1024px) {
            .category-scroll {
              margin: 0 -1.5rem 0 0;
              padding: 0 1.5rem 0.75rem 0;
            }
            .category-scroll-container { margin: 0; }
          }

          .category-pill {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.25rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-xl);
            color: var(--text-muted);
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.3s ease;
            flex-shrink: 0;
          }

          .category-pill.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
            box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb, 99, 102, 241), 0.4);
          }

          .templates-grid {
            gap: clamp(1.5rem, 5vw, 2.5rem);
          }

          /* Premium Template Card */
          .template-card-pro {
            position: relative;
            background: var(--surface);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-xl);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
          }

          .template-card-pro:hover {
            transform: translateY(-8px);
            border-color: var(--primary);
            box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
          }

          .card-media {
            position: relative;
            height: clamp(300px, 45vw, 380px);
            background: #f8fafc;
            overflow: hidden;
            display: flex;
            justify-content: center;
            border-bottom: 1px solid var(--surface-border);
            margin: 0.75rem;
            border-radius: var(--radius-lg);
          }

          [data-theme='dark'] .card-media { background: #1a1a1a; }

          .preview-scaler {
            transform: scale(0.42);
            transform-origin: top center;
            width: 816px;
            margin: 1.5rem auto 0;
            transition: transform 0.6s ease;
            flex-shrink: 0;
          }

          .template-card-pro:hover .preview-scaler {
            transform: scale(0.45);
          }

          .card-overlay {
            position: absolute;
            inset: 0;
            background: rgba(11, 15, 26, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.4s ease;
            z-index: 5;
          }

          .template-card-pro:hover .card-overlay {
            opacity: 1;
          }

          .select-btn {
            transform: translateY(20px);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-weight: 700;
            padding: 0.8rem 1.5rem;
          }

          .template-card-pro:hover .select-btn {
            transform: translateY(0);
          }

          .premium-tag {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(8px);
            padding: 0.4rem 0.8rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 6px;
            color: #fbbf24;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            border: 1px solid rgba(251, 191, 36, 0.3);
            z-index: 10;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          }

          .popular-tag {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: linear-gradient(135deg, var(--primary) 0%, #a855f7 100%);
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 10px;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            box-shadow: 0 5px 15px rgba(var(--primary-rgb, 99, 102, 241), 0.4);
            z-index: 10;
          }

          .card-content {
            padding: 1.25rem;
            background: var(--surface);
          }

          .template-name {
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: 0.4rem;
            color: var(--text-main);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .template-desc {
            font-size: 0.8rem;
            color: var(--text-muted);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Mobile Responsive Overrides */
          @media (max-width: 768px) {
            .templates-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }

            .card-media {
              height: 220px;
              margin: 0.5rem;
              border-radius: var(--radius-md);
            }

            .preview-scaler {
              transform: scale(0.24);
              margin-top: 0.5rem;
            }

            .template-card-pro:hover .preview-scaler {
              transform: scale(0.26);
            }

            .template-name { font-size: 0.95rem; }
            .template-desc { font-size: 0.75rem; }
            .card-content { padding: 1rem 0.75rem; }
            
            .control-center { 
              padding: 1.25rem 1rem; 
              gap: 1rem; 
              margin-bottom: 2rem;
            }
            
            .category-scroll { padding: 0 1rem 0.5rem 1rem; }
            .category-scroll-container { margin: 0 -1rem; }

            .popular-tag, .premium-tag {
              padding: 0.3rem 0.6rem;
              font-size: 0.6rem;
              border-radius: 8px;
              top: 0.75rem;
            }
            .popular-tag { left: 0.75rem; }
            .premium-tag { right: 0.75rem; }
          }

          @media (max-width: 480px) {
            .cinematic-title { font-size: 2.25rem; }
            .card-media { height: 160px; }
            .preview-scaler { 
              transform: scale(0.12); 
              transform-origin: top center;
              margin-top: 0;
            }
            .template-card-pro:hover .preview-scaler { transform: scale(0.13); }
          }
        `}</style>
      </main>
    </div>
  );
};

export default Templates;
