import React from 'react';

const DesignerTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;

  const primary = '#18181b'; // Zinc 900
  const highlight = '#ec4899'; // Pink 500

  return (
    <div ref={ref} style={{ padding: '0', backgroundColor: '#fdfdfd', color: '#27272a', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '1056px' }}>
        
        {/* Left Sidebar */}
        <div style={{ backgroundColor: '#18181b', color: '#f4f4f5', padding: '3rem 2rem' }}>
          
          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', lineHeight: '1.1', marginBottom: '0.5rem', wordBreak: 'break-word' }}>
            {personalDetails?.fullName ? personalDetails.fullName.split(' ').map((n, i) => <div key={i}>{n}</div>) : 'Name'}
          </h1>
          <div style={{ fontSize: '1rem', color: highlight, fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3rem' }}>
            {personalDetails?.jobTitle || 'Designer'}
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#e4e4e7' }}>
              {personalDetails?.email && <div style={{ wordBreak: 'break-all' }}>{personalDetails.email}</div>}
              {personalDetails?.phone && <div>{personalDetails.phone}</div>}
              {personalDetails?.linkedin && <div style={{ color: highlight }}>{personalDetails.linkedin}</div>}
              {personalDetails?.address && <div>{personalDetails.address}</div>}
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#27272a', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: '#fff' }}>{item.degree}</strong>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', margin: '0.25rem 0' }}>{item.school}</span>
                  <span style={{ fontSize: '0.75rem', color: highlight, letterSpacing: '1px' }}>{item.startDate} - {item.endDate}</span>
                </div>
              ))}
            </div>
          )}

          {languages && languages.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Languages</h3>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', fontSize: '0.95rem', color: '#fff' }}>
                    <span>{l.name}</span>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[1, 2, 3].map((dot) => (
                        <div key={dot} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dot <= Number(l.level) ? highlight : '#27272a' }}></div>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                    {l.level === 1 && "Basic"}
                    {l.level === 2 && "Intermediate"}
                    {l.level === 3 && "Fluent"}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Content */}
        <div style={{ padding: '4rem 3rem' }}>
          
          {personalDetails?.summary && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: primary, marginBottom: '1rem' }}>Profile</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#52525b' }}>{personalDetails.summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: primary, marginBottom: '2rem' }}>Experience</h2>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-15px', top: '8px', width: '6px', height: '6px', backgroundColor: highlight, borderRadius: '50%' }}></div>
                  <strong style={{ display: 'block', fontSize: '1.25rem', color: primary, letterSpacing: '-0.5px' }}>{item.jobTitle}</strong>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '0.25rem 0 0.75rem 0' }}>
                    <span style={{ fontSize: '1rem', color: '#52525b', fontWeight: '500' }}>{item.company}</span>
                    <span style={{ fontSize: '0.85rem', color: '#a1a1aa', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.startDate} - {item.endDate}</span>
                  </div>
                  {item.description && <p style={{ fontSize: '0.95rem', color: '#52525b', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: primary, marginBottom: '2rem' }}>Selected Works</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {projects.map((item, idx) => (
                  <div key={idx} style={{ padding: '1.5rem', border: '1px solid #e4e4e7', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: primary }}>{item.name}</strong>
                      {item.link && <a href={item.link} style={{ fontSize: '0.85rem', color: highlight, textDecoration: 'none' }}>View Project ↗</a>}
                    </div>
                    {item.technologies && <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>{item.technologies}</div>}
                    {item.description && <p style={{ fontSize: '0.95rem', color: '#52525b', lineHeight: '1.5' }}>{item.description}</p>}
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

export default DesignerTemplate;
