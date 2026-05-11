import React from 'react';

const FormattingToolbar = ({ position, onFormat, activeStyles }) => {
  console.log('SIMPLE FormattingToolbar rendering with position:', position);
  if (!position) return null;

  return (
    <div 
      id="visual-toolbar"
      style={{ 
        position: 'fixed',
        zIndex: 99999,
        top: (position.top - 60) + 'px', 
        left: position.left + 'px',
        transform: 'translateX(-50%)',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        gap: '10px'
      }}
    >
      <button onClick={() => onFormat('fontWeight', 'bold')}>BOLD</button>
      <button onClick={() => onFormat('fontSize', 'lg')}>SIZE</button>
      <button onClick={() => onFormat('color', 'blue')}>COLOR</button>
    </div>
  );
};

export default FormattingToolbar;
