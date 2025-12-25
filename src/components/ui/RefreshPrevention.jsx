import React, { useState, useEffect } from 'react';

// Toast Alert Component (copied from Login.jsx)
const ToastAlert = ({ message, type = 'error', isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for slide-out animation
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-green-500';

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`max-w-sm p-4 rounded-lg shadow-lg border ${bgColor} backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${iconColor} mt-0.5`}>
            {type === 'error' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${textColor}`}>
              {message}
            </p>
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

const RefreshPrevention = ({ enabled = true, message = "Please don't refresh the page while job processing is in progress." }) => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (event) => {
      // Show the toast alert
      setIsToastVisible(true);
      
      // Completely prevent the browser from showing any alert/warning
      // Don't set returnValue or return anything to avoid browser dialog
      event.preventDefault();
      
      // Return undefined to prevent any browser warning
      return undefined;
    };

    const handleKeyDown = (event) => {
      // Prevent F5 key refresh
      if (event.key === 'F5') {
        event.preventDefault();
        event.stopPropagation();
        setIsToastVisible(true);
        return false;
      }
      
      // Prevent Ctrl+R refresh
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        event.stopPropagation();
        setIsToastVisible(true);
        return false;
      }
      
      // Prevent Ctrl+Shift+R refresh
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        event.stopPropagation();
        setIsToastVisible(true);
        return false;
      }

      // Prevent Ctrl+Shift+I (developer tools)
      if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      // Prevent F12 key
      if (event.key === 'F12') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleKeyUp = (event) => {
      // Prevent F5 key refresh on keyup as well
      if (event.key === 'F5') {
        event.preventDefault();
        event.stopPropagation();
        setIsToastVisible(true);
        return false;
      }
    };

    const handleContextMenu = (event) => {
      // Prevent right-click context menu
      event.preventDefault();
      return false;
    };

    // Add event listeners with capture phase for better effectiveness
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    };
  }, [enabled, message]);

  const closeToast = () => {
    setIsToastVisible(false);
  };

  return (
    <ToastAlert
      message={message}
      type="error"
      isVisible={isToastVisible}
      onClose={closeToast}
    />
  );
};

export default RefreshPrevention; 