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
                },
                timeout: 30000 
            });
            setResults(res.data);
            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
        } catch (err) {
            console.error('ATS Error:', err);
            const status = err.response?.status;
            if (status === 401) {
                setError('Session expired. Please re-login.');
            } else if (status === 413) {
                setError('File too large (Max 5MB).');
            } else if (err.code === 'ECONNABORTED') {
                setError('Analysis timed out. Please try a smaller file.');
            } else {
                setError(err.response?.data?.message || 'Analysis failed. Check your connection or file type.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar user={user} />
            
            <div className="ats-container">
                <main className="ats-main-content">
                    <div className="card ats-card">
                        <h2 className="text-gradient ats-title">Optimize Your Resume for Success</h2>
                        <p className="ats-subtitle">
                            Get an instant ATS compatibility score and professional AI-driven feedback by uploading your resume.
                        </p>

                        <form onSubmit={handleUpload} className="ats-form">
                            <label 
                                htmlFor="resume-upload"
                                className={`ats-upload-box ${file ? 'has-file' : ''}`}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragging'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('dragging'); }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('dragging');
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
                                    <div className="file-preview-content">
                                        <div className="file-icon-wrapper">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M13 2V9H20" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <div className="success-badge">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="file-details">
                                            <p className="file-name">{file.name}</p>
                                            <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClear(); }} className="btn-change-file">Change File</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <div className="upload-icon">
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="14" width="20" height="8" rx="2" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3"/>
                                                <path className="animate-bounce-slow" d="M12 15V3M12 3L8 7M12 3L16 7" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <p className="upload-text">Click or drag to upload your resume</p>
                                        <p className="upload-hint">Supports PDF and DOCX (Max 5MB)</p>
                                    </div>
                                )}
                            </label>

                            {error && (
                                <div className="error-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {!results && (
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary ats-submit-btn ${file && !loading ? 'btn-pulse' : ''}`}
                                    disabled={!file || loading}
                                >
                                    {loading ? (
                                        <><div className="loader-mini"></div> Analyzing...</>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            Check My Score
                                        </>
                                    )}
                                </button>
                            )}
                            
                            {results && (
                                <button type="button" className="btn btn-secondary ats-reset-btn" onClick={handleClear}>Analyze Another Resume</button>
                            )}
                        </form>
                    </div>

                    {loading && (
                        <div className="ats-loading-state">
                            <div className="loader"></div>
                            <h3>Our AI is scanning your resume...</h3>
                            <p>We're checking keywords, formatting, and industry alignment.</p>
                        </div>
                    )}

                    {results && (
                        <div className="ats-results-grid">
                            {/* Score Section */}
                            <div className="card score-card">
                                <h3>ATS Score</h3>
                                <div className="score-circle-wrapper">
                                    <svg width="180" height="180" viewBox="0 0 180 180">
                                        <circle cx="90" cy="90" r="80" fill="none" stroke="var(--surface-border)" strokeWidth="12" />
                                        <circle 
                                            cx="90" 
                                            cy="90" 
                                            r="80" 
                                            fill="none" 
                                            stroke={results.score > 70 ? 'var(--success)' : results.score > 40 ? '#f59e0b' : 'var(--error)'} 
                                            strokeWidth="12" 
                                            strokeDasharray={502.65}
                                            strokeDashoffset={502.65 - (502.65 * results.score) / 100}
                                            transform="rotate(-90 90 90)"
                                            style={{ transition: 'stroke-dashoffset 1.5s ease-out', strokeLinecap: 'round' }}
                                        />
                                    </svg>
                                    <div className="score-number">
                                        {results.score}%
                                    </div>
                                </div>
                                <div className="score-label" style={{ 
                                    background: results.score > 70 ? 'rgba(16, 185, 129, 0.1)' : results.score > 40 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                                    color: results.score > 70 ? 'var(--success)' : results.score > 40 ? '#f59e0b' : 'var(--error)'
                                }}>
                                    {results.score > 80 ? 'ATS Master' : results.score > 60 ? 'Professional' : results.score > 30 ? 'Basic' : 'Substandard'}
                                </div>
                            </div>

                            {/* Analysis Section */}
                            <div className="analysis-content">
                                <div className="card sections-card">
                                    <h3>Section Verification</h3>
                                    <p className="card-subtitle">Essential information detected by ATS parsers:</p>
                                    <div className="sections-grid">
                                        {results.breakdown.map((item, i) => (
                                            <div key={i} className="section-item">
                                                <span className={`status-icon ${item.found ? 'found' : 'missing'}`}>
                                                    {item.found ? '✓' : '✗'}
                                                </span>
                                                <span className="section-name">{item.item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {results.suggestions.length > 0 && (
                                    <div className="card suggestions-card">
                                        <h3 className="text-error">Critical Suggestions</h3>
                                        <ul className="suggestions-list">
                                            {results.suggestions.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {results.aiAnalysis && (
                                    <div className="card ai-analysis-card">
                                        <h3 className="ai-title">
                                            <span>✨</span> AI Career Insights
                                        </h3>
                                        <p className="ai-text">{results.aiAnalysis}</p>
                                        <div className="roadmap-container">
                                            <h4 className="roadmap-title">Actionable Roadmap:</h4>
                                            <ul className="roadmap-list">
                                                {results.aiActionPoints.map((ap, i) => (
                                                    <li key={i}>{ap}</li>
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
                    .ats-container {
                        padding: clamp(1rem, 5vw, 3rem) 1rem;
                        max-width: 1100px;
                        margin: 0 auto;
                    }

                    .ats-main-content {
                        margin-top: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: 2rem;
                    }

                    .ats-card {
                        text-align: center;
                        padding: clamp(1.5rem, 8vw, 4rem) clamp(1rem, 5vw, 2.5rem);
                        background: linear-gradient(145deg, var(--surface) 0%, rgba(var(--bg-rgb), 0.4) 100%);
                    }

                    .ats-title {
                        margin-bottom: 1rem;
                        font-size: clamp(1.8rem, 6vw, 2.8rem);
                        font-weight: 800;
                        line-height: 1.1;
                    }

                    .ats-subtitle {
                        color: var(--text-muted);
                        margin: 0 auto 2.5rem;
                        font-size: clamp(0.95rem, 3vw, 1.15rem);
                        max-width: 700px;
                    }

                    .ats-form {
                        max-width: 650px;
                        margin: 0 auto;
                        width: 100%;
                    }

                    .ats-upload-box {
                        border: 2px dashed var(--surface-border);
                        padding: clamp(2rem, 10vw, 4rem) 1.5rem;
                        border-radius: var(--radius-xl);
                        cursor: pointer;
                        background: rgba(var(--bg-rgb), 0.2);
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 240px;
                    }

                    .ats-upload-box.dragging {
                        border-color: var(--primary);
                        background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
                        transform: scale(1.02);
                    }

                    .ats-upload-box.has-file {
                        border-style: solid;
                        border-color: var(--primary);
                        background: rgba(var(--primary-rgb, 99, 102, 241), 0.03);
                    }

                    .file-preview-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 1.5rem;
                        width: 100%;
                        animation: scaleIn 0.3s ease-out;
                    }

                    @media (min-width: 768px) {
                        .file-preview-content {
                            flex-direction: row;
                            justify-content: center;
                            text-align: left;
                        }
                    }

                    .file-icon-wrapper {
                        position: relative;
                        flex-shrink: 0;
                    }

                    .success-badge {
                        position: absolute;
                        bottom: -4px;
                        right: -4px;
                        background: var(--success);
                        border-radius: 50%;
                        width: 22px;
                        height: 22px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        border: 2px solid var(--surface);
                    }

                    .file-details {
                        flex: 1;
                        min-width: 0;
                    }

                    .file-name {
                        font-weight: 700;
                        color: var(--text-main);
                        font-size: 1.1rem;
                        margin-bottom: 0.25rem;
                        word-break: break-all;
                    }

                    .file-size {
                        color: var(--text-muted);
                        font-size: 0.85rem;
                        margin-bottom: 1rem;
                    }

                    .btn-change-file {
                        background: rgba(239, 68, 68, 0.1);
                        border: none;
                        color: var(--error);
                        padding: 0.5rem 1.25rem;
                        border-radius: 50px;
                        cursor: pointer;
                        font-size: 0.85rem;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .btn-change-file:hover {
                        background: var(--error);
                        color: white;
                    }

                    .upload-placeholder {
                        text-align: center;
                    }

                    .upload-text {
                        font-size: 1.1rem;
                        font-weight: 600;
                        margin-top: 1rem;
                        margin-bottom: 0.5rem;
                    }

                    .upload-hint {
                        color: var(--text-muted);
                        font-size: 0.85rem;
                    }

                    .ats-submit-btn, .ats-reset-btn {
                        width: 100%;
                        margin-top: 2rem;
                        padding: 1.25rem;
                        font-size: 1.1rem;
                        font-weight: 700;
                        border-radius: var(--radius-lg);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 56px;
                    }

                    .error-box {
                        color: var(--error);
                        margin-top: 1.5rem;
                        font-size: 0.95rem;
                        padding: 1rem;
                        background: rgba(239, 68, 68, 0.08);
                        border-radius: 12px;
                        border: 1px solid rgba(239, 68, 68, 0.2);
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        animation: shake 0.4s ease-in-out;
                    }

                    .ats-loading-state {
                        text-align: center;
                        padding: 3rem 1rem;
                        animation: fadeIn 0.5s ease-in;
                    }

                    .ats-results-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        animation: slideUp 0.6s ease-out;
                    }

                    @media (min-width: 1024px) {
                        .ats-results-grid {
                            grid-template-columns: 320px 1fr;
                        }
                    }

                    .score-card {
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 2.5rem 1.5rem;
                        height: fit-content;
                        position: sticky;
                        top: 100px;
                    }

                    .score-circle-wrapper {
                        position: relative;
                        width: 180px;
                        height: 180px;
                        margin: 1.5rem 0;
                    }

                    .score-number {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 2.8rem;
                        font-weight: 800;
                    }

                    .score-label {
                        padding: 0.6rem 1.5rem;
                        border-radius: 50px;
                        font-weight: 700;
                        font-size: 0.9rem;
                    }

                    .analysis-content {
                        display: flex;
                        flex-direction: column;
                        gap: 2rem;
                    }

                    .sections-card .card-subtitle {
                        color: var(--text-muted);
                        font-size: 0.85rem;
                        margin-bottom: 1.5rem;
                    }

                    .sections-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                        gap: 1rem;
                    }

                    .section-item {
                        display: flex;
                        align-items: center;
                        gap: 0.8rem;
                        padding: 0.75rem;
                        border-radius: 12px;
                        background: rgba(var(--bg-rgb), 0.4);
                        border: 1px solid var(--surface-border);
                    }

                    .status-icon {
                        width: 22px;
                        height: 22px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.7rem;
                        font-weight: 800;
                        flex-shrink: 0;
                    }

                    .status-icon.found { background: rgba(16, 185, 129, 0.2); color: var(--success); }
                    .status-icon.missing { background: rgba(239, 68, 68, 0.2); color: var(--error); }

                    .section-name { font-size: 0.85rem; font-weight: 600; }

                    .suggestions-card { border-left: 4px solid var(--error); }
                    .text-error { color: var(--error); margin-bottom: 1.2rem; }
                    .suggestions-list { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.75rem; }
                    .suggestions-list li { font-size: 0.95rem; lineHeight: 1.5; }

                    .ai-analysis-card {
                        border-left: 4px solid var(--primary);
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
                    }

                    .ai-title { display: flex; alignItems: center; gap: 0.6rem; margin-bottom: 1.2rem; }
                    .ai-text { font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem; color: var(--text-main); opacity: 0.9; }

                    .roadmap-container {
                        background: rgba(var(--bg-rgb), 0.3);
                        padding: 1.25rem;
                        border-radius: 12px;
                        border: 1px solid rgba(var(--primary-rgb, 99, 102, 241), 0.1);
                    }

                    .roadmap-title {
                        font-size: 0.85rem;
                        margin-bottom: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: var(--primary);
                        font-weight: 700;
                    }

                    .roadmap-list { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem; }
                    .roadmap-list li { font-size: 0.9rem; line-height: 1.5; font-style: italic; }

                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }
                    .animate-bounce-slow { animation: bounce-slow 2s infinite; }
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-4px); }
                    }
                    
                    .loader {
                        border: 4px solid rgba(255, 255, 255, 0.05);
                        border-radius: 50%;
                        border-top: 4px solid var(--primary);
                        width: 60px;
                        height: 60px;
                        margin: 0 auto 1.5rem;
                        animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    }
                    .loader-mini {
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 50%;
                        border-top: 2px solid white;
                        width: 18px;
                        height: 18px;
                        margin-right: 0.75rem;
                        animation: spin 0.8s linear infinite;
                    }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                    @media (max-width: 480px) {
                        .ats-container { padding: 1rem 0.75rem; }
                        .ats-card { padding: 2rem 1rem; }
                        .file-preview-content { padding: 0.5rem; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ATSChecker;
