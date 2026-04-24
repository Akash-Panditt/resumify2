import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const SvgIcon = ({ children }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    {children}
  </svg>
);

const CATEGORIES = [
  { id: 'All templates', icon: <SvgIcon><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></SvgIcon> },
  { id: 'ATS Friendly', icon: <SvgIcon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></SvgIcon> },
  { id: 'Doctor', icon: <SvgIcon><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></SvgIcon> },
  { id: 'Nurse', icon: <SvgIcon><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></SvgIcon> },
  { id: 'Lawyer', icon: <SvgIcon><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></SvgIcon> },
  { id: 'Teacher', icon: <SvgIcon><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></SvgIcon> },
  { id: 'Marketing', icon: <SvgIcon><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SvgIcon> },
  { id: 'Designer', icon: <SvgIcon><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></SvgIcon> },
  { id: 'Retail', icon: <SvgIcon><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></SvgIcon> },
  { id: 'Fresher', icon: <SvgIcon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></SvgIcon> },
  { id: 'Student', icon: <SvgIcon><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></SvgIcon> }
];

import GoldStar from '../../components/GoldStar';

const TEMPLATES = [
  // ATS FRIENDLY (Curated for readability)
  { id: 'ats-1', name: 'Standard Professional', category: 'ATS Friendly', description: 'Classic executive layout optimized for AI parsers.', isPremium: false, popular: true },
  { id: 'ats-2', name: 'Technical Grid', category: 'ATS Friendly', description: 'Structured layout focusing on technical toolsets.', isPremium: false },
  { id: 'ats-3', name: 'Clean Minimalist', category: 'ATS Friendly', description: 'Elegant and airy design with maximum clarity.', isPremium: false },
  { id: 'ats-4', name: 'Corporate Sidebar', category: 'ATS Friendly', description: 'Organized hierarchy for easy scanning.', isPremium: false },
  { id: 'ats-5', name: 'Executive Master', category: 'ATS Friendly', description: 'Traditional serif design for senior leadership.', isPremium: true },

  // PROFESSION SPECIFIC
  { id: 'dr-1', name: 'Clinical Specialist', category: 'Doctor', description: 'Authoritative layout for senior medical professionals.', isPremium: true, popular: true },
  { id: 'dr-2', name: 'Medical Associate', category: 'Doctor', description: 'Clean practice-focused layout with detailed sections.', isPremium: true },
  { id: 'dr-3', name: 'Medical Researcher', category: 'Doctor', description: 'Minimalist academic-style template for clinical research.', isPremium: true },
  { id: 'dr-4', name: 'ER Specialist', category: 'Doctor', description: 'High-density focus on procedures and credentials.', isPremium: true },
  { id: 'dr-5', name: 'Private Practice', category: 'Doctor', description: 'Refined classic layout for independent doctors.', isPremium: false },

  { id: 'ns-1', name: 'Head Nurse Pro', category: 'Nurse', description: 'Skill-intensive layout for nursing leadership.', isPremium: false },
  { id: 'ns-2', name: 'Clinical Nurse', category: 'Nurse', description: 'Hospital-ready design with certification focus.', isPremium: false },
  { id: 'ns-3', name: 'Patient Care Pro', category: 'Nurse', description: 'Warm approach with clean professional lines.', isPremium: false },
  { id: 'ns-4', name: 'Certified Nurse', category: 'Nurse', description: 'Technical layout for specialized departments.', isPremium: false },
  { id: 'ns-5', name: 'Home Health Pro', category: 'Nurse', description: 'Soft modern layout for healthcare services.', isPremium: false },

  { id: 'lw-1', name: 'Senior Attorney', category: 'Lawyer', description: 'Prestigious layout for legal experts.', isPremium: true, popular: true },
  { id: 'lw-2', name: 'Legal Counsel', category: 'Lawyer', description: 'Balanced two-column design for corporate law.', isPremium: true },
  { id: 'lw-3', name: 'Barrister Classic', category: 'Lawyer', description: 'Traditional serif layout for litigation.', isPremium: true },
  { id: 'lw-4', name: 'Law Associate', category: 'Lawyer', description: 'Research-focused technical design.', isPremium: true },
  { id: 'lw-5', name: 'Judicial Clerk', category: 'Lawyer', description: 'Sophisticated academic legal template.', isPremium: false },

  { id: 'tc-1', name: 'Senior Educator', category: 'Teacher', description: 'Modern layout for academic leadership.', isPremium: false },
  { id: 'tc-2', name: 'Secondary Teacher', category: 'Teacher', description: 'Friendly and informative classroom layout.', isPremium: false },
  { id: 'tc-3', name: 'College Professor', category: 'Teacher', description: 'Academic-focused minimalist design.', isPremium: false },
  { id: 'tc-4', name: 'EdTech Pro', category: 'Teacher', description: 'Technical grid focusing on digital tools.', isPremium: false },
  { id: 'tc-5', name: 'Student Engagement', category: 'Teacher', description: 'Warm vibrant layout for mentoring roles.', isPremium: false },

  { id: 'mk-1', name: 'Growth Marketer', category: 'Marketing', description: 'KPI-driven layout for performance marketing.', isPremium: true },
  { id: 'mk-2', name: 'Brand Manager', category: 'Marketing', description: 'Vibrant creative layout focusing on impact.', isPremium: true, popular: true },
  { id: 'mk-3', name: 'Digital Strategist', category: 'Marketing', description: 'Modern minimalist design for tech marketing.', isPremium: true },
  { id: 'mk-4', name: 'SEO Specialist', category: 'Marketing', description: 'Detailed grid for analytical toolsets.', isPremium: true },
  { id: 'mk-5', name: 'Content Creator', category: 'Marketing', description: 'Dynamic split layout for creative pros.', isPremium: false },

  { id: 'ds-1', name: 'UX Designer Pro', category: 'Designer', description: 'Portfolio-style layout for UI/UX experts.', isPremium: true, popular: true },
  { id: 'ds-2', name: 'Art Director', category: 'Designer', description: 'Bold high-contrast creative design.', isPremium: true },
  { id: 'ds-3', name: 'Visual Creative', category: 'Designer', description: 'Ultra-clean whitespace for artistic focus.', isPremium: true },
  { id: 'ds-4', name: 'Product Architect', category: 'Designer', description: 'Structured technical design for product roles.', isPremium: true },
  { id: 'ds-5', name: 'Digital Designer', category: 'Designer', description: 'Soft modern palette for creative services.', isPremium: false },
];

