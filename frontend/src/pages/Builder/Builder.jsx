import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';
import AIEnhancer from '../../components/AIEnhancer';

import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import LanguagesForm from './LanguagesForm';
import StatusModal from '../../components/StatusModal';

import ModernTemplate from '../../components/Templates/ModernTemplate';
import ClassicTemplate from '../../components/Templates/ClassicTemplate';
import MinimalistTemplate from '../../components/Templates/MinimalistTemplate';
import CreativeTemplate from '../../components/Templates/CreativeTemplate';
import ProfessionalTemplate from '../../components/Templates/ProfessionalTemplate';
import IndigoTemplate from '../../components/Templates/IndigoTemplate';
import GoldTemplate from '../../components/Templates/GoldTemplate';
import RubyTemplate from '../../components/Templates/RubyTemplate';
import BlueprintTemplate from '../../components/Templates/BlueprintTemplate';
import SimpleTemplate from '../../components/Templates/SimpleTemplate';
import CompactTemplate from '../../components/Templates/CompactTemplate';
import BasicTemplate from '../../components/Templates/BasicTemplate';
import PhotoFreeTemplate from '../../components/Templates/PhotoFreeTemplate';
import PhotoPremiumTemplate from '../../components/Templates/PhotoPremiumTemplate';
import MochaTemplate from '../../components/Templates/MochaTemplate';
import SageTemplate from '../../components/Templates/SageTemplate';
import OnyxTemplate from '../../components/Templates/OnyxTemplate';
import SilverTemplate from '../../components/Templates/SilverTemplate';
import NavyTemplate from '../../components/Templates/NavyTemplate';
import FormalTemplate from '../../components/Templates/FormalTemplate';
import ModernDarkTemplate from '../../components/Templates/ModernDarkTemplate';
import PastelTemplate from '../../components/Templates/PastelTemplate';
import TechTemplate from '../../components/Templates/TechTemplate';
import DoctorTemplate from '../../components/Templates/DoctorTemplate';
import NurseTemplate from '../../components/Templates/NurseTemplate';
import LawyerTemplate from '../../components/Templates/LawyerTemplate';
import TeacherTemplate from '../../components/Templates/TeacherTemplate';
import DigitalMarketingTemplate from '../../components/Templates/DigitalMarketingTemplate';
import DesignerTemplate from '../../components/Templates/DesignerTemplate';
import SupermarketTemplate from '../../components/Templates/SupermarketTemplate';
import FresherTemplate from '../../components/Templates/FresherTemplate';
import CollegeStudentTemplate from '../../components/Templates/CollegeStudentTemplate';

