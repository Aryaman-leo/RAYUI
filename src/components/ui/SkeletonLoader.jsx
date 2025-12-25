import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ 
  type = 'text', 
  width = '100%', 
  height = '20px', 
  className = '',
  count = 1,
  variant = 'default'
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div 
            className={`skeleton-text skeleton-${variant} ${className}`}
            style={{ width, height, borderRadius: '48px' }}
          />
        );
      case 'button':
        return (
          <div 
            className={`skeleton-button skeleton-${variant} ${className}`}
            style={{ width, height }}
          />
        );
      case 'card':
        return (
          <div 
            className={`skeleton-card skeleton-${variant} ${className}`}
            style={{ width, height }}
          />
        );
      case 'circle':
        return (
          <div 
            className={`skeleton-circle skeleton-${variant} ${className}`}
            style={{ width, height }}
          />
        );
      case 'filter':
        return (
          <div 
            className={`skeleton-filter skeleton-${variant} ${className}`}
            style={{ width, height }}
          />
        );
      default:
        return (
          <div 
            className={`skeleton-text skeleton-${variant} ${className}`}
            style={{ width, height }}
          />
        );
    }
  };

  if (count > 1) {
    return (
      <div className="skeleton-group">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-item">
            {renderSkeleton()}
          </div>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};

export default SkeletonLoader;
