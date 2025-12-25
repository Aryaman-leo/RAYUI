import React from 'react';
import './PlatformCard.css';

const PlatformCard = ({ platform, jobCount, totalJobs, onClick, isLoading = false, loadingDelay = 0, isComingSoon = false }) => {
  const formatNumber = (numStr) => {
    const num = parseInt(numStr.replace(/,/g, ''), 10);
    if (isNaN(num)) return numStr;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return Math.round(num / 1000) + 'K';
    }
    return num;
  };

  // const formattedTotalJobs = formatNumber(totalJobs);
  // For static cards (jobCount === 0 and not coming soon), we don't want to show "no matches" state
  const hasNoMatches = jobCount === 0 && !isComingSoon && isLoading; // Only show no matches when actually loading

  // If it's coming soon, render the coming soon card
  if (isComingSoon) {
    return (
      <div
        className="platform-card coming-soon relative overflow-hidden group bg-white bg-opacity-90 cursor-not-allowed"
        tabIndex={-1}
        aria-disabled="true"
      >
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/50 opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-2 -left-2 w-4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 z-20"></div>
        {/* Coming Soon badge */}
        <div className="absolute top-2 left-2 z-30">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg coming-soon-flash">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C9.79 2 8 3.79 8 6v4H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-2V6c0-2.21-1.79-4-4-4zm-2 4c0-1.1.9-2 2-2s2 .9 2 2v4h-4V6zm8 6v8H6v-8h12z" />
            </svg>
            Coming Soon
          </span>
        </div>
        <div className="relative z-20 bg-gradient-to-b from-white to-white opacity-90 transition-all duration-300 rounded-xl flex flex-col items-center justify-center h-full p-4">
          <div className="flex items-center justify-center mb-3 text-2xl text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
            {platform.icon}
          </div>
          <p className="platform-name font-semibold text-gray-900 text-center text-base group-hover:text-indigo-800 transition-colors duration-300">
            {platform.name}
          </p>
        </div>
        {/* Pulse ring effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-blue-400 rounded-full opacity-30 animate-ping z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-purple-400 rounded-full opacity-20 animate-ping animation-delay-200 z-10"></div>
      </div>
    );
  }

  return (
    <div
      className={`platform-card relative hover:shadow-lg transition-all duration-200 hover:scale-101 ${
        isLoading ? 'platform-card-loading' : 'cursor-pointer'
      } ${hasNoMatches ? 'no-matches' : ''}`}
      onClick={() => !isLoading && onClick(platform)}
      style={{
        animationDelay: isLoading ? `${loadingDelay}ms` : '0ms'
      }}
      data-walkthrough="platform-card"
    >
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="platform-icon-loading"></div>
        ) : hasNoMatches ? (
          <div className="plane-loading-container">
            <div className="plane-loading-placeholder">Searching...</div>
          </div>
        ) : (
          platform.icon
        )}
      </div>
      <div>
      <p className="platform-name pb-0 font-semibold text-gray-800">
        {platform.name}
      </p>

      {/* <p className="text-sm text-gray-500">{formatNumber(jobCount)} jobs available</p> */}
      <p className="text-sm font-semibold text-gray-500">{formatNumber(totalJobs)} jobs</p>
     
      </div>
     
    </div>
  );
};

export default PlatformCard; 

