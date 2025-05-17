import React from 'react';
import KeyboardKey from '../KeyboardKey';
import { 
  ArrowLeft, 
  ArrowRight, 
  Delete, 
  ChevronsUp, 
  MoveLeft, 
  CornerDownLeft
} from 'lucide-react';

interface StandardLayoutProps {
  onKeyPress: (key: string) => void;
  onKeyRelease: (key: string) => void;
  capsLock: boolean;
  toggleCapsLock: () => void;
}

const StandardLayout: React.FC<StandardLayoutProps> = ({ 
  onKeyPress, 
  onKeyRelease, 
  capsLock,
  toggleCapsLock
}) => {
  // Define keyboard rows
  const row1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const row2 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row4 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'];

  // Transform keys to uppercase if capsLock is enabled
  const processKey = (key: string) => {
    if (key.length === 1 && /[a-z]/.test(key)) {
      return capsLock ? key.toUpperCase() : key;
    }
    return key;
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <div className="flex space-x-1 w-full">
        {row1.map((key) => (
          <KeyboardKey
            key={key}
            keyValue={key}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
        <KeyboardKey
          keyValue="Backspace"
          displayValue={<Delete size={18} />}
          width="w-16"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>

      <div className="flex space-x-1 w-full">
        {row2.map((key) => (
          <KeyboardKey
            key={key}
            keyValue={processKey(key)}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
      </div>

      <div className="flex space-x-1 w-full">
        <div className="w-8"></div>
        {row3.map((key) => (
          <KeyboardKey
            key={key}
            keyValue={processKey(key)}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
        <div className="w-8"></div>
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="CapsLock"
          displayValue={<ChevronsUp size={18} />}
          width="w-16"
          isSpecial
          isActive={capsLock}
          onKeyPress={toggleCapsLock}
          onKeyRelease={() => {}}
        />
        {row4.map((key) => (
          <KeyboardKey
            key={key}
            keyValue={key}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
        <KeyboardKey
          keyValue="/"
          width="flex-1"
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="Shift"
          displayValue={<MoveLeft size={18} />}
          width="w-16"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="Control"
          displayValue="Ctrl"
          width="w-14"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="Alt"
          width="w-12"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue=" "
          displayValue="Space"
          width="flex-1"
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="ArrowLeft"
          displayValue={<ArrowLeft size={18} />}
          width="w-12"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="ArrowRight"
          displayValue={<ArrowRight size={18} />}
          width="w-12"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="Enter"
          displayValue={<CornerDownLeft size={18} />}
          width="w-16"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>
    </div>
  );
};

export default StandardLayout;