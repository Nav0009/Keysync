import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wifi, WifiOff, Keyboard, KeySquare, Hash, MessageSquare } from 'lucide-react';
import socketService from '../services/socketService';
import useConnectionStore from '../store/connectionStore';
import StandardLayout from '../components/keyboard/StandardLayout';
import FunctionLayout from '../components/keyboard/FunctionLayout';
import SymbolLayout from '../components/keyboard/SymbolLayout';

type KeyboardLayoutType = 'standard' | 'function' | 'symbol';

const PhoneKeyboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionCode, setSessionCode] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [currentLayout, setCurrentLayout] = useState<KeyboardLayoutType>('standard');
  const [capsLock, setCapsLock] = useState(false);
  const { sessionId, setSessionId, isConnected, setConnected } = useConnectionStore();

  // Extract session code from URL parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      setSessionCode(code);
    }
  }, [location]);

  // Connect to socket if sessionId exists
  useEffect(() => {
    if (sessionId) {
      socketService.connect(sessionId, 'sender');
    }

    const unsubscribe = socketService.onConnectionChange((connected) => {
      setConnected(connected);
    });

    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [sessionId, setConnected]);

  const handleConnect = async () => {
    if (!sessionCode || sessionCode.trim() === '') {
      setError('Please enter a valid connection code');
      return;
    }

    setConnecting(true);
    setError('');

    try {
      setSessionId(sessionCode.trim());
      const connected = await socketService.connect(sessionCode.trim(), 'sender');
      
      if (connected) {
        // Connection successful
        setConnecting(false);
      } else {
        // Connection failed
        setError('Failed to connect. Please check your code and try again.');
        setConnecting(false);
      }
    } catch (err) {
      setError('An error occurred while connecting. Please try again.');
      setConnecting(false);
    }
  };

  const handleKeyPress = (key: string) => {
    if (isConnected) {
      socketService.sendKeyEvent(key, 'keydown');
    }
  };

  const handleKeyRelease = (key: string) => {
    if (isConnected) {
      socketService.sendKeyEvent(key, 'keyup');
    }
  };

  const toggleCapsLock = () => {
    setCapsLock(prev => !prev);
  };

  const renderConnectionForm = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Connect to Computer</h2>
        
        <div className="mb-6">
          <label htmlFor="sessionCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Enter Connection Code
          </label>
          <input
            type="text"
            id="sessionCode"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-lg tracking-wider uppercase"
            placeholder="Enter code"
            autoComplete="off"
            autoCapitalize="characters"
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
        
        <button
          onClick={handleConnect}
          disabled={connecting}
          className={`w-full py-3 rounded-md font-medium text-white transition-colors ${
            connecting 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {connecting ? 'Connecting...' : 'Connect'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Instructions</h3>
        <ol className="space-y-3 text-slate-600 dark:text-slate-300">
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>On your computer, open KeySync and navigate to "Computer Mode"</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Find the connection code displayed on your computer screen</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Enter that code above and click "Connect"</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Once connected, you can use your phone as a keyboard for your computer</span>
          </li>
        </ol>
      </div>
    </div>
  );

  const renderKeyboard = () => (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-t-xl shadow-lg p-4 border border-b-0 border-slate-200 dark:border-slate-700 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Keyboard className="text-indigo-600 dark:text-indigo-400 mr-2" size={20} />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Phone Keyboard</h2>
          </div>
          {isConnected ? (
            <div className="flex items-center text-emerald-500">
              <Wifi size={18} className="mr-1" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center text-amber-500">
              <WifiOff size={18} className="mr-1" />
              <span className="text-sm font-medium">Disconnected</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        {/* Layout Tabs */}
        <div className="flex justify-center mb-4 bg-white dark:bg-slate-700 rounded-lg p-1">
          <button
            onClick={() => setCurrentLayout('standard')}
            className={`flex-1 py-2 px-3 rounded-md flex justify-center transition-colors ${
              currentLayout === 'standard'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            <MessageSquare size={20} />
          </button>
          <button
            onClick={() => setCurrentLayout('function')}
            className={`flex-1 py-2 px-3 rounded-md flex justify-center transition-colors ${
              currentLayout === 'function'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            <KeySquare size={20} />
          </button>
          <button
            onClick={() => setCurrentLayout('symbol')}
            className={`flex-1 py-2 px-3 rounded-md flex justify-center transition-colors ${
              currentLayout === 'symbol'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            <Hash size={20} />
          </button>
        </div>

        {/* Keyboard Layout */}
        <div className="touch-manipulation">
          {currentLayout === 'standard' && (
            <StandardLayout 
              onKeyPress={handleKeyPress} 
              onKeyRelease={handleKeyRelease}
              capsLock={capsLock}
              toggleCapsLock={toggleCapsLock}
            />
          )}
          {currentLayout === 'function' && (
            <FunctionLayout 
              onKeyPress={handleKeyPress} 
              onKeyRelease={handleKeyRelease} 
            />
          )}
          {currentLayout === 'symbol' && (
            <SymbolLayout 
              onKeyPress={handleKeyPress} 
              onKeyRelease={handleKeyRelease} 
            />
          )}
        </div>

        {/* Connection Status Bar */}
        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {isConnected ? (
            <span>Connected to computer • Tap keys to type</span>
          ) : (
            <button
              onClick={() => navigate('/phone')}
              className="text-indigo-600 dark:text-indigo-400 font-medium"
            >
              Not connected • Click to connect
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      {!isConnected ? renderConnectionForm() : renderKeyboard()}
    </div>
  );
};

export default PhoneKeyboard;