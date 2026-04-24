import React from 'react';

const OnyxTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;
  const profileImage = personalDetails?.photo || 'https://via.placeholder.com/150';

  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', color: '#111', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: '"Arial", sans-serif', boxSizing: 'border-box', display: 'flex' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Grey Box */}
        <div style={{ backgroundColor: '#e5e5e5', padding: '3.5rem 2.5rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Photo */}
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#000', marginBottom: '2.5rem' }}>
             <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
          </div>
          
          {/* Contact */}
          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Contact</h3>
            <div style={{ height: '3px', backgroundColor: '#111', width: '40px', margin: '0.5rem 0 1.5rem' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              {personalDetails?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span>✉️</span> <span style={{ wordBreak: 'break-all' }}>{personalDetails.email}</span></div>}
              {personalDetails?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span>📞</span> <span>{personalDetails.phone}</span></div>}
              {personalDetails?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span>📍</span> <span>{personalDetails.address}</span></div>}
            </div>
          </div>
        </div>

        {/* Bottom White Box */}
        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Education</h3>
              <div style={{ height: '3px', backgroundColor: '#111', width: '40px', margin: '0.5rem 0 1.5rem' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ position: 'relative', paddingLeft: '1rem' }}>
                    <div style={{ position: 'absolute', left: 0, top: '6px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111' }}></div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#111' }}>{edu.school}</h4>
                    <p style={{ margin: '0 0 0.2rem', fontSize: '0.85rem', fontStyle: 'italic', color: '#444' }}>{edu.degree}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#444' }}>Completed in {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Skill</h3>
              <div style={{ height: '3px', backgroundColor: '#111', width: '40px', margin: '0.5rem 0 1.5rem' }}></div>
              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem', color: '#111', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {skills.map((skill, idx) => (
                  <li key={idx} style={{ fontWeight: '500' }}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: '3.5rem 4rem 3.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Header Name & Title */}
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 0.2rem 0', color: '#111', lineHeight: '1', letterSpacing: '1px' }}>
            {personalDetails?.fullName}
          </h1>
          <h2 style={{ fontSize: '1.2rem', color: '#444', margin: 0, fontWeight: 'normal', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {personalDetails?.jobTitle}
          </h2>
        </div>

        {/* Profile */}
        {personalDetails?.summary && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Profile</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444', margin: 0 }}>
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: '#111', letterSpacing: '2px', textTransform: 'uppercase' }}>Work Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map((exp, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.5rem' }}>
                  {/* Left Date Pill */}
                  <div style={{ flexShrink: 0, width: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', border: '1px solid #111', borderRadius: '20px', padding: '1rem 0.3rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#111', display: 'flex', alignItems: 'center', height: 'fit-content' }}>
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  {/* Job Content */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#111' }}>{exp.jobTitle}</h4>
                    <div style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#444' }}>{exp.company}</div>
                    <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem', lineHeight: '1.5', color: '#444' }}>
                      {exp.description?.split('\n').filter(d => d.trim()).map((bullet, i) => (
                         <li key={i} style={{ marginBottom: '0.2rem' }}>{bullet.replace(/^[•\-\*]\s*/, '')}</li>
                      )) || <li>{exp.description}</li>}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

export default OnyxTemplate;
