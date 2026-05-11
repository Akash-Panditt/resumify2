import React from 'react';

const MarketingMasterTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, languages, references } = data;

  const sidebarBg = '#000000';
  const accent = '#a47e5e'; // Brownish accent from image
  const textGray = '#94a3b8';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: '#1e293b', 
      minHeight: '1056px', 
      width: '816px', 
      fontFamily: "'Montserrat', 'Inter', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '1056px' }}>
        {/* Left Sidebar */}
        <div style={{ backgroundColor: sidebarBg, color: '#fff', padding: '3rem 1.5rem' }}>
          
          {/* Photo */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              backgroundColor: '#334155', 
              margin: '0 auto',
              overflow: 'hidden',
              border: '5px solid #fff'
            }}>
              {personalDetails?.photo ? (
                <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', color: textGray }}>
                  {personalDetails?.fullName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          </div>

          {/* About Me */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', borderLeft: `4px solid ${accent}`, paddingLeft: '12px' }}>About Me</h3>
            <p style={{ fontSize: '0.85rem', color: textGray, lineHeight: '1.6' }}>
              {personalDetails?.summary || 'Brief summary of your professional background and key achievements.'}
            </p>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', borderLeft: `4px solid ${accent}`, paddingLeft: '12px' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.degree}</div>
                  <div style={{ fontSize: '0.8rem', color: textGray, margin: '0.2rem 0' }}>{item.school}</div>
                  <div style={{ fontSize: '0.75rem', color: accent, fontWeight: '600' }}>{item.startDate} - {item.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', borderLeft: `4px solid ${accent}`, paddingLeft: '12px' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                      <span>{s.name}</span>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '80%', height: '100%', backgroundColor: accent }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', borderLeft: `4px solid ${accent}`, paddingLeft: '12px' }}>Language</h3>
              <div style={{ fontSize: '0.85rem', color: textGray, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {languages.map((l, i) => (
                  <div key={i}>{l.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ backgroundColor: accent, padding: '3.5rem 2.5rem', color: '#fff' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', lineHeight: '1', marginBottom: '0.5rem' }}>
              {personalDetails?.fullName || 'LORNA ALVARADO'}
            </h1>
            <div style={{ fontSize: '1.25rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {personalDetails?.jobTitle || 'MARKETING MANAGER'}
            </div>
          </div>

          <div style={{ padding: '3rem 2.5rem', flex: 1 }}>
            {/* Contact Info (Right aligned) */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>
              {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
              {personalDetails?.email && <div>✉️ {personalDetails.email}</div>}
              {personalDetails?.address && <div>📍 {personalDetails.address}</div>}
            </div>

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div style={{ marginBottom: '3.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#000', marginBottom: '2rem' }}>Experience</h2>
                {experience.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '2.5rem', position: 'relative', paddingLeft: '2rem' }}>
                    <div style={{ position: 'absolute', left: '0', top: '8px', width: '10px', height: '10px', border: `2px solid ${accent}`, borderRadius: '50%', backgroundColor: '#fff' }}></div>
                    <div style={{ position: 'absolute', left: '4px', top: '18px', bottom: '-20px', width: '2px', backgroundColor: '#f1f5f9', display: idx === experience.length - 1 ? 'none' : 'block' }}></div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.15rem', color: '#000' }}>{item.jobTitle}</strong>
                        <span style={{ fontSize: '1rem', color: accent, fontWeight: '600' }}>{item.company}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '700' }}>{item.startDate} - {item.endDate}</span>
                    </div>
                    {item.description && (
                      <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* References */}
            {references && references.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#000', marginBottom: '2rem' }}>References</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                  {references.map((item, idx) => (
                    <div key={idx}>
                      <strong style={{ display: 'block', fontSize: '1rem', color: '#000' }}>{item.name}</strong>
                      <div style={{ fontSize: '0.9rem', color: accent, fontWeight: '600', marginBottom: '0.2rem' }}>{item.position}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Company: {item.company}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Email: {item.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MarketingMasterTemplate;
