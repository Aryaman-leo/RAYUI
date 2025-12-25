import React from 'react';

const RobotIcon = ({ size = 64, color = "black", ...props }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="18 6 28 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Robot head - made wider */}
      <path 
        d="M18 16 C18 12, 46 12, 46 16 V32 C46 36, 18 36, 18 32 Z" 
        stroke={color} 
        strokeWidth="5" 
        fill="none" 
        strokeLinecap="round"
      />

      {/* Eyes - made larger */}
      <circle cx="26" cy="24" r="3" fill={color}/>
      <circle cx="38" cy="24" r="3" fill={color}/>

      {/* Antenna - made thicker */}
      <circle cx="32" cy="8" r="2.5" fill={color}/>
      <line x1="32" y1="8" x2="32" y2="12" stroke={color} strokeWidth="3"/>

      {/* Deep body bump - made wider and thicker */}
      <path 
        d="M18 52 Q32 36, 46 52" 
        stroke={color} 
        strokeWidth="5" 
        fill="none" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RobotIcon; 