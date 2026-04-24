import React from 'react';
import { ExecutiveLayout, ModernSidebarLayout, TechnicalLayout, MinimalistLayout } from './MasterLayouts';

// DOCTOR TEMPLATES (D1-D5)
export const DoctorD1 = React.forwardRef((props, ref) => (
  <ExecutiveLayout {...props} ref={ref} config={{
    primaryColor: '#1e3a8a', 
    fontTitle: 'Georgia', 
    experienceTitle: 'Clinical Residency & Fellowships',
    summaryTitle: 'Medical Profile'
  }} />
));

export const DoctorD2 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#1e40af',
    accentColor: '#60a5fa',
    experienceTitle: 'Medical Practice History',
    skillsTitle: 'Core Competencies'
  }} />
));

export const DoctorD3 = React.forwardRef((props, ref) => (
  <MinimalistLayout {...props} ref={ref} config={{
    primaryColor: '#000',
    experienceTitle: 'Research & Hospital Experience'
  }} />
));

export const DoctorD4 = React.forwardRef((props, ref) => (
  <TechnicalLayout {...props} ref={ref} config={{
    primaryColor: '#0369a1',
    skillsTitle: 'Medical Certifications',
    experienceTitle: 'Emergency Care History'
  }} />
));

export const DoctorD5 = React.forwardRef((props, ref) => (
  <ExecutiveLayout {...props} ref={ref} config={{
    primaryColor: '#164e63',
    fontTitle: 'Times New Roman',
    summaryTitle: 'Board Certifications'
  }} />
));

// NURSE TEMPLATES (N1-N5)
export const NurseN1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#0d9488',
    accentColor: '#5eead4',
    experienceTitle: 'Nursing Practice',
    skillsTitle: 'Clinical Skills'
  }} />
));

export const NurseN2 = React.forwardRef((props, ref) => (
  <ExecutiveLayout {...props} ref={ref} config={{
    primaryColor: '#0f766e',
    fontTitle: 'Verdana',
    experienceTitle: 'Hospital Appointments'
  }} />
));

export const NurseN3 = React.forwardRef((props, ref) => (
  <MinimalistLayout {...props} ref={ref} config={{
    primaryColor: '#10b981',
    experienceTitle: 'Patient Care History'
  }} />
));

export const NurseN4 = React.forwardRef((props, ref) => (
  <TechnicalLayout {...props} ref={ref} config={{
    primaryColor: '#14b8a6',
    skillsTitle: 'Nursing Credentials'
  }} />
));

export const NurseN5 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#334155',
    accentColor: '#10b981',
    experienceTitle: 'Specialized Nursing'
  }} />
));
