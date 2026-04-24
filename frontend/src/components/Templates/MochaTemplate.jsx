import React from 'react';

const MochaTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;

  const profileImage = personalDetails?.photo || 'https://via.placeholder.com/150';

  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', color: '#222', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: '"Arial", sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#38312e', color: '#ffffff', padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '3rem' }}>
        {/* Profile Image */}
        <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '4px solid transparent' }}>
          <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        {/* Name and Title */}
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', lineHeight: '1.2', letterSpacing: '2px' }}>
            {personalDetails?.fullName?.split(' ')[0] || 'First'}<br/>
            {personalDetails?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
          </h1>
          <h2 style={{ fontSize: '1.2rem', color: '#3b82f6', margin: 0, fontWeight: 'normal', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {personalDetails?.jobTitle || 'Professional Title'}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', padding: '3rem 4rem', gap: '4rem' }}>
        
        {/* Left Column */}
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#38312e', letterSpacing: '2px', textTransform: 'uppercase' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#111' }}>
              {personalDetails?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📞</span> <span>{personalDetails.phone}</span></div>}
              {personalDetails?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>✉️</span> <span>{personalDetails.email}</span></div>}
              {personalDetails?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📍</span> <span>{personalDetails.address}</span></div>}
            </div>
          </div>

          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#38312e', letterSpacing: '2px', textTransform: 'uppercase' }}>Education</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#111' }}>{edu.degree}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>{edu.school} | {edu.startDate}-{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#38312e', letterSpacing: '2px', textTransform: 'uppercase' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {skills.map((skill, idx) => {
                  let progress = '70%';
                  if (skill.level?.toLowerCase() === 'expert') progress = '95%';
                  if (skill.level?.toLowerCase() === 'advanced') progress = '80%';
                  if (skill.level?.toLowerCase() === 'intermediate') progress = '60%';
                  if (skill.level?.toLowerCase() === 'beginner') progress = '40%';
                  
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9rem', width: '45%' }}>{skill.name}</span>
                      <div style={{ width: '50%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: progress, height: '100%', backgroundColor: '#3b82f6' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '60%', borderLeft: '1px solid #d1d5db', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Profile Summary */}
          {personalDetails?.summary && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#38312e', letterSpacing: '2px', textTransform: 'uppercase' }}>Profile</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#222', margin: 0 }}>
                {personalDetails.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: '#38312e', letterSpacing: '2px', textTransform: 'uppercase' }}>Experience</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#111' }}>{exp.jobTitle}</h4>
                    <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.95rem', color: '#444' }}>{exp.company} | {exp.startDate}-{exp.endDate}</p>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem', lineHeight: '1.5', color: '#222' }}>
                      {exp.description?.split('\n').filter(d => d.trim()).map((bullet, i) => (
                         <li key={i} style={{ marginBottom: '0.3rem' }}>{bullet.replace(/^[•\-\*]\s*/, '')}</li>
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
  );
});

export default MochaTemplate;
