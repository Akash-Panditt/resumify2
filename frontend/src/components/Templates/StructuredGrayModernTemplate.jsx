import React from 'react';

const StructuredGrayModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, languages, interests } = data;

  const headerBg = '#0f172a'; // Deep charcoal
  const sidebarBg = '#f8fafc'; // Very light slate
  const accentColor = '#6366f1'; // Indigo
  const textColor = '#1e293b'; // Slate 800

  // Professional SVG Icons
  const IconMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const IconMap = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: textColor,
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      boxShadow: '0 0 40px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Header Section */}
      <div style={{
        backgroundColor: headerBg,
        minHeight: '250px',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        color: '#fff'
      }}>
        <div 
          onClick={data.onPhotoClick}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px',
            position: 'relative'
          }}
        >
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid ${accentColor}40`,
            boxShadow: `0 0 30px rgba(0,0,0,0.3), 0 0 15px ${accentColor}20`,
            backgroundColor: '#1e293b',
            position: 'relative',
            zIndex: 1
          }}>
            {personalDetails?.photo ? (
              <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff',
                background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)',
              }}>
                 <div style={{
                   width: '70px',
                   height: '70px',
                   borderRadius: '50%',
                   background: 'rgba(255,255,255,0.03)',
                   backdropFilter: 'blur(8px)',
                   border: '1px solid rgba(255,255,255,0.1)',
                   marginBottom: '10px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: `0 5px 15px rgba(0,0,0,0.3)`,
                   position: 'relative'
                 }}>
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: accentColor }}>
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                  </svg>
                 </div>
                <span style={{ 
                  fontSize: '0.55rem', 
                  fontWeight: '900', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase', 
                  color: '#94a3b8',
                }}>Import</span>
              </div>
            )}
          </div>
          {personalDetails?.photo && (
            <div style={{ 
              position: 'absolute', 
              inset: '35px', 
              borderRadius: '50%', 
              background: 'rgba(0,0,0,0.4)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              opacity: 0, 
              transition: 'opacity 0.2s ease',
              zIndex: 2 
            }} 
            onMouseEnter={(e) => e.target.style.opacity = 1} 
            onMouseLeave={(e) => e.target.style.opacity = 0}
            >
               <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#fff' }}>CHANGE</span>
            </div>
          )}
        </div>
        <div style={{ padding: '40px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            {personalDetails?.fullName?.split(' ')[0] || 'RUFUS'}<br/>
            <span style={{ color: accentColor }}>{personalDetails?.fullName?.split(' ').slice(1).join(' ') || 'STEWART'}</span>
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', margin: '15px 0 20px 0', letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8' }}>
            {personalDetails?.jobTitle || 'Digital Marketer'}
          </h2>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6', margin: 0, color: '#94a3b8', maxWidth: '420px', borderLeft: `2px solid ${accentColor}`, paddingLeft: '15px' }}>
            {personalDetails?.summary || 'I have been working in the digital marketing industry for more than nine years. I have many experiences working individually and as a team member.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
        {/* Sidebar */}
        <div style={{
          backgroundColor: sidebarBg,
          padding: '45px 35px',
          minHeight: '883px',
          display: 'flex',
          flexDirection: 'column',
          gap: '45px',
          borderRight: '1px solid #e2e8f0'
        }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconPhone /></span>
                <span>{personalDetails?.phone || '+123-456-7890'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconMail /></span>
                <span style={{ wordBreak: 'break-all' }}>{personalDetails?.email || 'hello@reallygreatsite.com'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconMap /></span>
                <span>{personalDetails?.address || '123 Anywhere St., Any City'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Education</h3>
            {(education?.length > 0 ? education : [
              { degree: 'Bachelor of Science in Marketing', school: 'University of Muhammad Patel', startDate: '2007', endDate: '2011', gpa: '3.90' }
            ]).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>{edu.degree}</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0' }}>{edu.school}</div>
                <div style={{ fontSize: '0.75rem', color: accentColor, fontWeight: '600' }}>{edu.startDate} – {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Languages</h3>
            {(languages?.length > 0 ? languages : [
              { name: 'English', level: 90 },
              { name: 'Spanish', level: 75 },
              { name: 'Japanese', level: 60 }
            ]).map((lang, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '0.8rem', marginBottom: '6px', fontWeight: '600', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{lang.name}</span>
                  <span style={{ fontSize: '0.7rem', color: accentColor }}>{lang.level}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${lang.level || 80}%`, height: '100%', backgroundColor: accentColor }}></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Interests</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(interests?.length > 0 ? interests : [
                { name: 'Photography' }, { name: 'Travel' }, { name: 'Reading' }, { name: 'Design' }
              ]).map((interest, idx) => (
                <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.75rem', color: '#475569', fontWeight: '500' }}>{interest.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '50px 45px' }}>
          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '30px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Professional Experience
              <div style={{ flex: 1, height: '1px', backgroundColor: '#f1f5f9' }}></div>
            </h3>
            
            <div style={{ position: 'relative', paddingLeft: '35px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '10px', width: '1px', backgroundColor: '#e2e8f0' }}></div>

              {(experience?.length > 0 ? experience : [
                {
                  jobTitle: 'Digital Marketer Intern',
                  company: 'Thynk Unlimited',
                  startDate: '2012',
                  endDate: '2013',
                  address: 'New York, USA',
                  description: 'Created the testing plan for social media campaigns, leading to 23% ROI improvement.\nAssisted on SEO projects which increased traffic by 15%.'
                },
                {
                  jobTitle: 'Digital Marketing Manager',
                  company: 'Liceria & Co.',
                  startDate: '2013',
                  endDate: 'Present',
                  address: 'London, UK',
                  description: 'Designed and implemented campaigns that increased sales by 300%.\nLed SEO project resulting in 170,000+ monthly visitors.'
                }
              ]).map((exp, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '-35px', top: '4px', width: '12px', height: '12px', backgroundColor: '#fff', border: `2.5px solid ${accentColor}`, borderRadius: '50%', zIndex: 2, boxShadow: '0 0 0 4px #fff' }}></div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem', color: '#0f172a' }}>{exp.jobTitle}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: accentColor, backgroundColor: 'rgba(99,102,241,0.08)', padding: '3px 10px', borderRadius: '15px' }}>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '12px' }}>{exp.company} | {exp.address || 'Remote'}</div>
                  
                  {exp.description && (
                    <ul style={{ padding: '0 0 0 18px', margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '30px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Expertise & Skills
              <div style={{ flex: 1, height: '1px', backgroundColor: '#f1f5f9' }}></div>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px 45px' }}>
              {(skills?.length > 0 ? skills : [
                { name: 'Market Analytics', level: 5 },
                { name: 'SEO Strategy', level: 4 },
                { name: 'Copywriting', level: 5 },
                { name: 'Web Development', level: 4 }
              ]).map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{skill.name}</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{ 
                        width: '18px', 
                        height: '6px', 
                        borderRadius: '2px', 
                        backgroundColor: i <= (skill.level || 4) ? accentColor : '#e2e8f0',
                        opacity: i <= (skill.level || 4) ? 1 - (i * 0.1) : 1
                      }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '30px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
              References
              <div style={{ flex: 1, height: '1px', backgroundColor: '#f1f5f9' }}></div>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: `4px solid ${accentColor}` }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>Olivia Wilson</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0' }}>Liceria & Co. | CEO</div>
                <div style={{ fontSize: '0.85rem', color: accentColor, fontWeight: '600' }}>+123-456-7890</div>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: `4px solid ${accentColor}` }}>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>Juliana Silva</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0' }}>Liceria & Co. | CEO</div>
                <div style={{ fontSize: '0.85rem', color: accentColor, fontWeight: '600' }}>+123-456-7890</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StructuredGrayModernTemplate;
