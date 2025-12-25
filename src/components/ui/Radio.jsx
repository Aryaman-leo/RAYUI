import React from 'react';
import './Radio.css';

const Radio = ({ 
  id, 
  name, 
  value, 
  checked, 
  onChange, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`radio-input ${className}`}
      {...props}
    />
  );
};

export default Radio; 