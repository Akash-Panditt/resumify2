import React from 'react';

const ModernReeseTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, languages, references } = data;

  const bgBeige = '#e9e4de';
  const darkGray = '#333333';
  const textGray = '#555555';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: bgBeige, 
      color: darkGray, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Crimson Pro', serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700;800&family=Inter:wght@300;400;600&display=swap');
      `}</style>

      {/* Top Section */}
      <div style={{ padding: '4rem 4rem 2rem 4rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', alignItems: 'center' }}>
        {/* Circular Photo */}
        <div style={{ 
          width: '180px', 
          height: '180px', 
          borderRadius: '50%', 
          backgroundColor: '#ccc', 
          overflow: 'hidden',
          border: '1px solid #d1ccc5'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#999', fontFamily: 'Inter' }}>
              {personalDetails?.fullName?.charAt(0) || 'R'}
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '400', color: darkGray, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '0.5rem', lineHeight: '1.1' }}>
            {personalDetails?.fullName || 'REESE MILLER'}
          </h1>
          <div style={{ fontSize: '1rem', color: textGray, fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            {personalDetails?.jobTitle || 'PROJECT MANAGER'}
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: textGray, lineHeight: '1.7', maxWidth: '450px', fontFamily: 'Inter', fontWeight: '300' }}>
            {personalDetails?.summary || 'Brief professional summary focusing on leadership and project management goals.'}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ padding: '2rem 4rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', flex: 1 }}>
        {/* Left Column (Short items) */}
        <div>
          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #d1ccc5', paddingBottom: '0.5rem' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', fontFamily: 'Inter' }}>{item.degree}</div>
                  <div style={{ fontSize: '0.85rem', color: textGray, marginTop: '0.2rem', fontFamily: 'Inter' }}>{item.school}</div>
                  <div style={{ fontSize: '0.8rem', color: textGray, marginTop: '0.2rem', fontFamily: 'Inter' }}>{item.startDate} - {item.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #d1ccc5', paddingBottom: '0.5rem' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: textGray, fontFamily: 'Inter' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: darkGray, borderRadius: '50%' }}></div>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Long items) */}
        <div>
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #d1ccc5', paddingBottom: '0.5rem' }}>Experience</h3>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1.25rem', color: darkGray }}>{item.jobTitle}</strong>
                    <span style={{ fontSize: '0.85rem', color: textGray, fontWeight: '600', fontFamily: 'Inter' }}>{item.startDate} - {item.endDate}</span>
                  </div>
                  <div style={{ fontSize: '1rem', color: textGray, fontWeight: '600', marginBottom: '0.75rem', fontFamily: 'Inter' }}>{item.company}</div>
                  {item.description && (
                    <p style={{ fontSize: '0.95rem', color: textGray, lineHeight: '1.7', fontFamily: 'Inter', fontWeight: '300', whiteSpace: 'pre-wrap' }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Reference */}
          {references && references.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #d1ccc5', paddingBottom: '0.5rem' }}>Reference</h3>
              {references.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'Inter' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: textGray, fontFamily: 'Inter' }}>{item.position} / {item.company}</div>
                  <div style={{ fontSize: '0.85rem', color: textGray, fontFamily: 'Inter' }}>{item.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#2d2d2d', color: '#fff', padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontFamily: 'Inter' }}>
        {personalDetails?.email && <div>✉️ <a href={`mailto:${personalDetails.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personalDetails.email}</a></div>}
        {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
        {personalDetails?.linkedin && <div>🔗 <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{personalDetails.linkedin}</a></div>}
        {personalDetails?.address && <div>📍 {personalDetails.address}</div>}
      </div>
    </div>
  );
});

export default ModernReeseTemplate;
