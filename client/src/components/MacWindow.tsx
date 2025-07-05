import React, { useState, useRef, useEffect } from 'react';
import { X, Minus } from 'lucide-react';
import { useWindowContext } from '../context/WindowContext';

interface MacWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition: { x: number; y: number };
  zIndex: number;
  isLarge?: boolean;
}

const MacWindow: React.FC<MacWindowProps> = ({ 
  id, 
  title, 
  children, 
  initialPosition, 
  zIndex,
  isLarge = false
}) => {
  const { closeWindow, focusWindow } = useWindowContext();
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      focusWindow(id);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && windowRef.current) {
      const windowWidth = windowRef.current.offsetWidth;
      const windowHeight = windowRef.current.offsetHeight;
      
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - windowWidth, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - windowHeight, e.clientY - dragOffset.y))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleClose = () => {
    closeWindow(id);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (isMinimized) {
    return null;
  }

  const windowClasses = isLarge 
    ? 'w-[90vw] max-w-[1000px] h-[85vh]' 
    : 'w-[90vw] max-w-[600px] max-h-[85vh]';

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white border-2 border-black shadow-lg pointer-events-auto ${windowClasses}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex
      }}
      onClick={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div
        className="bg-white h-8 flex items-center justify-between px-3 cursor-move border-b border-black select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClose}
            className="w-4 h-4 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-150"
          >
            <X size={8} />
          </button>
          <button
            onClick={handleMinimize}
            className="w-4 h-4 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-150"
          >
            <Minus size={8} />
          </button>
        </div>
        <div className="text-sm font-medium">{title}</div>
        <div className="w-8"></div>
      </div>

      {/* Window Content */}
      <div className={`p-4 md:p-6 overflow-auto bg-white ${isLarge ? 'h-[calc(85vh-2rem)]' : 'max-h-[calc(85vh-2rem)]'}`}>
        {children}
      </div>
    </div>
  );
};

export default MacWindow;