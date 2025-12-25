import React, { useState, useEffect } from 'react';

// Universal Toast Component
const Toast = ({ 
  message, 
  type = 'error', 
  isVisible, 
  onClose, 
  duration = 3000,
  buttonText,
  onButtonClick,
  buttonVariant = 'default' // 'default', 'primary', 'secondary'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for slide-out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible && !isAnimating) return null;

  // Use gradient backgrounds similar to Upgrade.jsx
  const getBgStyle = () => {
    switch (type) {
      case 'error':
        return { background: 'linear-gradient(to bottom, #FEF2F2, #FFFFFF)' }; // Red gradient
      case 'success':
        return { background: 'linear-gradient(to bottom, #EAE5FF, #FFFFFF)' }; // Purple gradient like Upgrade.jsx
      case 'partial-success':
        return { background: 'linear-gradient(to bottom, #FFF7ED, #FFFFFF)' }; // Orange gradient
      case 'warning':
        return { background: 'linear-gradient(to bottom, #FFFBEB, #FFFFFF)' }; // Yellow gradient
      default:
        return { background: 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)' }; // Blue gradient
    }
  };
  
  const textColor = type === 'error' ? 'text-red-800' : 
                   type === 'success' ? 'text-primary' :
                   type === 'partial-success' ? 'text-orange-800' :
                   type === 'warning' ? 'text-yellow-800' :
                   'text-primary';
  
  const iconColor = type === 'error' ? 'text-red-500' : 
                   type === 'success' ? 'text-primary' :
                   type === 'partial-success' ? 'text-orange-500' :
                   type === 'warning' ? 'text-yellow-500' :
                   'text-primary';

  // Button styling based on variant
  const getButtonClasses = () => {
    const baseClasses = 'px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer border';
    
    switch (buttonVariant) {
      case 'primary':
        return `${baseClasses} bg-primary text-white hover:bg-primary-hover border-primary  hover:border-primary-hover `;
      case 'secondary':
        return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300 hover:border-gray-400`;
      case 'tertiary':
        return `${baseClasses} bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300 hover:border-orange-400`;
      default:
        return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700`;
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    // Close toast after button click
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
             <div className="max-w-sm p-4 rounded-2xl shadow-lg backdrop-blur-sm" style={getBgStyle()}>
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${iconColor} mt-0.5`}>
            {type === 'error' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : type === 'success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : type === 'partial-success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9zM8 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : type === 'warning' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${textColor} whitespace-pre-line mb-2`}>
              {message}
            </p>
            {buttonText && (
              <button
                onClick={handleButtonClick}
                className={getButtonClasses()}
              >
                {buttonText}
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsAnimating(false);
              setTimeout(() => {
                onClose();
              }, 300);
            }}
            className={`flex-shrink-0 ${textColor} hover:opacity-75 transition-opacity cursor-pointer p-1 rounded-full hover:bg-black/5`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;


