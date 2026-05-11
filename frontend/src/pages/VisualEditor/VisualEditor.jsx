import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import A4Canvas from './A4Canvas';
import EditableField from './EditableField';
import FormattingToolbar from './FormattingToolbar';

const VisualEditor = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState({
    personalInfo: { 
      name: 'Alex Johnson', 
      jobTitle: 'Senior Full Stack Engineer',
      email: 'alex.j@example.com', 
      phone: '+1 (555) 000-0000',
      address: 'San Francisco, CA'
    },
    sections: [
      { 
        id: '1',
        type: 'experience', 
        title: 'Professional Experience',
        content: [
          { 
            company: 'InnovateTech', 
            role: 'Lead Developer', 
            period: '2021 - Present',
            description: 'Leading the development of a microservices-based e-commerce platform.'
          }
        ] 
      },
      { 
        id: '2',
        type: 'education', 
        title: 'Education',
        content: [
          { school: 'Stanford University', degree: 'B.S. in Computer Science', period: '2015 - 2019' }
        ] 
      }
    ]
  });

  const [activeElement, setActiveElement] = useState(null);
  const [toolbarPos, setToolbarPos] = useState(null);
  const [activeStyles, setActiveStyles] = useState({});
  const saveTimeoutRef = useRef(null);

  // Debounced Sync with Backend
  const syncWithBackend = useCallback(async (data) => {
    try {
      console.log('Syncing with backend...', data);
      // await axios.put(`${import.meta.env.VITE_API_URL}/api/resumes/${id}`, data);
    } catch (err) {
      console.error('Failed to sync with backend', err);
    }
  }, [id]);

  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      syncWithBackend(resumeData);
    }, 2000); // 2 second debounce

    return () => clearTimeout(saveTimeoutRef.current);
  }, [resumeData, syncWithBackend]);

  const updatePersonalInfo = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const handleFieldFocus = (e, element) => {
    console.log('Field focused:', element);
    const rect = element.getBoundingClientRect();
    setToolbarPos({
      top: rect.top,
      left: rect.left + rect.width / 2
    });
    setActiveElement(element);
  };

  useEffect(() => {
    console.log('Current toolbarPos:', toolbarPos);
  }, [toolbarPos]);

  const handleFormat = (type, value) => {
    if (activeElement) {
      if (type === 'fontWeight') activeElement.style.fontWeight = value;
      if (type === 'fontSize') {
        activeElement.style.fontSize = value === 'lg' ? '1.25rem' : '1rem';
      }
      if (type === 'color') activeElement.style.color = value === 'blue' ? '#3b82f6' : '#111827';
      
      setActiveStyles(prev => ({ ...prev, [type]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Resumify Editor</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">Visual Mode</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Preview</button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Download PDF</button>
          <button 
            id="debug-toolbar"
            onClick={() => setToolbarPos({ top: 300, left: 500 })}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded"
          >
            DEBUG: Show Toolbar
          </button>
        </div>
      </div>

      <FormattingToolbar 
        position={toolbarPos} 
        onFormat={handleFormat} 
        activeStyles={activeStyles} 
      />

      <A4Canvas>
        {/* Header Section */}
        <header className="mb-12 border-b-2 border-gray-900 pb-8">
          <EditableField 
            tagName="h1"
            value={resumeData.personalInfo.name}
            onChange={(val) => updatePersonalInfo('name', val)}
            onFocus={handleFieldFocus}
            className="text-5xl font-black text-gray-900 mb-2 tracking-tight"
          />
          <EditableField 
            tagName="p"
            value={resumeData.personalInfo.jobTitle}
            onChange={(val) => updatePersonalInfo('jobTitle', val)}
            onFocus={handleFieldFocus}
            className="text-xl font-medium text-blue-600 uppercase tracking-widest"
          />
          
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
            <EditableField 
              value={resumeData.personalInfo.email}
              onChange={(val) => updatePersonalInfo('email', val)}
              onFocus={handleFieldFocus}
              className="hover:text-blue-500"
            />
            <span>•</span>
            <EditableField 
              value={resumeData.personalInfo.phone}
              onChange={(val) => updatePersonalInfo('phone', val)}
              onFocus={handleFieldFocus}
              className="hover:text-blue-500"
            />
            <span>•</span>
            <EditableField 
              value={resumeData.personalInfo.address}
              onChange={(val) => updatePersonalInfo('address', val)}
              onFocus={handleFieldFocus}
              className="hover:text-blue-500"
            />
          </div>
        </header>

        {/* Dynamic Sections */}
        <div className="space-y-12">
          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <EditableField 
                tagName="h2"
                value={section.title}
                onChange={(val) => {
                  setResumeData(prev => ({
                    ...prev,
                    sections: prev.sections.map(s => s.id === section.id ? { ...s, title: val } : s)
                  }));
                }}
                onFocus={handleFieldFocus}
                className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2 mb-6"
              />
              
              <div className="space-y-8">
                {section.content.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="flex justify-between items-start mb-1">
                      <EditableField 
                        tagName="h3"
                        value={item.company || item.school}
                        onChange={(val) => {
                          // Deep update logic for content
                        }}
                        onFocus={handleFieldFocus}
                        className="text-xl font-bold text-gray-900"
                      />
                      <EditableField 
                        tagName="span"
                        value={item.period}
                        onChange={() => {}}
                        onFocus={handleFieldFocus}
                        className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded"
                      />
                    </div>
                    <EditableField 
                      tagName="p"
                      value={item.role || item.degree}
                      onChange={() => {}}
                      onFocus={handleFieldFocus}
                      className="text-md font-medium text-gray-700 italic mb-3"
                    />
                    <EditableField 
                      tagName="p"
                      value={item.description || ""}
                      onChange={() => {}}
                      onFocus={handleFieldFocus}
                      className="text-gray-600 leading-relaxed text-justify"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </A4Canvas>
    </div>
  );
};

export default VisualEditor;
