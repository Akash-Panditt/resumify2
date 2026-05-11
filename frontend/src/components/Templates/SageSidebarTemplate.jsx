import React from 'react';

const SageSidebarTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills } = data;

  const sidebarBg = '#d9e0d8';
  const accentColor = '#7a9e9f';
  const textColor = '#333';

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: textColor,
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '260px 1fr'
    }}>
      {/* Sidebar */}
      <div style={{
        backgroundColor: sidebarBg,
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        <div 
          onClick={data.onPhotoClick}
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
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
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px', color: accentColor }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: accentColor, letterSpacing: '1px', textTransform: 'uppercase' }}>Import Photo</span>
            </div>
          )}
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px', borderBottom: '1px solid #aaa', paddingBottom: '5px' }}>CONTACT ME</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>📍</span>
              <span>{personalDetails?.address || '123 Anywhere St., Any City'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>📞</span>
              <span>{personalDetails?.phone || '+123-456-7890'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>✉️</span>
              <span style={{ wordBreak: 'break-all' }}>{personalDetails?.email || 'hello@reallygreatsite.com'}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px', borderBottom: '1px solid #aaa', paddingBottom: '5px' }}>MY SKILLS</h3>
          <ul style={{ padding: '0 0 0 15px', margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(skills?.length > 0 ? skills : [
              { name: 'Social media marketing' },
              { name: 'Digital marketing' },
              { name: 'Corporate communication' },
              { name: 'Communication skills' },
              { name: 'Project management' },
              { name: 'Search engine optimization' },
              { name: 'Fluent in English' },
              { name: 'Multitasking' },
              { name: 'Project Planning' },
              { name: 'Risk Assessment' },
              { name: 'Leadership' },
              { name: 'Conflict Resolution' }
            ]).map((skill, idx) => (
              <li key={idx}>{skill.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', letterSpacing: '1px', borderBottom: '1px solid #aaa', paddingBottom: '5px' }}>EDUCATION</h3>
          {(education?.length > 0 ? education : [
            { degree: "Master's in Economics", school: 'University Name and Location', startDate: '2017', endDate: '2020' },
            { degree: "Bachelor's in Marketing", school: 'University Name and Location', startDate: '2010', endDate: '2016' }
          ]).map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: '700', fontSize: '13px' }}>|| {edu.degree}</div>
              <div style={{ fontSize: '12px', marginTop: '3px', color: '#666' }}>{edu.school}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{edu.startDate}-{edu.endDate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '60px 40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '400', margin: '0', color: '#555', letterSpacing: '1px' }}>
            {personalDetails?.fullName || 'MARCELINE ANDERSON'}
          </h1>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 0 0', color: '#777', letterSpacing: '1px' }}>
            {personalDetails?.jobTitle || 'Digital Marketing Manager'}
          </h2>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px', color: '#555' }}>SUMMARY</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, color: '#444' }}>
            {personalDetails?.summary || 'I have been working as a Digital Marketing Specialist for five years. I have experience as the leader of various marketing campaigns and developing various online strategies for my company\'s marketing purposes. I started to develop an interest in digital marketing after I graduated from high school and started my blog.'}
          </p>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', marginTop: '20px' }}></div>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#555' }}>WORK EXPERIENCE</h3>
          
          {(experience?.length > 0 ? experience : [
            {
              jobTitle: 'Freelance',
              company: 'Local Company',
              startDate: '2017',
              endDate: '2019',
              description: 'I worked as a freelance Digital Marketer and handled the local company promotion campaign for a new beer product.\nI handled the project from a local restaurant to create and manage a promo event on reallygreatsite.com'
            },
            {
              jobTitle: 'Senior Digital Marketer',
              company: 'Company name and Location',
              startDate: '',
              endDate: '',
              description: 'Handles effective digital marketing campaigns that consistently result in a 50 - 100% return investment\nConduct effective market research on key accounts'
            },
            {
              jobTitle: 'Digital Marketer',
              company: 'Company name and Location',
              startDate: '',
              endDate: '',
              description: 'Examine the monetary aspects of product development\nDetermine and assets marketing'
            }
          ]).map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: '#444' }}>{exp.jobTitle} {exp.startDate && `( ${exp.startDate} – ${exp.endDate} )`}</div>
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{exp.company}</div>
              {exp.description && (
                <ul style={{ padding: '0 0 0 18px', margin: 0, fontSize: '13px', color: '#444' }}>
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SageSidebarTemplate;
