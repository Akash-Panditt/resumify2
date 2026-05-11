import React from 'react';

const ExecutiveBeigeTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, summary, projects } = data;

  const bgBeige = '#f3f0ec';
  const sidebarBeige = '#e7e2dd';
  const darkText = '#1f2937';
  const accent = '#8b7e74';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: darkText, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Playfair Display', serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      
      {/* Header / Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
        <div style={{ backgroundColor: sidebarBeige, padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ 
            width: '180px', 
            height: '220px', 
            backgroundColor: '#d1d5db', 
            margin: '0 auto',
            border: '8px solid #fff',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {personalDetails?.photo ? (
              <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#9ca3af', fontFamily: 'Inter' }}>
                {personalDetails?.fullName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        </div>
        
        <div style={{ backgroundColor: bgBeige, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: darkText, textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1', marginBottom: '0.5rem' }}>
            {personalDetails?.fullName || 'OLIVIA WILSON'}
          </h1>
          <div style={{ fontSize: '1.25rem', color: accent, fontWeight: '400', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            {personalDetails?.jobTitle || 'GRAPHICS DESIGNER'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(1056px - 300px)' }}>
        {/* Left Column */}
        <div style={{ backgroundColor: '#fff', borderRight: `1px solid ${sidebarBeige}`, padding: '2.5rem 2rem' }}>
          
          {/* Contact */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#4b5563', fontFamily: 'Inter' }}>
              {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
              {personalDetails?.email && <div style={{ wordBreak: 'break-all' }}>✉️ {personalDetails.email}</div>}
              {personalDetails?.address && <div>📍 {personalDetails.address}</div>}
              {personalDetails?.linkedin && <div>🔗 {personalDetails.linkedin}</div>}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
                Education
              </div>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: darkText }}>{item.degree}</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.2rem 0' }}>{item.school}</div>
                  <div style={{ fontSize: '0.8rem', color: accent, fontWeight: '600' }}>{item.startDate} - {item.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Expertise */}
          {skills && skills.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
                Expertise
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#4b5563', fontFamily: 'Inter' }}>
                {skills.map((s, i) => (
                  <div key={i}>{s.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ padding: '2.5rem 2.5rem' }}>
          
          {/* Profile */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
              Profile
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', fontFamily: 'Inter', fontWeight: '300' }}>
              {personalDetails?.summary || 'Detailed professional summary goes here...'}
            </p>
          </div>

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
                Work Experience
              </div>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', color: accent, fontWeight: '700', fontFamily: 'Inter' }}>
                    {item.startDate} - {item.endDate}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.25rem', color: darkText, marginBottom: '0.25rem' }}>{item.jobTitle}</strong>
                    <div style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.company}</div>
                    {item.description && (
                      <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', fontFamily: 'Inter', fontWeight: '300', whiteSpace: 'pre-wrap' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* References - Small section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '1px', backgroundColor: accent }}></div>
              References
            </div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', italic: 'true' }}>References available upon request.</p>
          </div>

        </div>
      </div>
    </div>
  );
});

export default ExecutiveBeigeTemplate;
