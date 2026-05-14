import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { generateProfessionalPDF } from '../../utils/pdfGenerator';
import UpgradeModal from '../../components/UpgradeModal';
import PaymentPopup from '../../components/PaymentPopup';
import { TEMPLATE_MAP } from '../../config/templateMap';
import ATSScorePanel from '../../components/ATSScorePanel';
import { LucideZap, LucideChevronLeft, LucideDownload, LucideMaximize2, LucideLayout } from 'lucide-react';

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
  const [showATS, setShowATS] = useState(true);
  const componentRef = useRef();
  const previewContainerRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 1024);
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  useLayoutEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      const container = previewContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      if (!containerWidth || !containerHeight) return;

      const targetWidth = 794; 
      const targetHeight = 1123;

      const scaleX = (containerWidth - (isNarrow ? 20 : (isMaximized ? 40 : 100))) / targetWidth;
      const scaleY = (containerHeight - (isNarrow ? 20 : (isMaximized ? 40 : 100))) / targetHeight;

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
  }, [loading, resumeData, showATS, isNarrow, isMaximized]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('resumify_user') || '{}');
        if (!storedUser) return navigate('/login');

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`);
        setResumeData(res.data);
      } catch (err) {
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const handleDownload = async () => {
    if (!user) return navigate('/login');
    setDownloading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resumes/download/${id}`);

      if (res.data.allowed) {
        const updatedUser = { ...user, download_count: res.data.download_count };
        localStorage.setItem('resumify_user', JSON.stringify(updatedUser));

        if (componentRef.current) {
          await generateProfessionalPDF(componentRef.current, resumeData);
        }
      }
    } catch (err) {
      if (err.response?.status === 402 || err.response?.status === 403) {
        const errorData = err.response.data;
        if (errorData.type === 'PAYMENT_REQUIRED' || errorData.type === 'TEMPLATE_PURCHASE_REQUIRED' || err.response.status === 402 || errorData.type === 'LIMIT_REACHED' || err.response.status === 403) {
          setPaymentData({
            resumeId: id,
            price: 9,
            message: 'Pay ₹9 to download your PDF instantly.',
            templateName: errorData.templateName || resumeData.template || 'Current'
          });
          setIsPaymentPopupOpen(true);
        } else {
          // Other potential errors
          alert(errorData.message || 'An error occurred.');
        }
      } else {
        console.error('Download failed', err);
        alert('Download failed. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleDataChange = (newData) => {
    setResumeData(newData);
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader-ring"></div>
        <p style={{ marginTop: '1.5rem', fontWeight: '800', color: '#111827', letterSpacing: '0.05em' }}>PREPARING STUDIO...</p>
      </div>
    </div>
  );
  
  if (!resumeData) return <div style={{ padding: '2rem', textAlign: 'center', background: '#f3f3f3', minHeight: '100vh' }}>Resume not found.</div>;

  const SelectedTemplate = TEMPLATE_MAP[resumeData.template] || TEMPLATE_MAP['ats-1'];

  return (
    <div style={{ 
      background: '#f1f5f9', 
      minHeight: '100vh', 
      width: '100%', 
      padding: isNarrow ? '0' : '1.25rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-green {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .loader-ring-small {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .loader-ring {
          width: 60px;
          height: 60px;
          border: 5px solid rgba(0,0,0,0.05);
          border-top: 5px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .premium-shadow {
          box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Background Studio Gradients */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 1, height: isNarrow ? '100vh' : 'calc(100vh - 2.5rem)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modern Studio Toolbar */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(30px)',
          padding: isNarrow ? '0.75rem 1rem' : '0.85rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderRadius: isNarrow ? '0' : '24px',
          margin: isNarrow ? '0 0 1px 0' : '0 0 1.25rem 0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          border: '1px solid rgba(255,255,255,0.8)',
          flexShrink: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => navigate(`/builder/${id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: isMobile ? '0.6rem' : '0.6rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(0,0,0,0.06)',
                background: '#fff',
                color: '#111827',
                fontSize: '0.75rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
              }}
            >
              <LucideChevronLeft size={16} strokeWidth={3} />
              {!isMobile && <span>{isNarrow ? 'Edit' : 'Back to Builder'}</span>}
            </button>

            <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)', margin: '0 0.25rem', flexShrink: 0 }}></div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: isNarrow ? '0 1rem' : '0 1.75rem',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: '1000',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                border: 'none',
                opacity: downloading ? 0.7 : 1,
                flexShrink: 0,
                boxShadow: '0 12px 30px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.2, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!downloading) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(37, 99, 235, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (!downloading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.25)';
                }
              }}
            >
               <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shimmer 2.5s infinite'
              }} />
              {downloading ? (
                <div className="loader-ring-small"></div>
              ) : (
                <LucideDownload size={16} strokeWidth={3} />
              )}
              {!isMobile && <span>{downloading ? 'Processing' : 'Download PDF'}</span>}
              {isMobile && <span>{downloading ? '...' : 'PDF'}</span>}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={() => setShowATS(!showATS)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: isMobile ? '0.6rem 0.8rem' : '0.6rem 1.5rem',
                borderRadius: '40px',
                background: showATS ? 'rgba(37, 99, 235, 0.08)' : '#fff',
                color: showATS ? '#2563eb' : '#64748b',
                border: '2px solid',
                borderColor: showATS ? 'rgba(37, 99, 235, 0.15)' : 'rgba(0,0,0,0.06)',
                fontSize: '0.75rem',
                fontWeight: '1000',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.2, 1, 0.3, 1)',
                boxShadow: showATS ? '0 8px 25px rgba(37, 99, 235, 0.12)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 if (!showATS) e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 if (!showATS) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
              }}
            >
              <LucideZap size={16} strokeWidth={3} fill={showATS ? "#2563eb" : "none"} />
              {!isMobile && <span>{showATS ? 'Analysis On' : 'Analyze'}</span>}
              {isMobile && <span>{showATS ? 'On' : 'ATS'}</span>}
            </button>

            <div style={{ display: 'flex', gap: '8px', padding: '10px', background: 'rgba(0,0,0,0.03)', borderRadius: '14px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255,95,86,0.3)' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255,189,46,0.3)' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', boxShadow: '0 2px 4px rgba(39,201,63,0.3)', animation: 'pulse-green 2s infinite' }}></div>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          flex: 1, 
          gap: isNarrow ? '0' : '1.5rem', 
          overflow: 'hidden',
          flexDirection: isNarrow ? 'column' : 'row',
          paddingBottom: isNarrow ? '0' : '0.5rem'
        }}>
          
          {/* Main Viewport Container */}
          <div 
            ref={previewContainerRef}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              padding: isNarrow ? '1rem 0.5rem' : '3rem 2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'auto',
              position: 'relative',
              borderRadius: isNarrow ? '0' : '32px',
              border: isNarrow ? 'none' : '1px solid rgba(255,255,255,0.6)',
              backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
              backgroundSize: '32px 32px',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
            }}
          >
            {/* Canvas Shadow Layer */}
            <div style={{
              transform: `scale(${scaleFactor})`,
              transformOrigin: 'top center',
              transition: 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.25), 0 20px 40px -10px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              backgroundColor: '#fff',
              position: 'relative',
              zIndex: 5
            }}>
              <SelectedTemplate 
                ref={componentRef} 
                data={resumeData} 
                onChange={handleDataChange}
              />
            </div>

          </div>

          {/* Premium Analysis Panel */}
          <ATSScorePanel 
            resumeData={resumeData} 
            isVisible={showATS} 
          />
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
        onSuccess={handleDownload}
        {...paymentData}
      />
    </div>
  );
};

export default Preview;
