import React from "react"
import "./PhoneInput.css"

const PhoneInput = React.forwardRef(({
  id,
  name,
  value = "",
  onChange,
  placeholder = "123 456 7890",
  countryCode = "+1",
  disabled = false,
  error = false,
  className = "",
  ...props
}, ref) => {
  
  // Handle input change with validation
  const handleInputChange = (e) => {
    const input = e.target.value;
    
    // Remove all non-digit characters
    const numbersOnly = input.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedNumbers = numbersOnly.slice(0, 10);
    
    // Create a new event with the cleaned value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: limitedNumbers
      }
    };
    
    // Call the original onChange with the cleaned value
    onChange(newEvent);
  };

  return (
    <div className={`phone-input-container ${error ? "error" : ""} ${disabled ? "disabled" : ""} ${className}`}>
      <div className="flex items-center border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 overflow-hidden rounded-md bg-white" style={{ height: '40px' }}>
        <span className="flex items-center px-2 h-full select-none">
          {/* Wavy US flag SVG */}
          <svg width="18" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
            <defs>
              <linearGradient id="wave" x1="0" y1="0" x2="0" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff"/>
                <stop offset="1" stopColor="#f3f3f3"/>
              </linearGradient>
            </defs>
            <rect width="24" height="16" rx="4" fill="url(#wave)"/>
            <path d="M0 2h24v2H0zM0 6h24v2H0zM0 10h24v2H0zM0 14h24v2H0z" fill="#bf0a30"/>
            <rect width="9" height="8" rx="2" fill="#002868"/>
            <g fill="#fff">
              <circle cx="1.5" cy="1.5" r="0.5"/>
              <circle cx="3.5" cy="1.5" r="0.5"/>
              <circle cx="5.5" cy="1.5" r="0.5"/>
              <circle cx="7.5" cy="1.5" r="0.5"/>
              <circle cx="2.5" cy="3" r="0.5"/>
              <circle cx="4.5" cy="3" r="0.5"/>
              <circle cx="6.5" cy="3" r="0.5"/>
              <circle cx="1.5" cy="4.5" r="0.5"/>
              <circle cx="3.5" cy="4.5" r="0.5"/>
              <circle cx="5.5" cy="4.5" r="0.5"/>
              <circle cx="7.5" cy="4.5" r="0.5"/>
              <circle cx="2.5" cy="6" r="0.5"/>
              <circle cx="4.5" cy="6" r="0.5"/>
              <circle cx="6.5" cy="6" r="0.5"/>
            </g>
            <path d="M0 16 Q6 12 12 16 T24 16" fill="#fff" opacity=".2"/>
          </svg>
          <span className="text-gray-700 font-medium text-base">{countryCode}</span>
        </span>
        <div className="h-5 border-l border-gray-300 mx-2" />
        <input
          ref={ref}
          type="tel"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-full px-3 py-1 focus:outline-none text-sm cursor-text bg-transparent"
          style={{ border: 'none', outline: 'none', boxShadow: 'none', height: '38px' }}
          maxLength="10"
          {...props}
        />
      </div>
    </div>
  )
})

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput 