import React from 'react';

const ExecutiveCoffeeTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, references, projects, languages } = data;

  const coffee = '#dcd2c3';
  const darkBrown = '#4a3728';
  const textGray = '#525252';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: darkBrown, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Outfit', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Header */}
      <div style={{ backgroundColor: coffee, padding: '3rem', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <div style={{ width: '60%' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', lineHeight: '1', marginBottom: '0.5rem' }}>
            {personalDetails?.fullName || 'Jonathan Patterson'}
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: '500', color: darkBrown, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
            {personalDetails?.jobTitle || 'Marketing Manager'}
          </div>
        </div>
        
        {/* Absolute Photo */}
        <div style={{ 
          position: 'absolute', 
          left: '3rem', 
          bottom: '-60px', 
          width: '180px', 
          height: '180px', 
          borderRadius: '50%', 
          border: '10px solid #fff',
          overflow: 'hidden',
          backgroundColor: '#eee'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#ccc' }}>
              {personalDetails?.fullName?.charAt(0) || 'J'}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(1056px - 220px)' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: '#faf9f6', padding: '100px 2.5rem 3rem 2.5rem', borderRight: '1px solid #eee' }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', color: textGray }}>
              {personalDetails?.email && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkBrown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span style={{ wordBreak: 'break-all', lineHeight: '1.4' }}>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkBrown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ lineHeight: '1' }}>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails?.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkBrown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ lineHeight: '1.4' }}>{personalDetails.address}</span>
                </div>
              )}
              {personalDetails?.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkBrown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: darkBrown, textDecoration: 'none', fontWeight: '600' }}>LinkedIn</a>
                </div>
              )}
              {personalDetails?.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkBrown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: darkBrown, textDecoration: 'none', fontWeight: '600' }}>GitHub</a>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Education</h3>
            {education?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{item.degree}</div>
                <div style={{ fontSize: '0.85rem', color: textGray, margin: '0.2rem 0' }}>{item.school}</div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>{item.startDate} - {item.endDate}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: textGray }}>
              {skills?.map((s, i) => (
                <div key={i}>{s.name}</div>
              ))}
            </div>
          </div>

          {languages && languages.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Languages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: textGray }}>
                {languages.map((lang, i) => (
                  <div key={i}>
                    <div style={{ fontWeight: '700', color: darkBrown }}>{lang.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ padding: '80px 3rem 3rem 3rem' }}>
          
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Profile</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: textGray }}>
              {personalDetails?.summary || 'A results-driven professional with a proven track record of success in various industries.'}
            </p>
          </div>

          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Experience</h2>
            {experience?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1.25rem', color: darkBrown }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
                </div>
                <div style={{ fontSize: '1rem', color: textGray, fontWeight: '600', marginBottom: '0.75rem' }}>{item.company}</div>
                {item.description && (
                  <p style={{ fontSize: '0.95rem', color: textGray, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {projects && projects.length > 0 && (
            <div style={{ marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Projects</h2>
              {projects.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1.25rem', color: darkBrown }}>{item.name}</strong>
                    {item.link && (
                      <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noopener noreferrer" style={{ color: darkBrown, textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600' }}>
                        View Project ↗
                      </a>
                    )}
                  </div>
                  {item.technologies && <div style={{ fontSize: '1rem', color: textGray, fontWeight: '600', marginBottom: '0.75rem', fontStyle: 'italic' }}>{item.technologies}</div>}
                  {item.description && (
                    <p style={{ fontSize: '0.95rem', color: textGray, lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {references && references.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Reference</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {references.map((item, idx) => (
                  <div key={idx}>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>{item.name}</strong>
                    <div style={{ fontSize: '0.9rem', color: textGray }}>{item.position} / {item.company}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

export default ExecutiveCoffeeTemplate;
