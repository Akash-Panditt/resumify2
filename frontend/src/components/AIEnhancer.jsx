import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AIEnhancer = ({ text, onApply, type = 'summary', contextData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);
  const [showAIWriter, setShowAIWriter] = useState(false);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  const handleOpenWriter = () => {
    setShowAIWriter(true);
  };

  const handleAction = async (actionType) => {
    if (actionType === 'improve' && (!text || text.trim().length < 5)) {
      return alert('Please write some text in the field before clicking Improve, or click Generate instead.');
    }

    setShowAIWriter(false);
    setLoading(true);
    setError(null);
    
    try {
      const payloadText = actionType === 'generate' ? '' : text;
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/enhance`, 
        { text: payloadText, type, contextData },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuggestion(res.data.enhanced);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enhance text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button"
        className="btn btn-primary"
        style={{ 
          padding: '0.4rem 0.8rem', 
          fontSize: '0.75rem', 
          gap: '0.4rem',
          borderRadius: 'var(--radius-sm)',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onClick={handleOpenWriter}
        disabled={loading}
      >
        <span>{loading ? '🪄' : '✨'}</span>
        {loading ? 'Thinking...' : 'AI Writer'}
      </button>

      {/* AI Writer Modal */}
      {showAIWriter && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                AI WRITER <span style={{ color: '#a855f7' }}>✨</span>
              </h3>
              <button 
                onClick={() => setShowAIWriter(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
              >✕</button>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Add job title, company name and the dates to generate your employment history, or magically improve your existing text.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => handleAction('generate')}
                style={{
                  padding: '0.8rem', background: 'transparent', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#a855f7', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(168, 85, 247, 0.05)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Generate
              </button>
              <button 
                onClick={() => handleAction('improve')}
                style={{
                  padding: '0.8rem', background: 'transparent', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#a855f7', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(168, 85, 247, 0.05)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Improve
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
                onClick={() => alert('Pre-written phrases feature coming soon!')}
              >
                Add pre-written phrases
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          right: 0, 
          zIndex: 100, 
          marginTop: '0.5rem',
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '0.8rem',
          color: '#f87171',
          width: '200px'
        }}>
          {error}
        </div>
      )}

      {/* Success AI Suggestion Result Modal */}
      {suggestion && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '2rem', border: '1px solid var(--primary)' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem' }}>AI Enhancement Ready</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.7rem' }}>ORIGINAL</label>
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  height: '150px',
                  overflow: 'auto',
                  border: '1px solid var(--surface-border)'
                }}>{text || "— Auto Generated from Scratch —"}</div>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>ENHANCED BY AI</label>
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  height: '150px',
                  overflow: 'auto',
                  border: '1px solid var(--primary)'
                }}>{suggestion}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  onApply(suggestion);
                  setSuggestion(null);
                }}
              >
                Apply Enhancement
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setSuggestion(null)}
              >
                Keep Original
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEnhancer;
