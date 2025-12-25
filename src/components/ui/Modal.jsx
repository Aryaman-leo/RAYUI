import React from 'react';
import './Modal.css';

const Modal = ({ 
  isOpen = false,
  onClose,
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props 
}) => {
  if (!isOpen) return null;

  const baseClasses = 'modal-base';
  const variantClasses = {
    default: 'modal-default',
    delete: 'delete-modal',
    premium: 'modal-premium'
  };
  
  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={classes} onClick={(e) => e.stopPropagation()} {...props}>
        {children}
      </div>
    </div>
  );
};

// Modal Header Component
const ModalHeader = ({ 
  title,
  onClose,
  className = '',
  ...props 
}) => {
  return (
    <div className={`modal-header ${className}`} {...props}>
      <h3 className="modal-title">{title}</h3>
      {onClose && (
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

// Modal Content Component
const ModalContent = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`modal-content ${className}`} {...props}>
      {children}
    </div>
  );
};

// Modal Actions Component
const ModalActions = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`modal-actions ${className}`} {...props}>
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal; 