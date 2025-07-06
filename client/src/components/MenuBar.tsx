import React, { useState } from "react";
import { Clock } from "lucide-react";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-6 bg-white border-b border-black flex items-center justify-between px-4 text-sm">
      <div className="flex items-center space-x-6">
        <div className="font-bold">HEASM PISHBIN</div>
        <div className="flex items-center space-x-4">
          <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
            File
          </span>
          <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
            Edit
          </span>
          <span className="hover:bg-black hover:text-white px-1 cursor-pointer">
            View
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
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
