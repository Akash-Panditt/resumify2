import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import ThemeToggle from '../../components/ThemeToggle';
import UpgradeModal from '../../components/UpgradeModal';
import PaymentPopup from '../../components/PaymentPopup';
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
};

const PLAN_LIMITS = { free: 5, basic: 50, pro: Infinity };

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalData, setUpgradeModalData] = useState(null);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const componentRef = useRef();
  const previewContainerRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        const availableWidth = containerWidth - 40; // 20px padding each side
        const newScale = Math.min(availableWidth / 816, 1);
        setScaleFactor(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [loading]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('resumify_user') || '{}');
        if (!storedUser?.token) return navigate('/login');
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        setResumeData(res.data);
      } catch (err) {
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: resumeData?.title || 'Resume_Export',
  });

  const handleDownload = async () => {
    if (!user?.token) return navigate('/login');
    setDownloading(true);
    try {
      // Call download tracking endpoint first
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resumes/download/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (res.data.allowed) {
        // Update local user download count
        const updatedUser = { ...user, download_count: res.data.download_count };
        localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
        
        // Track the recent download timestamp locally
        const dlKey = `resumify_downloads_${user.id}`;
        const downloads = JSON.parse(localStorage.getItem(dlKey) || '[]');
        // Remove duplicate if it was already downloaded before
        const filtered = downloads.filter(d => d.id !== id);
        filtered.unshift({ id, downloadedAt: new Date().toISOString() });
        // Keep last 10
        localStorage.setItem(dlKey, JSON.stringify(filtered.slice(0, 10)));

        handlePrint();
      }
    } catch (err) {
      if (err.response?.status === 403) {
        const errorData = err.response.data;
        if (errorData.type === 'TEMPLATE_PURCHASE_REQUIRED') {
          setPaymentData({
            templateId: errorData.templateId,
            templateName: resumeData.template,
            price: errorData.price
          });
          setIsPaymentPopupOpen(true);
        } else {
          setUpgradeModalData(errorData);
          setIsUpgradeModalOpen(true);
        }
      } else {
        console.error('Download failed', err);
        alert('Download failed. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Preview...</div>;
  if (!resumeData) return <div style={{ padding: '2rem', textAlign: 'center' }}>Resume not found.</div>;

  const TemplateComponent = TEMPLATE_MAP[resumeData.template] || ModernTemplate;
  const maxDownloads = PLAN_LIMITS[user?.plan] || 1;
  const currentDownloads = user?.download_count || 0;
  const downloadsRemaining = Math.max(0, maxDownloads - currentDownloads);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh' }}>
      
      {/* Action Bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', marginBottom: '0.25rem' }}>{resumeData.title}</h1>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            Template: <span className="badge badge-primary">{resumeData.template}</span> <span className="hide-on-mobile">•</span> <span>Updated: {new Date(resumeData.updatedAt).toLocaleDateString()}</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: '1 1 auto' }}>
            <ThemeToggle />
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: 'var(--radius-full)', 
              background: downloadsRemaining <= 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
              border: `1px solid ${downloadsRemaining <= 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}` 
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Downloads Left:</span>
              <span style={{ 
                fontSize: '0.95rem', 
                fontWeight: '700', 
                color: downloadsRemaining <= 0 ? 'var(--error)' : 'var(--success)',
              }}>
                {maxDownloads === Infinity ? '∞' : downloadsRemaining}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end', flex: '1 1 100%' }}>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => navigate(`/builder/${id}`)}>Edit</button>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleDownload} 
              disabled={downloading}
              style={{ flex: 2 }}
            >
              {downloading ? 'Processing...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Template Viewer */}
      <div 
        ref={previewContainerRef}
        style={{ 
          flex: 1,
          padding: '2rem 1rem', 
          backgroundColor: 'rgba(15, 23, 42, 0.2)', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--surface-border)',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <div style={{ 
          transform: `scale(${scaleFactor})`, 
          transformOrigin: 'top center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.3s ease-out'
        }}>
           <TemplateComponent ref={componentRef} data={resumeData} />
        </div>
      </div>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        data={upgradeModalData} 
      />
      <PaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        onSuccess={handleDownload} // Retry download after payment
        {...paymentData}
      />
    </div>
  );
};

export default Preview;
