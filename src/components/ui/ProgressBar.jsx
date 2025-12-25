import React from 'react';
import './Progress.css';

const ProgressBar = ({ 
  progress = 0,
  variant = 'default',
  size = 'medium',
  showLabel = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'progress-base';
  const variantClasses = {
    default: 'progress-default',
    primary: 'progress-primary',
    success: 'progress-success'
  };
  
  const sizeClasses = {
    small: 'progress-small',
    medium: 'progress-medium',
    large: 'progress-large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={classes} {...props}>
      <div 
        className="progress-fill"
        style={{ width: `${clampedProgress}%` }}
      />
      {showLabel && (
        <span className="progress-label">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar; 