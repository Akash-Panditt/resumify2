import React from 'react';
import { ExecutiveLayout, ModernSidebarLayout, TechnicalLayout, MinimalistLayout } from './MasterLayouts';

// LAWYER TEMPLATES (L1-L5)
export const LawyerL1 = React.forwardRef((props, ref) => (
  <ExecutiveLayout {...props} ref={ref} config={{
    primaryColor: '#334155',
    fontTitle: 'Constantia',
    experienceTitle: 'Legal Practice History',
    summaryTitle: 'Attorney Profile'
  }} />
));

export const LawyerL2 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
      primaryColor: '#1e293b',
      accentColor: '#94a3b8',
      experienceTitle: 'Professional Experience',
      skillsTitle: 'Expertise & Bar Admissions'
    }} />
  ));

export const LawyerL3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#000',
        experienceTitle: 'Litigation & Counsel History'
    }} />
));

export const LawyerL4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#475569',
        skillsTitle: 'Legal Skills & Research'
    }} />
));

export const LawyerL5 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
        primaryColor: '#000',
        fontTitle: 'Garamond',
        experienceTitle: 'Judicial Clerkships'
    }} />
));

// TEACHER TEMPLATES (T1-T5)
export const TeacherT1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#4f46e5',
    accentColor: '#818cf8',
    experienceTitle: 'Teaching Experience',
    skillsTitle: 'Pedagogy & Tools'
  }} />
));

export const TeacherT2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#4338ca',
      fontTitle: 'Trebuchet MS',
      experienceTitle: 'Academic Instruction'
    }} />
  ));

export const TeacherT3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#6366f1',
        experienceTitle: 'Curriculum Development'
    }} />
));

export const TeacherT4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#3730a3',
        skillsTitle: 'Educational Tech'
    }} />
));

export const TeacherT5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#1e1b4b',
        accentColor: '#ec4899',
        experienceTitle: 'Student Engagement'
    }} />
));
