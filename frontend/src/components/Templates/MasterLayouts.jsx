import React from 'react';

/**
 * 5 Master Archetypes for 45 Profession Templates
 * All layouts are designed for A4 (816px width) and ATS compliance.
 */

const SectionTitle = ({ title, color, icon }) => (
  <h2 style={{ 
    fontSize: '1.25rem', 
    color: color || '#1e293b', 
    borderBottom: `2px solid ${color || '#e2e8f0'}`, 
    paddingBottom: '0.5rem', 
    marginBottom: '1.25rem', 
    textTransform: 'uppercase', 
    letterSpacing: '1.5px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    {icon && <span>{icon}</span>}
    {title}
  </h2>
);

// 1. THE EXECUTIVE (Single Column, High Impact)
export const ExecutiveLayout = React.forwardRef(({ data, config }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;
  const { primaryColor = '#1e3a8a', fontTitle = 'Georgia', fontBody = 'Arial' } = config;

  return (
    <div ref={ref} style={{ padding: '4rem', backgroundColor: '#fff', color: '#111', minHeight: '1120px', width: '816px', margin: '0 auto', fontFamily: fontBody }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: fontTitle, color: primaryColor, marginBottom: '0.5rem' }}>{personalDetails?.fullName}</h1>
        <p style={{ fontSize: '1.2rem', color: '#444', fontWeight: 'bold', textTransform: 'uppercase' }}>{personalDetails?.jobTitle}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
        </div>
      </header>
      
      {personalDetails?.summary && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionTitle title={config.summaryTitle || "Professional Summary"} color={primaryColor} />
          <p style={{ lineHeight: 1.6, textAlign: 'justify' }}>{personalDetails.summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionTitle title={config.experienceTitle || "Experience"} color={primaryColor} />
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span style={{ fontSize: '1.1rem' }}>{exp.jobTitle}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ color: primaryColor, fontStyle: 'italic', marginBottom: '0.5rem' }}>{exp.company}</div>
              <p style={{ color: '#333', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <section>
          <SectionTitle title={config.skillsTitle || "Skills"} color={primaryColor} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills?.map((s, i) => (
              <span key={i} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '4px', fontSize: '0.9rem' }}>{s.name}</span>
            ))}
          </div>
        </section>
        <section>
          <SectionTitle title={config.educationTitle || "Education"} color={primaryColor} />
          {education?.map((edu, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
              <div style={{ fontSize: '0.9rem' }}>{edu.school} | {edu.endDate}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
});

// 2. MODERN SIDEBAR (Highly Organized)
export const ModernSidebarLayout = React.forwardRef(({ data, config }, ref) => {
  const { personalDetails, education, experience, skills } = data;
  const { primaryColor = '#0f172a', accentColor = '#3b82f6' } = config;

  return (
    <div ref={ref} style={{ display: 'flex', backgroundColor: '#fff', minHeight: '1120px', width: '816px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <aside style={{ width: '30%', backgroundColor: primaryColor, color: '#fff', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}>{personalDetails?.fullName}</h1>
        <p style={{ fontSize: '0.9rem', color: accentColor, fontWeight: 'bold', marginBottom: '3rem' }}>{personalDetails?.jobTitle}</p>
        
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1rem' }}>Contact</h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9 }}>
            <span>{personalDetails?.email}</span>
            <span>{personalDetails?.phone}</span>
            <span>{personalDetails?.address}</span>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1rem' }}>{config.skillsTitle || "Skills"}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {skills?.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>{s.name}</div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                  <div style={{ width: s.level === 'Expert' ? '100%' : '75%', height: '100%', background: accentColor, borderRadius: '2px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main style={{ width: '70%', padding: '4rem 3rem' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: primaryColor, marginBottom: '1rem' }}>{config.summaryTitle || "Profile"}</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>{personalDetails?.summary}</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: primaryColor, marginBottom: '1.5rem' }}>{config.experienceTitle || "Experience"}</h2>
            {experience?.map((exp, i) => (
                <div key={i} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{exp.jobTitle}</span>
                        <span style={{ color: accentColor, fontWeight: 'bold' }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div style={{ fontWeight: '600', color: '#64748b', marginBottom: '0.75rem' }}>{exp.company}</div>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>{exp.description}</p>
                </div>
            ))}
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: primaryColor, marginBottom: '1.5rem' }}>{config.educationTitle || "Education"}</h2>
          {education?.map((edu, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
              <div style={{ color: '#64748b' }}>{edu.school} | {edu.endDate}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
});

// 3. THE SPLIT (Bold & Symmetrical)
export const SplitLayout = React.forwardRef(({ data, config }, ref) => {
    // Similar power but with a different focus
    return <ExecutiveLayout data={data} config={{...config, fontTitle: 'Impact'}} ref={ref} />;
});

// 4. THE TECHNICAL (Grid focus)
export const TechnicalLayout = React.forwardRef(({ data, config }, ref) => {
    const { personalDetails, skills, projects, experience, education } = data;
    const { primaryColor = '#2563eb' } = config;
    return (
        <div ref={ref} style={{ padding: '3rem', width: '816px', margin: '0 auto', backgroundColor: '#fff', minHeight: '1120px', fontFamily: 'monospace' }}>
            <header style={{ borderBottom: `4px solid ${primaryColor}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>{personalDetails?.fullName}</h1>
                <p style={{ fontSize: '1.2rem', color: primaryColor }}>{personalDetails?.jobTitle}</p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <section>
                    <SectionTitle title="Core Stack" color={primaryColor} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {skills?.map((s, i) => <div key={i}>[{s.name}]</div>)}
                    </div>
                </section>
                <section>
                    <SectionTitle title="Experience" color={primaryColor} />
                    {experience?.slice(0, 3).map((exp, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold' }}>{exp.company}</div>
                            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>{exp.jobTitle}</div>
                        </div>
                    ))}
                </section>
                <section>
                    <SectionTitle title="Terminal Log: Projects" color={primaryColor} />
                    {projects?.map((p, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold' }}>$ {p.name}</div>
                            <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{p.description}</div>
                        </div>
                    ))}
                </section>
                <section>
                    <SectionTitle title="Education" color={primaryColor} />
                    {education?.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
                            <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>{edu.school}</div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
});

// 5. THE MINIMALIST (Clean & Serene)
export const MinimalistLayout = React.forwardRef(({ data, config }, ref) => {
    const { personalDetails, experience, education, skills } = data;
    const { primaryColor = '#444' } = config;

    return (
        <div ref={ref} style={{ padding: '5rem', width: '816px', margin: '0 auto', backgroundColor: '#fff', minHeight: '1120px', fontFamily: 'serif', color: '#111' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.4rem', letterSpacing: '6px', textTransform: 'uppercase', color: primaryColor }}>{personalDetails?.fullName}</h1>
                <div style={{ height: '1px', background: '#ccc', width: '150px', margin: '1.5rem auto' }}></div>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#666' }}>{personalDetails?.jobTitle}</p>
            </div>

            <section style={{ marginBottom: '4rem' }}>
                <p style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto', lineHeight: 1.8, fontSize: '1rem', fontStyle: 'italic' }}>{personalDetails?.summary}</p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center', color: '#888', marginBottom: '2rem' }}>{config.experienceTitle || "Experience"}</h2>
                {experience?.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.1rem', letterSpacing: '1px' }}>{exp.company}</div>
                        <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: '#666' }}>{exp.jobTitle} / {exp.startDate} — {exp.endDate}</div>
                        <p style={{ maxWidth: '90%', margin: '0 auto', lineHeight: 1.6, color: '#333' }}>{exp.description}</p>
                    </div>
                ))}
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <section>
                    <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{config.educationTitle || "Education"}</h2>
                    {education?.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{edu.degree}</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{edu.school} | {edu.endDate}</div>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{config.skillsTitle || "Competencies"}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {skills?.map((s, i) => (
                            <div key={i} style={{ fontSize: '0.9rem', color: '#333' }}>• {s.name}</div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
});