import {
  DoctorD1, DoctorD2, DoctorD3, DoctorD4, DoctorD5,
  NurseN1, NurseN2, NurseN3, NurseN4, NurseN5
} from '../../components/Templates/MedicalTemplates';
import {
  LawyerL1, LawyerL2, LawyerL3, LawyerL4, LawyerL5,
  TeacherT1, TeacherT2, TeacherT3, TeacherT4, TeacherT5
} from '../../components/Templates/LegalAndEduTemplates';
import {
  MarketingM1, MarketingM2, MarketingM3, MarketingM4, MarketingM5,
  DesignerDS1, DesignerDS2, DesignerDS3, DesignerDS4, DesignerDS5
} from '../../components/Templates/CreativeTemplates';
import {
  RetailR1, RetailR2, RetailR3, RetailR4, RetailR5,
  FresherF1, FresherF2, FresherF3, FresherF4, FresherF5,
  StudentS1, StudentS2, StudentS3, StudentS4, StudentS5
} from '../../components/Templates/ServiceAndEntryTemplates';

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  indigo: IndigoTemplate,
  gold: GoldTemplate,
  ruby: RubyTemplate,
  blueprint: BlueprintTemplate,
  simple: SimpleTemplate,
  compact: CompactTemplate,
  basic: BasicTemplate,
  'photo-free': PhotoFreeTemplate,
  'photo-premium': PhotoPremiumTemplate,
  mocha: MochaTemplate,
  sage: SageTemplate,
  onyx: OnyxTemplate,
  silver: SilverTemplate,
  navy: NavyTemplate,
  formal: FormalTemplate,
  'modern-dark': ModernDarkTemplate,
  pastel: PastelTemplate,
  tech: TechTemplate,
  doctor: DoctorTemplate,
  nurse: NurseTemplate,
  lawyer: LawyerTemplate,
  teacher: TeacherTemplate,
  'digital-marketing': DigitalMarketingTemplate,
  designer: DesignerTemplate,
  supermarket: SupermarketTemplate,
  fresher: FresherTemplate,
  'college-student': CollegeStudentTemplate,

  // NEW 45 PROFESSION TEMPLATES
  'dr-1': DoctorD1, 'dr-2': DoctorD2, 'dr-3': DoctorD3, 'dr-4': DoctorD4, 'dr-5': DoctorD5,
  'ns-1': NurseN1, 'ns-2': NurseN2, 'ns-3': NurseN3, 'ns-4': NurseN4, 'ns-5': NurseN5,
  'lw-1': LawyerL1, 'lw-2': LawyerL2, 'lw-3': LawyerL3, 'lw-4': LawyerL4, 'lw-5': LawyerL5,
  'tc-1': TeacherT1, 'tc-2': TeacherT2, 'tc-3': TeacherT3, 'tc-4': TeacherT4, 'tc-5': TeacherT5,
  'mk-1': MarketingM1, 'mk-2': MarketingM2, 'mk-3': MarketingM3, 'mk-4': MarketingM4, 'mk-5': MarketingM5,
  'ds-1': DesignerDS1, 'ds-2': DesignerDS2, 'ds-3': DesignerDS3, 'ds-4': DesignerDS4, 'ds-5': DesignerDS5,
  'rt-1': RetailR1, 'rt-2': RetailR2, 'rt-3': RetailR3, 'rt-4': RetailR4, 'rt-5': RetailR5,
  'fr-1': FresherF1, 'fr-2': FresherF2, 'fr-3': FresherF3, 'fr-4': FresherF4, 'fr-5': FresherF5,
  'st-1': StudentS1, 'st-2': StudentS2, 'st-3': StudentS3, 'st-4': StudentS4, 'st-5': StudentS5,
};

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [profileApplied, setProfileApplied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [tempTitle, setTempTitle] = useState('');

  const [resumeData, setResumeData] = useState({
    title: JSON.parse(localStorage.getItem('resumify_user') || '{}')?.name || 'Untitled Resume',
    template: 'modern',
    hasUsedAI: false,
    hasUsedPremiumTemplate: false,
    personalDetails: { fullName: '', jobTitle: '', email: '', phone: '', address: '', linkedin: '', github: '', summary: '', photo: null },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: []
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('resumify_accent_color') || '#6366f1';
  });

  const steps = ['Personal Details', 'Education', 'Experience', 'Skills', 'Projects', 'Languages'];

  const previewContainerRef = useRef(null);
  const resumeContentRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(0.5);

  useLayoutEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      const container = previewContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width || container.offsetWidth;
      const containerHeight = rect.height || container.offsetHeight;

      if (!containerWidth || !containerHeight) return;

      // Increase padding for mobile for better fit (e.g. 60px)
      const padding = window.innerWidth <= 768 ? 60 : 40;
      const availableWidth = containerWidth - padding;
      const availableHeight = containerHeight - padding;

      const scaleX = availableWidth / 816;
      // A4 height is roughly 1123px at 96 DPI
      const scaleY = availableHeight / 1123;

      // If on mobile, we might want to scale purely by width to allow vertical scrolling
      if (window.innerWidth <= 768) {
        setScaleFactor(Math.max(availableWidth / 816, 0.1));
        return;
      }

      const newScale = Math.max(Math.min(scaleX, scaleY), 0.1);
      setScaleFactor(newScale);
    };

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale);
    });
    observer.observe(previewContainerRef.current);

    // Initial and periodic check to prevent blank screen
    updateScale();
    const timer = setTimeout(updateScale, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('resumify_user'));
        if (!user) return navigate('/login');

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`);

        const fetchedData = {
          title: (res.data.title && res.data.title !== 'Untitled Resume') ? res.data.title : (res.data.personalDetails?.fullName || user.name || 'Untitled Resume'),
          template: res.data.template || 'modern',
          personalDetails: res.data.personalDetails || { fullName: '', jobTitle: '', email: '', phone: '', address: '', linkedin: '', github: '', summary: '' },
          education: res.data.education || [],
          experience: res.data.experience || [],
          skills: res.data.skills || [],
          projects: res.data.projects || [],
          languages: res.data.languages || []
        };

        // AUTO-FILL LOGIC: If this is a fresh resume, try to fetch and apply Master Profile
        const isFreshResume = !fetchedData.personalDetails.fullName && fetchedData.education.length === 0 && fetchedData.experience.length === 0;

        if (isFreshResume && fetchedData.title !== '___MASTER_PROFILE___') {
          try {
            const allResumes = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes`);
            const master = allResumes.data.find(r => r.title === '___MASTER_PROFILE___');
            if (master && (master.personalDetails?.fullName || master.skills?.length > 0)) {
              // Apply master data
              fetchedData.personalDetails = { ...fetchedData.personalDetails, ...master.personalDetails };
              fetchedData.skills = master.skills || [];
              fetchedData.education = master.education || [];
              fetchedData.experience = master.experience || [];
              fetchedData.languages = master.languages || [];
              console.log('Auto-filled from Master Profile');
              setProfileApplied(true);
            }
          } catch (e) {
            console.error('Master Profile auto-fill failed', e);
          }
        }

        setResumeData(fetchedData);
      } catch (err) {
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const validateStep = (stepIndex = activeStep) => {
    const newErrors = {};

    if (stepIndex === 0) {
      if (!resumeData.personalDetails.fullName?.trim()) newErrors.fullName = 'Full Name is required';
      if (!resumeData.personalDetails.jobTitle?.trim()) newErrors.jobTitle = 'Job Title is required';
      if (!resumeData.personalDetails.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalDetails.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!resumeData.personalDetails.phone?.trim()) newErrors.phone = 'Phone number is required';
      // Professional summary is now optional to prevent blocking the user
    }
    else if (stepIndex === 1) {
      resumeData.education.forEach((edu, idx) => {
        if (!edu.degree?.trim()) newErrors[`edu_${idx}_degree`] = 'Degree is required';
        if (!edu.school?.trim()) newErrors[`edu_${idx}_school`] = 'School is required';
        if (!edu.startDate?.trim()) newErrors[`edu_${idx}_startDate`] = 'Start date is required';
      });
    }
    else if (stepIndex === 2) {
      resumeData.experience.forEach((exp, idx) => {
        // Only validate if at least something is filled (prevent blocking on just-added empty items)
        const isDirty = exp.jobTitle?.trim() || exp.company?.trim() || exp.description?.trim();
        if (isDirty) {
          if (!exp.jobTitle?.trim()) newErrors[`exp_${idx}_jobTitle`] = 'Job Title is required';
          if (!exp.company?.trim()) newErrors[`exp_${idx}_company`] = 'Company is required';
          if (!exp.startDate?.trim()) newErrors[`exp_${idx}_startDate`] = 'Start date is required';
          // Description is now optional
        }
      });
    }
    else if (stepIndex === 3) {
      resumeData.skills.forEach((skill, idx) => {
        if (!skill.name?.trim()) newErrors[`skill_${idx}_name`] = 'Skill name is required';
      });
    }
    else if (stepIndex === 4) {
      resumeData.projects.forEach((proj, idx) => {
        const isDirty = proj.name?.trim() || proj.description?.trim() || proj.link?.trim();
        if (isDirty) {
          if (!proj.name?.trim()) newErrors[`proj_${idx}_name`] = 'Project name is required';
          // Description is now optional
        }
      });
    }
    else if (stepIndex === 5) {
      resumeData.languages.forEach((lang, idx) => {
        if (!lang.name?.trim()) newErrors[`lang_${idx}_name`] = 'Language name is required';
      });
    }

    setErrors(newErrors);

    // Always return true to prevent blocking save/navigation, 
    // even if errors are present (they will still be shown in red in the UI).
    return true;
  };

  const handleSave = async (showNotification = true, isNavigating = false, forceComplete = false) => {
    // Perform validation
    validateStep();

    // Logic: If user clicks "Save & Complete" and hasn't manually renamed, show naming popup
    if (forceComplete && !showRenameModal) {
      const namePart = resumeData.personalDetails.fullName?.trim();
      const titlePart = resumeData.personalDetails.jobTitle?.trim();
      let suggested = resumeData.title;
      
      // If title is default, suggest "Name - Professional Title"
      const user = JSON.parse(localStorage.getItem('resumify_user'));
      const defaultTitle = user?.name ? `${user.name}'s Resume` : 'Untitled Resume';
      
      if (resumeData.title === defaultTitle || resumeData.title === 'Untitled Resume') {
        suggested = [namePart, titlePart].filter(Boolean).join(' - ') || defaultTitle;
      }
      
      setTempTitle(suggested);
      setShowRenameModal(true);
      return;
    }

    if (isNavigating) setIsPreviewing(true);
    else setIsSaving(true);

    try {
      const user = JSON.parse(localStorage.getItem('resumify_user'));
      if (!user) return navigate('/login');

      await axios.put(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`, resumeData);
      if (showNotification) {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'All Set!',
          message: 'Your resume has been saved successfully. You can now continue editing or head to preview.'
        });
      }
      return true;
    } catch (err) {
      console.error('Failed to save resume', err);
      // More descriptive error for the user
      const msg = err.response?.data?.message || err.message || 'Unknown error';
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Save Failed',
        message: `We couldn't save your progress: ${msg}. Please check your connection and try again.`
      });
      return false;
    } finally {
      setIsSaving(false);
      setIsPreviewing(false);
    }
  };

  const handleNavigate = async (path) => {
    // Auto-save doesn't block navigation anymore, but we show a different loader
    await handleSave(false, true);
    navigate(path);
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, [name]: value }
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Image Too Large',
          message: 'The selected image exceeds the 1MB limit. Please choose a smaller file.'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({
          ...resumeData,
          personalDetails: { ...resumeData.personalDetails, photo: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setResumeData({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, photo: null }
    });
  };

  // --- Generic Array Handlers ---
  const addArrayItem = (field, defaultObject) => {
    setResumeData({
      ...resumeData,
      [field]: [...resumeData[field], defaultObject]
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...resumeData[field]];
    newArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [field]: newArray
    });
  };

  const updateArrayItem = (field, index, key, value, aiUsed = false) => {
    const newArray = [...resumeData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setResumeData({
      ...resumeData,
      [field]: newArray,
      hasUsedAI: resumeData.hasUsedAI || aiUsed
    });
  };

  const TemplateComponent = TEMPLATE_MAP[resumeData.template] || ModernTemplate;

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  const filteredData = {
    ...resumeData,
    education: resumeData.education.filter(e => e.school?.trim() || e.degree?.trim() || e.description?.trim()),
    experience: resumeData.experience.filter(e => e.jobTitle?.trim() || e.company?.trim() || e.description?.trim()),
    skills: resumeData.skills.filter(s => s.name?.trim()),
    projects: resumeData.projects.filter(p => p.name?.trim() || p.description?.trim()),
    languages: resumeData.languages.filter(l => l.name?.trim())
  };

  return (
    <div className="builder-page" style={{ '--primary': accentColor }}>

      {/* Desktop Header */}
      <div className="builder-header desktop-only" style={{ padding: '0.75rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '1.25rem' }}>Resumify</h1>
        <div className="builder-header-actions" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* ThemeToggle removed for users */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/dashboard')}
            disabled={isSaving}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            Dashboard
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleNavigate(`/preview/${id}`)}
            disabled={isSaving || isPreviewing}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            {isPreviewing ? 'Loading...' : 'Preview'}
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSave(true)}
            disabled={isSaving || isPreviewing}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>


      <div className="builder-body">
        {/* Left Column: Sidebar + Form */}
        <div className="builder-left">
          {/* Sidebar / Steps */}
          <div className="card builder-sidebar desktop-only" style={{ padding: '1.5rem 1.25rem' }}>
            <h2 style={{ paddingLeft: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sections</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={`builder-nav-item ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="builder-nav-number">{index + 1}</span>
                  {step}
                </button>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="card builder-form" style={{ padding: '1rem' }}>
            {/* Mobile Action Bar */}
            <div className="mobile-action-bar mobile-only" style={{ marginBottom: '1rem', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm builder-mobile-btn"
                onClick={() => navigate('/dashboard')}
                disabled={isSaving}
                style={{ height: '32px', minHeight: '32px' }}
              >
                Dashboard
              </button>
              <button
                className="btn btn-primary btn-sm builder-mobile-btn"
                onClick={() => handleSave(true)}
                disabled={isSaving || isPreviewing}
                style={{ height: '32px', minHeight: '32px' }}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>

            {/* Progress Stepper */}
            <div className="builder-stepper" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
              {steps.map((step, index) => {
                const shortLabels = ['Basic', 'Edu', 'Exp', 'Skills', 'Proj', 'Lang'];
                return (
                  <div
                    key={index}
                    className={`step-item ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}
                    onClick={() => {
                      if (index !== activeStep) {
                        setActiveStep(index);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{ cursor: 'pointer', gap: '4px' }}
                  >
                    <div className="step-dot" style={{ width: '22px', height: '22px', fontSize: '0.7rem' }}>{activeStep > index ? '✓' : index + 1}</div>
                    <span className="step-label" style={{ fontSize: '0.6rem' }}>{shortLabels[index]}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem' }}>
              <div className="builder-step-header">
                <div className="builder-step-title-container">
                  <span className="builder-nav-number" style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', flexShrink: 0, fontSize: '0.8rem' }}>{activeStep + 1}</span>
                  <h2 className="builder-step-title" style={{ fontSize: '1rem' }}>{steps[activeStep]}</h2>
                </div>
                {profileApplied ? (
                  <div className="badge badge-success" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                    Profile Applied
                  </div>
                ) : (
                  <button
                    className="btn btn-secondary sync-profile-btn"
                    style={{ fontSize: '0.6rem', padding: '0.3rem 0.6rem', borderStyle: 'dashed', width: 'auto', minWidth: 'unset', height: '28px' }}
                    disabled={isSyncing}
                    onClick={async () => {
                      setIsSyncing(true);
                      try {
                        const user = JSON.parse(localStorage.getItem('resumify_user'));
                        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes`);
                        const master = res.data.find(r => r.title === '___MASTER_PROFILE___');

                        if (master) {
                          setResumeData(prev => ({
                            ...prev,
                            personalDetails: { ...prev.personalDetails, ...master.personalDetails },
                            skills: master.skills?.length ? master.skills : prev.skills,
                            experience: master.experience?.length ? master.experience : prev.experience,
                            education: master.education?.length ? master.education : prev.education,
                            languages: master.languages?.length ? master.languages : prev.languages
                          }));
                          setProfileApplied(true);
                        } else {
                          setModal({
                            isOpen: true,
                            type: 'error',
                            title: 'No Profile Found',
                            message: 'We couldn\'t find a Master Profile. Please go to the Dashboard or Settings to set one up first!'
                          });
                        }
                      } catch (err) {
                        console.error('Manual sync failed:', err);
                        setModal({
                          isOpen: true,
                          type: 'error',
                          title: 'Sync Failed',
                          message: 'We encountered an error while trying to sync your profile. Please check your internet connection.'
                        });
                      } finally {
                        setIsSyncing(false);
                      }
                    }}
                  >
                    {isSyncing ? '⌛' : 'Sync Profile'}
                  </button>
                )}
              </div>
            </div>

            {activeStep === 0 && (
              <div className="personal-details-form">
                {['photo-free', 'photo-premium', 'mocha', 'sage', 'onyx', 'silver', 'navy', 'pastel'].includes(resumeData.template) && (
                  <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center', padding: '1rem 0' }}>
                    <div className="photo-upload-circle" onClick={() => document.getElementById('photo-input').click()}>
                      {resumeData.personalDetails?.photo ? (
                        <>
                          <img src={resumeData.personalDetails.photo} alt="Profile" />
                          <button
                            className="photo-remove-btn"
                            onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                          >✕</button>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--primary)', opacity: 0.6, fontSize: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '1.5rem' }}>📷</span>
                          <span style={{ fontWeight: '600' }}>UPLOAD</span>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Profile Photo</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        Clear face photos work best for premium templates.
                      </p>
                      <input
                        id="photo-input"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <button className="btn btn-secondary btn-sm" onClick={() => document.getElementById('photo-input').click()} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        Change Image
                      </button>
                    </div>
                  </div>
                )}

                <div className="responsive-form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="required-star">*</span></label>
                    <input
                      name="fullName"
                      className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                      value={resumeData.personalDetails?.fullName || ''}
                      onChange={handlePersonalChange}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>
                  <div className="form-group" style={{ position: 'relative' }}>
                    <label className="form-label">Job Title <span className="required-star">*</span></label>
                    <input
                      name="jobTitle"
                      className={`form-input ${errors.jobTitle ? 'is-invalid' : ''}`}
                      value={resumeData.personalDetails?.jobTitle || ''}
                      onChange={handlePersonalChange}
                    />
                    {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span className="required-star">*</span></label>
                    <input
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                      value={resumeData.personalDetails?.email || ''}
                      onChange={handlePersonalChange}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone <span className="required-star">*</span></label>
                    <input
                      name="phone"
                      className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                      value={resumeData.personalDetails?.phone || ''}
                      onChange={handlePersonalChange}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input name="linkedin" className="form-input" value={resumeData.personalDetails?.linkedin || ''} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub/Portfolio</label>
                    <input name="github" className="form-input" value={resumeData.personalDetails?.github || ''} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Location</label>
                    <input name="address" className="form-input" placeholder="e.g. New York, USA" value={resumeData.personalDetails?.address || ''} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>Professional Summary</label>
                      <AIEnhancer
                        text={resumeData.personalDetails?.summary || ''}
                        onApply={(val) => {
                          setResumeData({
                            ...resumeData,
                            hasUsedAI: true,
                            personalDetails: { ...resumeData.personalDetails, summary: val }
                          });
                          if (errors.summary) setErrors({ ...errors, summary: null });
                        }}
                        type="summary"
                        contextData={{ jobTitle: resumeData.personalDetails?.jobTitle }}
                      />
                    </div>
                    <textarea
                      name="summary"
                      className={`form-input ${errors.summary ? 'is-invalid' : ''}`}
                      rows="5"
                      value={resumeData.personalDetails?.summary || ''}
                      onChange={handlePersonalChange}
                    ></textarea>
                    {errors.summary && <span className="error-text">{errors.summary}</span>}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <EducationForm
                education={resumeData.education}
                errors={errors}
                onChange={(index, key, val) => {
                  updateArrayItem('education', index, key, val);
                  if (errors[`edu_${index}_${key}`]) {
                    const newErrors = { ...errors };
                    delete newErrors[`edu_${index}_${key}`];
                    setErrors(newErrors);
                  }
                }}
                onAdd={() => addArrayItem('education', { degree: '', school: '', startDate: '', endDate: '', description: '' })}
                onRemove={(index) => removeArrayItem('education', index)}
              />
            )}

            {activeStep === 2 && (
              <ExperienceForm
                experience={resumeData.experience}
                errors={errors}
                onChange={(index, key, val) => {
                  updateArrayItem('experience', index, key, val);
                  if (errors[`exp_${index}_${key}`]) {
                    const newErrors = { ...errors };
                    delete newErrors[`exp_${index}_${key}`];
                    setErrors(newErrors);
                  }
                }}
                onAdd={() => addArrayItem('experience', { jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}
                onRemove={(index) => removeArrayItem('experience', index)}
              />
            )}

            {activeStep === 3 && (
              <SkillsForm
                skills={resumeData.skills}
                errors={errors}
                onChange={(index, key, val) => {
                  updateArrayItem('skills', index, key, val);
                  if (errors[`skill_${index}_${key}`]) {
                    const newErrors = { ...errors };
                    delete newErrors[`skill_${index}_${key}`];
                    setErrors(newErrors);
                  }
                }}
                onAdd={() => addArrayItem('skills', { name: '', level: 'Intermediate' })}
                onRemove={(index) => removeArrayItem('skills', index)}
              />
            )}

            {activeStep === 4 && (
              <ProjectsForm
                projects={resumeData.projects}
                errors={errors}
                onChange={(index, key, val) => {
                  updateArrayItem('projects', index, key, val);
                  if (errors[`proj_${index}_${key}`]) {
                    const newErrors = { ...errors };
                    delete newErrors[`proj_${index}_${key}`];
                    setErrors(newErrors);
                  }
                }}
                onAdd={() => addArrayItem('projects', { name: '', link: '', technologies: '', description: '' })}
                onRemove={(index) => removeArrayItem('projects', index)}
              />
            )}

            {activeStep === 5 && (
              <LanguagesForm
                languages={resumeData.languages}
                errors={errors}
                onChange={(index, key, val) => {
                  updateArrayItem('languages', index, key, val);
                  if (errors[`lang_${index}_name`]) {
                    const newErrors = { ...errors };
                    delete newErrors[`lang_${index}_name`];
                    setErrors(newErrors);
                  }
                }}
                onAdd={() => addArrayItem('languages', { name: '', level: 3 })}
                onRemove={(index) => removeArrayItem('languages', index)}
              />
            )}

            {/* Navigation Controls */}
            <div className="builder-nav-controls" style={{ padding: '0.75rem 0', marginTop: '1rem', borderTop: '1px solid var(--surface-border)', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveStep(activeStep - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={activeStep === 0}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    validateStep();
                    setActiveStep(activeStep + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', height: '36px' }}
                >
                  <span className="nav-btn-text">Next: {steps[activeStep + 1]}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleSave(true, false, true)}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', height: '36px' }}
                >
                  Save & Complete
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className={`builder-preview-panel ${showMobilePreview ? 'mobile-show' : ''}`}>
          <div className="builder-preview-header" style={{ padding: '8px 12px', gap: '12px' }}>
            {/* Back button for mobile */}
            <button
              className="btn-close-mobile"
              onClick={() => setShowMobilePreview(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid var(--surface-border)',
                background: 'rgba(var(--primary-rgb), 0.08)',
                color: 'var(--primary)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--primary-rgb), 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(var(--primary-rgb), 0.08)';
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Edit
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>
              <span className="builder-preview-title" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>LIVE PREVIEW</span>
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                <span className="builder-preview-dot red"></span>
                <span className="builder-preview-dot yellow"></span>
                <span className="builder-preview-dot green"></span>
              </div>
            </div>
          </div>
          <div className="builder-preview-scroll" ref={previewContainerRef}>
            <div className="builder-preview-scaler" style={{ transform: `scale(${scaleFactor})` }}>
              <TemplateComponent ref={resumeContentRef} data={filteredData} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Preview Toggle for Mobile */}
      <button
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '1.25rem',
          zIndex: 100,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'none', // Shown via media query
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
          padding: 0,
          background: 'linear-gradient(135deg, var(--primary), #818cf8)',
          border: 'none',
        }}
        id="mobile-preview-toggle"
        onClick={() => setShowMobilePreview(true)}
        title="Show Preview"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>

      <style>{`
        .builder-step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .builder-step-title-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 150px;
        }
        .builder-step-title {
          margin: 0;
          font-size: 1.1rem;
        }
        .responsive-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .builder-mobile-btn {
          height: 34px !important;
          min-height: 34px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 1 !important;
          border-radius: 8px !important;
          font-size: 0.7rem !important;
          font-weight: 700 !important;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05) !important;
        }

        .sync-profile-btn {
          border: 1px dashed var(--primary) !important;
          background: rgba(var(--primary-rgb), 0.05) !important;
          padding: 0.4rem !important;
          border-radius: 8px !important;
          color: var(--primary) !important;
          font-weight: 700 !important;
          font-size: 0.65rem !important;
          width: auto;
          transition: all 0.2s ease;
        }

        @media (max-width: 900px) {
          #mobile-preview-toggle { 
            display: flex !important; 
            bottom: 1.5rem !important;
            right: 1.5rem !important;
            width: 44px !important;
            height: 44px !important;
          }
          .btn-close-mobile { 
            display: flex !important; 
            align-items: center;
            gap: 6px;
            background: rgba(var(--primary-rgb), 0.1);
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 0.7rem;
            font-weight: 700;
            transition: all 0.2s ease;
          }
          .btn-close-mobile:hover {
            background: var(--primary);
            color: white;
          }
        }

        @media (max-width: 600px) {
          .responsive-form-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .builder-step-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.35rem !important;
          }
          .builder-step-title-container {
            min-width: unset;
          }
          .sync-profile-btn {
            width: auto !important;
            margin-left: auto !important;
            padding: 0.35rem 0.6rem !important;
          }
        }

        @media (max-width: 480px) {
          .builder-header-actions {
            justify-content: center !important;
            width: 100%;
          }
          .form-group {
            margin-bottom: 0.5rem !important;
            gap: 1px !important;
          }
          .form-input {
            padding: 0.5rem 0.75rem !important;
            height: 38px !important;
            font-size: 0.85rem !important;
          }
          .form-label {
            margin-bottom: 0.15rem !important;
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            color: var(--text-main) !important;
          }
          .builder-step-title {
             font-size: 1rem !important;
          }
          .builder-form {
            padding: 0.75rem !important;
          }
          .builder-stepper {
            gap: 4px !important;
          }
          #mobile-preview-toggle {
            bottom: 1rem !important;
            right: 1rem !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
      {/* Rename Modal */}
      {showRenameModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '450px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Name Your Resume</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Give your resume a professional title to help you identify it on your dashboard.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Resume Title
              </label>
              <input 
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="e.g. Senior Doctor - Yash Kumar"
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '2px solid var(--surface-border)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowRenameModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={async () => {
                  const finalTitle = tempTitle.trim() || 'Untitled Resume';
                  setResumeData(prev => ({ ...prev, title: finalTitle }));
                  setShowRenameModal(false);
                  
                  // Immediately save with the new title
                  try {
                    const user = JSON.parse(localStorage.getItem('resumify_user'));
                    if (!user) return navigate('/login');
                    
                    setIsSaving(true);
                    await axios.put(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`, {
                      ...resumeData,
                      title: finalTitle
                    });
                    
                    setModal({
                      isOpen: true,
                      type: 'success',
                      title: 'Resume Completed!',
                      message: 'Your resume has been named and saved successfully. You can now head to your dashboard.'
                    });
                  } catch (err) {
                    console.error('Final save failed', err);
                  } finally {
                    setIsSaving(false);
                  }
                }}
                style={{ flex: 1.5 }}
              >
                Save & Complete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <StatusModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}

export default Builder;
