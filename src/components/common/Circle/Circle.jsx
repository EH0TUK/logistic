// Circle.jsx
import React from 'react';
import './Circle.css';

const Circle = ({ radius, showPlus, className }) => {
  const circleStyle = {
    width: `${radius}px`,
    height: `${radius}px`,
    borderRadius: '50%',
    background: `radial-gradient(circle at 90% 90%, var(--color-secondary), var(--color-primary))`,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'var(--color-background-log)'
  };

  const plusSize = radius * 0.4;
  const plusThickness = radius * 0.15;

  return (
    <div className={`circle-container ${className}`}>
      <div style={circleStyle}>
        {showPlus && (
          <div className="plus" style={{ width: `${plusSize}px`, height: `${plusSize}px` }}>
            <div
              className="plus-line vertical"
              style={{ width: `${plusThickness}px`, height: `${plusSize}px` }}
            ></div>
            <div
              className="plus-line horizontal"
              style={{ width: `${plusSize}px`, height: `${plusThickness}px` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Circle;