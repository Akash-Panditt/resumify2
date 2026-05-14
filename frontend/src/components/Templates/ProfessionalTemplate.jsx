import React from 'react';

const ProfessionalTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3.5rem 3rem', backgroundColor: '#ffffff', color: '#334155', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      {/* Header - Centered & Classic */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '800' }}>
          {personalDetails?.fullName}
        </h1>
        <h2 style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {personalDetails?.jobTitle}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>
          {personalDetails?.email && <span><a href={`mailto:${personalDetails.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personalDetails.email}</a></span>}
          {personalDetails?.phone && <span>| {personalDetails.phone}</span>}
          {personalDetails?.address && <span>| {personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>| <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a></span>}
          {personalDetails?.github && <span>| <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a></span>}
        </div>
      </div>

      {/* Profile Section */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '700' }}>Profile Summary</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#475569' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Professional Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>{item.jobTitle}</h4>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
                  {item.startDate} — {item.endDate || 'Present'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>{item.degree}</h4>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>{item.startDate} — {item.endDate}</div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>{item.school}</div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Projects</h3>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>{item.name}</h4>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
                    View Project ↗
                  </a>
                )}
              </div>
              {item.technologies && (
                <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '600', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                  {item.technologies}
                </div>
              )}
              {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills Grouped */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '700' }}>Core Competencies</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {skills.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.9rem', color: '#475569' }}>• {item.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ProfessionalTemplate;
