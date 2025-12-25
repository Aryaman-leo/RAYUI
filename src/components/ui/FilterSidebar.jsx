import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, CheckSquare } from 'lucide-react';
import JobPreferencesSelector from './JobPreferencesSelector';
import validationManager from '../../services/validation-manager';
import { convertPreferredLocationsToAbbr } from '../../utils/formHelpers';
import UserService from '../../services/user.service';
import TechnologyService from '../../services/constant.service';
import  { VISA_OPTIONS } from '../../utils/constants';
import loader from '../../utils/googleMapsLoader';
import { extractFilterOptions, getAllFilters, getDefaultFilters, getFilterLabels, getFiltersWithFallback, saveFiltersToStorage, updateFilterInStorage, mergeFilterOptions } from '../../utils/filterConfig';
import { ROLE_GROUPS } from '../../utils/jobPreferences';
import { debug } from '../../utils/debug';
import SingleSelect from './SingleSelect';
import Slider from './Slider';
import Checkbox from './Checkbox';
import './FilterSidebar.css';

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  jobData = [], // Add jobData prop to get available options
  platform = null // Add platform prop for platform-specific preferences
}) => {
  // Local state for filter editing
  const [localFilters, setLocalFilters] = useState(filters);
  const [locations, setLocations] = useState(filters.locations || []);
  const [skills, setSkills] = useState(filters.skills || []);
  const [newLocation, setNewLocation] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const [anywhereInUS, setAnywhereInUS] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [originalFilters, setOriginalFilters] = useState(null);
  const [originalLocations, setOriginalLocations] = useState([]);
  const [originalSkills, setOriginalSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Local state to store user preferences without applying them immediately (like JobFilters)
  const [userPreferences, setUserPreferences] = useState({
    seniority: [],
    employmentStatuses: [],
    workMode: [],
    jobTitles: [],
    skills: [],
    locations: [],
    visaSponsorship: '',
    datePosted: 'any_time',
    companySizePreference: [],
    minSalary: 0,
    experienceRange: 0
  });

  // Refs for dropdown handling
  const sidebarRef = useRef(null);
  const locationInputRef = useRef(null);
  const skillInputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [technologySuggestions, setTechnologySuggestions] = useState([]);
  
  // Additional refs for dropdown handling
  const locationAutocompleteRef = useRef(null);
  const skillDropdownRef = useRef(null);

  // State to store available filter options from job response
  const [availableFilterOptions, setAvailableFilterOptions] = useState({});
  
  // Define visaOptions at component level
  const visaOptions = VISA_OPTIONS;

  // Handle skill input change with debounced API call
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout for debounced API call
    if (value.trim().length > 1) {
      const timeout = setTimeout(async () => {
        setIsLoadingSuggestions(true);
        try {
          const TechnologyService = (await import('../../services/constant.service')).default;
          const suggestions = await TechnologyService.fetchTechnologySuggestions(value.trim());
          setTechnologySuggestions(suggestions || []);
          setShowSkillDropdown(true); // Show dropdown when we get suggestions
        } catch (error) {
          setTechnologySuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }, 300); // 300ms debounce
      
      debounceTimeout.current = timeout;
    } else {
      setTechnologySuggestions([]);
      setShowSkillDropdown(false);
    }
  };

  // Handle close with state restoration
  const handleClose = React.useCallback(() => {
    // Restore original state if filters haven't been applied (Show Results not clicked)
    if (originalFilters && !filtersChanged) {
      setLocalFilters(originalFilters);
      setLocations(originalLocations);
      setSkills(originalSkills);
      setAnywhereInUS(originalFilters.locations?.includes("Anywhere in US") || false);
    }

    // Clear original state
    setOriginalFilters(null);
    setOriginalLocations([]);
    setOriginalSkills([]);

    onClose();
  }, [originalFilters, originalLocations, originalSkills, filtersChanged, onClose]);



  // Get filter options from centralized config and merge with available options from job response
  const baseFilterOptions = extractFilterOptions();
  const filterOptions = mergeFilterOptions(baseFilterOptions, availableFilterOptions);
  const filterLabels = getFilterLabels();

  // Listen for filtersRepopulated event to update filters when matchJobs API returns (like JobFilters)
  React.useEffect(() => {
    const handleFiltersRepopulated = (event) => {
      
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
          jobTitles: repopulatedFilters.jobTitles || [],
          skills: repopulatedFilters.skills || [],
          locations: repopulatedFilters.locations || [],
          visaSponsorship: repopulatedFilters.visaSponsorship || '',
          datePosted: repopulatedFilters.datePosted || 'any_time',
          companySizePreference: repopulatedFilters.companySizePreference || [],
          minSalary: repopulatedFilters.minSalary || 0,
          experienceRange: repopulatedFilters.experienceRange || 0
        };
        
        setUserPreferences(updatedUserPrefs);
        
      }
    };

    // Add event listener
    window.addEventListener('filtersRepopulated', handleFiltersRepopulated);

    // Cleanup
    return () => {
      window.removeEventListener('filtersRepopulated', handleFiltersRepopulated);
    };
  }, []);
  


  // Helper functions to check if all items are selected (like Step 2)
  const allWorkModeChecked = filterOptions.workMode.every((option) =>
    localFilters.workMode.includes(option.value)
  );
  const allEmploymentStatusesChecked = filterOptions.employmentStatuses.every((option) =>
    localFilters.employmentStatuses.includes(option.value)
  );
  const allSeniorityChecked = filterOptions.seniority.every((option) =>
    localFilters.seniority.includes(option.value)
  );
  const allCompanySizePreferenceChecked = filterOptions.companySizePreference.every((option) =>
    localFilters.companySizePreference.includes(option.value)
  );



  // Load platform-specific preferences when component mounts
  React.useEffect(() => {
    const loadPlatformPreferences = async () => {
      if (!platform) {
        return;
      }

      // Check if userPreferences is already populated
      if (userPreferences.seniority.length > 0) {
        return;
      }

      try {
        
        // Fetch fresh platform-specific preferences directly
        const UserPreferenceService = (await import('../../services/user-preference.service')).default;
        const platformPreferencesResponse = await UserPreferenceService.getPreferencesForPlatform(platform);
        
       
        
        if (platformPreferencesResponse.success && platformPreferencesResponse.data) {
          
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
          const matchedVisaOption = visaOptions.find(
            (option) =>
              option.label.toLowerCase() === incomingVisaStatus.toLowerCase() ||
              option.value.toLowerCase() === incomingVisaStatus.toLowerCase()
          );
          const mappedVisaSponsorship = matchedVisaOption ? matchedVisaOption.value : "";

          const platformUserPrefs = {
            seniority: platformPrefs.experience_levels || [],
            employmentStatuses: platformPrefs.employment_type || [],
            workMode: platformPrefs.remote_preference || [],
            jobTitles: normalizedDesiredRoles,
            skills: platformPrefs.desired_technologies || [],
            locations: platformPrefs.preferred_locations || [],
            visaSponsorship: mappedVisaSponsorship,
            datePosted: platformPrefs.date_posted_filter || "any_time",
            companySizePreference: platformPrefs.company_size_preference || [],
            minSalary: platformPrefs.min_salary_expectation_usd || 0,
            experienceRange: platformPrefs.experience_range || 0
          };

          setUserPreferences(platformUserPrefs);

          // Force update the localFilters with platform-specific data
          setLocalFilters(platformUserPrefs);
          setLocations(platformUserPrefs.locations);
          setSkills(platformUserPrefs.skills);

          // Check if "Anywhere in US" is in the locations and set the checkbox accordingly
          const hasAnywhereInUS = platformUserPrefs.locations.includes("Anywhere in US");
          setAnywhereInUS(hasAnywhereInUS);
          
          
          return; // Exit early since we found platform preferences
        }
        
        // If no platform preferences found, use default filters
        const defaultFilters = getDefaultFilters();
        setLocalFilters(defaultFilters);
        setUserPreferences(defaultFilters);
        
      } catch (error) {
        // Use default filters if error occurs
        const defaultFilters = getDefaultFilters();
        setLocalFilters(defaultFilters);
        setUserPreferences(defaultFilters);
      }
    };

    loadPlatformPreferences();
  }, [platform]); // Run when platform changes

  // Sync localFilters with userPreferences when they change
  React.useEffect(() => {
    
    // Only update if userPreferences has meaningful data
    if (userPreferences && (
      userPreferences.seniority.length > 0 ||
      userPreferences.employmentStatuses.length > 0 ||
      userPreferences.workMode.length > 0 ||
      userPreferences.jobTitles.length > 0 ||
      userPreferences.skills.length > 0 ||
      userPreferences.locations.length > 0 ||
      userPreferences.minSalary > 0 ||
      userPreferences.experienceRange > 0 ||
      userPreferences.datePosted !== 'any_time'
    )) {
      setLocalFilters(prevFilters => ({
        ...prevFilters,
        ...userPreferences
      }));
      
      // Also update locations and skills states
      if (userPreferences.locations) {
        setLocations(userPreferences.locations);
      }
      if (userPreferences.skills) {
        setSkills(userPreferences.skills);
      }
      
      // Update anywhereInUS state
      if (userPreferences.locations) {
        const hasAnywhereInUS = userPreferences.locations.includes("Anywhere in US");
        setAnywhereInUS(hasAnywhereInUS);
      }
    }
  }, [userPreferences]); // Run when userPreferences changes

  // Update anywhereInUS state whenever locations change
  React.useEffect(() => {
    const hasAnywhereInUS = locations.includes("Anywhere in US");
    setAnywhereInUS(hasAnywhereInUS);
  }, [locations]);

  // Update localFilters when userPreferences change (like JobFilters)
  React.useEffect(() => {
    if (userPreferences && Object.keys(userPreferences).length > 0) {
      setLocalFilters(userPreferences);
      setLocations(userPreferences.locations || []);
      setSkills(userPreferences.skills || []);
      
      const hasAnywhereInUS = userPreferences.locations?.includes("Anywhere in US") || false;
      setAnywhereInUS(hasAnywhereInUS);
      
      // Store as original state when sidebar first opens (if not already stored)
      if (!originalFilters) {
        setOriginalFilters(userPreferences);
        setOriginalLocations(userPreferences.locations || []);
        setOriginalSkills(userPreferences.skills || []);
      }
    }
  }, [userPreferences, originalFilters]);

  // Auto-scroll skills dropdown into view when it appears
  React.useEffect(() => {
    if (showSkillDropdown && skillDropdownRef.current) {
      setTimeout(() => {
        skillDropdownRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }, 100); // Small delay to ensure dropdown is rendered
    }
  }, [showSkillDropdown]);

  // Setup Google autocomplete for location (exact copy from Step2)
  React.useEffect(() => {
    if (!isOpen) return;
    let pac;
    loader.load().then(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        pac = new window.google.maps.places.PlaceAutocompleteElement();
        pac.setAttribute("included-region-codes", "us");
        pac.setAttribute(
          "fields",
          '["address_components","formatted_address"]'
        );
        pac.setAttribute("placeholder", "Enter city, state (e.g., San Francisco, CA)");

        // Add global styles for gmp-place-autocomplete
        if (!document.getElementById("gmp-autocomplete-styles")) {
          const globalStyle = document.createElement("style");
          globalStyle.id = "gmp-autocomplete-styles";
          globalStyle.textContent = `
            gmp-place-autocomplete {
              background-color: #fff !important;
              border: none !important;
              -moz-box-sizing: border-box !important;
              box-sizing: border-box !important;
              display: block !important;
              border-radius: 9999px !important;
              color: #1f2937 !important;
              padding: 0px !important;
              transition: none !important;
              height: 40px !important;
            }
            gmp-place-autocomplete:focus-within {
              border-color: 1px dashed #d1d5db !important;
              box-shadow: none !important;
            }
          `;
          document.head.appendChild(globalStyle);
        }

        pac.addEventListener("gmp-select", async ({ placePrediction }) => {
          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ["addressComponents", "formattedAddress"],
          });

          let city = "";
          let state = "";
          let locationText = "";

          if (place && place.addressComponents) {
            place.addressComponents.forEach((component) => {
              const types = component.types;
              if (
                types.includes("locality") ||
                types.includes("postal_town") ||
                types.includes("sublocality")
              ) {
                city = component.longText;
              }
              if (types.includes("administrative_area_level_1")) {
                state = component.longText;
              }
            });
          }

          if (!city && !state) {
            return;
          }

          if (city && state) {
            locationText = `${city}, ${state}`;
          } else if (city) {
            locationText = city;
          } else if (state) {
            locationText = state;
          }

          if (locationText && !locations.includes(locationText) && !anywhereInUS) {
            const updatedLocations = [...locations, locationText];
            setLocations(updatedLocations);
            handleFilterUpdate('locations', updatedLocations);
          }
        });

        if (locationAutocompleteRef.current) {
         
          locationAutocompleteRef.current.innerHTML = "";
          locationAutocompleteRef.current.appendChild(pac);
          // Inject pill-shaped styles into the shadow root
          if (pac.shadowRoot) {
            const style = document.createElement("style");
            style.textContent = `
            :host > div {
              background: #fff !important;
            }
            .dropdown,
            .dropdown *,
            .dropdown li,
            .dropdown li *,
            .dropdown ul,
            .dropdown ul * {
              color: #222 !important;
              font-family: "DM Sans", sans-serif !important;
            }
            .place-autocomplete-element-prediction-item-icon path {
              fill: #000 !important;
            }
            .clear-button{
              display: none !important;
            }
            .widget-container {
              border-radius: 12px !important;
              border: 1px dashed #d1d5db !important;
              background: #0000000 !important;
              padding: 4px !important;
              transition: border-color 0.2s, box-shadow 0.2s;
              height: 40px !important;
            }
            input {
              color: #000 !important;
            }
            .widget-container:focus-within {
              border-color: 1px dashed #d1d5db !important;
            }
            .focus-ring{
              display: none !important;
              border: none !important;
            }
              .place-autocomplete-element-row{
              gap:0px !important;
              }
          
            .dropdown {
              border-radius: 0px 0px 16px 16px !important;
              box-shadow: none !important;
              padding: 0 !important;
              border: none !important;
              background: #fff !important;
              color: #000 !important;
              padding: 10px !important;
            }
            .dropdown ul {
              list-style: none !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
            }
            .dropdown li {
              font-size: 1rem !important;
              font-family: 'Inter', sans-serif !important;
              color: #000 !important;
              font-weight: 600 !important;
              margin: 0px!important;
              cursor: pointer !important;
              transition: background 0.15s;
              padding: 5px 5px !important;
              border: none !important;
            }
            .dropdown li:hover, .dropdown li[aria-selected=\"true\"] {
              background: #f3f4f6 !important;
              color: #000 !important;
            }
            .attribution__logo--default path {
              fill: #000 !important;
            }
          `;
            pac.shadowRoot.appendChild(style);
          }
        }
      }
    });
    return () => {
      if (locationAutocompleteRef.current) {
        locationAutocompleteRef.current.innerHTML = "";
      }
    };
  }, [isOpen, locations]);



  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleClose();
      }

      // Close dropdowns when clicking outside
      if (!event.target.closest('.filter-input-wrapper')) {
        setShowLocationDropdown(false);
        // Only close skills dropdown if not clicking on a suggestion item
        if (!event.target.closest('.filter-suggestion-item')) {
          setShowSkillDropdown(false);
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowLocationDropdown(false);
        setShowSkillDropdown(false);
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handleClose]);

  // Handle filter updates (local only)
  const handleFilterUpdate = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: value
    }));
    
    // Clear errors when user makes changes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[category];
      return newErrors;
    });
    
    // Hide validation summary when user starts making changes
    setShowValidationSummary(false);
    
    setFiltersChanged(true);
  };

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

  // Handle saving filters (API call only when explicitly saved)
  const handleSaveFilters = async () => {
    if (!filtersChanged || !platform) return;

    setIsLoading(true);

    try {
      // Validate filters using unified validation
      const validationResult = validationManager.validateForm('filters', localFilters, { anywhereInUS });
      setErrors(validationResult.errors);
      
      if (!validationResult.isValid) {
        setShowValidationSummary(true);
        setTimeout(() => {
          const firstErrorField = document.querySelector(".error-message");
          if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
        return;
      }

      // Parse locations into abbreviated format for backend
      let preferredLocations = [];
      if (anywhereInUS) {
        preferredLocations = ["Anywhere in US"];
      } else if (localFilters.locations && localFilters.locations.length > 0) {
        preferredLocations = localFilters.locations.map(location => {
          if (location === "Anywhere in US") {
            return location;
          }
          
          const locationParts = location.split(',').map(part => part.trim());
          if (locationParts.length >= 2) {
            const city = locationParts[0];
            const state = locationParts[1];
            const stateAbbr = convertPreferredLocationsToAbbr([state])[0];
            return `${city}, ${stateAbbr}`;
          } else {
            return location;
          }
        });
      }

      const preferencesToSave = {
        experience_levels: localFilters.seniority || [],
        employment_type: localFilters.employmentStatuses || [],
        remote_preference: localFilters.workMode || [],
        desired_roles: categorizeRoles(localFilters.jobTitles || []),
        desired_technologies: localFilters.skills || [],
        preferred_locations: preferredLocations,
        work_authorization_status: localFilters.visaSponsorship || "",
        date_posted_filter: localFilters.datePosted || "any_time",
        company_size_preference: localFilters.companySizePreference || [],
        min_salary_expectation_usd: localFilters.minSalary || 0,
        experience_range: localFilters.experienceRange || 0
      };

      // Save platform-specific preferences using direct API call
      const UserPreferenceService = (await import('../../services/user-preference.service')).default;
      const response = await UserPreferenceService.updatePreferencesAndRepopulateFilters(platform, preferencesToSave);
      
      if (response.success) {
        setFiltersChanged(false);
        setOriginalFilters(null);
        setOriginalLocations([]);
        setOriginalSkills([]);
        setErrors({});
        setShowValidationSummary(false);
        
        // Update the parent component with saved preferences
        if (onApplyFilters) {
          onApplyFilters(localFilters);
        }
      } else {
        setErrors({ general: 'Failed to save filters. Please try again.' });
      }

    } catch (error) {
      setErrors({ general: 'Failed to save filters. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Sync filters to profile (EXACTLY like quick filters)
  const syncFiltersToProfile = async (filtersToSync) => {
    try {
      // Include ALL current filter values, matching quick filters exactly
      const profileUpdate = {
        // Quick filters
        experience_levels: filtersToSync.seniority || [],
        employment_type: filtersToSync.employmentStatuses || [],
        remote_preference: filtersToSync.workMode || [],
        date_posted_filter: filtersToSync.datePosted || 'any_time',
        
        // Job titles - convert from flat array to categorized structure
        desired_roles: filtersToSync.jobTitles ? (() => {
          const result = categorizeRoles(filtersToSync.jobTitles);
          console.log('FilterSidebar: jobTitles to categorize:', filtersToSync.jobTitles);
          console.log('FilterSidebar: categorized result:', result);
          return result;
        })() : [],
        
        // All other filters - use empty arrays as defaults
        desired_technologies: [],
        preferred_locations: [],
        work_authorization_status: ""
      };
      
      // Use direct API call for platform-specific preference update
      console.log('FilterSidebar: Final profileUpdate being sent:', profileUpdate);
      console.log('FilterSidebar: platform value:', platform);
      if (platform) {
        console.log('FilterSidebar: Using UserPreferenceService for platform:', platform);
        const UserPreferenceService = (await import('../../services/user-preference.service')).default;
        await UserPreferenceService.updatePreferencesAndRepopulateFilters(platform, profileUpdate);
      } else {
        console.log('FilterSidebar: Using UserService (no platform)');
        await UserService.updateUserData(profileUpdate);
      }
    } catch (error) {
      console.error('❌ Failed to sync filters to profile:', error);
    }
  };

  // Filter suggestions based on input
  const getFilteredSuggestions = (input, options, selectedItems) => {
    if (!input.trim()) return [];
    const lowerInput = input.toLowerCase();
    const filtered = options
      .filter(option => {
        const lowerOption = option.toLowerCase();
        return lowerOption.includes(lowerInput);
      })
      .slice(0, 4); // Show only 4 suggestions
    

    
    return filtered;
  };

  const addLocation = () => {
    const locationInput = newLocation.trim();
    
    // Validate location format: must be "City, State" or "Anywhere in US"
    if (!locationInput) return;
    
    if (locationInput === "Anywhere in US") {
      if (!locations.includes(locationInput)) {
        const updatedLocations = [...locations, locationInput];
        setLocations(updatedLocations);
        handleFilterUpdate('locations', updatedLocations);
        setNewLocation('');
        setShowLocationDropdown(false);
      }
      return;
    }
    
    // Check if location follows "City, State" format
    const locationParts = locationInput.split(',').map(part => part.trim());
    if (locationParts.length !== 2 || !locationParts[0] || !locationParts[1]) {
      // Show error or alert for invalid format
      return;
    }
    
    // Check for duplicates
    if (!locations.includes(locationInput)) {
      const updatedLocations = [...locations, locationInput];
      setLocations(updatedLocations);
      handleFilterUpdate('locations', updatedLocations);
      setNewLocation('');
      setShowLocationDropdown(false);
    }
  };

  const removeLocation = (location) => {
    const updatedLocations = locations.filter(l => l !== location);
    setLocations(updatedLocations);
    handleFilterUpdate('locations', updatedLocations);
  };

  const addSkill = () => {
    const skillToAdd = newSkill.trim();
    if (skillToAdd) {
      // Check for duplicates case-insensitively
      const isDuplicate = skills.some(skill => 
        skill.toLowerCase() === skillToAdd.toLowerCase()
      );
      
      if (!isDuplicate) {
        // Allow any custom technology input
        const updatedSkills = [...skills, skillToAdd];
        setSkills(updatedSkills);
        handleFilterUpdate('skills', updatedSkills);
        setNewSkill('');
        setShowSkillDropdown(false);
      } else {
      }
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = skills.filter(s => s.toLowerCase() !== skill.toLowerCase());
    setSkills(updatedSkills);
    handleFilterUpdate('skills', updatedSkills);
  };



  const handleReset = () => {
    // Store current state as original before resetting (if not already stored)
    if (!originalFilters) {
      setOriginalFilters(localFilters);
      setOriginalLocations(locations);
      setOriginalSkills(skills);
    }
    
    const resetFilters = getDefaultFilters();
    setLocalFilters(resetFilters);
    setLocations([]);
    setSkills([]);
    // Reset dropdown states
    setShowLocationDropdown(false);
    setShowSkillDropdown(false);
    setAnywhereInUS(false);
    setFiltersChanged(true); // Mark as changed so it won't auto-restore
    
    // Clear all errors when resetting
    setErrors({});
    setShowValidationSummary(false);
    
    // Don't call onFilterChange to avoid API calls - only reset local state
  };

  const handleShowResults = async () => {
    // Always proceed - don't check filtersChanged

    // Validate filters using unified validation - exactly like Profiles
    const validationResult = validationManager.validateForm('filters', localFilters, { anywhereInUS });
    setErrors(validationResult.errors);
    
    if (!validationResult.isValid) {
      // Handle form errors and scroll to first error - exactly like Profiles
      setShowValidationSummary(true);
      setTimeout(() => {
        const firstErrorField = document.querySelector(".error-message");
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return;
    }

    try {
      // Apply filters - only call onApplyFilters to prevent redundant API calls
      if (onApplyFilters) onApplyFilters(localFilters);
      
      // Reset the changed state and clear original state
      setFiltersChanged(false);
      setOriginalFilters(null);
      setOriginalLocations([]);
      setOriginalSkills([]);
      
      // Clear validation errors on successful submission
      setErrors({});
      setShowValidationSummary(false);

      // Close sidebar immediately - filter repopulation will happen asynchronously
      onClose();
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="filter-sidebar-overlay">
      <div className="filter-sidebar" ref={sidebarRef}>
        {/* Header */}
        <div className="filter-sidebar-header">
          <h3 className="filter-sidebar-title">Filters</h3>
          <button onClick={handleClose} className="filter-sidebar-close">
            <X size={20} />
          </button>
        </div>

        <div className="filter-sidebar-content">
          {/* 1. Job Titles / Keywords */}
          <div className="filter-section">
            <h4 className="filter-section-title">Job Titles</h4>

            {/* Show selected job titles as removable tags */}
            {localFilters.jobTitles && localFilters.jobTitles.length > 0 && (
              <div className="filter-input-container mb-2">
                {localFilters.jobTitles.map((jobTitle, index) => (
                  <div key={index} className="filter-tag">
                    <span>{jobTitle}</span>
                    <button
                      onClick={() => {
                        const updatedJobTitles = localFilters.jobTitles.filter(j => j !== jobTitle);
                        handleFilterUpdate('jobTitles', updatedJobTitles);
                      }}
                      className="filter-tag-remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* JobPreferencesSelector for selection */}
            <JobPreferencesSelector
              selectedRoles={localFilters.jobTitles || []}
              setSelectedRoles={(roles) => handleFilterUpdate('jobTitles', roles)}
              error={errors.jobTitles}
              mode="filter"
              hideSelectedDisplay={true}
            />
            
            {/* Error message - exactly like Profiles */}
            {errors.jobTitles && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.jobTitles}
              </div>
            )}
          </div>

          {/* 2. Date Posted */}
          <div className="filter-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 className="filter-section-title">Date Posted</h4>
              {localFilters.datePosted !== 'any_time' && (
                <button
                  onClick={() => handleFilterUpdate('datePosted', 'any_time')}
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    background: '#f3f4f6',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="filter-radio-grid">
              {filterOptions.datePosted.map((option) => (
                <label key={option.value} className={`filter-radio ${option.disabled ? 'disabled' : ''}`}>
                  <input
                    type="radio"
                    name="datePosted"
                    value={option.value}
                    checked={localFilters.datePosted === option.value}
                    disabled={option.disabled}
                    onChange={(e) => {
                      if (!option.disabled) {
                        handleFilterUpdate('datePosted', e.target.value);
                      }
                    }}
                  />
                  <span className={`filter-radio-label ${option.disabled ? 'disabled' : ''}`}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Work Mode (Remote / Hybrid / On-site) */}
          <div className="filter-section">
            <div className="flex items-center mb-1">
              <button
                onClick={() => {
                  const allSelected = localFilters.workMode.length === filterOptions.workMode.length;
                  if (allSelected) {
                    // Deselect all
                    handleFilterUpdate('workMode', []);
                  } else {
                    // Select all
                    handleFilterUpdate('workMode', filterOptions.workMode.map(option => option.value));
                  }
                }}
                className="cursor-pointer text-primary hover:text-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary-light text-xs mr-2"
                title={allWorkModeChecked ? "Uncheck All" : "Check All"}
                aria-label={allWorkModeChecked ? "Uncheck All" : "Check All"}
              >
                <CheckSquare 
                  size={16} 
                  className={`${allWorkModeChecked ? "text-primary" : "text-gray-400"} focus:outline-none`}
                />
              </button>
              <h4 className="filter-section-title">{filterLabels.workMode}</h4>
            </div>
            <div className="filter-checkbox-grid">
              {filterOptions.workMode.map((option) => (
                <label key={option.value} className="filter-checkbox">
                  <Checkbox
                    checked={localFilters.workMode.includes(option.value)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...localFilters.workMode, option.value]
                        : localFilters.workMode.filter(m => m !== option.value);
                      handleFilterUpdate('workMode', updated);
                    }}
                  />
                  <span className="filter-checkbox-label">{option.label}</span>
                </label>
              ))}
            </div>
            
            {/* Error message - exactly like Profiles */}
            {errors.workMode && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.workMode}
              </div>
            )}
          </div>

          {/* 4. Employment Type (Full-time, Contract, Internship) */}
          <div className="filter-section">
            <div className="flex items-center mb-1">
              <button
                onClick={() => {
                  const allSelected = localFilters.employmentStatuses.length === filterOptions.employmentStatuses.length;
                  if (allSelected) {
                    // Deselect all
                    handleFilterUpdate('employmentStatuses', []);
                  } else {
                    // Select all
                    handleFilterUpdate('employmentStatuses', filterOptions.employmentStatuses.map(option => option.value));
                  }
                }}
                className="cursor-pointer text-primary hover:text-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary-light text-xs mr-2"
                title={allEmploymentStatusesChecked ? "Uncheck All" : "Check All"}
                aria-label={allEmploymentStatusesChecked ? "Uncheck All" : "Check All"}
              >
                <CheckSquare 
                  size={16} 
                  className={`${allEmploymentStatusesChecked ? "text-primary" : "text-gray-400"} focus:outline-none`}
                />
              </button>
              <h4 className="filter-section-title">{filterLabels.employmentStatuses}</h4>
            </div>
            <div className="filter-checkbox-grid">
              {filterOptions.employmentStatuses.map((option) => (
                <label key={option.value} className="filter-checkbox">
                  <Checkbox
                    checked={localFilters.employmentStatuses.includes(option.value)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...localFilters.employmentStatuses, option.value]
                        : localFilters.employmentStatuses.filter(t => t !== option.value);
                      handleFilterUpdate('employmentStatuses', updated);
                    }}
                  />
                  <span className="filter-checkbox-label">{option.label}</span>
                </label>
              ))}
            </div>
            
            {/* Error message - exactly like Profiles */}
            {errors.employmentStatuses && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.employmentStatuses}
              </div>
            )}
          </div>

          {/* 5. Experience Level / Years */}
          <div className="filter-section">
            <div className="flex items-center mb-1">
              <button
                onClick={() => {
                  const allSelected = localFilters.seniority.length === filterOptions.seniority.length;
                  if (allSelected) {
                    // Deselect all
                    handleFilterUpdate('seniority', []);
                  } else {
                    // Select all
                    handleFilterUpdate('seniority', filterOptions.seniority.map(option => option.value));
                  }
                }}
                className="cursor-pointer text-primary hover:text-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary-light text-xs mr-2"
                title={allSeniorityChecked ? "Uncheck All" : "Check All"}
                aria-label={allSeniorityChecked ? "Uncheck All" : "Check All"}
              >
                <CheckSquare 
                  size={16} 
                  className={`${allSeniorityChecked ? "text-primary" : "text-gray-400"} focus:outline-none`}
                />
              </button>
              <h4 className="filter-section-title">{filterLabels.seniority}</h4>
            </div>
            <div className="filter-checkbox-grid">
              {filterOptions.seniority.map((option) => (
                <label key={option.value} className="filter-checkbox">
                  <Checkbox
                    checked={localFilters.seniority.includes(option.value)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...localFilters.seniority, option.value]
                        : localFilters.seniority.filter(l => l !== option.value);
                      handleFilterUpdate('seniority', updated);
                    }}
                  />
                  <span className="filter-checkbox-label">{option.label}</span>
                </label>
              ))}
            </div>
            
            {/* Error message - exactly like Profiles */}
            {errors.seniority && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.seniority}
              </div>
            )}
          </div>

          {/* 6. Minimum Salary */}
          <div className="filter-section">
            <h4 className="filter-section-title">{filterLabels.minSalary}</h4>
            <Slider
              min={20000}
              max={500000}
              step={10000}
              value={localFilters.minSalary}
              onChange={(value) => handleFilterUpdate('minSalary', value)}
              formatValue={(val) => `$${val.toLocaleString()}`}
              showLabels={false}
              showTooltip={true}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>$20,000</span>
              <span className='font-extrabold'>${localFilters.minSalary.toLocaleString()}</span>
              <span>$500,000</span>
            </div>
            
            {/* Error message - exactly like Profiles */}
            {errors.minSalary && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.minSalary}
              </div>
            )}
          </div>

          {/* 7. Work Authorization / Visa Sponsorship */}
          {/* <div className="filter-section">
            <h4 className="filter-section-title">{filterLabels.visaSponsorship}</h4>
            <div style={{
              '--select-border': '1px dashed #d1d5db',
              '--select-border-radius': '12px'
            }}>
              <SingleSelect
                options={visaOptions}
                value={visaOptions.find(option => option.value === localFilters.visaSponsorship) || null}
                onChange={(selectedOption) => handleFilterUpdate('visaSponsorship', selectedOption ? selectedOption.value : "")}
                placeholder="Select your visa status"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: '1px dashed #d1d5db',
                    borderRadius: '12px',
                    minHeight: '40px',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#9ca3af'
                    },
                    '&:focus': {
                      borderColor: '#4318ff',
                      borderStyle: 'dashed',
                      boxShadow: '0 0 0 3px rgba(67, 24, 255, 0.1)'
                    }
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#374151',
                    fontSize: '14px'
                  })
                }}
              />
            </div>
            
            {errors.visaSponsorship && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.visaSponsorship}
              </div>
            )}
          </div> */}

          {/* 8. Skills / Tech Stack */}
          <div className="filter-section">
            <h4 className="filter-section-title">{filterLabels.skills}</h4>
            <div className="filter-input-container">
              {skills.map((skill, index) => (
                <div key={index} className="filter-tag">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(skill)} className="filter-tag-remove">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <div className="filter-input-group">
                <div className="filter-input-wrapper">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={handleSkillInputChange}
                    onFocus={() => {
                      if (newSkill.trim().length > 0 && technologySuggestions.length > 0) {
                        setShowSkillDropdown(true);
                      }
                    }}
                 
                    placeholder="Enter technology"
                    className="filter-input"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  {showSkillDropdown && (
                    <div className="filter-dropdown-suggestions" ref={skillDropdownRef}>
                      {isLoadingSuggestions ? (
                        <div className="filter-suggestion-loading">
                          Loading suggestions...
                        </div>
                      ) : (
                        <>
                          {technologySuggestions.map((skill, index) => {
                            const isAlreadySelected = skills.some(selectedSkill => 
                              selectedSkill.toLowerCase() === skill.toLowerCase()
                            );
                            return (
                              <div
                                key={index}
                                className={`filter-suggestion-item ${isAlreadySelected ? 'filter-suggestion-selected' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (isAlreadySelected) {
                                    return; // Don't add duplicates
                                  }
                                  setTimeout(() => {
                                    const updatedSkills = [...skills, skill];
                                    setSkills(updatedSkills);
                                    handleFilterUpdate('skills', updatedSkills);
                                    setNewSkill('');
                                    setShowSkillDropdown(false);
                                  }, 10);
                                }}
                              >
                                {skill}
                                {isAlreadySelected && <span className="filter-suggestion-checkmark">✓</span>}
                              </div>
                            );
                          })}
                          {newSkill.trim() && (
                            <div
                              className="filter-suggestion-item filter-suggestion-custom"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setTimeout(() => {
                                  const updatedSkills = [...skills, newSkill.trim()];
                                  setSkills(updatedSkills);
                                  handleFilterUpdate('skills', updatedSkills);
                                  setNewSkill('');
                                  setShowSkillDropdown(false);
                                }, 10);
                              }}
                            >
                              Add custom: <b>"{newSkill.trim()}"</b>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 9. Company Size / Stage */}
          <div className="filter-section">
            <div className="flex items-center mb-1">
              <button
                onClick={() => {
                  const allSelected = localFilters.companySizePreference.length === filterOptions.companySizePreference.length;
                  if (allSelected) {
                    // Deselect all
                    handleFilterUpdate('companySizePreference', []);
                  } else {
                    // Select all
                    handleFilterUpdate('companySizePreference', filterOptions.companySizePreference.map(option => option.value));
                  }
                }}
                className="cursor-pointer text-primary hover:text-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary-light text-xs mr-2"
                title={allCompanySizePreferenceChecked ? "Uncheck All" : "Check All"}
                aria-label={allCompanySizePreferenceChecked ? "Uncheck All" : "Check All"}
              >
                <CheckSquare 
                  size={16} 
                  className={`${allCompanySizePreferenceChecked ? "text-primary" : "text-gray-400"} focus:outline-none`}
                />
              </button>
              <h4 className="filter-section-title">{filterLabels.companySizePreference}</h4>
            </div>
            <div className="filter-checkbox-grid">
              {filterOptions.companySizePreference.map((option) => (
                <label key={option.value} className="filter-checkbox">
                  <Checkbox
                    checked={localFilters.companySizePreference.includes(option.value)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...localFilters.companySizePreference, option.value]
                        : localFilters.companySizePreference.filter(size => size !== option.value);
                      handleFilterUpdate('companySizePreference', updated);
                    }}
                  />
                  <span className="filter-checkbox-label">{option.label}</span>
                </label>
              ))}
            </div>
            
            {/* Error message - exactly like Profiles */}
            {errors.companySizePreference && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.companySizePreference}
              </div>
            )}
          </div>

          {/* Location (Additional filter - not in the 9-step chronology but important) */}
          <div className="filter-section">
            <h4 className="filter-section-title">{filterLabels.locations}</h4>

            {/* Anywhere in US checkbox */}
            <div style={{ marginBottom: '12px' }}>
              <Checkbox
                id="anywhere-in-us"
                value="anywhere-in-us"
                checked={anywhereInUS}
                onChange={(e) => {
                  setAnywhereInUS(e.target.checked);
                  if (e.target.checked) {
                    // Add "Anywhere in US" to locations when checkbox is selected
                    const updatedLocations = ["Anywhere in US"];
                    setLocations(updatedLocations);
                    handleFilterUpdate('locations', updatedLocations);
                  } else {
                    // Remove "Anywhere in US" from locations when checkbox is unchecked
                    const updatedLocations = locations.filter(loc => loc !== "Anywhere in US");
                    setLocations(updatedLocations);
                    handleFilterUpdate('locations', updatedLocations);
                  }
                }}
                label="Anywhere in US"
              />
            </div>

            {!anywhereInUS && (
              <div className="filter-input-container">
                {locations.map((location, index) => (
                  <div key={index} className="filter-tag">
                    <span>{location}</span>
                    <button onClick={() => removeLocation(location)} className="filter-tag-remove">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <div className="filter-input-group">
                  <div className="filter-input-wrapper">
                    <div ref={locationAutocompleteRef} style={{ width: '100%', minHeight: '40px' }} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Error message - exactly like Profiles */}
            {errors.locations && (
              <div className="error-message" style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                {errors.locations}
              </div>
            )}
          </div>

          {/* Experience Years (Additional filter - not in the 9-step chronology but important) */}
          {/* <div className="filter-section">
            <h4 className="filter-section-title">{filterLabels.experienceRange}</h4>
            <Slider
              min={0}
              max={15}
              step={1}
              value={localFilters.experienceRange}
              onChange={(value) => handleFilterUpdate('experienceRange', value)}
              formatValue={(val) => `${val} ${val === 1 ? 'year' : 'years'}`}
              showLabels={false}
              showTooltip={true}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0 years</span>
              <span className='font-extrabold'>{localFilters.experienceRange} {localFilters.experienceRange === 1 ? 'year' : 'years'}</span>
              <span>15+ years</span>
            </div>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="filter-sidebar-actions">
          <button onClick={handleReset} className="filter-reset-btn">
            Reset
          </button>
          <button
            onClick={handleShowResults}
            className="filter-apply-btn"
            style={{
              opacity: 1,
              cursor: 'pointer'
            }}
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
