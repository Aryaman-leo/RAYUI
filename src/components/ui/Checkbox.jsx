import React from 'react';
import './Checkbox.css';

const Checkbox = ({
  id,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  // We'll handle the click on the container, so the native checkbox is not needed.
  // The `onChange` prop is expected to be a function that receives an event-like object.
  const handleClick = () => {
    if (!disabled) {
      onChange({ target: { checked: !checked, value } });
    }
  };

  return (
    <div className={`checkbox-container ${className}`} onClick={handleClick} {...props}>
      <div
        className={`checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={id}
      >
        {checked && <div className="checkmark" />}
      </div>
      {label && (
        <label id={id} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox; 