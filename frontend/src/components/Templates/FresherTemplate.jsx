import React from 'react';

const FresherTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const accent = '#0ea5e9'; // Sky blue
  const textMain = '#334155';
  const textMuted = '#64748b';

  return (
    <div ref={ref} style={{ padding: '3.5rem 4rem', backgroundColor: '#ffffff', color: textMain, minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', margin: '0 0 0.5rem 0', letterSpacing: '-1px' }}>
          {personalDetails?.fullName || 'First Last'}
        </h1>
        <div style={{ fontSize: '1.25rem', color: accent, fontWeight: '500', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {personalDetails?.jobTitle || 'Aspiring Professional'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.95rem', color: textMuted }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails?.linkedin && <span>• {personalDetails.linkedin}</span>}
        </div>
      </div>

      {personalDetails?.summary && (
        <div style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: '#f0f9ff', borderRadius: '8px', borderLeft: `4px solid ${accent}` }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#0f172a' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Education - Focus for freshers */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: accent }}>01.</span> Education
          </h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: accent, borderRadius: '50%' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <strong style={{ fontSize: '1.2rem', color: '#0f172a' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.95rem', color: accent, fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '1.05rem', color: textMuted, marginTop: '0.25rem' }}>{item.school}</div>
              {item.description && <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', color: textMain }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: accent }}>02.</span> Technical Skills
          </h2>
          <div style={{ paddingLeft: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ padding: '0.4rem 1rem', border: `1px solid #cbd5e1`, borderRadius: '4px', fontSize: '0.95rem', color: textMain }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: accent }}>03.</span> Academic Projects
          </h2>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <strong style={{ fontSize: '1.15rem', color: '#0f172a' }}>{item.name}</strong>
              {item.technologies && <span style={{ fontSize: '0.95rem', color: accent, marginLeft: '0.5rem' }}>| {item.technologies}</span>}
              {item.description && <p style={{ fontSize: '0.95rem', color: textMain, marginTop: '0.5rem', lineHeight: '1.5' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Experience / Internships */}
      {experience && experience.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: accent }}>04.</span> Internships & Experience
          </h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '1.15rem', color: '#0f172a' }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '0.95rem', color: textMuted }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '1.05rem', color: accent, marginBottom: '0.5rem' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.95rem', color: textMain, lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

    </div>
  );
});

export default FresherTemplate;
