import React from 'react';

const ModernDarkTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;
  
  // Vibrant accents on deep dark background
  const bg = '#121212';
  const surface = '#1e1e1e';
  const textMain = '#f3f4f6';
  const textMuted = '#9ca3af';
  const accent1 = '#ec4899'; // Hot pink
  const accent2 = '#8b5cf6'; // Violet

  return (
    <div ref={ref} style={{ display: 'flex', backgroundColor: bg, color: textMain, minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      
      {/* Sidebar - Creative Accent */}
      <div style={{ width: '280px', background: `linear-gradient(135deg, ${surface} 0%, #171717 100%)`, borderRight: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '3rem 2rem', background: `linear-gradient(135deg, ${accent2} 0%, ${accent1} 100%)`, color: '#fff', textAlign: 'center' }}>
           <h1 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1.1', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
             {personalDetails?.fullName || 'Alex Doe'}
           </h1>
           <div style={{ fontSize: '0.95rem', fontWeight: '600', opacity: 0.9 }}>
             {personalDetails?.jobTitle || 'Creative Director'}
           </div>
        </div>

        <div style={{ padding: '2rem', flex: 1 }}>
          <h3 style={{ fontSize: '0.85rem', color: accent1, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: textMuted, marginBottom: '2.5rem', wordBreak: 'break-all' }}>
            {personalDetails?.email && <div>Email: <br/><strong style={{color: textMain}}>{personalDetails.email}</strong></div>}
            {personalDetails?.phone && <div>Phone: <br/><strong style={{color: textMain}}>{personalDetails.phone}</strong></div>}
            {personalDetails?.address && <div>Location: <br/><strong style={{color: textMain}}>{personalDetails.address}</strong></div>}
            {personalDetails?.linkedin && <div>LinkedIn: <br/><strong style={{color: textMain}}>{personalDetails.linkedin}</strong></div>}
            {personalDetails?.github && <div>Portfolio: <br/><strong style={{color: textMain}}>{personalDetails.github}</strong></div>}
          </div>

          {skills && skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.85rem', color: accent2, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: textMain }}>{s.name}</span>
                    </div>
                    {/* Progress Bar Visualization */}
                    <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                       <div style={{ 
                         width: s.level === 'Expert' ? '95%' : s.level === 'Advanced' ? '80%' : '60%', 
                         height: '100%', 
                         background: `linear-gradient(90deg, ${accent2}, ${accent1})`,
                         borderRadius: '3px'
                       }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Profile */}
        {personalDetails?.summary && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: textMain, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '3px', background: accent1, display: 'inline-block' }}></span> Profile
            </h2>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: textMuted }}>{personalDetails.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: textMain, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '3px', background: accent2, display: 'inline-block' }}></span> Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map((item, idx) => (
                <div key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '1px solid #333' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '5px', width: '9px', height: '9px', borderRadius: '50%', background: accent1 }}></div>
                  <div style={{ fontSize: '0.8rem', color: accent2, fontWeight: '700', marginBottom: '0.25rem' }}>{item.startDate} – {item.endDate}</div>
                  <h3 style={{ fontSize: '1.05rem', color: textMain, fontWeight: '700', marginBottom: '0.1rem' }}>{item.jobTitle}</h3>
                  <div style={{ fontSize: '0.9rem', color: textMuted, marginBottom: '0.5rem' }}>{item.company}</div>
                  {item.description && <p style={{ fontSize: '0.85rem', color: textMuted, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects / Portfolio */}
        {projects && projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: textMain, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '3px', background: accent1, display: 'inline-block' }}></span> Selected Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {projects.map((item, idx) => (
                <div key={idx} style={{ background: surface, padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h3 style={{ fontSize: '1rem', color: textMain, marginBottom: '0.25rem' }}>{item.name}</h3>
                  {item.technologies && <div style={{ fontSize: '0.75rem', color: accent2, marginBottom: '0.5rem' }}>{item.technologies}</div>}
                  {item.description && <p style={{ fontSize: '0.85rem', color: textMuted, lineHeight: '1.5' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginTop: 'auto' }}>
            <h2 style={{ fontSize: '1.2rem', color: textMain, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '24px', height: '3px', background: accent2, display: 'inline-block' }}></span> Education
            </h2>
            {education.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', color: textMain }}>{item.degree}</h3>
                  <div style={{ fontSize: '0.85rem', color: textMuted }}>{item.school}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: accent1, fontWeight: 'bold' }}>{item.startDate} – {item.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ModernDarkTemplate;
