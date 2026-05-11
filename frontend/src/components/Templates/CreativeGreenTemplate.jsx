import React from 'react';

const CreativeGreenTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, languages, references } = data;

  const darkGreen = '#112b23';
  const accentGreen = '#a4c639'; // Lime/Apple green
  const lightBg = '#f4f7f5';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: '#333', 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Header */}
      <div style={{ padding: '3rem 3rem 1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: darkGreen, lineHeight: '1', marginBottom: '0.5rem' }}>
            {personalDetails?.fullName?.split(' ')[0] || 'Morgan'}<br/>
            <span style={{ fontWeight: '300' }}>{personalDetails?.fullName?.split(' ')[1] || 'Maxwell'}</span>
          </h1>
          <div style={{ fontSize: '1.25rem', color: accentGreen, fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {personalDetails?.jobTitle || 'GRAPHIC DESIGNER'}
          </div>
        </div>
        <div style={{ 
          width: '180px', 
          height: '180px', 
          borderRadius: '50%', 
          border: `8px solid ${lightBg}`,
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: lightBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#ccc' }}>
              {personalDetails?.fullName?.charAt(0) || 'M'}
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1rem 3rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* About Me */}
          <div style={{ backgroundColor: darkGreen, color: '#fff', padding: '1.5rem', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', borderBottom: `2px solid ${accentGreen}`, display: 'inline-block', paddingBottom: '4px' }}>About Me</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300', opacity: 0.9 }}>
              {personalDetails?.summary || 'Highly creative and multi-talented Graphic Designer with extensive experience in multimedia, marketing, and print design.'}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: darkGreen, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Experience</h3>
            {experience?.slice(0, 2).map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '1rem', color: darkGreen }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.8rem', color: accentGreen, fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{item.company}</div>
                <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: '1.5' }}>{item.description?.substring(0, 150)}...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Skills with bars */}
          <div style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: darkGreen, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Skills</h3>
            {skills?.map((s, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>
                  <span>{s.name}</span>
                  <span>80%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: lightBg, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', backgroundColor: accentGreen }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ backgroundColor: lightBg, padding: '1.5rem', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: darkGreen, marginBottom: '1rem' }}>Education</h3>
            {education?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{item.school}</span>
                <div style={{ fontSize: '0.8rem', color: accentGreen, fontWeight: '600' }}>{item.startDate} - {item.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Area with References */}
      <div style={{ padding: '2rem 3rem', backgroundColor: darkGreen, color: '#fff', marginTop: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
          {references?.slice(0, 3).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: `2px solid ${accentGreen}`, padding: '2px' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: darkGreen, fontWeight: '800' }}>
                  {item.name?.charAt(0)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{item.position}</div>
              </div>
            </div>
          ))}
          {!references?.length && (
            <div style={{ gridColumn: '1 / -1', opacity: 0.5, fontSize: '0.9rem' }}>References available upon request.</div>
          )}
        </div>
        
        {/* Contact Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', fontSize: '0.85rem', color: accentGreen }}>
          {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
          {personalDetails?.email && <div>✉️ {personalDetails.email}</div>}
          {personalDetails?.address && <div>📍 {personalDetails.address}</div>}
        </div>
      </div>
    </div>
  );
});

export default CreativeGreenTemplate;
