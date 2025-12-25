import React, { useState } from 'react';
import { Clock, Location, DollarCircle, ArrowRight2, ExportSquare, Eye } from 'iconsax-reactjs';
import PreviewButton from '../Dashboard/PreviewButton.jsx';
import Checkbox from './Checkbox';
import './JobCard.css';

import { convertStateAbbrToFull } from "../../utils/formHelpers";
import { Loader } from 'lucide-react';
import { formatTimePosted, calculateTimeFromJobData, getFormattedTime } from '../../utils/timeUtils.js';

// Helper function to check if job is less than 1 day old
const isJobRecent = (job) => {
  if (!job) return false;
  
  let jobDate = null;
  
  // Try to get date from created_at first
  if (job.created_at) {
    jobDate = new Date(job.created_at);
  }
  // Fallback to date_posted if it exists
  else if (job.date_posted) {
    jobDate = new Date(job.date_posted);
  }
  // Fallback to datePosted if it exists
  else if (job.datePosted) {
    jobDate = new Date(job.datePosted);
  }
  // Fallback to discovered_at if it exists
  else if (job.discovered_at) {
    jobDate = new Date(job.discovered_at);
  }
  
  if (!jobDate || isNaN(jobDate.getTime())) {
    return false;
  }
  
  // Calculate if job is less than 48 hours old
  const now = new Date();
  const diffInMs = now - jobDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  return diffInHours < 48;
};
import { getApplicationStatusBadge } from '../../utils/applicationUtils.jsx';
import { formatLocation, formatSalary, getMatchBadgeColor } from '../../utils/jobUtils.js';

// Custom Apply Icon Component
const ApplyIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none"
    className={className}
  >
    <path d="M13.9098 8.16883L15.4028 6.67574C15.9768 6.10171 15.9768 5.17105 15.4028 4.59702C14.8288 4.023 13.8981 4.023 13.3241 4.59702L11.831 6.09011M13.9098 8.16883L5.00924 17.0693C4.43521 17.6433 3.50454 17.6433 2.93052 17.0693C2.35649 16.4953 2.35649 15.5646 2.93052 14.9906L11.831 6.09011M13.9098 8.16883L11.831 6.09011" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
    <path d="M14.9781 11.6844C14.9829 11.6605 15.0171 11.6605 15.0219 11.6844C15.2752 12.9233 16.2433 13.8914 17.4821 14.1446C17.506 14.1494 17.506 14.1836 17.4821 14.1884C16.2433 14.4417 15.2752 15.4098 15.0219 16.6486C15.0171 16.6725 14.9829 16.6725 14.9781 16.6486C14.7249 15.4098 13.7568 14.4417 12.5179 14.1884C12.494 14.1836 12.494 14.1494 12.5179 14.1446C13.7568 13.8914 14.7249 12.9233 14.9781 11.6844Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
    <path d="M6.76719 2.75806C6.83752 2.41398 7.32914 2.41398 7.39947 2.75806C7.5548 3.51799 8.14867 4.11186 8.90858 4.26719C9.25266 4.33752 9.25266 4.82914 8.90858 4.89947C8.14867 5.0548 7.5548 5.64867 7.39947 6.40861C7.32914 6.75268 6.83752 6.75268 6.76719 6.40861C6.61186 5.64867 6.01799 5.0548 5.25806 4.89947C4.91398 4.82914 4.91398 4.33752 5.25806 4.26719C6.01799 4.11186 6.61186 3.51799 6.76719 2.75806Z" fill="white"/>
  </svg>
);

// Job Table Header Component
export const JobTableHeader = ({ 
  isAutoApplyMode = false, 
  onSelectAll = null, 
  isAllSelected = false, 
  remainingApplications = 0,
  totalJobs = 0
}) => {
  if (!isAutoApplyMode) return null;
  
  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll();
    }
  };
  
  return (
    <div className="job-table-header">
      <div className="job-table-header-cell checkbox">
        <Checkbox 
          checked={isAllSelected}
          onChange={handleSelectAll}
          title={`Select all jobs (up to ${remainingApplications} remaining applications)`}
          data-walkthrough="select-all-checkbox"
        />
      </div>
      <div className="job-table-header-cell role">Role</div>
      <div className="job-table-header-cell time">Time</div>
      <div className="job-table-header-cell location">Location</div>
      <div className="job-table-header-cell salary">Salary Range</div>
      <div className="job-table-header-cell matching-action">
        <div className="matching-section">Matching Rate</div>
        <div className="action-section">Application Preview</div>
      </div>
    </div>
  );
};

