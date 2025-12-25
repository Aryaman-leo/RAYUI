import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './SkeletonJobCard.css';

// Skeleton Table Header Component
export const SkeletonTableHeader = ({ className = '', variant = 'default' }) => {
  return (
    <div className="job-table-header">
      {/* Checkbox */}
      <div className="job-table-header-cell checkbox">
        <SkeletonLoader type="square" width="16px" height="16px" className="rounded-lg" />
      </div>
      
      {/* Role */}
      <div className="job-table-header-cell role">
        <SkeletonLoader type="text" width="120px" height="16px" variant={variant} />
      </div>
      
      {/* Time */}
      <div className="job-table-header-cell time">
        <SkeletonLoader type="text" width="80px" height="16px" variant={variant} />
      </div>
      
      {/* Location */}
      <div className="job-table-header-cell location">
        <SkeletonLoader type="text" width="100px" height="16px" variant={variant} />
      </div>
      
      {/* Salary Range */}
      <div className="job-table-header-cell salary">
        <SkeletonLoader type="text" width="100px" height="16px" variant={variant} />
      </div>
      
      {/* Matching Rate & Action */}
      <div className="job-table-header-cell matching-action">
        <div className="matching-section">
          <SkeletonLoader type="text" width="80px" height="16px" variant={variant} />
        </div>
        <div className="action-section">
          <SkeletonLoader type="text" width="100px" height="16px" variant={variant} />
        </div>
      </div>
    </div>
  );
};

const SkeletonJobCard = ({ className = '', variant = 'default' }) => {
  return (
    <div className={`skeleton-job-card ${className}`}>
      {/* Main Row Layout - Matching Real Job Cards */}
      <div className="flex items-center gap-4 py-2">
        {/* Checkbox */}
        <SkeletonLoader type="square" width="16px" height="16px" className="rounded-lg" />

        {/* Company Logo */}
        <SkeletonLoader type="circle" width="40px" height="40px" variant={variant} />

        {/* Job Info Section */}
        <div className="flex-1 min-w-0">
          <SkeletonLoader className="mb-1" type="text" width="75%" height="20px" variant={variant} />
          <SkeletonLoader type="text" width="50%" height="16px" variant={variant} />
        </div>

        <div className="flex-1 min-w-0">

          {/* Employment Type */}
          <SkeletonLoader className="mb-1" type="text" width="65%" height="16px" variant={variant} />

          {/* Salary */}
          <SkeletonLoader type="text" width="35%" height="16px" variant={variant} />
        </div>

        {/* Time Posted */}
        <SkeletonLoader type="text" width="80px" height="16px" variant={variant} />

        {/* Location */}
        <SkeletonLoader type="text" width="96px" height="16px" variant={variant} />

        {/* Match Status */}
        {/* <SkeletonLoader type="button" width="64px" height="24px" variant={variant} /> */}

        {/* Action Button */}
        <SkeletonLoader type="button" width="64px" height="32px" variant={variant} />

        {/* Arrow */}
        <SkeletonLoader type="square" width="4px" height="16px" variant={variant} />
      </div>
    </div>
  );
};

export default SkeletonJobCard;
