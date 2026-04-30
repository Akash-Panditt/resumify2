import React from 'react';

const ModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;

  return (
    <div ref={ref} style={{
      padding: '4rem 2.5rem 2.5rem',
      backgroundColor: '#ffffff',
      color: '#1e293b',
      minHeight: '1056px',
      width: '816px',
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      position: 'relative'
    }}>
      {/* Safety top margin for perfect PDF export */}
      <div style={{ height: '0.5rem' }}></div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #6366f1', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#6366f1', marginBottom: '0.15rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '0.75rem', fontWeight: '500' }}>
          {personalDetails?.jobTitle || 'Your Job Title'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails?.address && <span>• {personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>• {personalDetails.linkedin}</span>}
          {personalDetails?.github && <span>• {personalDetails.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Professional Summary</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#475569' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Sections Wrapper */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Experience</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{item.jobTitle}</h4>
                    <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>{item.company}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                  </div>
                </div>
                {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4', marginTop: '0.35rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{item.degree}</h4>
                    <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>{item.school}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                  </div>
                </div>
                {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4', marginTop: '0.2rem' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Projects</h3>
            {projects.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{item.name}</h4>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>
                      View Project ↗
                    </a>
                  )}
                </div>
                {item.technologies && (
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', marginBottom: '0.3rem', borderLeft: '2px solid #e2e8f0', paddingLeft: '0.5rem' }}>
                    {item.technologies}
                  </div>
                )}
                {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4', marginTop: '0.2rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {skills.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f1f5f9',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.85rem',
                  color: '#334155',
                  fontWeight: '500',
                  maxWidth: '100%',
                  display: 'inline-block'
                }}>
                  {item.name} {item.level && <span style={{ opacity: 0.7, fontSize: '0.75rem', marginLeft: '0.2rem' }}>({item.level})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.15rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Languages</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: '0.75rem' }}>
              {languages.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa', padding: '0.4rem 0.6rem', borderRadius: '0.25rem', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{l.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: '500' }}>
                    {l.level === 1 && "Basic"}
                    {l.level === 2 && "Intermediate"}
                    {l.level === 3 && "Fluent"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

export default ModernTemplate;
