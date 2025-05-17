const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this in production
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Mapping of sessionId to connected sockets
const sessions = new Map();

io.on('connection', (socket) => {
  const { sessionId, role } = socket.handshake.query;

  if (!sessionId || !role) {
    console.warn('Connection rejected: Missing sessionId or role');
    socket.disconnect();
    return;
  }

  console.log(`Client connected: ${socket.id}, Role: ${role}, Session: ${sessionId}`);

  // Store session-specific data
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { senders: [], receivers: [] });
  }

  const session = sessions.get(sessionId);
  if (role === 'sender') {
    session.senders.push(socket);
  } else {
    session.receivers.push(socket);
  }

  // Handle key events from sender
  socket.on('key-event', (data) => {
    if (role !== 'sender') return;

    console.log(`Key event from ${socket.id}:`, data);

    // Relay to all receivers in the session
    session.receivers.forEach((receiverSocket) => {
      receiverSocket.emit('key-event', data);
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    if (role === 'sender') {
      session.senders = session.senders.filter(s => s !== socket);
    } else {
      session.receivers = session.receivers.filter(s => s !== socket);
    }

    // Clean up empty sessions
    if (session.senders.length === 0 && session.receivers.length === 0) {
      sessions.delete(sessionId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});
