import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Wand2, Lightbulb } from 'lucide-react';
import StatusModal from './StatusModal';

const AIEnhancer = ({ text, onApply, type = 'summary', contextData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);
  const [showAIWriter, setShowAIWriter] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  const handleOpenWriter = () => {
    setShowAIWriter(true);
  };

  const handleAction = async (actionType) => {
    if (actionType === 'improve' && (!text || text.trim().length < 5)) {
      setModal({
        isOpen: true,
        title: 'More Text Needed',
        message: 'Please write some text in the field before clicking Improve, or click Generate instead.'
      });
      return;
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
      <motion.button 
        type="button"
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          padding: '0.4rem 0.8rem', 
          fontSize: '0.75rem', 
          gap: '0.4rem',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
          transition: 'box-shadow 0.2s ease',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          outline: 'none'
        }}
        onClick={handleOpenWriter}
        disabled={loading}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <Sparkles size={14} />
          </motion.div>
        ) : (
          <Sparkles size={14} />
        )}
        <span>{loading ? 'Thinking...' : 'AI Writer'}</span>
      </motion.button>

      {/* AI Writer Modal */}
      <AnimatePresence>
        {showAIWriter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              padding: '1rem'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="card" 
              style={{ 
                maxWidth: '450px', 
                width: '100%', 
                padding: '2rem', 
                background: 'var(--surface)', 
                border: '1px solid var(--surface-border)', 
                borderRadius: '20px', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative Background Blur */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'rgba(99, 102, 241, 0.15)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex' }}>
                      <Wand2 size={20} color="var(--primary)" />
                    </div>
                    AI WRITER
                  </h3>
                  <button 
                    onClick={() => setShowAIWriter(false)} 
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex' }}
                  ><X size={18} /></button>
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Harness the power of AI to craft professional content. Generate from scratch or enhance your existing writing instantly.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <motion.button 
                    whileHover={{ scale: 1.02, background: 'rgba(168, 85, 247, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction('generate')}
                    style={{
                      padding: '1rem', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', color: '#c084fc', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <Sparkles size={18} />
                    Generate
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, background: 'rgba(99, 102, 241, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction('improve')}
                    style={{
                      padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818cf8', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <Wand2 size={18} />
                    Improve
                  </motion.button>
                </div>

                <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                  <button 
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', padding: 0, fontWeight: 500 }}
                    onClick={() => setModal({
                      isOpen: true,
                      title: 'Coming Soon',
                      message: 'The pre-written phrases feature is currently under development. Stay tuned!'
                    })}
                  >
                    <Lightbulb size={16} />
                    Add pre-written phrases
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <StatusModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type="error"
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default AIEnhancer;
