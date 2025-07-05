import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WindowState {
  id: string;
  type: string;
  position: { x: number; y: number };
  zIndex: number;
}

interface WindowContextType {
  openWindows: WindowState[];
  openWindow: (type: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};

interface WindowProviderProps {
  children: ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (type: string) => {
    const existingWindow = openWindows.find(w => w.type === type);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    // Calculate position to avoid overlap with desktop icons and ensure visibility
    const isMobile = window.innerWidth <= 768;
    const baseX = isMobile ? 10 : Math.max(150, window.innerWidth * 0.1);
    const baseY = isMobile ? 40 : Math.max(60, window.innerHeight * 0.1);
    
    const newWindow: WindowState = {
      id: `${type}-${Date.now()}`,
      type,
      position: { 
        x: baseX + openWindows.length * 30, 
        y: baseY + openWindows.length * 30 
      },
      zIndex: nextZIndex
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  return (
    <WindowContext.Provider value={{ openWindows, openWindow, closeWindow, focusWindow }}>
      {children}
    </WindowContext.Provider>
  );
};