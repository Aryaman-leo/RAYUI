import React from 'react';
import './Divider.css';

const Divider = ({ 
  variant = 'default',
  orientation = 'horizontal',
  className = '',
  ...props 
}) => {
  const baseClasses = 'divider-base';
  const variantClasses = {
    default: 'divider-default',
    light: 'divider-light',
    dark: 'divider-dark'
  };
  
  const orientationClasses = {
    horizontal: 'divider-horizontal',
    vertical: 'divider-vertical'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    orientationClasses[orientation],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props} />
  );
};

export default Divider; 