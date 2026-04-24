import React from 'react';

const NurseTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const tealDark = '#0f766e'; // Teal 700
  const tealLight = '#ccfbf1'; // Teal 50
  
  return (
    <div ref={ref} style={{ padding: '0', backgroundColor: '#ffffff', color: '#334155', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      {/* Header Banner */}
      <div style={{ backgroundColor: tealDark, color: 'white', padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 0.5rem 0', letterSpacing: '1px' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1.2rem', color: tealLight, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
          {personalDetails?.jobTitle || 'Registered Nurse'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem', color: '#f0fdfa' }}>
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
        </div>
      </div>

      <div style={{ padding: '2.5rem 3rem' }}>
        {/* Summary */}
        {personalDetails?.summary && (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', textAlign: 'center', color: '#475569', fontStyle: 'italic' }}>
              "{personalDetails.summary}"
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 2fr', gap: '2.5rem' }}>
          {/* Left Column */}
          <div>
            {/* Skills / Certifications */}
            {skills && skills.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: tealDark, borderBottom: `2px solid ${tealLight}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Certifications & Skills</h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {skills.map((s, i) => (
                    <li key={i} style={{ backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '4px', borderLeft: `3px solid ${tealDark}`, fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: tealDark, borderBottom: `2px solid ${tealLight}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Education</h3>
                {education.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#1e293b' }}>{item.degree}</strong>
                    <span style={{ display: 'block', fontSize: '0.9rem', color: tealDark, fontWeight: '600', margin: '0.2rem 0' }}>{item.school}</span>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b' }}>{item.startDate} - {item.endDate}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Voluntary Work / Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', color: tealDark, borderBottom: `2px solid ${tealLight}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>Voluntary Work</h3>
                {projects.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '1rem' }}>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: '#1e293b' }}>{item.name}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Experience) */}
          <div>
            {experience && experience.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', color: tealDark, borderBottom: `2px solid ${tealDark}`, paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: '700' }}>Professional Experience</h3>
                {experience.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: `2px solid ${tealLight}` }}>
                    <div style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: tealDark, left: '-6px', top: '5px' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#1e293b' }}>{item.jobTitle}</strong>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: tealDark, fontWeight: '600', marginBottom: '0.25rem' }}>{item.company}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.5rem' }}>{item.startDate} - {item.endDate}</div>
                    {item.description && <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
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

export default NurseTemplate;
