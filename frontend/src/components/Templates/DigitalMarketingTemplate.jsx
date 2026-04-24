import React from 'react';

const DigitalMarketingTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const primary = '#8b5cf6'; // Violet 500
  const bgDark = '#0f172a'; // Slate 900
  
  return (
    <div ref={ref} style={{ padding: '0', backgroundColor: '#ffffff', color: '#334155', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      
      {/* Header */}
      <div style={{ backgroundColor: bgDark, color: '#f8fafc', padding: '3.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', letterSpacing: '-1px', color: '#fff' }}>
            {personalDetails?.fullName || 'Marketing Pro'}
          </h1>
          <div style={{ fontSize: '1.25rem', color: primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {personalDetails?.jobTitle || 'Digital Marketer'}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.95rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.email && <span style={{ color: primary }}>{personalDetails.email}</span>}
          {personalDetails?.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
        </div>
      </div>

      <div style={{ padding: '3rem' }}>
        {/* Core Competencies / Tools */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: bgDark, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '4px', backgroundColor: primary, display: 'inline-block' }}></span> Core Stack & KPIs
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ padding: '0.4rem 1rem', backgroundColor: '#f1f5f9', color: bgDark, borderRadius: '99px', fontSize: '0.9rem', fontWeight: '600', border: '1px solid #e2e8f0' }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience - Built for Impact & Metrics */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: bgDark, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '4px', backgroundColor: primary, display: 'inline-block' }}></span> Experience & Impact
            </h2>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1.2rem', color: bgDark }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{item.startDate} - {item.endDate}</span>
                </div>
                <div style={{ fontSize: '1.05rem', color: primary, fontWeight: '600', marginBottom: '0.75rem' }}>{item.company}</div>
                {item.description && <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Campaigns / Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.2rem', color: bgDark, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '20px', height: '4px', backgroundColor: primary, display: 'inline-block' }}></span> Key Campaigns
              </h2>
              {projects.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <strong style={{ display: 'block', fontSize: '1rem', color: bgDark }}>{item.name}</strong>
                  {item.technologies && <span style={{ display: 'block', fontSize: '0.85rem', color: primary, fontWeight: '500', marginBottom: '0.25rem' }}>{item.technologies}</span>}
                  {item.description && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.2rem', color: bgDark, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '20px', height: '4px', backgroundColor: primary, display: 'inline-block' }}></span> Education
              </h2>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1rem', color: bgDark }}>{item.degree}</strong>
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#475569', margin: '0.25rem 0' }}>{item.school}</span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item.startDate} - {item.endDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default DigitalMarketingTemplate;
