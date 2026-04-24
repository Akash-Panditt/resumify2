import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ATSChecker = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setResults(null);
        setError('');

        const name = selectedFile.name.toLowerCase();
        const type = selectedFile.type;
        
        // Comprehensive check for PDF/DOCX
        const isPdf = type === 'application/pdf' || name.endsWith('.pdf');
        const isDocx = type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                       type === 'application/msword' || 
                       type === 'application/x-zip-compressed' || // Common for DOCX on some systems
                       name.endsWith('.docx') || 
                       name.endsWith('.doc');

        if (isPdf || isDocx) {
            setFile(selectedFile);
        } else {
            setError('Please upload a valid PDF or DOCX file.');
            setFile(null);
        }
        
        // Reset input so same file can be re-selected if cleared
        e.target.value = '';
    };

    const handleClear = () => {
        setFile(null);
        setResults(null);
        setError('');
    };

    const handleUpload = async (e) => {
        if (e) e.preventDefault();
        
        if (!file) {
            setError('Please select a resume file first.');
            return;
        }

        if (!user?.token) {
            setError('Please log in to use the ATS Core Checker.');
            return;
        }

        setLoading(true);
        setResults(null);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ats/check`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setResults(res.data);
            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                setError('Session expired. Please re-login.');
            } else if (status === 413) {
                setError('File too large (Max 5MB).');
            } else {
                setError(err.response?.data?.message || 'Analysis failed. Please try a different PDF or DOCX.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar user={user} />
            
            <div style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>

            <main style={{ marginTop: '3rem' }}>
                <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'linear-gradient(145deg, var(--surface) 0%, rgba(30, 30, 40, 0.4) 100%)' }}>
                    <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: '800' }}>Optimize Your Resume for Success</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto 2rem' }}>
                        Get an instant ATS compatibility score and professional AI-driven feedback by uploading your resume.
                    </p>

                    <form onSubmit={handleUpload} style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <label 
                            htmlFor="resume-upload"
                            style={{ 
                                border: file ? '2px solid var(--primary)' : '2px dashed var(--surface-border)', 
                                padding: '3.5rem 2rem', 
                                borderRadius: 'var(--radius-xl)',
                                cursor: 'pointer',
                                backgroundColor: file ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                outline: 'none'
                            }}
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--primary)'; }}
                            onDragLeave={(e) => { e.preventDefault(); if (!file) e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
                            onDrop={(e) => {
                                e.preventDefault();
                                if (file || loading) return;
                                const droppedFile = e.dataTransfer.files?.[0];
                                if (droppedFile) {
                                    handleFileChange({ target: { files: [droppedFile] } });
                                }
                            }}
                        >
                            <input 
                                type="file" 
                                id="resume-upload" 
                                hidden 
                                accept=".pdf,.docx,.doc" 
                                onChange={handleFileChange} 
                                disabled={loading}
                            />
                            
                            {file ? (
                                <div style={{ animation: 'scaleIn 0.3s ease-out' }}>
                                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M13 2V9H20" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--success)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid var(--surface)' }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    </div>
                                    <p style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem', wordBreak: 'break-all' }}>{file.name}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{(file.size / 1024).toFixed(1)} KB</p>
                                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClear(); }} className="btn-link" style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: 'var(--error)', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>Change File</button>
                                </div>
                            ) : (
                                <div style={{ transition: 'transform 0.3s' }}>
                                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="14" width="20" height="8" rx="2" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3"/>
                                            <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><animate attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2s" repeatCount="indefinite" /></path>
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.5rem' }}>Click or drag to upload your resume</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Supports PDF and DOCX (Max 5MB)</p>
                                </div>
                            )}
                        </label>

                        {error && (
                            <div style={{ color: 'var(--error)', marginTop: '2rem', fontSize: '0.95rem', padding: '1rem 1.5rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'shake 0.4s ease-in-out' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={`btn btn-primary ${file && !loading ? 'btn-pulse' : ''}`}
                            style={{ 
                                width: '100%', 
                                marginTop: '2rem', 
                                padding: '1.25rem', 
                                fontSize: '1.1rem', 
                                fontWeight: '700',
                                borderRadius: 'var(--radius-lg)',
                                display: results ? 'none' : 'flex',
                                justifyContent: 'center'
                            }}
                            disabled={!file || loading}
                        >
                            {loading ? (
                                <>
                                    <div className="loader-mini" style={{ marginRight: '1rem' }}></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    Check My Score
                                </>
                            )}
                        </button>
                        
                        {results && (
                            <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', fontWeight: '600' }} onClick={handleClear}>Analyze Another Resume</button>
                        )}
                    </form>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', marginTop: '4rem', animation: 'fadeIn 0.5s ease-in' }}>
                        <div className="loader" style={{ margin: '0 auto 2rem' }}></div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Our AI is scanning your resume...</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>We're checking keywords, formatting, and industry alignment.</p>
                    </div>
                )}

                {results && (
                    <div className="responsive-grid" style={{ marginTop: '3rem', animation: 'slideUp 0.6s ease-out' }}>
                        {/* Score Section */}
                        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>ATS Score</h3>
                            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0rem auto 1.5rem' }}>
                                <svg width="180" height="180" viewBox="0 0 180 180">
                                    <circle cx="90" cy="90" r="80" fill="none" stroke="var(--surface-border)" strokeWidth="12" />
                                    <circle 
                                        cx="90" 
                                        cy="90" 
                                        r="80" 
                                        fill="none" 
                                        stroke={results.score > 70 ? '#10b981' : results.score > 40 ? '#f59e0b' : '#ef4444'} 
                                        strokeWidth="12" 
                                        strokeDasharray={502.65}
                                        strokeDashoffset={502.65 - (502.65 * results.score) / 100}
                                        transform="rotate(-90 90 90)"
                                        style={{ transition: 'stroke-dashoffset 1.5s ease-out', strokeLinecap: 'round' }}
                                    />
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.8rem', fontWeight: '800' }}>
                                    {results.score}%
                                </div>
                            </div>
                            <div style={{ padding: '0.5rem 1rem', borderRadius: '50px', background: results.score > 70 ? 'rgba(16, 185, 129, 0.1)' : results.score > 40 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: results.score > 70 ? '#10b981' : results.score > 40 ? '#f59e0b' : '#ef4444', fontWeight: '700', alignSelf: 'center' }}>
                                {results.score > 80 ? 'ATS Master' : results.score > 60 ? 'Professional' : results.score > 30 ? 'Basic' : 'Substandard'}
                            </div>
                        </div>

                        {/* Analysis Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card">
                                <h3>Section Verification</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>We check if ATS parsers can identify the following essential information:</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                                    {results.breakdown.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-color)', border: '1px solid var(--surface-border)' }}>
                                            <span style={{ 
                                                width: '24px', 
                                                height: '24px', 
                                                borderRadius: '50%', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                background: item.found ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                color: item.found ? '#10b981' : '#ef4444',
                                                fontSize: '0.7rem'
                                            }}>
                                                {item.found ? '✓' : '✗'}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {results.suggestions.length > 0 && (
                                <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>
                                    <h3 style={{ color: 'var(--error)', marginBottom: '1.2rem' }}>Critical Suggestions</h3>
                                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {results.suggestions.map((s, i) => (
                                            <li key={i} style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {results.aiAnalysis && (
                                <div className="card" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
                                    <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <span style={{ color: 'var(--primary)' }}>✨</span> AI Career Insights
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-main)', opacity: 0.9 }}>{results.aiAnalysis}</p>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>Actionable Roadmap:</h4>
                                        <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {results.aiActionPoints.map((ap, i) => (
                                                <li key={i} style={{ fontSize: '0.925rem', lineHeight: '1.5', fontStyle: 'italic' }}>{ap}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .loader {
                    border: 4px solid rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                    border-top: 4px solid var(--primary);
                    width: 60px;
                    height: 60px;
                    animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }
                .loader-mini {
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    border-top: 2px solid white;
                    width: 18px;
                    height: 18px;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
            </div>
        </div>
    );
};

export default ATSChecker;
