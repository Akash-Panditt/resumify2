import React from 'react';

const TechTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;
  
  // Minimalist, monochromatic with emerald tech accent
  const primary = '#10b981'; // Emerald 500
  const primaryLight = '#d1fae5';
  const textDark = '#1f2937';
  const textMuted = '#6b7280';
  const bg = '#ffffff';

  return (
    <div ref={ref} style={{ padding: '3.5rem', backgroundColor: bg, color: textDark, minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Fira Code', 'Roboto Mono', Monaco, monospace, sans-serif" }}>
      
      {/* Tech Header */}
      <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: textDark, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          {personalDetails?.fullName || 'Dev Engineer'}
          <span style={{ color: primary }}>.</span>
        </h1>
        <div style={{ fontSize: '1.1rem', color: textMuted, fontWeight: '500', marginBottom: '1.25rem' }}>
          &gt; {personalDetails?.jobTitle || 'Software Developer'}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.85rem', color: textMuted }}>
           {personalDetails?.email && <div><span style={{color: primary}}>→ Contact:</span> {personalDetails.email}</div>}
           {personalDetails?.github && <div><span style={{color: primary}}>→ GitHub:</span> {personalDetails.github}</div>}
           {personalDetails?.linkedin && <div><span style={{color: primary}}>→ LinkedIn:</span> {personalDetails.linkedin}</div>}
           {personalDetails?.address && <div><span style={{color: primary}}>→ Location:</span> {personalDetails.address}</div>}
        </div>
      </div>

      {/* Tech Stack (Skills) */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: textDark, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: primary, marginRight: '0.5rem' }}>#</span> Tech Stack
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ backgroundColor: primaryLight, color: '#065f46', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects (Highlighted for Tech) */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: textDark, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: primary, marginRight: '0.5rem' }}>#</span> Open Source & Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.05rem', color: textDark }}>{item.name}</strong>
                  {item.link && <a href={item.link} style={{ fontSize: '0.8rem', color: primary, textDecoration: 'none' }}>[View Code]</a>}
                </div>
                {item.technologies && <div style={{ fontSize: '0.8rem', color: textMuted, marginBottom: '0.5rem', fontFamily: 'monospace' }}>[{item.technologies}]</div>}
                {item.description && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.6', margin: 0 }}>{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: textDark, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: primary, marginRight: '0.5rem' }}>#</span> Experience
          </h2>
          <div style={{ borderLeft: `2px solid ${primaryLight}`, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.85rem', top: '0.3rem', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: primary, border: '3px solid white' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.05rem', color: textDark }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.85rem', color: primary, fontWeight: '700' }}>{item.startDate} – {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: textMuted, fontWeight: '600', marginBottom: '0.5rem' }}>{item.company}</div>
                {item.description && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: textDark, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: primary, marginRight: '0.5rem' }}>#</span> Education
          </h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: textDark, display: 'block' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.85rem', color: textMuted }}>{item.school}</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: textMuted, fontWeight: '600', fontFamily: 'monospace' }}>{item.startDate}-{item.endDate}</span>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
});

export default TechTemplate;
