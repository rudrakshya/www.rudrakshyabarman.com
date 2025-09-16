import { useEffect } from 'react';

export default function TestTailwind() {
  useEffect(() => {
    // Test if Tailwind is working by checking if classes are applied
    const testElement = document.createElement('div');
    testElement.className = 'text-red-500';
    document.body.appendChild(testElement);
    
    // Check if the element has computed styles
    const computedStyles = window.getComputedStyle(testElement);
    const isTailwindWorking = computedStyles.color === 'rgb(239, 68, 68)'; // red-500
    
    console.log('Tailwind CSS Working:', isTailwindWorking);
    
    // Clean up
    document.body.removeChild(testElement);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-500">Tailwind CSS Test</h1>
      <p className="text-green-500">If you see this text in blue and green, Tailwind is working!</p>
      <div className="mt-4 p-4 bg-purple-100 rounded-lg">
        <p className="text-purple-700">This should have a purple background.</p>
      </div>
    </div>
  );
}