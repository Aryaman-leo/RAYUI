import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './SkeletonApplicationCard.css';

const SkeletonApplicationCard = ({ className = '', showCheckbox = false }) => {
  return (
    <div className={`skeleton-application-card ${showCheckbox ? 'skeleton-application-card-with-checkbox' : ''} ${className}`}>
      {/* Checkbox Column - Only show when showCheckbox is true */}
      {showCheckbox && (
        <div className="skeleton-application-card-checkbox">
          <SkeletonLoader type="square" width="16px" height="16px" />
        </div>
      )}
      
      {/* Column 1: Logo + Job Info */}
      <div className="skeleton-application-card-logo-info">
        <SkeletonLoader type="circle" width="48px" height="48px" />
        <div className="skeleton-application-card-info">
          <SkeletonLoader className="mb-1" type="text" width="75%" height="20px" />
          <SkeletonLoader type="text" width="50%" height="16px" />
        </div>
      </div>
      
      {/* Column 2: Submitted Date/Time */}
      <div className="skeleton-application-card-time">
        <div className="skeleton-time-info">
          <SkeletonLoader type="text" width="80px" height="16px" />
          <SkeletonLoader type="text" width="60px" height="14px" />
        </div>
      </div>
      
      {/* Column 3: Platform */}
      <div className="skeleton-application-card-platform">
        <SkeletonLoader type="text" width="96px" height="16px" />
      </div>
      
      {/* Column 4: Status */}
      <div className="skeleton-application-card-status">
        <SkeletonLoader type="button" width="64px" height="24px" />
      </div>
      
      {/* Column 5: View Button, Arrow */}
      <div className="skeleton-application-card-actions">
        <SkeletonLoader type="button" width="64px" height="32px" />
        <SkeletonLoader type="circle" width="20px" height="20px" />
      </div>
    </div>
  );
};

export default SkeletonApplicationCard;
