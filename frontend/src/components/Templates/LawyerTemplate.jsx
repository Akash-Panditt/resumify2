import React from 'react';

const LawyerTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3.5rem', backgroundColor: '#ffffff', color: '#000000', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {personalDetails?.fullName || 'Full Name'}
        </h1>
        <div style={{ height: '1px', backgroundColor: '#000', margin: '0 20%', marginBottom: '1rem' }}></div>
        <div style={{ fontSize: '0.95rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', color: '#333' }}>
          {personalDetails?.address && <span>{personalDetails.address}</span>}
          {personalDetails?.phone && <span>• {personalDetails.phone} •</span>}
          {personalDetails?.email && <span>{personalDetails.email}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', textAlign: 'justify' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Experience</h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1.05rem', textTransform: 'uppercase' }}>{item.company}</strong>
                <span style={{ fontSize: '1rem' }}>{item.startDate} – {item.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '1rem', marginBottom: '0.5rem' }}>{item.jobTitle}</div>
              {item.description && <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Education</h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1.05rem' }}>{item.school}</strong>
                <span style={{ fontSize: '1rem' }}>{item.endDate || item.startDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '1rem' }}>{item.degree}</div>
              {item.description && <p style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Admissions / Bar / Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Bar Admissions & Skills</h2>
          <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {skills.map((s, i) => (
              <span key={i}>
                {s.name}
                {i < skills.length - 1 ? ' | ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Publications / Pro Bono */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Publications & Pro Bono</h2>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <strong style={{ fontSize: '1rem' }}>{item.name}</strong>
              {item.technologies && <span style={{ fontStyle: 'italic', marginLeft: '0.5rem' }}>{item.technologies}</span>}
              {item.description && <p style={{ fontSize: '0.95rem', marginTop: '0.25rem', textAlign: 'justify' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default LawyerTemplate;
