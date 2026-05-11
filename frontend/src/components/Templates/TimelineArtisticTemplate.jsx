import React from 'react';

const TimelineArtisticTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, awards } = data;

  const lightGray = '#f0f0f0';
  const textColor = '#111';

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: textColor,
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '300px 1fr'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Sidebar */}
      <div style={{
        backgroundColor: lightGray,
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '45px'
      }}>
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#fff',
          margin: '0 auto'
        }}>
          {personalDetails?.photo ? (
            <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#ccc' }}>
              {personalDetails?.fullName?.charAt(0) || 'D'}
            </div>
          )}
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>CONTACT</h3>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#000', marginBottom: '20px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px', fontWeight: '500' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✉️</span> {personalDetails?.email || 'hello@reallygreatsite.com'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📞</span> {personalDetails?.phone || '+123-456-7890'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📍</span> {personalDetails?.address || '123 Anywhere St., Any City'}
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>EDUCATION</h3>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#000', marginBottom: '20px' }}></div>
          {(education?.length > 0 ? education : [
            { degree: 'Bachelor of Business Management', school: 'Borcelle Business School', endDate: '2016' },
            { degree: 'Certificate in Digital Marketing', school: 'Larana Business School', endDate: '2014' },
            { degree: 'Certificate in Digital Marketing', school: 'Larana Business School', endDate: '2014' }
          ]).map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: '800', fontSize: '13px' }}>• {edu.school}</div>
              <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#555', margin: '3px 0' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', fontWeight: '600' }}>Completed in {edu.endDate}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>SKILL</h3>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#000', marginBottom: '20px' }}></div>
          <ul style={{ padding: '0 0 0 15px', margin: 0, fontSize: '13px', fontWeight: '500', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(skills?.length > 0 ? skills : [
              { name: 'Web Design' },
              { name: 'Design Thinking' },
              { name: 'Front End Coding' },
              { name: 'Backend Tech' },
              { name: 'Problem-Solving' },
              { name: 'Project Management Tools' }
            ]).map((skill, idx) => (
              <li key={idx}>{skill.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>AWARDS</h3>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#000', marginBottom: '20px' }}></div>
          {(awards?.length > 0 ? awards : [
            { name: 'The Best Employee of the Year', date: 'Oct 2019', organization: 'Ingoude Company' },
            { name: 'The Best Employee of the Year', date: 'May 2015', organization: 'Timmerman Industries' }
          ]).map((award, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>{award.date} | {award.organization}</div>
              <div style={{ fontSize: '13px', fontWeight: '800' }}>{award.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '60px 50px' }}>
        <div style={{ marginBottom: '50px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: '0', letterSpacing: '-1px', lineHeight: '1' }}>
            {personalDetails?.fullName?.split(' ')[0] || 'Dani'}<br/>
            {personalDetails?.fullName?.split(' ').slice(1).join(' ') || 'Martinez'}
          </h1>
          <h2 style={{ fontSize: '24px', fontWeight: '400', margin: '15px 0 0 0', letterSpacing: '3px', textTransform: 'uppercase', color: '#555' }}>
            {personalDetails?.jobTitle || 'Web Developer'}
          </h2>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px' }}>PROFILE</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, textAlign: 'justify', color: '#444' }}>
            {personalDetails?.summary || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus enim, semper ut imperdiet et, congue at elit. Phasellus lacinia turpis sit amet lorem hendrerit, a gravida velit bibendum. In erat nisl, venenatis tempor tortor et, finibus mattis velit. Integer egestas lacinia arcu. Nullam nec eros tincidunt neque condimentum dignissim. Nulla eget elementum quam. Aenean non efficitur nisl, vitae faucibus elit.'}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '30px' }}>WORK EXPERIENCE</h3>
          
          {(experience?.length > 0 ? experience : [
            {
              jobTitle: 'Applications Developer',
              company: 'Ginyard International Co.',
              startDate: '2019',
              endDate: 'Present',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.'
            },
            {
              jobTitle: 'Web Content Manager',
              company: 'Ginyard International Co.',
              startDate: '2018',
              endDate: '2019',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.'
            },
            {
              jobTitle: 'Applications Developer',
              company: 'Really Great Company',
              startDate: '2014',
              endDate: '2016',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.'
            },
            {
              jobTitle: 'Web Content Manager',
              company: 'Really Great Company',
              startDate: '2013',
              endDate: '2014',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.'
            }
          ]).map((exp, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
              <div style={{ flexShrink: 0, width: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  padding: '10px 5px', 
                  border: '1px solid #000', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff'
                }}>
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '18px', color: '#000', marginBottom: '5px' }}>{exp.jobTitle}</div>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#444', marginBottom: '10px' }}>{exp.company}</div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, color: '#666' }}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '30px' }}>REFERENCES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <div style={{ fontWeight: '900', fontSize: '18px' }}>Bailey Dupont</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Wardiere Inc. / CEO</div>
              <div style={{ fontSize: '13px', marginTop: '10px', color: '#444' }}><b>Phone:</b> 123-456-7890</div>
              <div style={{ fontSize: '13px', color: '#444' }}><b>Email:</b> hello@reallygreatsite.com</div>
            </div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '18px' }}>Harumi Kobayashi</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Wardiere Inc. / CEO</div>
              <div style={{ fontSize: '13px', marginTop: '10px', color: '#444' }}><b>Phone:</b> 123-456-7890</div>
              <div style={{ fontSize: '13px', color: '#444' }}><b>Email:</b> hello@reallygreatsite.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TimelineArtisticTemplate;
