import React from 'react';

const CleanSidebarTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;

  const sidebarBg = '#f8fafc'; // Slate 50
  const primaryColor = '#0f172a'; // Slate 900
  const accentColor = '#64748b'; // Slate 500

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: primaryColor, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      display: 'grid',
      gridTemplateColumns: '260px 1fr'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Sidebar */}
      <div style={{ backgroundColor: sidebarBg, padding: '4rem 2rem', borderRight: '1px solid #e2e8f0' }}>
        
        {/* Name and Title in Sidebar */}
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '0.75rem' }}>
            {personalDetails?.fullName || 'Matt Zhang'}
          </h1>
          <div style={{ fontSize: '1rem', color: accentColor, fontWeight: '500', letterSpacing: '1px' }}>
            {personalDetails?.jobTitle || 'Senior Executive Assistant'}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1.25rem' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
            {personalDetails?.email && <div style={{ wordBreak: 'break-all' }}>✉️ {personalDetails.email}</div>}
            {personalDetails?.address && <div>📍 {personalDetails.address}</div>}
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1.25rem' }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{item.degree}</strong>
                <div style={{ fontSize: '0.8rem', color: accentColor }}>{item.school}</div>
                <div style={{ fontSize: '0.8rem', color: accentColor }}>{item.startDate} - {item.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '1.25rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {skills.map((s, i) => (
                <div key={i}>{s.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ padding: '4rem 3rem' }}>
        
        {/* Summary */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>Summary</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#334155' }}>
            {personalDetails?.summary || 'Dedicated professional with over 10 years of experience in high-level executive support and project coordination.'}
          </p>
        </div>

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>Work Experience</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.15rem' }}>{item.jobTitle}</strong>
                    <span style={{ fontSize: '1rem', color: accentColor, fontWeight: '500' }}>{item.company}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: accentColor, fontWeight: '700' }}>{item.startDate} - {item.endDate}</span>
                </div>
                {item.description && (
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});

export default CleanSidebarTemplate;
