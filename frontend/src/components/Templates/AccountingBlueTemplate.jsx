import React from 'react';

const AccountingBlueTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;

  const headerBg = '#2d2926';
  const accentColor = '#4da8e1';
  const textColor = '#333';

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: textColor,
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Montserrat', sans-serif",
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Header Section */}
      <div style={{
        backgroundColor: headerBg,
        padding: '50px 60px',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        color: '#fff'
      }}>
        <div 
          onClick={data.onPhotoClick}
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '4px solid #fff',
            overflow: 'hidden',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {personalDetails?.photo ? (
            <>
              <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s ease', fontSize: '0.8rem', fontWeight: 'bold' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0}>
                CHANGE PHOTO
              </div>
            </>
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#f8fafc',
              color: '#94a3b8' 
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px', color: accentColor }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: accentColor, letterSpacing: '1px', textTransform: 'uppercase' }}>Import Photo</span>
            </div>
          )}
        </div>
        <div>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '800', 
            margin: '0', 
            lineHeight: '1',
            letterSpacing: '1px'
          }}>
            {personalDetails?.fullName?.split(' ')[0] || 'Korina'}<br/>
            {personalDetails?.fullName?.split(' ').slice(1).join(' ') || 'Villanueva'}
          </h1>
          <h2 style={{ 
            fontSize: '22px', 
            fontWeight: '500', 
            margin: '15px 0 0 0', 
            color: accentColor,
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            {personalDetails?.jobTitle || 'Professional Accountant'}
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', padding: '50px 60px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>📞</span>
                <span>{personalDetails?.phone || '+123-456-7890'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>✉️</span>
                <span>{personalDetails?.email || 'hello@reallygreatsite.com'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span>{personalDetails?.address || '123 Anywhere St., Any City'}</span>
              </div>
              {personalDetails?.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>🔗</span>
                  <a href={personalDetails.linkedin.startsWith('http') ? personalDetails.linkedin : `https://${personalDetails.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                </div>
              )}
              {personalDetails?.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>📁</span>
                  <a href={personalDetails.github.startsWith('http') ? personalDetails.github : `https://${personalDetails.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px' }}>Education</h3>
            {(education?.length > 0 ? education : [
              { degree: 'Bachelor of Design', school: 'Fauget University', startDate: '2014', endDate: '2018' },
              { degree: 'Bachelor of Design', school: 'Fauget University', startDate: '2012', endDate: '2016' }
            ]).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{edu.degree}</div>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>{edu.school} | {edu.startDate}-{edu.endDate}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px' }}>Skills</h3>
            {(skills?.length > 0 ? skills : [
              { name: 'Communication', level: 80 },
              { name: 'Creativity', level: 90 },
              { name: 'Teamwork', level: 85 },
              { name: 'Organization', level: 75 },
              { name: 'Leadership', level: 80 },
              { name: 'Teamplayer', level: 90 }
            ]).map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '14px', marginBottom: '5px', fontWeight: '600' }}>{skill.name}</div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level || 80}%`, height: '100%', backgroundColor: accentColor }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', borderLeft: '1px solid #ddd', paddingLeft: '40px' }}>
          {/* Profile */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px' }}>Profile</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
              {personalDetails?.summary || 'I am a professional Digital Marketer 7+ years of experience in digital marketing, branding and business strategy across media and entertainment industries.'}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px' }}>Experience</h3>
            {(experience?.length > 0 ? experience : [
              {
                jobTitle: 'Digital Marketing Lead',
                company: 'Studio Shodwe',
                startDate: '2018',
                endDate: 'present',
                description: 'Created and managed digital campaigns for top clients\nIncreased two clients\' digital presence and customer interaction by 200%\nApproves all content to be posted on social media'
              },
              {
                jobTitle: 'Digital Marketer',
                company: 'Larana, Inc',
                startDate: '2016',
                endDate: '2018',
                description: 'Contributed ideas for digital marketing campaigns for raising brand awareness\nOrganizes all social media posts for the editorial department'
              }
            ]).map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '25px' }}>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>{exp.jobTitle}</div>
                <div style={{ fontSize: '15px', color: '#555', marginBottom: '8px' }}>{exp.company} | {exp.startDate}-{exp.endDate}</div>
                {exp.description && (
                  <ul style={{ padding: '0 0 0 18px', margin: 0, fontSize: '14px', color: '#333' }}>
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AccountingBlueTemplate;
