import React from 'react';

const ProjectsForm = ({ projects, errors, onChange, onAdd, onRemove }) => {
  return (
    <div>
      {projects.map((item, index) => (
        <div key={index} className="card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--primary)' }}>
              Project #{index + 1}: {item.name || 'Untitled Project'}
            </h3>
            <button 
              type="button" 
              onClick={() => onRemove(index)}
              className="btn-remove-ghost"
              style={{ width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              title="Remove"
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Project Name <span className="required-star">*</span></label>
              <input 
                className={`form-input ${errors[`proj_${index}_name`] ? 'is-invalid' : ''}`} 
                value={item.name} 
                onChange={(e) => onChange(index, 'name', e.target.value)} 
                placeholder="Ecommerce Dashboard" 
              />
              {errors[`proj_${index}_name`] && <span className="error-text">{errors[`proj_${index}_name`]}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Live Link / GitHub URI</label>
              <input className="form-input" value={item.link} onChange={(e) => onChange(index, 'link', e.target.value)} placeholder="https://..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Technologies Used</label>
              <input className="form-input" value={item.technologies} onChange={(e) => onChange(index, 'technologies', e.target.value)} placeholder="React, Node.js, PosgreSQL" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea 
                className={`form-input ${errors[`proj_${index}_description`] ? 'is-invalid' : ''}`} 
                rows="3" 
                value={item.description} 
                onChange={(e) => onChange(index, 'description', e.target.value)} 
                placeholder="Built a highly performant application that..."
              ></textarea>
              {errors[`proj_${index}_description`] && <span className="error-text">{errors[`proj_${index}_description`]}</span>}
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          className="btn btn-secondary" 
          onClick={onAdd} 
          style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', background: 'rgba(var(--primary-rgb), 0.05)', fontSize: '1.5rem' }}
          title="Add Project"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
