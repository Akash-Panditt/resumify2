import React from 'react';

const SupermarketTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;

  return (
    <div ref={ref} style={{ padding: '3rem', backgroundColor: '#ffffff', color: '#111827', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "Arial, sans-serif", borderTop: '12px solid #2563eb' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#111827' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1.25rem', color: '#2563eb', marginBottom: '1rem' }}>
          {personalDetails?.jobTitle || 'Store Associate / Cashier'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '1rem', color: '#4b5563' }}>
          {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
          {personalDetails?.email && <div>✉️ {personalDetails.email}</div>}
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: '#4b5563' }}>
          {personalDetails?.address && <div>🏠 {personalDetails.address}</div>}
        </div>
      </div>

      <div style={{ height: '2px', backgroundColor: '#e5e7eb', marginBottom: '2rem' }}></div>

      {/* Profile/Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '2px solid #2563eb', display: 'inline-block', paddingBottom: '0.25rem', marginBottom: '1rem' }}>CAREER OBJECTIVE</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#374151' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Core Skills - important for retail */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '2px solid #2563eb', display: 'inline-block', paddingBottom: '0.25rem', marginBottom: '1rem' }}>KEY SKILLS</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', padding: 0, margin: 0, listStylePosition: 'inside' }}>
            {skills.map((s, i) => (
              <li key={i} style={{ fontSize: '1.05rem', color: '#374151' }}>{s.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '2px solid #2563eb', display: 'inline-block', paddingBottom: '0.25rem', marginBottom: '1rem' }}>WORK EXPERIENCE</h2>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.15rem' }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 'bold' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '1.05rem', color: '#4b5563', margin: '0.25rem 0 0.5rem 0' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '2px solid #2563eb', display: 'inline-block', paddingBottom: '0.25rem', marginBottom: '1rem' }}>EDUCATION</h2>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <strong style={{ fontSize: '1.1rem', display: 'block' }}>{item.degree}</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '1.05rem', color: '#4b5563' }}>{item.school}</span>
                <span style={{ fontSize: '1rem', color: '#6b7280' }}>{item.startDate} - {item.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
});

export default SupermarketTemplate;
