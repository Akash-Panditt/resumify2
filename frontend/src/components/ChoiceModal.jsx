import React from 'react';

const ChoiceModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="choice-modal-overlay">
      <div className="choice-modal-content">
        <div className="choice-header">
          <h2>How would you like to start?</h2>
          <p>Choose a starting point for your professional resume.</p>
        </div>
        
        <div className="choice-options">
          <button 
            className="choice-card prefill-card" 
            onClick={() => onSelect(true)}
          >
            <div className="choice-icon">✨</div>
            <div className="choice-info">
              <h3>Prefill with Sample Data</h3>
              <p>Best for inspiration. Edit existing professional content tailored to your category.</p>
            </div>
          </button>

          <button 
            className="choice-card blank-card" 
            onClick={() => onSelect(false)}
          >
            <div className="choice-icon">📄</div>
            <div className="choice-info">
              <h3>Start with Blank Resume</h3>
              <p>Best for starting from scratch. Build your resume piece by piece with a clean slate.</p>
            </div>
          </button>
        </div>

        <button className="choice-cancel" onClick={onClose}>Cancel</button>
      </div>

      <style>{`
        .choice-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .choice-modal-content {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 2.5rem;
          width: 90%;
          max-width: 550px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          color: white;
          text-align: center;
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .choice-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .choice-header p {
          color: #94a3b8;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .choice-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .choice-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .choice-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--primary, #6366f1);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
        }

        .choice-icon {
          font-size: 2rem;
          background: rgba(255, 255, 255, 0.05);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .choice-info h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: white;
        }

        .choice-info p {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.4;
          margin: 0;
        }

        .choice-cancel {
          background: transparent;
          border: none;
          color: #64748b;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .choice-cancel:hover {
          color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .choice-modal-content {
            padding: 1.5rem;
          }
          .choice-card {
            padding: 1rem;
          }
          .choice-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ChoiceModal;
