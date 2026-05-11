import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import UpgradeModal from '../../components/UpgradeModal';
import PaymentPopup from '../../components/PaymentPopup';
import { TEMPLATE_MAP } from '../../config/templateMap';

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

  useLayoutEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      const container = previewContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      if (!containerWidth || !containerHeight) return;

      // A4 dimensions: 210mm x 297mm (approx 794px x 1123px at 96 DPI)
      const targetWidth = 794;
      const targetHeight = 1123;

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
  }, [loading, resumeData]);

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
          setPaymentData({ resumeId: id, price: errorData.price || 9, message: errorData.message });
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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', background: '#f3f3f3', minHeight: '100vh' }}>Loading Preview...</div>;
  if (!resumeData) return <div style={{ padding: '2rem', textAlign: 'center', background: '#f3f3f3', minHeight: '100vh' }}>Resume not found.</div>;

  return (
    <div style={{ background: '#f3f3f3', minHeight: '100vh', width: '100%', padding: '2rem 1rem' }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h1 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Preview</h1>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              onClick={() => navigate(`/builder/${id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0 1.25rem',
                height: '38px',
                borderRadius: '12px',
                border: '1px solid rgba(17, 24, 39, 0.1)',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#111827',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(17, 24, 39, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(17, 24, 39, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(17, 24, 39, 0.1)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0 1.5rem',
                height: '38px',
                borderRadius: '12px',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                background: 'rgba(37, 99, 235, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#2563eb',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                opacity: downloading ? 0.7 : 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!downloading) {
                  e.currentTarget.style.background = 'rgba(37, 99, 235, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {downloading ? (
                <div style={{ width: '14px', height: '14px', border: '2px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
              {downloading ? 'Preparing...' : 'Download'}
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div
          ref={previewContainerRef}
          style={{
            flex: 1,
            backgroundColor: '#e5e7eb',
            padding: '3rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '800px',
            overflow: 'auto'
          }}
        >
          <div style={{
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top center',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            width: '816px', // Matching Template width
            height: '1056px', // Matching Template min-height
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden' // Prevent overlapping ghost edges
          }}>
            <React.Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading Template...</div>}>
              {(() => {
                const SelectedTemplate = TEMPLATE_MAP[resumeData.template] || TEMPLATE_MAP['ats-1'];
                return <SelectedTemplate ref={componentRef} data={resumeData} />;
              })()}
            </React.Suspense>
          </div>
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

