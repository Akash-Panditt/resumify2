import React from 'react';

const MinimalistSilvaTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, summary, projects } = data;

  const gold = '#c4a661'; // Gold accent from image
  const darkGray = '#1a1a1a';
  const lightGray = '#777777';

  return (
    <div ref={ref} style={{ 
      padding: '4rem 3rem', 
      backgroundColor: '#fff', 
      color: darkGray, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Playfair Display', serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@300;400;500;600&family=Dancing+Script&display=swap');
      `}</style>

      {/* Header Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '4rem' }}>
        {/* Left: Photo and Contact */}
        <div>
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            backgroundColor: '#f5f5f5', 
            padding: '10px',
            border: '1px solid #eee',
            marginBottom: '1.5rem'
          }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              {personalDetails?.photo ? (
                <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#ccc', fontFamily: 'Montserrat' }}>
                  {personalDetails?.fullName?.charAt(0) || 'S'}
                </div>
              )}
            </div>
          </div>

          {/* Signature placeholder */}
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2rem', color: darkGray, marginBottom: '2.5rem', opacity: 0.8 }}>
            {personalDetails?.fullName?.split(' ')[0] || 'Silva'}
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: gold, marginBottom: '1.5rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: lightGray, fontFamily: 'Montserrat' }}>
              {personalDetails?.phone && <div>{personalDetails.phone}</div>}
              {personalDetails?.email && <div style={{ wordBreak: 'break-all' }}>{personalDetails.email}</div>}
              {personalDetails?.address && <div>{personalDetails.address}</div>}
              {personalDetails?.website && <div>{personalDetails.website}</div>}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: gold, marginBottom: '1.5rem' }}>Expertise</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: lightGray, fontFamily: 'Montserrat' }}>
              {skills?.map((s, i) => (
                <div key={i}>{s.name}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Name and Content */}
        <div>
          <div style={{ marginBottom: '3.5rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '400', marginBottom: '0.5rem', letterSpacing: '2px' }}>
              {personalDetails?.fullName || 'JULIANA SILVA'}
            </h1>
            <div style={{ fontSize: '1.1rem', color: gold, fontWeight: '600', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Montserrat' }}>
              {personalDetails?.jobTitle || 'SENIOR GRAPHIC DESIGNER'}
            </div>
          </div>

          <div style={{ marginBottom: '3.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: gold, marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Personal Profile</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: lightGray, fontFamily: 'Montserrat', fontWeight: '300' }}>
              {personalDetails?.summary || 'Minimalist and professional summary focusing on high-level achievements and creative vision.'}
            </p>
          </div>

          <div style={{ marginBottom: '3.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: gold, marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Work Experience</h3>
            {experience?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.8rem', color: gold, fontWeight: '700', fontFamily: 'Montserrat' }}>{item.startDate} - {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: lightGray, fontWeight: '600', marginBottom: '0.75rem', fontFamily: 'Montserrat', textTransform: 'uppercase' }}>{item.company}</div>
                {item.description && (
                  <p style={{ fontSize: '0.9rem', color: lightGray, lineHeight: '1.7', fontFamily: 'Montserrat', fontWeight: '300', whiteSpace: 'pre-wrap' }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {education && education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: gold, marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '700' }}>{item.degree}</div>
                  <div style={{ fontSize: '0.9rem', color: lightGray, margin: '0.2rem 0', fontFamily: 'Montserrat' }}>{item.school}</div>
                  <div style={{ fontSize: '0.8rem', color: gold, fontWeight: '600', fontFamily: 'Montserrat' }}>{item.startDate} - {item.endDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MinimalistSilvaTemplate;
