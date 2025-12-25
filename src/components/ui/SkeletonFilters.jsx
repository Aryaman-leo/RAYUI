import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './SkeletonFilters.css';

const SkeletonFilters = ({ className = '' }) => {
  return (
    <div className={`skeleton-filters ${className}`}>
      {/* Filter buttons skeleton - Matching the real JobFilters structure */}
      <div className="skeleton-filter-group">
        {/* Date Posted Filter */}
        <div className="skeleton-filter-dropdown">
          <div className="skeleton-filter-button">
            <SkeletonLoader type="text" width="80px" height="16px" />
            <SkeletonLoader type="circle" width="16px" height="16px" />
          </div>
        </div>
        
        {/* Experience Level Filter */}
        <div className="skeleton-filter-dropdown">
          <div className="skeleton-filter-button">
            <SkeletonLoader type="text" width="100px" height="16px" />
            <SkeletonLoader type="circle" width="16px" height="16px" />
          </div>
        </div>
        
        {/* Employment Type Filter */}
        <div className="skeleton-filter-dropdown">
          <div className="skeleton-filter-button">
            <SkeletonLoader type="text" width="110px" height="16px" />
            <SkeletonLoader type="circle" width="16px" height="16px" />
          </div>
        </div>
        
        {/* Work Mode Filter */}
        <div className="skeleton-filter-dropdown">
          <div className="skeleton-filter-button">
            <SkeletonLoader type="text" width="70px" height="16px" />
            <SkeletonLoader type="circle" width="16px" height="16px" />
          </div>
        </div>
        
        {/* Divider */}
        <div className="skeleton-filter-divider"></div>
        
        {/* All Filters Button */}
        <div className="skeleton-filter-dropdown">
          <div className="skeleton-filter-button skeleton-all-filters">
            <SkeletonLoader type="circle" width="16px" height="16px" />
            <SkeletonLoader type="text" width="80px" height="16px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFilters;
