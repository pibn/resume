import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import WindowManager from './components/WindowManager';
import { WindowProvider } from './context/WindowContext';
import './styles/minimal-retro.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black mx-auto mb-6 flex items-center justify-center">
            <div className="w-3 h-3 bg-white"></div>
          </div>
          <div className="text-xl font-bold text-black mb-2">HEASM</div>
          <div className="text-sm text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <WindowProvider>
      <div className="min-h-screen bg-gray-100 select-none overflow-hidden">
        <Desktop />
        <WindowManager />
      </div>
    </WindowProvider>
  );
}

export default App;