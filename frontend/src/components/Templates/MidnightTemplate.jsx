import React from 'react';

const MidnightTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages, references } = data;

  const navy = '#1e293b'; // Slate 800 or similar navy
  const accent = '#3b82f6'; // Blue 500

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: '#334155', 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '1056px' }}>
        
        {/* Sidebar */}
        <div style={{ backgroundColor: navy, color: '#f8fafc', padding: '2.5rem 1.5rem' }}>
          
          {/* Photo */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: '140px', 
              height: '140px', 
              borderRadius: '50%', 
              backgroundColor: '#334155', 
              margin: '0 auto',
              overflow: 'hidden',
              border: '4px solid rgba(255,255,255,0.1)'
            }}>
              {personalDetails?.photo ? (
                <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#94a3b8' }}>
                  {personalDetails?.fullName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              {personalDetails?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: accent }}>📞</span> {personalDetails.phone}
                </div>
              )}
              {personalDetails?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
                  <span style={{ color: accent }}>✉️</span> {personalDetails.email}
                </div>
              )}
              {personalDetails?.address && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: accent }}>📍</span> {personalDetails.address}
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: accent, fontWeight: '600' }}>{item.startDate} - {item.endDate}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '0.2rem' }}>{item.degree}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.school}</div>
                </div>
              ))}
            </div>
          )}

          {/* Expertise/Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Expertise</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: accent, borderRadius: '50%' }}></div>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Language</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>{l.name}</div>
                  <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${(l.level / 5) * 100}%`, height: '100%', backgroundColor: accent }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ padding: '3rem 2.5rem' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: navy, textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1', marginBottom: '0.5rem' }}>
              {personalDetails?.fullName || 'Your Name'}
            </h1>
            <div style={{ fontSize: '1.1rem', color: accent, fontWeight: '600', letterSpacing: '1px' }}>
              {personalDetails?.jobTitle || 'Your Profession'}
            </div>
            {personalDetails?.summary && (
              <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>
                {personalDetails.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: navy, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: accent }}>💼</span> Experience
              </h2>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '2rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <div style={{ position: 'absolute', left: '0', top: '6px', width: '8px', height: '8px', backgroundColor: accent, borderRadius: '50%' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', color: navy }}>{item.jobTitle}</strong>
                      <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '500' }}>{item.company}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: accent, fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
                  </div>
                  {item.description && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
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
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: navy, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                Reference
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {references.map((item, idx) => (
                  <div key={idx}>
                    <strong style={{ display: 'block', fontSize: '1rem', color: navy }}>{item.name}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.position} / {item.company}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>P: {item.phone}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>E: {item.email}</div>
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

export default MidnightTemplate;
