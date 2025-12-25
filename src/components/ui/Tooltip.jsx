import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ 
  children,
  content,
  position = 'top',
  variant = 'default',
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const baseClasses = 'tooltip-base';
  const positionClasses = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
    right: 'tooltip-right'
  };
  
  const variantClasses = {
    default: 'tooltip-default',
    dark: 'tooltip-dark',
    light: 'tooltip-light'
  };

  const classes = [
    baseClasses,
    positionClasses[position],
    variantClasses[variant],
    isVisible && 'tooltip-visible',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <div className={classes}>
        {content}
        <div className="tooltip-arrow" />
      </div>
    </div>
  );
};

export default Tooltip; 