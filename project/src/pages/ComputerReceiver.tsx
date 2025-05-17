import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Keyboard, Wifi, WifiOff, Copy, Check } from 'lucide-react';
import socketService from '../services/socketService';
import useConnectionStore from '../store/connectionStore';

const ComputerReceiver: React.FC = () => {
  const { sessionId: urlSessionId } = useParams<{ sessionId?: string }>();
  const { sessionId, createSession, setSessionId, isConnected, setConnected } = useConnectionStore();
  const [copiedCode, setCopiedCode] = useState(false);
  const [keyHistory, setKeyHistory] = useState<string[]>([]);

  // Create or use session ID
  useEffect(() => {
    if (urlSessionId) {
      setSessionId(urlSessionId);
    } else if (!sessionId) {
      createSession();
    }
  }, [urlSessionId, sessionId, createSession, setSessionId]);

  // Connect to socket
  useEffect(() => {
    if (sessionId) {
      socketService.connect(sessionId, 'receiver');
    }

    const unsubscribe = socketService.onConnectionChange((connected) => {
      setConnected(connected);
    });

    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [sessionId, setConnected]);

  // Listen for key events
  useEffect(() => {
    const unsubscribe = socketService.onKeyEvent((key, event) => {
      if (event === 'keydown') {
        // Add received key to history
        setKeyHistory(prev => [key, ...prev.slice(0, 9)]);
        
        // Here we would dispatch a keyboard event to the active element
        // This is a simplified demo version
        console.log(`Received key: ${key}`);
      }
    });

    return unsubscribe;
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sessionId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const appUrl = `${window.location.origin}/phone`;
  const connectionUrl = `${appUrl}?code=${sessionId}`;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Computer Receiver</h2>
          {isConnected ? (
            <div className="flex items-center text-emerald-500">
              <Wifi size={18} className="mr-1" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center text-amber-500">
              <WifiOff size={18} className="mr-1" />
              <span className="text-sm font-medium">Waiting...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-3 rounded-lg mb-4">
            <QRCodeSVG 
              value={connectionUrl}
              size={200}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="L"
              includeMargin={false}
            />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center mb-4">
            Scan this QR code with your phone or manually enter the connection code:
          </p>
          <div className="flex items-center">
            <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-l-md font-mono text-lg font-semibold tracking-wider text-slate-900 dark:text-white">
              {sessionId}
            </div>
            <button 
              onClick={handleCopyCode}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-md transition-colors"
              aria-label="Copy connection code"
            >
              {copiedCode ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Recent Input</h3>
          {keyHistory.length > 0 ? (
            <div className="bg-slate-100 dark:bg-slate-700 rounded-md p-3 min-h-16 font-mono">
              {keyHistory.map((key, i) => (
                <span key={i} className="mr-2 inline-block bg-white dark:bg-slate-600 px-2 py-1 rounded text-xs mb-1">
                  {key}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-slate-100 dark:bg-slate-700 rounded-md p-4 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center">
              <Keyboard size={24} className="mb-2 opacity-50" />
              <span>Waiting for keyboard input...</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Instructions</h3>
        <ol className="space-y-3 text-slate-600 dark:text-slate-300">
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Keep this tab open and visible on your computer</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>On your phone, visit {appUrl} or scan the QR code</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Enter the connection code shown above</span>
          </li>
          <li className="flex">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Start typing on your phone's keyboard!</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ComputerReceiver;