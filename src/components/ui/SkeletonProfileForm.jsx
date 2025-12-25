import React from 'react';
import SkeletonLoader from './SkeletonLoader';
import './SkeletonProfileForm.css';

const SkeletonProfileForm = ({ className = '' }) => {
  return (
    <div className={`skeleton-profile-form ${className}`}>
      {/* Header Section */}
      <div className="skeleton-header-section">
        <SkeletonLoader type="text" width="300px" height="32px" />
        <SkeletonLoader type="text" width="600px" height="16px" />
        <SkeletonLoader type="text" width="500px" height="16px" />
        <div className="skeleton-divider"></div>
      </div>

      {/* Profile Section */}
      <div className="skeleton-section">
        <div className="skeleton-section-layout">
          <div className="skeleton-section-header">
            <SkeletonLoader type="text" width="80px" height="24px" />
          </div>
          <div className="skeleton-section-content">
            {/* Full Name Field */}
            <div className="skeleton-form-group">
              <SkeletonLoader type="text" width="100px" height="16px" />
              <SkeletonLoader type="text" width="100%" height="40px" />
            </div>
            
            {/* Job Title Field */}
            <div className="skeleton-form-group">
              <SkeletonLoader type="text" width="100px" height="16px" />
              <SkeletonLoader type="text" width="100%" height="40px" />
            </div>
            
            {/* LinkedIn URL Field */}
            <div className="skeleton-form-group">
              <SkeletonLoader type="text" width="120px" height="16px" />
              <SkeletonLoader type="text" width="100%" height="40px" />
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="skeleton-section">
        <div className="skeleton-section-layout">
          <div className="skeleton-section-header">
            <SkeletonLoader type="text" width="80px" height="24px" />
          </div>
          <div className="skeleton-section-content">
            {/* Address Line 1 Field */}
            <div className="skeleton-form-group">
              <SkeletonLoader type="text" width="120px" height="16px" />
              <SkeletonLoader type="text" width="100%" height="40px" />
            </div>
            
            {/* City and State Row */}
            <div className="skeleton-form-row">
              <div className="skeleton-form-group">
                <SkeletonLoader type="text" width="60px" height="16px" />
                <SkeletonLoader type="text" width="100%" height="40px" />
              </div>
              <div className="skeleton-form-group">
                <SkeletonLoader type="text" width="70px" height="16px" />
                <SkeletonLoader type="text" width="100%" height="40px" />
              </div>
            </div>
            
            {/* Postal Code and State Row */}
            <div className="skeleton-form-row">
              <div className="skeleton-form-group">
                <SkeletonLoader type="text" width="100px" height="16px" />
                <SkeletonLoader type="text" width="100%" height="40px" />
              </div>
              <div className="skeleton-form-group">
                <SkeletonLoader type="text" width="70px" height="16px" />
                <SkeletonLoader type="text" width="100%" height="40px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Section */}
      <div className="skeleton-section">
        <div className="skeleton-section-layout">
          <div className="skeleton-section-header">
            <SkeletonLoader type="text" width="80px" height="24px" />
          </div>
          <div className="skeleton-section-content">
            <div className="skeleton-form-group">
              <SkeletonLoader type="text" width="120px" height="16px" />
              <div className="skeleton-phone-input">
                <SkeletonLoader type="text" width="80px" height="40px" />
                <SkeletonLoader type="text" width="calc(100% - 90px)" height="40px" />
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default SkeletonProfileForm;
