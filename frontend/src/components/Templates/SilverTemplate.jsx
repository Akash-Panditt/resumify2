import React from 'react';

const SilverTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;
  const profileImage = personalDetails?.photo || 'https://via.placeholder.com/300';

  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', color: '#333', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', boxSizing: 'border-box', display: 'flex' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#a8abae', display: 'flex', flexDirection: 'column' }}>
        
        {/* Profile Image Area */}
        <div style={{ width: '100%', height: '260px', backgroundColor: '#000', overflow: 'hidden' }}>
          <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Content Area */}
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem', color: '#333', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '2px solid #555', paddingBottom: '0.5rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#111', paddingTop: '0.5rem' }}>
              {personalDetails?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>📞</span> <span>{personalDetails.phone}</span></div>}
              {personalDetails?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✉️</span> <span style={{ wordBreak: 'break-all' }}>{personalDetails.email}</span></div>}
              {personalDetails?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>📍</span> <span>{personalDetails.address}</span></div>}
            </div>
          </div>

          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem', color: '#333', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '2px solid #555', paddingBottom: '0.5rem' }}>Education</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem' }}>
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#111' }}>{edu.degree}</p>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#333' }}>{edu.school}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#444' }}>{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Dark Box */}
        <div style={{ height: '260px', backgroundColor: '#646669', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#fff', textTransform: 'uppercase', lineHeight: '1' }}>
            {personalDetails?.fullName}
          </h1>
          <h2 style={{ fontSize: '1.3rem', color: '#eee', margin: 0, fontWeight: '300', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {personalDetails?.jobTitle}
          </h2>
          {personalDetails?.summary && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#ddd', lineHeight: '1.5' }}>
              {personalDetails.summary}
            </p>
          )}
        </div>

        {/* White Body */}
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Experience */}
          {experience?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem', color: '#333', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>Experience</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    
                    {/* Timeline dot and line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#646669' }}></div>
                      {idx !== experience.length - 1 && <div style={{ width: '1px', backgroundColor: '#ccc', flexGrow: 1, marginTop: '2px', marginBottom: '-1rem' }}></div>}
                    </div>

                    <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.2rem' }}>{exp.startDate} - {exp.endDate}</div>
                      <div style={{ fontSize: '0.9rem', color: '#444', marginBottom: '0.2rem' }}>{exp.company}</div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#111' }}>{exp.jobTitle}</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5', color: '#444' }}>
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

          {/* Skills Grid */}
          {skills?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem', color: '#333', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>Skill</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {skills.map((skill, idx) => {
                  let fill = 3;
                  if (skill.level?.toLowerCase() === 'expert') fill = 5;
                  if (skill.level?.toLowerCase() === 'advanced') fill = 4;
                  if (skill.level?.toLowerCase() === 'beginner') fill = 2;
                  
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: '#333' }}>{skill.name}</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map(circ => (
                          <div key={circ} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: circ <= fill ? '#646669' : '#e0e0e0' }}></div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
});

export default SilverTemplate;
