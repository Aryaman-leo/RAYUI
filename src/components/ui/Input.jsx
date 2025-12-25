import React from 'react';
import './Input.css';

const Input = React.forwardRef(({ 
  type = 'text',
  variant = 'default',
  size = 'medium',
  error = false,
  className = '',
  inputClassName = '',
  ...props 
}, ref) => {
  const baseClasses = 'input-base';
  const variantClasses = {
    default: 'input-default',
    rounded: 'input-rounded',
    select: 'input-select'
  };
  
  const sizeClasses = {
    small: 'input-small',
    medium: 'input-medium',
    large: 'input-large'
  };

  const finalInputClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    error && 'input-error',
    inputClassName,
  ].filter(Boolean).join(' ');

  return (
    <div className={`input-container ${className}`}>
      <input
        ref={ref}
        type={type}
        className={finalInputClasses}
        autoComplete="off"
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 