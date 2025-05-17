import React from 'react';
import KeyboardKey from '../KeyboardKey';
import { Delete, ChevronsUp, CornerDownLeft } from 'lucide-react';

interface SymbolLayoutProps {
  onKeyPress: (key: string) => void;
  onKeyRelease: (key: string) => void;
}

const SymbolLayout: React.FC<SymbolLayoutProps> = ({ onKeyPress, onKeyRelease }) => {
  const row1 = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
  const row2 = ['`', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|'];
  const row3 = [';', ':', '\'', '"', '<', '>', '?'];

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
            keyValue={key}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="CapsLock"
          displayValue={<ChevronsUp size={18} />}
          width="w-16"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        {row3.map((key) => (
          <KeyboardKey
            key={key}
            keyValue={key}
            width="flex-1"
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
        <KeyboardKey
          keyValue="Enter"
          displayValue={<CornerDownLeft size={18} />}
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
          keyValue="Tab"
          width="w-12"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>
    </div>
  );
};

export default SymbolLayout;