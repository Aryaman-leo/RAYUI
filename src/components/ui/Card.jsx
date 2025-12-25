import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'card-base';
  const variantClasses = {
    default: 'card',
    overview: 'overview-card',
    platform: 'platform-card',
    select: 'selectCard',
    import: 'import-box',
    importSelected: 'import-box-select'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    onClick && 'card-clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 