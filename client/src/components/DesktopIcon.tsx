import React from "react";
import { useWindowContext } from "../context/WindowContext";

interface DesktopIconProps {
  label: string;
  windowType: string;
  icon: string; // Changed from 'emoji' to 'icon'
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  windowType,
}) => {
  const { openWindow } = useWindowContext();

  const handleDoubleClick = () => {
    if (windowType === "resume") {
      window.open("https://example.com/resume.pdf", "_blank");
      return;
    }
    openWindow(windowType);
  };

  return (
    <div
      
      className="flex flex-col items-center justify-center w-160 h-20 md:w-20 md:h-24 cursor-pointer p-2 text-black hover:bg-black hover:text-white transition-colors duration-150"
      onDoubleClick={handleDoubleClick}
    >
      {/* Replaced the emoji div with an <img> tag */}
      {/* The src is now dynamically created from the iconName prop */}
      {/* Make sure your icons are in the /public/icons/ directory */}
      <img
        src={icon} 
        alt={`${label} Icon`} 
        className="w-14 h-14 mb-1" // Using width/height utilities for the image size
      />
      <div className="text-xs text-center leading-tight font-medium">
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;