const ACCENT_COLORS = [
  { id: 'indigo',  hex: '#6366f1', name: 'Royal Indigo' },
  { id: 'rose',    hex: '#f43f5e', name: 'Elegant Rose' },
  { id: 'emerald', hex: '#10b981', name: 'Fresh Emerald' },
  { id: 'amber',   hex: '#f59e0b', name: 'Sun Amber' },
  { id: 'slate',   hex: '#475569', name: 'Slate Pro' },
  { id: 'purple',  hex: '#a855f7', name: 'Magic Purple' },
];

const PLAN_RANK = { free: 0, basic: 1, pro: 2 };

// Renders a tiny static preview of each template
const TemplateMiniPreview = ({ templateId }) => {
  const sampleData = {
    personalDetails: { fullName: 'Alex Johnson', jobTitle: 'Software Engineer', email: 'alex@example.com', summary: 'Passionate developer with 5+ years building modern web apps.' },
    experience: [{ jobTitle: 'Full Stack Dev', company: 'TechCorp', startDate: '2021', endDate: 'Present', description: 'Built scalable microservices.' }],
    education: [{ degree: 'B.S. Computer Science', school: 'MIT', startDate: '2017', endDate: '2021' }],
    skills: [{ name: 'React', level: 'Expert' }, { name: 'Node.js', level: 'Advanced' }, { name: 'PostgreSQL', level: 'Intermediate' }],
    projects: [{ name: 'Portfolio', technologies: 'React, Vite', description: 'A personal portfolio site.' }]
  };

  // Lazy import to avoid circular deps
  const templates = {
    // MEDICAL
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

    // LEGAL & EDU
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

    // CREATIVE & MARKETING
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

    // SERVICE & ENTRY
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

    // ATS FRIENDLY MAPPINGS
    'ats-1': React.lazy(() => import('../../components/Templates/ProfessionalTemplate')),
    'ats-2': React.lazy(() => import('../../components/Templates/TechTemplate')),
    'ats-3': React.lazy(() => import('../../components/Templates/MinimalistTemplate')),
    'ats-4': React.lazy(() => import('../../components/Templates/ModernTemplate')),
    'ats-5': React.lazy(() => import('../../components/Templates/FormalTemplate')),
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
  const userPlan = user?.plan || 'free';

  const canAccess = (minPlan) => {
    if (user?.role === 'admin') return true;
    return PLAN_RANK[userPlan] >= PLAN_RANK[minPlan];
  };

  const handleSelect = async (templateId) => {
    if (!user?.token) return navigate('/login');
    setLoading(true);
    try {
      // Save accent color preference for the builder to pick up
      localStorage.setItem('resumify_accent_color', selectedAccent.hex);
      
      const res = await axios.post('http://localhost:5000/api/resumes', { 
        template: templateId,
        color: selectedAccent.hex // Attempt to save color to backend
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
      '--primary-hover': selectedAccent.hex + 'cc'
    }}>
      <Navbar user={user} />
      
      <div style={{ 
        padding: '2rem 1rem', 
        maxWidth: '1200px', 
        margin: '0 auto', 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-gradient" style={{ 
            backgroundImage: `linear-gradient(to right, ${selectedAccent.hex}, #a855f7)` 
          }}>Select Template</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            Select any template to start building. Premium templates (<GoldStar size={18} />) require an upgrade only when you download.
          </p>
        </div>

      {/* Main Layout Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem', marginBottom: '2rem', padding: '0.5rem' }}>
        {CATEGORIES.slice(0, 2).map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? 'white' : 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 10px 25px -5px rgba(99, 102, 241, 0.4)' : 'var(--shadow-sm)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem', display: 'flex', opacity: isActive ? 1 : 0.7 }}>{cat.icon}</span>
              {cat.id}
            </button>
          );
        })}
      </div>

      {/* Profession Filter */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '3.5rem', 
        padding: '0.75rem 1.5rem', 
        background: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--surface-border)',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
      }}>
        <span style={{ 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          marginRight: '1rem',
          opacity: 0.8
        }}>
          Professions:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {CATEGORIES.slice(2).map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <span style={{ fontSize: '1rem', opacity: isActive ? 1 : 0.6, display: 'flex' }}>{cat.icon}</span>
                {cat.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette Selector */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '1.5rem', 
        marginBottom: '2.5rem',
        padding: '1.25rem',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--surface-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <span style={{ 
          fontSize: '0.7rem', 
          color: 'var(--text-muted)', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em'
        }}>
          Theme Accent:
        </span>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {ACCENT_COLORS.map((color) => {
            const isActive = selectedAccent.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => setSelectedAccent(color)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: color.hex,
                  border: isActive ? `3px solid white` : '3px solid transparent',
                  boxShadow: isActive ? `0 0 15px ${color.hex}` : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                }}
                title={color.name}
              />
            );
          })}
        </div>
      </div>

      <div className="responsive-grid">
        {TEMPLATES.filter(t => selectedCategory === 'All templates' || t.category === selectedCategory).map((t) => {
          const isPremium = t.isPremium;
          const isPopular = t.popular;
          
          return (
            <div key={t.id} className="template-card" onClick={() => !loading && handleSelect(t.id)}>
              {isPremium && (
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  zIndex: 10, 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  backdropFilter: 'blur(8px)', 
                  padding: '0.4rem', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} title="Premium Template">
                  <GoldStar size={18} />
                </div>
              )}

              {isPopular && (
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  left: '1rem', 
                  zIndex: 10, 
                  background: 'var(--primary)', 
                  color: 'white',
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '8px', 
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                }}>
                  Popular
                </div>
              )}

              <div className="template-preview" style={{ opacity: 1 }}>
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top center', width: '816px', pointerEvents: 'none' }}>
                  <TemplateMiniPreview templateId={t.id} />
                </div>
              </div>
              <div className="template-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem' }}>{t.name}</h3>
                  {isPremium && <span className="badge badge-purple" style={{ fontSize: '0.6rem' }}>PREMIUM</span>}
                </div>
                <p style={{ fontSize: '0.8rem' }}>{t.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};


export default Templates;

// Inject hover styles for the lock notice
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .template-card:hover .hover-lock-notice {
      opacity: 1 !important;
      backdrop-filter: blur(2px) !important;
    }
  `;
  document.head.appendChild(style);
}
