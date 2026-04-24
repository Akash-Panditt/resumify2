import React from 'react';

const SkillsForm = ({ skills, errors, onChange, onAdd, onRemove }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {skills.map((item, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 2fr) minmax(150px, 1fr) auto', gap: '1rem', alignItems: 'start' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <input 
                className={`form-input ${errors[`skill_${index}_name`] ? 'is-invalid' : ''}`} 
                value={item.name} 
                onChange={(e) => onChange(index, 'name', e.target.value)} 
                placeholder="Skill name (e.g. JavaScript, AWS) *" 
              />
              {errors[`skill_${index}_name`] && <span className="error-text">{errors[`skill_${index}_name`]}</span>}
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <select className="form-input" value={item.level} onChange={(e) => onChange(index, 'level', e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <button 
              type="button" 
              onClick={() => onRemove(index)}
              className="btn btn-secondary"
              style={{ padding: '0 1rem', height: '44px', background: '#ef4444', color: '#fff', border: 'none' }}
            >
              Trash
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={onAdd} style={{ width: '100%', borderStyle: 'dashed' }}>+ Add Skill</button>
    </div>
  );
};

export default SkillsForm;
