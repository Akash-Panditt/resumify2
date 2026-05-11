import React from 'react';

const ATSGoldEliteTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects, languages, certifications } = data;

  const accentColor = '#d4af37'; // Gold color from the screenshot

  return (
    <div ref={ref} style={{
      padding: '40px 60px',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      lineHeight: '1.5',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '15px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '800', 
          margin: '0 0 4px 0', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {personalDetails?.fullName || 'ESTELLE DARCY'}
        </h1>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '700', 
          margin: '0 0 12px 0', 
          textTransform: 'uppercase',
          letterSpacing: '0.02em'
        }}>
          {personalDetails?.jobTitle || 'PROCESS ENGINEER'}
        </h2>
        <div style={{ 
          display: 'flex', 
          fontSize: '13px', 
          color: '#444',
          gap: '12px',
          alignItems: 'center',
          fontWeight: '500'
        }}>
          <span>{personalDetails?.address || '123 Anywhere St., Any City'}</span>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span>{personalDetails?.email || 'hello@reallygreatsite.com'}</span>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span>{personalDetails?.website || 'www.reallygreatsite.com'}</span>
        </div>
      </div>

      <div style={{ width: '100%', height: '2px', backgroundColor: accentColor, marginBottom: '25px' }}></div>

      {/* Summary */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 8px 0', textTransform: 'uppercase' }}>SUMMARY</h3>
        <p style={{ fontSize: '13px', margin: 0, color: '#333' }}>
          {personalDetails?.summary || 'Practical Engineer with Significant Experience in Process Design, I have worked with some organizations, ensuring a grounded approach to my profession, leveraging my expertise to optimize processes and deliver innovative solutions that meet business objectives.'}
        </p>
      </div>

      {/* Skills Section - Two Columns */}
      <div style={{ display: 'flex', gap: '50px', marginBottom: '25px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>PROFESSIONAL SKILLS</h3>
          <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '10px' }}></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
            {(skills?.length > 0 ? skills.slice(0, 4) : [
              { name: 'Prototyping Tools' },
              { name: 'Interaction Design' },
              { name: 'User Research' },
              { name: 'Visual Design' }
            ]).map((skill, idx) => (
              <div key={idx}>{skill.name}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>TECHNICAL SKILLS</h3>
          <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '10px' }}></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
            {(skills?.length > 4 ? skills.slice(4, 8) : [
              { name: 'Accessibility' },
              { name: 'Interaction Design' },
              { name: 'Responsive Design' },
              { name: 'Visual Design' }
            ]).map((skill, idx) => (
              <div key={idx}>{skill.name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>PROFESSIONAL EXPERIENCE</h3>
        <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '12px' }}></div>
        {(experience?.length > 0 ? experience : [
          {
            jobTitle: 'Instrument Tech',
            company: 'Morcelle Program',
            startDate: 'Jan 2024',
            endDate: 'Present',
            description: 'Led development of an advanced automation system, achieving a 15% increase in operational efficiency.\nStreamlined manufacturing processes, reducing production costs by 10%.\nImplemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.'
          },
          {
            jobTitle: 'Internship',
            company: 'XarrowAI Industries',
            startDate: 'Jun 2022',
            endDate: 'Aug 2022',
            description: 'Designed and optimised a robotic control system, realizing a 12% performance improvement.\nCoordinated testing and validation, ensuring compliance with industry standards.\nProvided technical expertise, contributing to a 15% reduction in system failures.'
          }
        ]).map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>
                {exp.jobTitle}{exp.company && `, ${exp.company}`}
              </div>
              <div style={{ fontWeight: '700', fontSize: '13px' }}>{exp.startDate} - {exp.endDate}</div>
            </div>
            {exp.description && (
              <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '13px', listStyleType: 'disc', color: '#333' }}>
                {exp.description.split('\n').map((line, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>PROJECTS</h3>
        <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '12px' }}></div>
        {(projects?.length > 0 ? projects : [
          {
            name: 'Industrial Basics and General Application',
            organization: 'University of Engineering Process Cohort',
            startDate: 'Jan 2023',
            endDate: 'Jun 2023',
            description: 'Automotive Technology.\nTechnological Advancements within the current Chemical & Process Industry".\nOther relevant information.'
          }
        ]).map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{proj.name}</div>
              <div style={{ fontWeight: '700', fontSize: '13px' }}>{proj.startDate} - {proj.endDate}</div>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '4px' }}>{proj.organization}</div>
            {proj.description && (
              <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '13px', listStyleType: 'disc', color: '#333' }}>
                {proj.description.split('\n').map((line, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Education */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>EDUCATION</h3>
        <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '12px' }}></div>
        {(education?.length > 0 ? education : [
          {
            degree: 'Bachelor of Design in Process Engineering',
            school: 'Engineering University',
            startDate: 'Sep 2019',
            endDate: 'Sep 2023',
            description: 'Relevant coursework in Process Design and Project Management.'
          }
        ]).map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>{edu.degree}</div>
              <div style={{ fontWeight: '700', fontSize: '13px' }}>{edu.startDate} - {edu.endDate}</div>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '4px' }}>{edu.school}</div>
            {edu.description && (
              <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '13px', listStyleType: 'disc', color: '#333' }}>
                {edu.description.split('\n').map((line, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase' }}>ADDITIONAL INFORMATION</h3>
        <div style={{ width: '100%', height: '1px', backgroundColor: accentColor, marginBottom: '12px' }}></div>
        <div style={{ fontSize: '13px', color: '#333' }}>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontWeight: '800' }}>Languages:</span> {languages?.length > 0 ? languages.map(l => `${l.name} (${l.level})`).join(', ') : 'English, French, Mandarin.'}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontWeight: '800' }}>Certifications:</span> {certifications?.length > 0 ? certifications.map(c => c.name).join(', ') : 'Professional Design Engineer (PDE) License, Project Management Tech (PMT), Structural Process Design (SPD).'}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontWeight: '800' }}>Awards/Activities:</span> Most Innovative Intern of the Year (2022), Overall Best Intern, Division Two (2022), Onboarding Project Lead (2024)
          </div>
        </div>
      </div>
    </div>
  );
});

export default ATSGoldEliteTemplate;
