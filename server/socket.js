const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Join user room
    socket.on('join', (userId) => {
      socket.join(\`user:\${userId}\`);
      console.log(\`✅ User \${userId} joined their room\`);
    });

    // Chat messages
    socket.on('sendMessage', (data) => {
      const { to, from, message } = data;
      io.to(\`user:\${to}\`).emit('newMessage', {
        from,
        message,
        timestamp: new Date()
      });
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(\`user:\${data.to}\`).emit('userTyping', {
        from: data.from
      });
    });

    // Live stream
    socket.on('startStream', (data) => {
      socket.broadcast.emit('streamStarted', data);
    });

    // CatTok views
    socket.on('viewVideo', (videoId) => {
      socket.broadcast.emit('videoViewed', videoId);
    });

    socket.on('disconnect', () => {
      console.log('👋 Client disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };
