import React from 'react';

const SageTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;
  const profileImage = personalDetails?.photo || 'https://via.placeholder.com/150';

  return (
    <div ref={ref} style={{ backgroundColor: '#ffffff', color: '#333', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', boxSizing: 'border-box', display: 'flex' }}>
      
      {/* Left Sidebar - Sage Green */}
      <div style={{ width: '35%', backgroundColor: '#cdd3c8', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Profile Image */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #ffffff' }}>
            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#2b3327', textTransform: 'uppercase', borderBottom: '1px solid #aeb5a9', paddingBottom: '0.5rem' }}>Contact Me</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', color: '#3b4337' }}>
            {personalDetails?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ backgroundColor: '#2b3327', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>📍</span> <span>{personalDetails.address}</span></div>}
            {personalDetails?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ backgroundColor: '#2b3327', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>📞</span> <span>{personalDetails.phone}</span></div>}
            {personalDetails?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ backgroundColor: '#2b3327', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✉️</span> <span style={{ wordBreak: 'break-all' }}>{personalDetails.email}</span></div>}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#2b3327', textTransform: 'uppercase', borderBottom: '1px solid #aeb5a9', paddingBottom: '0.5rem' }}>My Skills</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#3b4337', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {skills.map((skill, idx) => (
                <li key={idx} style={{ paddingBottom: '0.2rem' }}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#2b3327', textTransform: 'uppercase', borderBottom: '1px solid #aeb5a9', paddingBottom: '0.5rem' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#2b3327' }}>|| {edu.degree}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#3b4337' }}>{edu.school}</p>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#5b6357' }}>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Header Name & Title */}
        <div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '300', margin: '0 0 0.5rem 0', color: '#4a4a4a', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.1' }}>
            {personalDetails?.fullName}
          </h1>
          <h2 style={{ fontSize: '1.2rem', color: '#555', margin: 0, fontWeight: 'normal', letterSpacing: '1px' }}>
            {personalDetails?.jobTitle}
          </h2>
        </div>

        {/* Summary */}
        {personalDetails?.summary && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#4a4a4a', textTransform: 'uppercase', letterSpacing: '1px' }}>Summary</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#555', margin: 0, paddingBottom: '1.5rem', borderBottom: '1px solid #ddd' }}>
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: '#4a4a4a', textTransform: 'uppercase', letterSpacing: '1px' }}>Work Experience</h3>
            
            {/* The first summary paragraph of work experience if exists, but we'll map all experiences individually */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#333' }}>{exp.jobTitle}</h4>
                  <div style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#666', fontStyle: 'italic' }}>
                    {exp.company} ( {exp.startDate} - {exp.endDate} )
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
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
  );
});

export default SageTemplate;
