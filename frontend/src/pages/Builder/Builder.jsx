import React, { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import ThemeToggle from '../../components/ThemeToggle';
import AIEnhancer from '../../components/AIEnhancer';

import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import LanguagesForm from './LanguagesForm';
import StatusModal from '../../components/StatusModal';
import UpgradeModal from '../../components/UpgradeModal';
import PaymentPopup from '../../components/PaymentPopup';
import { TEMPLATE_MAP } from '../../config/templateMap';



const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileApplied, setProfileApplied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalData, setUpgradeModalData] = useState(null);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const previewContainerRef = useRef(null);
  const componentRef = useRef(null);
  const formContainerRef = useRef(null);

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
  const shortLabels = ['Details', 'Education', 'Experience', 'Skills', 'Projects', 'Languages'];

  useLayoutEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      const container = previewContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      if (!containerWidth || !containerHeight) return;

      // A4 dimensions: 210mm x 297mm (approx 794px x 1123px at 96 DPI)
      const targetWidth = 816;
      const targetHeight = 1056;

      const scaleX = (containerWidth - 40) / targetWidth;
      const scaleY = (containerHeight - 40) / targetHeight;

      const newScale = Math.min(scaleX, scaleY, 1);
      setScaleFactor(newScale);
    };

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale);
    });
    observer.observe(previewContainerRef.current);

    updateScale();
    const timer = setTimeout(updateScale, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [loading, resumeData.template, showMobilePreview]);


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

  const getErrorsForStep = (stepIndex, data = resumeData) => {
    const newErrors = {};

    if (stepIndex === 0) {
      if (!data.personalDetails.fullName?.trim()) newErrors.fullName = 'Full Name is required';
      if (!data.personalDetails.jobTitle?.trim()) newErrors.jobTitle = 'Job Title is required';
      if (!data.personalDetails.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalDetails.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!data.personalDetails.phone?.trim()) newErrors.phone = 'Phone number is required';
    }
    else if (stepIndex === 1) {
      if (!data.education || data.education.length === 0) {
        newErrors.edu_general = 'At least one Education entry is required';
      } else {
        data.education.forEach((edu, idx) => {
          if (!edu.degree?.trim()) newErrors[`edu_${idx}_degree`] = 'Degree is required';
          if (!edu.school?.trim()) newErrors[`edu_${idx}_school`] = 'School is required';
          if (!edu.startDate?.trim()) newErrors[`edu_${idx}_startDate`] = 'Start date is required';
        });
      }
    }
    else if (stepIndex === 2) {
      data.experience.forEach((exp, idx) => {
        const isDirty = exp.jobTitle?.trim() || exp.company?.trim() || exp.description?.trim();
        if (isDirty) {
          if (!exp.jobTitle?.trim()) newErrors[`exp_${idx}_jobTitle`] = 'Job Title is required';
          if (!exp.company?.trim()) newErrors[`exp_${idx}_company`] = 'Company is required';
          if (!exp.startDate?.trim()) newErrors[`exp_${idx}_startDate`] = 'Start date is required';
        }
      });
    }
    else if (stepIndex === 3) {
      data.skills.forEach((skill, idx) => {
        if (!skill.name?.trim()) newErrors[`skill_${idx}_name`] = 'Skill name is required';
      });
    }
    else if (stepIndex === 4) {
      data.projects.forEach((proj, idx) => {
        const isDirty = proj.name?.trim() || proj.description?.trim() || proj.link?.trim();
        if (isDirty) {
          if (!proj.name?.trim()) newErrors[`proj_${idx}_name`] = 'Project name is required';
        }
      });
    }
    else if (stepIndex === 5) {
      data.languages.forEach((lang, idx) => {
        if (!lang.name?.trim()) newErrors[`lang_${idx}_name`] = 'Language name is required';
      });
    }

    return newErrors;
  };

  const validateStep = (stepIndex = activeStep) => {
    const newErrors = getErrorsForStep(stepIndex);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAllSteps = () => {
    let allErrors = {};
    let firstInvalidStep = -1;
    for (let i = 0; i < steps.length; i++) {
      const stepErrors = getErrorsForStep(i);
      if (Object.keys(stepErrors).length > 0 && firstInvalidStep === -1) {
        firstInvalidStep = i;
      }
      allErrors = { ...allErrors, ...stepErrors };
    }
    setErrors(allErrors);
    return firstInvalidStep; // Returns -1 if all steps are valid
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

    if (isNavigating) {
      // Logic for navigation save
    } else {
      setIsSaving(true);
    }

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
      const isAuthError = err.response?.status === 401;
      const msg = isAuthError
        ? 'Your session has expired or you are not authorized'
        : (err.response?.data?.message || err.message || 'Unknown error');

      setModal({
        isOpen: true,
        type: 'error',
        title: isAuthError ? 'Session Expired' : 'Save Failed',
        message: isAuthError
          ? 'Please log in again to save your progress. You can open the dashboard in a new tab to re-login.'
          : `We couldn't save your progress: ${msg}. Please check your connection and try again.`
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    // Strict Validation Check
    const invalidStep = validateAllSteps();
    if (invalidStep !== -1) {
      setActiveStep(invalidStep);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Incomplete Details',
        message: 'Please complete all required fields (marked with *) and ensure you have at least one Education entry before downloading.'
      });
      return;
    }

    const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
    if (!user.id && !user._id) return navigate('/login');

    setDownloading(true);
    try {
      // First save the resume to ensure download matches current edits
      await handleSave(false);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resumes/download/${id}`);

      if (res.data.allowed) {
        // Update local user download count
        const updatedUser = { ...user, download_count: res.data.download_count };
        localStorage.setItem('resumify_user', JSON.stringify(updatedUser));

        const element = componentRef.current;
        const opt = {
          margin: 0,
          filename: `${resumeData?.title || 'Resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().from(element).set(opt).save();
      }
    } catch (err) {
      if (err.response?.status === 403) {
        const errorData = err.response.data;
        if (errorData.type === 'PAYMENT_REQUIRED' || errorData.type === 'TEMPLATE_PURCHASE_REQUIRED') {
          setPaymentData({
            resumeId: id,
            price: errorData.price || 9,
            message: errorData.message
          });
          setIsPaymentPopupOpen(true);
        } else {
          setUpgradeModalData(errorData);
          setIsUpgradeModalOpen(true);
        }
      } else {
        console.error('Download failed', err);
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Download Failed',
          message: 'An error occurred while generating your PDF. Please try again.'
        });
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleNavigate = async (path) => {
    // Auto-save doesn't block navigation anymore, but we show a different loader
    await handleSave(false, true);
    navigate(path);
  };

  const handlePersonalChange = (e) => {
    let { name, value } = e.target;

    // Numeric restriction for phone
    if (name === 'phone') {
      value = value.replace(/[^0-9+]/g, '');
    }

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


  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  const SelectedTemplate = TEMPLATE_MAP[resumeData.template] || TEMPLATE_MAP['ats-1'];

  return (
    <div className="builder-page" style={{ '--primary': accentColor }}>
      {/* Universal Premium Header */}
      <header className="builder-header">
        <div className="builder-header-container">
          <div className="header-left">
            <div className="header-brand" onClick={() => navigate('/')}>
              Resumify
            </div>
          </div>

          <div className="header-center">
            {/* Center area left empty for a cleaner look */}
          </div>

          <div className="header-right desktop-only">
            <ThemeToggle />
          </div>
        </div>
      </header>



      <div className="builder-body" style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr 1.2fr',
        gap: '1.5rem',
        padding: '1.5rem',
        maxWidth: '1800px',
        margin: '0 auto',
        alignItems: 'stretch',
        height: '100%'
      }}>
        {/* Column 1: Sidebar (Desktop) */}
        <aside className="card builder-sidebar desktop-only" style={{ padding: '1.5rem 1.25rem' }}>
          <h2 style={{ paddingLeft: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sections</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {steps.map((step, index) => (
              <button
                key={index}
                className={`builder-nav-item ${activeStep === index ? 'active' : ''}`}
                onClick={() => {
                  if (index <= activeStep) {
                    setActiveStep(index);
                    return;
                  }
                  let isValid = true;
                  for (let i = 0; i < index; i++) {
                    const stepErrors = getErrorsForStep(i);
                    if (Object.keys(stepErrors).length > 0) {
                      isValid = false;
                      setErrors(stepErrors);
                      setActiveStep(i);
                      break;
                    }
                  }
                  if (isValid) setActiveStep(index);
                }}
              >
                <span className="builder-nav-number">{index + 1}</span>
                {step}
              </button>
            ))}
          </div>
        </aside>

        {/* Column 2: Form Area */}
        <main className="card builder-form" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
          {/* Fixed Header Area */}
          <div className="builder-form-header" style={{ padding: '1.5rem 1.5rem 0 1.5rem', flexShrink: 0, borderBottom: '1px solid var(--surface-border)', zIndex: 20, background: 'var(--bg-color)' }}>
            {/* Mobile Action Bar */}
            <div className="mobile-action-bar mobile-only" style={{ marginBottom: '1rem', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-sm builder-mobile-btn" onClick={() => navigate('/dashboard')} disabled={isSaving}>Dashboard</button>
              <button className="btn btn-primary btn-sm builder-mobile-btn" onClick={() => handleSave(true)} disabled={isSaving || downloading}>{isSaving ? 'Saving...' : 'Save'}</button>
              <button className="btn btn-success btn-sm builder-mobile-btn" onClick={handleDownload} disabled={downloading || isSaving} style={{ background: '#10b981', borderColor: '#10b981', color: 'white' }}>{downloading ? '...' : 'Download'}</button>
            </div>

            {/* Progress Stepper */}
            <div className="builder-stepper" style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem' }}>
              {steps.map((step, index) => {
                const shortLabelsLocal = ['Basic', 'Edu', 'Exp', 'Skills', 'Proj', 'Lang'];
                return (
                  <div
                    key={index}
                    className={`step-item ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}
                    onClick={() => {
                      if (index === activeStep) return;
                      if (index < activeStep) {
                        setActiveStep(index);
                        formContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                      }
                      let isValid = true;
                      for (let i = 0; i < index; i++) {
                        const stepErrors = getErrorsForStep(i);
                        if (Object.keys(stepErrors).length > 0) {
                          isValid = false;
                          setErrors(stepErrors);
                          setActiveStep(i);
                          formContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                          break;
                        }
                      }
                      if (isValid) {
                        setActiveStep(index);
                        formContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{ cursor: 'pointer', gap: '4px' }}
                  >
                    <div className="step-dot">{activeStep > index ? '✓' : index + 1}</div>
                    <span className="step-label">{shortLabelsLocal[index]}</span>
                  </div>
                );
              })}
              <div className="stepper-line"></div>
            </div>

            {/* Step Title Header */}
            <div style={{ marginBottom: '1rem' }}>
              <div className="builder-step-header">
                <div className="builder-step-title-container">
                  <span className="builder-nav-number" style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', flexShrink: 0, fontSize: '0.9rem' }}>{activeStep + 1}</span>
                  <h2 className="builder-step-title" style={{ fontSize: '1.25rem', fontWeight: '800' }}>{steps[activeStep]}</h2>
                </div>

                {!profileApplied && (
                  <button
                    className="btn btn-secondary sync-profile-btn"
                    disabled={isSyncing}
                    onClick={async () => {
                      setIsSyncing(true);
                      try {
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
                        }
                      } catch (err) { console.error(err); } finally { setIsSyncing(false); }
                    }}
                  >
                    {isSyncing ? '⌛' : 'Sync Profile'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div
            className="builder-form-scroll-container"
            ref={formContainerRef}
            style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', scrollBehavior: 'smooth' }}
          >
            <div className="builder-form-content">
              {activeStep === 0 && (
                <div className="personal-details-form">
                  {/* Photo Upload Section */}
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.25rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(var(--primary-rgb), 0.04)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--surface-border)'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: 'var(--surface-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {resumeData.personalDetails?.photo ? (
                          <img src={resumeData.personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '1.2rem' }}>👤</span>
                        )}
                      </div>
                      {resumeData.personalDetails?.photo && (
                        <button 
                          onClick={removePhoto}
                          style={{
                            position: 'absolute',
                            top: '-3px',
                            right: '-3px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#ef4444',
                            color: 'white',
                            border: '1.5px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)' }}>Profile Photo</h4>
                        <span style={{ fontSize: '0.65rem', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>PHOTO LAYOUTS</span>
                      </div>
                      <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                        Visible only on photo-supported premium templates.
                      </p>
                      <input 
                        type="file" 
                        id="photo-upload-input" 
                        accept="image/*" 
                        onChange={handlePhotoUpload} 
                        style={{ display: 'none' }} 
                      />
                      <button 
                        className="btn btn-primary"
                        onClick={() => document.getElementById('photo-upload-input').click()}
                        style={{ 
                          padding: '0.35rem 0.85rem', 
                          fontSize: '0.75rem', 
                          borderRadius: '6px',
                          height: 'auto',
                          minHeight: 'unset'
                        }}
                      >
                        {resumeData.personalDetails?.photo ? 'Change' : 'Upload'}
                      </button>
                    </div>
                  </div>

                  <div className="responsive-form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name <span className="required-star">*</span></label>
                      <input name="fullName" className={`form-input ${errors.fullName ? 'is-invalid' : ''}`} value={resumeData.personalDetails?.fullName || ''} onChange={handlePersonalChange} />
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Job Title <span className="required-star">*</span></label>
                      <input name="jobTitle" className={`form-input ${errors.jobTitle ? 'is-invalid' : ''}`} value={resumeData.personalDetails?.jobTitle || ''} onChange={handlePersonalChange} />
                      {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span className="required-star">*</span></label>
                      <input name="email" type="email" className={`form-input ${errors.email ? 'is-invalid' : ''}`} value={resumeData.personalDetails?.email || ''} onChange={handlePersonalChange} />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span className="required-star">*</span></label>
                      <input name="phone" type="tel" className={`form-input ${errors.phone ? 'is-invalid' : ''}`} value={resumeData.personalDetails?.phone || ''} onChange={handlePersonalChange} />
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
                          onApply={(val) => setResumeData({ ...resumeData, hasUsedAI: true, personalDetails: { ...resumeData.personalDetails, summary: val } })}
                          type="summary"
                          contextData={{ jobTitle: resumeData.personalDetails?.jobTitle }}
                        />
                      </div>
                      <textarea name="summary" className="form-input" rows="5" value={resumeData.personalDetails?.summary || ''} onChange={handlePersonalChange}></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && <EducationForm education={resumeData.education} errors={errors} onChange={(idx, k, v) => updateArrayItem('education', idx, k, v)} onAdd={() => addArrayItem('education', { degree: '', school: '', startDate: '', endDate: '', description: '' })} onRemove={(idx) => removeArrayItem('education', idx)} />}
              {activeStep === 2 && <ExperienceForm experience={resumeData.experience} errors={errors} onChange={(idx, k, v) => updateArrayItem('experience', idx, k, v)} onAdd={() => addArrayItem('experience', { jobTitle: '', company: '', startDate: '', endDate: '', description: '' })} onRemove={(idx) => removeArrayItem('experience', idx)} />}
              {activeStep === 3 && <SkillsForm skills={resumeData.skills} errors={errors} onChange={(idx, k, v) => updateArrayItem('skills', idx, k, v)} onAdd={() => addArrayItem('skills', { name: '', level: 'Intermediate' })} onRemove={(idx) => removeArrayItem('skills', idx)} />}
              {activeStep === 4 && <ProjectsForm projects={resumeData.projects} errors={errors} onChange={(idx, k, v) => updateArrayItem('projects', idx, k, v)} onAdd={() => addArrayItem('projects', { name: '', link: '', technologies: '', description: '' })} onRemove={(idx) => removeArrayItem('projects', idx)} />}
              {activeStep === 5 && <LanguagesForm languages={resumeData.languages} errors={errors} onChange={(idx, k, v) => updateArrayItem('languages', idx, k, v)} onAdd={() => addArrayItem('languages', { name: '', level: 3 })} onRemove={(idx) => removeArrayItem('languages', idx)} />}
            </div>

            {/* Navigation Controls */}
            <div className="builder-nav-controls" style={{ padding: '1.5rem 0', marginTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => { setActiveStep(activeStep - 1); formContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={activeStep === 0}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back
              </button>

              {activeStep < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={() => { if (validateStep()) { setActiveStep(activeStep + 1); formContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
                  <span className="nav-btn-text">Next: {steps[activeStep + 1]}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => handleSave(true, false, true)}>
                  Save & Complete
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Column 3: Live Preview Panel (Desktop + Mobile Toggle) */}
        <div className={`builder-preview-panel ${showMobilePreview ? 'mobile-show' : ''}`}>
          {/* Mac-style Window Header (Image 2 style) */}
          <div className="builder-preview-header">
            {/* Left: Window Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="builder-preview-dot red"></span>
              <span className="builder-preview-dot yellow"></span>
              <span className="builder-preview-dot green"></span>
            </div>

            {/* Center: Title */}
            <div className="builder-preview-title">LIVE PREVIEW</div>

            {/* Right: Icon Actions */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>



              {/* Back to Templates (Arrow Icon) */}
              <button
                title="Back to Templates"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => navigate('/templates')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>

              {/* Save (Icon) */}
              <button
                title="Save Changes"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleSave()}
                disabled={isSaving}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.color = '#10b981';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                {isSaving ? (
                  <div className="loading-spinner-small" style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                )}
              </button>

              {/* Download (Icon) */}
              <button
                title="Download PDF"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={handleDownload}
                disabled={downloading}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.color = '#3b82f6';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                {downloading ? (
                  <div className="loading-spinner-small" style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                )}
              </button>

              {/* Mobile Back Button */}
              <button
                className="mobile-only"
                title="Close Preview"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setShowMobilePreview(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Scrollable Preview Content */}
          <div className="builder-preview-scroll" ref={previewContainerRef}>
            <div
              className="builder-preview-scaler"
              style={{
                transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'center'
              }}
            >
              <Suspense fallback={<div className="loading-template">Preparing Preview...</div>}>
                <SelectedTemplate 
                  ref={componentRef} 
                  data={{ ...resumeData, onPhotoClick: () => document.getElementById('photo-upload-input')?.click() }} 
                  config={{ accentColor }} 
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Floating Mobile Toggle */}
        <button
          id="mobile-preview-toggle"
          className="mobile-only"
          onClick={() => setShowMobilePreview(true)}
          title="Quick Preview"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 25px rgba(var(--primary-rgb), 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(var(--primary-rgb), 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(var(--primary-rgb), 0.4)';
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>


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

        #mobile-preview-toggle {
          display: none !important;
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
            justify-content: center;
            gap: 8px;
            width: 120px !important;
            height: 36px !important;
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid var(--surface-border);
            color: var(--text-main);
            padding: 0;
            border-radius: 8px;
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          .btn-close-mobile:hover {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
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
            justify-content: flex-end !important;
            width: auto !important;
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
          .builder-form-header {
            padding: 1rem 1rem 0 1rem !important;
          }
          .builder-form-scroll-container {
            padding: 1rem !important;
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
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        data={upgradeModalData}
      />
      <PaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        onSuccess={handleDownload}
        {...paymentData}
      />
    </div>
  );
}

export default Builder;
