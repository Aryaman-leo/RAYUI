import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown2, Filter } from 'iconsax-reactjs';
import Checkbox from './Checkbox';
import { extractFilterOptions, getQuickAccessFilters, getFilterLabels, mergeFilterOptions } from '../../utils/filterConfig';
import UserService from '../../services/user.service';
import UserPreferenceService from '../../services/user-preference.service';
import { VISA_OPTIONS } from '../../utils/constants';
import { ROLE_GROUPS } from '../../utils/jobPreferences';
import './JobFilters.css';

const JobFilters = ({ filters = {}, onFilterChange, onApplyFilters, onOpenAllFilters, className = '', jobData = [], platform = null, disabled = false }) => {
  // Validation for required props
  if (!onFilterChange || typeof onFilterChange !== 'function') {
    console.error('JobFilters: onFilterChange is required and must be a function');
    return null;
  }

  if (!onApplyFilters || typeof onApplyFilters !== 'function') {
    console.error('JobFilters: onApplyFilters is required and must be a function');
    return null;
  }

  if (!onOpenAllFilters || typeof onOpenAllFilters !== 'function') {
    console.error('JobFilters: onOpenAllFilters is required and must be a function');
    return null;
  }

  // Validate filters prop
  if (!filters || typeof filters !== 'object') {
    console.warn('JobFilters: filters prop should be an object, using empty object as fallback');
    filters = {};
  }

  // Validate jobData prop
  if (!Array.isArray(jobData)) {
    console.warn('JobFilters: jobData prop should be an array, using empty array as fallback');
    jobData = [];
  }

  // Validate platform prop
  if (platform && typeof platform !== 'string') {
    console.warn('JobFilters: platform prop should be a string');
    platform = null;
  }

  // Validate disabled prop
  if (typeof disabled !== 'boolean') {
    console.warn('JobFilters: disabled prop should be a boolean, using false as fallback');
    disabled = false;
  }
  // Categorize roles for backend format using exact ROLE_GROUPS matching
  const categorizeRoles = (roles) => {
    const categories = {};

    roles.forEach(role => {
      let categorized = false;
      
      // Check each group in ROLE_GROUPS for exact matches
      for (const group of ROLE_GROUPS) {
        if (group.roles.includes(role)) {
          if (!categories[group.heading]) {
            categories[group.heading] = [];
          }
          categories[group.heading].push(role);
          categorized = true;
          break;
        }
      }
      
      // If not found in any predefined category, add to "Other"
      if (!categorized) {
        if (!categories["Other"]) {
          categories["Other"] = [];
        }
        categories["Other"].push(role);
      }
    });

    return categories;
  };

  // Local state to store user preferences without applying them immediately
  const [userPreferences, setUserPreferences] = useState({
    seniority: [],
    employmentStatuses: [],
    workMode: [],
    datePosted: 'any_time'
  });
  
  // State to store available filter options from job response
  const [availableFilterOptions, setAvailableFilterOptions] = useState({});
  
  // Get filter options from centralized config and merge with available options from job response
  const baseFilterOptions = extractFilterOptions(jobData); // Use jobData to get consistent filter options
  const filterOptions = mergeFilterOptions(baseFilterOptions, availableFilterOptions);
  const quickAccessFilters = getQuickAccessFilters();
  const filterLabels = getFilterLabels();
  
  // Validate filter configuration
  if (!filterOptions || typeof filterOptions !== 'object') {
    console.error('JobFilters: Invalid filterOptions configuration');
    return null;
  }
  
  if (!quickAccessFilters || !Array.isArray(quickAccessFilters)) {
    console.error('JobFilters: Invalid quickAccessFilters configuration');
    return null;
  }
  
  if (!filterLabels || typeof filterLabels !== 'object') {
    console.error('JobFilters: Invalid filterLabels configuration');
    return null;
  }
  
  // Only show quick access filters in the top bar
  const filterKeys = quickAccessFilters;
  
  // Load platform-specific preferences when component mounts
  React.useEffect(() => {
    const loadPlatformPreferences = async () => {
      if (!platform) {
        console.log('🔍 JobFilters: No platform specified, using default filters');
        return;
      }

      try {
        console.log('🔍 JobFilters: Loading platform-specific preferences for:', platform);
        
        // Fetch fresh platform-specific preferences directly
        const UserPreferenceService = (await import('../../services/user-preference.service')).default;
        const platformPreferencesResponse = await UserPreferenceService.getPreferencesForPlatform(platform);
        
        console.log('🔍 JobFilters: Platform preferences response:', {
          platform,
          success: platformPreferencesResponse.success,
          hasData: !!platformPreferencesResponse.data,
          dataKeys: platformPreferencesResponse.data ? Object.keys(platformPreferencesResponse.data) : null
        });
        
        if (platformPreferencesResponse.success && platformPreferencesResponse.data) {
          console.log('🔍 JobFilters: Found platform preferences:', platformPreferencesResponse.data);
          
          const platformPrefs = platformPreferencesResponse.data;
          
          // Handle desired_roles - convert from categorized object to flat array if needed
          let normalizedDesiredRoles = [];
          if (platformPrefs.desired_roles) {
            if (Array.isArray(platformPrefs.desired_roles)) {
              normalizedDesiredRoles = platformPrefs.desired_roles;
            } else if (
              typeof platformPrefs.desired_roles === "object" &&
              platformPrefs.desired_roles !== null
            ) {
              normalizedDesiredRoles = Object.values(platformPrefs.desired_roles).flat();
            }
          }

          // Map work authorization status
          const incomingVisaStatus = String(platformPrefs.work_authorization_status || "");
          const matchedVisaOption = VISA_OPTIONS.find(
            (option) =>
              option.label.toLowerCase() === incomingVisaStatus.toLowerCase() ||
              option.value.toLowerCase() === incomingVisaStatus.toLowerCase()
          );
          const mappedVisaSponsorship = matchedVisaOption ? matchedVisaOption.value : "";

          const platformUserPrefs = {
            seniority: platformPrefs.experience_levels || [],
            employmentStatuses: platformPrefs.employment_type || [],
            workMode: platformPrefs.remote_preference || [],
            datePosted: platformPrefs.date_posted_filter || 'any_time'
          };

          console.log('🔍 JobFilters: Setting platform preferences:', platformUserPrefs);
          setUserPreferences(platformUserPrefs);
          
          console.log('🔍 JobFilters: Platform preferences loaded successfully');
          console.log('🔍 JobFilters: Final platformUserPrefs being set:', platformUserPrefs);
          console.log('🔍 JobFilters: Normalized desired_roles:', normalizedDesiredRoles);
          
          return; // Exit early since we found platform preferences
        }
        
        // If no platform preferences found, use default filters
        console.log('🔍 JobFilters: No platform preferences found, using default filters');
        const defaultPrefs = {
          seniority: [],
          employmentStatuses: [],
          workMode: [],
          datePosted: 'any_time'
        };
        setUserPreferences(defaultPrefs);
        
      } catch (error) {
        console.error('❌ JobFilters: Error loading platform preferences:', error);
        // Use default filters if error occurs
        const defaultPrefs = {
          seniority: [],
          employmentStatuses: [],
          workMode: [],
          datePosted: 'any_time'
        };
        setUserPreferences(defaultPrefs);
      }
    };

    loadPlatformPreferences();
  }, [platform]); // Run when platform changes

  // Helper function to load user data from props (fallback)
  const loadUserDataFromProps = (userData) => {
    console.log('🔍 JobFilters: Using user data from props:', userData);
    console.log('🔍 JobFilters: Pre-selecting filters from userData:', {
      experience_levels: userData.experience_levels,
      employment_type: userData.employment_type,
      remote_preference: userData.remote_preference,
      date_posted_filter: userData.date_posted_filter,
      desired_roles: userData.desired_roles,
      desired_technologies: userData.desired_technologies,
      preferred_locations: userData.preferred_locations
    });
    console.log('🔍 JobFilters: userData keys:', Object.keys(userData || {}));

    // Handle desired_roles - convert from categorized object to flat array if needed
    let normalizedDesiredRoles = [];
    if (userData.desired_roles) {
      if (Array.isArray(userData.desired_roles)) {
        // Already a flat array
        normalizedDesiredRoles = userData.desired_roles;
      } else if (
        typeof userData.desired_roles === "object" &&
        userData.desired_roles !== null
      ) {
        // Categorized object - flatten it
        normalizedDesiredRoles = Object.values(userData.desired_roles).flat();
      }
    }

    // Map work authorization status
    const incomingVisaStatus = String(userData.work_authorization_status || "");
    const matchedVisaOption = VISA_OPTIONS.find(
      (option) =>
        option.label.toLowerCase() === incomingVisaStatus.toLowerCase() ||
        option.value.toLowerCase() === incomingVisaStatus.toLowerCase()
    );
    const mappedVisaSponsorship = matchedVisaOption ? matchedVisaOption.value : "";

    const userPrefs = {
      seniority: userData.experience_levels || [],
      employmentStatuses: userData.employment_type || [],
      workMode: userData.remote_preference || [],
      datePosted: userData.date_posted_filter || 'any_time'
    };

    console.log('🔍 JobFilters: Setting user preferences from props:', userPrefs);
    setUserPreferences(userPrefs);

    // Force update temp selections with current filters state (same as FilterSidebar)
    const currentSelectedFilters = getSelectedFilters();
    setTempSelections(currentSelectedFilters);
  };

  // Don't fallback to userData - let preferences context handle all preference loading

  // Update tempSelections when filters prop, userData, or userPreferences changes
  React.useEffect(() => {
    const currentSelectedFilters = getSelectedFilters();
    setTempSelections(currentSelectedFilters);
  }, [filters, jobData, userPreferences]); // Run when filters prop, jobData, or userPreferences changes

  // Listen for filtersRepopulated event to update filters when matchJobs API returns
  React.useEffect(() => {
    const handleFiltersRepopulated = (event) => {
      console.log('🔄 JobFilters: Filters repopulated event received:', event.detail);
      
      if (event.detail && event.detail.filters) {
        const repopulatedFilters = event.detail.filters;
        
        // Update available filter options with data from the response
        const newAvailableOptions = {
          seniority: repopulatedFilters.availableSeniority || [],
          employmentStatuses: repopulatedFilters.availableEmploymentTypes || [],
          locations: repopulatedFilters.availableLocations || [],
          skills: repopulatedFilters.availableSkills || [],
          companies: repopulatedFilters.availableCompanies || []
        };
        
        setAvailableFilterOptions(newAvailableOptions);
        
        // Update user preferences with the repopulated data
        const updatedUserPrefs = {
          seniority: repopulatedFilters.seniority || [],
          employmentStatuses: repopulatedFilters.employmentStatuses || [],
          workMode: repopulatedFilters.workMode || [],
          datePosted: repopulatedFilters.datePosted || 'any_time'
        };
        
        setUserPreferences(updatedUserPrefs);
        
        // Update temp selections with the repopulated filters directly
        const updatedTempSelections = {};
        quickAccessFilters.forEach(key => {
          if (key === 'datePosted') {
            updatedTempSelections[key] = repopulatedFilters.datePosted || 'any_time';
          } else if (key === 'seniority') {
            updatedTempSelections[key] = repopulatedFilters.seniority || [];
          } else if (key === 'employmentStatuses') {
            updatedTempSelections[key] = repopulatedFilters.employmentStatuses || [];
          } else if (key === 'workMode') {
            updatedTempSelections[key] = repopulatedFilters.workMode || [];
          } else {
            updatedTempSelections[key] = Array.isArray(repopulatedFilters[key]) ? [...repopulatedFilters[key]] : [];
          }
        });
        
        setTempSelections(updatedTempSelections);
        
        console.log('✅ JobFilters: Filters and available options updated with repopulated data');
      }
    };

    // Add event listener
    window.addEventListener('filtersRepopulated', handleFiltersRepopulated);

    // Cleanup
    return () => {
      window.removeEventListener('filtersRepopulated', handleFiltersRepopulated);
    };
  }, []);

  
  // Check if any non-quick-access filters are active
  const hasNonQuickAccessFilters = () => {
    const nonQuickAccessFilters = ['visaSponsorship', 'jobTitles', 'locations', 'skills'];
    const hasFilters = nonQuickAccessFilters.some(filterKey => {
      const filterValue = filters[filterKey];
      if (Array.isArray(filterValue)) {
        return filterValue.length > 0;
      }
      return filterValue && filterValue !== 'any' && filterValue !== 'all' && (filterKey !== 'datePosted' || filterValue !== 'any_time');
    });
    return hasFilters;
  };


  // Temporary selection state for the open dropdown
  const [tempSelections, setTempSelections] = useState(() => {
    // Initialize with undefined to indicate no temp selections yet
    const initialSelections = {};
    quickAccessFilters.forEach(key => {
      initialSelections[key] = undefined;
    });
    return initialSelections;
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);



  // Get current selected filters - use userPreferences state when available, otherwise fallback to userData
  const getSelectedFilters = () => {
    const selectedFilters = {};
    quickAccessFilters.forEach(key => {
      if (key === 'datePosted') {
        // datePosted: Use userPreferences state if available, otherwise filters prop, otherwise jobData
        selectedFilters[key] = userPreferences.datePosted || filters[key] || jobData?.date_posted_filter || 'any_time';
      } else if (key === 'seniority') {
        // seniority: Use userPreferences state if available, otherwise jobData.experience_levels
        selectedFilters[key] = userPreferences.seniority.length > 0 ? userPreferences.seniority : (jobData?.experience_levels || []);
      } else if (key === 'employmentStatuses') {
        // employmentStatuses: Use userPreferences state if available, otherwise jobData.employment_type
        selectedFilters[key] = userPreferences.employmentStatuses.length > 0 ? userPreferences.employmentStatuses : (jobData?.employment_type || []);
      } else if (key === 'workMode') {
        // workMode: Use userPreferences state if available, otherwise jobData.remote_preference
        selectedFilters[key] = userPreferences.workMode.length > 0 ? userPreferences.workMode : (jobData?.remote_preference || []);
      } else if (key === 'jobTitles') {
        // jobTitles: Use jobData.desired_roles (normalized)
        let normalizedDesiredRoles = [];
        if (jobData?.desired_roles) {
          if (Array.isArray(jobData.desired_roles)) {
            // Already a flat array
            normalizedDesiredRoles = jobData.desired_roles;
          } else if (
            typeof jobData.desired_roles === "object" &&
            jobData.desired_roles !== null
          ) {
            // Categorized object - flatten it
            normalizedDesiredRoles = Object.values(jobData.desired_roles).flat();
          }
        }
        selectedFilters[key] = normalizedDesiredRoles;
      } else {
        // Other filters: Use filters prop as fallback
        if (Array.isArray(filters[key])) {
          selectedFilters[key] = filters[key];
        } else if (filters[key] && filters[key] !== 'any' && filters[key] !== 'all') {
          selectedFilters[key] = [filters[key]];
        } else {
          selectedFilters[key] = [];
        }
      }
    });
    

    return selectedFilters;
  };

  // Check if temp selections have changed from current applied filters
  const hasChanges = (filterKey) => {
    if (!filterKey || typeof filterKey !== 'string') {
      console.warn('JobFilters: Invalid filterKey provided to hasChanges:', filterKey);
      return false;
    }
    
    if (!activeDropdown || activeDropdown !== filterKey) return false;
    
    const currentSelectedFilters = getSelectedFilters();
    const currentSelections = currentSelectedFilters[filterKey];
    const tempSelectionsForFilter = tempSelections[filterKey];
    
    // If tempSelections is undefined, no changes
    if (tempSelectionsForFilter === undefined) {
      return false;
    }
    
    // Handle datePosted as string, others as arrays
    if (filterKey === 'datePosted') {
      return currentSelections !== tempSelectionsForFilter;
    } else {
      // Handle arrays for other filters
      const currentArr = Array.isArray(currentSelections) ? currentSelections : [];
      const tempArr = Array.isArray(tempSelectionsForFilter) ? tempSelectionsForFilter : [];
      
      if (currentArr.length !== tempArr.length) return true;
      
      // Check if any values are different
      return !currentArr.every(value => tempArr.includes(value)) ||
             !tempArr.every(value => currentArr.includes(value));
    }
  };

  // Get display label for current filter value
  const getFilterLabel = (filterKey) => {
    if (!filterKey || typeof filterKey !== 'string') {
      console.warn('JobFilters: Invalid filterKey provided to getFilterLabel:', filterKey);
      return 'Unknown Filter';
    }
    return filterLabels[filterKey] || filterKey;
  };

  // Open dropdown and initialize temp selection from main selection
  const toggleDropdown = (filterKey) => {
    if (!filterKey || typeof filterKey !== 'string') {
      console.warn('JobFilters: Invalid filterKey provided to toggleDropdown:', filterKey);
      return;
    }
    
    if (!filterOptions[filterKey]) {
      console.warn('JobFilters: Filter key not found in filterOptions:', filterKey);
      return;
    }
    
    if (activeDropdown === filterKey) {
      setActiveDropdown(null);
      // Reset temp selections when closing dropdown
      setTempSelections((prev) => ({ ...prev, [filterKey]: undefined }));
    } else {
      setActiveDropdown(filterKey);
      const currentSelectedFilters = getSelectedFilters();
      // Always initialize with current original values when opening dropdown
      setTempSelections((prev) => ({
        ...prev,
        [filterKey]: filterKey === 'datePosted' 
          ? currentSelectedFilters[filterKey] 
          : [...(currentSelectedFilters[filterKey] || [])]
      }));
    }
  };

  // Handle checkbox change in temp selection
  const handleCheckboxChange = (filterKey, value, event) => {
    if (!filterKey || typeof filterKey !== 'string') {
      console.warn('JobFilters: Invalid filterKey provided to handleCheckboxChange:', filterKey);
      return;
    }
    
    if (!value || typeof value !== 'string') {
      console.warn('JobFilters: Invalid value provided to handleCheckboxChange:', value);
      return;
    }
    
    if (!event || !event.target) {
      console.warn('JobFilters: Invalid event provided to handleCheckboxChange:', event);
      return;
    }
    
    const checked = event.target.checked;
    setTempSelections((prev) => {
      const prevArr = prev[filterKey] || [];
      const newArr = checked
        ? [...prevArr, value]
        : prevArr.filter((item) => item !== value);
      return { ...prev, [filterKey]: newArr };
    });
  };

  // Reset and immediately apply the filter
  const resetSpecificFilter = (filterKey) => {
    if (!filterKey || typeof filterKey !== 'string') {
      console.warn('JobFilters: Invalid filterKey provided to resetSpecificFilter:', filterKey);
      return;
    }
    
    if (!filterOptions[filterKey]) {
      console.warn('JobFilters: Filter key not found in filterOptions:', filterKey);
      return;
    }
    
    // Reset tempSelections based on filter type
    if (filterKey === 'datePosted') {
      setTempSelections((prev) => ({ ...prev, [filterKey]: 'any_time' }));
    } else {
      setTempSelections((prev) => ({ ...prev, [filterKey]: [] }));
    }
    
    // Don't call onFilterChange to avoid API calls - only reset local state
  };

  // Sync filters to user profile
  const syncFiltersToProfile = async (filtersToSync) => {
    try {
      // Include ALL current filter values, matching FilterSidebar exactly
      const profileUpdate = {
        // Quick filters
        experience_levels: filtersToSync.seniority || [],
        employment_type: filtersToSync.employmentStatuses || [],
        remote_preference: filtersToSync.workMode || [],
        date_posted_filter: filtersToSync.datePosted || 'any_time',
        
        // Job titles - convert from flat array to categorized structure
        desired_roles: filtersToSync.jobTitles ? (() => {
          const result = categorizeRoles(filtersToSync.jobTitles);
          console.log('JobFilters: jobTitles to categorize:', filtersToSync.jobTitles);
          console.log('JobFilters: categorized result:', result);
          return result;
        })() : (jobData?.desired_roles || []),
        
        // All other filters - use jobData to preserve existing values
        desired_technologies: jobData?.desired_technologies || [],
        preferred_locations: jobData?.preferred_locations || [],
        work_authorization_status: jobData?.work_authorization_status || ""
      };
      
      // Use direct API call for platform-specific preference update
      console.log('JobFilters: Final profileUpdate being sent:', profileUpdate);
      console.log('JobFilters: platform value:', platform);
      if (platform) {
        console.log(`🔄 JobFilters: Using direct API call for platform: ${platform}`);
        await UserPreferenceService.updatePreferencesAndRepopulateFilters(platform, profileUpdate);
      } else {
        console.log(`🔄 JobFilters: Using legacy UserService for filter updates (no platform context)`);
        await UserService.updateUserData(profileUpdate);
      }
      console.log('✅ All filters synced to user profile:', profileUpdate);
    } catch (error) {
      console.error('❌ Failed to sync filters to profile:', error);
    }
  };

      // Show results: apply filters directly without syncing to preferences
    const showResults = async () => {
      if (!activeDropdown) {
        console.warn('JobFilters: No active dropdown when trying to show results');
        return;
      }
      
      if (!filterOptions[activeDropdown]) {
        console.warn('JobFilters: Active dropdown not found in filterOptions:', activeDropdown);
        return;
      }
      
      // Validate that at least one option is selected for checkbox-based filters
      const currentSelections = tempSelections[activeDropdown];
      console.log('🔍 showResults validation:', {
        activeDropdown,
        currentSelections,
        isDatePosted: activeDropdown === 'datePosted',
        hasSelections: currentSelections && currentSelections.length > 0
      });
      
      if (activeDropdown !== 'datePosted') {
        if (!currentSelections || currentSelections.length === 0) {
          console.warn('JobFilters: At least one option must be selected for', activeDropdown);
          return;
        }
      } else {
        if (!currentSelections) {
          console.warn('JobFilters: Date posted option must be selected');
          return;
        }
      }
      
      const currentSelectedFilters = getSelectedFilters();
      const newFilters = { ...currentSelectedFilters, [activeDropdown]: tempSelections[activeDropdown] };
      
      // Convert to legacy filter format for compatibility
      const legacyFilters = { ...filters };
      quickAccessFilters.forEach((key) => {
        if (key === 'datePosted') {
          // datePosted should be a single string value, not an array
          legacyFilters[key] = newFilters[key] || 'any_time';
        } else {
          legacyFilters[key] = newFilters[key].length > 0 ? newFilters[key] : 'any';
        }
      });
    
    try {
      // Apply filters directly without syncing to preferences
      if (onFilterChange) onFilterChange(legacyFilters);
      if (onApplyFilters) onApplyFilters(legacyFilters);
      
      setActiveDropdown(null);
      setTempSelections((prev) => ({ ...prev, [activeDropdown]: undefined }));
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  // Close dropdown and reset temp selection if not applied
  const handleClickOutside = React.useCallback((e) => {
    // Early return if no dropdown is active
    if (!activeDropdown) return;
    
    // Don't close if clicking inside the dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
      return;
    }
    
    // Don't close if clicking on filter buttons or checkbox elements
    const target = e.target;
    if (target.closest('.filter-button') || 
        target.closest('.filter-options') || 
        target.closest('.filter-option-checkbox') || 
        target.closest('.checkbox-container') ||
        target.closest('.checkmark')) {
      return;
    }
    
    // Close dropdown if clicking outside
    setActiveDropdown(null);
    setTempSelections((prev) => ({ ...prev, [activeDropdown]: undefined }));
  }, [activeDropdown]);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Validate filterKeys before rendering
  if (!filterKeys || !Array.isArray(filterKeys) || filterKeys.length === 0) {
    console.error('JobFilters: No valid filter keys to render');
    return <div className={`job-filters ${className}`}>No filters available</div>;
  }

  return (
    <div className={`job-filters ${className}`} data-walkthrough="job-filters">
      {filterKeys.map((filterKey) => {
        // Validate each filterKey before rendering
        if (!filterKey || typeof filterKey !== 'string') {
          console.warn('JobFilters: Invalid filterKey in filterKeys array:', filterKey);
          return null;
        }
        
        if (!filterOptions[filterKey]) {
          console.warn('JobFilters: Filter options not found for key:', filterKey);
          return null;
        }
        
        return (
        <div className={`filter-dropdown ${activeDropdown === filterKey ? 'active' : ''}`} key={filterKey}>
          <button
            className={`filter-button ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && toggleDropdown(filterKey)}
            disabled={disabled}
          >
            <span className='px-2'>{getFilterLabel(filterKey)}</span>
            <ArrowDown2 size={16} className="filter-icon" />
            {(() => {
              const selectedValue = getSelectedFilters()[filterKey];
              const hasValue = filterKey === 'datePosted' 
                ? selectedValue && selectedValue !== 'any_time'
                : Array.isArray(selectedValue) && selectedValue.length > 0;
              return hasValue && (
                <div className="selection-indicator">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
              );
            })()}
          </button>
          <div
            className="filter-options"
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
          >
              {filterKey === 'datePosted' ? (
                // Use radio buttons for datePosted
                filterOptions[filterKey].map((option, index) => (
                  <div 
                    key={option.value} 
                    className={`filter-option-radio ${option.disabled ? 'disabled' : ''}`}
                    style={{ '--animation-index': index }}
                    onClick={(e) => {
                      console.log('🔍 Radio button clicked:', { filterKey, optionValue: option.value });
                      e.stopPropagation();
                      if (!option.disabled) {
                        setTempSelections((prev) => ({ ...prev, [filterKey]: option.value }));
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name={`datePosted-${activeDropdown}`}
                      value={option.value}
                      checked={(tempSelections[filterKey] || 'any_time') === option.value}
                      disabled={option.disabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (!option.disabled) {
                          setTempSelections((prev) => ({ ...prev, [filterKey]: option.value }));
                        }
                      }}
                    />
                    <span className={option.disabled ? 'disabled' : ''}>{option.label}</span>
                  </div>
                ))
              ) : (
                // Use checkboxes for other filters
                filterOptions[filterKey].map((option, index) => (
                  <div 
                    key={option.value} 
                    className="filter-option-checkbox"
                    style={{ '--animation-index': index }}
                  >
                    <Checkbox
                      checked={(() => {
                        const currentSelections = tempSelections[filterKey] || [];
                        return Array.isArray(currentSelections) && currentSelections.includes(option.value);
                      })()}
                      onChange={(event) => {
                        event.stopPropagation();
                        handleCheckboxChange(filterKey, option.value, event);
                      }}
                    />
                    <span>{option.label}</span>
                  </div>
                ))
              )}
              <div className="filter-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetSpecificFilter(filterKey);
                  }}
                  className="reset-button"
                >
                  Reset
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    showResults();
                  }}
                  className="show-results-button"
                  disabled={(() => {
                    // For checkbox filters, check if at least one option is selected
                    if (filterKey !== 'datePosted') {
                      const currentSelections = tempSelections[filterKey];
                      const noSelections = !currentSelections || currentSelections.length === 0;
                      console.log('🔍 Button disabled check:', {
                        filterKey,
                        currentSelections,
                        noSelections
                      });
                      if (noSelections) {
                        return true; // Disable if no selections
                      }
                    } else {
                      // For datePosted, check if there's a valid selection
                      const currentSelection = tempSelections[filterKey];
                      if (!currentSelection) {
                        return true; // Disable if no selection
                      }
                    }
                    
                    // For all filters, check if there are changes
                    const hasChangesResult = hasChanges(filterKey);
                    console.log('🔍 hasChanges result:', { filterKey, hasChangesResult });
                    return !hasChangesResult;
                  })()}
                >
                  Show results
                </button>
              </div>
            </div>
        </div>
      )})}
      {/* Divider */}
      <div className="filter-divider"></div>
      {/* All Filters Button */}
      <button 
        className={`filter-button all-filters ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? () => {
          // Close any active dropdown first
          setActiveDropdown(null);
          // Then open all filters
          onOpenAllFilters();
        } : undefined}
        disabled={disabled}
      >
        <Filter size={16} className="filter-icon" />
        <span>All Filters</span>
        
      </button>
      {/* Small vertical line */}
    </div>
  );
};

export default JobFilters; 