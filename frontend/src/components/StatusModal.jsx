import React from 'react';

const StatusModal = ({ isOpen, onClose, type = 'success', title, message, buttonText = 'Got it' }) => {
  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.height = 'unset';
        document.body.style.touchAction = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const isLoading = type === 'loading';
  const isError = type === 'error';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      perspective: '1000px'
    }}>
      {/* Backdrop with enhanced blur */}
      <div
        onClick={isLoading ? undefined : onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 10, 15, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          animation: 'fadeIn 0.4s ease-out'
        }}
      />

      {/* Modal Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(23, 25, 35, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '32px',
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        animation: 'modalEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}>

        {/* Icon Section (3D-like Box from screenshot) */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <div className="premium-loader">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
            </div>
          ) : (
            <div className={`status-icon-container ${type}`}>
              {isSuccess ? (
                <svg viewBox="0 0 52 52" className="checkmark-svg">
                  <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="checkmark-path" />
                </svg>
              ) : (
                <span style={{ fontSize: '2.5rem', color: '#fff' }}>✕</span>
              )}
            </div>
          )}
        </div>

        {/* The "Green Bar" from screenshot - Solid and glowing */}
        {!isLoading && (
          <div style={{
            height: '8px',
            width: '100%',
            background: isSuccess ? '#22c55e' : '#ef4444',
            borderRadius: '4px',
            marginBottom: '2rem',
            boxShadow: isSuccess
              ? '0 0 20px rgba(34, 197, 94, 0.4)'
              : '0 0 20px rgba(239, 68, 68, 0.4)',
            animation: 'barGrow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }} />
        )}

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '800',
          marginBottom: '0.75rem',
          color: '#fff',
          letterSpacing: '-0.02em'
        }}>
          {title || (isLoading ? 'Processing...' : (isSuccess ? 'Success!' : 'Oops!'))}
        </h2>

        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: isLoading ? '0' : '2.5rem',
          lineHeight: '1.7',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          {message}
        </p>

        {!isLoading && (
          <button
            className={`premium-action-btn ${isSuccess ? 'success' : 'error'}`}
            onClick={onClose}
          >
            {buttonText}
          </button>
        )}

        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          background: isSuccess ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalEntrance {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes barGrow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }

        /* 3D Status Icon Container */
        .status-icon-container {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #22c55e;
          box-shadow: 
            0 10px 25px rgba(34, 197, 94, 0.3),
            inset 0 -4px 0 rgba(0,0,0,0.2),
            inset 0 2px 0 rgba(255,255,255,0.3);
          animation: iconPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .status-icon-container.error {
          background: #ef4444;
          box-shadow: 
            0 10px 25px rgba(239, 68, 68, 0.3),
            inset 0 -4px 0 rgba(0,0,0,0.2),
            inset 0 2px 0 rgba(255,255,255,0.3);
        }

        @keyframes iconPop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .checkmark-svg {
          width: 40px;
          height: 40px;
          stroke: #fff;
          stroke-width: 6;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkDraw 0.6s ease-out 0.3s forwards;
        }

        @keyframes checkDraw {
          to { stroke-dashoffset: 0; }
        }

        /* Action Button */
        .premium-action-btn {
          width: 100%;
          padding: 1.1rem;
          border-radius: 16px;
          border: none;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
          background: var(--primary);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }

        .premium-action-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
        }

        .premium-action-btn:active {
          transform: translateY(0);
        }

        /* Loader */
        .premium-loader {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StatusModal;


