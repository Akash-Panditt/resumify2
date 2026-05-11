import React from 'react';

const BoldModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages } = data;

  const primaryColor = '#000000';
  const secondaryColor = '#4b5563';

  return (
    <div ref={ref} style={{ 
      padding: '3rem', 
      backgroundColor: '#fff', 
      color: primaryColor, 
      minHeight: '1056px', 
      width: '816px', 
      margin: '0 auto', 
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: `4px solid ${primaryColor}`, paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '0.25rem' }}>
          {personalDetails?.fullName || 'Sebastian Bennett'}
        </h1>
        <div style={{ fontSize: '1.25rem', fontWeight: '500', color: secondaryColor, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{personalDetails?.jobTitle || 'Chemical Engineer'}</span>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: '400', color: primaryColor }}>
            {personalDetails?.phone && <div>{personalDetails.phone}</div>}
            {personalDetails?.email && <div>{personalDetails.email}</div>}
            {personalDetails?.address && <div>{personalDetails.address}</div>}
          </div>
        </div>
      </div>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', backgroundColor: primaryColor, color: '#fff', padding: '0.5rem 1rem', display: 'inline-block', marginBottom: '1.5rem' }}>
            Work Experience
          </h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.1rem', fontWeight: '800' }}>{item.jobTitle}</strong>
                  <div style={{ fontSize: '1rem', color: secondaryColor, fontWeight: '600' }}>{item.company}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.startDate} - {item.endDate}</div>
                </div>
              </div>
              {item.description && (
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#374151', whiteSpace: 'pre-wrap' }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', backgroundColor: primaryColor, color: '#fff', padding: '0.5rem 1rem', display: 'inline-block', marginBottom: '1.5rem' }}>
            Education
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {education.map((item, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: secondaryColor }}>{item.startDate} - {item.endDate}</div>
                <strong style={{ display: 'block', fontSize: '1.05rem', margin: '0.25rem 0' }}>{item.degree}</strong>
                <div style={{ fontSize: '0.95rem', color: '#4b5563' }}>{item.school}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Others Section Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', borderTop: `2px solid ${primaryColor}`, paddingTop: '2rem' }}>
        {/* Left: Skills */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.25rem' }}>
            Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {skills?.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#374151' }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: primaryColor }}></div>
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interests/Projects */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.25rem' }}>
            Interests
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['Process Engineering', 'Safety Standards', 'Renewable Energy', 'Project Management'].map((interest, i) => (
              <span key={i} style={{ fontSize: '0.85rem', color: secondaryColor, border: '1px solid #e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
});

export default BoldModernTemplate;
