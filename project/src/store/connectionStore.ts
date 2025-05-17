import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface ConnectionState {
  sessionId: string;
  isConnected: boolean;
  createSession: () => string;
  setSessionId: (id: string) => void;
  setConnected: (connected: boolean) => void;
}

const useConnectionStore = create<ConnectionState>((set) => ({
  sessionId: localStorage.getItem('keysync-session-id') || '',
  isConnected: false,
  createSession: () => {
    const newSessionId = nanoid(6).toUpperCase();
    localStorage.setItem('keysync-session-id', newSessionId);
    set({ sessionId: newSessionId });
    return newSessionId;
  },
  setSessionId: (id: string) => {
    localStorage.setItem('keysync-session-id', id);
    set({ sessionId: id });
  },
  setConnected: (connected: boolean) => set({ isConnected: connected }),
}));

export default useConnectionStore;