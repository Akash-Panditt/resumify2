import React from 'react';
import { ExecutiveLayout, ModernSidebarLayout, TechnicalLayout, MinimalistLayout } from './MasterLayouts';

// MARKETING TEMPLATES (M1-M5)
export const MarketingM1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#db2777',
    accentColor: '#f472b6',
    experienceTitle: 'Growth & Impact History',
    skillsTitle: 'Digital Marketing Stack'
  }} />
));

export const MarketingM2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#c026d3',
      fontTitle: 'Montserrat',
      experienceTitle: 'Campaign Leadership'
    }} />
  ));

export const MarketingM3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#e11d48',
        experienceTitle: 'Brand Strategy'
    }} />
));

export const MarketingM4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#be123c',
        skillsTitle: 'Analytical Tools'
    }} />
));

export const MarketingM5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#4c1d95',
        accentColor: '#fb7185',
        experienceTitle: 'Marketing Performance'
    }} />
));

// DESIGNER TEMPLATES (DS1-DS5)
export const DesignerDS1 = React.forwardRef((props, ref) => (
  <ModernSidebarLayout {...props} ref={ref} config={{
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    experienceTitle: 'Design Career',
    skillsTitle: 'Visual Toolbox'
  }} />
));

export const DesignerDS2 = React.forwardRef((props, ref) => (
    <ExecutiveLayout {...props} ref={ref} config={{
      primaryColor: '#4f46e5',
      fontTitle: 'Helvetica',
      experienceTitle: 'Art Direction'
    }} />
  ));

export const DesignerDS3 = React.forwardRef((props, ref) => (
    <MinimalistLayout {...props} ref={ref} config={{
        primaryColor: '#000',
        experienceTitle: 'Creative Portfolio'
    }} />
));

export const DesignerDS4 = React.forwardRef((props, ref) => (
    <TechnicalLayout {...props} ref={ref} config={{
        primaryColor: '#0f172a',
        skillsTitle: 'Software & UI Tools'
    }} />
));

export const DesignerDS5 = React.forwardRef((props, ref) => (
    <ModernSidebarLayout {...props} ref={ref} config={{
        primaryColor: '#2dd4bf',
        accentColor: '#115e59',
        experienceTitle: 'Product Design'
    }} />
));
