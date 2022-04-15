const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const socket = require('socket.io');
// const routes = require('./routes');
const userRoutes = require('./routes/users');
const msgRoutes = require('./routes/msgs');

const app = express();
const PORT = 
// process.env.PORT || 
5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use('/api/users', userRoutes);
app.use('/api/msgs', msgRoutes);

const server = app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));

const io = socket(server, {
  cors:{
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map;

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});