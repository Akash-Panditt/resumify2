import React from 'react';

const LanguagesForm = ({ languages = [], errors = {}, onChange, onAdd, onRemove }) => {
  return (
    <div className="languages-form">
      <div className="languages-grid">
        {languages.map((l, index) => (
          <div key={index} className="language-card">
            {/* Header with Number and Remove */}
            <div className="card-header">
              <div className="index-badge">{index + 1}</div>
              <span className="card-title">Language <span className="required-star">*</span></span>
              <button 
                type="button"
                className="btn-remove-card" 
                onClick={() => onRemove(index)}
                title="Remove Language"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>

            {/* Language Name Input */}
            <div className="input-section">
              <input
                type="text"
                className={`form-input ${errors[`lang_${index}_name`] ? 'is-invalid' : ''}`}
                value={l.name || ''}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                placeholder="e.g. English, Spanish, German"
                autoFocus={!l.name}
              />
              {errors[`lang_${index}_name`] && <span className="error-text">{errors[`lang_${index}_name`]}</span>}
            </div>

            {/* Proficiency Selector */}
            <div className="proficiency-section">
              <div className="proficiency-selector">
                {[
                  { id: 1, label: "Basic" },
                  { id: 2, label: "Intermediate" },
                  { id: 3, label: "Fluent" }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`proficiency-btn ${l.level === p.id ? 'active' : ''}`}
                    onClick={() => onChange(index, 'level', p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button 
        type="button"
        className="btn-add-language" 
        onClick={onAdd}
      >
        <div className="add-icon">+</div>
        <div className="add-text">Add Language</div>
      </button>

      <style>{`
        .languages-form {
          animation: fadeIn 0.4s ease-out;
        }
        .languages-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .language-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--surface-border);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .language-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .index-badge {
          width: 24px;
          height: 24px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .card-title {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-grow: 1;
        }
        .btn-remove-card {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-remove-card:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        .input-section {
          margin-bottom: 1.25rem;
        }
        .proficiency-selector {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          background: rgba(0,0,0,0.2);
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
        }
        .proficiency-btn {
          background: none;
          border: none;
          padding: 8px;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .proficiency-btn:hover {
          color: var(--text-main);
          background: rgba(255,255,255,0.05);
        }
        .proficiency-btn.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .btn-add-language {
          width: 100%;
          padding: 1.5rem;
          background: none;
          border: 2px dashed var(--surface-border);
          border-radius: 16px;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
        }
        .btn-add-language:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(99, 102, 241, 0.03);
          transform: scale(1.01);
        }
        .add-icon {
          font-size: 1.5rem;
          font-weight: 300;
        }
        .add-text {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LanguagesForm;
