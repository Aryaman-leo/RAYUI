import React from 'react';
import './Progress.css';

const Spinner = ({ 
  variant = 'default',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'spinner-base';
  const variantClasses = {
    default: 'spinner-default',
    primary: 'spinner-primary',
    white: 'spinner-white'
  };
  
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="spinner-inner" />
    </div>
  );
};

export default Spinner; 