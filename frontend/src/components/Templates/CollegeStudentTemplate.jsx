import React from 'react';

const CollegeStudentTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const headerBg = '#f3f4f6'; // Gray 100
  const accent = '#b91c1c'; // Red 700 (University color vibe)

  return (
    <div ref={ref} style={{ padding: '0', backgroundColor: '#ffffff', color: '#1f2937', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      
      {/* Heavy Academic Header */}
      <div style={{ backgroundColor: headerBg, padding: '3rem', borderBottom: `2px solid ${accent}`, textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {personalDetails?.fullName || 'Student Name'}
        </h1>
        <div style={{ fontSize: '1rem', color: '#4b5563', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {personalDetails?.email && <span style={{ fontWeight: 'bold' }}>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem' }}>
          {personalDetails?.linkedin && <span>{personalDetails.linkedin} </span>}
          {personalDetails?.address && <span>| {personalDetails.address}</span>}
        </div>
      </div>

      <div style={{ padding: '2.5rem 3.5rem' }}>
        
        {/* Education First! */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', color: accent, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '1px' }}>Education</h2>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{item.school}</strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{item.endDate || item.startDate}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '1rem', marginBottom: '0.25rem' }}>{item.degree}</div>
                {item.description && <p style={{ fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Coursework & Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', color: accent, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '1px' }}>Coursework & Technical Skills</h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              {skills.map((s, i) => (
                <span key={i}>
                  <strong>{s.name}</strong>
                  {i < skills.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Experience / Leadership */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', color: accent, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '1px' }}>Leadership & Experience</h2>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.05rem', textTransform: 'uppercase' }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.95rem' }}>{item.startDate} – {item.endDate}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '1rem', marginBottom: '0.5rem' }}>{item.company}</div>
                {item.description && <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Academic Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.15rem', color: accent, textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '0.2rem', marginBottom: '1rem', letterSpacing: '1px' }}>Academic Projects</h2>
            {projects.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <strong style={{ fontSize: '1.05rem' }}>{item.name}</strong>
                {item.technologies && <span style={{ fontStyle: 'italic', marginLeft: '0.5rem', color: '#4b5563' }}>({item.technologies})</span>}
                {item.description && <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});

export default CollegeStudentTemplate;
