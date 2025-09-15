import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function LoadingBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show loading bar when location changes
    setVisible(true);
    setProgress(70); // Jump to 70% immediately when navigation starts

    // Complete to 100% after a short delay
    const timer = setTimeout(() => {
      setProgress(100);
      // Hide the loading bar after completion
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]); // Trigger effect when location changes

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}