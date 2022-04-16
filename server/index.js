// Required packages
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const socket = require('socket.io');
require('dotenv').config();

// User routes
const userRoutes = require('./routes/users');
const msgRoutes = require('./routes/msgs');

// Sets up express and PORT
const app = express();
const PORT = 
// process.env.PORT || 
5000;
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Uses creates routes for API
app.use('/api/users', userRoutes);
app.use('/api/msgs', msgRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

// Server Listener
const server = app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));

// Socket.io itegration, takes server as input and sets up at specified origin
const io = socket(server, {
  cors:{
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// Creates set of global users
global.onlineUsers = new Map;

// Listens for connection
io.on('connection', (socket) => {
  global.chatSocket = socket;
  
  // Adds user to onlineUsers
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Function for sending data as a msg
  socket.on('send-msg', (data) => {
    // If user is signed in, it creates an emit to recieve the message
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message);
    }
  });
});