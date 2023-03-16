const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');
const handleListen = () => console.log(`Listning on http://localhost:8080`);

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', function (res, req) {
  req.sendFile(path.join(__dirname, '../../public/index.html'));
});

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

wsServer.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Envet: ${event}`);
  });
  console.log(socket.rooms);
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
    console.log(roomName);
  });
  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  });
  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer);
  });
  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice);
  });
  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice);
  });
  socket.on('chat-message', (message, roomName) => {
    socket.to(roomName).emit('chat-message', message);
    console.log(message, roomName);
  });
});
httpServer.listen(8080, handleListen);
