import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradeModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();

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

  const isPremiumRequired = !!data?.requiredTier;

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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 10, 15, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1,
        animation: 'glowPulse 4s infinite alternate'
      }} />

      {/* Modal Content */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(23, 25, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '32px',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        animation: 'modalEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}>

        {/* Floating Icon */}
        <div style={{
          fontSize: '4.5rem',
          marginBottom: '1.5rem',
          animation: 'float 3s ease-in-out infinite',
          filter: 'drop-shadow(0 15px 15px rgba(99, 102, 241, 0.3))'
        }}>
          {isPremiumRequired ? '✨' : '🚀'}
        </div>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: '900',
          marginBottom: '0.75rem',
          color: '#fff',
          letterSpacing: '-0.02em'
        }}>
          {isPremiumRequired ? 'Unlock Premium' : 'Limit Reached!'}
        </h2>

        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          {data?.message || 'Ready to take your resume to the next level?'}
        </p>

        {/* Usage Stats or Tier Requirement */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {data?.limit !== undefined && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>Downloads Used:</span>
              <span style={{ color: '#fff', fontWeight: '700' }}>{data.used} / {data.limit}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>Current Plan:</span>
            <span className="badge-glass" style={{ textTransform: 'capitalize' }}>{data?.plan || 'Free'}</span>
          </div>

          {data?.requiredTier && (
            <div style={{
              marginTop: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ color: '#fbbf24' }}>⭐</span>
              <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>
                Requires <span style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{data.requiredTier}</span> Plan
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            className="upgrade-btn"
            onClick={() => {
              navigate('/pricing');
              onClose();
            }}
          >
            Upgrade Now
            <div className="btn-shine"></div>
          </button>

          <button
            className="ghost-btn"
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>

        {/* Decorative inner glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)',
          pointerEvents: 'none'
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

        @keyframes glowPulse {
          from { transform: scale(1); opacity: 0.5; }
          to { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .badge-glass {
          background: rgba(99, 102, 241, 0.2);
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .upgrade-btn {
          position: relative;
          background: var(--primary);
          color: white;
          padding: 1.1rem;
          border-radius: 18px;
          border: none;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          overflow: hidden;
        }

        .upgrade-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.5);
          filter: brightness(1.1);
        }

        .upgrade-btn:active {
          transform: translateY(1px);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: 0.5s;
        }

        .upgrade-btn:hover .btn-shine {
          left: 100%;
        }

        .ghost-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          padding: 0.8rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ghost-btn:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default UpgradeModal;

