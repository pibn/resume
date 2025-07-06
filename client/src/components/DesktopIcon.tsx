import React from "react";
import { useWindowContext } from "../context/WindowContext";

interface DesktopIconProps {
  emoji: string;
  label: string;
  windowType: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  emoji,
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
      <div className="text-2xl md:text-3xl mb-1">{emoji}</div>
      <div className="text-xs text-center leading-tight font-medium">
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;
