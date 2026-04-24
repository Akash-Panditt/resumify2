import React from 'react';

const FormalTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;
  const navy = '#1e3a8a';
  const textDark = '#111827';
  const textMuted = '#4b5563';

  return (
    <div ref={ref} style={{ padding: '3.5rem 3rem', backgroundColor: '#ffffff', color: textDark, minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: navy, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
          {personalDetails?.fullName || 'Dr. Jane Smith'}
        </h1>
        <div style={{ fontSize: '1.1rem', color: textMuted, fontStyle: 'italic', marginBottom: '1rem', borderBottom: `2px solid ${navy}`, paddingBottom: '1rem', display: 'inline-block' }}>
          {personalDetails?.jobTitle || 'Medical Professional'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: textDark, marginTop: '0.5rem', fontWeight: '500' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>LinkedIn</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: navy, borderBottom: `1px solid ${navy}`, paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.90rem', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: navy, borderBottom: `1px solid ${navy}`, paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Professional Experience
          </h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1rem', color: textDark }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '0.85rem', color: textMuted, fontWeight: 'bold' }}>{item.startDate} – {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: navy, fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: navy, borderBottom: `1px solid ${navy}`, paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Education & Certifications
          </h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1rem', color: textDark }}>{item.degree}</strong>
                <span style={{ fontSize: '0.85rem', color: textMuted, fontWeight: 'bold' }}>{item.startDate} – {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: navy, fontStyle: 'italic' }}>{item.school}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: navy, borderBottom: `1px solid ${navy}`, paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Core Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: '#333' }}>
            {skills.map((s, i) => (
              <div key={i}>• {s.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default FormalTemplate;
