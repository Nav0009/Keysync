import { io, Socket } from 'socket.io-client';

// We would replace this with an actual server URL in production
const SERVER_URL = 'https://keysync.onrender.com';

class SocketService {
  private socket: Socket | null = null;
  private connectionCallbacks: Array<(connected: boolean) => void> = [];
  private keyEventCallbacks: Array<(key: string, event: 'keydown' | 'keyup') => void> = [];

  connect(sessionId: string, role: 'sender' | 'receiver'): Promise<boolean> {
    return new Promise((resolve) => {
      this.disconnect();

      // In a real implementation, we would connect to a real server
      // For demo purposes, we'll simulate the connection
      this.socket = io(SERVER_URL, {
        query: {
          sessionId,
          role
        },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        this.notifyConnectionChange(true);
        resolve(true);
      });

      this.socket.on('disconnect', () => {
        this.notifyConnectionChange(false);
      });

      this.socket.on('key-event', (data: { key: string, event: 'keydown' | 'keyup' }) => {
        this.notifyKeyEvent(data.key, data.event);
      });

      // For demonstration, we'll simulate a successful connection after a short delay
      setTimeout(() => {
        this.notifyConnectionChange(true);
        resolve(true);
      }, 500);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.notifyConnectionChange(false);
    }
  }

  sendKeyEvent(key: string, event: 'keydown' | 'keyup'): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('key-event', { key, event });
    }
    
    // For demonstration, we'll simulate sending the event
    console.log(`Sent ${event} for key: ${key}`);
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionCallbacks.push(callback);
    return () => {
      this.connectionCallbacks = this.connectionCallbacks.filter(cb => cb !== callback);
    };
  }

  onKeyEvent(callback: (key: string, event: 'keydown' | 'keyup') => void): () => void {
    this.keyEventCallbacks.push(callback);
    return () => {
      this.keyEventCallbacks = this.keyEventCallbacks.filter(cb => cb !== callback);
    };
  }

  private notifyConnectionChange(connected: boolean): void {
    this.connectionCallbacks.forEach(callback => callback(connected));
  }

  private notifyKeyEvent(key: string, event: 'keydown' | 'keyup'): void {
    this.keyEventCallbacks.forEach(callback => callback(key, event));
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService;