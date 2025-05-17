import React from 'react';
import KeyboardKey from '../KeyboardKey';
import { 
  VolumeX, 
  Volume1, 
  Volume2, 
  Sun, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Trash
} from 'lucide-react';

interface FunctionLayoutProps {
  onKeyPress: (key: string) => void;
  onKeyRelease: (key: string) => void;
}

const FunctionLayout: React.FC<FunctionLayoutProps> = ({ onKeyPress, onKeyRelease }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="Escape"
          displayValue="Esc"
          width="w-14"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        {['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key) => (
          <KeyboardKey
            key={key}
            keyValue={key}
            width="flex-1"
            isSpecial
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        ))}
        <KeyboardKey
          keyValue="Delete"
          displayValue={<Trash size={18} />}
          width="w-14"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="AudioVolumeMute"
          displayValue={<VolumeX size={18} />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="AudioVolumeDown"
          displayValue={<Volume1 size={18} />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="AudioVolumeUp"
          displayValue={<Volume2 size={18} />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="BrightnessDown"
          displayValue={<Sun size={18} className="opacity-50" />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="BrightnessUp"
          displayValue={<Sun size={18} />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="Home"
          displayValue={<Home size={18} />}
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="End"
          displayValue="End"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="PageUp"
          displayValue="PgUp"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="PageDown"
          displayValue="PgDn"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>

      <div className="flex space-x-1 w-full justify-center">
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <KeyboardKey
            keyValue="ArrowUp"
            displayValue={<ArrowUp size={18} />}
            width="w-16"
            isSpecial
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
          <div></div>
          <KeyboardKey
            keyValue="ArrowLeft"
            displayValue={<ArrowLeft size={18} />}
            width="w-16"
            isSpecial
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
          <KeyboardKey
            keyValue="ArrowDown"
            displayValue={<ArrowDown size={18} />}
            width="w-16"
            isSpecial
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
          <KeyboardKey
            keyValue="ArrowRight"
            displayValue={<ArrowRight size={18} />}
            width="w-16"
            isSpecial
            onKeyPress={onKeyPress}
            onKeyRelease={onKeyRelease}
          />
        </div>
      </div>

      <div className="flex space-x-1 w-full">
        <KeyboardKey
          keyValue="Tab"
          displayValue="Fn"
          width="w-16"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="MediaTrackPrevious"
          displayValue="⏮"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="MediaPlayPause"
          displayValue="⏯"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
        <KeyboardKey
          keyValue="MediaTrackNext"
          displayValue="⏭"
          width="flex-1"
          isSpecial
          onKeyPress={onKeyPress}
          onKeyRelease={onKeyRelease}
        />
      </div>
    </div>
  );
};

export default FunctionLayout;