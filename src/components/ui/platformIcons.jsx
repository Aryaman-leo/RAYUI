import Greenhouse from "./assets/greenhouse.svg?react";
import LinkedIn from "./assets/linkedIn.svg?react";
import Workday from "./assets/workday.svg?react";
import Angelist from "./assets/angelist.svg?react";
import Amazon from "./assets/amazon.svg?react";
import Indeed from "./assets/indeed.svg?react";
import Google from "./assets/google.svg?react";
import Ashby from "./assets/ashby.svg?react";
import Lever from "./assets/lever.svg?react";
import ZipRecruiter from "./assets/ziprecruiter.svg?react";
import Monster from "./assets/monster.svg?react";
import Dice from "./assets/dice.svg?react";
import Icims from "./assets/icims.svg?react";
import Adp from "./assets/adp.svg?react";
import Taleo from "./assets/taleo.svg?react";
import SmartRecruiters from "./assets/smartrecruiters.svg?react";
import faangPng from "./assets/faang.png";
import OracleCloud from "./assets/oraclecloud.svg?react";
import SAP from "./assets/SAP.svg?react";

// A fallback component for platforms that don't have a specific icon.
export const FallbackIcon = ({ platformName, className = "platform-icon" }) => (
  <div className={`w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm ${className}`}>
    {platformName ? platformName.charAt(0).toUpperCase() : "?"}
  </div>
);

export const platformIcons = {
  greenhouse: <Greenhouse className="platform-icon" />,
  linkedin: <LinkedIn className="platform-icon text-[#0A66C2]" />,
  workday: <Workday className="platform-icon text-[#2A67E0]" />,
  angelist: <Angelist className="platform-icon text-black" />,
  amazon: <Amazon className="platform-icon text-black" />,
  indeed: <Indeed className="platform-icon text-[#2164f3]" />,
  google: <Google className="platform-icon text-[#EA4335]" />,
  ashby: <Ashby className="platform-icon text-[#EA4335]" />,

  // New example platforms with fallback icons
  lever: <Lever className="platform-icon" />,
  ziprecruiter: <ZipRecruiter className="platform-icon" />,
  dice: <Dice className="platform-icon" />,
  monster: <Monster className="platform-icon" />,
  icims: <Icims className="platform-icon"  style={{width: '60%'}}/>,
  adp: <Adp className="platform-icon"  style={{width: '60%'}}/>,
  taleo: <Taleo className="platform-icon" style={{width: '60%'}}/>,
  smartrecruiter: <SmartRecruiters className="platform-icon" />,
  faang: <img src={faangPng} alt="FAANG" className="platform-icon w-full !w-full" style={{ width: '100%' }} />,
  oraclecloud: <OracleCloud className="platform-icon"  style={{width: '80%'}}/>,
  sapsf: <SAP className="platform-icon w-full"  style={{width: '90%'}}/>,
};

// Function to get platform icon with fallback
export const getPlatformIcon = (platformName) => {
  const normalizedName = platformName?.toLowerCase();
  return platformIcons[normalizedName] || <FallbackIcon platformName={platformName} />;
};

// Make it available globally for the hook
if (typeof window !== "undefined") {
  window.platformIcons = platformIcons;
  window.getPlatformIcon = getPlatformIcon;
}

export default platformIcons;