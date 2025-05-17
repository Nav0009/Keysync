import React, { useState, useEffect } from 'react';

interface KeyboardKeyProps {
  keyValue: string;
  displayValue?: string | React.ReactNode;
  width?: string;
  className?: string;
  isSpecial?: boolean;
  isActive?: boolean;
  onKeyPress: (key: string) => void;
  onKeyRelease: (key: string) => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  keyValue,
  displayValue,
  width = 'w-12',
  className = '',
  isSpecial = false,
  isActive = false,
  onKeyPress,
  onKeyRelease
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  useEffect(() => {
    if (isPressed) {
      const timeout = setTimeout(() => {
        setIsPressed(false);
        onKeyRelease(keyValue);
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [isPressed, keyValue, onKeyRelease]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isPressed) {
      setIsPressed(true);
      onKeyPress(keyValue);
      
      // Provide haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const baseClasses = `
    ${width} h-12 md:h-14 
    flex items-center justify-center 
    rounded-lg 
    select-none 
    transition-all 
    duration-150
    text-sm md:text-base
    ${className}
  `;

  const regularKeyClasses = `
    ${baseClasses}
    ${isActive || isPressed 
      ? 'bg-indigo-500 text-white shadow-inner scale-95' 
      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-md hover:shadow-lg'}
    border border-slate-200 dark:border-slate-600
  `;

  const specialKeyClasses = `
    ${baseClasses}
    ${isActive || isPressed 
      ? 'bg-slate-700 dark:bg-slate-900 text-white shadow-inner scale-95' 
      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg'}
    border border-slate-300 dark:border-slate-700
    font-medium
  `;

  return (
    <button
      className={isSpecial ? specialKeyClasses : regularKeyClasses}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => {
        if (!isPressed) {
          setIsPressed(true);
          onKeyPress(keyValue);
        }
      }}
    >
      {displayValue || keyValue}
    </button>
  );
};

export default KeyboardKey;