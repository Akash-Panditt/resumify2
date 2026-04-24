import React from 'react';

const TeacherTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const accentColor = '#d97706'; // Warm amber/orange
  const bgSoft = '#fffbeb'; // Light amber background for header

  return (
    <div ref={ref} style={{ padding: '0', backgroundColor: '#ffffff', color: '#1f2937', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Quicksand', 'Nunito', sans-serif" }}>
      
      {/* Header */}
      <div style={{ backgroundColor: bgSoft, padding: '3rem', borderBottom: `4px solid ${accentColor}`, textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
          {personalDetails?.fullName || 'Educator Name'}
        </h1>
        <div style={{ fontSize: '1.25rem', color: accentColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
          {personalDetails?.jobTitle || 'Teacher / Educator'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.95rem', color: '#4b5563', fontWeight: '500' }}>
          {personalDetails?.phone && <span>📞 {personalDetails.phone}</span>}
          {personalDetails?.email && <span>✉️ {personalDetails.email}</span>}
          {personalDetails?.address && <span>📍 {personalDetails.address}</span>}
        </div>
      </div>

      <div style={{ padding: '3rem' }}>
        {/* Summary */}
        {personalDetails?.summary && (
          <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '-15px', fontSize: '3rem', color: '#fde68a', opacity: 0.5, zIndex: 0 }}>"</div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', position: 'relative', zIndex: 1 }}>{personalDetails.summary}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 2fr', gap: '3rem' }}>
          {/* Left Column */}
          <div>
            {/* Education First for Teachers! */}
            {education && education.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: accentColor, borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase' }}>Education</h3>
                {education.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#111827' }}>{item.degree}</strong>
                    <span style={{ display: 'block', fontSize: '0.95rem', color: '#4b5563', margin: '0.25rem 0' }}>{item.school}</span>
                    <span style={{ display: 'inline-block', padding: '0.2rem 0.5rem', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '0.8rem', color: '#6b7280', fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
                    {item.description && <p style={{ fontSize: '0.9rem', color: '#4b5563', marginTop: '0.5rem' }}>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications/Skills */}
            {skills && skills.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: accentColor, borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase' }}>Certifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {skills.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#374151', fontWeight: '500' }}>
                      <span style={{ color: accentColor }}>✓</span> {s.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Teaching Experience) */}
          <div>
            {experience && experience.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: accentColor, borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase' }}>Teaching Experience</h3>
                {experience.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1.15rem', color: '#111827' }}>{item.jobTitle}</strong>
                      <span style={{ fontSize: '0.9rem', color: accentColor, fontWeight: '700' }}>{item.startDate} - {item.endDate}</span>
                    </div>
                    <div style={{ fontSize: '1rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.75rem' }}>{item.company}</div>
                    {item.description && <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Extracurriculars */}
            {projects && projects.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: accentColor, borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase' }}>Extracurricular Leadership</h3>
                {projects.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#111827' }}>{item.name}</strong>
                    {item.description && <p style={{ fontSize: '0.95rem', color: '#4b5563', marginTop: '0.25rem', lineHeight: '1.5' }}>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TeacherTemplate;
