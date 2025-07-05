import React from 'react';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';

const Desktop: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      {/* Desktop Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <MenuBar />
      <div className="flex-1 p-6 relative z-0">
        <div className="grid grid-cols-1 gap-4 w-20 md:w-24">
          <DesktopIcon
            emoji="📁"
            label="Portfolio"
            windowType="portfolio"
          />
          <DesktopIcon
            emoji="📄"
            label="Resume"
            windowType="resume"
          />
          <DesktopIcon
            emoji="⚙️"
            label="Skills"
            windowType="skills"
          />
          <DesktopIcon
            emoji="👤"
            label="About"
            windowType="about"
          />
          <DesktopIcon
            emoji="✉️"
            label="Contact"
            windowType="contact"
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;