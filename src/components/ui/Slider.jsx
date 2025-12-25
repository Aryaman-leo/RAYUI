import React, { useState, useRef, useEffect } from "react"
import RcSlider from "rc-slider"
import "rc-slider/assets/index.css"
import "./Slider.css"

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  disabled = false,
  showLabels = true,
  formatValue = (val) => val,
  showTooltip = true,
  limitValue = null, // New prop for limit indicator
  limitTooltip = null, // New prop for limit tooltip text
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const sliderRef = useRef(null);

  const handleMouseEnter = () => {
    if (showTooltip) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (showTooltip && !isDragging) {
      setIsHovering(false);
    }
  };

  const handleBeforeChange = () => {
    if (showTooltip) {
      setIsDragging(true);
    }
  };

  const handleAfterChange = () => {
    if (showTooltip) {
      setIsDragging(false);
      setIsHovering(false);
    }
  };

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
    
    // Calculate tooltip position based on value
    if (showTooltip && sliderRef.current) {
      const percentage = ((newValue - min) / (max - min)) * 100;
      setTooltipPosition(percentage);
      
      // Calculate viewport position for fixed positioning
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const leftOffset = rect.left;
      const tooltipX = leftOffset + (sliderWidth * percentage / 100);
      
      setTooltipStyle({
        left: `${tooltipX}px`,
        top: `${rect.top - 35}px`
      });
    }
  };

  // Calculate initial tooltip position
  useEffect(() => {
    if (showTooltip && sliderRef.current) {
      const percentage = ((value - min) / (max - min)) * 100;
      setTooltipPosition(percentage);
      
      // Calculate viewport position for fixed positioning
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const leftOffset = rect.left;
      const tooltipX = leftOffset + (sliderWidth * percentage / 100);
      
      setTooltipStyle({
        left: `${tooltipX}px`,
        top: `${rect.top - 35}px`
      });
    }
  }, [value, min, max, showTooltip]);

  const showTooltipValue = isDragging || isHovering;

  // Calculate limit position if limitValue is provided
  const limitPosition = limitValue !== null ? ((limitValue - min) / (max - min)) * 100 : null;
  const showLimitIndicator = limitValue !== null && limitValue >= min && limitValue <= max;
  
  // Check if current value exceeds the limit
  const exceedsLimit = limitValue !== null && value > limitValue;

  return (
    <div 
      ref={sliderRef}
      className={`slider-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RcSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        onBeforeChange={handleBeforeChange}
        onAfterChange={handleAfterChange}
        trackStyle={{ 
          backgroundColor: exceedsLimit ? "#fca5a5" : "#4318FF", 
          height: 6 
        }}
        handleStyle={{
          borderColor: "#4318FF",
          backgroundColor: "#4318FF",
          height: 16,
          width: 16,
          marginTop: -5,
        }}
        railStyle={{ backgroundColor: "#d1d5db", height: 6 }}
        {...props}
      />
      
      {/* Limit Indicator */}
      {showLimitIndicator && (
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
          style={{ left: `${limitPosition}%` }}
        >
          <div className="relative group">
            {/* Single small slow ripple */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-400 rounded-full opacity-70" style={{ 
                animation: 'slowRipple 4s ease-out infinite',
                aspectRatio: '1/1'
              }}></div>
            </div>
            {/* Main light red dot */}
            <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
            {/* Tooltip */}
            {limitTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Application limit will be reached here
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500"></div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Tooltip */}
      {showTooltip && showTooltipValue && (
        <div 
          className="slider-tooltip"
          style={tooltipStyle}
        >
          {formatValue(value)}
        </div>
      )}
      
      {showLabels && (
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{formatValue(min)}</span>
          <span>{formatValue(value)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  )
}

export default Slider 