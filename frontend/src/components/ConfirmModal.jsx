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
  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalHeight = window.getComputedStyle(document.body).height;
      
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.height = originalHeight;
        document.body.style.touchAction = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      display: 'grid',
      placeItems: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(16px)',
      padding: '20px',
      boxSizing: 'border-box',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div 
        className="confirm-modal-content"
        style={{
          background: 'var(--bg-color)',
          border: '1px solid var(--surface-border)',
          borderRadius: '24px',
          padding: '2.5rem 1.5rem',
          maxWidth: '350px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          margin: '0 auto'
        }}
      >
        {/* Glow Effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: type === 'danger' 
            ? 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icon Area */}
          <div style={{
            width: '64px',
            height: '64px',
            background: type === 'danger' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: type === 'danger' ? '#ef4444' : 'var(--primary)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
          }}>
            {type === 'danger' ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6m4-11v6" />
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            )}
          </div>

          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {title}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1rem', fontWeight: 500 }}>
            {message}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'row' }}>
            <button 
              className="btn" 
              style={{ 
                flex: 1, 
                padding: '0.85rem 0.5rem', 
                borderRadius: '16px', 
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button 
              className="btn" 
              style={{ 
                flex: 1, 
                padding: '0.85rem 0.5rem', 
                borderRadius: '16px', 
                fontWeight: 800, 
                background: type === 'danger' ? '#ef4444' : 'var(--primary)',
                border: 'none',
                color: 'white',
                fontSize: '0.9rem',
                boxShadow: type === 'danger' ? '0 8px 20px rgba(239, 68, 68, 0.3)' : '0 8px 20px rgba(99, 102, 241, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .confirm-modal-content {
          animation: modalAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
