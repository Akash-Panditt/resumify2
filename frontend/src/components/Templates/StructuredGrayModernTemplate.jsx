import React from 'react';

const StructuredGrayModernTemplate = React.forwardRef(({ data, onChange }, ref) => {
  const { personalDetails, education, experience, skills, languages, interests } = data;

  const handleUpdate = (section, index, field, value) => {
    if (!onChange) return;
    
    const newData = { ...data };
    if (section === 'personalDetails') {
      newData.personalDetails = { ...newData.personalDetails, [field]: value };
    } else if (index !== null) {
      const newArray = [...(newData[section] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      newData[section] = newArray;
    }
    onChange(newData);
  };

  const Editable = ({ value, onSave, multiline = false, style = {} }) => (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onSave(e.currentTarget.innerText)}
      style={{ outline: 'none', ...style }}
    >
      {value}
    </div>
  );

  const headerBg = '#0f172a'; // Deep charcoal
  const sidebarBg = '#f8fafc'; // Very light slate
  const accentColor = '#6366f1'; // Indigo
  const textColor = '#1e293b'; // Slate 800

  // ... (Icons stay same) ...
  const IconMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const IconMap = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

  return (
    <div ref={ref} style={{
      padding: '0',
      backgroundColor: '#ffffff',
      color: textColor,
      minHeight: '1123px',
      width: '794px',
      margin: '0 auto',
      fontFamily: "'Inter', 'Outfit', sans-serif",
      boxSizing: 'border-box',
      position: 'relative',
      boxShadow: '0 0 40px rgba(0,0,0,0.05)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        [contenteditable]:hover {
          background: rgba(99, 102, 241, 0.03);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.03);
          border-radius: 2px;
          cursor: text;
        }
        [contenteditable]:focus {
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.05);
          border-radius: 2px;
        }
      `}</style>

      {/* Header Section */}
      <div style={{
        backgroundColor: headerBg,
        minHeight: '250px',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        color: '#fff'
      }}>
        <div 
          onClick={data.onPhotoClick}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px',
            position: 'relative'
          }}
        >
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid ${accentColor}40`,
            boxShadow: `0 0 30px rgba(0,0,0,0.3), 0 0 15px ${accentColor}20`,
            backgroundColor: '#1e293b',
            position: 'relative',
            zIndex: 1
          }}>
            {personalDetails?.photo ? (
              <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff',
                background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)',
              }}>
                 <div style={{
                   width: '70px',
                   height: '70px',
                   borderRadius: '50%',
                   background: 'rgba(255,255,255,0.03)',
                   backdropFilter: 'blur(8px)',
                   border: '1px solid rgba(255,255,255,0.1)',
                   marginBottom: '10px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: `0 5px 15px rgba(0,0,0,0.3)`,
                   position: 'relative'
                 }}>
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: accentColor }}>
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                  </svg>
                 </div>
                <span style={{ 
                  fontSize: '0.55rem', 
                  fontWeight: '900', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase', 
                  color: '#94a3b8',
                }}>Import</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ padding: '40px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <Editable 
              value={personalDetails?.fullName || 'RUFUS STEWART'} 
              onSave={(val) => handleUpdate('personalDetails', null, 'fullName', val)} 
            />
          </h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', margin: '15px 0 20px 0', letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8' }}>
            <Editable 
              value={personalDetails?.jobTitle || 'Digital Marketer'} 
              onSave={(val) => handleUpdate('personalDetails', null, 'jobTitle', val)} 
            />
          </h2>
          <div style={{ fontSize: '0.85rem', lineHeight: '1.6', margin: 0, color: '#94a3b8', maxWidth: '420px', borderLeft: `2px solid ${accentColor}`, paddingLeft: '15px' }}>
            <Editable 
              value={personalDetails?.summary || 'I have been working in the digital marketing industry for more than nine years.'} 
              onSave={(val) => handleUpdate('personalDetails', null, 'summary', val)} 
              multiline 
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
        {/* Sidebar */}
        <div style={{
          backgroundColor: sidebarBg,
          padding: '45px 35px',
          minHeight: '883px',
          display: 'flex',
          flexDirection: 'column',
          gap: '45px',
          borderRight: '1px solid #e2e8f0'
        }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconPhone /></span>
                <Editable value={personalDetails?.phone || '+123-456-7890'} onSave={(val) => handleUpdate('personalDetails', null, 'phone', val)} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconMail /></span>
                <Editable value={personalDetails?.email || 'hello@reallygreatsite.com'} onSave={(val) => handleUpdate('personalDetails', null, 'email', val)} style={{ wordBreak: 'break-all' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span style={{ color: accentColor }}><IconMap /></span>
                <Editable value={personalDetails?.address || '123 Anywhere St., Any City'} onSave={(val) => handleUpdate('personalDetails', null, 'address', val)} />
              </div>
              {personalDetails?.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                  <span style={{ color: accentColor }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </span>
                  <Editable value={personalDetails.linkedin} onSave={(val) => handleUpdate('personalDetails', null, 'linkedin', val)} />
                </div>
              )}
              {personalDetails?.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                  <span style={{ color: accentColor }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </span>
                  <Editable value={personalDetails.github} onSave={(val) => handleUpdate('personalDetails', null, 'github', val)} />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Education</h3>
            {(education?.length > 0 ? education : []).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <Editable style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }} value={edu.degree} onSave={(val) => handleUpdate('education', idx, 'degree', val)} />
                <Editable style={{ fontSize: '0.8rem', color: '#475569', margin: '4px 0' }} value={edu.school} onSave={(val) => handleUpdate('education', idx, 'school', val)} />
                <div style={{ fontSize: '0.75rem', color: accentColor, fontWeight: '600' }}>
                  <Editable value={edu.startDate} onSave={(val) => handleUpdate('education', idx, 'startDate', val)} style={{ display: 'inline-block' }} /> 
                  – 
                  <Editable value={edu.endDate} onSave={(val) => handleUpdate('education', idx, 'endDate', val)} style={{ display: 'inline-block' }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(skills?.length > 0 ? skills : []).map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: accentColor }}></div>
                  <Editable style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '600' }} value={skill.name} onSave={(val) => handleUpdate('skills', idx, 'name', val)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '50px 45px' }}>
          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '30px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Professional Experience
              <div style={{ flex: 1, height: '1px', backgroundColor: '#f1f5f9' }}></div>
            </h3>
            
            <div style={{ position: 'relative', paddingLeft: '35px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '10px', width: '1px', backgroundColor: '#e2e8f0' }}></div>

              {(experience?.length > 0 ? experience : []).map((exp, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-35px', top: '4px', width: '12px', height: '12px', backgroundColor: '#fff', border: `2.5px solid ${accentColor}`, borderRadius: '50%', zIndex: 2, boxShadow: '0 0 0 4px #fff' }}></div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <Editable style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem', color: '#0f172a' }} value={exp.jobTitle} onSave={(val) => handleUpdate('experience', idx, 'jobTitle', val)} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: accentColor, backgroundColor: 'rgba(99,102,241,0.08)', padding: '3px 10px', borderRadius: '15px' }}>
                      <Editable value={exp.startDate} onSave={(val) => handleUpdate('experience', idx, 'startDate', val)} style={{ display: 'inline-block' }} /> 
                      – 
                      <Editable value={exp.endDate} onSave={(val) => handleUpdate('experience', idx, 'endDate', val)} style={{ display: 'inline-block' }} />
                    </div>
                  </div>
                  <Editable style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '12px' }} value={exp.company} onSave={(val) => handleUpdate('experience', idx, 'company', val)} />
                  
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                    <Editable value={exp.description} onSave={(val) => handleUpdate('experience', idx, 'description', val)} multiline />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StructuredGrayModernTemplate;
