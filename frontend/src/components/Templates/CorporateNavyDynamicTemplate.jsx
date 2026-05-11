import React from 'react';

const CorporateNavyDynamicTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, languages } = data;

  const navy = '#1a365d';
  const lightBlue = '#7fb3d5';

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: '#333',
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Header with diagonal shape */}
      <div style={{
        backgroundColor: navy,
        height: '220px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        color: '#fff'
      }}>
        {/* Diagonal white stripe */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.1) 40.5%, rgba(255,255,255,0.1) 45%, transparent 45.5%)'
        }}></div>

        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '6px solid #fff',
          overflow: 'hidden',
          backgroundColor: '#fff',
          zIndex: 2,
          marginRight: '40px'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#ccc' }}>
              {personalDetails?.fullName?.charAt(0) || 'H'}
            </div>
          )}
        </div>

        <div style={{ zIndex: 2 }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {personalDetails?.fullName || 'HOWARD ONG'}
          </h1>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0 15px 0', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.9 }}>
            {personalDetails?.jobTitle || 'Social Media Manager'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📞</span> {personalDetails?.phone || '+123-456-7890'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✉️</span> {personalDetails?.email || 'hello@reallygreatsite.com'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🌐</span> {personalDetails?.website || '@reallygreatsite'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span> {personalDetails?.address || '123 Anywhere St., Any City'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', padding: '50px 60px' }}>
        {/* Left Column */}
        <div>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: navy, borderBottom: '2px solid #eee', paddingBottom: '5px' }}>EDUCATION</h3>
            {(education?.length > 0 ? education : [
              { degree: 'BACHELOR OF ARTS IN MARKETING AND COMMUNICATION', school: 'Larana University', startDate: '2009', endDate: '2013' },
              { degree: 'CONTENT & MARKETING STRATEGY IN SOCIAL MEDIA', school: 'Borcelle Institute', startDate: '2013', endDate: '' },
              { degree: 'MARKETING & ADVERTISING STRATEGY IN SOCIAL MEDIA', school: 'Salford Institute', startDate: '2014', endDate: '' }
            ]).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '800', fontSize: '13px', lineHeight: '1.4' }}>{edu.degree}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>{edu.school}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{edu.startDate} {edu.endDate && `- ${edu.endDate}`}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: navy, borderBottom: '2px solid #eee', paddingBottom: '5px' }}>SKILLS</h3>
            {(skills?.length > 0 ? skills : [
              { name: 'Digital Marketing', level: 90 },
              { name: 'Branding', level: 80 },
              { name: 'Copywriting', level: 85 },
              { name: 'Creativity & Design', level: 75 },
              { name: 'Content Creation', level: 90 },
              { name: 'Customer service', level: 70 },
              { name: 'Anallytics', level: 85 },
              { name: 'Research', level: 80 },
              { name: 'Meta Ads', level: 85 }
            ]).map((skill, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>• {skill.name}</div>
                <div style={{ width: '80px', height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level || 80}%`, height: '100%', backgroundColor: navy }}></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: navy, borderBottom: '2px solid #eee', paddingBottom: '5px' }}>LANGUAGES</h3>
            {(languages?.length > 0 ? languages : [
              { name: 'ENGLISH', level: 95 },
              { name: 'FRENCH', level: 70 }
            ]).map((lang, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>• {lang.name}</div>
                <div style={{ width: '80px', height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${lang.level || 80}%`, height: '100%', backgroundColor: navy }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px', color: navy }}>ABOUT ME</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
              {personalDetails?.summary || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: navy }}>WORK EXPERIENCE</h3>
            {(experience?.length > 0 ? experience : [
              {
                jobTitle: 'Social Media Manager',
                company: 'Ingoude Company',
                startDate: '2020',
                endDate: 'Now',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              },
              {
                jobTitle: 'Social Media Graphic Designer',
                company: 'Fradel and Spies',
                startDate: '2016',
                endDate: '2020',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              },
              {
                jobTitle: 'Promotion Department Staff',
                company: 'Giggling Platypus Co.',
                startDate: '2014',
                endDate: '2016',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              }
            ]).map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{exp.jobTitle}</div>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: '#666' }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div style={{ fontWeight: '800', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase' }}>{exp.company}</div>
                <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0, color: '#444' }}>{exp.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: navy }}>REFERENCES</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <div style={{ fontWeight: '800', fontSize: '14px' }}>Chad Gibbons</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Fradel and Spies / CEO</div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}><b>Phone:</b> 123-456-7890</div>
                <div style={{ fontSize: '12px' }}><b>Email:</b> hello@reallygreatsite.com</div>
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '14px' }}>Reese Miller</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Ingoude Company / CEO</div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}><b>Phone:</b> 123-456-7890</div>
                <div style={{ fontSize: '12px' }}><b>Email:</b> hello@reallygreatsite.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer wave shape */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: navy,
        clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)'
      }}></div>
    </div>
  );
});

export default CorporateNavyDynamicTemplate;
