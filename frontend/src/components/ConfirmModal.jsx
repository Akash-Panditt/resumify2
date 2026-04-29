import React from 'react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  message = 'This action cannot be undone.',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' or 'primary'
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      padding: '1.5rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        borderRadius: '24px',
        padding: '2.5rem',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        {/* Icon Area */}
        <div style={{
          width: '64px',
          height: '64px',
          background: type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.75rem',
          color: type === 'danger' ? 'var(--error)' : 'var(--primary)'
        }}>
          {type === 'danger' ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6m4-11v6" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          )}
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, padding: '1rem', borderRadius: '14px', fontWeight: 700 }}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`} 
            style={{ flex: 1, padding: '1rem', borderRadius: '14px', fontWeight: 700, boxShadow: type === 'danger' ? '0 10px 20px rgba(239, 68, 68, 0.2)' : '0 10px 20px rgba(99, 102, 241, 0.2)' }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
