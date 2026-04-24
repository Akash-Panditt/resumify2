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
              style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            >
              Remove
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
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
      <button className="btn btn-secondary" onClick={onAdd} style={{ width: '100%', borderStyle: 'dashed' }}>+ Add Project</button>
    </div>
  );
};

export default ProjectsForm;
