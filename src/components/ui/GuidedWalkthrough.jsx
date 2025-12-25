import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, ChevronLeft, Target } from 'lucide-react';
import Button from './Button';

const GuidedWalkthrough = ({ 
  isActive, 
  onComplete, 
  steps = [],
  targetElementId = null,
  currentStep = 0,
  onStepChange = null,
  walkthroughType = 'default', // New prop: 'default', 'dashboard', 'preview-modal', 'applications'
  currentPage = 'dashboard' // New prop for multi-page walkthroughs
}) => {
  const [targetElement, setTargetElement] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  // Find and highlight the target element
  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      setTargetElement(null);
      // Clean up any walkthrough highlights
      document.querySelectorAll('.walkthrough-highlight').forEach(el => {
        el.classList.remove('walkthrough-highlight');
      });
      return;
    }

    // Hide tooltip initially until element is found
    setIsVisible(false);
    
    // Clean up any previous walkthrough highlights
    document.querySelectorAll('.walkthrough-highlight').forEach(el => {
      el.classList.remove('walkthrough-highlight');
    });

    if (!targetElementId) {
      // Check if we're beyond the current page's steps (for multi-page walkthroughs)
      if (walkthroughType === 'dashboard' && currentStep >= steps.length) {
        console.log('[GuidedWalkthrough] Step beyond current page steps, waiting for navigation');
        setIsVisible(false);
        return;
      }
      
      setTargetElement(null);
      const topRightPosition = { 
        top: 20, 
        left: window.innerWidth - 340 
      };
      console.log('[GuidedWalkthrough] Setting top-right position:', topRightPosition);
      setTooltipPosition(topRightPosition);
      setIsVisible(true); 
      
      // Auto-complete after 3 seconds for non-interactive step
      const autoCompleteTimer = setTimeout(() => {
        console.log('[GuidedWalkthrough] Auto-completing non-interactive step');
        // For dashboard walkthroughs, never auto-complete - always move to next step
        // The FeatureAdManager will handle the multi-page logic
        if (walkthroughType === 'dashboard') {
          if (onStepChange) {
            onStepChange(currentStep + 1);
          }
        } else {
          // For other walkthroughs, use the original logic
          if (currentStep < steps.length - 1) {
            if (onStepChange) {
              onStepChange(currentStep + 1);
            }
          } else {
            // If this is the last step, complete the walkthrough
            if (onComplete) {
              onComplete();
            }
          }
        }
      }, 3000);
      
      return () => clearTimeout(autoCompleteTimer);
    }

    const findTargetElement = () => {
      console.log('[GuidedWalkthrough] Looking for element with targetElementId:', targetElementId);
      
      // For job portal elements, check if jobs are loaded first
      if (walkthroughType === 'dashboard' && targetElementId && targetElementId !== null) {
        // Check if we're on job portal and if jobs are loaded
        const hasJobs = document.querySelector('.job-card, .platform-card, [data-walkthrough="preview-button"]');
        if (!hasJobs && (targetElementId === 'preview-button' || targetElementId === 'select-all-checkbox')) {
          console.log('[GuidedWalkthrough] Jobs not loaded yet, waiting...');
          return false;
        }
        // For job-filters, we don't need to wait for jobs to load
        if (targetElementId === 'job-filters') {
          console.log('[GuidedWalkthrough] Looking for job filters element...');
        }
        // For select-all-checkbox, check if it's available and page is ready
        if (targetElementId === 'select-all-checkbox') {
          const selectAllCheckbox = document.querySelector('[data-walkthrough="select-all-checkbox"]');
          console.log('[GuidedWalkthrough] Looking for select-all-checkbox, found:', !!selectAllCheckbox);
          if (!selectAllCheckbox) {
            console.log('[GuidedWalkthrough] Select-all-checkbox not found yet, waiting...');
            // Also check if we're in the right mode (auto apply mode)
            const isInAutoApplyMode = document.querySelector('.job-table-header');
            console.log('[GuidedWalkthrough] Job table header found (auto apply mode):', !!isInAutoApplyMode);
            
            // Debug: Check what checkbox elements are available
            const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            const walkthroughCheckboxes = document.querySelectorAll('[data-walkthrough*="checkbox"]');
            console.log('[GuidedWalkthrough] Total checkboxes found:', allCheckboxes.length);
            console.log('[GuidedWalkthrough] Walkthrough checkboxes found:', walkthroughCheckboxes.length);
            
            // Check if there's a checkbox in the job table header
            const jobTableHeader = document.querySelector('.job-table-header');
            if (jobTableHeader) {
              const headerCheckbox = jobTableHeader.querySelector('input[type="checkbox"]');
              console.log('[GuidedWalkthrough] Checkbox in job table header:', !!headerCheckbox);
              if (headerCheckbox) {
                console.log('[GuidedWalkthrough] Header checkbox attributes:', headerCheckbox.attributes);
              }
            }
            
            return false;
          }
        }
        // For selected-jobs-counter, check if it's available
        if (targetElementId === 'selected-jobs-counter') {
          const selectedJobsCounter = document.querySelector('[data-walkthrough="selected-jobs-counter"]');
          console.log('[GuidedWalkthrough] Looking for selected-jobs-counter, found:', !!selectedJobsCounter);
          if (!selectedJobsCounter) {
            console.log('[GuidedWalkthrough] Selected jobs counter not found yet, waiting...');
            return false;
          }
        }
        // For start-auto-applying-button, check if it's available
        else if (targetElementId === 'start-auto-applying-button') {
          const startButton = document.querySelector('[data-walkthrough="start-auto-applying-button"]');
          console.log('[GuidedWalkthrough] Looking for start-auto-applying-button, found:', !!startButton);
          if (!startButton) {
            console.log('[GuidedWalkthrough] Start auto applying button not found yet, waiting...');
            // Check for alternative selectors
            const altButton = document.querySelector('button[class*="bg-primary"]');
            console.log('[GuidedWalkthrough] Alternative primary button found:', !!altButton);
            return false;
          }
        }
      }
      
      // Try multiple selector strategies for dashboard elements
      const selectors = [
        targetElementId,
        `[data-walkthrough="${targetElementId}"]`,
        `[data-testid="${targetElementId}"]`,
        `[aria-label*="${targetElementId}"]`,
        `.${targetElementId}`,
        `#${targetElementId}`
      ];
      
      // Add specific selectors for select-all-checkbox
      if (targetElementId === 'select-all-checkbox') {
        selectors.push('.job-table-header [data-walkthrough="select-all-checkbox"]');
        selectors.push('.job-table-header .checkbox-container');
        selectors.push('.job-table-header .checkbox');
      }
      
      // Add specific selectors for selected-jobs-counter
      if (targetElementId === 'selected-jobs-counter') {
        selectors.push('[data-walkthrough="selected-jobs-counter"]');
        selectors.push('div:contains("Selected Jobs:")');
        selectors.push('.bg-white.rounded-full:contains("Selected Jobs")');
      }
      
      // Add specific selectors for start-auto-applying-button
      if (targetElementId === 'start-auto-applying-button') {
        selectors.push('button[data-walkthrough="start-auto-applying-button"]');
        selectors.push('button[class*="bg-primary"]');
        selectors.push('button:contains("Start Auto Applying")');
        selectors.push('button:contains("Auto Apply")');
      }
      
      let element = null;
      
      for (const selector of selectors) {
        try {
          element = document.querySelector(selector);
          if (element) {
            console.log('[GuidedWalkthrough] Found element with selector:', selector);
            break;
          }
        } catch (e) {
          // Invalid selector, continue to next
          continue;
        }
      }
      
      if (element) {
        const rect = element.getBoundingClientRect();
        console.log('[GuidedWalkthrough] Element found with rect:', rect);
        console.log('[GuidedWalkthrough] Element classes:', element.className);
        console.log('[GuidedWalkthrough] Element tag:', element.tagName);
        // Only show tooltip if element is actually visible and has dimensions
        if (rect.width > 0 && rect.height > 0) {
          setTargetElement(element);
          updateTooltipPosition(element);
          setIsVisible(true);
          
          // Add click handler for obligatory steps
          const stepData = steps[currentStep];
          if (stepData?.isObligatory) {
            const handleObligatoryClick = (e) => {
              console.log('[GuidedWalkthrough] Obligatory element clicked, proceeding to next step');
              // Don't stop propagation - let the original click work
              // e.stopPropagation();
              element.removeEventListener('click', handleObligatoryClick);
              // Use setTimeout to allow the original click to complete first
              setTimeout(() => {
                if (onStepChange) {
                  onStepChange(currentStep + 1);
                }
              }, 100);
            };
            element.addEventListener('click', handleObligatoryClick);
            console.log('[GuidedWalkthrough] Added click handler for obligatory step');
          }
          
          console.log('[GuidedWalkthrough] Element found and walkthrough visible');
          return true;
        } else {
          console.log('[GuidedWalkthrough] Element found but not visible (width:', rect.width, 'height:', rect.height, ')');
        }
      } else {
        console.log('[GuidedWalkthrough] Element not found with any selector:', selectors);
      }
      return false;
    };

    // Try to find the element immediately
    if (findTargetElement()) return;
    
    // If element not found, ensure tooltip stays hidden
    setIsVisible(false);

    // If not found, wait a bit and try again (for dynamically loaded content)
    // Use longer timeout for job portal elements that might take time to load
    const timeout = setTimeout(() => {
      console.log('[GuidedWalkthrough] Retrying to find element after timeout');
      const found = findTargetElement();
      if (!found && targetElementId && targetElementId !== null) {
        console.log('[GuidedWalkthrough] Element still not found, will retry again');
        setIsVisible(false); // Keep tooltip hidden while retrying
        // For job portal elements, keep retrying with longer intervals
        if (walkthroughType === 'dashboard') {
          const retryTimeout = setTimeout(() => {
            console.log('[GuidedWalkthrough] Second retry for job portal element');
            const foundAgain = findTargetElement();
            if (!foundAgain) {
              console.log('[GuidedWalkthrough] Element still not found after second retry, will continue trying');
              setIsVisible(false); // Keep tooltip hidden while retrying
              // Keep trying every 3 seconds until found
              const persistentRetry = setInterval(() => {
                const found = findTargetElement();
                if (found) {
                  clearInterval(persistentRetry);
                }
              }, 3000);
              // Clean up after 30 seconds
              setTimeout(() => clearInterval(persistentRetry), 30000);
            }
          }, 2000);
          return () => clearTimeout(retryTimeout);
        }
      }
    }, walkthroughType === 'dashboard' ? (targetElementId === 'select-all-checkbox' || targetElementId === 'selected-jobs-counter' || targetElementId === 'start-auto-applying-button' ? 3000 : 1500) : 500);

    return () => clearTimeout(timeout);
  }, [isActive, targetElementId, currentStep]);

  // Update tooltip position based on target element
  const updateTooltipPosition = (element) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const tooltipWidth = 320; // Actual tooltip width (w-80 = 320px)
    const tooltipHeight = 200; // Approximate tooltip height
    const padding = 20; // Padding from element
    const viewportPadding = 16; // Padding from viewport edges
    
    // Calculate available space in each direction
    const spaceRight = window.innerWidth - rect.right - viewportPadding;
    const spaceLeft = rect.left - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    
    console.log('[GuidedWalkthrough] Available space - Right:', spaceRight, 'Left:', spaceLeft, 'Above:', spaceAbove, 'Below:', spaceBelow);
    
    let top, left;
    let position = 'unknown';
    
    // Determine best position based on available space
    const positions = [
      {
        name: 'right',
        space: spaceRight,
        top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
        left: rect.right + padding,
        condition: spaceRight >= tooltipWidth
      },
      {
        name: 'left',
        space: spaceLeft,
        top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
        left: rect.left - tooltipWidth - padding,
        condition: spaceLeft >= tooltipWidth
      },
      {
        name: 'above',
        space: spaceAbove,
        top: rect.top - tooltipHeight - padding,
        left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        condition: spaceAbove >= tooltipHeight
      },
      {
        name: 'below',
        space: spaceBelow,
        top: rect.bottom + padding,
        left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        condition: spaceBelow >= tooltipHeight
      }
    ];
    
    // Sort positions by available space (largest first)
    positions.sort((a, b) => b.space - a.space);
    
    // Find the best position that fits
    let bestPosition = null;
    for (const pos of positions) {
      if (pos.condition) {
        bestPosition = pos;
        break;
      }
    }
    
    // If no position fits perfectly, use the one with most space and adjust
    if (!bestPosition) {
      bestPosition = positions[0];
      console.log('[GuidedWalkthrough] No perfect fit, using position with most space:', bestPosition.name);
    }
    
    top = bestPosition.top;
    left = bestPosition.left;
    position = bestPosition.name;
    
    // Adjust position to stay within viewport bounds
    if (left < viewportPadding) {
      left = viewportPadding;
    } else if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - tooltipWidth - viewportPadding;
    }
    
    if (top < viewportPadding) {
      top = viewportPadding;
    } else if (top + tooltipHeight > window.innerHeight - viewportPadding) {
      top = window.innerHeight - tooltipHeight - viewportPadding;
    }
    
    console.log('[GuidedWalkthrough] Final positioning:', position, 'at', left, top);
    console.log('[GuidedWalkthrough] Element rect:', rect);
    
    setTooltipPosition({ top, left });
  };

  // Handle window resize and scroll
  useEffect(() => {
    if (!isActive || !targetElement) return;

    const handleUpdate = () => {
      updateTooltipPosition(targetElement);
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isActive, targetElement]);

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      
      // Handle dashboard-specific step changes
      if (walkthroughType === 'dashboard' && newStep === 1) {
        // For dashboard walkthrough, step 1 might need to open a modal
        // This will be handled by the parent component
        console.log('[GuidedWalkthrough] Dashboard step 1 - opening customize agent modal');
      }
      
      console.log('[GuidedWalkthrough] Moving to next step:', newStep);
      if (onStepChange) {
        onStepChange(newStep);
      }
    } else {
      console.log('[GuidedWalkthrough] Last step reached, completing walkthrough');
      completeWalkthrough();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      if (onStepChange) {
        onStepChange(newStep);
      }
    }
  };

  const completeWalkthrough = () => {
    console.log('[GuidedWalkthrough] Completing walkthrough - current step:', currentStep, 'total steps:', steps.length);
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const skipWalkthrough = () => {
    completeWalkthrough();
  };

  if (!isActive || !isVisible || !steps[currentStep]) {
    return null;
  }

  const currentStepData = steps[currentStep];
  const isObligatoryStep = currentStepData?.isObligatory === true;
  const portalTarget = document.body;
  
  return createPortal(
    <>
      {/* Add CSS for walkthrough highlighting */}
      <style>
        {`
          .walkthrough-highlight {
            position: relative;
            z-index: 40;
          }
          .walkthrough-highlight::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border: 3px solid #4318FF;
            border-radius: 8px;
            pointer-events: none;
            animation: walkthrough-pulse 2s infinite;
          }
          @keyframes walkthrough-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
      {/* Highlight overlay for target element */}
      {targetElement && (
        <div
          className="fixed z-[71] pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
            border: `3px solid ${
              walkthroughType === 'dashboard' ? '#4318FF' : '#4318FF'
            }`,
            borderRadius: '8px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
            animation: 'pulse 2s infinite'
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-[9999] rounded-2xl bg-white shadow-2xl border border-gray-200 w-80"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          position: 'fixed',
          transform: 'none',
          display: 'block',
          visibility: 'visible',
          opacity: '1',
          pointerEvents: 'auto',
        }}
        data-debug-position={`top: ${tooltipPosition.top}, left: ${tooltipPosition.left}`}
      >
        {/* Tooltip Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-[#4318FF] rounded">
              <Target size={14} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {currentStepData.title}
              </h3>
              <p className="text-xs text-gray-500">
                {walkthroughType === 'dashboard' ? (
                  <>
                    Step {(() => {
                      // Calculate overall step number based on current page
                      if (currentPage === 'dashboard') {
                        return currentStep + 1; // Step 1
                      } else if (currentPage === 'auto-apply-agent') {
                        return currentStep + 2; // Step 2
                      } else if (currentPage === 'job-portal') {
                        return currentStep + 3; // Steps 3-8
                      }
                      return currentStep + 1;
                    })()} of 8
                    {/* <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                      {currentPage === 'dashboard' ? 'Dashboard' : 
                       currentPage === 'auto-apply-agent' ? 'Auto-Apply Agent' : 
                       currentPage === 'job-portal' ? 'Job Portal' : 'Dashboard'}
                    </span> */}
                  </>
                ) : (
                  `Step ${currentStep + 1} of ${steps.length}`
                )}
              </p>
            </div>
          </div>
          <button
            onClick={skipWalkthrough}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Tooltip Content */}
        <div className="p-3">
          <p className="text-sm text-gray-700 mb-3">
            {currentStepData.description}
          </p>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>
                {walkthroughType === 'dashboard' 
                  ? `${Math.round(((() => {
                      // Calculate overall step number based on current page
                      if (currentPage === 'dashboard') {
                        return currentStep + 1; // Step 1
                      } else if (currentPage === 'auto-apply-agent') {
                        return currentStep + 2; // Step 2
                      } else if (currentPage === 'job-portal') {
                        return currentStep + 3; // Steps 3-8
                      }
                      return currentStep + 1;
                    })() / 8) * 100)}%`
                  : `${Math.round(((currentStep + 1) / steps.length) * 100)}%`
                }
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-[#4318FF] h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: walkthroughType === 'dashboard' 
                    ? `${((() => {
                        // Calculate overall step number based on current page
                        if (currentPage === 'dashboard') {
                          return currentStep + 1; // Step 1
                        } else if (currentPage === 'auto-apply-agent') {
                          return currentStep + 2; // Step 2
                        } else if (currentPage === 'job-portal') {
                          return currentStep + 3; // Steps 3-8
                        }
                        return currentStep + 1;
                      })() / 8) * 100}%`
                    : `${((currentStep + 1) / steps.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Navigation buttons - only show for interactive steps, hide for obligatory steps */}
          {targetElementId && !isObligatoryStep && (
            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="secondary"
                className="px-2 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={12} className="mr-1" />
                Previous
              </Button>

              <div className="flex gap-1">
                {/* <Button
                  onClick={skipWalkthrough}
                  variant="secondary"
                  className="px-2 py-1.5 text-xs text-gray-600"
                >
                  Skip
                </Button> */}
                <Button
                  onClick={nextStep}
                  className="px-3 py-1.5 text-xs bg-[#4318FF] hover:bg-[#3a14e6] text-white"
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                  {currentStep < steps.length - 1 && <ChevronRight size={12} className="ml-1" />}
                </Button>
              </div>
            </div>
          )}
          
          {/* Obligatory step message */}
          {isObligatoryStep && (
            <div className="text-center py-2">
              <p className="text-sm text-gray-600">
                Click the highlighted element to continue
              </p>
            </div>
          )}
          
          {/* Auto-complete message for non-interactive steps */}
          {/* {!targetElementId && (
            <div className="text-center text-xs text-gray-500 mt-2">
              Auto-completing in 3 seconds...
            </div>
          )} */}
        </div>

      </div>

      {/* Add pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>,
    portalTarget
  );
};

export default GuidedWalkthrough;