const JobCard = ({
  job,
  onApply,
  onViewDetails,
  onSelect,
  onPreview,
  isSelected = false,
  isLocked = false,
  showCheckbox = false,
  showPreviewButton = false,
  isAutoApplyMode = false,
  platformName = '',
  className = '',
  showApplicationStatus = false,
  isTriggerCard = false, // New prop to highlight the 75th card
  ...props
}) => {
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [isViewLoading, setIsViewLoading] = useState(false);
  
  const {
    company,
    role,
    location,
    salary,
    matchingRate,
    timePosted,
    employmentType,
    logo: LogoComponent,
    url,
    applicationStatus,
    _id: jobId,
    jobBoard,
    companyInfo,
    
  } = job || {};




  // Extract jobBoard from premium job ID if needed
  const getJobBoard = () => {
    if (jobBoard || job.jobBoard) {
      return jobBoard || job.jobBoard;
    }
    
    // For premium jobs, extract platform from ID (e.g., "prem-greenhouse-1" -> "greenhouse")
    if (jobId && jobId.startsWith('prem-')) {
      const parts = jobId.split('-');
      if (parts.length >= 2) {
        return parts[1]; // Return the platform name from the ID
      }
    }
    
    // Fallback to platformName prop
    return platformName;
  };

  // Check if platform supports auto-apply
  const supportsAutoApply = () => {
    const platform = getJobBoard().toLowerCase();
    return ['greenhouse', 'ashby', 'workday'].includes(platform);
  };

  const getJobId = () => {
    return jobId || job._id || job.id;
  };

  const handleApply = (e) => {
    e.stopPropagation();
    
    // If platform supports auto-apply, redirect to auto-apply page
    if (supportsAutoApply()) {
      if (onApply) {
        onApply(job);
      }
    } else {
      // For platforms without auto-apply, open external link
      if (url) {
        window.open(url, '_blank');
      }
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    
    if (applicationStatus === "Success") {
      return;
    }
    
    if (onViewDetails) {
      onViewDetails(job);
    }
  };

  const handleCardClick = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // In auto-apply mode: handle selection
    if (isAutoApplyMode && onSelect) {
      onSelect(job);
    }
    // In search agent mode: handle job details
    else if (!isAutoApplyMode && onViewDetails) {
      onViewDetails(job);
    }
  };

  const handlePreview = async (previewData = null, viewOnly = false) => {
    if (onPreview) {
      setIsViewLoading(true);
      try {
        // Pass the job ID and preview data in the format JobPortalPage expects
        const jobId = getJobId();
        await onPreview(jobId, previewData, viewOnly);
      } finally {
        setIsViewLoading(false);
      }
    }
  };


  return (
    <div 
      className={`job-card ${className} ${isSelected ? 'job-card-selected' : ''} ${isLocked ? 'job-card-locked' : ''} ${isAutoApplyMode ? 'auto-apply-mode' : ''} `}
      onClick={handleCardClick}
      data-job-card="true"
    >
      {/* Checkbox for Auto Apply Mode */}
      {isAutoApplyMode && (
        <div className="job-card-checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              // Don't call e.stopPropagation() since the Checkbox component passes a custom event object
              if (onSelect) {
                onSelect(job);
              }
            }}
            disabled={isLocked}
            className="job-checkbox"
            title="Select this job for auto apply"
          />
        </div>
      )}

      {/* Recent Label */}
      {isJobRecent(job) && (
        <div className="job-card-recent-label font-extrabold">
          Recent
        </div>
      )}
      

      {/* Column 1: Logo + Job Info */}
      <div className="job-card-logo-info">
                 <div className="job-card-logo">
           {LogoComponent && typeof LogoComponent === 'function' ? (
             <div className="dual-logo-container">
               <LogoComponent className="company-logo-icon" />
             </div>

) : LogoComponent && typeof LogoComponent === 'string' ? (
                         <div className="dual-logo-container">
               <img
                 src={LogoComponent}
                 alt={`${company || 'Company'} logo`}
                 className="company-logo-image"
                 onError={() => setLogoLoadError(true)}
               />
               {logoLoadError && (
                 <div className="secondary-logo">
                   {company?.charAt(0)?.toUpperCase() || '?'}
                 </div>
               )}
             </div>
                     ) : companyInfo?.logo ? (
             <div className="dual-logo-container">
               <img
                 src={companyInfo.logo}
                 alt={`${company || 'Company'} logo`}
                 className="company-logo-image"
                 onError={() => setLogoLoadError(true)}
               />
               {logoLoadError && (
                 <div className="secondary-logo">
                   {company?.charAt(0)?.toUpperCase() || '?'}
                 </div>
               )}
             </div>
          ) : (
            <div className="company-logo-fallback">
              {company?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        
        <div 
          className="job-card-info"
          data-time={getFormattedTime(job, timePosted)}
        >
          <h3 className="job-title">{role || ''}</h3>
          <p className="job-company">{company || ''}</p>
        </div>
      </div>

      {/* Column 2: Time Posted */}
      <div className="job-card-time">
        <Clock className="job-icon text-black" size={16} />
        <span className="">
          {getFormattedTime(job, timePosted)}
        </span>
      </div>
      
      {/* Column 3: Location */}
      <div className="job-card-location">
        <div className="location-info">
          <div className="location-line">
            <Location className="job-icon" size={16} />
            <span className="location-text">{formatLocation(location) || 'Remote'}</span>
          </div>
         <span className="employment-type pl-6">{employmentType || 'Full Time'}</span>
        </div>
      </div>
      
             {/* Column 4: Salary */}
       <div className="job-card-salary">
         <DollarCircle className="job-icon" size={16} style={{color: 'black'}}/>
                   <span style={{color: 'black'}}>
                     {salary && salary.min && salary.max ? 
                       `$${Math.round(salary.min/1000)}k-$${Math.round(salary.max/1000)}k` : 
                       salary && salary.min ? 
                       `$${Math.round(salary.min/1000)}k` : 
                       'Competitive'
                     }
                   </span>
       </div>

      {/* Column 5: Match Badge, Apply/Preview Button, Arrow */}
      <div className="job-card-actions">
        <div className="job-card-match">
          {showApplicationStatus && applicationStatus ? (
            getApplicationStatusBadge(applicationStatus)
          ) : (
            <span className={`match-badge bg-green-100 text-green-800 border-green-100`}>
              High Match
            </span>
          )}
        </div>
        
        <div className="job-card-apply">
          {isAutoApplyMode ? (
            /* Preview Button for Auto Apply Mode */
            <div onClick={(e) => e.stopPropagation()}>
              <PreviewButton
                jobId={getJobId()}
                jobBoard={getJobBoard()}
                onClick={handlePreview}
                disabled={isLocked}
              />
            </div>
          ) : showPreviewButton ? (
            /* View Button for Applications Mode */
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlePreview();
              }}
              disabled={isLocked || isViewLoading}
              className="apply-button"
              style={{backgroundColor: 'white', color: 'var(--primary-color)', border: '1px solid var(--primary-color)',fontWeight:'bold', padding:'4px 15px'}}
              title="View application preview"
            >
              {isViewLoading ? (
                <svg className="apply-icon w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <Eye className="apply-icon" size={16} />
              )}
              {isViewLoading ? 'Loading...' : 'View'}
            </button>
          ) : (
            /* Apply Button for Regular Mode */
            <button
              onClick={handleApply}
              disabled={isLocked}
              className={`apply-button ${isLocked ? 'apply-button-disabled' : ''} ${!supportsAutoApply() ? 'apply-button-external' : ''}`}
              title={supportsAutoApply() ? "Apply for this job" : "Open job posting"}
            >
              {supportsAutoApply() ? (
                <ApplyIcon className="apply-icon" size={20} />
              ) : (
                <ExportSquare className="apply-icon" size={16} />
              )}
              {supportsAutoApply() ? 'Apply' : 'Apply'}
            </button>
          )}
        </div>
        
        <div className="job-card-arrow" onClick={(e) => {
          e.stopPropagation();
          handleViewDetails(e);
        }}>
          <ArrowRight2 className="arrow-icon" size={20} />
        </div>
      </div>
    </div>
  );
};

export default JobCard; 