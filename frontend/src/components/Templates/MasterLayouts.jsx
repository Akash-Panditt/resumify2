import React from 'react';

/**
 * 5 Master Archetypes for 45 Profession Templates
 * All layouts are designed for A4 (816px width) and ATS compliance.
 */

const SectionTitle = ({ title, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', marginTop: '1rem' }}>
    <div style={{ width: '8px', height: '24px', backgroundColor: color || '#1e293b', borderRadius: '2px' }}></div>
    <h2 style={{ 
      fontSize: '1.1rem', 
      color: '#0f172a', 
      textTransform: 'uppercase', 
      letterSpacing: '2px',
      fontWeight: '900',
      margin: 0,
      whiteSpace: 'nowrap'
    }}>{title}</h2>
    <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0', marginLeft: '10px' }}></div>
  </div>
);

// 1. THE EXECUTIVE (Single Column, High Impact)
export const ExecutiveLayout = React.forwardRef(({ data, config }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;
  const { primaryColor = '#1e3a8a', fontTitle = 'Georgia', fontBody = 'Arial' } = config;

  return (
    <div ref={ref} className="resume-canvas" style={{ 
      padding: '20mm 25mm', 
      backgroundColor: '#fff', 
      color: '#1e293b', 
      minHeight: '100%', 
      width: '794px', 
      margin: '0 auto', 
      fontFamily: "'Inter', sans-serif",
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      boxSizing: 'border-box',
      lineHeight: '1.5'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem', borderBottom: `4px solid ${primaryColor}`, paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{personalDetails?.fullName}</h1>
        <p style={{ fontSize: '1.25rem', color: primaryColor, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{personalDetails?.jobTitle}</p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap', 
          gap: '1.25rem', 
          fontSize: '0.85rem', 
          color: '#4b5563', 
          marginTop: '1.25rem',
          maxWidth: '100%',
          margin: '1.25rem auto 0 auto'
        }}>
          {personalDetails?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {personalDetails.email}
            </div>
          )}
          {personalDetails?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {personalDetails.phone}
            </div>
          )}
          {personalDetails?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {personalDetails.address}
            </div>
          )}
          {personalDetails?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>LinkedIn</a>
            </div>
          )}
          {personalDetails?.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>GitHub</a>
            </div>
          )}
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

      {projects?.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionTitle title={config.projectsTitle || "Projects"} color={primaryColor} />
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span style={{ fontSize: '1.1rem' }}>{proj.name}</span>
                {proj.link && (
                  <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', fontSize: '0.9rem' }}>
                    View Project ↗
                  </a>
                )}
              </div>
              {proj.technologies && <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Technologies: {proj.technologies}</div>}
              <p style={{ color: '#333', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <section style={{ breakInside: 'avoid' }}>
          <SectionTitle title={config.skillsTitle || "Skills"} color={primaryColor} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills?.map((s, i) => (
              <span key={i} style={{ 
                background: '#f8fafc', 
                padding: '6px 14px', 
                borderRadius: '8px', 
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#475569',
                border: '1px solid #e2e8f0',
                display: 'inline-block'
              }}>{s.name}</span>
            ))}
          </div>
        </section>
        <section style={{ breakInside: 'avoid' }}>
          <SectionTitle title={config.educationTitle || "Education"} color={primaryColor} />
          {education?.map((edu, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
              <div style={{ fontSize: '0.9rem' }}>{edu.school} | {edu.endDate}</div>
            </div>
          ))}
        </section>
      </div>

      {languages?.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <SectionTitle title={config.languagesTitle || "Languages"} color={primaryColor} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{lang.name}</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

// 2. MODERN SIDEBAR (Highly Organized)
export const ModernSidebarLayout = React.forwardRef(({ data, config }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;
  const { primaryColor = '#0f172a', accentColor = '#3b82f6' } = config;

  return (
    <div ref={ref} style={{ 
      display: 'flex', 
      backgroundColor: '#fff', 
      minHeight: '100%', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: 'Inter, sans-serif',
      wordBreak: 'break-word',
      overflowWrap: 'break-word'
    }}>
      <aside style={{ width: '30%', backgroundColor: primaryColor, color: '#fff', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}>{personalDetails?.fullName}</h1>
        <p style={{ fontSize: '0.9rem', color: accentColor, fontWeight: 'bold', marginBottom: '3rem' }}>{personalDetails?.jobTitle}</p>
        
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1rem' }}>Contact</h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9 }}>
            <span>{personalDetails?.email}</span>
            <span>{personalDetails?.phone}</span>
            <span>{personalDetails?.address}</span>
            {personalDetails?.linkedin && (
              <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                LinkedIn
              </a>
            )}
            {personalDetails?.github && (
              <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                GitHub
              </a>
            )}
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

        {languages?.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1rem' }}>Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {languages.map((lang, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{lang.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{lang.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}
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

        {projects?.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: primaryColor, marginBottom: '1.5rem' }}>{config.projectsTitle || "Projects"}</h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{proj.name}</span>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Link ↗
                    </a>
                  )}
                </div>
                {proj.technologies && <div style={{ fontWeight: '600', color: '#64748b', marginBottom: '0.75rem', fontStyle: 'italic', fontSize: '0.9rem' }}>{proj.technologies}</div>}
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

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
        <div ref={ref} style={{ padding: '3rem', width: '816px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100%', fontFamily: 'monospace' }}>
            <header style={{ borderBottom: `4px solid ${primaryColor}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>{personalDetails?.fullName}</h1>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: primaryColor }}>
                    <span>{personalDetails?.jobTitle}</span>
                    {personalDetails?.linkedin && <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>[LINKEDIN]</a>}
                    {personalDetails?.github && <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>[GITHUB]</a>}
                </div>
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
    const { personalDetails, experience, education, skills, projects, languages } = data;
    const { primaryColor = '#444' } = config;

    return (
        <div ref={ref} style={{ padding: '5rem', width: '816px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100%', fontFamily: 'serif', color: '#111' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.4rem', letterSpacing: '6px', textTransform: 'uppercase', color: primaryColor }}>{personalDetails?.fullName}</h1>
                <div style={{ height: '1px', background: '#ccc', width: '150px', margin: '1.5rem auto' }}></div>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#666' }}>{personalDetails?.jobTitle}</p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flexWrap: 'wrap', 
                  gap: '1.25rem', 
                  fontSize: '0.8rem', 
                  color: '#999', 
                  marginTop: '1rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px' 
                }}>
                  {personalDetails?.linkedin && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                    </div>
                  )}
                  {personalDetails?.github && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                    </div>
                  )}
                </div>
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

            {projects?.length > 0 && (
              <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center', color: '#888', marginBottom: '2rem' }}>{config.projectsTitle || "Projects"}</h2>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.1rem', letterSpacing: '1px' }}>
                      {proj.name}
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '0.5rem', fontSize: '0.8rem' }}>
                          ↗
                        </a>
                      )}
                    </div>
                    {proj.technologies && <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: '#666', fontStyle: 'italic' }}>{proj.technologies}</div>}
                    <p style={{ maxWidth: '90%', margin: '0 auto', lineHeight: 1.6, color: '#333' }}>{proj.description}</p>
                  </div>
                ))}
              </section>
            )}

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

            {languages?.length > 0 && (
              <section style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', textAlign: 'center' }}>Languages</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                  {languages.map((lang, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{lang.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{lang.level}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </div>
    );
});
