import React from 'react';

const ClassicTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;

  return (
    <div ref={ref} style={{ padding: '2.5rem 3rem', backgroundColor: '#ffffff', color: '#1a1a1a', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '3px double #333', paddingBottom: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {personalDetails?.fullName}
        </h1>
        <div style={{ fontSize: '1.1rem', color: '#555', fontStyle: 'italic', marginBottom: '0.75rem' }}>
          {personalDetails?.jobTitle}
        </div>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '1.25rem', 
          fontSize: '0.85rem', 
          color: '#4b5563',
          marginTop: '0.5rem',
          maxWidth: '95%',
          margin: '0.5rem auto 0 auto'
        }}>
          {personalDetails?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {personalDetails.email}
            </div>
          )}
          {personalDetails?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {personalDetails.phone}
            </div>
          )}
          {personalDetails?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalDetails.address}
            </div>
          )}
          {personalDetails?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>LinkedIn</a>
            </div>
          )}
          {personalDetails?.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>GitHub</a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Summary</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.95rem' }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.95rem' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>{item.school}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Skills</h3>
          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.8' }}>
            {skills.map((s, i) => <span key={i}>{s.name}{s.level ? ` (${s.level})` : ''}{i < skills.length - 1 ? ' • ' : ''}</span>)}
          </p>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Languages</h3>
          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.8' }}>
            {languages.map((l, i) => (
              <span key={i}>
                {l.name} ({l.level === 1 ? "Basic" : l.level === 2 ? "Intermediate" : "Fluent"})
                {i < languages.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Projects</h3>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '0.95rem', color: '#1a1a1a' }}>{item.name}</strong>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#0066cc', textDecoration: 'none', fontStyle: 'italic' }}>
                    Project Link ↗
                  </a>
                )}
              </div>
              {item.technologies && (
                <div style={{ fontSize: '0.85rem', color: '#555', fontStyle: 'italic', marginBottom: '0.35rem' }}>
                  Technologies: {item.technologies}
                </div>
              )}
              {item.description && <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: '1.5', marginTop: '0.25rem', textAlign: 'justify' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ClassicTemplate;
