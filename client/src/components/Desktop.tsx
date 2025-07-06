import React from "react";
import MenuBar from "./MenuBar";
import DesktopIcon from "./DesktopIcon";
import backgroundImage from "./wp6099400-retro-pixel-hd-wallpapers.png"; // You can uncomment this if you have the image

const Desktop: React.FC = () => {
  // An array makes it easier to manage and add new icons
  const icons = [
    { label: "Portfolio", windowType: "portfolio" },
    { label: "Resume", windowType: "resume" }, // Changed from Resume to match your other files
    { label: "Skills", windowType: "skills" },
    { label: "About Me", windowType: "about" },
    { label: "Contact", windowType: "contact" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      {/* Desktop Background Image */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          //backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <MenuBar />
      <div className="flex-1 p-6 relative z-0">
        <div className="grid grid-cols-1 gap-4 w-20 md:w-24">
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.windowType}
              label={icon.label}
              windowType={icon.windowType}
              // Dynamically creates the path based on the windowType
              icon={`/icons/${icon.windowType}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
