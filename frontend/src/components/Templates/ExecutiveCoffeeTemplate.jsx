import React from 'react';

const ExecutiveCoffeeTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, references } = data;

  const coffee = '#dcd2c3';
  const darkBrown = '#4a3728';
  const textGray = '#525252';

  return (
    <div ref={ref} style={{ 
      padding: '0', 
      backgroundColor: '#fff', 
      color: darkBrown, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Outfit', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Header */}
      <div style={{ backgroundColor: coffee, padding: '3rem', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <div style={{ width: '60%' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', lineHeight: '1', marginBottom: '0.5rem' }}>
            {personalDetails?.fullName || 'Jonathan Patterson'}
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: '500', color: darkBrown, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
            {personalDetails?.jobTitle || 'Marketing Manager'}
          </div>
        </div>
        
        {/* Absolute Photo */}
        <div style={{ 
          position: 'absolute', 
          left: '3rem', 
          bottom: '-60px', 
          width: '180px', 
          height: '180px', 
          borderRadius: '50%', 
          border: '10px solid #fff',
          overflow: 'hidden',
          backgroundColor: '#eee'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: '#ccc' }}>
              {personalDetails?.fullName?.charAt(0) || 'J'}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(1056px - 220px)' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: '#faf9f6', padding: '100px 2.5rem 3rem 2.5rem', borderRight: '1px solid #eee' }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: textGray }}>
              {personalDetails?.phone && <div>P: {personalDetails.phone}</div>}
              {personalDetails?.email && <div style={{ wordBreak: 'break-all' }}>E: {personalDetails.email}</div>}
              {personalDetails?.address && <div>A: {personalDetails.address}</div>}
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Education</h3>
            {education?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{item.degree}</div>
                <div style={{ fontSize: '0.85rem', color: textGray, margin: '0.2rem 0' }}>{item.school}</div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>{item.startDate} - {item.endDate}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1.25rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: textGray }}>
              {skills?.map((s, i) => (
                <div key={i}>{s.name}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '80px 3rem 3rem 3rem' }}>
          
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Profile</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: textGray }}>
              {personalDetails?.summary || 'A results-driven professional with a proven track record of success in various industries.'}
            </p>
          </div>

          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Experience</h2>
            {experience?.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1.25rem', color: darkBrown }}>{item.jobTitle}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: '600' }}>{item.startDate} - {item.endDate}</span>
                </div>
                <div style={{ fontSize: '1rem', color: textGray, fontWeight: '600', marginBottom: '0.75rem' }}>{item.company}</div>
                {item.description && (
                  <p style={{ fontSize: '0.95rem', color: textGray, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {references && references.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: `2px solid ${coffee}`, paddingBottom: '0.5rem' }}>Reference</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {references.map((item, idx) => (
                  <div key={idx}>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>{item.name}</strong>
                    <div style={{ fontSize: '0.9rem', color: textGray }}>{item.position} / {item.company}</div>
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

export default ExecutiveCoffeeTemplate;
