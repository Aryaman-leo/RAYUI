import React from 'react';
import './Alert.css';

const Alert = ({ 
  children, 
  variant = 'error',
  className = '',
  ...props 
}) => {
  const baseClasses = 'alert-base';
  const variantClasses = {
    error: 'alert-error',
    success: 'alert-success',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export default Alert; 