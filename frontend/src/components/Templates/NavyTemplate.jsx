import React from 'react';

const NavyTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;
  const profileImage = personalDetails?.photo || 'https://via.placeholder.com/150';

  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', color: '#333', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: '"Arial", sans-serif', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Banner SVG */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '180px', zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 816 180">
         <path d="M0,0 L816,0 L816,50 C500,200 150,50 0,160 Z" fill="#20355c" />
         <path d="M0,0 L816,0 L816,30 C500,160 150,-20 0,120 Z" fill="#2a4575" opacity="0.5" />
      </svg>

      {/* Main Content Layout */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', paddingTop: '40px', minHeight: 'calc(1056px - 100px)' }}>
        
        {/* Left Sidebar */}
        <div style={{ width: '38%', padding: '0 2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
          
          {/* Profile Photo */}
          <div style={{ width: '170px', height: '170px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '3rem', alignSelf: 'center', backgroundColor: '#fff' }}>
             <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Education */}
            {education?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Education</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: '0 0 0.3rem 0', color: '#222', textTransform: 'uppercase' }}>{edu.degree}</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', fontWeight: 'bold' }}>{edu.school}</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Skills</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {skills.map((skill, idx) => {
                    let progress = '60%';
                    if (skill.level?.toLowerCase() === 'expert') progress = '95%';
                    if (skill.level?.toLowerCase() === 'advanced') progress = '80%';
                    if (skill.level?.toLowerCase() === 'beginner') progress = '40%';
                    
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem', color: '#333', width: '45%' }}>{skill.name}</span>
                        <div style={{ width: '50%', display: 'flex', gap: '3px' }}>
                           <div style={{ height: '6px', width: progress, backgroundColor: '#20355c', borderRadius: '3px' }}></div>
                           <div style={{ height: '6px', width: `calc(100% - ${progress})`, backgroundColor: '#e2e8f0', borderRadius: '3px' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div style={{ width: '2px', backgroundColor: '#e2e8f0', marginTop: '140px', marginBottom: '2rem' }}></div>

        {/* Right Content */}
        <div style={{ width: '62%', padding: '3rem 3rem 2rem 2rem', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Info */}
          <div style={{ marginBottom: '2.5rem', marginTop: '20px' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', margin: '0 0 0.5rem', color: '#20355c', textTransform: 'uppercase', lineHeight: '1.1' }}>
              {personalDetails?.fullName}
            </h1>
            <h2 style={{ fontSize: '1.2rem', color: '#555', margin: '0 0 1.5rem 0', fontWeight: 'normal', letterSpacing: '3px', textTransform: 'uppercase' }}>
              {personalDetails?.jobTitle}
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#20355c', fontWeight: 'bold' }}>
              {personalDetails?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span>📞</span> <span>{personalDetails.phone}</span></div>}
              {personalDetails?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span>✉️</span> <span>{personalDetails.email}</span></div>}
              {personalDetails?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span>📍</span> <span>{personalDetails.address}</span></div>}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* About Me */}
            {personalDetails?.summary && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>About Me</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444', margin: 0 }}>
                  {personalDetails.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {experience?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1.5rem', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Work Experience</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: 0, color: '#222' }}>{exp.jobTitle}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 'bold' }}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#444', fontStyle: 'italic' }}>{exp.company}</p>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5', color: '#444' }}>
                        {exp.description?.split('\n').filter(d => d.trim()).map((bullet, i) => (
                           <li key={i} style={{ marginBottom: '0.2rem' }}>{bullet.replace(/^[•\-\*]\s*/, '')}</li>
                        )) || <li>{exp.description}</li>}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Banner SVG */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 816 80">
         <path d="M0,80 L816,80 L816,30 C600,-20 200,60 0,0 Z" fill="#20355c" />
      </svg>
    </div>
  );
});

export default NavyTemplate;
