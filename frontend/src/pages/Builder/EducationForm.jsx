import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

const EducationForm = ({ education, errors, onChange, onAdd, onRemove }) => {
  
  const handleDateChange = (index, field, date) => {
    if (!date) {
      onChange(index, field, '');
      return;
    }
    const formattedDate = format(date, 'MMM yyyy');
    onChange(index, field, formattedDate);
  };

  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.toLowerCase() === 'present') return null;
    try {
      const parsed = parse(dateStr, 'MMM yyyy', new Date());
      if (!isNaN(parsed)) return parsed;
    } catch (e) {}
    const fallback = new Date(dateStr);
    return isNaN(fallback) ? null : fallback;
  };

  return (
    <div>
      {errors.edu_general && (
        <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {errors.edu_general}
        </div>
      )}
      {education.map((item, index) => (
        <div key={index} className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--surface-border)', background: 'transparent', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', margin: 0, color: 'var(--primary)' }}>
              Education #{index + 1}
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
              <label className="form-label">Degree / Program <span className="required-star">*</span></label>
              <input 
                className={`form-input ${errors[`edu_${index}_degree`] ? 'is-invalid' : ''}`} 
                value={item.degree} 
                onChange={(e) => onChange(index, 'degree', e.target.value)} 
                placeholder="B.S. Computer Science" 
              />
              {errors[`edu_${index}_degree`] && <span className="error-text">{errors[`edu_${index}_degree`]}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">School / University <span className="required-star">*</span></label>
              <input 
                className={`form-input ${errors[`edu_${index}_school`] ? 'is-invalid' : ''}`} 
                value={item.school} 
                onChange={(e) => onChange(index, 'school', e.target.value)} 
                placeholder="Stanford University" 
              />
              {errors[`edu_${index}_school`] && <span className="error-text">{errors[`edu_${index}_school`]}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Start Date <span className="required-star">*</span></label>
              <DatePicker
                selected={parseDate(item.startDate)}
                onChange={(date) => handleDateChange(index, 'startDate', date)}
                dateFormat="MMM yyyy"
                fixedHeight
                className={`form-input ${errors[`edu_${index}_startDate`] ? 'is-invalid' : ''}`}
                placeholderText="e.g. Aug 2018"
              />
              {errors[`edu_${index}_startDate`] && <span className="error-text">{errors[`edu_${index}_startDate`]}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <DatePicker
                selected={parseDate(item.endDate)}
                onChange={(date) => handleDateChange(index, 'endDate', date)}
                dateFormat="MMM yyyy"
                fixedHeight
                isClearable
                className="form-input"
                placeholderText="Present (Leave empty)"
              />
              <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <input 
                   type="checkbox" 
                   id={`present_edu_${index}`}
                   checked={item.endDate === 'Present'}
                   onChange={(e) => {
                     onChange(index, 'endDate', e.target.checked ? 'Present' : '');
                   }}
                 />
                 <label htmlFor={`present_edu_${index}`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>I currently study here</label>
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description (Optional)</label>
              <textarea 
                className="form-input" 
                rows="3" 
                value={item.description} 
                onChange={(e) => onChange(index, 'description', e.target.value)} 
                placeholder="Relevant coursework, honors, GPA, etc."
              ></textarea>
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          className="btn btn-secondary" 
          onClick={onAdd} 
          style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', background: 'rgba(var(--primary-rgb), 0.05)', fontSize: '1.5rem' }}
          title="Add Education"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
