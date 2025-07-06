import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // THE DEFINITIVE FIX IS HERE:
    // 1. `relative`: z-index only works on positioned elements. `relative` positions it
    //    without affecting the layout.
    // 2. `z-40`: This lifts the menu bar up to a high layer. Your windows will likely
    //    have a higher z-index (like z-50), but this ensures the menu bar is above
    //    any transparent overlays and is always clickable.
    <div className="relative z-40 h-7 bg-white border-b border-black flex items-center justify-between px-2 text-sm flex-nowrap">

      {/* Left side content */}
      <div className="flex items-center space-x-4 overflow-hidden">
        <a href="#" className="font-bold px-2 py-0.5 hover:bg-black hover:text-white cursor-pointer whitespace-nowrap">
          HEASM PISHBIN
        </a>

        {/* The links container */}
        <div className="flex items-center space-x-2">
          {/* Increased padding for a better hover feel */}
          <a href="#" className="px-2 py-0.5 hover:bg-black hover:text-white cursor-pointer whitespace-nowrap">
            A Product Lover
          </a>
        </div>
      </div>

      {/* Right side content (The Clock) */}
      <div className="hidden min-[400px]:flex items-center space-x-2 flex-shrink-0">
        <Clock size={12} />
        <span>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MenuBar;