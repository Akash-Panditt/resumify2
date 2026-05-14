import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LucideCheckCircle, LucideXCircle, LucideZap, LucideInfo, LucideChevronDown, LucideChevronUp, LucideLoader2 } from 'lucide-react';

const ATSScorePanel = ({ resumeData, isVisible }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState('score');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateLocalScore = (data) => {
    let score = 0;
    const p = data.personalDetails || {};
    if (p.fullName?.length > 3) score += 5;
    if (p.email?.includes('@')) score += 5;
    if (p.phone?.length > 7) score += 5;
    if (p.summary?.length > 50) score += 10;
    
    const exp = data.experience || [];
    score += Math.min(30, exp.length * 10);
    
    const skills = data.skills || [];
    score += Math.min(20, skills.length * 2);
    
    const edu = data.education || [];
    if (edu.length > 0) score += 15;
    
    const projs = data.projects || [];
    if (projs.length > 0) score += 10;
    
    return Math.min(100, score);
  };

  useEffect(() => {
    let timeoutId;
    if (isVisible && resumeData) {
      // ALWAYS update local score instantly for immediate feedback
      const localScore = calculateLocalScore(resumeData);
      setAnalysis(prev => ({ 
        ...(prev || {}), 
        score: localScore,
        // Preserve other properties if they exist, or set placeholders
        aiAnalysis: prev?.aiAnalysis || "Syncing with AI...",
        aiActionPoints: prev?.aiActionPoints || [],
        breakdown: prev?.breakdown || []
      }));
      
      timeoutId = setTimeout(() => {
        fetchAnalysis();
      }, 1500);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible, resumeData]);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ats/analyze-resume`, resumeData);
      setAnalysis(res.data);
    } catch (err) {
      console.error('ATS Analysis failed', err);
      setAnalysis({
        score: calculateLocalScore(resumeData),
        aiAnalysis: "Deep analysis unavailable. Showing heuristic score.",
        aiActionPoints: ["Complete all sections", "Add more keywords", "Check contact info"],
        breakdown: []
      });
    } finally {
      setLoading(false);
    }
  };

  const getBreakdown = (data) => {
    return [
      { item: 'Contact Info', found: !!(data.personalDetails?.email && data.personalDetails?.phone) },
      { item: 'Summary', found: !!(data.personalDetails?.summary?.length > 30) },
      { item: 'Experience', found: !!(data.experience?.length > 0) },
      { item: 'Skills', found: !!(data.skills?.length > 2) },
      { item: 'Education', found: !!(data.education?.length > 0) },
      { item: 'Projects/Extras', found: !!(data.projects?.length > 0 || data.languages?.length > 0) }
    ];
  };

  if (!isVisible) return null;

  const currentBreakdown = analysis?.breakdown?.length ? analysis.breakdown : getBreakdown(resumeData);

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Success
    if (score >= 50) return '#f59e0b'; // Warning
    return '#ef4444'; // Error
  };

  const panelStyles = {
    width: isMobile ? '100%' : '400px',
    height: isMobile ? '75vh' : '100%',
    position: isMobile ? 'absolute' : 'relative',
    bottom: isMobile ? 0 : 'auto',
    right: isMobile ? 0 : 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(30px)',
    borderLeft: isMobile ? 'none' : '1px solid rgba(243, 244, 246, 0.8)',
    borderTop: isMobile ? '1px solid rgba(243, 244, 246, 0.8)' : 'none',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    animation: isMobile ? 'slideUp 0.5s ease-out' : 'slideInRight 0.6s cubic-bezier(0.2, 1, 0.3, 1)',
    zIndex: 100,
    boxShadow: isMobile ? '0 -15px 50px rgba(0,0,0,0.15)' : 'none',
    borderTopLeftRadius: isMobile ? '32px' : '0',
    borderTopRightRadius: isMobile ? '32px' : '0',
  };

  return (
    <div className="ats-score-panel" style={panelStyles}>
      <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: '900', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', letterSpacing: '-0.01em' }}>
            <div style={{ padding: '6px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LucideZap size={18} color="#2563eb" fill="#2563eb" />
            </div>
            ATS Analysis
          </h2>
          <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.3rem', fontWeight: '600' }}>AI-powered career optimization</p>
        </div>
      </div>

      {(!analysis && loading) ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
          <div className="loader-ring"></div>
          <p style={{ marginTop: '1.5rem', fontWeight: '800', fontSize: '0.85rem', color: '#111827' }}>Decoding Resume...</p>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.5rem', maxWidth: '220px', lineHeight: '1.5' }}>Our AI is cross-referencing your experience with industry benchmarks.</p>
        </div>
      ) : (error && !analysis) ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.1)' }}>
            <LucideXCircle size={28} color="#ef4444" />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: '700' }}>{error}</p>
          <button onClick={fetchAnalysis} style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: '#111827', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '800', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>Try Again</button>
        </div>
      ) : !analysis ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <LucideLoader2 size={30} className="animate-spin" color="#2563eb" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', position: 'relative' }}>
          {loading && (
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px',
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '20px',
              zIndex: 10,
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
              animation: 'slideDown 0.3s ease-out'
            }}>
               <LucideLoader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
               <span style={{ fontSize: '0.6rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Syncing...</span>
            </div>
          )}

          {/* Section Verification (MOVED TO TOP AND NON-CLICKABLE) */}
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', background: '#fff', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LucideCheckCircle size={18} color="#10b981" />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '900', color: '#111827', letterSpacing: '-0.01em' }}>Integrity Scan</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {currentBreakdown.map((item, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.6rem', 
                  padding: '0.75rem', 
                  background: item.found ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                  borderRadius: '12px',
                  border: `1px solid ${item.found ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`,
                }}>
                  {item.found ? <LucideCheckCircle size={12} color="#10b981" /> : <LucideXCircle size={12} color="#ef4444" />}
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: item.found ? '#065f46' : '#991b1b', textTransform: 'uppercase' }}>{item.item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Score Header */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '24px', 
            padding: '2rem 1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(0,0,0,0.03)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            position: 'relative',
            overflow: 'hidden'
          }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: `linear-gradient(90deg, transparent, ${getScoreColor(analysis.score)}, transparent)` }}></div>
            
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto' }}>
              <svg width="130" height="130" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="52" 
                  fill="none" 
                  stroke={getScoreColor(analysis.score)} 
                  strokeWidth="8" 
                  strokeDasharray="326.7" 
                  strokeDashoffset={326.7 - (326.7 * analysis.score) / 100}
                  transform="rotate(-90 60 60)"
                  style={{ 
                    transition: 'stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1)', 
                    strokeLinecap: 'round',
                    filter: `drop-shadow(0 0 6px ${getScoreColor(analysis.score)}60)`
                  }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '1000', color: '#111827', letterSpacing: '-0.04em', lineHeight: '1' }}>{analysis.score}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#9ca3af', display: 'block', textTransform: 'uppercase' }}>Score</span>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '1.5rem', 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem', 
              borderRadius: '50px', 
              fontSize: '0.7rem', 
              fontWeight: '900', 
              background: `${getScoreColor(analysis.score)}10`,
              color: getScoreColor(analysis.score),
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              border: `1px solid ${getScoreColor(analysis.score)}20`,
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getScoreColor(analysis.score), boxShadow: `0 0 10px ${getScoreColor(analysis.score)}` }}></div>
              {analysis.score >= 80 ? 'ATS Master' : analysis.score >= 50 ? 'Developing' : 'Incomplete'}
            </div>
          </div>

          {/* AI Assessment - MOVED UP FOR VISIBILITY */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.02) 100%)', 
            borderRadius: '24px', 
            padding: '1.75rem', 
            border: '1px solid rgba(37, 99, 235, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.05)'
          }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '1000', color: '#1e40af', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <div style={{ padding: '6px', background: '#2563eb', borderRadius: '8px', display: 'flex' }}>
                <LucideZap size={14} color="#fff" fill="#fff" />
              </div>
              Score Rationale
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#1e3a8a', lineHeight: '1.7', margin: 0, fontWeight: '600' }}>
              {analysis.aiAnalysis || "Our AI is evaluating your content structure. Complete your professional summary and experience for a deeper assessment."}
            </p>
          </div>

          {/* Missing Keywords Section */}
          {analysis.missingKeywords?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#111827', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <LucideInfo size={16} color="#f59e0b" />
                Missing Keywords
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {analysis.missingKeywords.map((keyword, idx) => (
                  <span key={idx} style={{ 
                    padding: '0.4rem 0.8rem', 
                    background: '#fef3c7', 
                    color: '#92400e', 
                    borderRadius: '10px', 
                    fontSize: '0.65rem', 
                    fontWeight: '800',
                    border: '1px solid #fde68a'
                  }}>
                    + {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Roadmap */}
          {analysis.aiActionPoints?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#111827', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <LucideZap size={16} color="#2563eb" />
                Improvement Roadmap
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {analysis.aiActionPoints.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#2563eb', 
                      color: '#fff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: '900',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>{idx + 1}</div>
                    <p style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.5', margin: 0, fontWeight: '600' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .loader-ring {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0,0,0,0.05);
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ATSScorePanel;
