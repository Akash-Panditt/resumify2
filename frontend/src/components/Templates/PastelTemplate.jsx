import React from 'react';

const PastelTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;
  
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap', 
          gap: '1.25rem', 
          fontSize: '0.85rem', 
          color: textMuted, 
          fontWeight: '700',
          marginTop: '1rem',
          maxWidth: '95%',
          margin: '1rem auto 0 auto'
        }}>
          {personalDetails?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {personalDetails.email}
            </div>
          )}
          {personalDetails?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {personalDetails.phone}
            </div>
          )}
          {personalDetails?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalDetails.address}
            </div>
          )}
          {personalDetails?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
            </div>
          )}
          {personalDetails?.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
            </div>
          )}
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

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: textDark, marginBottom: '1.25rem', display: 'inline-block', paddingBottom: '0.2rem', borderBottom: `3px solid ${accentDark}` }}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
            {languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ backgroundColor: 'white', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.95rem', fontWeight: '800', color: textDark, boxShadow: '0 2px 4px rgba(0,0,0,0.03)', border: `1px solid ${accentLight}`, marginBottom: '0.25rem' }}>
                  {lang.name}
                </span>
                <span style={{ fontSize: '0.8rem', color: accentDark, fontWeight: '700' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default PastelTemplate;
