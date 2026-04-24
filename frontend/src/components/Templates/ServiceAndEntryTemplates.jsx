import React from 'react';
import { ExecutiveLayout, ModernSidebarLayout, TechnicalLayout, MinimalistLayout } from './MasterLayouts';

// RETAIL TEMPLATES (R1-R5)
export const RetailR1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#2563eb',
    accentColor: '#60a5fa',
    experienceTitle: 'Customer Service History',
    skillsTitle: 'Communication Skills'
  }} />
));

export const RetailR2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#1e40af',
      fontTitle: 'Arial',
      experienceTitle: 'Store Operations'
    }} />
  ));

export const RetailR3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#1d4ed8',
        experienceTitle: 'Sales & Inventory Care'
    }} />
));

export const RetailR4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#1e3a8a',
        skillsTitle: 'Retail Systems'
    }} />
));

export const RetailR5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#0f172a',
        accentColor: '#f59e0b',
        experienceTitle: 'Team Leadership'
    }} />
));

// FRESHER TEMPLATES (F1-F5)
export const FresherF1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#10b981',
    accentColor: '#34d399',
    experienceTitle: 'Internships & Volunteering',
    skillsTitle: 'Core Capabilities'
  }} />
));

export const FresherF2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#059669',
      fontTitle: 'Verdana',
      experienceTitle: 'Academic Projects'
    }} />
  ));

export const FresherF3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#047857',
        experienceTitle: 'Early Career History'
    }} />
));

export const FresherF4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#064e3b',
        skillsTitle: 'Toolbox'
    }} />
));

export const FresherF5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#0f172a',
        accentColor: '#10b981',
        experienceTitle: 'University Contributions'
    }} />
));

// STUDENT TEMPLATES (S1-S5)
export const StudentS1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#6366f1',
    accentColor: '#818cf8',
    experienceTitle: 'School Involvement',
    skillsTitle: 'Knowledge Areas'
  }} />
));

export const StudentS2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#4338ca',
      fontTitle: 'Segoe UI',
      experienceTitle: 'Academic Excellence'
    }} />
  ));

export const StudentS3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#3730a3',
        experienceTitle: 'Coursework & GPA'
    }} />
));

export const StudentS4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#1e1b4b',
        skillsTitle: 'Academic Tools'
    }} />
));

export const StudentS5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#0f172a',
        accentColor: '#f43f5e',
        experienceTitle: 'Leadership & Sports'
    }} />
));
