import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './SkeletonPlatformCard.css';

const SkeletonPlatformCard = ({ className = '' }) => {
  return (
    <div className={`skeleton-platform-card ${className}`}>
      {/* Platform Icon */}
      <div className="skeleton-platform-icon">
        <SkeletonLoader type="circle" width="40px" height="40px" />
      </div>
      
      {/* Platform Name */}
      <div className="skeleton-platform-name">
        <SkeletonLoader type="text" width="80px" height="20px" />
      </div>
      
      {/* Job Count */}
      <div className="skeleton-job-count">
        <SkeletonLoader type="text" width="60px" height="14px" />
      </div>
    </div>
  );
};

export default SkeletonPlatformCard;
