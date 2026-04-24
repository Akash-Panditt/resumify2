import React from 'react';

const PastelTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;
  
  // Soft pastel color palette
  const bg = '#fefcf8';
  const accentLight = '#fef1e6'; // Peach/pastel orange header bubble
  const accentDark = '#f97316'; // Orange text accent
  const textDark = '#431407'; // Deep warm brown instead of black
  const textMuted = '#78350f'; // Lighter brown for secondary text

  return (
    <div ref={ref} style={{ padding: '3rem', backgroundColor: bg, color: textDark, minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Friendly Header */}
      <div style={{ textAlign: 'center', backgroundColor: accentLight, padding: '3rem 2rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
        {personalDetails?.photo && (
          <img 
            src={personalDetails.photo} 
            alt="Profile" 
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: `4px solid white`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} 
          />
        )}
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: textDark, marginBottom: '0.25rem' }}>
          {personalDetails?.fullName || 'Alex Friendly'}
        </h1>
        <div style={{ fontSize: '1.2rem', color: accentDark, fontWeight: '700', marginBottom: '1rem' }}>
          {personalDetails?.jobTitle || 'Customer Success Specialist'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: textMuted, fontWeight: '600' }}>
          {personalDetails?.email && <span>📧 {personalDetails.email}</span>}
          {personalDetails?.phone && <span>📱 {personalDetails.phone}</span>}
          {personalDetails?.address && <span>📍 {personalDetails.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2rem', textAlign: 'center', padding: '0 2rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: textMuted, fontStyle: 'italic' }}>"{personalDetails.summary}"</p>
        </div>
      )}

      {/* Skills Grid */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: textDark, marginBottom: '1rem', display: 'inline-block', paddingBottom: '0.2rem', borderBottom: `3px solid ${accentDark}` }}>Specialties</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: '700', color: textDark, boxShadow: '0 2px 4px rgba(0,0,0,0.03)', border: `1px solid ${accentLight}` }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: textDark, marginBottom: '1.5rem', borderBottom: `3px solid ${accentDark}`, display: 'inline-block' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: `1px solid rgba(0,0,0,0.03)` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.1rem', color: textDark, fontWeight: '800' }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.85rem', color: accentDark, fontWeight: '700', backgroundColor: accentLight, padding: '0.2rem 0.6rem', borderRadius: '8px' }}>{item.startDate} – {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: textMuted, fontWeight: '600', marginBottom: '0.75rem' }}>@ {item.company}</div>
                {item.description && <p style={{ fontSize: '0.9rem', color: textMuted, lineHeight: '1.6', whiteSpace: 'pre-wrap', margin: 0 }}>{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: textDark, marginBottom: '1.5rem', borderBottom: `3px solid ${accentDark}`, display: 'inline-block' }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {education.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: textDark, display: 'block', fontWeight: '800' }}>{item.degree}</strong>
                  <span style={{ fontSize: '0.95rem', color: textMuted, fontWeight: '600' }}>{item.school}</span>
                </div>
                <span style={{ fontSize: '0.85rem', color: textMuted, fontWeight: '700' }}>{item.startDate} – {item.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
});

export default PastelTemplate;
