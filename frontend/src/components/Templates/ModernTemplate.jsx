import React from 'react';

const ModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;

  return (
    <div ref={ref} style={{
      padding: '3rem',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2563eb', 
          marginBottom: '0.25rem', 
          fontWeight: '700',
          lineHeight: '1.1'
        }}>
          {personalDetails?.fullName}
        </h1>
        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280', 
          marginBottom: '1rem', 
          fontWeight: '400' 
        }}>
          {personalDetails?.jobTitle}
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1.25rem', 
          fontSize: '0.875rem', 
          color: '#4b5563' 
        }}>
          {personalDetails?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {personalDetails.email}
            </div>
          )}
          {personalDetails?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {personalDetails.phone}
            </div>
          )}
          {personalDetails?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalDetails.address}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#374151' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            color: '#2563eb', 
            borderBottom: '1px solid #2563eb', 
            paddingBottom: '4px', 
            marginBottom: '1rem', 
            textTransform: 'uppercase', 
            fontWeight: '700',
            display: 'inline-block'
          }}>Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', margin: 0 }}>{item.jobTitle}</h4>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                  {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                </div>
              </div>
              <div style={{ fontSize: '1rem', color: '#4b5563', fontWeight: '500', marginBottom: '0.5rem' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            color: '#2563eb', 
            borderBottom: '1px solid #2563eb', 
            paddingBottom: '4px', 
            marginBottom: '1rem', 
            textTransform: 'uppercase', 
            fontWeight: '700',
            display: 'inline-block'
          }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map((item, idx) => (
              <div key={idx} style={{
                fontSize: '0.95rem',
                color: '#374151',
                fontWeight: '500'
              }}>
                {item.name}{idx < skills.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            color: '#2563eb', 
            borderBottom: '1px solid #2563eb', 
            paddingBottom: '4px', 
            marginBottom: '1rem', 
            textTransform: 'uppercase', 
            fontWeight: '700',
            display: 'inline-block'
          }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', margin: 0 }}>{item.degree}</h4>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                  {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                </div>
              </div>
              <div style={{ fontSize: '1rem', color: '#4b5563' }}>{item.school}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ModernTemplate;

