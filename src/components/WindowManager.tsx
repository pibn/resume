import React from 'react';
import { useWindowContext } from '../context/WindowContext';
import MacWindow from './MacWindow';
import AboutWindow from './windows/AboutWindow';
import PortfolioWindow from './windows/PortfolioWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';

const WindowManager: React.FC = () => {
  const { openWindows } = useWindowContext();

  const getWindowContent = (type: string) => {
    switch (type) {
      case 'about':
        return <AboutWindow />;
      case 'portfolio':
        return <PortfolioWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'contact':
        return <ContactWindow />;
      default:
        return <div>Unknown window type</div>;
    }
  };

  const getWindowTitle = (type: string) => {
    switch (type) {
      case 'about':
        return 'About Me';
      case 'portfolio':
        return 'Portfolio';
      case 'experience':
        return 'Work Experience';
      case 'skills':
        return 'Skills & Tools';
      case 'contact':
        return 'Contact Info';
      default:
        return 'Unknown';
    }
  };

  const isLargeWindow = (type: string) => {
    return type === 'portfolio';
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {openWindows.map((window) => (
        <MacWindow
          key={window.id}
          id={window.id}
          title={getWindowTitle(window.type)}
          initialPosition={window.position}
          zIndex={window.zIndex}
          isLarge={isLargeWindow(window.type)}
        >
          {getWindowContent(window.type)}
        </MacWindow>
      ))}
    </div>
  );
};

export default WindowManager;