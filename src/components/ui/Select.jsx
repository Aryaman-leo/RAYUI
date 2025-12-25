import React from 'react';
import './Input.css';

const Select = ({ 
  variant = 'default',
  size = 'medium',
  error = false,
  className = '',
  children,
  ...props 
}) => {
  const baseClasses = 'select-base';
  const variantClasses = {
    default: 'select-default',
    rounded: 'select-rounded'
  };
  
  const sizeClasses = {
    small: 'select-small',
    medium: 'select-medium',
    large: 'select-large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    error && 'select-error',
    className
  ].filter(Boolean).join(' ');

  return (
    <select
      className={classes}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select; 