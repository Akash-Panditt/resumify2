import React from 'react';

const DoctorTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  // Clinical Medical Blue
  const primaryColor = '#1e3a8a';
  const secondaryColor = '#3b82f6';
  
  return (
    <div ref={ref} style={{ padding: '3rem', backgroundColor: '#ffffff', color: '#1f2937', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Georgia', serif", lineHeight: 1.6 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '60%' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: primaryColor, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            {personalDetails?.fullName || 'Dr. Firstname Lastname'}
          </h1>
          <div style={{ fontSize: '1.2rem', color: secondaryColor, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {personalDetails?.jobTitle || 'Medical Professional'}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>{personalDetails.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: primaryColor, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Professional Profile</h2>
          <p style={{ fontSize: '1rem', color: '#374151', textAlign: 'justify' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Clinical Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: primaryColor, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Experience</h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1.1rem', color: '#111827' }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '0.9rem', color: primaryColor, fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '1rem', color: '#4b5563', fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.95rem', color: '#374151', whiteSpace: 'pre-wrap', marginTop: '0.25rem', paddingLeft: '1rem', borderLeft: `2px solid #e5e7eb` }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education & Licensure */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: primaryColor, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Education & Licensure</h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#4b5563' }}>{item.school}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#4b5563', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills / Procedures */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: primaryColor, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Competencies & Procedures</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '0.95rem', color: '#374151' }}>
                <span style={{ color: secondaryColor, marginRight: '8px' }}>▸</span>
                {s.name} {s.level ? <span style={{ color: '#9ca3af', fontSize: '0.85rem', marginLeft: '4px' }}>— {s.level}</span> : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research / Publications (Mapped from Projects) */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem', breakInside: 'avoid' }}>
          <h2 style={{ fontSize: '1.25rem', color: primaryColor, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Research & Publications</h2>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '1rem', color: '#111827', fontWeight: 'bold' }}>{item.name}</div>
              {item.technologies && <div style={{ fontSize: '0.85rem', color: secondaryColor }}>{item.technologies}</div>}
              {item.description && <p style={{ fontSize: '0.95rem', color: '#374151', marginTop: '0.25rem' }}>{item.description}</p>}
              {item.link && <a href={item.link} style={{ fontSize: '0.85rem', color: primaryColor, textDecoration: 'none' }}>{item.link}</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default DoctorTemplate;
